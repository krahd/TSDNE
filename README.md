# This Shader Does Not Exist

*This Shader Does Not Exist* (**TSDNE**) is an open-source browser artwork about exploration, ephemerality, computational abundance, personal relation without ownership, and individualisation without surveillance.

The artwork presents one full-screen animated shader at a time. A visitor may remain with it, relinquish it for **another**, or choose **use this shader** and carry its freely reusable source elsewhere.

> The shader becomes personal through encounter, not through profiling; it may be singular without becoming scarce or privately owned.

## Status

**Release candidate implemented.** The application, tests, documentation, CI, and GitHub Pages workflow are present. The repository remains private until the final account-level release actions are performed and the work is tested on the target hardware and browsers.

A comprehensive related-work genealogy and strict source/claim audit are available in [`docs/GENEALOGY.md`](docs/GENEALOGY.md) and [`docs/GENEALOGY-AUDIT.md`](docs/GENEALOGY-AUDIT.md).

## Experience

- **another** relinquishes the current shader;
- **use this shader** exports source, graph, seed, lineage, visual record, and integration formats;
- **pause** stops or resumes motion;
- **about** exposes privacy, local-AI, accessibility, model-selection, history, and performance controls;
- a restrained indicator shows when the optional local AI is loading, ready, or proposing a mutation.

The first shader appears immediately through procedural generation. On capable devices, a small WebLLM model loads in the background. It may propose one slow in-place mutation after sustained attention, or participate in later prefetched encounters. It never receives personal information and never blocks the complete procedural artwork.

## Architecture

1. Generate a cryptographically strong 128-bit seed in the browser.
2. Construct a typed and serialisable shader graph.
3. Select from twelve authored visual families.
4. Emit conservative GLSL ES 3.00.
5. Compile and render locally with WebGL2.
6. Sample three temporal frames and compute visual descriptors.
7. Reject blank, flat, static, excessively bright, expensive, repetitive, or high-flash candidates.
8. Compare visual and structural signatures with bounded local history in IndexedDB.
9. Optionally ask a local WebLLM model for a constrained mutation over twelve visual traits.
10. Validate, compile, render, evaluate, and accept or reject that proposal deterministically.

The AI is consequential but not sovereign: it proposes; the authored procedural and validation systems determine what can become visible.

## Visual families

The current generator contains twelve structurally distinct families:

- folded flow;
- liquid field;
- moiré orbit;
- cellular drift;
- polar vault;
- aurora ribbons;
- reaction lace;
- crystalline lens;
- tidal ink;
- magnetic sand;
- spectral loom;
- echo garden.

They share a typed vocabulary while retaining family-specific cost and aesthetic thresholds.

## Local models

The default model is **Qwen2.5 0.5B Instruct** in WebLLM/MLC format. The application also includes selectable lower-bound and larger-comparison configurations:

- SmolLM2 360M;
- Qwen2.5 0.5B;
- Llama 3.2 1B.

Model selection is stored locally and takes effect after reload. Cold downloads are substantial; procedural mode remains available throughout and on unsupported devices.

## Privacy

TSDNE uses no account, analytics, advertising, behavioural profile, cross-site identifier, database, or server-side inference.

A bounded local history of encounter identifiers, structural vectors, and compact visual descriptors is stored in IndexedDB or local storage to reduce obvious repetition on that device. It is never uploaded and can be cleared from **about**.

Local execution changes where data and computation occur; it does not by itself establish offline operation, complete privacy, ethical model provenance, equal device access, or reduced energy use. Network requests, storage, dependencies, and limitations are documented explicitly.

See [`PRIVACY.md`](PRIVACY.md).

## Uniqueness

Cryptographic seeds provide strong computational identifiers, but different seeds and graphs may produce similar appearances. TSDNE distinguishes:

- **computational identity:** seed, graph, generator version, and source;
- **perceptual identity:** contingent visual and temporal resemblance;
- **encounter identity:** a visitor's relation to a shader at a particular moment.

TSDNE generates computationally distinct candidates and actively reduces recent perceptual repetition. It does not claim absolute global visual uniqueness.

## Accessibility and visual safety

Implemented provisions include:

- pause/play;
- system and manual reduced-motion support;
- reduced-intensity mode;
- suppression of the long model transition under reduced motion;
- keyboard controls and visible focus;
- semantic controls, dialog labels, live announcements, and skip link;
- candidate rejection for extreme temporal change and high flash ratios;
- complete procedural fallback.

The work does not claim clinical seizure safety. See [`ACCESSIBILITY.md`](ACCESSIBILITY.md).

## Exports and free circulation

Each encounter can produce:

- encounter JSON;
- raw GLSL ES 3.00;
- a self-contained WebGL page;
- a Three.js adapter;
- a ShaderToy version;
- an ISF version.

The application is licensed under **GNU GPL 3.0 or later**. To the extent possible under law, generated shader outputs are dedicated to the public domain under **CC0 1.0**. Encounter records identify computational relations but confer no ownership, exclusivity, scarcity, or control over subsequent use.

See [`GENERATED-SHADERS-LICENSE.md`](GENERATED-SHADERS-LICENSE.md).

## Run locally

The artwork is a static site with no build step.

```bash
cd prototype
python3 -m http.server 8080
```

Open `http://localhost:8080` in a WebGL2-capable browser. Optional local AI additionally requires WebGPU and HTTPS or localhost.

## Verify

```bash
npm install
npm run check
npm test
```

The test suite covers deterministic generation across all families, bounded mutation and lineage, perceptual comparison, quality rejection, non-proprietary encounter records, and all export formats.

## Deployment

A GitHub Pages workflow verifies the repository and publishes `prototype/`. The application is host-independent and may instead be deployed to the infrastructure used for `laurenzo.net`.

The intended canonical domain is `thisshaderdoesnotexist.com`, subject to availability. `tsdne.com` may serve as a redirect. Domain purchase, DNS, repository visibility, and Pages activation are account-level operations and are not performed by the source code.

## Repository map

- [`PROJECT.md`](PROJECT.md) — artistic specification;
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — technical architecture;
- [`HYBRID-WEBLLM.md`](HYBRID-WEBLLM.md) — divided procedural/model agency;
- [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md) — implementation plan;
- [`PROTOTYPE.md`](PROTOTYPE.md) — acceptance record;
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — hosting and domains;
- [`PAPER-1.md`](PAPER-1.md) — journal-first paper plan;
- [`docs/GENEALOGY.md`](docs/GENEALOGY.md) — art, HCI, political, technical, browser, and implementation genealogy;
- [`docs/GENEALOGY-AUDIT.md`](docs/GENEALOGY-AUDIT.md) — verification protocol, corrections, exclusions, and claim controls;
- [`REFERENCES.md`](REFERENCES.md) — compact verified reference index;
- [`STATUS.md`](STATUS.md) — current state;
- [`CHANGELOG.md`](CHANGELOG.md) — release history;
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution policy;
- [`SECURITY.md`](SECURITY.md) — security reporting;
- [`prototype/`](prototype/) — artwork.

## Research and publication

The first planned article is journal-first and practice-led:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

It centres exploration, refreshing, contingent uniqueness, ephemerality, relation without property, local bespoke AI, and computational individualisation outside surveillance-based personalisation.

The genealogy establishes that TSDNE should not make component-level priority claims. Its defensible contribution is the realised synthesis of irreversible encounter, non-exclusive executable transfer, bounded local AI, non-profiling, and refusal of proprietary scarcity.

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff).

## Author

Tomas Laurenzo — artist, academic, musician, and computer scientist.
