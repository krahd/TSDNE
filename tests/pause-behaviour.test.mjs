import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const runtimeSource = fs.readFileSync(new URL("../prototype/src/runtime.js", import.meta.url), "utf8");
const webglSource = fs.readFileSync(new URL("../prototype/src/webgl.js", import.meta.url), "utf8");

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

test("toggling pause does not write the settings key at all", () => {
  // The key's presence is what tells the media-query listener the visitor has
  // chosen for themselves, so a momentary pause must not create it.
  const toggle = mainSource.match(/pauseButton\.addEventListener\("click", \(\) => \{[\s\S]*?\n\}\);/);
  assert.ok(toggle, "the pause control is still bound");
  assert.match(toggle[0], /settings\.paused = !settings\.paused/);
  assert.match(toggle[0], /runtime\.setSettings\(settings\)/);
  assert.doesNotMatch(toggle[0], /persistSettings\(\)/);
});

test("asking for another shader leaves the viewing state alone", () => {
  // Requesting another shader is not a request to resume: a paused visitor
  // arrives at the new shader held on its first frame and stays paused.
  assert.match(mainSource, /anotherButton\.addEventListener\("click", \(\) => void runtime\.another\(\)\.catch\(\(\) => \{\}\)\)/);
  assert.match(mainSource, /=== "n"\) \{ event\.preventDefault\(\); void runtime\.another\(\)\.catch\(\(\) => \{\}\); \}/);
  assert.doesNotMatch(mainSource, /resumeAndRequestAnother|setPaused\(false\)/);
  // Coherent only because generation does not depend on being unpaused.
  assert.match(runtimeSource, /VALIDATION_SAMPLE_SETTINGS = Object\.freeze\(\{ motion: 1, intensity: 1 \}\)/);
});

test("a mid-session change of the system motion preference is followed", () => {
  // Dropped by the information-panel work. The preference is read once at load,
  // so without this listener a change was not honoured until a reload.
  assert.match(mainSource, /motionQuery\.addEventListener\?\.\("change"/);
  assert.match(mainSource, /if \(!localStorage\.getItem\("tsdne-settings-v2"\)\) \{ settings\.reducedMotion = event\.matches;/);
  assert.match(mainSource, /applyDocumentSettings\(\); runtime\.setSettings\(settings\); \}/);
});

test("the display keeps tracking its element without a resize listener", () => {
  // Why the dropped window "resize" listener is not restored: the display path
  // resizes on every frame, so this is what makes that listener redundant. If
  // either of these changes, main.js needs the listener back.
  assert.match(webglSource, /render: \(time\) => draw\(time, true\)/);
  assert.match(webglSource, /function draw\(timeSeconds, shouldResize = true\) \{[\s\S]*?if \(shouldResize\) resize\(\);/);
  // The animation loop drives render() unconditionally, so it holds while paused.
  assert.match(runtimeSource, /function animate\(now\) \{[\s\S]*?renderers\[index\]\.render\(rendererClocks\[index\]\)/);
  assert.doesNotMatch(mainSource, /addEventListener\("resize"/);
  // Sampling deliberately keeps its own buffer size and must stay opted out.
  assert.match(webglSource, /draw\(time, false\)/);
});
