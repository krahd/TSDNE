import { familyMeta } from "./generator.js";
import { createRenderer } from "./webgl.js";
import {
  compactPerception,
  flashScreening,
  qualityAssessment,
  sequenceDescriptor,
} from "./perception.js";
import {
  familySchedule,
  generateComplexCandidate,
  scoreCandidate,
} from "./synthesis.js";
import { attachInternalProvenance } from "./provenance.js";
import {
  clearCurationData,
  downloadDataset,
  getOrCreateSession,
  loadRatings,
  ratingsCSV,
  saveRating,
  studyExport,
} from "./curation-data.js";

const $ = (selector) => document.querySelector(selector);
const canvas = $("#curation-stage");
const renderer = createRenderer(canvas);
const validator = createRenderer(document.createElement("canvas"));

const TARGET = 250;
const MAX_ATTEMPTS = 72;
const POOL_TARGET = 16;
const SAMPLE_TIMES = [0.73, 2.11, 4.47];
const FLASH_TIMES = Array.from({ length: 13 }, (_, index) => index / 12);
const SAMPLE_SIZE = 64;
const FLASH_SIZE = 32;

const session = await getOrCreateSession(TARGET);
let records = await loadRatings();
let current = null;
let selectedRating = null;
let shownAt = null;
let rendererStart = performance.now();
let animationFrame = null;
let generating = false;

const interestingButton = $("#interesting");
const notInterestingButton = $("#not-interesting");
const skipButton = $("#skip");
const saveButton = $("#save-next");
const comment = $("#comment");
const ratingStatus = $("#rating-status");
const generationStatus = $("#generation-status");
const shaderData = $("#shader-data");
const progress = $("#progress");
const ratedCount = $("#rated-count");
const targetCount = $("#target-count");

function previousTraces() {
  return records
    .filter((record) => record.candidate?.perception)
    .map((record) => ({
      perception: record.candidate.perception,
      family: record.candidate.family,
    }));
}

function recentFamilies() {
  return records.slice(-12).map((record) => record.candidate?.family).filter(Boolean);
}

