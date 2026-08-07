import { COST_BUDGET, familyMeta } from "./generator.js";
import { createRenderer } from "./webgl.js";
import {
  compactPerception,
  flashScreening,
  qualityAssessment,
  sequenceDescriptor,
} from "./perception.js";
import {
  clearHistory,
  loadRecentTraces,
  savePerceptualTrace,
} from "./history.js";
import {
  familySchedule,
  generateComplexCandidate,
  selectCandidate,
} from "./synthesis.js";
import { attachInternalProvenance } from "./provenance.js";
import { downloadText, exportFiles } from "./export.js";

const $ = (selector) => document.querySelector(selector);
const canvases = [$("#stage-a"), $("#stage-b")];
const renderers = canvases.map((canvas) => createRenderer(canvas, {
  onContextLost: () => announce("The graphics context was interrupted."),
  onContextRestored: (error) => error && showError(error),
}));
const validatorCanvas = document.createElement("canvas");
const validator = createRenderer(validatorCanvas);

const anotherButton = $("#another");
const useButton = $("#use");
const aboutButton = $("#about");
const pauseButton = $("#pause");
const status = $("#status");
const statusText = $("#status-text");
const statusCount = $("#status-count");
const panel = $("#panel");
const panelTitle = $("#panel-title");
const panelContent = $("#panel-content");
const panelVersion = $("#panel-version");
const live = $("#live-region");

// The prototype is served as static files with no build step, so the version is
// declared here. Keep it in step with package.json and CITATION.cff on release.
const APP_VERSION = "0.2.0-alpha.1";
panelVersion.textContent = `v${APP_VERSION}`;

const SAMPLE_TIMES = [0.73, 2.11, 4.47];
const FLASH_TIMES = Array.from({ length: 13 }, (_, index) => index / 12);
const SAMPLE_SIZE = 64;
const FLASH_SIZE = 32;
const MAX_ATTEMPTS = 48;
const HISTORY_LIMIT = 500;
const EARLY_ENCOUNTERS = 4;
// Search runs in slices of roughly this length so the running shader keeps
// animating and the activity indicator keeps turning while work continues.
const FRAME_BUDGET_MS = 10;
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");

let settings = {
  paused: false,
  reducedMotion: motionQuery.matches,
  reducedIntensity: false,
};
try {
  settings = {
    ...settings,
    ...JSON.parse(localStorage.getItem("tsdne-settings-v2") || "{}"),
  };
} catch {}

let recentTraces = await loadRecentTraces(HISTORY_LIMIT);
let recentFamilies = recentTraces.slice(-8).map((trace) => trace.family);
// Session-only: colour modes are never written to the local trace store.
let recentModes = [];
let activeIndex = 0;
let current = null;
let encounterNumber = 0;
let prefetched = null;
let prefetching = null;
let generating = false;
let transitionTimer = null;
let animationFrame = null;
const rendererStarts = [performance.now(), performance.now()];

function persistSettings() {
  try { localStorage.setItem("tsdne-settings-v2", JSON.stringify(settings)); } catch {}
}

function announce(message) {
  live.textContent = "";
  requestAnimationFrame(() => { live.textContent = message; });
}

/**
 * The visible status line. `detail` carries the search counter and is hidden
 * from assistive technology: the live region should announce that generation
 * is under way once, not re-announce every increment.
 */
function setStatus(message = "", { busy = false, detail = "" } = {}) {
  statusText.textContent = message;
  statusCount.textContent = detail;
  status.classList.toggle("busy", busy);
  status.hidden = !message;
}

/**
 * Hand the main thread back long enough for one paint. Falls back to a timer
 * so a backgrounded tab, where animation frames stop firing, still finishes
 * whatever it started.
 */
function nextFrame() {
  return new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    requestAnimationFrame(done);
    setTimeout(done, 50);
  });
}

function applyRenderSettings() {
  const motion = settings.paused ? 0 : settings.reducedMotion ? 0.12 : 1;
  const intensity = settings.reducedIntensity ? 0.58 : 1;
  for (const renderer of [...renderers, validator]) renderer.setSettings({ motion, intensity });
  pauseButton.textContent = settings.paused ? "play" : "pause";
  pauseButton.setAttribute("aria-pressed", String(settings.paused));
  document.documentElement.dataset.reducedMotion = String(settings.reducedMotion);
  document.documentElement.dataset.reducedIntensity = String(settings.reducedIntensity);
}
applyRenderSettings();

/**
 * Two stages, cheapest first. Most rejections are decided by the three-frame
 * perceptual sample, so the thirteen-frame flash screen is only paid for by
 * candidates that would otherwise be shown. Every candidate that reaches the
 * screen has still passed the flash screen.
 */
