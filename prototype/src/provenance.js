const encoder = new TextEncoder();

export async function sha256Hex(value) {
  const bytes = encoder.encode(String(value));
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function attachInternalProvenance(candidate) {
  const graphJSON = JSON.stringify(candidate.graph);
  const [sourceHash, graphHash] = await Promise.all([
    sha256Hex(candidate.source),
    sha256Hex(graphJSON),
  ]);

  return {
    ...candidate,
    provenance: {
      schema: "tsdne-internal-provenance-v1",
      generatorVersion: candidate.graph?.generator || null,
      sourceHash,
      graphHash,
    },
  };
}

export const PROVENANCE_POSITION = Object.freeze({
  retainsProvenance: true,
  confersTitle: false,
  confersOwnership: false,
  createsScarcity: false,
  claimsUniqueness: false,
});
