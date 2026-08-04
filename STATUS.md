# Status

**Status date:** 4 August 2026  
**Repository:** `krahd/TSDNE`  
**Version:** `0.1.0-alpha.2`  
**Phase:** alpha implementation; source verified, visual and public-release validation incomplete

## Current artistic centre

TSDNE is organised around:

> **one object, no return, take the source**

The generator, optional model, exports, and non-repetition system support that encounter. They are not the project’s primary novelty claim.

The central theoretical problem is the gap between an interface that performs loss and a computational substrate in which the program can remain reproducible. “Personal without personalisation” is an open question rather than a demonstrated contribution.

## Implemented

- one full-screen shader encounter at a time;
- non-retrieval of replaced encounters through the interface;
- twelve authored WebGL2 shader families;
- cryptographic 128-bit seeding;
- a bounded serialisable family-and-trait program;
- deterministic GLSL ES 3.00 emission;
- family-specific validity and quality thresholds;
- four-candidate local selection using recent distance and family coverage;
- sparse broad temporal descriptors;
- separate dense high-frequency luminance-change screening;
- optimised multi-frame readback without per-frame canvas reallocation;
- WebGL resource rebuilding after context restoration;
- bounded, clearable IndexedDB encounter traces with limited localStorage fallback;
- persisted model and mutation provenance in local traces;
- parent lineage, model, and mutation provenance in encounter exports;
- optional local WebLLM proposals, off by default;
- rejection of ineffective model proposals without hidden substitution;
- optional family changes and bounded trait changes;
- random and authored mutation baselines;
- GLSL, encounter JSON, standalone WebGL, Three.js, ShaderToy, and ISF exports;
- revised export schema, licensing metadata, and GLSL 3 Three.js contract;
- GPL-3.0-or-later licensing for the authored system;
- conditional CC0 waiver language for generated outputs;
- reduced motion, reduced intensity, pause, keyboard, focus, and screen-reader support;
- automatic CI verification;
- manually gated GitHub Pages workflow.

## Important implementation boundary

The internal object historically named `graph` is **not a general typed AST**. It contains:

- a family identifier;
- twelve scalar traits;
- a cosine-palette record;
- a seed and generator version.

Changing family selects a different authored GLSL structure. Within-family mutation remains parametric. Typed nodes, arbitrary rewiring, insertion, removal, and graph recombination are not implemented.

## Audit remediation completed in source

Following [`docs/CRITICAL-AUDIT-2026-08-04.md`](docs/CRITICAL-AUDIT-2026-08-04.md), the current code:

- removes the authored fallback previously attributed to WebLLM;
- rejects materially empty proposals;
- records explicit proposer, model, family, intention, and changed traits;
- preserves parent lineage in exported encounters;
- permits a bounded family change;
- includes random and authored baselines;
- replaces the sparse “flash ratio” claim with a separate dense temporal heuristic;
- makes local AI opt-in and off by default;
- discloses the pinned external runtime host and model downloads;
- selects among several valid candidates;
- describes the representation as a bounded family program;
- preserves model and mutation provenance in local traces and fuller lineage in exports;
- aligns output notices with the limited CC0 waiver;
- improves temporal-sampling performance and context restoration.

The audit reviewed an earlier code snapshot but the then-current Markdown. Code findings were rechecked individually against `main`; documentation and conceptual findings were treated as current. See [`docs/AUDIT-RESPONSE-2026-08-04.md`](docs/AUDIT-RESPONSE-2026-08-04.md).

## Documentation remediation completed

- corrected Demokritos author order;
- separated the two ShaderGPT projects;
- separated ISMAR-Adjunct 2025, arXiv 2026, and CHI EA 2026 ShadAR records;
- added Chun, Gonzalez-Torres, Sehgal, and Kirschenbaum as central precedents;
- reframed the memory/forgetting sentence as a project figure requiring citation;
- removed the proposed atlas from the core project;
- described local storage as a bounded behavioural trace with specific safeguards;
- foregrounded GPL and limited CC0 claims;
- removed premature release-candidate language;
- separated implementation facts, hypotheses, and future technical options;
- added source-status, audit-response, and AI-use protocols;
- revised README, project, architecture, model, prototype, research, publication, deployment, accessibility, privacy, security, contribution, release, and public-interface documents.

## Automated verification

GitHub Actions verification succeeded on `main` after the integrated alpha remediation. The workflow completed:

- `npm ci --ignore-scripts`;
- JavaScript syntax checks for all application and test modules;
- the complete Node test suite.

The suite covers:

- deterministic compilation across all twelve families;
- deterministic seeded generation;
- rejection of ineffective proposals;
- bounded mutation and explicit provenance;
- random and authored baselines;
- descriptor and local-history comparison;
- synthetic repeated-flash rejection and stable-sequence acceptance;
- revised encounter and licensing records;
- standalone, Three.js, ShaderToy, and ISF export structure.

Automated verification does not establish visual quality, browser rendering, target-host export execution, accessibility, clinical safety, or model value.

## Deployment workflow

Automatic Pages deployment on every push was removed. It generated avoidable failures because Pages is not enabled for the repository and would also risk publishing an unvalidated alpha.

The Pages workflow is now manual. Before running it:

1. enable Pages and select GitHub Actions as the source;
2. confirm the current account/repository entitlement;
3. complete staging and release gates;
4. intentionally dispatch the workflow.

## Manual gates before public release

1. Render and review at least 200 encounters on a real GPU.
2. Inspect within-family and between-family repetition.
3. Test Chrome, Edge, Firefox, and Safari.
4. Test macOS, Windows, Android, and iOS where available.
5. Measure generation latency after four-candidate selection and dense screening.
6. Test cold and cached WebLLM loading after explicit opt-in.
7. Run matched model, random, authored, and no-mutation comparisons if AI remains in scope.
8. Perform external photosensitive-content analysis.
9. Review keyboard and screen-reader behaviour with assistive technology.
10. Execute every export in its target host.
11. Complete dependency, model-licence, and external-host review.
12. Deploy privately or to staging and run a full smoke test.
13. Rewrite final publication prose in Tomas Laurenzo’s own voice.
14. Read every source used in a manuscript in its cited form.

## Publication boundary

A practice-based paper should follow a visually credible deployment or exhibition and actual encounter documentation.

The provisional direction is:

> **One Object, No Return: Withdrawal, Executable Transfer, and Performed Loss in a Generative Browser Artwork**

The model belongs in the main argument only if an ablation demonstrates a material difference from matched random and authored mutation. Otherwise it should remain an implementation condition, a negative result, a research-only mode, or be removed.
