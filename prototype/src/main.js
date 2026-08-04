import {
  describeCandidate,
  generateCandidate,
  mutateCandidate,
} from "./generator.js";
import { createRenderer, qualityMetrics } from "./webgl.js";
import { exportBundle } from "./export.js";
import { loadLocalAI, localAISupport, MODEL_ID, proposeMutation } from "./ai.js";

const canvases = [document.querySelector("#stage-a"), document.querySelector("#stage-b")];
const renderers = canvases.map((canvas) => createRenderer(canvas));
const validationCanvas = document.createElement("canvas");
const validator = createRenderer(validationCanvas);
const status = document.querySelector("#status");
const aiState = document.querySelector("#ai-state");
const anotherButton = document.querySelector("#another");
const panel = document.querySelector("#panel");
const panelTitle = document.querySelector("#panel-title");
const panelContent = document.querySelector("#panel-content");

const HISTORY_KEY = "tsdne-prototype-signatures-v2";
const MAX_HISTORY = 500;
const AWAKENING_DWELL_MS = 12000;
const AWAKENING_TRANSITION_MS = 7000;

let stored = [];
try {
  stored = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
} catch {
  stored = [];
}

const history = new Set(stored);
const rendererStarts = [performance.now(), performance.now()];
let activeIndex = 0;
let current = null;
let currentEncounterStarted = performance.now();
let encounterNumber = 0;
let transitionTimer = null;
let localAI = { state: "idle", detail: "", readyAt: null };
let awakeningStarted = false;
let awakeningCompleted = false;
let prefetchedHybrid = null;
let prefetching = null;

function persist(signature) {
  history.add(signature);
  const bounded = [...history].slice(-MAX_HISTORY);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(bounded));
  } catch {
    // Storage is an optimisation; the artwork remains functional without it.
  }
}

function passes(metrics) {
  return metrics.mean > 14 && metrics.mean < 242 && metrics.variance > 130 && metrics.temporal > 1.2;
}

function validateCandidate(candidate) {
  validator.setFragmentSource(candidate.source);
  const a = validator.sample(1.37);
  const b = validator.sample(2.83);
  const metrics = qualityMetrics(a, b);
  if (!passes(metrics)) return null;
  return { ...candidate, metrics };
}

