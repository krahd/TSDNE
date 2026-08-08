import { createTSDNERuntime } from "./runtime.js";
import {
  createRecord,
  curationCSV,
  curationExport,
  downloadData,
  loadRecords,
  loadSessions,
  saveRecord,
  startSession,
  updateComment,
} from "./curation-data.js";
import { APP_VERSION, CURATION_PROTOCOL_VERSION } from "./version.js";

const $ = (selector) => document.querySelector(selector);
const canvases = [$("#stage-a"), $("#stage-b")];
const count = $("#curation-count");
const status = $("#curation-status");
const commentPanel = $("#comment-panel");
const commentInput = $("#comment-input");
const commentHint = $("#comment-hint");
const SEARCH_REVEAL_DELAY_MS = 140;

let records = await loadRecords();
let sessions = await loadSessions();
let lastRecord = records.at(-1) || null;
let ratingLocked = true;
let currentShownAt = performance.now();
let waitingForEncounter = false;
let searchStatusVisible = false;
let searchRevealTimer = null;

function environmentSnapshot() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform || null,
    language: navigator.language,
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    deviceMemory: navigator.deviceMemory || null,
    viewport: { width: innerWidth, height: innerHeight },
    screen: { width: screen.width, height: screen.height },
    devicePixelRatio: devicePixelRatio || 1,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

async function loadBuildInfo() {
  let deployment = null;
  try {
    const response = await fetch("../build.json", { cache: "no-store" });
    if (response.ok) deployment = await response.json();
  } catch {}
  return {
    appVersion: APP_VERSION,
    protocolVersion: CURATION_PROTOCOL_VERSION,
    gitCommit: deployment?.gitCommit || null,
    deployedAt: deployment?.deployedAt || null,
    source: deployment ? "deployment-manifest" : "local-or-unversioned",
  };
}

const build = await loadBuildInfo();
const session = await startSession({ build, environment: environmentSnapshot() });
sessions = await loadSessions();

function updateCount() { count.textContent = `${records.length} rated`; }
updateCount();
function setStatus(message = "") { status.textContent = message; status.hidden = !message; }
function clearSearchReveal() { clearTimeout(searchRevealTimer); searchRevealTimer = null; }
function revealSearchStatus() {
  if (!waitingForEncounter) return;
  searchStatusVisible = true;
  setStatus("composing…");
}

const runtime = await createTSDNERuntime({
  canvases,
  settings: {
    paused: false,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    reducedIntensity: false,
  },
});

runtime.on("generation-start", ({ initial }) => {
  ratingLocked = true;
  waitingForEncounter = true;
  clearSearchReveal();
  if (initial) revealSearchStatus();
  else if (!searchStatusVisible) searchRevealTimer = setTimeout(revealSearchStatus, SEARCH_REVEAL_DELAY_MS);
});
runtime.on("generation-progress", ({ found, target }) => {
  if (!waitingForEncounter || !searchStatusVisible) return;
  setStatus(`composing… ${found}/${target}`);
});
runtime.on("generation-retry", () => {
  if (!waitingForEncounter) return;
  clearSearchReveal(); searchStatusVisible = true;
  setStatus("none passed the local quality checks; searching again…");
});
runtime.on("generation-error", (error) => setStatus(`generation error: ${error instanceof Error ? error.message : String(error)}`));
runtime.on("prefetch-error", (error) => console.warn("TSDNE curation background prefetch failed", error));
runtime.on("encounter", () => {
  clearSearchReveal(); waitingForEncounter = false; searchStatusVisible = false;
  currentShownAt = performance.now(); ratingLocked = false; setStatus("");
});

async function rate(rating) {
  if (ratingLocked || commentPanel.open) return;
  const encounter = runtime.currentEncounter();
  if (!encounter) return;
  ratingLocked = true;
  const record = createRecord({
    session,
    ordinal: records.length + 1,
    sessionOrdinal: records.filter((item) => item.sessionId === session.sessionId).length + 1,
    rating,
    encounter,
    displayDurationMs: performance.now() - currentShownAt,
    environment: environmentSnapshot(),
    build,
    thumbnailDataURL: runtime.captureThumbnail(256),
  });
  await saveRecord(record);
  records.push(record);
  lastRecord = record;
  updateCount();
  setStatus(rating === "ok" ? "OK" : rating === "not-ok" ? "not OK" : "repetitive");
  try { await runtime.another(); }
  catch (error) { ratingLocked = false; setStatus(`generation error: ${error instanceof Error ? error.message : String(error)}`); }
}

function openComment() {
  if (!lastRecord) { setStatus("rate a shader before adding a comment"); return; }
  commentInput.value = lastRecord.comment || "";
  commentHint.textContent = `comment on rating ${lastRecord.ordinal} (${lastRecord.rating})`;
  commentPanel.showModal();
  requestAnimationFrame(() => commentInput.focus());
}

async function saveComment() {
  if (!lastRecord) return;
  lastRecord = await updateComment(lastRecord.recordId, commentInput.value);
  const index = records.findIndex((item) => item.recordId === lastRecord.recordId);
  if (index >= 0) records[index] = lastRecord;
  commentPanel.close();
  setStatus(lastRecord.comment ? "comment saved" : "comment cleared");
  setTimeout(() => { if (!ratingLocked) setStatus(""); }, 900);
}

async function exportJSON() {
  records = await loadRecords(); sessions = await loadSessions();
  const data = curationExport(sessions, records);
  const stamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  downloadData(`tsdne-curation-${stamp}.json`, JSON.stringify(data, null, 2), "application/json");
  setStatus("JSON exported");
}

async function exportCSV() {
  records = await loadRecords();
  const stamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  downloadData(`tsdne-curation-${stamp}.csv`, curationCSV(records), "text/csv");
  setStatus("CSV exported");
}

window.addEventListener("keydown", (event) => {
  if (commentPanel.open) {
    if (event.key === "Escape") commentPanel.close();
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); void saveComment(); }
    return;
  }
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  const key = event.key.toLowerCase();
  if (key === "f") { event.preventDefault(); void rate("ok"); }
  else if (key === "g") { event.preventDefault(); void rate("not-ok"); }
  else if (key === "h") { event.preventDefault(); void rate("repetitive"); }
  else if (key === "c") { event.preventDefault(); openComment(); }
  else if (key === "e") { event.preventDefault(); void (event.shiftKey ? exportCSV() : exportJSON()); }
});

$("#comment-save").addEventListener("click", (event) => { event.preventDefault(); void saveComment(); });
$("#comment-cancel").addEventListener("click", () => commentPanel.close());
window.addEventListener("resize", () => runtime.resize());
window.addEventListener("beforeunload", () => runtime.stop());

await runtime.start();