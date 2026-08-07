import test from "node:test";
import assert from "node:assert/strict";
import { serialiseCandidateForAudit } from "../prototype/src/runtime.js";

test("runtime audit serialises reconstructive production state and selector context",()=>{
  const candidate={id:"x",seed:[1,2,3,4],family:"folded-flow",colorMode:"mono",finish:"clean",graph:{traits:{variant:.2}},structuralVector:[.1],estimatedCost:6,origin:"authored-procedural",createdAt:"now",provenance:{sourceHash:"s",graphHash:"g"},perception:{mean:1},quality:{pass:true},flashScreen:{pass:true}};
  const item=serialiseCandidateForAudit(candidate,{score:.8,novelty:.7});
  assert.equal(item.category,"continuous");
  assert.equal(item.variant,.2);
  assert.equal(item.selection.novelty,.7);
  assert.deepEqual(item.seed,[1,2,3,4]);
});
