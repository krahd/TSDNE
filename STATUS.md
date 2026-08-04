# Status

**Status date:** 4 August 2026  
**Repository:** `krahd/TSDNE`  
**Visibility:** private pending account-level release actions  
**Phase:** source-complete release candidate; hardware, browser, aesthetic, and public-release validation pending

## Release-candidate milestone reached

The bounded TSDNE artwork described in the project records is implemented as a static browser application in `prototype/`.

The implementation includes:

- immediate full-screen procedural generation;
- twelve typed and serialisable visual families;
- cryptographically seeded graph generation;
- deterministic GLSL ES 3.00 compilation;
- family-specific technical and aesthetic quality gates;
- multi-frame perceptual descriptors and bounded local novelty comparison;
- IndexedDB encounter history with localStorage fallback;
- the agreed B + C local-AI interaction;
- Qwen2.5 0.5B as the default local WebLLM model, with SmolLM2 360M and Llama 3.2 1B comparison options;
- schema-constrained local mutation proposals over twelve visual traits;
- model-load, inference, network, memory, data-saver, and unsupported-device fallbacks;
- immediate procedural operation when WebLLM is unavailable;
- one optional slow in-place mutation and later prefetched hybrid candidates;
- raw GLSL, encounter JSON, self-contained WebGL, Three.js, ShaderToy, and ISF exports;
- non-proprietary CC0 encounter and shader terms;
- reduced-motion, reduced-intensity, pause, keyboard, screen-reader, and focus support;
- local-only timing and diagnostic records;
- privacy, accessibility, security, contribution, citation, licence, changelog, and release documents;
- automated syntax and unit tests;
- GitHub Pages and CI workflows.

## Related-work review completed

A comprehensive genealogy and adversarial verification pass have been committed:

- [`docs/GENEALOGY.md`](docs/GENEALOGY.md) maps direct precedents and wider lineages across algorithmic art, browser/net art, HCI, shader systems, evolutionary computation, AI-generated shaders, browser-local inference, political economy, accessibility, security, and preservation;
- [`docs/GENEALOGY-AUDIT.md`](docs/GENEALOGY-AUDIT.md) records the verification method, corrections, exclusions, claim controls, and implementation consequences;
- [`REFERENCES.md`](REFERENCES.md) is now a structured verified source index rather than a preliminary technical list.

The review found no verified work combining the complete TSDNE configuration, but this is explicitly treated as a bounded configuration finding rather than a priority claim. The project must not claim invention of generative art, browser art, shader sharing, interactive evolution, LLM-generated shaders, browser-local inference, or the “This X Does Not Exist” interface genre.

## Implemented visual families

1. folded flow;
2. liquid field;
3. moiré orbit;
4. cellular drift;
5. polar vault;
6. aurora ribbons;
7. reaction lace;
8. crystalline lens;
9. tidal ink;
10. magnetic sand;
11. spectral loom;
12. echo garden.

These families share a typed graph while retaining family-specific cost, motion, variance, and visual-selection requirements.

## Local AI implementation

- default: Qwen2.5 0.5B;
- lower-bound comparison: SmolLM2 360M;
- larger comparison: Llama 3.2 1B;
- current model choice stored locally;
- support checks for HTTPS, WebGPU, data saver, and coarse device-memory limits;
- progress reporting, load timeout, generation timeout, interruption, and one retry;
- JSON-schema response format;
- deterministic normalisation, compilation, visual testing, and rejection after inference.

## Perceptual non-repetition

The release candidate samples three fixed temporal frames and calculates:

- luminance mean and variance;
- saturation;
- edge energy;
- temporal change;
- flash ratio;
- luminance and RGB histograms;
- a 64-bit spatial difference hash;
- a structural graph vector.

Candidates are rejected only where family-specific quality thresholds fail or structural and visual distance jointly indicate excessive proximity to bounded local history.

## Export implementation

`use this shader` downloads:

- encounter JSON;
- raw GLSL;
- standalone WebGL HTML;
- Three.js module;
- ShaderToy GLSL;
- ISF fragment shader.

Encounter records contain source, graph, seed, visual descriptor, lineage, origin, model, mutation, generator version, and a CC0/non-property statement.

## Accessibility and visual safety

Implemented:

- pause/play;
- keyboard commands;
- reduced-motion and reduced-intensity settings;
- system reduced-motion detection;
- no automatic model awakening under reduced motion;
- disabled crossfades under reduced motion;
- visible focus, semantic dialogs, live announcements, and skip link;
- family motion limits;
- automated flash-ratio and temporal-change rejection.

The work does not claim clinical seizure safety. Public release requires external flash analysis and representative-device review.

## Automated validation completed

- JavaScript syntax checks pass for all application and test modules.
- Ten unit tests pass.
- All twelve visual families compile deterministically at the source-generation level.
- Seeded generation is reproducible.
- Bounded mutations preserve parent lineage and change shader source.
- Perceptual-distance and local-history calculations are tested.
- Flat frames are rejected by quality assessment.
- All six export formats are generated and checked structurally.
- `npm install --ignore-scripts` reports no package vulnerabilities and installs no runtime dependencies.
- Static files serve through a local HTTP server.

## Manual validation still required

The current execution environment could not provide a normal GPU browser session. The following are release validation rather than missing source implementation:

- visual review of every family on actual displays;
- Chrome, Edge, Firefox, and Safari testing;
- macOS, Windows, Android, and iOS testing;
- WebLLM cold download and cached startup measurement;
- worker, JSON, timeout, cache, network, device-loss, and memory-failure testing on actual hardware;
- photosensitive-content review beyond the implemented automated threshold;
- keyboard and screen-reader review with assistive technology;
- aesthetic curation using the user's judgement;
- execution tests for every generated export in its target host;
- public Pages deployment smoke test.

## Account and registrar actions not executable through the current connector

- change repository visibility from private to public, if selected;
- enable GitHub Pages in repository settings if required;
- purchase `thisshaderdoesnotexist.com`, `tsdne.com`, or both;
- configure DNS, `CNAME`, HTTPS, and secondary-domain redirect;
- publish the first tagged release.

These steps are listed in `RELEASE-CHECKLIST.md` and should occur only after the manual validation above.

## Publication status

The first paper remains journal-first and practice-led:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

The implemented release candidate now supplies the material basis for production notes, screenshots, encounter observations, measured local-AI timings, and the first argument memorandum. The genealogy establishes the paper’s required related-work field and its claim boundary: the contribution is the realised synthesis, not novelty of any individual technical or artistic component.

## Immediate next actions

1. Run `npm test` and the local site on the user's M1 Max MacBook Pro.
2. Record one cold and one cached local-model session.
3. Review and rank the twelve visual families aesthetically.
4. Test all export formats in their actual hosts.
5. Complete accessibility and photosensitive-content review.
6. Decide repository-publication route and execute the account-level release checklist.
7. Purchase and configure the canonical domain.
8. Begin the journal article's production diary and argument memorandum using the verified genealogy and claim controls.
