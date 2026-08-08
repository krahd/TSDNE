import { COST_BUDGET, familyCategory, familyMeta } from "./generator.js";
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
  sanitiseTrace,
  savePerceptualTrace,
} from "./history.js";
import {
  familySchedule,
  generateComplexCandidate,
  scoreCandidate,
  selectCandidate,
} from "./synthesis.js";
import { attachInternalProvenance } from "./provenance.js";

export const RUNTIME_VERSION = "tsdne-runtime-v1";
export const SELECTOR_VERSION = "tsdne-selector-v3";
export const AUDIT_SCHEMA = "tsdne-generation-audit-v1";

const SAMPLE_TIMES = [0.73, 2.11, 4.47];
const FLASH_TIMES = Array.from({ length: 13 }, (_, index) => index / 12);
const SAMPLE_SIZE = 64;
const FLASH_SIZE = 32;
const DEFAULT_MAX_ATTEMPTS = 48;
const DEFAULT_HISTORY_LIMIT = 500;
const DEFAULT_EARLY_ENCOUNTERS = 4;
const DEFAULT_FRAME_BUDGET_MS = 10;
const NORMAL_REJECTION_STAGES = new Set([
  "cost",
  "compile-link",
  "sample",
  "quality",
  "flash-quality",
  "validation",
  "generation",
]);

/**
 * Ceiling on consecutive search cycles that yield nothing.
 *
 * An empty quality cycle is a normal outcome — a whole pool can be unlucky — so
 * the runtime retries rather than failing. But each cycle already generates and
 * validates maxAttempts candidates, so a run of entirely empty cycles is not bad
 * luck, it is a systematic rejection: every family failing one check at once, as
 * happened when validation inherited the viewer's motion setting and `too-static`
 * rejected all forty-nine. Retrying that forever is an unbounded, silent loop —
 * invisible in a background prefetch, which only reports on rejection. Past this
 * ceiling the condition is surfaced as an error carrying the full audit.
 */
const DEFAULT_MAX_SEARCH_CYCLES = 6;

/**
 * Candidates are always sampled at full motion and full intensity.
 *
 * Validation asks whether a shader is fit to appear at all, which is a property
 * of the shader rather than of how it happens to be watched right now. Sampling
 * at the viewer's own render settings made the answer depend on the viewer: with
 * the artwork paused, motion is 0, every family gates its time terms as
 * u_time*u_motion, so every sampled frame came back identical and all forty-nine
 * families were rejected as too-static. Holding these constant also means an
 * audit record means the same thing for every visitor.
 */
const VALIDATION_SAMPLE_SETTINGS = Object.freeze({ motion: 1, intensity: 1 });

/** Largest effective step taken in one frame, in seconds. See advanceShaderClock. */
export const MAX_CLOCK_STEP_SECONDS = 0.1;

/** Effective shader seconds elapsed per real second, for a set of viewing settings. */
export function shaderMotionRate({ paused = false, reducedMotion = false } = {}) {
  return paused ? 0 : reducedMotion ? 0.12 : 1;
}

/**
 * Advances a shader clock by real time scaled by the current rate.
 *
 * Every family spends motion as u_time*u_motion, so u_motion scales absolute
 * time rather than the rate of time. Passing the rate to the shader therefore
 * rewrote history on every change of setting: dropping it to 0 to pause did not
 * hold the current moment, it collapsed effective time to zero and snapped the
 * shader back to its first frame, and reduced motion jumped backwards to 12% of
 * elapsed time. Integrating the rate here instead keeps effective time
 * continuous and monotonic, so a rate change only affects what happens next.
 *
 * The step is capped so that returning to a backgrounded tab, where
 * requestAnimationFrame stops firing, resumes where the shader left off rather
 * than lurching forward by the whole time away.
 */
export function advanceShaderClock(clock, deltaSeconds, rate) {
  const step = Math.min(Math.max(0, deltaSeconds) || 0, MAX_CLOCK_STEP_SECONDS);
  return clock + step * rate;
}

const clone = (value) => value == null ? value : structuredClone(value);

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Ranks why candidates were rejected, so an exhausted search names its own cause
 * instead of reporting only that it failed. A single dominant `stage:reason` is
 * the signature of a systematic rejection rather than an unlucky pool.
 */
