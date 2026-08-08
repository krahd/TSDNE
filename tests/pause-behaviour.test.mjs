import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const runtimeSource = fs.readFileSync(new URL("../prototype/src/runtime.js", import.meta.url), "utf8");

test("pause is a momentary state, so a reload always begins playing", () => {
  // Forced after the stored settings are merged in, not merely omitted from the
  // write, so a stored true from an earlier build cannot survive this load.
  const load = mainSource.indexOf('localStorage.getItem("tsdne-settings-v2")');
  const reset = mainSource.indexOf("settings.paused = false;");
  assert.ok(load > 0, "settings are still read from tsdne-settings-v2");
  assert.ok(reset > load, "paused is reset after the stored settings are merged");
});

test("pause is never written to the persisted preferences", () => {
  const persist = mainSource.match(/function persistSettings\(\) \{[\s\S]*?\n\}/);
  assert.ok(persist, "persistSettings is still a declared function");
  assert.match(persist[0], /const \{ paused, \.\.\.preferences \} = settings;/);
  assert.match(persist[0], /JSON\.stringify\(preferences\)/);
  assert.doesNotMatch(persist[0], /JSON\.stringify\(settings\)/);
});

test("asking for another shader resumes playback first", () => {
  assert.match(mainSource, /function resumeAndRequestAnother\(\) \{[\s\S]*?setPaused\(false\)[\s\S]*?runtime\.another\(\)/);
  // Both routes to another shader — the control and the keyboard shortcut — go
  // through it, so neither can arrive at a shader held on one frame.
  assert.match(mainSource, /anotherButton\.addEventListener\("click", \(\) => void resumeAndRequestAnother\(\)\)/);
  assert.match(mainSource, /=== "n"\) \{ event\.preventDefault\(\); void resumeAndRequestAnother\(\); \}/);
  assert.doesNotMatch(mainSource, /addEventListener\("click", \(\) => void runtime\.another/);
});

test("a resumed setting reaches the runtime rather than only the button label", () => {
  const setPaused = mainSource.match(/function setPaused\(paused\) \{[\s\S]*?\n\}/);
  assert.ok(setPaused, "setPaused is still a declared function");
  assert.match(setPaused[0], /runtime\.setSettings\(settings\)/);
  assert.match(setPaused[0], /applyDocumentSettings\(\)/);
  // Reports whether it changed anything, so an implicit resume is announced
  // only when it actually resumed.
  assert.match(setPaused[0], /if \(settings\.paused === paused\) return false;/);
  // Resuming must not rewind: the runtime integrates the rate into a clock.
  assert.match(runtimeSource, /export function shaderMotionRate/);
  assert.match(runtimeSource, /clock \+ step \* rate/);
});
