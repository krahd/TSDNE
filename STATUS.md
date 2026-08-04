# Status

**Status date:** 4 August 2026  
**Repository:** `krahd/TSDNE`  
**Visibility:** private; do not make public until release checks and licence are complete  
**Phase:** first fully implemented alpha; browser and aesthetic validation in progress

## Milestone reached

The first self-contained working alpha is implemented in `prototype/`.

It includes:

- immediate full-screen procedural generation;
- cryptographically seeded, typed and serialisable shader graphs;
- five initial visual families;
- deterministic GLSL ES 3.00 emission;
- browser compilation and coarse luminance, variance, and motion validation;
- bounded local non-repetition;
- `another`, `use this shader`, and `about`;
- Qwen2.5 0.5B loading locally through WebLLM on WebGPU-capable devices;
- complete procedural fallback when WebLLM is unavailable or data-saver is enabled;
- the agreed B + C interaction:
  - a subtle readiness invitation;
  - one optional slow in-place mutation of the first shader after sufficient dwell;
  - click-to-invite mutation when the model is ready;
  - mixed later procedural and model-mutated encounters through background prefetching;
- non-proprietary encounter export containing source, graph, seed, parent, origin, model, and mutation;
- a static GitHub Pages deployment workflow;
- professional public-facing README and explicit alpha acceptance record.

See [`PROTOTYPE.md`](PROTOTYPE.md).

## Implementation details

### Immediate encounter

The first candidate is produced procedurally and does not wait for model download or inference. The interface remains responsive while the local model loads.

### Bespoke local AI

The WebLLM agent receives a compact typed graph description and returns bounded JSON changes to eight traits:

- scale;
- tempo;
- density;
- turbulence;
- contrast;
- palette;
- complexity;
- rotation.

The model does not write unrestricted GLSL. Deterministic code normalises the mutation, compiles the shader, renders temporal samples, applies quality thresholds, and rejects invalid or weak proposals.

### B + C interaction

When the model becomes ready, the upper-right status becomes a restrained invitation. The visitor may click it to invite the model immediately. If the first encounter remains visible for twelve seconds, the system may initiate one validated mutation automatically and reveal it through a seven-second crossfade.

Later model-mutated candidates are prepared in the background. **Another** remains immediate: it uses a prefetched hybrid candidate when available and otherwise supplies a procedural candidate.

### Privacy and property

- no account;
- no behavioural profile;
- no cross-site identifier;
- no server-side inference;
- no marketplace, NFT, ownership certificate, or artificial scarcity;
- bounded recent signatures remain in local browser storage and are not uploaded;
- encounter records identify computational relations and confer no exclusivity.

## Frozen artistic decisions

1. TSDNE remains a small, bounded, self-contained browser artwork.
2. The experience centres the shader and the wager of refreshing, not AI branding.
3. Visual quality is constitutive.
4. The work makes no absolute firstness or visual-uniqueness claim.
5. Personal relation is produced through encounter rather than prior profiling.
6. Exported shaders are intended to circulate freely.
7. The first shader appears immediately; there is no mandatory loading screen.
8. WebLLM is consequential but not sovereign.
9. The procedural version is a complete artwork rather than an error fallback.
10. The first publication remains journal-first and practice-led.

## Validation completed

- JavaScript syntax checks pass for the generator, WebLLM client, worker, export, and interaction controller.
- Typed graph generation produces distinct seeded candidates.
- Bounded mutation preserves lineage and produces a changed shader program.
- Static files serve correctly through a local HTTP server.
- The GitHub Pages workflow follows the current official Pages action structure.

## Validation still required

This environment could not complete an ordinary GPU browser run. Before public release, test:

- WebGL rendering and transitions in current Chrome, Edge, Firefox, and Safari;
- WebLLM cold download, cached startup, JSON output, and worker behaviour;
- macOS, Windows, Android, and iOS devices;
- WebGPU absence, memory failure, network interruption, and data-saver fallback;
- model download size, latency, memory, energy, and cache persistence;
- photosensitive-seizure risk and reduced-motion behaviour;
- keyboard, screen-reader, contrast, and lower-power-device accessibility;
- the aesthetic strength and diversity of all visual families;
- standalone execution of exported shaders;
- GitHub Pages deployment after repository visibility or plan is resolved.

## Immediate next actions

1. Run the alpha locally on the user's M1 Max MacBook Pro and record cold/cached timings.
2. Verify one complete local-AI awakening and one prefetched hybrid **another** cycle.
3. Curate, revise, and expand the visual families from five toward 8–12.
4. Add stronger dynamic perceptual signatures rather than structural signatures alone.
5. Implement verified self-contained WebGL, Three.js, ShaderToy, and ISF exports.
6. Finalise accessibility and photosensitive-content rules.
7. Choose and add the public-domain or maximally permissive licence.
8. Add `CITATION.cff`, contribution guidance, issue templates, and release metadata.
9. Decide whether to make `krahd/TSDNE` public or publish a separate deployment repository.
10. Enable GitHub Pages and test the generated public URL.
11. Verify availability and purchase the canonical domain.
12. Maintain production notes and begin the source ledger for the first journal article.

## Hosting

The repository remains private. A Pages workflow is present but deployment requires Pages to be enabled and either:

- a plan supporting Pages from this private repository;
- changing the repository to public after review;
- or publishing the static prototype through a separate public deployment repository.

The existing Laurenzo host remains a portable alternative.

## Publication

The first paper remains:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

It will centre exploration, refreshing, ephemerality, contingent uniqueness, relation without property, individualisation without surveillance, and the political and aesthetic possibilities of a local bespoke AI.
