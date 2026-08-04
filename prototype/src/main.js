import { describeCandidate, familyMeta, generateCandidate, mutateCandidate, mutationMagnitude, normaliseMutation } from "./generator.js";
import { createRenderer } from "./webgl.js";
import { compactPerception, flashScreening, isTooSimilar, qualityAssessment, sequenceDescriptor } from "./perception.js";
import { clearHistory, loadRecent, saveEncounter } from "./history.js";
import { disableLocalAI, interruptLocalAI, loadLocalAI, localAISupport, MODEL_APPROX_MB, MODEL_CATALOG, MODEL_ID, proposeMutation, selectLocalAIModel, WEBLLM_RUNTIME_HOST, WEBLLM_VERSION } from "./ai.js";
import { downloadText, exportFiles } from "./export.js";
import { clearMetrics, measure, metricSummary } from "./metrics.js";

const $=(s)=>document.querySelector(s);
const canvases=[$("#stage-a"),$("#stage-b")],renderers=canvases.map(c=>createRenderer(c,{onContextLost:()=>announce("graphics context lost; attempting recovery")}));
const validatorCanvas=document.createElement("canvas"),validator=createRenderer(validatorCanvas);
const status=$("#status"),aiState=$("#ai-state"),anotherButton=$("#another"),useButton=$("#use"),aboutButton=$("#about"),pauseButton=$("#pause"),panel=$("#panel"),panelTitle=$("#panel-title"),panelContent=$("#panel-content"),live=$("#live-region");
const AWAKENING_DWELL_MS=12000,AWAKENING_TRANSITION_MS=7000;
const SAMPLE_TIMES=[.73,2.11,4.47],SAMPLE_SIZE=64,MAX_ATTEMPTS=72,TARGET_VALID_CANDIDATES=4;
const FLASH_SAMPLE_FPS=60,FLASH_SAMPLE_SECONDS=1.25,FLASH_SAMPLE_SIZE=24;
const FLASH_SAMPLE_TIMES=Array.from({length:Math.floor(FLASH_SAMPLE_FPS*FLASH_SAMPLE_SECONDS)+1},(_,index)=>index/FLASH_SAMPLE_FPS);
const motionQuery=matchMedia("(prefers-reduced-motion: reduce)");
let settings={paused:false,reducedMotion:motionQuery.matches,reducedIntensity:false,localAIEnabled:false};
try{settings={...settings,...JSON.parse(localStorage.getItem("tsdne-settings-v1")||"{}")};}catch{}
let recent=await loadRecent(350),activeIndex=0,current=null,encounterNumber=0,currentEncounterStarted=performance.now(),transitionTimer=null,animationFrame=null;
const rendererStarts=[performance.now(),performance.now()];
let localAI={state:"idle",detail:"",progress:0},awakeningStarted=false,awakeningCompleted=false,prefetchedHybrid=null,prefetching=null,generationBusy=false;

function persistSettings(){try{localStorage.setItem("tsdne-settings-v1",JSON.stringify(settings));}catch{}}
function announce(message){live.textContent="";requestAnimationFrame(()=>{live.textContent=message;});}
function setStatus(message){status.textContent=message;}
function applyRenderSettings(){const motion=settings.paused?0:settings.reducedMotion ? 0.12 : 1,intensity=settings.reducedIntensity ? 0.58 : 1;for(const r of [...renderers,validator])r.setSettings({motion,intensity});pauseButton.textContent=settings.paused?"play":"pause";pauseButton.setAttribute("aria-pressed",String(settings.paused));document.documentElement.dataset.reducedMotion=String(settings.reducedMotion);document.documentElement.dataset.reducedIntensity=String(settings.reducedIntensity);}
applyRenderSettings();

