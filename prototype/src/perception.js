const clamp01 = (v) => Math.max(0, Math.min(1, v));
const luminance = (r,g,b) => .2126*r + .7152*g + .0722*b;

export function frameDescriptor(pixels, size) {
  const count = size * size;
  const lum = new Float32Array(count);
  const luminanceHistogram = Array(16).fill(0);
  const colorHistogram = { r: Array(8).fill(0), g: Array(8).fill(0), b: Array(8).fill(0) };
  let sum = 0, sumSq = 0, edge = 0, saturated = 0;
  for (let i = 0, p = 0; i < count; i += 1, p += 4) {
    const r=pixels[p], g=pixels[p+1], b=pixels[p+2], l=luminance(r,g,b);
    lum[i]=l; sum+=l; sumSq+=l*l;
    luminanceHistogram[Math.min(15,Math.floor(l/16))] += 1;
    colorHistogram.r[Math.min(7,Math.floor(r/32))] += 1;
    colorHistogram.g[Math.min(7,Math.floor(g/32))] += 1;
    colorHistogram.b[Math.min(7,Math.floor(b/32))] += 1;
    if (Math.max(r,g,b)-Math.min(r,g,b)>180) saturated += 1;
    if (i%size>0) edge += Math.abs(l-lum[i-1]);
    if (i>=size) edge += Math.abs(l-lum[i-size]);
  }
  const mean=sum/count, variance=Math.max(0,sumSq/count-mean*mean);
  const normalise = (arr) => arr.map(v => v/count);
  const blocks=[];
  const blockSize=Math.max(1,Math.floor(size/8));
  for(let by=0;by<8;by++)for(let bx=0;bx<8;bx++){
    let total=0,n=0;
    for(let y=by*blockSize;y<Math.min(size,(by+1)*blockSize);y++)for(let x=bx*blockSize;x<Math.min(size,(bx+1)*blockSize);x++){total+=lum[y*size+x];n++;}
    blocks.push(n?total/n:mean);
  }
  const blockMean=blocks.reduce((a,b)=>a+b,0)/blocks.length;
  const hash=blocks.map(v=>v>=blockMean?1:0).join("");
  return {
    mean, variance, edge:edge/Math.max(1,count*2), saturation:saturated/count,
    luminanceHistogram:normalise(luminanceHistogram),
    colorHistogram:{r:normalise(colorHistogram.r),g:normalise(colorHistogram.g),b:normalise(colorHistogram.b)},
    hash,
  };
}

function meanAbsoluteFrameDifference(a,b){
  let total=0,max=0,largeChange=0,count=a.length/4;
  for(let p=0;p<a.length;p+=4){
    const d=Math.abs(luminance(a[p],a[p+1],a[p+2])-luminance(b[p],b[p+1],b[p+2]));
    total+=d;
    max=Math.max(max,d);
    if(d>120)largeChange++;
  }
  return{mean:total/count,max,largeChangeRatio:largeChange/count};
}

export function sequenceDescriptor(frames,size){
  const frameDescriptors=frames.map(frame=>frameDescriptor(frame,size));
  const transitions=[];
  for(let i=1;i<frames.length;i++)transitions.push(meanAbsoluteFrameDifference(frames[i-1],frames[i]));
  const avg=(key)=>frameDescriptors.reduce((sum,f)=>sum+f[key],0)/frameDescriptors.length;
  return {
    version:"tsdne-perception-v2", size, frames:frameDescriptors,
    mean:avg("mean"), variance:avg("variance"), edge:avg("edge"), saturation:avg("saturation"),
    temporal:transitions.length?transitions.reduce((s,t)=>s+t.mean,0)/transitions.length:0,
    maxTemporal:transitions.length?Math.max(...transitions.map(t=>t.max)):0,
    largeChangeRatio:transitions.length?Math.max(...transitions.map(t=>t.largeChangeRatio)):0,
  };
}

/**
 * Screen-level high-frequency luminance-change heuristic.
 *
 * This is not a clinical photosensitive-epilepsy test and not a WCAG
 * certification. It samples consecutive rendered frames, estimates the
 * proportion of the screen undergoing a large luminance transition, and
 * rejects sequences with three or more substantial transitions in a rolling
 * one-second window.
 */
