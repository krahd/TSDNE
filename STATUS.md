# TSDNE status

**Date:** 7 August 2026  
**Repository:** `krahd/TSDNE`  
**Primary branch:** `main`  
**Preserved predecessor:** `archive/webllm-release-candidate-2026-08-04`  
**Expanded-generator audit:** `docs/AUDIT-2026-08-07.md`

## Current definition

*This Shader Does Not Exist* is not a shader exploration interface. It is an artwork that uses generated shaders to stage an encounter with computational abundance, serendipity, relinquishment, executable persistence, and non-proprietary circulation.

Frozen formulations:

> TSDNE retains provenance but abolishes title.

> The shader can be identified, copied, and reconstructed, but not claimed.

## Decisions now frozen

- No LLM or model download in the public artwork.
- No prompt, sliders, evolutionary controls, preference learning, or user-directed lineage.
- No visible awakening or mutation of a shader after it appears.
- One shader at a time.
- **another** means relinquishment, not dislike.
- **take the code** means continuation, not acquisition or ownership.
- No catalogue, restore function, public archive, certificate, title record, mint, edition, or global uniqueness claim.
- Hashing remains implicit and operational.
- A bounded local anti-repetition memory stores only non-reconstructive perceptual traces.
- Shader visual complexity is pursued through explicit procedural grammar, local computational search, perceptual evaluation, and private artistic curation.
- “No model” is a runtime property of the artwork, not a claim that AI tools were absent from software development.

## Current implementation

The current `main` branch provides:

- immediate self-contained procedural generation;
- thirty-nine structural families spanning continuous fields, constructivist and hard-edge geometry, reprographic surfaces, recursive and fractal systems, marched space with a moving camera, biological systems, and physical systems;
- three separable axes of variation: structural family, colour mode, and reprographic finish;
- six colour modes and seven finish modes;
- relaxed complexity enrichment that preserves sparse, quiet, and slow regions rather than forcing maximal density;
- local WebGL2 compilation and rendering;
- temporal, luminance, variance, motion, saturation, and flashing checks;
- a maximin candidate tournament balancing perceptual novelty, family separation, colour-mode separation, and visual complexity;
- stricter separation across the first four encounters of a session;
- persistent local anti-repetition across reloads;
- no stored seed, source, graph, parameters, frame, screenshot, source hash, account, identity, or inferred preference in persistent anti-repetition memory;
- internal SHA-256 source and graph provenance;
- technical export manifests explicitly marked as non-certificates;
- free and non-exclusive shader circulation;
- frame-budgeted candidate search with visible activity feedback;
- static deployment without runtime package or model dependencies;
- accessibility, privacy, licensing, deployment, audit, and paper documentation.

## 7 August generator expansion

Commit `47fb889035ed6dbe06a6b422dd5c51779e426091` expanded the grammar from twelve to thirty-nine structural families and separated structure, colour, and finish.

The change also:

- reduced the previous bias towards uniformly dense/high-edge images;
- introduced colour-mode separation into candidate selection;
- made generation progress visible;
- sliced search work across animation frames so the displayed shader remains responsive;
- deferred the expensive flash-screen check until after cheaper perceptual rejection;
- prevented a foreground request from competing with an already-running prefetch.

GitHub Actions verification passed for this revision, and the Pages deployment workflow also completed successfully.

## Audit findings requiring attention

The 7 August audit found no conceptual regression, but four implementation/research issues should be addressed before the 250-run curation study is used as evidence.

1. **Family sampling bias.** `familySchedule()` rotates through the categorically ordered family list while candidate collection stops after 5/9 valid candidates. A pool can therefore sample a contiguous category neighbourhood rather than an unbiased cross-section of all 39 families.
2. **Stale curation instrument.** `research/curation-instrument-250` remains based on the pre-expansion twelve-family generator and must be refreshed before collecting the planned 250 ratings.
3. **No real GLSL compile matrix in CI.** Unit tests validate emitted source structurally but do not invoke a real WebGL2 compiler for every family/colour/finish combination.
4. **Incomplete memory clear.** Clearing persistent anti-repetition memory resets perceptual traces and family history but currently leaves the session-only recent colour-mode list active.

A fifth documentation issue is also recorded: named visual references such as Richter, Eggeling, Suprematism, and Bauhaus should receive an explicit genealogy rather than remain unexplained style labels.

See `docs/AUDIT-2026-08-07.md` for the complete analysis and recommended order of work.

## Private 250-run curation study

The private curation instrument remains conceptually valid but is temporarily **not ready for data collection** because it targets the old generator.

When refreshed, the study should record and analyse:

- macro-category;
- family;
- colour mode;
- finish;
- complete traits and palette;
- seed and generator version;
- selector score components;
- complete candidate-pool composition;
- perceptual descriptors;
- explicit `interesting`, `not interesting`, or `skip` judgement;
- optional comments;
- technical failures and rejections.

The study should distinguish a balanced generator audit from an audit of the actual public selector. This is necessary to separate weaknesses in the grammar from weaknesses in selection.

## AI/runtime distinction

The public artwork runs without a language model, diffusion model, generative checkpoint, or remote inference service.

Software development has nevertheless used AI programming assistance. The 7 August generator expansion was explicitly committed with Claude Opus 5 credited as a code co-author. This production fact is documented in `docs/AI-USE-STATEMENT.md` and should remain explicit in the paper.

## Preserved work

The archived branch preserves:

- WebLLM loading and worker integration;
- Qwen/SmolLM model experiments;
- model-generated graph mutation;
- B + C delayed awakening;
- intention/action logging;
- mutation baselines and technical-study scaffolding;
- the previous AI-oriented documents and audits.

This material may inform another artwork or a technical paper. It no longer determines TSDNE’s public interaction.

## Verification completed

- The previous WebLLM implementation was preserved before the no-model revision.
- Model runtime files and mutation controls are absent from current `main`.
- JavaScript syntax checks and the repository unit tests pass in GitHub Actions.
- The 7 August expanded-generator CI run completed successfully.
- The 7 August GitHub Pages deployment workflow completed successfully.
- The canonical paper plan now records the 39-family structure/colour/finish grammar, private curation methodology, and AI-development/runtime distinction.

## Remaining empirical and release gates

1. resolve or explicitly model the family-pool sampling bias;
2. refresh the private 250-run curation instrument against current `main`;
3. add or perform real WebGL2 compilation/render checks across the expanded family set;
4. fix or clarify the colour-mode state left after clearing anti-repetition memory;
5. run the artwork on normal GPU-browser hardware and verify first-display latency;
6. inspect and rate at least 250 generated outputs using the updated study design;
7. curate family probabilities, weak parameter regions, and problematic colour/finish interactions;
8. evaluate revisions on a held-out batch;
9. test repeated reloads and longer **another** sequences;
10. test Chrome, Safari, Firefox, Android, and iOS;
11. verify every export format in its intended host;
12. conduct reduced-motion and photosensitive-seizure review;
13. attach the canonical domain when selected/purchased;
14. document the completed artwork with video and still images;
15. draft the 1,500–2,000-word journal argument memorandum.

## Public-release rule

Repository visibility and deployment should remain subordinate to the empirical gates above. A successful CI/Pages deployment does not by itself establish visual quality or cross-driver GLSL validity.
