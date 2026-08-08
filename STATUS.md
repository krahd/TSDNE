# TSDNE status

**Date:** 8 August 2026  
**Repository:** `krahd/TSDNE`  
**Primary branch:** `main`  
**Current application version:** `0.3.1-alpha.3`  
**Preserved predecessor:** `archive/webllm-release-candidate-2026-08-04`

## Current definition

*This Shader Does Not Exist* is an artwork that stages an encounter with computational abundance, serendipity, relinquishment, executable persistence, and non-proprietary circulation. It is not an interactive shader-exploration or recommendation system.

> **TSDNE retains provenance but abolishes title.**
>
> **The shader can be identified, copied, and reconstructed, but not claimed.**
>
> **The system remembers enough not to repeat, but not enough to restore.**

## Frozen public-artwork decisions

- No LLM, diffusion model, learned checkpoint, remote inference service, prompt, preference learner, or user-directed lineage in the public runtime.
- One shader at a time.
- **another** means relinquishment, not dislike.
- **take the code** means continuation, not acquisition or ownership.
- No catalogue, restore function, public encounter archive, certificate, title record, mint, edition, or global uniqueness claim.
- Hashing remains implicit and operational.
- Persistent anti-repetition memory stores only bounded, non-reconstructive perceptual traces.
- Public visitors are not used as behavioural training data.

## Current production system

The production runtime provides:

- forty-nine structural families derived from one explicit family/category ledger;
- separable structural, colour, and surface-finish axes;
- six colour modes and seven finishes;
- authored procedural complexity with sparse, quiet, slow, dense, geometric, recursive, dimensional, biological, physical, period and rule-driven regions;
- stratified family scheduling across macro-categories;
- real local WebGL2 compilation and rendering;
- temporal, luminance, variance, motion, saturation and flashing checks;
- candidate selection balancing perceptual novelty, family separation, colour-mode separation and visual complexity;
- stronger separation in early encounters;
- local anti-repetition across reloads;
- internal SHA-256 source and graph provenance;
- explicitly non-certificate export manifests;
- free and non-exclusive shader circulation;
- frame-budgeted background generation and prefetch;
- static deployment without model or runtime-package dependencies.

## Runtime and local-memory stability

The runtime corrections merged on 8 August materially improve the reliability of the realised encounter:

- validation is now independent of the visitor's pause/reduced-motion viewing state, preventing a paused session from making every candidate fail as `too-static`;
- pause and reduced-motion settings use a continuous per-display motion clock instead of collapsing or jumping effective shader time;
- repeated empty search cycles are bounded and produce a diagnostic error rather than an unbounded search loop;
- clearing local anti-repetition memory invalidates generation already in flight, so an old prefetched result cannot immediately reintroduce state selected against the erased history;
- perceptual-repeat comparison no longer assumes a structural vector that persistent traces deliberately do not contain;
- curation fallback-storage failures are surfaced instead of silently losing ratings;
- background prefetch failures are observed by both public and curation adapters.

These are implementation corrections, not changes to the artistic proposition. They make the existing proposition more faithfully realised.

## Shared runtime and external curation audit

Generation, validation, selection, anti-repetition, provenance and rendering are centralised in `prototype/src/runtime.js`.

The public adapter (`prototype/src/main.js`) and the private curation adapter (`prototype/src/curation.js`) both call that same runtime. Contract tests prohibit the curation adapter from importing or reimplementing generator, selector, perception, history, WebGL or provenance mechanics.

The former standalone branches `research/curation-instrument-250` and `research/curation-instrument-250-v2` have been retired and deleted. Their central architectural flaw was duplication of the production system.

The replacement curation surface is deployed at the unlinked route:

`/curation/`

It is marked `noindex,nofollow,noarchive` and is not linked from the public artwork. Discovery of the URL is not treated as authentication; all curation data remains local to the browser.

### Curation controls

- `F` — **OK**: acceptable for TSDNE as-is;
- `G` — **not OK**: should not appear in TSDNE as-is;
- `H` — **repetitive**: acceptable in itself, but too similar to something shown recently;
- `C` — optional comment on the latest rating;
- `E` — JSON export;
- `Shift+E` — CSV export.

There is no fixed 250-item quota in the interface. Sessions may be abandoned by closing the browser and resumed later as a new session within the same cumulative local corpus.

Ratings never influence generation online. They are used only after collection to diagnose and explicitly revise the authored generator or selector.

See `docs/CURATION-AUDIT.md`.

## Audit data captured

Each rating records the exact production encounter and its context, including:

- application/deployment revision;
- runtime, selector, generator and perception versions;
- seed, graph, traits, palette, family/category, colour mode, finish and variant;
- source/graph hashes;
- perceptual and safety descriptors;
- selected-score components;
- complete ranked candidate-pool summaries;
- every generation/validation attempt and rejection reason;
- recent non-reconstructive perceptual traces available to the selector;
- generation and display durations;
- browser/display conditions;
- optional comment and a small visual thumbnail.

The analysis separates intrinsic failure (`not OK`) from sequence failure (`repetitive`). Human repetition judgements can therefore be compared directly with the production descriptor's own distances to recent traces.

## Verification architecture

Repository verification includes:

- Node syntax checks for all runtime, curation and analysis modules;
- unit/contract tests, including runtime search-cycle, motion-clock, perceptual-distance and curation-storage regressions;
- an architectural test ensuring curation remains an observer of the shared production runtime;
- a headless Chrome WebGL2 diagnostic that compiles and renders three variant conditions for every current structural family, while cycling through colour and finish regimes;
- a production-runtime first-encounter diagnostic exercised under multiple viewing settings;
- diagnostics that assert on completion state created by the running page rather than grepping success strings embedded in source;
- GitHub Pages verification before deployment;
- a deployed `build.json` manifest so curation exports can record the exact Git commit that produced them.

The browser diagnostics are CI smoke/runtime tests, not substitutes for cross-device visual curation or photosensitive-safety review.

## Preserved work

`archive/webllm-release-candidate-2026-08-04` preserves the former WebLLM, mutation, awakening and intention/action research apparatus for possible separate use. It no longer determines TSDNE's public interaction.

## Remaining empirical/artistic work

1. use `/curation/` in one or several practical sessions and export the corpus periodically;
2. inspect `not OK` failures and `repetitive` failures separately;
3. revise weak families, parameter regions, colour/finish interactions, quality thresholds, selector weights or perceptual descriptors explicitly;
4. begin later curation sessions against the revised version and compare epochs where useful;
5. run normal visual testing on the M1 Max and other real GPU/browser combinations;
6. test Chrome, Safari, Firefox, Android and iOS;
7. verify every export format in its intended host;
8. conduct reduced-motion and photosensitive-seizure review;
9. continue visual-genealogy documentation for explicitly referenced families;
10. document the realised artwork with stills/video and integrate curation evidence into the practice-led manuscript.

## Interpretation rule

The curation corpus is first-person production evidence. It can document the artist's generator audit and the revisions that follow from it. It must not be presented as a population-preference study or as evidence that public visitors share the curator's judgements.
