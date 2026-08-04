# This Shader Does Not Exist

*This Shader Does Not Exist* (**TSDNE**) is an open-source browser artwork structured around a simple decision: remain with one generated shader, relinquish it for another without the possibility of return through the interface, or take its executable source elsewhere.

The central gesture is:

> **one object, no return, take the source**

The work is not presented as a technical first. Browser-native shader generation, local inference, shader export, evolutionary variation, and “This X Does Not Exist” interfaces all have substantial precedents. TSDNE instead asks what happens when computational abundance is organised through withdrawal, non-retrieval, and non-exclusive transfer.

The title is deliberately false. Unlike the synthetic-image genre it cites, the shader exists as a running, inspectable, and transferable process.

## Status

**Alpha implementation.** The source, automated tests, documentation, and deployment workflow are present. Systematic visual curation, representative-device testing, accessibility review, export validation, local-model benchmarking, public deployment, and encounter studies remain incomplete.

No paper should describe visitor attachment, regret, stopping behaviour, or the superiority of model-generated mutations as established findings before those claims are studied.

## Encounter

- **another** withdraws the current shader from the interface and generates a new encounter;
- **use this shader** exports the exact source, program record, seed, lineage, and integration formats;
- **pause** controls motion;
- **about** exposes storage, network, accessibility, model, licensing, and performance conditions.

The interface has no catalogue, retrieval history, ranking, public gallery, marketplace, token, or ownership certificate.

“Gone” means **unavailable through TSDNE’s interface**, not erased from every computational substrate. A deterministic program may remain reproducible, and a visitor may preserve an encounter by exporting it.

## Implemented system

The current alpha uses a **bounded family program**, not a general typed shader AST.

1. A cryptographically strong 128-bit seed selects one of twelve authored GLSL families and a bounded trait vector.
2. Four technically valid candidates are sought locally.
3. Sparse temporal descriptors assess luminance, variance, colour, motion, and recent similarity.
4. A separate dense temporal screen samples consecutive frames to detect repeated large-area luminance changes.
5. Selection favours distance from recent local encounters and underrepresented families.
6. The chosen program is compiled and rendered with WebGL2.

The internal `graph` API name is retained for compatibility with existing exports, but the current representation is a family identifier, scalar traits, and a palette. Structural AST synthesis remains a later research direction.

## Optional local model

Local AI is **off by default**. Enabling it opts into:

- a pinned WebLLM runtime fetched from `esm.run`;
- external model-file downloads;
- WebGPU execution on the visitor’s device.

The model may propose at least two material trait changes or a change of shader family. The deterministic system validates the proposal and may reject it. Empty or ineffective proposals are not silently repaired or attributed to the model.

Random and authored comparison baselines are implemented. TSDNE does not claim that local-model proposals are more interesting, more personal, or aesthetically better without comparative evidence.

## Local trace and non-repetition

A bounded, clearable local encounter trace stores identifiers, family information, structural vectors, and compact rendered descriptors in IndexedDB, with a limited fallback in local storage. It records what this browser was shown so that immediate repetition can be reduced.

This is a behavioural trace in the minimal descriptive sense. The project’s defensible guarantee is narrower: it is not uploaded, shared across sites, attached to an identity, or interpreted as preference or taste.

The interface remembers computationally while refusing visitor retrieval. This relation should be read alongside established work on digital memory, storage, regeneration, and materiality rather than claimed as a novel theoretical discovery.

## Visual safety and accessibility

Implemented provisions include:

- pause/play;
- system and manual reduced-motion modes;
- reduced-intensity mode;
- keyboard access, visible focus, semantic controls, and live announcements;
- procedural operation without WebGPU or a model download;
- dense screen-level detection of repeated large-area luminance transitions.

The automated screen is a conservative heuristic. It is not clinical seizure-safety testing, a Harding test, or WCAG certification. External evaluation remains required.

See [`ACCESSIBILITY.md`](ACCESSIBILITY.md).

