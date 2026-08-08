# This Shader Does Not Exist

*This Shader Does Not Exist* (TSDNE) is a browser artwork about serendipity, computational abundance, relinquishment, executable persistence, and non-proprietary relation.

One generated shader appears at a time. The visitor may remain with it, relinquish it for another unknown possibility, or take its freely reusable code elsewhere. There is no catalogue, comparison grid, prompt, recommendation system, account, ownership registry, or public archive.

> **TSDNE retains provenance but abolishes title.**
>
> **The shader can be identified, copied, and reconstructed, but not claimed.**

## The encounter

TSDNE does not ask the visitor to design a shader or navigate an optimisation space. Its interaction is deliberately narrow:

1. a shader appears;
2. the visitor may remain with it;
3. **another** relinquishes it through the interface;
4. **take the code** permits its executable form to continue elsewhere.

The work produces a singular encounter without claiming a scarce or unique object. A shader may be computationally reproducible and still be unavailable after it is relinquished through the interface. This is interface-produced loss over a reproducible substrate, not simulated destruction.

## The sequence, not the visitor

The artwork does not identify or model the visitor. It does not collect personal information, infer taste, maintain an account, build a recommendation profile, or optimise towards predicted engagement.

It does, however, adapt the sequence. A bounded local history of what this browser has already been shown pushes later selections away from recently occupied perceptual regions. The system remembers its own recent presentations, not what the visitor supposedly liked about them.

Whether an encounter becomes personally meaningful remains an open experiential question rather than something inferred from the interface.

## Generativity without a runtime language model

The public artwork uses explicit procedural systems, WebGL2, deterministic seeds, perceptual analysis, and local novelty-and-quality search. It does not run an LLM, diffusion model, learned generative checkpoint, or external inference service.

This is a deliberate artistic and infrastructural decision. The title enters the cultural field of generative-AI “does not exist” projects while refusing the assumption that contemporary generativity must depend on a foundation model, scraped runtime corpus, remote model host, or high-memory model runtime.

## Visual grammar

Shader richness is treated as an artistic and engineering requirement rather than a technical-priority claim.

The current generator contains **forty-nine structural families** across continuous fields, constructivist and hard-edge geometry, reprographic systems, recursive/fractal systems, marched three-dimensional space, biological systems, physical systems, line and lattice projection, synthetic period styles, volume and water, and rule-driven structure.

Variation is separated into three axes:

- **structure** — the spatial or dynamical family;
- **colour** — one of several independently selected colour-mapping regimes;
- **finish** — a reprographic surface stage including clean, grain, posterised, dithered, scanline, vignette, and bloom treatments.

The expansion was introduced because a formally large parameter space is insufficient if successive encounters remain perceptually similar. The generator is screened and selected for difference, but no claim of global or perceptual uniqueness is made.

## Local anti-repetition memory

A shallow generator would undermine the work: three similar results can make computational abundance appear fraudulent. TSDNE therefore keeps a bounded local memory of perceptual difference.

The persistent memory stores only:

- a local random key;
- time of display;
- broad visual family;
- compact, non-reconstructive colour, luminance, spatial, and temporal descriptors.

It does **not** store:

- shader source;
- seed;
- graph or parameters;
- image or video frames;
- account or identity;
- inferred preference;
- a route back to a relinquished shader.

The system remembers enough not to repeat, but not enough to restore. The memory never leaves the browser and can be cleared from **about**.

## Provenance without title

The software internally computes deterministic seeds and cryptographic hashes. These support technical integrity, debugging, reconstruction of deliberately exported code, and verification that a source file corresponds to a graph.

They are not presented as certificates. TSDNE provides:

- no minting;
- no public registry;
- no serial-number display;
- no edition;
- no authenticity theatre;
- no global uniqueness claim;
- no ownership or transfer record;
- no proprietary or collectible scarcity claim.

When the visitor takes the code, a plain technical manifest accompanies it. The manifest explicitly describes itself as **not a certificate** and confers no title.

## Production curation

TSDNE's public visitors are not used to optimise the generator. Artistic curation is performed separately through an unlinked, browser-local audit surface that observes the **same production runtime** as the public artwork rather than reimplementing it.

