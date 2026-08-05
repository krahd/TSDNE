import test from "node:test";
import assert from "node:assert/strict";
import { ratingsCSV, studyExport } from "../prototype/src/curation-data.js";

const session = {
  schema: "tsdne-curation-session-v1",
  sessionId: "session-test",
  target: 250,
  startedAt: "2026-08-04T00:00:00.000Z",
};

const record = {
  schema: "tsdne-curation-rating-v1",
  recordId: "session-test:0001",
  sessionId: "session-test",
  ordinal: 1,
  createdAt: "2026-08-04T00:01:00.000Z",
  rating: "interesting",
  comment: "Layered motion, strong depth",
  displayDurationMs: 12000,
  generationDurationMs: 450,
  environment: {
    viewport: { width: 1200, height: 800 },
    devicePixelRatio: 2,
    userAgent: "test-agent",
  },
  selection: { score: .8, novelty: .7, complexity: .9, family: .6 },
  candidate: {
    id: "candidate-test",
    family: "folded-flow",
    estimatedCost: 12,
    graph: {
      traits: {
        scale:.1,tempo:.2,density:.3,turbulence:.4,contrast:.5,palette:.6,
        complexity:.7,rotation:.8,symmetry:.9,softness:.25,drift:.35,depth:.45,
      },
    },
    perception: { mean: 120, variance: 500, edge: 33, saturation:.2, temporal:12 },
  },
};

test("study export distinguishes explicit labels from contextual variables", () => {
  const exported = studyExport(session, [record]);
  assert.equal(exported.schema, "tsdne-curation-export-v1");
  assert.deepEqual(exported.study.ratingVocabulary, ["interesting", "not-interesting", "skip"]);
  assert.match(exported.study.inferencePolicy, /Only explicit ratings are labels/);
  assert.equal(exported.records[0].displayDurationMs, 12000);
});

test("CSV includes ratings, comments, generator traits and perceptual descriptors", () => {
  const csv = ratingsCSV([record]);
  assert.match(csv, /trait_complexity/);
  assert.match(csv, /selectionScore/);
  assert.match(csv, /"interesting"/);
  assert.match(csv, /"Layered motion, strong depth"/);
  assert.match(csv, /"folded-flow"/);
  assert.match(csv, /"0\.7"/);
});
