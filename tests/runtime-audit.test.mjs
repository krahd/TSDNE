import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { serialiseCandidateForAudit } from "../prototype/src/runtime.js";

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
