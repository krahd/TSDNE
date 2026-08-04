import test from "node:test";
import assert from "node:assert/strict";
import { sanitiseTrace } from "../prototype/src/history.js";

test("anti-repetition traces cannot reconstruct the shader", () => {
  const trace = sanitiseTrace({
    id:"seed-id",
    seed:[1,2,3,4],
    source:"secret source",
    graph:{secret:true},
    family:"folded-flow",
    perception:{mean:100},
  });
  assert.equal(trace.family, "folded-flow");
  assert.deepEqual(trace.perception, {mean:100});
  assert.equal("seed" in trace, false);
  assert.equal("source" in trace, false);
  assert.equal("graph" in trace, false);
  assert.equal("id" in trace, false);
});
