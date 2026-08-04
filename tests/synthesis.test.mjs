import test from "node:test";
import assert from "node:assert/strict";
import {
  enrichGraph,
  familyDistance,
  nearestPerceptualDistance,
  scoreCandidate,
  selectCandidate,
  visualComplexityScore,
} from "../prototype/src/synthesis.js";

const perception = (mean, variance, edge, temporal, saturation = .25) => ({
  mean, variance, edge, temporal, saturation,
  frames: [{
    luminanceHistogram: Array(16).fill(1/16),
    colorHistogram: {r:Array(8).fill(1/8),g:Array(8).fill(1/8),b:Array(8).fill(1/8)},
    hash: "01".repeat(32),
  }],
});

const candidate = (family, p, cost = 10) => ({family, perception:p, estimatedCost:cost});

test("enrichment raises structural articulation without forcing every trait to one", () => {
  const graph = {
    generator:"old",
    traits:{complexity:.1,density:.2,turbulence:.3,depth:.4,contrast:.5,softness:.6,symmetry:.7,rotation:.8,tempo:.9},
  };
  const enriched = enrichGraph(graph);
  assert.equal(enriched.generator, "tsdne-procedural-v1");
  assert.ok(enriched.traits.complexity >= .68);
  assert.ok(enriched.traits.density > graph.traits.density);
  assert.ok(enriched.traits.complexity < 1);
});

test("novelty is measured against non-reconstructive perceptual traces", () => {
  const p = perception(120, 4000, 22, 9);
  assert.equal(nearestPerceptualDistance(candidate("a",p), []), 1);
  assert.ok(nearestPerceptualDistance(candidate("a",p), [{perception:p}]) < .01);
});

test("family distance discourages immediate repetition without modelling preference", () => {
  assert.equal(familyDistance(candidate("a", perception(1,1,1,1)), ["b","a"]), 0);
  assert.ok(familyDistance(candidate("c", perception(1,1,1,1)), ["b","a"]) > 0);
});

test("complexity score rewards articulated but balanced visual behaviour", () => {
  const rich = candidate("a", perception(126, 7000, 45, 20, .28), 15);
  const flat = candidate("a", perception(10, 20, 1, .1, 0), 6);
  assert.ok(visualComplexityScore(rich) > visualComplexityScore(flat));
});

test("early selection privileges perceptual distance", () => {
  const history = [{perception:perception(120,4000,20,8)}];
  const near = candidate("a", perception(121,4100,20,8), 16);
  const far = candidate("b", perception(210,900,4,1), 9);
  const chosen = selectCandidate([near,far], history, ["a"], {earlyEncounter:true});
  assert.equal(chosen.candidate, far);
  assert.ok(scoreCandidate(far,history,["a"],{earlyEncounter:true}).novelty > scoreCandidate(near,history,["a"],{earlyEncounter:true}).novelty);
});
