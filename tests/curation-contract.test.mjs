import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const curator=fs.readFileSync("prototype/src/curation.js","utf8");
const main=fs.readFileSync("prototype/src/main.js","utf8");
const publicHTML=fs.readFileSync("prototype/index.html","utf8");
const curationHTML=fs.readFileSync("prototype/curation/index.html","utf8");
const forbidden=["generator.js","synthesis.js","perception.js","history.js","webgl.js","provenance.js"];

test("curation is an observer of the production runtime, not a second TSDNE",()=>{
  assert.match(curator,/from "\.\/runtime\.js"/);
  for(const module of forbidden) assert.doesNotMatch(curator,new RegExp(module.replace(".","\\.")));
  assert.doesNotMatch(curator,/generateComplexCandidate|selectCandidate|qualityAssessment|familySchedule/);
});

test("public adapter also delegates production mechanics to the shared runtime",()=>{
  assert.match(main,/from "\.\/runtime\.js"/);
  for(const module of forbidden) assert.doesNotMatch(main,new RegExp(module.replace(".","\\.")));
});

test("curation route is not linked from the public artwork",()=>{
  assert.doesNotMatch(publicHTML,/curation/i);
  assert.match(curationHTML,/noindex,nofollow,noarchive/);
  assert.match(curationHTML,/<kbd>F<\/kbd> OK/);
  assert.match(curationHTML,/<kbd>G<\/kbd> not OK/);
  assert.match(curationHTML,/<kbd>H<\/kbd> repetitive/);
});