function candidateRecord(candidate){return{id:candidate.id,createdAt:candidate.createdAt,family:candidate.family,origin:candidate.origin,signature:candidate.signature,structuralVector:candidate.structuralVector,perception:candidate.perception,model:candidate.model||null,mutation:candidate.mutation||null};}
async function validateCandidate(candidate){
  if(candidate.estimatedCost>13)return null;
  validator.setFragmentSource(candidate.source);
  const renderOptions={motion:settings.reducedMotion ? 0.12 : 1,intensity:settings.reducedIntensity ? 0.58 : 1};
  const frames=validator.sampleSequence(SAMPLE_TIMES,SAMPLE_SIZE,renderOptions);
  const perception=sequenceDescriptor(frames,SAMPLE_SIZE);
  const preliminary=qualityAssessment(perception,familyMeta(candidate.family),{reducedMotion:settings.reducedMotion});
  if(!preliminary.pass)return null;
  const flashFrames=validator.sampleSequence(FLASH_SAMPLE_TIMES,FLASH_SAMPLE_SIZE,renderOptions);
  const flashScreen=flashScreening(flashFrames,FLASH_SAMPLE_SIZE,{fps:FLASH_SAMPLE_FPS});
  const assessment=qualityAssessment(perception,familyMeta(candidate.family),{reducedMotion:settings.reducedMotion,flashScreen});
  if(!assessment.pass)return null;
  const completed={...candidate,perception:compactPerception(perception),quality:assessment,flashScreen};
  const similarity=isTooSimilar(completed,recent,{threshold:.105});
  if(similarity.tooSimilar)return null;
  return{...completed,nearestPrior:similarity};
}
function familyFrequency(family){return recent.reduce((count,record)=>count+(record.family===family?1:0),0);}
function candidateSelectionScore(candidate){return candidate.nearestPrior.distance-familyFrequency(candidate.family)*.0015;}
async function generateValidProceduralCandidate(){
  const started=performance.now(),valid=[];
  let lastError="No candidate passed validation.";
  for(let attempt=0;attempt<MAX_ATTEMPTS&&valid.length<TARGET_VALID_CANDIDATES;attempt++){
    try{const candidate=await validateCandidate(generateCandidate());if(candidate)valid.push(candidate);}
    catch(error){lastError=error instanceof Error?error.message:String(error);}
  }
  if(valid.length){
    valid.sort((a,b)=>candidateSelectionScore(b)-candidateSelectionScore(a));
    const selected=valid[0];
    measure("procedural-candidate",started,{validCandidates:valid.length,family:selected.family,selection:"recent-distance-and-family-coverage"});
    return selected;
  }
  measure("procedural-candidate-failed",started,{attempts:MAX_ATTEMPTS});
  throw new Error(lastError);
}
async function acceptCandidate(candidate){recent.push(candidateRecord(candidate));recent=recent.slice(-500);await saveEncounter(candidateRecord(candidate),500);}
function originLabel(candidate){if(candidate.origin==="model-proposal")return"validated local-model proposal";if(candidate.origin==="random-baseline")return"validated random baseline";if(candidate.origin==="authored-baseline")return"validated authored baseline";return"procedural";}
function displayLabel(candidate){setStatus(`${candidate.family} · ${candidate.id.slice(0,12)} · ${originLabel(candidate)}`);}
function showCandidate(candidate,{transitionMs=900}={}){clearTimeout(transitionTimer);const previous=activeIndex,next=transitionMs>0&&current?1-activeIndex:activeIndex;renderers[next].setFragmentSource(candidate.source);rendererStarts[next]=performance.now();if(next!==previous){const duration=settings.reducedMotion?0:transitionMs;canvases[next].style.transitionDuration=`${duration}ms`;canvases[previous].style.transitionDuration=`${duration}ms`;canvases[next].classList.add("active");canvases[previous].classList.remove("active");canvases[next].setAttribute("aria-hidden","false");canvases[previous].setAttribute("aria-hidden","true");transitionTimer=setTimeout(()=>{activeIndex=next;},duration);}activeIndex=next;current=candidate;currentEncounterStarted=performance.now();encounterNumber+=1;displayLabel(candidate);void acceptCandidate(candidate);announce(`New ${candidate.family} shader, ${originLabel(candidate)}.`);}
async function nextCandidate(){if(generationBusy)return;generationBusy=true;anotherButton.disabled=true;setStatus("generating locally…");try{let selected=prefetchedHybrid;prefetchedHybrid=null;if(!selected)selected=await generateValidProceduralCandidate();showCandidate(selected,{transitionMs:1100});scheduleAwakening();void prefetchHybridCandidate();}catch(error){showError(error);}finally{generationBusy=false;anotherButton.disabled=false;}}
function animate(now){for(let i=0;i<renderers.length;i++)renderers[i].render((now-rendererStarts[i])/1000);animationFrame=requestAnimationFrame(animate);}

