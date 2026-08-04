import test from "node:test";
import assert from "node:assert/strict";
import { GENERATED_SHADER_NOTICE, exportFiles, technicalManifest } from "../prototype/src/export.js";

const candidate = {
  family:"folded-flow",
  seed:[1,2,3,4],
  graph:{generator:"tsdne-procedural-v1",family:"folded-flow",seed:[1,2,3,4]},
  source:"#version 300 es\nprecision highp float;\nout vec4 outColor;\nuniform vec2 u_resolution;\nuniform float u_time;\nuniform float u_motion;\nuniform float u_intensity;\nvoid main(){outColor=vec4(1.0);}",
  provenance:{generatorVersion:"tsdne-procedural-v1",sourceHash:"a".repeat(64),graphHash:"b".repeat(64)},
};

test("manifest is explicitly technical rather than a certificate", () => {
  const manifest = technicalManifest(candidate);
  assert.equal(manifest.documentType, "technical-manifest-not-certificate");
  assert.equal(manifest.position.confersTitle, false);
  assert.equal(manifest.position.claimsUniqueness, false);
  assert.deepEqual(manifest.graph, candidate.graph);
});

test("public wording abolishes title and refuses claim", () => {
  assert.match(GENERATED_SHADER_NOTICE, /retains provenance but abolishes title/i);
  assert.match(GENERATED_SHADER_NOTICE, /not claimed/i);
});

test("export package remains reconstructable and non-collectible", () => {
  const files = exportFiles(candidate);
  assert.equal(Object.keys(files).length, 6);
  assert.ok(files["tsdne-manifest.json"].includes("technical-manifest-not-certificate"));
  assert.ok(files["tsdne-shader.frag"].includes(candidate.provenance.sourceHash));
});
