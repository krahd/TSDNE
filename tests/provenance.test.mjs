import test from "node:test";
import assert from "node:assert/strict";
import { attachInternalProvenance, PROVENANCE_POSITION, sha256Hex } from "../prototype/src/provenance.js";

test("SHA-256 provenance is deterministic", async () => {
  assert.equal(await sha256Hex("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("internal provenance identifies source and graph without conferring title", async () => {
  const candidate = {source:"void main(){}",graph:{generator:"v1",seed:[1,2,3,4]}};
  const enriched = await attachInternalProvenance(candidate);
  assert.equal(enriched.provenance.sourceHash.length, 64);
  assert.equal(enriched.provenance.graphHash.length, 64);
  assert.equal(PROVENANCE_POSITION.retainsProvenance, true);
  assert.equal(PROVENANCE_POSITION.confersTitle, false);
  assert.equal(PROVENANCE_POSITION.createsScarcity, false);
});
