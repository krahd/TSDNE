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

test("the search itself runs paused, so nothing resumes when another is pressed", () => {
  // Neither route may touch the viewing state: the resume belongs to
  // "encounter-settled", once the new shader is the only one on screen.
  assert.match(mainSource, /anotherButton\.addEventListener\("click", \(\) => void runtime\.another\(\)\.catch\(\(\) => \{\}\)\)/);
  assert.match(mainSource, /=== "n"\) \{ event\.preventDefault\(\); void runtime\.another\(\)\.catch\(\(\) => \{\}\); \}/);
  // Coherent only because generation does not depend on being unpaused.
  assert.match(runtimeSource, /VALIDATION_SAMPLE_SETTINGS = Object\.freeze\(\{ motion: 1, intensity: 1 \}\)/);
});

test("a new shader resumes only once it is alone on screen", () => {
  // The defect this guards against is resuming on "encounter", which fires as
  // the crossfade begins: the outgoing shader would start moving again and only
  // then be replaced, which is precisely what pausing is meant to prevent.
  const settled = mainSource.match(/runtime\.on\("encounter-settled", \(\) => \{[\s\S]*?\n\}\);/);
  assert.ok(settled, "main resumes on encounter-settled");
  assert.match(settled[0], /if \(!settings\.paused\) return;/);
  assert.match(settled[0], /settings\.paused = false; applyDocumentSettings\(\); runtime\.setSettings\(settings\);/);

  const encounter = mainSource.match(/runtime\.on\("encounter", \(\) => \{[\s\S]*?\n\}\);/);
  assert.ok(encounter, "the encounter handler is still bound");
  assert.doesNotMatch(encounter[0], /settings\.paused/, "resuming must not happen as the crossfade begins");
});

test("encounter-settled is emitted after the crossfade, not with it", () => {
  // Zero for the first encounter and under reduced motion, where there is no
  // crossfade to wait for, so the resume is not delayed for no reason.
  assert.match(runtimeSource, /const duration = next !== previous && !settings\.reducedMotion \? transitionMs : 0;/);
  assert.match(runtimeSource, /setTimeout\(\(\) => emitter\.emit\("encounter-settled", settling\), duration\)/);
  // The emit order matters: the shader is present first, settled afterwards.
  const showEncounter = runtimeSource.match(/function showEncounter\([\s\S]*?\n  \}/);
  assert.ok(showEncounter, "showEncounter is still a declared function");
  assert.ok(
    showEncounter[0].indexOf('emit("encounter"') < showEncounter[0].indexOf('"encounter-settled"'),
    "encounter is emitted before encounter-settled",
  );
  // A rapid second request must not leave the first timer pending.
  assert.match(runtimeSource, /clearTimeout\(settleTimer\);\n    const settling/);
  // And a stopped runtime must not emit into a cleared emitter.
  const stop = runtimeSource.match(/function stop\(\) \{[\s\S]*?\n  \}/);
  assert.match(stop[0], /clearTimeout\(settleTimer\)/);
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
