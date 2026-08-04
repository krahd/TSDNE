# Status

**Status date:** 4 August 2026  
**Repository:** `krahd/TSDNE`  
**Phase:** source-complete release candidate; hardware, browser, aesthetic, accessibility, export, and deployment validation pending

## Implemented

- immediate full-screen procedural generation;
- twelve typed and serialisable visual families;
- cryptographically seeded graph generation;
- deterministic GLSL ES 3.00 emission;
- family-specific technical and aesthetic gates;
- multi-frame perceptual descriptors and bounded local novelty comparison;
- IndexedDB history with localStorage fallback;
- optional constrained WebLLM mutation;
- Qwen2.5 0.5B default model with comparison configurations;
- procedural fallback for unsupported devices and model failures;
- GLSL, encounter JSON, standalone WebGL, Three.js, ShaderToy, and ISF exports;
- GPL-3.0-or-later application licensing and CC0-oriented generated-output terms;
- reduced-motion, reduced-intensity, pause, keyboard, focus, and screen-reader support;
- syntax checks, unit tests, CI, and GitHub Pages workflow.

## Genealogy revision completed

The related-work documents were revised following an external critical reading and a new primary-source verification pass.

- [`docs/GENEALOGY.md`](docs/GENEALOGY.md) now argues necessity rather than conjunctive novelty.
- [`docs/GENEALOGY-VERIFICATION.md`](docs/GENEALOGY-VERIFICATION.md) replaces the misleading self-audit label with an internal verification and claim register.
- [`docs/REFERENCES.md`](docs/REFERENCES.md) records corrected publication metadata and additional precedents.

Closed corrections include:

- *ShadAR* restored to its IEEE ISMAR-Adjunct 2025 publication date; the February 2026 arXiv record is identified as a later author-manuscript upload.
- *AI Co-Artist* updated from preprint-only status to its EvoMUSART 2026 publication in LNCS 16523.
- Ganbreeder/Artbreeder, LLuminate, the Quiroz–Dascalu 2017 follow-up, ShaderGPT, LUMEN, demoscene 4k/64k intros, and executable graphics added.
- precise locators added for reflective, critical-technical, adversarial, and seamful design.
- stale README links repaired after the project documents were moved into `docs/`.

The central research claim is now:

> The project’s contribution is not an unoccupied conjunction of features. Its constraints are mutually motivated refusals directed at named technical, interface, and political counter-models.

A further conceptual result has been made explicit:

> The system remembers so that the encounter can forget.

Bounded local history sustains non-retrieval and perceptual non-repetition without becoming a behavioural profile.

## Manual validation still required

- visual review of every family on representative displays;
- Chrome, Edge, Firefox, and Safari testing;
- macOS, Windows, Android, and iOS testing;
- cold and cached WebLLM measurements;
- worker, timeout, cache, network, device-loss, and memory-failure testing;
- external photosensitive-content analysis;
- keyboard and assistive-technology review;
- execution tests for every export target;
- public deployment smoke test.

## Publication boundary

The first paper remains journal-first and practice-led:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

It must not make component-level priority claims. Every source included in the submitted manuscript must receive a final human reading in its cited form.
