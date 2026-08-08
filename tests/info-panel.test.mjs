import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const styles = fs.readFileSync(new URL("../prototype/styles.css", import.meta.url), "utf8");

test("about keeps privacy and accessibility inside the artwork dialog", () => {
  assert.match(mainSource, /function privacyMarkup\(\)/);
  assert.match(mainSource, /function accessibilityMarkup\(\)/);
  assert.match(mainSource, /\["privacy", "privacy"\]/);
  assert.match(mainSource, /\["accessibility", "accessibility"\]/);
  assert.match(mainSource, /querySelectorAll\("\[data-info-view\]"\)/);
  assert.match(mainSource, /showInfoView\(button\.dataset\.infoView\)/);
  assert.doesNotMatch(mainSource, /href="\.\/privacy\.html"/);
  assert.doesNotMatch(mainSource, /href="\.\/accessibility\.html"/);
});

test("information dialog uses restrained editorial treatment rather than card or glass UI", () => {
  assert.match(styles, /#panel\{[^}]*border-radius:2px/);
  assert.match(styles, /#panel::backdrop\{[^}]*backdrop-filter:none/);
  assert.match(styles, /\.panel-reading\{[^}]*max-width:58ch/);
  assert.match(styles, /\.panel-nav-link[^}]*border-radius:0/);
});
