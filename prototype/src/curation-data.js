import { CURATION_DATA_SCHEMA, CURATION_PROTOCOL_VERSION } from "./version.js";

const DB_NAME = "tsdne-curation-audit";
const VERSION = 2;
const RECORDS = "records";
const SESSIONS = "sessions";
const FALLBACK_RECORDS = "tsdne-curation-records-v2";
const FALLBACK_SESSIONS = "tsdne-curation-sessions-v2";

let dbPromise = null;

function openDB() {
  if (!("indexedDB" in globalThis)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (db.objectStoreNames.contains(RECORDS)) db.deleteObjectStore(RECORDS);
      if (db.objectStoreNames.contains(SESSIONS)) db.deleteObjectStore(SESSIONS);
      const records = db.createObjectStore(RECORDS, { keyPath: "recordId" });
      records.createIndex("createdAt", "createdAt");
      records.createIndex("sessionId", "sessionId");
      records.createIndex("rating", "rating");
      const sessions = db.createObjectStore(SESSIONS, { keyPath: "sessionId" });
      sessions.createIndex("startedAt", "startedAt");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
  return dbPromise;
}

function loadFallback(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}

function saveFallback(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function createId(prefix = "id") {
  return globalThis.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normaliseRating(value) {
  if (["ok", "not-ok", "repetitive"].includes(value)) return value;
  throw new Error(`Unknown curation rating: ${value}`);
}

export async function loadRecords() {
  const db = await openDB();
  if (!db) return loadFallback(FALLBACK_RECORDS).sort((a, b) => a.ordinal - b.ordinal);
  return new Promise((resolve) => {
    const request = db.transaction(RECORDS, "readonly").objectStore(RECORDS).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => a.ordinal - b.ordinal));
    request.onerror = () => resolve([]);
  });
}

export async function loadSessions() {
  const db = await openDB();
  if (!db) return loadFallback(FALLBACK_SESSIONS).sort((a, b) => String(a.startedAt).localeCompare(String(b.startedAt)));
  return new Promise((resolve) => {
    const request = db.transaction(SESSIONS, "readonly").objectStore(SESSIONS).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => String(a.startedAt).localeCompare(String(b.startedAt))));
    request.onerror = () => resolve([]);
  });
}

export async function startSession({ build = null, environment = null } = {}) {
  const prior = await loadSessions();
  const session = {
    schema: "tsdne-curation-session-v2",
    protocolVersion: CURATION_PROTOCOL_VERSION,
    sessionId: createId("session"),
    sessionOrdinal: prior.length + 1,
    startedAt: new Date().toISOString(),
    build,
    environment,
  };
  const db = await openDB();
  if (!db) {
    saveFallback(FALLBACK_SESSIONS, [...prior, session]);
    return session;
  }
  await new Promise((resolve) => {
    const tx = db.transaction(SESSIONS, "readwrite");
    tx.objectStore(SESSIONS).put(session);
    tx.oncomplete = resolve;
    tx.onerror = resolve;
  });
  return session;
}

export async function saveRecord(record) {
  normaliseRating(record.rating);
  if (!record.recordId || !record.sessionId || !Number.isFinite(record.ordinal)) {
    throw new Error("Curation record is missing recordId, sessionId, or ordinal.");
  }
  const db = await openDB();
  if (!db) {
    const records = loadFallback(FALLBACK_RECORDS);
    const index = records.findIndex((item) => item.recordId === record.recordId);
    if (index >= 0) records[index] = record;
    else records.push(record);
    saveFallback(FALLBACK_RECORDS, records);
    return record;
  }
  await new Promise((resolve, reject) => {
    const tx = db.transaction(RECORDS, "readwrite");
    tx.objectStore(RECORDS).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error || new Error("Could not save curation record."));
  });
  return record;
}

export async function updateComment(recordId, comment) {
  const records = await loadRecords();
  const record = records.find((item) => item.recordId === recordId);
  if (!record) throw new Error("No curation record is available for that comment.");
  record.comment = String(comment || "").trim();
  record.commentUpdatedAt = new Date().toISOString();
  return saveRecord(record);
}