function setAIState(state,detail="",progress=localAI.progress){localAI={...localAI,state,detail,progress};aiState.dataset.state=state;aiState.textContent=state==="ready"?"local model ready":state==="thinking"?"local model proposing":state==="loading"?`local model ${Math.round(progress*100)}%`:state==="available"?"local model optional":state==="failed"?"procedural mode":"procedural";aiState.title=detail||aiState.textContent;aiState.setAttribute("aria-label",detail||aiState.textContent);anotherButton.classList.toggle("ai-ready",state==="ready");}
async function createHybridFrom(base){
  const started=performance.now();
  const proposal=await proposeMutation(describeCandidate(base),{retries:2});
  const normalised=normaliseMutation(proposal);
  if(!normalised.effective)throw new Error("The local model proposal was valid JSON but contained no material mutation.");
  const mutated=mutateCandidate(base,proposal,{origin:"model-proposal",proposer:"webllm",model:MODEL_ID});
  const validated=await validateCandidate(mutated);
  measure(validated?"model-proposal-accepted":"model-proposal-rejected",started,{model:MODEL_ID,fromFamily:base.family,toFamily:mutated.family,magnitude:+mutationMagnitude(normalised).toFixed(4),activeChanges:normalised.activeChanges.length});
  return validated;
}
async function prefetchHybridCandidate(){if(localAI.state!=="ready"||prefetchedHybrid||prefetching||!settings.localAIEnabled)return;prefetching=(async()=>{try{const base=await generateValidProceduralCandidate(),hybrid=await createHybridFrom(base);if(hybrid)prefetchedHybrid=hybrid;}catch(error){console.warn("Local-model proposal failed or was rejected",error);}finally{prefetching=null;}})();return prefetching;}
async function awakenCurrentShader(){if(awakeningStarted||awakeningCompleted||localAI.state!=="ready"||!current||encounterNumber!==1)return;awakeningStarted=true;const expected=current.id;setAIState("thinking","The optional local model is making a bounded proposal that may be rejected.");try{const hybrid=await createHybridFrom(current);if(!hybrid||!current||current.id!==expected||encounterNumber!==1)return;showCandidate(hybrid,{transitionMs:AWAKENING_TRANSITION_MS});awakeningCompleted=true;setAIState("ready","A validated local-model proposal changed this encounter. No superiority over deterministic or random mutation is claimed.",1);}catch(error){console.warn("Local-model awakening failed",error);setAIState("ready","The proposal failed or was rejected. The procedural artwork is unchanged.",1);}finally{awakeningStarted=false;void prefetchHybridCandidate();}}
function scheduleAwakening(){if(awakeningStarted||awakeningCompleted||localAI.state!=="ready"||encounterNumber!==1||settings.reducedMotion)return;const delay=Math.max(0,AWAKENING_DWELL_MS-(performance.now()-currentEncounterStarted));setTimeout(()=>{if(document.visibilityState==="visible"&&!panel.open)void awakenCurrentShader();},delay);}
async function startLocalAI(){if(!settings.localAIEnabled){setAIState("available","Local AI is opt-in. Open about to enable the external runtime and model download.");return;}const support=localAISupport();if(!support.supported){setAIState("failed",`${support.reason}; procedural mode remains complete.`);return;}const started=performance.now();setAIState("loading",`Fetching the pinned WebLLM runtime from ${WEBLLM_RUNTIME_HOST} and downloading approximately ${MODEL_APPROX_MB} MB of model files. The artwork remains usable.`,0);try{await loadLocalAI(report=>{const progress=Number(report?.progress||0);setAIState("loading",report?.text||"Loading local model",progress);});measure("local-ai-load",started,{model:MODEL_ID,approxMB:MODEL_APPROX_MB,runtimeHost:WEBLLM_RUNTIME_HOST,runtimeVersion:WEBLLM_VERSION});setAIState("ready","The optional local proposal mechanism is ready. Click to invite it, or remain and the first shader may change.",1);scheduleAwakening();void prefetchHybridCandidate();}catch(error){measure("local-ai-load-failed",started,{model:MODEL_ID});console.warn("Local AI unavailable",error);setAIState("failed",`Local AI unavailable: ${error instanceof Error?error.message:String(error)}. Procedural mode remains complete.`);}}