async function generateValidProceduralCandidate() {
  let lastError = "No candidate passed the baseline checks.";
  for (let attempt = 0; attempt < 48; attempt += 1) {
    const candidate = generateCandidate();
    if (history.has(candidate.signature)) continue;
    try {
      const validated = validateCandidate(candidate);
      if (validated) return validated;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }
  throw new Error(lastError);
}

function setAIState(state, detail = "") {
  localAI = { ...localAI, state, detail };
  aiState.dataset.state = state;
  aiState.textContent = state === "ready" ? "local ai ready" : state === "thinking" ? "local ai thinking" : state === "loading" ? "local ai loading" : state === "failed" ? "procedural mode" : "procedural";
  aiState.title = detail || aiState.textContent;
  aiState.setAttribute("aria-label", detail || aiState.textContent);
  anotherButton.classList.toggle("ai-ready", state === "ready");
}

function displayLabel(candidate) {
  const origin = candidate.origin === "webllm" ? "local ai + procedural" : "procedural";
  status.textContent = `${candidate.family} · ${candidate.id.slice(0, 12)} · ${origin}`;
}

function showCandidate(candidate, { transitionMs = 900 } = {}) {
  clearTimeout(transitionTimer);
  const previousIndex = activeIndex;
  const nextIndex = transitionMs > 0 && current ? 1 - activeIndex : activeIndex;
  renderers[nextIndex].setFragmentSource(candidate.source);
  rendererStarts[nextIndex] = performance.now();

  if (nextIndex !== previousIndex) {
    canvases[nextIndex].style.transitionDuration = `${transitionMs}ms`;
    canvases[previousIndex].style.transitionDuration = `${transitionMs}ms`;
    canvases[nextIndex].classList.add("active");
    canvases[previousIndex].classList.remove("active");
    transitionTimer = setTimeout(() => {
      activeIndex = nextIndex;
    }, transitionMs);
  }

  activeIndex = nextIndex;
  current = candidate;
  currentEncounterStarted = performance.now();
  encounterNumber += 1;
  persist(candidate.signature);
  displayLabel(candidate);
}

async function nextCandidate() {
  anotherButton.disabled = true;
  try {
    let selected = prefetchedHybrid;
    prefetchedHybrid = null;
    if (!selected) selected = await generateValidProceduralCandidate();
    showCandidate(selected, { transitionMs: 1100 });
    scheduleAwakening();
    void prefetchHybridCandidate();
  } finally {
    anotherButton.disabled = false;
  }
}

function animate(now) {
  for (let index = 0; index < renderers.length; index += 1) {
    renderers[index].render((now - rendererStarts[index]) / 1000);
  }
  requestAnimationFrame(animate);
}

async function createHybridFrom(base) {
  const proposal = await proposeMutation(describeCandidate(base));
  const mutated = mutateCandidate(base, proposal, { origin: "webllm", model: MODEL_ID });
  if (history.has(mutated.signature)) return null;
  return validateCandidate(mutated);
}

async function prefetchHybridCandidate() {
  if (localAI.state !== "ready" || prefetchedHybrid || prefetching) return;
  prefetching = (async () => {
    try {
      const base = await generateValidProceduralCandidate();
      const hybrid = await createHybridFrom(base);
      if (hybrid) prefetchedHybrid = hybrid;
    } catch (error) {
      console.warn("Hybrid prefetch failed", error);
    } finally {
      prefetching = null;
    }
  })();
  return prefetching;
}

async function awakenCurrentShader() {
  if (awakeningStarted || awakeningCompleted || localAI.state !== "ready" || !current || encounterNumber !== 1) return;
  awakeningStarted = true;
  const expectedId = current.id;
  setAIState("thinking", "The local model is proposing one mutation to the current shader.");
  try {
    const hybrid = await createHybridFrom(current);
    if (!hybrid || !current || current.id !== expectedId || encounterNumber !== 1) return;
    showCandidate(hybrid, { transitionMs: AWAKENING_TRANSITION_MS });
    awakeningCompleted = true;
    setAIState("ready", "The local model has joined this encounter. Later shaders may also be hybrid.");
  } catch (error) {
    console.warn("In-place awakening failed", error);
    setAIState("ready", "The local model is ready for later encounters.");
  } finally {
    awakeningStarted = false;
    void prefetchHybridCandidate();
  }
}

function scheduleAwakening() {
  if (awakeningStarted || awakeningCompleted || localAI.state !== "ready" || encounterNumber !== 1) return;
  const elapsed = performance.now() - currentEncounterStarted;
  const delay = Math.max(0, AWAKENING_DWELL_MS - elapsed);
  setTimeout(() => {
    if (document.visibilityState === "visible" && !panel.open) void awakenCurrentShader();
  }, delay);
}

async function startLocalAI() {
  const support = localAISupport();
  if (!support.supported) {
    setAIState("failed", `${support.reason}; the complete procedural artwork remains available.`);
    return;
  }
  setAIState("loading", "A small model is loading locally. The artwork remains fully usable.");
  try {
    await loadLocalAI((report) => {
      const detail = report?.text || "Loading the local model";
      setAIState("loading", detail);
    });
    localAI.readyAt = performance.now();
    setAIState("ready", "The local model is ready. Click here to invite it now, or remain and the first shader may slowly change.");
    scheduleAwakening();
    void prefetchHybridCandidate();
  } catch (error) {
    console.warn("Local AI unavailable", error);
    setAIState("failed", "The local model could not load; the complete procedural artwork remains available.");
  }
}

function showUse() {
  if (!current) return;
  const bundle = exportBundle(current);
  panelTitle.textContent = "Use this shader";
  panelContent.innerHTML = `<p class="meta">Encounter <code>${current.id}</code><br>Family <code>${current.family}</code><br>Origin <code>${current.origin}</code>${current.parentId ? `<br>Parent <code>${current.parentId}</code>` : ""}.</p><p>The record confers no ownership or exclusivity. The code may be copied, modified, shared, studied, and used elsewhere.</p><div class="actions"><button id="copy" type="button">copy encounter record</button></div><textarea id="code" spellcheck="false" aria-label="Exported shader code"></textarea>`;
  const area = panelContent.querySelector("#code");
  area.value = bundle;
  panelContent.querySelector("#copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText(bundle);
  });
  panel.showModal();
}

function showAbout() {
  panelTitle.textContent = "This Shader Does Not Exist";
  const aiDescription = localAI.state === "ready" ? "A small local model is available in this browser and may propose constrained mutations." : localAI.state === "loading" ? "A small local model is loading in the background; the procedural artwork remains complete while it loads." : "This browser is currently using the procedural generator.";
  panelContent.innerHTML = `<p>TSDNE presents one generated shader at a time. Choosing <strong>another</strong> relinquishes the current encounter. Choosing <strong>use this shader</strong> lets the freely reusable code continue elsewhere.</p><p>The first shader is generated procedurally and appears immediately. ${aiDescription}</p><p>No account, profile, behavioural history, advertising identifier, or server-side prompt archive is used. Computationally distinct candidates are generated locally, and obvious recent repetition is reduced without claiming absolute visual uniqueness.</p><p class="meta">Prototype model: <code>${MODEL_ID}</code><br>AI state: <code>${localAI.state}</code></p>`;
  panel.showModal();
}

function showError(error) {
  console.error(error);
  status.textContent = `generation error: ${error instanceof Error ? error.message : String(error)}`;
}

anotherButton.addEventListener("click", () => nextCandidate().catch(showError));
document.querySelector("#use").addEventListener("click", showUse);
document.querySelector("#about").addEventListener("click", showAbout);
aiState.addEventListener("click", () => {
  if (localAI.state === "ready") void awakenCurrentShader();
});
window.addEventListener("resize", () => renderers.forEach((renderer) => renderer.resize()));
document.addEventListener("visibilitychange", scheduleAwakening);

(async () => {
  try {
    const first = await generateValidProceduralCandidate();
    showCandidate(first, { transitionMs: 0 });
    requestAnimationFrame(animate);
    window.setTimeout(() => void startLocalAI(), 300);
  } catch (error) {
    showError(error);
  }
})();
