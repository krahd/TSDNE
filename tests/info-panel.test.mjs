import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const indexSource = fs.readFileSync(new URL("../prototype/index.html", import.meta.url), "utf8");
const styles = fs.readFileSync(new URL("../prototype/styles.css", import.meta.url), "utf8");

test("about keeps statement, privacy and accessibility inside the artwork dialog", () => {
  assert.match(mainSource, /function statementMarkup\(\)/);
  assert.match(mainSource, /function privacyMarkup\(\)/);
  assert.match(mainSource, /function accessibilityMarkup\(\)/);
  assert.match(mainSource, /\["statement", "statement"\]/);
  assert.match(mainSource, /\["privacy", "privacy"\]/);
  assert.match(mainSource, /\["accessibility", "accessibility"\]/);
  assert.match(mainSource, /querySelectorAll\("\[data-info-view\]"\)/);
  assert.match(mainSource, /showInfoView\(button\.dataset\.infoView\)/);
  assert.doesNotMatch(mainSource, /href="\.\/privacy\.html"/);
  assert.doesNotMatch(mainSource, /href="\.\/accessibility\.html"/);
});

test("statement preserves the manuscript's core public propositions", () => {
  assert.match(mainSource, /TSDNE produces difference without inference/);
  assert.match(mainSource, /TSDNE retains provenance but abolishes title/);
  assert.match(mainSource, /The shader can be reconstructed\. The visitor should not have to be\./);
});

test("about credits Tomas Laurenzo on the same footer line as the version", () => {
  assert.match(indexSource, /<footer class="panel-footer">\s*<p class="panel-credit">TSDNE is a project by <a href="https:\/\/laurenzo\.net\/">Tomas Laurenzo<\/a>\.<\/p>\s*<p class="panel-version" id="panel-version"><\/p>\s*<\/footer>/);
  assert.match(styles, /\.panel-footer\{[^}]*display:none[^}]*justify-content:space-between/);
  assert.match(styles, /\.panel-credit a\{[^}]*color:var\(--accent\)/);
});

test("information dialog uses restrained editorial treatment with a muted phosphor-green accent", () => {
  assert.match(styles, /--accent:#78977d/);
  assert.match(styles, /#panel\{[^}]*border-radius:2px/);
  assert.match(styles, /#panel::backdrop\{[^}]*backdrop-filter:none/);
  assert.match(styles, /\.panel-reading\{[^}]*max-width:58ch/);
  assert.match(styles, /\.panel-nav-link[^}]*border-radius:0/);
  assert.match(styles, /\.info-document h2\{[^}]*color:var\(--accent\)/);
  assert.doesNotMatch(styles, /linear-gradient|radial-gradient/);
});