function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function showUse(){if(!current)return;const files=exportFiles(current),names=Object.keys(files);panelTitle.textContent="Use this shader";panelContent.innerHTML=`<p class="meta">Encounter <code>${escapeHTML(current.id)}</code><br>Family <code>${escapeHTML(current.family)}</code><br>Origin <code>${escapeHTML(current.origin)}</code>${current.parentId?`<br>Parent <code>${escapeHTML(current.parentId)}</code>`:""}</p><p>The authored generator is GPL-3.0-or-later. The generated files carry a CC0 waiver to the extent any waivable rights exist; the record creates no ownership, scarcity, or exclusivity.</p><div class="export-grid" id="export-grid"></div><label for="code">Preview</label><textarea id="code" spellcheck="false"></textarea>`;const grid=$("#export-grid"),area=$("#code");for(const name of names){const button=document.createElement("button");button.type="button";button.textContent=`download ${name.split(".").pop()}`;button.addEventListener("click",()=>downloadText(name,files[name],name.endsWith(".html")?"text/html":"text/plain"));grid.append(button);}area.value=files[names[0]];const select=document.createElement("select");select.setAttribute("aria-label","Choose export preview");for(const name of names){const o=document.createElement("option");o.value=name;o.textContent=name;select.append(o);}select.addEventListener("change",()=>area.value=files[select.value]);grid.prepend(select);const copy=document.createElement("button");copy.type="button";copy.textContent="copy preview";copy.addEventListener("click",async()=>navigator.clipboard.writeText(area.value));grid.append(copy);panel.showModal();}
function settingsControls(){const options=MODEL_CATALOG.map(model=>`<option value="${model.id}" ${model.id===MODEL_ID?"selected":""}>${model.label} — ${model.role}</option>`).join("");return `<fieldset><legend>Experience settings</legend><label><input id="setting-motion" type="checkbox" ${settings.reducedMotion?"checked":""}> reduce shader motion and disable long transitions</label><label><input id="setting-intensity" type="checkbox" ${settings.reducedIntensity?"checked":""}> reduce colour intensity</label><label><input id="setting-ai" type="checkbox" ${settings.localAIEnabled?"checked":""}> opt in to the pinned external WebLLM runtime and local model download (approximately ${MODEL_APPROX_MB} MB)</label><label>local model for next reload <select id="setting-model">${options}</select></label><button id="clear-history" type="button">clear local encounter trace</button><button id="clear-metrics" type="button">clear local performance record</button></fieldset>`;}
function showAbout(){panelTitle.textContent="This Shader Does Not Exist";const metrics=escapeHTML(JSON.stringify(metricSummary(),null,2));panelContent.innerHTML=`<p>TSDNE presents one generated shader at a time. <strong>Another</strong> withdraws the current shader from this interface. <strong>Use this shader</strong> lets its executable source continue elsewhere.</p><p>The title is deliberately false: unlike the synthetic-image genre it cites, the shader exists as a running and transferable process.</p><p>The baseline artwork uses a bounded family program and deterministic validation. On capable devices, an optional local model may propose trait changes or a family change. A proposal is attributed, tested, and may be rejected. No claim is made that model proposals are better than random or authored mutations without comparative evidence.</p><p>No account, cross-site identifier, advertising system, server-side inference, or preference model is used. A bounded, clearable local encounter trace records what this browser was shown so that recent repetition can be reduced. It is not uploaded or interpreted as taste.</p><p>Enabling local AI contacts <code>${WEBLLM_RUNTIME_HOST}</code> for the pinned runtime <code>${WEBLLM_VERSION}</code> and external model hosts for model files. The download is optional and off by default.</p><p>The high-frequency luminance-change screen is a conservative automated heuristic, not clinical seizure-safety certification.</p><p class="meta">Model: <code>${MODEL_ID}</code><br>State: <code>${localAI.state}</code><br>${escapeHTML(localAI.detail)}</p>${settingsControls()}<details><summary>local performance record</summary><pre>${metrics}</pre></details><p><a href="./privacy.html">privacy</a> · <a href="./accessibility.html">accessibility</a> · keyboard: <kbd>N</kbd> another, <kbd>U</kbd> use, <kbd>Space</kbd> pause, <kbd>A</kbd> about</p>`;const bind=(id,key)=>$(id).addEventListener("change",e=>{settings[key]=e.target.checked;persistSettings();applyRenderSettings();if(key==="localAIEnabled"){if(settings.localAIEnabled)void startLocalAI();else{disableLocalAI();setAIState("available","Local AI is off. Procedural mode remains complete.");}}});bind("#setting-motion","reducedMotion");bind("#setting-intensity","reducedIntensity");bind("#setting-ai","localAIEnabled");$("#setting-model").addEventListener("change",event=>{try{selectLocalAIModel(event.target.value);announce("Model selection saved. Reload to use it.");}catch(error){announce(error.message);}});$("#clear-history").addEventListener("click",async()=>{await clearHistory();recent=[];announce("Local encounter trace cleared.");});$("#clear-metrics").addEventListener("click",()=>{clearMetrics();announce("Local performance record cleared.");});panel.showModal();}
function showError(error){console.error(error);setStatus(`generation error: ${error instanceof Error?error.message:String(error)}`);announce("A generation error occurred; procedural retry remains available.");}

