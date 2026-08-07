# Public-release checklist

## Conceptual consistency

- [ ] No public text describes TSDNE as a shader explorer, recommender, co-creative tool, or LLM artwork.
- [ ] No public text claims absolute or global uniqueness.
- [ ] No public text claims a relinquished shader is globally destroyed.
- [ ] No interface element resembles a certificate, mint, token, rarity score, edition, or ownership record.
- [ ] The two central formulations appear consistently:
  - TSDNE retains provenance but abolishes title.
  - The shader can be identified, copied, and reconstructed, but not claimed.
- [ ] **another** is described as relinquishment, not rejection.
- [ ] **take the code** is described as continuation and free circulation, not acquisition.

## Runtime

- [ ] No `ai.js`, WebLLM worker, model URL, model setting, loading state, or inference code remains on `main`.
- [ ] No third-party runtime request occurs after static files load.
- [ ] Candidate-pool generation works.
- [ ] Early-encounter family separation works.
- [ ] Novelty selection works with empty, session, and persisted histories.
- [ ] No candidate with failed quality or flash screening is displayed.
- [ ] Background prefetch never blocks interaction.
- [ ] WebGL context restoration works.

## Anti-repetition memory

- [ ] IndexedDB schema version deletes predecessor reconstructive records.
- [ ] Stored records contain no source, seed, graph, hash, frame, screenshot, or preference.
- [ ] History remains bounded.
- [ ] LocalStorage fallback uses the same reduced schema.
- [ ] Clear-history control deletes all local traces.
- [ ] Three reloads produce convincingly different shaders.
- [ ] Ten consecutive encounters do not expose a repetitive template loop.

## Provenance and export

- [ ] Source and graph SHA-256 values are calculated.
- [ ] Hashes are absent from the normal encounter DOM.
- [ ] Technical manifest states `technical-manifest-not-certificate`.
- [ ] Manifest records no owner.
- [ ] Manifest confers no title, ownership, exclusivity, authenticity, scarcity, or uniqueness.
- [ ] Seed and graph reconstruct the exported output.
- [ ] Raw GLSL works.
- [ ] Self-contained HTML works.
- [ ] Three.js adapter works.
- [ ] ShaderToy adapter works.
- [ ] ISF adapter works.

## Visual curation

- [ ] At least 250 outputs reviewed.
- [ ] Weak parameter regions recorded and corrected.
- [ ] Family-specific failure rates reviewed.
- [ ] Complexity is not reducible to visual noise or excessive motion.
- [ ] Quiet, sparse, dark, and slow outputs remain possible.
- [ ] The first four encounters are strongly distinct.

## Accessibility and safety

- [ ] Pause works.
- [ ] Reduced motion works.
- [ ] Reduced intensity works.
- [ ] Keyboard operation works.
- [ ] Focus management works.
- [ ] Screen-reader labels are accurate.
- [ ] Mobile safe areas work.
- [ ] Flash-screening heuristic reviewed against actual outputs.
- [ ] Independent photosensitive-seizure safety review completed where possible.

## Verification

- [ ] The version agrees across `package.json`, `CITATION.cff`, and
      `APP_VERSION` in `prototype/src/main.js`. The prototype has no build step,
      so the displayed version is declared separately and does not follow
      `package.json` automatically.
- [ ] `npm run check` passes.
- [ ] `npm test` passes.
- [ ] GitHub CI passes.
- [ ] Chrome/Edge macOS tested.
- [ ] Safari macOS tested.
- [ ] Firefox tested.
- [ ] Windows tested.
- [ ] Android tested.
- [ ] iOS tested.

## Deployment

- [ ] Repository remains private until validation completes.
- [ ] Pages or Laurenzo hosting selected.
- [ ] HTTPS works.
- [ ] Canonical domain purchased and attached.
- [ ] Secondary domain redirects if purchased.
- [ ] Release commit archived.
- [ ] Static source package archived independently.
- [ ] Video and still documentation completed.
