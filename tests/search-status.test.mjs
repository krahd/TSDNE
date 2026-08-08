import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const mainSource = fs.readFileSync(new URL("../prototype/src/main.js", import.meta.url), "utf8");
const curationSource = fs.readFileSync(new URL("../prototype/src/curation.js", import.meta.url), "utf8");
const runtimeSource = fs.readFileSync(new URL("../prototype/src/runtime.js", import.meta.url), "utf8");

test("public search status stays silent for background prefetch", () => {
  assert.match(mainSource, /let waitingForEncounter = false/);
  assert.match(mainSource, /if \(!waitingForEncounter \|\| !searchStatusVisible\) return/);
  assert.match(mainSource, /SEARCH_REVEAL_DELAY_MS = 140/);
  assert.match(mainSource, /runtime\.on\("prefetch-error"/);
});

test("public search status appears only when an explicit request is actually waiting", () => {
  assert.match(mainSource, /runtime\.on\("generation-start", \(\{ initial \}\) =>/);
  assert.match(mainSource, /if \(initial\) revealSearchStatus\(true\)/);
  assert.match(mainSource, /setTimeout\(\(\) => revealSearchStatus\(false\), SEARCH_REVEAL_DELAY_MS\)/);
  assert.match(mainSource, /runtime\.on\("encounter"/);
  assert.match(mainSource, /waitingForEncounter = false; searchStatusVisible = false/);
});

test("an empty local-check cycle is a runtime retry, not an error", () => {
  assert.match(runtimeSource, /do \{[\s\S]*buildCandidatePool/);
  assert.match(runtimeSource, /emitter\.emit\("generation-retry"/);
  assert.match(runtimeSource, /reason: "no-candidate-passed-quality-checks"/);
  assert.match(runtimeSource, /\} while \(!pool\.candidates\.length\)/);
  assert.doesNotMatch(runtimeSource, /No shader passed the local quality checks/);
  assert.match(mainSource, /runtime\.on\("generation-retry"/);
  assert.match(curationSource, /runtime\.on\("generation-retry"/);
  assert.doesNotMatch(mainSource, /function requestAnother/);
  assert.doesNotMatch(curationSource, /function requestAnother/);
});

test("candidate-level compiler and sampling failures are rejected and searched past", () => {
  for (const stage of ["cost", "compile-link", "sample", "quality", "flash-quality", "validation", "generation"]) {
    assert.match(runtimeSource, new RegExp(`NORMAL_REJECTION_STAGES[\\s\\S]*\\"${stage}\\"`));
  }
  assert.match(runtimeSource, /if \(!candidates\.length && !attempts\.some\(\(item\) => NORMAL_REJECTION_STAGES\.has\(item\.stage\)\)\)/);
});

test("curation remains a passive observer of runtime search behaviour", () => {
  assert.match(curationSource, /if \(!waitingForEncounter \|\| !searchStatusVisible\) return/);
  assert.match(curationSource, /SEARCH_REVEAL_DELAY_MS = 140/);
  assert.doesNotMatch(curationSource, /generateComplexCandidate|selectCandidate|buildCandidatePool|qualityAssessment/);
});