function validateCandidate(candidate) {
  if (candidate.estimatedCost > COST_BUDGET) return null;

  validator.setFragmentSource(candidate.source);
  const sampleSettings = {
    motion: settings.reducedMotion ? 0.12 : 1,
    intensity: settings.reducedIntensity ? 0.58 : 1,
  };
  const frames = validator.sampleSequence(SAMPLE_TIMES, SAMPLE_SIZE, sampleSettings);
  const perception = sequenceDescriptor(frames, SAMPLE_SIZE);
  const meta = familyMeta(candidate.family);
  if (!qualityAssessment(perception, meta, { reducedMotion: settings.reducedMotion }).pass) {
    return null;
  }

  const flashFrames = validator.sampleSequence(FLASH_TIMES, FLASH_SIZE, sampleSettings);
  const flash = flashScreening(flashFrames, FLASH_SIZE, {
    fps: 12,
    changedAreaThreshold: 0.12,
    maxTransitionsPerSecond: 3,
  });
  const quality = qualityAssessment(perception, meta, {
    reducedMotion: settings.reducedMotion,
    flashScreen: flash,
  });
  if (!quality.pass) return null;

  return {
    ...candidate,
    perception: compactPerception(perception),
    quality,
    flashScreen: flash,
  };
}

async function buildCandidatePool({ initial = false, onProgress = () => {} } = {}) {
  const target = initial ? 5 : 9;
  const schedule = familySchedule(recentFamilies, MAX_ATTEMPTS);
  const candidates = [];
  let sliceStart = performance.now();

  for (let attempt = 0; attempt < MAX_ATTEMPTS && candidates.length < target; attempt += 1) {
    if (performance.now() - sliceStart > FRAME_BUDGET_MS) {
      await nextFrame();
      sliceStart = performance.now();
    }
    try {
      const candidate = generateComplexCandidate(undefined, schedule[attempt]);
      const valid = validateCandidate(candidate);
      if (valid) {
        candidates.push(valid);
        onProgress(candidates.length, target);
      }
    } catch (error) {
      console.warn("Candidate rejected", error);
    }
  }

  if (!candidates.length) throw new Error("No shader passed the local quality checks.");
  return candidates;
}

async function generateSelectedCandidate({ initial = false, onProgress } = {}) {
  const candidates = await buildCandidatePool({ initial, onProgress });
  const ranked = selectCandidate(candidates, recentTraces, recentFamilies, {
    earlyEncounter: encounterNumber < EARLY_ENCOUNTERS,
    recentModes,
  });
  return attachInternalProvenance(ranked.candidate);
}

async function remember(candidate) {
  const trace = await savePerceptualTrace({
    family: candidate.family,
    perception: candidate.perception,
  }, HISTORY_LIMIT);
  recentTraces.push(trace);
  recentTraces = recentTraces.slice(-HISTORY_LIMIT);
  recentFamilies.push(candidate.family);
  recentFamilies = recentFamilies.slice(-12);
  if (candidate.colorMode) recentModes = [...recentModes, candidate.colorMode].slice(-8);
}

function showCandidate(candidate, { transitionMs = 900 } = {}) {
  clearTimeout(transitionTimer);
  const previous = activeIndex;
  const next = current ? 1 - activeIndex : activeIndex;
  renderers[next].setFragmentSource(candidate.source);
  rendererStarts[next] = performance.now();

  if (next !== previous) {
    const duration = settings.reducedMotion ? 0 : transitionMs;
    canvases[next].style.transitionDuration = `${duration}ms`;
    canvases[previous].style.transitionDuration = `${duration}ms`;
    canvases[next].classList.add("active");
    canvases[previous].classList.remove("active");
    canvases[next].setAttribute("aria-hidden", "false");
    canvases[previous].setAttribute("aria-hidden", "true");
    transitionTimer = setTimeout(() => { activeIndex = next; }, duration);
  }

  activeIndex = next;
  current = candidate;
  encounterNumber += 1;
  setStatus("");
  void remember(candidate);
  announce("A new shader is present.");
}

async function prefetch() {
  if (prefetched || prefetching) return prefetching;
  prefetching = generateSelectedCandidate()
    .then((candidate) => { prefetched = candidate; })
    .catch((error) => console.warn("Background generation failed", error))
    .finally(() => { prefetching = null; });
  return prefetching;
}

async function another({ initial = false } = {}) {
  if (generating) return;
  generating = true;
  anotherButton.disabled = true;

  const message = initial ? "composing the first shader…" : "searching for another shader…";
  setStatus(message, { busy: true });
  announce(initial ? "Composing the first shader." : "Searching for another shader.");

  try {
    let candidate = prefetched;
    prefetched = null;

    // A background search already under way is worth more than a second one
    // started alongside it: wait for it rather than competing with it.
    if (!candidate && prefetching) {
      await prefetching;
      candidate = prefetched;
      prefetched = null;
    }

    if (!candidate) {
      candidate = await generateSelectedCandidate({
        initial,
        onProgress: (found, target) => setStatus(message, {
          busy: true,
          detail: `${found}/${target}`,
        }),
      });
    }

    showCandidate(candidate, { transitionMs: initial ? 0 : 900 });
    void prefetch();
  } catch (error) {
    showError(error);
  } finally {
    generating = false;
    anotherButton.disabled = false;
  }
}