The audit records explicit artist judgements as **OK**, **not OK**, or **repetitive**. `repetitive` means that an output is acceptable in itself but too similar to a recent encounter. Ratings never alter generation online; they are analysed later to support explicit, inspectable revisions of the authored generator, selector, quality thresholds, or perceptual-distance system.

The audit is documented in [`docs/CURATION-AUDIT.md`](docs/CURATION-AUDIT.md). It is production methodology, not visitor profiling or a population-preference study.

## Status and verification

The former WebLLM, model-mutation, and awakening implementation is preserved at:

`archive/webllm-release-candidate-2026-08-04`

The current implementation centralises generation, validation, selection, anti-repetition, provenance, rendering, and audit telemetry in one production runtime. The public interface and private curation surface are adapters over that runtime.

Repository verification currently includes:

- JavaScript syntax checks;
- unit and architectural-contract tests;
- a real WebGL2 headless-browser compile/render smoke test across all forty-nine families under three variant conditions each (**147/147** conditions passing on the current CI revision);
- a production-runtime first-encounter diagnostic;
- verified GitHub Pages deployment.

The historical 7 August generator audit and its resolution record remain in [`docs/AUDIT-2026-08-07.md`](docs/AUDIT-2026-08-07.md).

## Running locally

```bash
cd prototype
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser with WebGL2.

To verify the source:

```bash
npm install --ignore-scripts
npm run verify
```

The project has no runtime package dependency and can be served as static files.

## Interaction

- **another** — relinquish the present shader and encounter another;
- **take the code** — download or copy executable source and adapters;
- **pause** — pause or resume motion;
- **about** — read the work’s position, privacy architecture, and accessibility settings.

Keyboard controls:

- `N`: another;
- `U`: take the code;
- `Space`: pause or play;
- `A`: about.

## Architecture

The browser performs generation and evaluation locally:

1. the explicit procedural grammar generates candidate shader programs;
2. WebGL2 compiles and renders them;
3. fixed temporal samples produce compact perceptual descriptors;
4. technical, flash, motion, luminance, and variance checks reject unsuitable candidates;
5. a stratified schedule crosses visual macro-categories before returning to them;
6. a novelty tournament favours candidates distant from recent local traces while also considering family, colour mode, and visual articulation;
7. early encounters apply stricter separation;
8. only the selected shader is shown;
9. its reconstructive information remains in active memory unless the visitor takes the code;
10. only a non-reconstructive perceptual trace enters persistent local anti-repetition memory.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Privacy

TSDNE has:

- no analytics;
- no cookies;
- no account;
- no advertising;
- no fingerprinting;
- no behavioural profile;
- no remote inference;
- no server-side generation;
- no third-party model request.

See [`PRIVACY.md`](PRIVACY.md).

## Free circulation

The application and generator are licensed under GPL-3.0-or-later. Generated shader output is offered under a CC0 waiver to the extent that waivable rights exist.

The gesture is not “you own this.” It is “this executable form may continue elsewhere.”

See [`GENERATED-SHADERS-LICENSE.md`](GENERATED-SHADERS-LICENSE.md).

## Research and writing

The first paper is practice-led and HCI-adjacent. Its central claim is not a new shader-generation algorithm. It examines how the work relocates scarcity, memory, provenance, and selection while producing difference without behavioural inference.

Paper manuscripts, paper-specific audits, source ledgers, venue strategy, and writing-register material are maintained canonically in:

`krahd/academic-writing/my_papers_2026/2026 - This Shader Does Not Exist/`

This repository retains only artwork implementation, project/research context, production audits, curation/reproducibility material, and technical documentation.

See:

- [`docs/PROJECT.md`](docs/PROJECT.md)
- [`docs/GENEALOGY.md`](docs/GENEALOGY.md)
- [`docs/RESEARCH-PLAN.md`](docs/RESEARCH-PLAN.md)
- [`docs/CURATION-AUDIT.md`](docs/CURATION-AUDIT.md)

## Authorship and development

Concept and artistic direction: Tomas Laurenzo.

Software, procedural grammar, documentation, artistic selection, accepted code, project claims, licensing, and responsibility remain under Tomas Laurenzo's direction.
