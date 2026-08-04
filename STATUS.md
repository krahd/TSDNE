# Status

**Status date:** 4 August 2026  
**Repository:** `krahd/TSDNE`  
**Phase:** alpha implementation; source present, visual and public-release validation incomplete

## Current artistic centre

TSDNE is organised around the withdrawal structure:

> **one object, no return, take the source**

The generator, local model, exports, and non-repetition system support that encounter. They are not the project’s primary novelty claim.

The principal theoretical problem is the gap between an interface that performs loss and a computational substrate in which the program can remain reproducible. “Personal without personalisation” is now treated as an open question rather than a demonstrated contribution.

## Implemented

- one full-screen shader encounter at a time;
- irreversible non-retrieval through the interface;
- twelve authored WebGL2 shader families;
- cryptographic 128-bit seeding;
- a bounded serialisable family-and-trait program;
- deterministic GLSL ES 3.00 emission;
- family-specific validity and quality thresholds;
- four-candidate local selection using recent distance and family coverage;
- sparse temporal perceptual descriptors;
- separate dense high-frequency luminance-change screening;
- bounded, clearable IndexedDB encounter traces with limited localStorage fallback;
- optional local WebLLM proposals, off by default;
- explicit model-proposal provenance;
- rejection of ineffective model proposals without hidden substitution;
- optional family changes as well as bounded trait changes;
- random and authored mutation baselines for later ablation;
- GLSL, encounter JSON, standalone WebGL, Three.js, ShaderToy, and ISF exports;
- GPL-3.0-or-later licensing for the authored system;
- CC0-oriented waiver language for generated outputs where applicable;
- reduced motion, reduced intensity, pause, keyboard, focus, and screen-reader support;
- syntax checks, unit tests, CI, and a GitHub Pages workflow.

## Important implementation boundary

The current internal object historically named `graph` is **not a general typed AST**. It contains:

- a family identifier;
- twelve scalar traits;
- a cosine-palette record;
- a seed and generator version.

Changing family selects a different authored GLSL structure. Within-family mutation remains parametric. Typed nodes, arbitrary rewiring, insertion, removal, and graph recombination are not implemented and must not be described as current capabilities.

## Audit remediation completed in source

The following findings from [`docs/CRITICAL-AUDIT-2026-08-04.md`](docs/CRITICAL-AUDIT-2026-08-04.md) have been addressed in the current code:

- removed the hidden authored mutation that had been attributed to WebLLM;
- reject materially empty proposals;
- record explicit proposer, model, family transition, intention, and changed traits;
- permit a bounded family change so that model action is not restricted entirely to scalar adjustment;
- add random and authored baselines rather than assuming model value;
- replace the three-sample “flash ratio” safety claim with a separate dense temporal screen;
- make local AI opt-in and off by default;
- disclose the pinned external WebLLM runtime host and model downloads;
- select among several valid candidates rather than displaying the first candidate that passes;
- describe the representation as a bounded family program rather than a typed AST.

The audit reviewed an earlier code snapshot but the then-current Markdown. Its code findings were therefore rechecked individually against `main`; its documentation and conceptual findings were treated as current. See [`docs/AUDIT-RESPONSE-2026-08-04.md`](docs/AUDIT-RESPONSE-2026-08-04.md).

## Documentation corrections underway or completed

- Demokritos author order: Santiago Ferrando, Christian Clark, Tomas Laurenzo;
- distinct ShaderGPT projects separated;
- ShadAR records separated into ISMAR-Adjunct 2025, the 2026 arXiv author manuscript, and the expanded CHI EA 2026 version;
- Wendy Hui Kyong Chun, Felix Gonzalez-Torres, Tino Sehgal, and Matthew Kirschenbaum added as central rather than peripheral precedents;
- “the system remembers so that the encounter can forget” reframed as a project figure requiring citation, not as an original theoretical result;
- the proposed atlas removed from the core project because it would restore the archive the encounter refuses;
- local storage described as a bounded encounter trace rather than denied categorically as behavioural data;
- GPL foregrounded as the substantive free-software commitment; CC0 treated as a clarifying waiver;
- project prose revised out of third-person self-description;
- machine assistance disclosed in [`docs/AI-USE-STATEMENT.md`](docs/AI-USE-STATEMENT.md).

## Automated verification

Local reconstruction of the revised modules passed:

- JavaScript syntax checks for `generator.js`, `ai.js`, `perception.js`, and `main.js`;
- twelve generator and perception tests;
- deterministic compilation across all twelve families;
- rejection of empty model proposals;
- bounded mutation and explicit provenance;
- random and authored baseline generation;
- detection of repeated full-frame high-frequency luminance transitions;
- acceptance of stable sequences.

Repository CI must still confirm the integrated tree after all documentation and source commits.

## Manual gates before public release

1. Render and review at least 200 encounters on a real GPU.
2. Inspect within-family and between-family repetition visually.
3. Test Chrome, Edge, Firefox, and Safari.
4. Test macOS, Windows, Android, and iOS where available.
5. Measure generation latency after the four-candidate and dense-screen changes.
6. Test cold and cached WebLLM loading after explicit opt-in.
7. Run matched model, random, and authored mutation comparisons.
8. Perform external photosensitive-content analysis; do not treat the heuristic as certification.
9. Review keyboard and screen-reader behaviour with assistive technology.
10. Execute every generated export in its target host.
11. Complete dependency, model-licence, and external-host review.
12. Deploy privately or to staging and run a full smoke test.

## Publication boundary

The earlier journal-first plan is no longer treated as fixed. A practice-based paper should follow a visually credible deployment or exhibition and real encounter documentation.

The provisional paper direction is:

> **One Object, No Return: Withdrawal, Executable Transfer, and Performed Loss in a Generative Browser Artwork**

The optional model belongs in the main argument only if an ablation demonstrates a material difference from matched random and authored mutation. Otherwise it should remain an implementation condition, a negative result, or be removed from the public version.

Every source used in a submitted manuscript must be read by the author in its cited form. Repository metadata, search snippets, and machine-produced verification language are insufficient.
