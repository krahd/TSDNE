import test from "node:test";
import assert from "node:assert/strict";
import {
  compactPerception,
  descriptorDistance,
  flashScreening,
  isTooSimilar,
  nearestDistance,
  qualityAssessment,
  sequenceDescriptor,
} from "../prototype/src/perception.js";
import { sanitiseTrace } from "../prototype/src/history.js";

const frame=(size,value,shift=0)=>{
  const pixels=new Uint8Array(size*size*4);
  for(let i=0;i<pixels.length;i+=4){
    const x=(i/4)%size,valueAtPixel=(value+x*shift)%256;
    pixels[i]=valueAtPixel;
    pixels[i+1]=(valueAtPixel*1.3)%256;
    pixels[i+2]=(valueAtPixel*1.7)%256;
    pixels[i+3]=255;
  }
  return pixels;
};
const solid=(size,value)=>frame(size,value,0);

test("identical dynamic descriptors are close",()=>{
  const size=16;
  const a=sequenceDescriptor([frame(size,30,5),frame(size,60,5),frame(size,90,5)],size);
  const b=sequenceDescriptor([frame(size,30,5),frame(size,60,5),frame(size,90,5)],size);
  assert.equal(descriptorDistance(a,b),0);
});

test("distinct descriptors are farther apart",()=>{
  const size=16;
  const a=sequenceDescriptor([frame(size,10,1),frame(size,12,1),frame(size,14,1)],size);
  const b=sequenceDescriptor([frame(size,120,9),frame(size,180,9),frame(size,40,9)],size);
  assert.ok(descriptorDistance(a,b)>.08);
});

test("nearest-history comparison rejects duplicates",()=>{
  const size=16,p=sequenceDescriptor([frame(size,30,5),frame(size,60,5)],size);
  const candidate={id:"a",perception:p,structuralVector:[.1,.2]};
  const records=[{id:"b",perception:p,structuralVector:[.1,.2]}];
  assert.equal(isTooSimilar(candidate,records).tooSimilar,true);
});

// Regression: the stored anti-repetition trace is non-reconstructive and carries
// no structural vector. Blending in an absent structural axis floored the
// combined distance at 0.28 — above the default threshold — so a shader compared
// against its own stored trace was never recognised as a repeat.
test("a shader is recognised as a repeat of its own stored perceptual trace",()=>{
  const size=16,p=sequenceDescriptor([frame(size,30,5),frame(size,60,5)],size);
  const trace=sanitiseTrace({family:"folded-flow",perception:compactPerception(p)});
  assert.ok(!("structuralVector" in trace),"stored traces must stay non-reconstructive");
  const candidate={id:"a",perception:compactPerception(p),structuralVector:[.1,.2,.3]};
  const nearest=nearestDistance(candidate,[trace]);
  assert.equal(nearest.distance,0);
  assert.equal(isTooSimilar(candidate,[trace]).tooSimilar,true);
});

test("the structural axis still contributes when both sides carry a vector",()=>{
  const size=16,p=sequenceDescriptor([frame(size,30,5),frame(size,60,5)],size);
  const candidate={id:"a",perception:p,structuralVector:[0,0,0]};
  const records=[{id:"b",perception:p,structuralVector:[1,1,1]}];
  assert.equal(nearestDistance(candidate,records).distance,.28);
  assert.equal(isTooSimilar(candidate,records).tooSimilar,false);
});

test("quality assessment reports flat frames",()=>{
  const size=16,p=sequenceDescriptor([solid(size,40),solid(size,40)],size);
  const result=qualityAssessment(p,{varianceMin:100,motionMin:1});
  assert.equal(result.pass,false);
  assert.ok(result.reasons.includes("too-flat"));
});

test("dense screen detects repeated full-frame flashing",()=>{
  const size=8,fps=60,frames=[];
  for(let i=0;i<=fps;i++)frames.push(solid(size,Math.floor(i/3)%2===0?0:255));
  const result=flashScreening(frames,size,{fps});
  assert.equal(result.pass,false);
  assert.ok(result.maxTransitionsInWindow>=3);
});

test("dense screen accepts a stable sequence",()=>{
  const size=8,fps=60,frames=Array.from({length:fps+1},()=>solid(size,80));
  const result=flashScreening(frames,size,{fps});
  assert.equal(result.pass,true);
  assert.equal(result.maxTransitionsInWindow,0);
});
