const DB_NAME = "tsdne-local-history";
const STORE = "encounters";
const VERSION = 1;

let dbPromise = null;

function openDB() {
  if (!("indexedDB" in globalThis)) return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });

  return dbPromise;
}

export async function loadRecent(limit = 300) {
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

export async function saveEncounter(record, limit = 500) {
  const minimal = {
    id: record.id,
    createdAt: record.createdAt || new Date().toISOString(),
    family: record.family,
    origin: record.origin,
    parentId: record.parentId || null,
    model: record.model || null,
    mutation: record.mutation || null,
    signature: record.signature,
    structuralVector: record.structuralVector,
    perception: record.perception,
  };

  const db = await openDB();
  if (!db) {
    saveFallback(minimal, limit);
    return;
  }

  await new Promise((resolve) => {
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).put(minimal);
    transaction.oncomplete = resolve;
    transaction.onerror = resolve;
  });

  const all = await loadRecent(limit + 100);
  if (all.length <= limit) return;

  await new Promise((resolve) => {
    const transaction = db.transaction(STORE, "readwrite");
    const store = transaction.objectStore(STORE);
    for (const item of all.slice(0, all.length - limit)) store.delete(item.id);
    transaction.oncomplete = resolve;
    transaction.onerror = resolve;
  });
}

export async function clearHistory() {
  const db = await openDB();
  try {
    localStorage.removeItem("tsdne-history-fallback");
  } catch {}
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
    return JSON.parse(localStorage.getItem("tsdne-history-fallback") || "[]").slice(-limit);
  } catch {
    return [];
  }
}

function saveFallback(record, limit) {
  try {
    const items = loadFallback(limit);
    items.push(record);
    localStorage.setItem("tsdne-history-fallback", JSON.stringify(items.slice(-limit)));
  } catch {}
}
