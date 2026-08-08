import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  MAX_CLOCK_STEP_SECONDS,
  advanceShaderClock,
  serialiseCandidateForAudit,
  shaderMotionRate,
} from "../prototype/src/runtime.js";

test("runtime audit serialises reconstructive production state and selector context",()=>{
  const candidate={id:"x",seed:[1,2,3,4],family:"folded-flow",colorMode:"mono",finish:"clean",graph:{traits:{variant:.2}},structuralVector:[.1],estimatedCost:6,origin:"authored-procedural",createdAt:"now",provenance:{sourceHash:"s",graphHash:"g"},perception:{mean:1},quality:{pass:true},flashScreen:{pass:true}};
  const item=serialiseCandidateForAudit(candidate,{score:.8,novelty:.7});
  assert.equal(item.category,"continuous");
  assert.equal(item.variant,.2);
  assert.equal(item.selection.novelty,.7);
  assert.deepEqual(item.seed,[1,2,3,4]);
});

test("candidate validation never depends on the visitor's render settings", () => {
  const runtime = fs.readFileSync("prototype/src/runtime.js", "utf8");
  // Sampling at renderSettings() meant a paused runtime (motion 0) produced
  // identical frames and rejected all forty-nine families as too-static.
  assert.match(runtime, /VALIDATION_SAMPLE_SETTINGS\s*=\s*Object\.freeze\(\{\s*motion:\s*1,\s*intensity:\s*1\s*\}\)/);
  const validate = runtime.slice(runtime.indexOf("function validateCandidate"), runtime.indexOf("async function buildCandidatePool"));
  assert.doesNotMatch(validate, /renderSettings\(\)/, "validation must not read the viewer's render settings");
  assert.doesNotMatch(validate, /settings\.reducedMotion/, "the motion floor must apply to every candidate");
  assert.equal((validate.match(/VALIDATION_SAMPLE_SETTINGS/g) || []).length, 1);
});

test("clearing local history invalidates a prefetch already in flight", () => {
  const runtime = fs.readFileSync("prototype/src/runtime.js", "utf8");
  assert.match(runtime, /const epoch = historyEpoch;/);
  assert.match(runtime, /if \(epoch === historyEpoch\) prefetched = result;/);
  assert.match(runtime, /historyEpoch \+= 1;[\s\S]{0,200}prefetched = null;/);
});

test("both adapters observe background prefetch failures", () => {
  for (const path of ["prototype/src/main.js", "prototype/src/curation.js"]) {
    assert.match(fs.readFileSync(path, "utf8"), /runtime\.on\("prefetch-error"/, `${path} ignores prefetch-error`);
  }
});

test("pausing holds the current moment instead of resetting the shader", () => {
  // Every family spends motion as u_time*u_motion, so u_motion scales absolute
  // time. Handing the rate to the shader meant pausing collapsed effective time
  // to zero and displayed the first frame rather than freezing what was on screen.
  assert.equal(shaderMotionRate({ paused: false, reducedMotion: false }), 1);
  assert.equal(shaderMotionRate({ paused: true, reducedMotion: false }), 0);
  assert.equal(shaderMotionRate({ paused: true, reducedMotion: true }), 0);

  let clock = 0;
  const step = 1 / 60;
  for (let frame = 0; frame < 120; frame += 1) clock = advanceShaderClock(clock, step, 1);
  const atPause = clock;
  assert.ok(atPause > 1.9 && atPause < 2.1, `two seconds of frames should read as ~2s, got ${atPause}`);

  const paused = shaderMotionRate({ paused: true });
  for (let frame = 0; frame < 120; frame += 1) clock = advanceShaderClock(clock, step, paused);
  assert.equal(clock, atPause, "a paused clock must neither advance nor rewind");
  assert.notEqual(clock, 0, "a paused clock must not collapse to the first frame");

  // Resuming continues from where it stopped rather than re-deriving from wall clock.
  clock = advanceShaderClock(clock, step, 1);
  assert.ok(clock > atPause, "resuming must carry on from the held moment");
});

test("changing the motion rate never rewrites elapsed shader time", () => {
  let clock = 0;
  const step = 1 / 60;
  for (let frame = 0; frame < 60; frame += 1) clock = advanceShaderClock(clock, step, 1);
  const beforeReduction = clock;

  // Reduced motion used to jump backwards to 12% of elapsed time.
  const reduced = shaderMotionRate({ reducedMotion: true });
  assert.equal(reduced, 0.12);
  for (let frame = 0; frame < 60; frame += 1) clock = advanceShaderClock(clock, step, reduced);
  assert.ok(clock > beforeReduction, "the clock must stay monotonic across a rate change");
  assert.ok(clock - beforeReduction < 0.2, "a second at 0.12 rate should add about 0.12s");
});

test("a backgrounded tab resumes rather than lurching forward", () => {
  // requestAnimationFrame stops firing while hidden, so the first frame back
  // reports a very large delta.
  assert.equal(advanceShaderClock(5, 600, 1), 5 + MAX_CLOCK_STEP_SECONDS);
  assert.equal(advanceShaderClock(5, -3, 1), 5, "a non-monotonic timestamp must not rewind the clock");
  assert.equal(advanceShaderClock(5, Number.NaN, 1), 5, "a missing delta must not poison the clock");
});

test("the display path drives time from the clock, not from the motion uniform", () => {
  const runtime = fs.readFileSync("prototype/src/runtime.js", "utf8");
  const renderSettings = runtime.slice(runtime.indexOf("function renderSettings"), runtime.indexOf("function applySettings"));
  assert.match(renderSettings, /motion: 1/, "u_motion must stay at 1 so it cannot rescale absolute time");
  assert.doesNotMatch(renderSettings, /settings\.paused/, "pausing must not be expressed as a motion multiplier");
  assert.doesNotMatch(renderSettings, /settings\.reducedMotion/, "the motion rate must not be expressed as a multiplier");

  const animate = runtime.slice(runtime.indexOf("function animate"), runtime.indexOf("async function start"));
  assert.match(animate, /advanceClocks\(now\)/);
  assert.match(animate, /render\(rendererClocks\[index\]\)/);
  assert.doesNotMatch(animate, /performance\.now\(\)|rendererStarts/, "frame time must come from the integrated clock");
});