export function flashScreening(
  frames,
  size,
  {
    fps = 60,
    luminanceDelta = 100,
    changedAreaThreshold = 0.1,
    maxTransitionsPerSecond = 3,
  } = {},
) {
  if (!Array.isArray(frames) || frames.length < 2) {
    return {
      version: "tsdne-flash-screen-v1",
      pass: false,
      reason: "insufficient-frames",
      fps,
      maxTransitionsInWindow: 0,
      maxChangedArea: 0,
    };
  }
  const count = size * size;
  const events = [];
  let maxChangedArea = 0;
  for (let i = 1; i < frames.length; i += 1) {
    const previous = frames[i - 1];
    const current = frames[i];
    let changed = 0;
    for (let p = 0; p < current.length; p += 4) {
      const before = luminance(previous[p], previous[p+1], previous[p+2]);
      const after = luminance(current[p], current[p+1], current[p+2]);
      if (Math.abs(after - before) >= luminanceDelta) changed += 1;
    }
    const changedArea = changed / count;
    maxChangedArea = Math.max(maxChangedArea, changedArea);
    events.push(changedArea >= changedAreaThreshold ? 1 : 0);
  }

  const windowSize = Math.max(1, Math.round(fps));
  let rolling = 0;
  let maxTransitionsInWindow = 0;
  for (let i = 0; i < events.length; i += 1) {
    rolling += events[i];
    if (i >= windowSize) rolling -= events[i - windowSize];
    maxTransitionsInWindow = Math.max(maxTransitionsInWindow, rolling);
  }

  return {
    version: "tsdne-flash-screen-v1",
    pass: maxTransitionsInWindow < maxTransitionsPerSecond,
    reason: maxTransitionsInWindow < maxTransitionsPerSecond ? null : "repeated-large-luminance-transitions",
    fps,
    frames: frames.length,
    durationSeconds: (frames.length - 1) / fps,
    maxTransitionsInWindow,
    maxChangedArea,
    luminanceDelta,
    changedAreaThreshold,
  };
}

const vectorDistance=(a,b)=>{let sum=0,n=Math.min(a.length,b.length);for(let i=0;i<n;i++){const d=a[i]-b[i];sum+=d*d;}return n?Math.sqrt(sum/n):1;};
const hashDistance=(a,b)=>{let d=0,n=Math.min(a.length,b.length);for(let i=0;i<n;i++)if(a[i]!==b[i])d++;return n?d/n:1;};
function flattenColor(d){return [...d.colorHistogram.r,...d.colorHistogram.g,...d.colorHistogram.b];}

export function descriptorDistance(a,b){
  if(!a||!b)return 1;
  const af=a.frames?.[0], bf=b.frames?.[0];
  if(!af||!bf)return 1;
  const hist=vectorDistance(af.luminanceHistogram,bf.luminanceHistogram);
  const color=vectorDistance(flattenColor(af),flattenColor(bf));
  const hash=hashDistance(af.hash,bf.hash);
  const stats=Math.min(1,(Math.abs(a.mean-b.mean)/96+Math.abs(Math.sqrt(a.variance)-Math.sqrt(b.variance))/80+Math.abs(a.edge-b.edge)/60+Math.abs(a.temporal-b.temporal)/40)/4);
  return clamp01(hash*.36+hist*.22+color*.18+stats*.24);
}

export function structuralDistance(a,b){
  if(!a||!b)return 1;let sum=0,n=Math.min(a.length,b.length);for(let i=0;i<n;i++){const d=a[i]-b[i];sum+=d*d;}return clamp01(Math.sqrt(sum/Math.max(1,n))*1.8);
}

export function qualityAssessment(descriptor,meta,{reducedMotion=false,flashScreen=null}={}){
  const reasons=[];
  if(descriptor.mean<12)reasons.push("too-dark");
  if(descriptor.mean>244)reasons.push("too-bright");
  if(descriptor.variance<(meta?.varianceMin??90))reasons.push("too-flat");
  if(!reducedMotion&&descriptor.temporal<(meta?.motionMin??.7))reasons.push("too-static");
  if(descriptor.saturation>.72)reasons.push("over-saturated");
  if(flashScreen&&!flashScreen.pass)reasons.push("high-frequency-luminance-change");
  return {pass:reasons.length===0,reasons,flashScreen};
}

export function nearestDistance(candidate,records){let nearest=1,nearestId=null;for(const record of records){const visual=descriptorDistance(candidate.perception,record.perception);const structural=structuralDistance(candidate.structuralVector,record.structuralVector);const combined=visual*.72+structural*.28;if(combined<nearest){nearest=combined;nearestId=record.id;}}return{distance:nearest,id:nearestId};}
export function isTooSimilar(candidate,records,{threshold=.105}={}){const nearest=nearestDistance(candidate,records);return{tooSimilar:nearest.distance<threshold,...nearest};}

export function compactPerception(d){return{version:d.version,size:d.size,mean:+d.mean.toFixed(3),variance:+d.variance.toFixed(3),edge:+d.edge.toFixed(3),saturation:+d.saturation.toFixed(4),temporal:+d.temporal.toFixed(3),maxTemporal:+d.maxTemporal.toFixed(3),largeChangeRatio:+d.largeChangeRatio.toFixed(4),frames:d.frames.map(f=>({mean:+f.mean.toFixed(3),variance:+f.variance.toFixed(3),edge:+f.edge.toFixed(3),saturation:+f.saturation.toFixed(4),luminanceHistogram:f.luminanceHistogram.map(v=>+v.toFixed(5)),colorHistogram:{r:f.colorHistogram.r.map(v=>+v.toFixed(5)),g:f.colorHistogram.g.map(v=>+v.toFixed(5)),b:f.colorHistogram.b.map(v=>+v.toFixed(5))},hash:f.hash}))};}
