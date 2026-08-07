import test from "node:test";
import assert from "node:assert/strict";
import { createRecord, curationCSV, curationExport, normaliseRating } from "../prototype/src/curation-data.js";

const session = { sessionId:"session-1", sessionOrdinal:2, startedAt:"2026-08-07T00:00:00Z" };
const encounter = {
  encounterNumber:7, shownAt:"2026-08-07T00:01:00Z", runtimeSettings:{reducedMotion:false},
  candidate:{id:"c",family:"folded-flow",category:"continuous",colorMode:"mono",finish:"clean",variant:.5,provenance:{sourceHash:"s",graphHash:"g"},perception:{mean:120,variance:1000,edge:30,saturation:.2,temporal:8}},
  audit:{runtimeVersion:"r",selectorVersion:"sel",generatorVersion:"gen",generationDurationMs:42,validPoolSize:9,attempts:[],selectedScore:{score:.8,novelty:.7,complexity:.6,family:.9,mode:.8}},
};

test("curation vocabulary is exactly OK / not-OK / repetitive",()=>{
  assert.equal(normaliseRating("ok"),"ok");
  assert.equal(normaliseRating("not-ok"),"not-ok");
  assert.equal(normaliseRating("repetitive"),"repetitive");
  assert.throws(()=>normaliseRating("skip"));
});

test("record preserves production audit without inventing preference",()=>{
  const record=createRecord({session,ordinal:11,sessionOrdinal:3,rating:"repetitive",encounter,displayDurationMs:1234,environment:{},build:{appVersion:"0.3.0-alpha.1",gitCommit:"abc"},thumbnailDataURL:"data:image/webp;base64,x"});
  assert.equal(record.rating,"repetitive");
  assert.equal(record.encounter.audit.selectorVersion,"sel");
  assert.equal(record.encounter.candidate.category,"continuous");
  assert.equal(record.runtimeSettings.reducedMotion,false);
});

test("export states that ratings do not adapt generation online",()=>{
  const record=createRecord({session,ordinal:1,sessionOrdinal:1,rating:"ok",encounter,displayDurationMs:1,environment:{},build:{}});
  const exported=curationExport([session],[record]);
  assert.equal(exported.study.onlineAdaptation,false);
  assert.match(exported.study.interpretation,/do not alter generation/i);
  assert.match(curationCSV([record]),/"ok"/);
});
