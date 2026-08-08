import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const curationSource = fs.readFileSync(new URL("../prototype/src/curation.js", import.meta.url), "utf8");

test("public search status stays silent for background prefetch", () => {
  assert.match(mainSource, /let waitingForEncounter = false/);
  assert.match(mainSource, /if \(!waitingForEncounter \|\| !searchStatusVisible\) return/);
  assert.match(mainSource, /SEARCH_REVEAL_DELAY_MS = 140/);
  assert.match(mainSource, /runtime\.on\("prefetch-error"/);
  assert.match(mainSource, /if \(!waitingForEncounter\) setTimeout/);
});

test("public search status appears only when an explicit request is actually waiting", () => {
  assert.match(mainSource, /runtime\.on\("generation-start", \(\{ initial \}\) =>/);
  assert.match(mainSource, /if \(initial\) revealSearchStatus\(true\)/);
  assert.match(mainSource, /setTimeout\(\(\) => revealSearchStatus\(false\), SEARCH_REVEAL_DELAY_MS\)/);
  assert.match(mainSource, /runtime\.on\("encounter"/);
  assert.match(mainSource, /waitingForEncounter = false; searchStatusVisible = false/);
});

test("an empty quality-check cycle is retried rather than presented as an error", () => {
  assert.match(mainSource, /NO_CANDIDATE_MESSAGE = "No shader passed the local quality checks\."/);
  assert.match(mainSource, /none passed the local quality checks; searching again…/);
  assert.match(mainSource, /return requestAnother\(options\)/);
  assert.match(mainSource, /if \(isNoCandidateError\(error\)\) return/);
  assert.match(curationSource, /none passed the local quality checks; searching again…/);
  assert.match(curationSource, /return requestAnother\(options\)/);
});

test("curation also suppresses background-generation progress", () => {
  assert.match(curationSource, /if \(!waitingForEncounter \|\| !searchStatusVisible\) return/);
  assert.match(curationSource, /SEARCH_REVEAL_DELAY_MS = 140/);
});