## Privacy and external requests

TSDNE uses no account, advertising, analytics, cross-site identifier, server-side generation, central prompt archive, or preference model.

The static host receives ordinary page requests. When local AI is enabled, the pinned inference runtime and model files are requested from external hosts. Local execution does not by itself establish offline operation, ethical model provenance, equal access, lower energy consumption, or complete privacy.

See [`PRIVACY.md`](PRIVACY.md) and [`SECURITY.md`](SECURITY.md).

## Circulation and licensing

The authored application and generator are licensed under **GNU GPL 3.0 or later**. This is the project’s substantive free-software commitment.

Generated shader files carry a **CC0 waiver to the extent that waivable rights exist**. This clarifies intended circulation; it is not presented as the sacrifice of a property right that necessarily existed. Encounter records establish correspondence among source, seed, program, and lineage, but confer no ownership, exclusivity, scarcity, or control over later use.

See [`GENERATED-SHADERS-LICENSE.md`](GENERATED-SHADERS-LICENSE.md).

## Exports

Each accepted encounter can produce:

- encounter JSON;
- GLSL ES 3.00;
- a self-contained WebGL page;
- a Three.js adapter;
- a ShaderToy adaptation;
- an ISF adaptation.

These exports still require manual execution testing in their target hosts before release.

## Run locally

```bash
cd prototype
python3 -m http.server 8080
```

Open `http://localhost:8080` in a WebGL2-capable browser. Optional local inference additionally requires WebGPU and a secure context.

## Verify

```bash
npm install
npm run check
npm test
```

Automated tests cover deterministic generation, explicit mutation provenance, rejection of ineffective proposals, random and authored baselines, descriptor comparison, dense luminance-change screening, and export structure. Automated tests do not establish visual quality.

## Research position

The strongest current argument concerns the mismatch between an interface that performs loss and a substrate that remains reproducible:

- withdrawal is real at the level of interface access;
- deletion is not claimed;
- appropriation allows persistence outside the work;
- computational abundance does not automatically produce experiential indifference;
- whether visitors experience attachment, regret, or responsibility remains an empirical question.

“Personal without personalisation” is retained as a question, not a demonstrated result. The work can become personally meaningful without having been fitted to a person, but this property alone does not distinguish TSDNE from ordinary aesthetic experience.

The provisional first-paper direction is:

> **One Object, No Return: Withdrawal, Executable Transfer, and Performed Loss in a Generative Browser Artwork**

The model component is secondary unless an ablation study demonstrates a meaningful difference from random and authored mutation.

## Documentation

- [`docs/PROJECT.md`](docs/PROJECT.md) — artistic specification and claim boundaries;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — implemented architecture and later structural-synthesis path;
- [`docs/HYBRID-WEBLLM.md`](docs/HYBRID-WEBLLM.md) — optional model role and comparison protocol;
- [`docs/GENEALOGY.md`](docs/GENEALOGY.md) — related artistic and technical lineages;
- [`docs/GENEALOGY-VERIFICATION.md`](docs/GENEALOGY-VERIFICATION.md) — source-status and claim register;
- [`docs/CRITICAL-AUDIT-2026-08-04.md`](docs/CRITICAL-AUDIT-2026-08-04.md) — preserved machine-assisted critical reading;
- [`docs/AUDIT-RESPONSE-2026-08-04.md`](docs/AUDIT-RESPONSE-2026-08-04.md) — disposition of its findings against the current code;
- [`docs/AI-USE-STATEMENT.md`](docs/AI-USE-STATEMENT.md) — disclosure and human-accountability protocol;
- [`docs/PAPER-1.md`](docs/PAPER-1.md) — revised publication plan;
- [`docs/REFERENCES.md`](docs/REFERENCES.md) — source index;
- [`STATUS.md`](STATUS.md) — current state and remaining gates.

## Author

Tomas Laurenzo — artist, academic, musician, and computer scientist.
