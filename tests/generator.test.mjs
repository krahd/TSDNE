import test from "node:test";
import assert from "node:assert/strict";
import {
  FAMILY_NAMES,
  authoredBaselineMutation,
  compileGraph,
  createGraph,
  estimateCost,
  generateCandidate,
  graphSignature,
  mutateCandidate,
  mutationMagnitude,
  normaliseMutation,
  randomBaselineMutation,
} from "../prototype/src/generator.js";

test("all visual families compile deterministically", () => {
  const seed = [1,2,3,4];
  for (const family of FAMILY_NAMES) {
    const graph = createGraph(seed, family);
    const a = compileGraph(graph);
    const b = compileGraph(graph);
    assert.equal(a, b);
    assert.match(a, /#version 300 es/);
    assert.match(a, /uniform float u_motion/);
    assert.match(a, /void main/);
    assert.ok(estimateCost(graph) <= 17);
  }
});

test("seeded candidates are deterministic", () => {
  const a = generateCandidate([10,20,30,40]);
  const b = generateCandidate([10,20,30,40]);
  assert.equal(a.signature, b.signature);
  assert.equal(a.source, b.source);
  assert.equal(a.id, b.id);
});

test("empty model proposals remain empty and are not silently repaired", () => {
  const mutation = normaliseMutation({changes:{},targetFamily:"",intention:""});
  assert.equal(mutation.effective, false);
  assert.equal(mutation.activeChanges.length, 0);
  assert.equal(mutationMagnitude(mutation), 0);
});

test("ineffective mutations are rejected rather than attributed to a model", () => {
  const base = generateCandidate([5,6,7,8]);
  assert.throws(
    () => mutateCandidate(base, {changes:{},targetFamily:"",intention:""}, {model:"test",origin:"model-proposal"}),
    /fewer than two material changes/,
  );
});

test("effective mutations are bounded and preserve explicit provenance", () => {
  const base = generateCandidate([5,6,7,8]);
  const proposal = {
    changes: {scale:.8, tempo:-.5, density:0, turbulence:0, contrast:0, palette:0, complexity:0, rotation:0, symmetry:0, softness:0, drift:0, depth:0},
    targetFamily:"aurora-ribbons",
    intention:"Test structural family change.",
  };
  const child = mutateCandidate(base, proposal, {model:"test",origin:"model-proposal",proposer:"webllm"});
  assert.equal(child.parentId, base.id);
  assert.equal(child.origin, "model-proposal");
  assert.equal(child.family, "aurora-ribbons");
  assert.equal(child.mutation.proposer, "webllm");
  assert.notEqual(graphSignature(child.graph), graphSignature(base.graph));
  for (const value of Object.values(child.graph.traits)) assert.ok(value >= 0 && value <= 1);
});

test("comparison baselines produce material, labelled proposals", () => {
  const base = generateCandidate([10,11,12,13]);
  for (const proposal of [randomBaselineMutation(base,[1,2,3,4]), authoredBaselineMutation(base)]) {
    const normalised = normaliseMutation(proposal);
    assert.equal(normalised.effective, true);
    assert.ok(normalised.activeChanges.length >= 2 || normalised.targetFamily);
    assert.ok(proposal.baseline === "random" || proposal.baseline === "authored");
  }
});