anotherButton.addEventListener("click",()=>void nextCandidate());useButton.addEventListener("click",showUse);aboutButton.addEventListener("click",showAbout);pauseButton.addEventListener("click",()=>{settings.paused=!settings.paused;persistSettings();applyRenderSettings();announce(settings.paused?"Shader paused.":"Shader playing.");});aiState.addEventListener("click",()=>{if(localAI.state==="ready")void awakenCurrentShader();else if(localAI.state==="available")showAbout();else if(localAI.state==="failed"&&settings.localAIEnabled)void startLocalAI();});
window.addEventListener("keydown",event=>{if(panel.open||event.target.matches("textarea,input,select"))return;if(event.key.toLowerCase()==="n"){event.preventDefault();void nextCandidate();}else if(event.key.toLowerCase()==="u"){event.preventDefault();showUse();}else if(event.key.toLowerCase()==="a"){event.preventDefault();showAbout();}else if(event.code==="Space"){event.preventDefault();pauseButton.click();}});
window.addEventListener("resize",()=>renderers.forEach(r=>r.resize()));document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")void interruptLocalAI();});motionQuery.addEventListener?.("change",event=>{if(!localStorage.getItem("tsdne-settings-v1")){settings.reducedMotion=event.matches;applyRenderSettings();}});

await nextCandidate();animationFrame=requestAnimationFrame(animate);if(settings.localAIEnabled)setTimeout(()=>void startLocalAI(),700);else setAIState("available","Local AI is optional and off by default. Open about to enable it.");
