import test from "node:test";
import assert from "node:assert/strict";

// The curation store falls back to localStorage only where IndexedDB is
// unavailable (private browsing, blocked storage). Records carry a full
// generation audit and a thumbnail, so the quota is exhausted after very few
// ratings — exactly the situation in which a dropped rating must not be
// reported as collected.
const store = new Map();
let failWrites = false;

globalThis.localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => {
    if (failWrites) {
      const error = new Error("The quota has been exceeded.");
      error.name = "QuotaExceededError";
      throw error;
    }
    store.set(key, String(value));
  },
  removeItem: (key) => store.delete(key),
};

const { loadRecords, saveRecord, updateComment } = await import("../prototype/src/curation-data.js");

const record = (ordinal, rating = "ok") => ({
  recordId: `rating-${ordinal}`,
  sessionId: "session-1",
  ordinal,
  rating,
  comment: "",
});

test("a rating that cannot be stored is reported rather than silently dropped", async () => {
  store.clear();
  failWrites = false;
  await saveRecord(record(1));
  assert.equal((await loadRecords()).length, 1);

  failWrites = true;
  await assert.rejects(
    () => saveRecord(record(2)),
    /quota/i,
    "saveRecord must not report success for a rating the browser refused to store",
  );

  failWrites = false;
  assert.deepEqual(
    (await loadRecords()).map((item) => item.ordinal),
    [1],
    "the refused rating must not appear in the store either",
  );
});

test("a comment that cannot be stored is reported rather than silently dropped", async () => {
  store.clear();
  failWrites = false;
  await saveRecord(record(1));

  failWrites = true;
  await assert.rejects(() => updateComment("rating-1", "worth revisiting"), /quota/i);

  failWrites = false;
  assert.equal((await loadRecords())[0].comment, "", "the refused comment must not appear to have landed");
});

test("an unknown rating is refused before it reaches the store", async () => {
  store.clear();
  failWrites = false;
  await assert.rejects(() => saveRecord(record(1, "excellent")), /Unknown curation rating/);
  assert.equal((await loadRecords()).length, 0);
});