export function createRecord({ session, ordinal, sessionOrdinal, rating, encounter, displayDurationMs, environment, build, thumbnailDataURL = null }) {
  return {
    schema: CURATION_DATA_SCHEMA,
    protocolVersion: CURATION_PROTOCOL_VERSION,
    recordId: createId("rating"),
    sessionId: session.sessionId,
    sessionNumber: session.sessionOrdinal,
    sessionOrdinal,
    ordinal,
    createdAt: new Date().toISOString(),
    rating: normaliseRating(rating),
    comment: "",
    displayDurationMs: Math.max(0, Math.round(displayDurationMs || 0)),
    build,
    environment,
    runtimeSettings: encounter.runtimeSettings || null,
    encounter: { encounterNumber: encounter.encounterNumber, shownAt: encounter.shownAt, candidate: encounter.candidate, audit: encounter.audit },
    thumbnailDataURL,
  };
}

export function curationExport(sessions, records) {
  return {
    schema: "tsdne-curation-export-v2",
    protocolVersion: CURATION_PROTOCOL_VERSION,
    exportedAt: new Date().toISOString(),
    study: {
      purpose: "Artist-led external audit of the production TSDNE runtime.",
      ratingVocabulary: {
        ok: "Acceptable for TSDNE as-is.",
        "not-ok": "Should not appear in TSDNE as-is.",
        repetitive: "Acceptable in itself, but too similar to something shown recently.",
      },
      onlineAdaptation: false,
      interpretation: "Ratings are explicit curation judgements. They do not alter generation while a curation epoch is being collected.",
    },
    sessions,
    records,
  };
}

function quoteCSV(value) {
  if (value === null || value === undefined) return "";
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function curationCSV(records) {
  const columns = ["ordinal", "sessionNumber", "sessionOrdinal", "createdAt", "rating", "comment", "displayDurationMs", "appVersion", "gitCommit", "runtimeVersion", "selectorVersion", "generatorVersion", "family", "category", "colorMode", "finish", "variant", "candidateId", "sourceHash", "graphHash", "selectionScore", "noveltyScore", "complexityScore", "familyScore", "modeScore", "mean", "variance", "edge", "saturation", "temporal", "generationDurationMs", "validPoolSize", "attemptCount"];
  const rows = records.map((record) => {
    const candidate = record.encounter?.candidate || {};
    const audit = record.encounter?.audit || {};
    const selection = audit.selectedScore || {};
    const perception = candidate.perception || {};
    const build = record.build || {};
    const values = {
      ordinal: record.ordinal, sessionNumber: record.sessionNumber, sessionOrdinal: record.sessionOrdinal, createdAt: record.createdAt,
      rating: record.rating, comment: record.comment, displayDurationMs: record.displayDurationMs, appVersion: build.appVersion,
      gitCommit: build.gitCommit, runtimeVersion: audit.runtimeVersion, selectorVersion: audit.selectorVersion,
      generatorVersion: audit.generatorVersion, family: candidate.family, category: candidate.category, colorMode: candidate.colorMode,
      finish: candidate.finish, variant: candidate.variant, candidateId: candidate.id, sourceHash: candidate.provenance?.sourceHash,
      graphHash: candidate.provenance?.graphHash, selectionScore: selection.score, noveltyScore: selection.novelty,
      complexityScore: selection.complexity, familyScore: selection.family, modeScore: selection.mode,
      mean: perception.mean, variance: perception.variance, edge: perception.edge, saturation: perception.saturation,
      temporal: perception.temporal, generationDurationMs: audit.generationDurationMs, validPoolSize: audit.validPoolSize,
      attemptCount: audit.attempts?.length,
    };
    return columns.map((column) => quoteCSV(values[column])).join(",");
  });
  return [columns.join(","), ...rows].join("\n");
}

export function downloadData(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
