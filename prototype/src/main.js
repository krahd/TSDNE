import{generateCandidate}from"./generator.js";
import{createRenderer,qualityMetrics}from"./webgl.js";
import{exportBundle}from"./export.js";

const canvas=document.querySelector("#stage"),status=document.querySelector("#status"),panel=document.querySelector("#panel"),panelTitle=document.querySelector("#panel-title"),panelContent=document.querySelector("#panel-content"),renderer=createRenderer(canvas);
const HISTORY_KEY="tsdne-prototype-signatures-v1";
let stored=[];
try{stored=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");}catch{stored=[];}
const history=new Set(stored);
let current=null,start=performance.now();

function persist(signature){history.add(signature);const bounded=[...history].slice(-500);try{localStorage.setItem(HISTORY_KEY,JSON.stringify(bounded));}catch{}}
function passes(m){return m.mean>14&&m.mean<242&&m.variance>130&&m.temporal>1.2;}

async function nextCandidate(){
  status.textContent="generating locally…";
  let selected=null,lastError="No candidate passed the baseline checks.";
  for(let attempt=0;attempt<32;attempt++){
    const candidate=generateCandidate();
    if(history.has(candidate.signature))continue;
    try{
      renderer.setFragmentSource(candidate.source);
      const a=renderer.sample(1.37),b=renderer.sample(2.83),metrics=qualityMetrics(a,b);
      if(!passes(metrics))continue;
      selected={...candidate,metrics};break;
    }catch(error){lastError=error instanceof Error?error.message:String(error);}
  }
  if(!selected)throw new Error(lastError);
  current=selected;persist(selected.signature);start=performance.now();renderer.setFragmentSource(selected.source);
  status.textContent=`${selected.family} · ${selected.id.slice(0,12)} · local prototype`;
}

function animate(now){renderer.render((now-start)/1000);requestAnimationFrame(animate);}

function showUse(){
  if(!current)return;
  const bundle=exportBundle(current);
  panelTitle.textContent="Use this shader";
  panelContent.innerHTML=`<p class="meta">Encounter <code>${current.id}</code><br>Family <code>${current.family}</code>. The production release will add tested WebGL, Three.js, ShaderToy, and ISF templates.</p><div class="actions"><button id="copy" type="button">copy shader bundle</button></div><textarea id="code" spellcheck="false" aria-label="Exported shader code"></textarea>`;
  const area=panelContent.querySelector("#code");area.value=bundle;
  panelContent.querySelector("#copy").addEventListener("click",async()=>{await navigator.clipboard.writeText(bundle);});
  panel.showModal();
}

function showAbout(){
  panelTitle.textContent="This Shader Does Not Exist";
  panelContent.innerHTML=`<p>This is a dependency-free architectural prototype. It generates a shader on this device, rejects coarse blank or static failures, and avoids repeating recent structural signatures in this browser. The final artwork will use a typed generator and substantially stronger aesthetic and perceptual selection.</p><p>Choosing <strong>another</strong> relinquishes the current encounter. Choosing <strong>use this shader</strong> lets the code continue elsewhere.</p>`;
  panel.showModal();
}

function showError(error){console.error(error);status.textContent=`generation error: ${error instanceof Error?error.message:String(error)}`;}
document.querySelector("#another").addEventListener("click",()=>nextCandidate().catch(showError));
document.querySelector("#use").addEventListener("click",showUse);
document.querySelector("#about").addEventListener("click",showAbout);
window.addEventListener("resize",()=>renderer.resize());
nextCandidate().catch(showError);requestAnimationFrame(animate);
