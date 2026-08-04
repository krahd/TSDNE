# This Shader Does Not Exist

*This Shader Does Not Exist* (**TSDNE**) is an open-source browser artwork about exploration, ephemerality, computational abundance, personal relation without ownership, and individualisation without surveillance.

The work presents one full-screen animated shader at a time. A visitor may remain with it, relinquish it for **another**, or choose **use this shader** and carry its reusable executable source elsewhere.

> The shader becomes personal through encounter, not through profiling; it may be singular without becoming scarce or privately owned.

## Status

**Release candidate implemented.** The static application, tests, documentation, CI, and GitHub Pages workflow are present. Hardware, browser, aesthetic, accessibility, export, and public-deployment validation remain.

## Experience

- **another** relinquishes the current shader without revealing the next;
- **use this shader** exports source, graph, seed, lineage, visual record, and integration formats;
- **pause** stops or resumes motion;
- **about** exposes privacy, accessibility, local-AI, model, history, and performance controls.

The first shader appears immediately through procedural generation. On capable devices, an optional local WebLLM model loads in the background and may propose a bounded mutation. The model never blocks the complete procedural work.

## Architecture

1. Generate a cryptographically strong 128-bit seed.
2. Construct a typed, serialisable shader graph.
3. Select from twelve authored visual families.
4. Emit conservative GLSL ES 3.00.
5. Compile and render locally with WebGL2.
6. Sample temporal frames and compute visual descriptors.
7. Reject blank, flat, static, excessively bright, expensive, repetitive, or high-flash candidates.
8. Compare structural and visual signatures with bounded local history.
9. Optionally request a constrained local-model mutation.
10. Validate, compile, render, evaluate, and accept or reject deterministically.

The AI is consequential but not sovereign: it proposes; authored procedural and validation systems determine what may become visible.

## Memory and relinquishment

The bounded local history is not merely a repetition filter. The interface refuses retrieval, while compact local signatures reduce the probability of an immediate perceptual return.

> The system remembers so that the encounter can forget.

This local memory is bounded, clearable, and not uploaded. It is not used to infer identity or taste.

## Privacy

TSDNE uses no account, analytics, advertising, behavioural profile, cross-site identifier, project database, or server-side inference. Model artefacts and static files may still be requested from external infrastructure and cached by the browser. Local execution does not by itself establish offline operation, complete privacy, ethical provenance, equal access, or lower energy use.

See [`PRIVACY.md`](PRIVACY.md).

## Uniqueness

TSDNE distinguishes:

- **computational identity:** seed, graph, generator version, and source;
- **perceptual identity:** contingent visual and temporal resemblance;
- **encounter identity:** a visitor’s relation to a shader at a particular moment.

The system reduces recent structural and perceptual repetition locally. It does not claim absolute global visual uniqueness.

## Accessibility and visual safety

Implemented provisions include pause/play, reduced-motion and reduced-intensity modes, keyboard controls, semantic dialogs, visible focus, live announcements, complete procedural fallback, and candidate rejection for extreme temporal change and high flash ratios. The work does not claim clinical seizure safety.

See [`ACCESSIBILITY.md`](ACCESSIBILITY.md).

## Exports and circulation

Each encounter can produce:

- encounter JSON;
- raw GLSL ES 3.00;
- self-contained WebGL HTML;
- a Three.js adapter;
- a ShaderToy version;
- an ISF version.

The application is licensed under **GNU GPL 3.0 or later**. To the extent possible under law, generated shader outputs are dedicated under **CC0 1.0**. Encounter records confer no ownership, exclusivity, scarcity, or control over later use.

See [`GENERATED-SHADERS-LICENSE.md`](GENERATED-SHADERS-LICENSE.md).

## Run locally

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

## Repository map

- [`docs/PROJECT.md`](docs/PROJECT.md) — artistic specification;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — technical architecture;
- [`docs/HYBRID-WEBLLM.md`](docs/HYBRID-WEBLLM.md) — procedural/model division of agency;
- [`docs/IMPLEMENTATION-ROADMAP.md`](docs/IMPLEMENTATION-ROADMAP.md) — implementation plan;
- [`docs/IMPLEMENTATION-ALTERNATIVES.md`](docs/IMPLEMENTATION-ALTERNATIVES.md) — architectures considered;
- [`docs/PROTOTYPE.md`](docs/PROTOTYPE.md) — acceptance record;
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — hosting and domains;
- [`docs/RESEARCH-PLAN.md`](docs/RESEARCH-PLAN.md) — research programme;
- [`docs/PAPER-1.md`](docs/PAPER-1.md) — journal-first paper plan;
- [`docs/GENEALOGY.md`](docs/GENEALOGY.md) — artistic, technical, HCI, political, and browser genealogy;
- [`docs/GENEALOGY-VERIFICATION.md`](docs/GENEALOGY-VERIFICATION.md) — corrections, source status, and claim register;
- [`docs/REFERENCES.md`](docs/REFERENCES.md) — verified source index;
- [`STATUS.md`](STATUS.md) — current state;
- [`CHANGELOG.md`](CHANGELOG.md) — release history;
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution policy;
- [`SECURITY.md`](SECURITY.md) — security reporting;
- [`prototype/`](prototype/) — artwork.

## Research position

TSDNE should not be presented as the first generative artwork, browser artwork, shader-sharing system, evolutionary shader system, LLM shader generator, local-inference artwork, or “This X Does Not Exist” interface.

Its argument is not that a unique conjunction was absent from the literature. Each constraint is a motivated refusal directed at a counter-model: the archive, comparison grid, behavioural profile, cloud-model service, image-only output, and proprietary scarcity. The contribution is the coherence of those refusals in a realised work.

The first planned article is:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff).

## Author

Tomas Laurenzo — artist, academic, musician, and computer scientist.