function animate(now) {
  for (let index = 0; index < renderers.length; index += 1) {
    renderers[index].render((now - rendererStarts[index]) / 1000);
  }
  animationFrame = requestAnimationFrame(animate);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function showUse() {
  if (!current) return;
  const files = exportFiles(current);
  const names = Object.keys(files);
  panel.dataset.view = "use";
  panelTitle.textContent = "Take the code";
  panelContent.innerHTML = `
    <p>The shader may continue elsewhere. No title, ownership, exclusivity, scarcity, authenticity, or uniqueness claim is created.</p>
    <p><strong>TSDNE retains provenance but abolishes title.</strong><br>The shader can be identified, copied, and reconstructed, but not claimed.</p>
    <div class="export-grid" id="export-grid"></div>
    <label for="code">Preview</label>
    <textarea id="code" spellcheck="false"></textarea>`;

  const grid = $("#export-grid");
  const area = $("#code");
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Choose export preview");
  for (const name of names) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.append(option);
  }
  area.value = files[names[0]];
  select.addEventListener("change", () => { area.value = files[select.value]; });
  grid.append(select);

  for (const name of names) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `download ${name}`;
    button.addEventListener("click", () => downloadText(
      name,
      files[name],
      name.endsWith(".html") ? "text/html" : "text/plain",
    ));
    grid.append(button);
  }

  const copy = document.createElement("button");
  copy.type = "button";
  copy.textContent = "copy preview";
  copy.addEventListener("click", async () => navigator.clipboard.writeText(area.value));
  grid.append(copy);
  panel.showModal();
}

function settingsControls() {
  return `<fieldset>
    <legend>Experience settings</legend>
    <label><input id="setting-motion" type="checkbox" ${settings.reducedMotion ? "checked" : ""}> reduce shader motion and transitions</label>
    <label><input id="setting-intensity" type="checkbox" ${settings.reducedIntensity ? "checked" : ""}> reduce colour intensity</label>
    <button id="clear-history" type="button">clear local anti-repetition memory</button>
  </fieldset>`;
}

function showAbout() {
  panel.dataset.view = "about";
  panelTitle.textContent = "This Shader Does Not Exist";
  panelContent.innerHTML = `
    <p>One shader appears. You may remain with it, relinquish it for another, or take its executable code elsewhere.</p>
    <p>The work uses authored procedural systems and local computational search. It uses no language model, account, profile, recommendation system, advertising system, or server-side inference.</p>
    <p>A bounded local memory stores only non-reconstructive perceptual traces. It remembers enough to avoid obvious repetition, but not enough to restore what was relinquished. Nothing is uploaded.</p>
    <p>The application internally computes hashes for technical integrity. It does not issue certificates, create a public registry, claim uniqueness, or convert provenance into property.</p>
    <p><strong>TSDNE retains provenance but abolishes title.</strong><br><strong>The shader can be identified, copied, and reconstructed, but not claimed.</strong></p>
    ${settingsControls()}
    <p><a href="./privacy.html">privacy</a> · <a href="./accessibility.html">accessibility</a> · keyboard: <kbd>N</kbd> another, <kbd>U</kbd> take the code, <kbd>Space</kbd> pause, <kbd>A</kbd> about</p>`;

  const bind = (id, key) => $(id).addEventListener("change", (event) => {
    settings[key] = event.target.checked;
    persistSettings();
    applyRenderSettings();
  });
  bind("#setting-motion", "reducedMotion");
  bind("#setting-intensity", "reducedIntensity");
  $("#clear-history").addEventListener("click", async () => {
    await clearHistory();
    recentTraces = [];
    recentFamilies = [];
    announce("Local anti-repetition memory cleared.");
  });
  panel.showModal();
}

function showError(error) {
  console.error(error);
  setStatus(`generation error: ${error instanceof Error ? error.message : String(error)}`);
  announce("A generation error occurred. Another attempt remains available.");
}

anotherButton.addEventListener("click", () => void another());
useButton.addEventListener("click", showUse);
aboutButton.addEventListener("click", showAbout);
pauseButton.addEventListener("click", () => {
  settings.paused = !settings.paused;
  persistSettings();
  applyRenderSettings();
  announce(settings.paused ? "Shader paused." : "Shader playing.");
});

window.addEventListener("keydown", (event) => {
  if (panel.open || event.target.matches("textarea,input,select")) return;
  if (event.key.toLowerCase() === "n") {
    event.preventDefault();
    void another();
  } else if (event.key.toLowerCase() === "u") {
    event.preventDefault();
    showUse();
  } else if (event.key.toLowerCase() === "a") {
    event.preventDefault();
    showAbout();
  } else if (event.code === "Space") {
    event.preventDefault();
    pauseButton.click();
  }
});

window.addEventListener("resize", () => renderers.forEach((renderer) => renderer.resize()));
motionQuery.addEventListener?.("change", (event) => {
  if (!localStorage.getItem("tsdne-settings-v2")) {
    settings.reducedMotion = event.matches;
    applyRenderSettings();
  }
});
window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(animationFrame);
  renderers.forEach((renderer) => renderer.destroy());
  validator.destroy();
});

await another({ initial: true });
animationFrame = requestAnimationFrame(animate);