export function rejectionSummary(attempts, limit = 3) {
  const counts = new Map();
  for (const attempt of attempts || []) {
    if (attempt?.accepted) continue;
    const stage = attempt?.stage || "unknown";
    for (const reason of attempt?.reasons?.length ? attempt.reasons : ["unspecified"]) {
      const key = `${stage}:${reason}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  if (!counts.size) return "No rejection reasons were recorded.";
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return `Most common: ${ranked.slice(0, limit).map(([key, count]) => `${key} (${count})`).join(", ")}.`;
}

function serialiseRejectionCandidate(candidate) {
  if (!candidate) return null;
  return {
    id: candidate.id,
    seed: clone(candidate.seed),
    family: candidate.family,
    category: familyCategory(candidate.family),
    colorMode: candidate.colorMode,
    finish: candidate.finish,
    variant: candidate.graph?.traits?.variant ?? null,
    graph: clone(candidate.graph),
    structuralVector: clone(candidate.structuralVector),
    estimatedCost: candidate.estimatedCost,
  };
}

export function serialiseCandidateForAudit(candidate, selection = null) {
  if (!candidate) return null;
  return {
    id: candidate.id,
    seed: clone(candidate.seed),
    family: candidate.family,
    category: familyCategory(candidate.family),
    colorMode: candidate.colorMode,
    finish: candidate.finish,
    variant: candidate.graph?.traits?.variant ?? null,
    graph: clone(candidate.graph),
    structuralVector: clone(candidate.structuralVector),
    estimatedCost: candidate.estimatedCost,
    origin: candidate.origin,
    createdAt: candidate.createdAt,
    provenance: clone(candidate.provenance),
    perception: clone(candidate.perception),
    quality: clone(candidate.quality),
    flashScreen: clone(candidate.flashScreen),
    selection: selection ? clone(selection) : null,
  };
}

function createEmitter() {
  const listeners = new Map();
  return {
    on(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
      return () => listeners.get(type)?.delete(callback);
    },
    emit(type, payload) {
      for (const callback of listeners.get(type) || []) {
        try { callback(payload); } catch (error) { console.error(error); }
      }
    },
    clear() { listeners.clear(); },
  };
}

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

export async function createTSDNERuntime({
  canvases,
  validatorCanvas = null,
  settings: initialSettings = {},
  historyLimit = DEFAULT_HISTORY_LIMIT,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  maxSearchCycles = DEFAULT_MAX_SEARCH_CYCLES,
  earlyEncounters = DEFAULT_EARLY_ENCOUNTERS,
  frameBudgetMs = DEFAULT_FRAME_BUDGET_MS,
} = {}) {
  if (!Array.isArray(canvases) || canvases.length !== 2 || canvases.some((canvas) => !canvas)) {
    throw new Error("TSDNE runtime requires exactly two display canvases.");
  }

  const emitter = createEmitter();
  const validationCanvas = validatorCanvas || globalThis.document?.createElement?.("canvas");
  if (!validationCanvas) throw new Error("A validation canvas is required.");

  const renderers = canvases.map((canvas) => createRenderer(canvas, {
    onContextLost: () => emitter.emit("context-lost", null),
    onContextRestored: (error) => emitter.emit("context-restored", error),
  }));
  const validator = createRenderer(validationCanvas, {
    onContextLost: () => emitter.emit("validator-context-lost", null),
    onContextRestored: (error) => emitter.emit("validator-context-restored", error),
  });

  let settings = {
    paused: false,
    reducedMotion: false,
    reducedIntensity: false,
    ...initialSettings,
  };
  let recentTraces = await loadRecentTraces(historyLimit);
  let recentFamilies = recentTraces.slice(-8).map((trace) => trace.family);
  let recentModes = [];
  let activeIndex = 0;
  let encounterNumber = 0;
  let current = null;
  let prefetched = null;
  let prefetching = null;
  let generating = false;
  // Bumped whenever the local history is cleared, so a prefetch that was
  // already in flight cannot install a candidate it selected against traces
  // the visitor has since asked to forget.
  let historyEpoch = 0;
  let animationFrame = null;
  let running = false;
  // Pends between an encounter appearing and its crossfade finishing.
  let settleTimer = null;
  // Effective shader seconds per display, integrated in advanceClocks() rather
  // than derived from a start timestamp. See renderSettings().
  const rendererClocks = [0, 0];
  let lastFrameAt = performance.now();

  function renderSettings() {
    // u_motion stays at 1 for display. Every family spends it as u_time*u_motion,
    // so it scales absolute time rather than the rate of time: dropping it to 0
    // to pause did not hold the current moment, it collapsed effective time to
    // zero and snapped the shader back to its first frame. Reduced motion jumped
    // backwards to 12% of elapsed time for the same reason. The rate is
    // integrated into the clock instead, which keeps effective time continuous
    // and monotonic across any change of setting.
    return { motion: 1, intensity: settings.reducedIntensity ? 0.58 : 1 };
  }

  function advanceClocks(now) {
    const delta = (now - lastFrameAt) / 1000;
    const rate = shaderMotionRate(settings);
    lastFrameAt = now;
    if (rate === 0) return;
    for (let index = 0; index < rendererClocks.length; index += 1) {
      rendererClocks[index] = advanceShaderClock(rendererClocks[index], delta, rate);
    }
  }

  function applySettings() {
    const next = renderSettings();
    for (const renderer of [...renderers, validator]) renderer.setSettings(next);
  }
  applySettings();

  function validateCandidate(candidate) {
    if (candidate.estimatedCost > COST_BUDGET) {
      return {
        accepted: false,
        stage: "cost",
        reasons: ["cost-budget"],
        candidate: serialiseRejectionCandidate(candidate),
      };
    }

    try {
      validator.setFragmentSource(candidate.source);
    } catch (error) {
      return {
        accepted: false,
        stage: "compile-link",
        reasons: [errorMessage(error)],
        candidate: serialiseRejectionCandidate(candidate),
      };
    }

    const sampleSettings = VALIDATION_SAMPLE_SETTINGS;
    let frames;
    try {
      frames = validator.sampleSequence(SAMPLE_TIMES, SAMPLE_SIZE, sampleSettings);
    } catch (error) {
      return {
        accepted: false,
        stage: "sample",
        reasons: [errorMessage(error)],
        candidate: serialiseRejectionCandidate(candidate),
      };
    }

    const perception = sequenceDescriptor(frames, SAMPLE_SIZE);
    const meta = familyMeta(candidate.family);
    const firstQuality = qualityAssessment(perception, meta);
    if (!firstQuality.pass) {
      return {
        accepted: false,
        stage: "quality",
        reasons: [...firstQuality.reasons],
        perception: compactPerception(perception),
        candidate: serialiseRejectionCandidate(candidate),
      };
    }

    const flashFrames = validator.sampleSequence(FLASH_TIMES, FLASH_SIZE, sampleSettings);
    const flash = flashScreening(flashFrames, FLASH_SIZE, {
      fps: 12,
      changedAreaThreshold: 0.12,
      maxTransitionsPerSecond: 3,
    });
    const quality = qualityAssessment(perception, meta, { flashScreen: flash });
    if (!quality.pass) {
      return {
        accepted: false,
        stage: "flash-quality",
        reasons: [...quality.reasons],
        perception: compactPerception(perception),
        flashScreen: clone(flash),
        candidate: serialiseRejectionCandidate(candidate),
      };
    }

    return {
      accepted: true,
      candidate: {
        ...candidate,
        perception: compactPerception(perception),
        quality,
        flashScreen: flash,
      },
    };
  }

  async function buildCandidatePool({ initial = false, generationKind = "foreground" } = {}) {
    const target = initial ? 5 : 9;
    const schedule = familySchedule(recentFamilies, maxAttempts);
    const candidates = [];
    const attempts = [];
    const started = performance.now();
    let sliceStart = started;

    for (let attempt = 0; attempt < maxAttempts && candidates.length < target; attempt += 1) {
      if (performance.now() - sliceStart > frameBudgetMs) {
        await nextFrame();
        sliceStart = performance.now();
      }

      const scheduledFamily = schedule[attempt];
      let candidate = null;
      try {
        candidate = generateComplexCandidate(undefined, scheduledFamily);
        const result = validateCandidate(candidate);
        if (!result.accepted) {
          attempts.push({
            attempt: attempt + 1,
            scheduledFamily,
            scheduledCategory: familyCategory(scheduledFamily),
            ...result,
          });
          continue;
        }

        const withProvenance = await attachInternalProvenance(result.candidate);
        candidates.push(withProvenance);
        attempts.push({
          attempt: attempt + 1,
          scheduledFamily,
          scheduledCategory: familyCategory(scheduledFamily),
          accepted: true,
          candidate: serialiseCandidateForAudit(withProvenance),
        });
        emitter.emit("generation-progress", {
          found: candidates.length,
          target,
          attempt: attempt + 1,
          generationKind,
        });
      } catch (error) {
        attempts.push({
          attempt: attempt + 1,
          scheduledFamily,
          scheduledCategory: familyCategory(scheduledFamily),
          accepted: false,
          stage: candidate ? "validation" : "generation",
          reasons: [errorMessage(error)],
          candidate: serialiseRejectionCandidate(candidate),
        });
      }
    }

    if (!candidates.length && !attempts.some((item) => NORMAL_REJECTION_STAGES.has(item.stage))) {
      const error = new Error("Shader generation could not produce a valid candidate.");
      error.audit = { target, attempts, generationKind };
      throw error;
    }

    return {
      candidates,
      attempts,
      target,
      generationDurationMs: performance.now() - started,
      generationKind,
    };
  }

  async function generateSelectedCandidate({ initial = false, generationKind = "foreground" } = {}) {
    const historySnapshot = {
      perceptualTraceCount: recentTraces.length,
      recentFamilies: [...recentFamilies],
      recentModes: [...recentModes],
      recentTraces: clone(recentTraces.slice(-25)),
    };
    const attempts = [];
    const searchBatches = [];
    let generationDurationMs = 0;
    let pool = null;

    do {
      pool = await buildCandidatePool({ initial, generationKind });
      const searchCycle = searchBatches.length + 1;
      generationDurationMs += pool.generationDurationMs;
      attempts.push(...pool.attempts.map((attempt) => ({ ...attempt, searchCycle })));
      searchBatches.push({
        searchCycle,
        targetPoolSize: pool.target,
        validPoolSize: pool.candidates.length,
        attemptCount: pool.attempts.length,
        generationDurationMs: pool.generationDurationMs,
      });
      if (!pool.candidates.length) {
        if (searchCycle >= maxSearchCycles) {
          // Deliberately not the old single-cycle wording: a single empty cycle
          // remains a retry, and search-status.test.mjs guards that.
          const error = new Error(
            `Shader search exhausted ${searchCycle} cycles without a valid candidate (${attempts.length} rejected). ${rejectionSummary(attempts)}`,
          );
          error.audit = { target: pool.target, attempts, searchBatches, generationKind };
          throw error;
        }
        emitter.emit("generation-retry", {
          initial,
          generationKind,
          reason: "no-candidate-passed-quality-checks",
          searchCycle,
          attemptCount: pool.attempts.length,
        });
        await nextFrame();
      }
    } while (!pool.candidates.length);

    const context = {
      earlyEncounter: encounterNumber < earlyEncounters,
      recentModes,
    };
    const winner = selectCandidate(pool.candidates, recentTraces, recentFamilies, context);
    const ranked = pool.candidates
      .map((candidate) => ({
        candidate,
        ...scoreCandidate(candidate, recentTraces, recentFamilies, context),
      }))
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({
        rank: index + 1,
        ...serialiseCandidateForAudit(item.candidate, {
          score: item.score,
          novelty: item.novelty,
          complexity: item.complexity,
          family: item.family,
          mode: item.mode,
        }),
      }));

    const selected = ranked.find((item) => item.id === winner.candidate.id) || ranked[0];
    const candidate = pool.candidates.find((item) => item.id === selected.id) || winner.candidate;
    return {
      candidate,
      audit: {
        schema: AUDIT_SCHEMA,
        runtimeVersion: RUNTIME_VERSION,
        selectorVersion: SELECTOR_VERSION,
        generatorVersion: candidate.graph?.generator || null,
        perceptionVersion: candidate.perception?.version || null,
        initial,
        generationKind,
        searchCycles: searchBatches.length,
        searchBatches,
        targetPoolSize: pool.target,
        validPoolSize: pool.candidates.length,
        maxAttempts,
        maxSearchCycles,
        generationDurationMs,
        historyBeforeSelection: historySnapshot,
        attempts,
        rankedPool: ranked,
        selectedCandidateId: candidate.id,
        selectedRank: selected.rank,
        selectedScore: clone(selected.selection),
      },
    };
  }

  function remember(candidate) {
    const trace = sanitiseTrace({ family: candidate.family, perception: candidate.perception });
    recentTraces = [...recentTraces, trace].slice(-historyLimit);
    recentFamilies = [...recentFamilies, candidate.family].slice(-12);
    if (candidate.colorMode) recentModes = [...recentModes, candidate.colorMode].slice(-8);
    void savePerceptualTrace(trace, historyLimit);
  }

  function showEncounter(result, { transitionMs = 900 } = {}) {
    const candidate = {
      ...result.candidate,
      category: familyCategory(result.candidate.family),
      variant: result.candidate.graph?.traits?.variant ?? null,
    };
    const previous = activeIndex;
    const next = current ? 1 - activeIndex : activeIndex;
    renderers[next].setFragmentSource(candidate.source);
    rendererClocks[next] = 0;

    const duration = next !== previous && !settings.reducedMotion ? transitionMs : 0;
    if (next !== previous) {
      canvases[next].style.transitionDuration = `${duration}ms`;
      canvases[previous].style.transitionDuration = `${duration}ms`;
      canvases[next].classList.add("active");
      canvases[previous].classList.remove("active");
      canvases[next].setAttribute("aria-hidden", "false");
      canvases[previous].setAttribute("aria-hidden", "true");
    }

    activeIndex = next;
    encounterNumber += 1;
    remember(candidate);
    current = {
      candidate,
      audit: { ...result.audit, encounterNumber },
      shownAt: new Date().toISOString(),
      shownAtPerformanceMs: performance.now(),
    };
    emitter.emit("encounter", currentEncounter());
    // "encounter" fires as the crossfade begins, while the outgoing shader is
    // still on screen. Anything that should only happen once the new shader is
    // the only one visible — resuming from pause, above all, since resuming any
    // earlier sets the outgoing shader moving as it fades — waits for this.
    clearTimeout(settleTimer);
    const settling = currentEncounter();
    settleTimer = setTimeout(() => emitter.emit("encounter-settled", settling), duration);
    return current;
  }

  async function prefetch() {
    if (prefetched || prefetching) return prefetching;
    const epoch = historyEpoch;
    prefetching = generateSelectedCandidate({ generationKind: "prefetch" })
      .then((result) => { if (epoch === historyEpoch) prefetched = result; })
      .catch((error) => emitter.emit("prefetch-error", error))
      .finally(() => { prefetching = null; });
    return prefetching;
  }

  async function another({ initial = false } = {}) {
    if (generating) return null;
    generating = true;
    const generationKind = initial ? "initial" : "foreground";
    emitter.emit("generation-start", { initial, generationKind });
    try {
      let result = prefetched;
      prefetched = null;
      if (!result && prefetching) {
        await prefetching;
        result = prefetched;
        prefetched = null;
      }
      if (!result) result = await generateSelectedCandidate({ initial, generationKind });
      const encounter = showEncounter(result, { transitionMs: initial ? 0 : 900 });
      void prefetch();
      return encounter;
    } catch (error) {
      emitter.emit("generation-error", error);
      throw error;
    } finally {
      generating = false;
      emitter.emit("generation-end", { initial, generationKind });
    }
  }

  function animate(now) {
    if (!running) return;
    advanceClocks(now);
    for (let index = 0; index < renderers.length; index += 1) renderers[index].render(rendererClocks[index]);
    animationFrame = requestAnimationFrame(animate);
  }

  async function start() {
    if (running) return currentEncounter();
    running = true;
    lastFrameAt = performance.now();
    animationFrame = requestAnimationFrame(animate);
    return another({ initial: true });
  }

  function stop() {
    running = false;
    cancelAnimationFrame(animationFrame);
    // Would otherwise emit into a cleared emitter, or resume a stopped runtime.
    clearTimeout(settleTimer);
    renderers.forEach((renderer) => renderer.destroy());
    validator.destroy();
    emitter.clear();
  }

  function setSettings(next) {
    settings = { ...settings, ...next };
    applySettings();
    emitter.emit("settings", clone(settings));
  }

  async function clearLocalHistory() {
    await clearHistory();
    historyEpoch += 1;
    recentTraces = [];
    recentFamilies = [];
    recentModes = [];
    prefetched = null;
    emitter.emit("history-cleared", null);
  }

  function currentEncounter() {
    if (!current) return null;
    return {
      candidate: current.candidate,
      audit: clone(current.audit),
      shownAt: current.shownAt,
      shownAtPerformanceMs: current.shownAtPerformanceMs,
      encounterNumber: current.audit.encounterNumber,
      runtimeSettings: clone(settings),
    };
  }

  function captureThumbnail(size = 256) {
    if (!current || !globalThis.document?.createElement) return null;
    try {
      // Redraws the exact moment on screen, including while paused.
      renderers[activeIndex].render(rendererClocks[activeIndex]);
      const image = document.createElement("canvas");
      image.width = size;
      image.height = size;
      const context = image.getContext("2d");
      if (!context) return null;
      context.drawImage(canvases[activeIndex], 0, 0, size, size);
      return image.toDataURL("image/webp", 0.72);
    } catch { return null; }
  }

  return {
    start, stop, another, prefetch, on: emitter.on, setSettings, clearLocalHistory,
    currentEncounter, captureThumbnail,
    resize: () => renderers.forEach((renderer) => renderer.resize()),
    get settings() { return clone(settings); },
    get generating() { return generating; },
    get encounterNumber() { return encounterNumber; },
  };
}
