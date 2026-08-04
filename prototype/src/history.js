const DB_NAME = "tsdne-local-history";
const STORE = "perceptual-traces";
const VERSION = 2;
const FALLBACK_KEY = "tsdne-perceptual-traces-v2";

let dbPromise = null;

export function sanitiseTrace(record) {
  return {
    localId: record.localId || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
    createdAt: record.createdAt || new Date().toISOString(),
    family: String(record.family || "unknown"),
    perception: record.perception || null,
  };
}

function openDB() {
  if (!("indexedDB" in globalThis)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const name of [...db.objectStoreNames]) db.deleteObjectStore(name);
      const store = db.createObjectStore(STORE, { keyPath: "localId" });
      store.createIndex("createdAt", "createdAt");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });

  return dbPromise;
}

export async function loadRecentTraces(limit = 500) {
  const db = await openDB();
  if (!db) return loadFallback(limit);

  return new Promise((resolve) => {
    const transaction = db.transaction(STORE, "readonly");
    const request = transaction.objectStore(STORE).getAll();
    request.onsuccess = () => resolve(
      request.result
        .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
        .slice(-limit),
    );
    request.onerror = () => resolve(loadFallback(limit));
  });
}

export async function savePerceptualTrace(record, limit = 500) {
  const trace = sanitiseTrace(record);
  const db = await openDB();
  if (!db) {
    saveFallback(trace, limit);
    return trace;
  }

  await new Promise((resolve) => {
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).put(trace);
    transaction.oncomplete = resolve;
    transaction.onerror = resolve;
  });

  const all = await loadRecentTraces(limit + 100);
  if (all.length > limit) {
    await new Promise((resolve) => {
      const transaction = db.transaction(STORE, "readwrite");
      const store = transaction.objectStore(STORE);
      for (const item of all.slice(0, all.length - limit)) store.delete(item.localId);
      transaction.oncomplete = resolve;
      transaction.onerror = resolve;
    });
  }

  return trace;
}

export async function clearHistory() {
  const db = await openDB();
  try { localStorage.removeItem(FALLBACK_KEY); } catch {}
  if (!db) return;
  await new Promise((resolve) => {
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).clear();
    transaction.oncomplete = resolve;
    transaction.onerror = resolve;
  });
}

function loadFallback(limit) {
  try {
    return JSON.parse(localStorage.getItem(FALLBACK_KEY) || "[]").slice(-limit);
  } catch {
    return [];
  }
}

function saveFallback(trace, limit) {
  try {
    const items = loadFallback(limit);
    items.push(trace);
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(items.slice(-limit)));
  } catch {}
}
