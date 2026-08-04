import test from "node:test";
import assert from "node:assert/strict";
import {
  FAMILY_NAMES,
  compileGraph,
  createGraph,
  estimateCost,
  generateCandidate,
} from "../prototype/src/generator.js";
import { enrichGraph, generateComplexCandidate } from "../prototype/src/synthesis.js";

test("all authored visual families compile deterministically", () => {
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

test("seeded candidates remain deterministic", () => {
  const a = generateCandidate([10,20,30,40]);
  const b = generateCandidate([10,20,30,40]);
  assert.equal(a.signature, b.signature);
  assert.equal(a.source, b.source);
  assert.equal(a.id, b.id);
});

test("complexity enrichment remains deterministic and bounded", () => {
  const graph = createGraph([9,8,7,6], "tidal-ink");
  const a = enrichGraph(graph);
  const b = enrichGraph(graph);
  assert.deepEqual(a, b);
  assert.equal(a.generator, "tsdne-procedural-v1");
  for (const value of Object.values(a.traits)) {
    assert.ok(value >= 0 && value <= 1);
  }
  assert.ok(a.traits.complexity >= .68);
});

test("complex candidates contain no model lineage", () => {
  const candidate = generateComplexCandidate([5,6,7,8], "aurora-ribbons");
  assert.equal(candidate.origin, "authored-procedural");
  assert.equal(candidate.model ?? null, null);
  assert.equal(candidate.parentId ?? null, null);
  assert.equal(candidate.mutation ?? null, null);
  assert.match(candidate.source, /void main/);
});
