const DB_NAME = "tsdne-curation-research";
const STORE = "ratings";
const META_STORE = "metadata";
const VERSION = 1;

let dbPromise = null;

function openDB() {
  if (!("indexedDB" in globalThis)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "recordId" });
        store.createIndex("sessionId", "sessionId");
        store.createIndex("ordinal", "ordinal");
        store.createIndex("rating", "rating");
        store.createIndex("createdAt", "createdAt");
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open curation database."));
  });
  return dbPromise;
}

function fallbackKey(name) {
  return `tsdne-curation-${name}`;
}

function loadFallback(name, defaultValue) {
  try {
    return JSON.parse(localStorage.getItem(fallbackKey(name)) || JSON.stringify(defaultValue));
  } catch {
    return defaultValue;
  }
}

function saveFallback(name, value) {
  localStorage.setItem(fallbackKey(name), JSON.stringify(value));
}

export function createSessionId() {
  return globalThis.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function getOrCreateSession(target = 250) {
  const db = await openDB().catch(() => null);
  if (!db) {
    const existing = loadFallback("session", null);
    if (existing) return existing;
    const session = {
      key: "active-session",
      sessionId: createSessionId(),
      target,
      startedAt: new Date().toISOString(),
      schema: "tsdne-curation-session-v1",
    };
    saveFallback("session", session);
    return session;
  }
  return new Promise((resolve, reject) => {
    const tx = db.transaction(META_STORE, "readwrite");
    const store = tx.objectStore(META_STORE);
    const request = store.get("active-session");
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result);
        return;
      }
      const session = {
        key: "active-session",
        sessionId: createSessionId(),
        target,
        startedAt: new Date().toISOString(),
        schema: "tsdne-curation-session-v1",
      };
      store.put(session);
      resolve(session);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveRating(record) {
  if (!record?.recordId || !record?.sessionId || !record?.rating) {
    throw new Error("Curation record is missing its identifier, session, or rating.");
  }
  const db = await openDB().catch(() => null);
  if (!db) {
    const records = loadFallback("ratings", []);
    const index = records.findIndex((item) => item.recordId === record.recordId);
    if (index >= 0) records[index] = record;
    else records.push(record);
    saveFallback("ratings", records);
    return record;
  }
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  return record;
}

export async function loadRatings() {
  const db = await openDB().catch(() => null);
  if (!db) return loadFallback("ratings", []);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => a.ordinal - b.ordinal));
    request.onerror = () => reject(request.error);
  });
}

export async function clearCurationData() {
  const db = await openDB().catch(() => null);
  try {
    localStorage.removeItem(fallbackKey("ratings"));
    localStorage.removeItem(fallbackKey("session"));
  } catch {}
  if (!db) return;
  await new Promise((resolve, reject) => {
    const tx = db.transaction([STORE, META_STORE], "readwrite");
    tx.objectStore(STORE).clear();
    tx.objectStore(META_STORE).clear();
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

export function studyExport(session, records) {
  return {
    schema: "tsdne-curation-export-v1",
    exportedAt: new Date().toISOString(),
    study: {
      title: "TSDNE generator curation study",
      purpose: "Explicit artist ratings for generator diagnosis and revision",
      target: session.target,
      ratingVocabulary: ["interesting", "not-interesting", "skip"],
      inferencePolicy: "Only explicit ratings are labels; viewing duration and comments are contextual variables, not inferred preferences.",
    },
    session,
    records,
  };
}

function quoteCSV(value) {
  if (value === null || value === undefined) return "";
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function ratingsCSV(records) {
  const traitKeys = [
    "scale", "tempo", "density", "turbulence", "contrast", "palette",
    "complexity", "rotation", "symmetry", "softness", "drift", "depth",
  ];
  const columns = [
    "ordinal", "recordId", "sessionId", "rating", "comment", "family",
    "candidateId", "createdAt", "displayDurationMs", "generationDurationMs",
    "selectionScore", "noveltyScore", "complexityScore", "familyScore",
    "estimatedCost", "mean", "variance", "edge", "saturation", "temporal",
    "viewportWidth", "viewportHeight", "devicePixelRatio", "userAgent",
    ...traitKeys.map((key) => `trait_${key}`),
  ];
  const rows = records.map((record) => {
    const traits = record.candidate?.graph?.traits || {};
    const perception = record.candidate?.perception || {};
    const selection = record.selection || {};
    const environment = record.environment || {};
    const values = {
      ordinal: record.ordinal,
      recordId: record.recordId,
      sessionId: record.sessionId,
      rating: record.rating,
      comment: record.comment,
      family: record.candidate?.family,
      candidateId: record.candidate?.id,
      createdAt: record.createdAt,
      displayDurationMs: record.displayDurationMs,
      generationDurationMs: record.generationDurationMs,
      selectionScore: selection.score,
      noveltyScore: selection.novelty,
      complexityScore: selection.complexity,
      familyScore: selection.family,
      estimatedCost: record.candidate?.estimatedCost,
      mean: perception.mean,
      variance: perception.variance,
      edge: perception.edge,
      saturation: perception.saturation,
      temporal: perception.temporal,
      viewportWidth: environment.viewport?.width,
      viewportHeight: environment.viewport?.height,
      devicePixelRatio: environment.devicePixelRatio,
      userAgent: environment.userAgent,
      ...Object.fromEntries(traitKeys.map((key) => [`trait_${key}`, traits[key]])),
    };
    return columns.map((column) => quoteCSV(values[column])).join(",");
  });
  return [columns.join(","), ...rows].join("\n");
}

export function downloadDataset(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
