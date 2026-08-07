import test from "node:test";
import assert from "node:assert/strict";
import {
  COLOR_MODES,
  COST_BUDGET,
  FAMILY_NAMES,
  FINISHES,
  TRAIT_KEYS,
  compileGraph,
  createGraph,
  estimateCost,
  generateCandidate,
} from "../prototype/src/generator.js";
import { enrichGraph, generateComplexCandidate } from "../prototype/src/synthesis.js";

const balanced = (source, open, close) =>
  source.split(open).length === source.split(close).length;

test("all authored visual families compile deterministically", () => {
  const seed = [1,2,3,4];
  for (const family of FAMILY_NAMES) {
    const graph = createGraph(seed, family);
    const a = compileGraph(graph);
    const b = compileGraph(graph);
    assert.equal(a, b, family);
    assert.match(a, /#version 300 es/);
    assert.match(a, /uniform float u_motion/);
    assert.match(a, /void main/);
    assert.ok(estimateCost(graph) <= COST_BUDGET, `${family} exceeds the cost budget`);
  }
});

test("every family routes colour through shade() and the finish stage", () => {
  for (const family of FAMILY_NAMES) {
    const source = compileGraph(createGraph([7,7,7,7], family));
    assert.match(source, /shade\(/, family);
    assert.match(source, /outColor=vec4\(safeColor\(finish\(col,gl_FragCoord\.xy\)\),1\.0\);/, family);
    assert.ok(balanced(source, "{", "}"), `${family} has unbalanced braces`);
    assert.ok(balanced(source, "(", ")"), `${family} has unbalanced parentheses`);
  }
});

test("colour and finish vary independently of the structural family", () => {
  const emitted = new Set();
  for (let step = 0; step < COLOR_MODES.length * FINISHES.length * 4; step += 1) {
    const graph = createGraph([step + 1, step * 31 + 5, step * 7919 + 13, step * 104729 + 3]);
    for (const family of ["truchet-weave", "monolith-orbit"]) {
      const source = compileGraph({ ...graph, family });
      assert.match(source, /vec3 shade\(float t\)\{/);
      assert.match(source, /vec3 finish\(vec3 col,vec2 frag\)\{/);
      emitted.add(source.match(/vec3 shade\(float t\)\{[^\n]*/)[0]);
    }
  }
  assert.ok(emitted.size > 8, "colour system collapsed to too few distinct shaders");
});

test("every trait key is populated and bounded", () => {
  const graph = createGraph([3,1,4,1]);
  for (const key of TRAIT_KEYS) {
    assert.equal(typeof graph.traits[key], "number", key);
    assert.ok(graph.traits[key] >= 0 && graph.traits[key] <= 1, key);
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
  assert.equal(a.generator, "tsdne-procedural-v2");
  for (const value of Object.values(a.traits)) {
    assert.ok(value >= 0 && value <= 1);
  }
  assert.ok(a.traits.complexity >= .42);
});

test("complex candidates contain no model lineage", () => {
  const candidate = generateComplexCandidate([5,6,7,8], "aurora-ribbons");
  assert.equal(candidate.origin, "authored-procedural");
  assert.equal(candidate.model ?? null, null);
  assert.equal(candidate.parentId ?? null, null);
  assert.equal(candidate.mutation ?? null, null);
  assert.match(candidate.source, /void main/);
});