function environmentSnapshot() {
  return {
    schema: "tsdne-curation-environment-v1",
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    deviceMemoryGB: navigator.deviceMemory ?? null,
    devicePixelRatio: globalThis.devicePixelRatio || 1,
    viewport: { width: innerWidth, height: innerHeight },
    screen: { width: screen.width, height: screen.height, colorDepth: screen.colorDepth },
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

function updateProgress() {
  const completed = records.length;
  ratedCount.textContent = completed;
  targetCount.textContent = session.target;
  progress.max = session.target;
  progress.value = Math.min(completed, session.target);
  document.title = `TSDNE curation — ${completed}/${session.target}`;
}

function setRating(value) {
  selectedRating = value;
  for (const [button, rating] of [
    [interestingButton, "interesting"],
    [notInterestingButton, "not-interesting"],
    [skipButton, "skip"],
  ]) {
    button.setAttribute("aria-pressed", String(value === rating));
  }
  saveButton.disabled = !value || !current || generating;
  ratingStatus.textContent = value ? `Selected: ${value}. Add a comment or save and continue.` : "";
}

function dataRows(candidate) {
  const selection = candidate.selection || {};
  const perception = candidate.perception || {};
  return [
    ["family", candidate.family],
    ["candidate", candidate.id],
    ["generator", candidate.graph?.generator],
    ["selection score", selection.score?.toFixed(4)],
    ["novelty", selection.novelty?.toFixed(4)],
    ["complexity", selection.complexity?.toFixed(4)],
    ["family separation", selection.family?.toFixed(4)],
    ["estimated cost", candidate.estimatedCost],
    ["pool", `${candidate.pool?.valid ?? 0} valid / ${candidate.pool?.attempts ?? 0} attempts`],
    ["mean luminance", perception.mean],
    ["variance", perception.variance],
    ["edge", perception.edge],
    ["saturation", perception.saturation],
    ["temporal", perception.temporal],
    ["source hash", candidate.provenance?.sourceHash],
  ];
}

function renderData(candidate) {
  shaderData.replaceChildren();
  for (const [label, value] of dataRows(candidate)) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value ?? "—";
    shaderData.append(dt, dd);
  }
}

async function validateCandidate(candidate) {
  if (candidate.estimatedCost > 17) return null;
  validator.setFragmentSource(candidate.source);
  const frames = validator.sampleSequence(SAMPLE_TIMES, SAMPLE_SIZE, { motion: 1, intensity: 1 });
  const perception = sequenceDescriptor(frames, SAMPLE_SIZE);
  const flashFrames = validator.sampleSequence(FLASH_TIMES, FLASH_SIZE, { motion: 1, intensity: 1 });
  const flash = flashScreening(flashFrames, FLASH_SIZE, {
    fps: 12,
    changedAreaThreshold: 0.12,
    maxTransitionsPerSecond: 3,
  });
  const quality = qualityAssessment(perception, familyMeta(candidate.family), {
    reducedMotion: false,
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

async function generateForReview() {
  if (generating) return;
  generating = true;
  saveButton.disabled = true;
  generationStatus.textContent = "generating and evaluating candidate pool…";
  ratingStatus.textContent = "";
  selectedRating = null;
  comment.value = "";
  setRating(null);
  const started = performance.now();

  try {
    const traces = previousTraces();
    const families = recentFamilies();
    const schedule = familySchedule(families, MAX_ATTEMPTS);
    const candidates = [];
    const rejectionReasons = {};
    let attempts = 0;

    for (; attempts < MAX_ATTEMPTS && candidates.length < POOL_TARGET; attempts += 1) {
      try {
        const raw = generateComplexCandidate(undefined, schedule[attempts]);
        const valid = await validateCandidate(raw);
        if (valid) candidates.push(valid);
        else rejectionReasons.quality = (rejectionReasons.quality || 0) + 1;
      } catch (error) {
        const key = error instanceof Error ? error.name : "generation-error";
        rejectionReasons[key] = (rejectionReasons[key] || 0) + 1;
      }
    }

    if (!candidates.length) throw new Error("No candidate passed the local validation checks.");

    const earlyEncounter = records.length < 4;
    const ranked = candidates
      .map((candidate) => ({
        candidate,
        ...scoreCandidate(candidate, traces, families, { earlyEncounter }),
      }))
      .sort((a, b) => b.score - a.score);

    const winner = ranked[0];
    const enriched = await attachInternalProvenance({
      ...winner.candidate,
      selection: {
        score: winner.score,
        novelty: winner.novelty,
        complexity: winner.complexity,
        family: winner.family,
        earlyEncounter,
        rank: 1,
      },
      pool: {
        attempts,
        valid: candidates.length,
        rejected: attempts - candidates.length,
        rejectionReasons,
        summaries: ranked.map((entry, index) => ({
          rank: index + 1,
          family: entry.candidate.family,
          candidateId: entry.candidate.id,
          score: entry.score,
          novelty: entry.novelty,
          complexity: entry.complexity,
          familySeparation: entry.family,
          estimatedCost: entry.candidate.estimatedCost,
          perception: {
            mean: entry.candidate.perception.mean,
            variance: entry.candidate.perception.variance,
            edge: entry.candidate.perception.edge,
            saturation: entry.candidate.perception.saturation,
            temporal: entry.candidate.perception.temporal,
          },
        })),
      },
      generationDurationMs: Math.round(performance.now() - started),
    });

    current = enriched;
    renderer.setFragmentSource(current.source);
    rendererStart = performance.now();
    shownAt = performance.now();
    renderData(current);
    generationStatus.textContent = `review ${records.length + 1} of ${session.target} · ${current.family}`;
    ratingStatus.textContent = "Rate explicitly. Viewing time is logged only as context.";
  } catch (error) {
    console.error(error);
    generationStatus.textContent = `generation error: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    generating = false;
    saveButton.disabled = !selectedRating || !current;
  }
}

async function saveAndContinue() {
  if (!current || !selectedRating || generating) return;
  generating = true;
  saveButton.disabled = true;
  const ordinal = records.length + 1;
  const createdAt = new Date().toISOString();
  const record = {
    schema: "tsdne-curation-rating-v1",
    recordId: `${session.sessionId}:${String(ordinal).padStart(4, "0")}`,
    sessionId: session.sessionId,
    ordinal,
    createdAt,
    rating: selectedRating,
    comment: comment.value.trim(),
    displayDurationMs: Math.round(performance.now() - shownAt),
    generationDurationMs: current.generationDurationMs,
    environment: environmentSnapshot(),
    selection: current.selection,
    pool: current.pool,
    candidate: {
      id: current.id,
      seed: current.seed,
      family: current.family,
      graph: current.graph,
      signature: current.signature,
      structuralVector: current.structuralVector,
      estimatedCost: current.estimatedCost,
      origin: current.origin,
      createdAt: current.createdAt,
      perception: current.perception,
      quality: current.quality,
      flashScreen: current.flashScreen,
      provenance: current.provenance,
    },
  };

  try {
    await saveRating(record);
    records.push(record);
    updateProgress();
    ratingStatus.textContent = `Saved ${selectedRating} for item ${ordinal}.`;
    current = null;
    if (records.length >= session.target) {
      generationStatus.textContent = `target complete: ${records.length} ratings. Export the dataset.`;
      selectedRating = null;
      setRating(null);
      return;
    }
    generating = false;
    await generateForReview();
  } catch (error) {
    console.error(error);
    ratingStatus.textContent = `Could not save rating: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    generating = false;
  }
}

function exportJSON() {
  const data = studyExport(session, records);
  const stamp = new Date().toISOString().slice(0, 10);
  downloadDataset(
    `tsdne-curation-${stamp}-${records.length}.json`,
    JSON.stringify(data, null, 2),
    "application/json",
  );
}

function exportCSV() {
  const stamp = new Date().toISOString().slice(0, 10);
  downloadDataset(
    `tsdne-curation-${stamp}-${records.length}.csv`,
    ratingsCSV(records),
    "text/csv",
  );
}

interestingButton.addEventListener("click", () => setRating("interesting"));
notInterestingButton.addEventListener("click", () => setRating("not-interesting"));
skipButton.addEventListener("click", () => setRating("skip"));
saveButton.addEventListener("click", () => void saveAndContinue());
$("#export-json").addEventListener("click", exportJSON);
$("#export-csv").addEventListener("click", exportCSV);
$("#clear-study").addEventListener("click", async () => {
  const confirmed = confirm("Delete all local curation ratings and begin a new study session? Export first if the data should be retained.");
  if (!confirmed) return;
  await clearCurationData();
  location.reload();
});

window.addEventListener("keydown", (event) => {
  if (event.target.matches("textarea,input,select")) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") void saveAndContinue();
    return;
  }
  const key = event.key.toLowerCase();
  if (key === "i") setRating("interesting");
  else if (key === "x") setRating("not-interesting");
  else if (key === "s") setRating("skip");
  else if (event.key === "Enter") void saveAndContinue();
});

window.addEventListener("resize", () => renderer.resize());
window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(animationFrame);
  renderer.destroy();
  validator.destroy();
});

function animate(now) {
  renderer.render((now - rendererStart) / 1000);
  animationFrame = requestAnimationFrame(animate);
}

updateProgress();
await generateForReview();
animationFrame = requestAnimationFrame(animate);
