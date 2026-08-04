# Implementation roadmap

**Status date:** 3 August 2026  
**Scope:** bounded, zero-cost browser artwork with typed procedural generation, optional local WebLLM mutation, local perceptual repetition control, free export, and journal-first documentation.

## Product principle

The first shader must appear immediately. WebLLM must never block the encounter.

The artwork therefore has two overlapping temporal layers:

1. an immediate procedural encounter;
2. a local model that becomes available in the background and begins influencing later candidates.

A blocking loading screen or mandatory progress bar is rejected as the default experience. The artwork may disclose model readiness unobtrusively, but visitors must always be able to view, relinquish, and export shaders while the model is unavailable.

## Performance targets

These are engineering targets to be measured, not current claims.

| Event | Target |
|---|---:|
| First visible procedural shader | under 750 ms on a recent laptop; under 1.5 s on a representative mobile device |
| Interface responsive | under 1 s |
| Cached WebLLM initialisation | under 5 s on a recent laptop |
| First cold-load hybrid candidate on good broadband | under 30 s on a recent laptop |
| One short mutation proposal after model readiness | under 3 s |
| Procedural next candidate | normally under 1 s |
| Hybrid next candidate after readiness | normally under 4 s, with procedural fallback when late |

The initial model candidates are:

- SmolLM2 360M as the smallest serious lower-bound experiment;
- Qwen2.5 0.5B as the current likely smallest-useful model;
- a roughly 1B model only if the smaller candidates fail aesthetically or structurally.

## Concern: visitors may leave before WebLLM is ready

This is a real design issue but does not justify blocking the first encounter.

The project should test three non-blocking strategies:

### Strategy A — later encounters only

The first shader remains procedural. Once the model is ready, WebLLM-proposed candidates enter the pool used by **another**.

- **Advantage:** conceptually clean and technically simple.
- **Risk:** one-visit users may never encounter the model.

### Strategy B — one in-place awakening

The first procedural shader is immediately visible. If the visitor remains and WebLLM becomes ready, the system may apply one validated model-proposed mutation to the current shader through a slow transition.

- **Advantage:** visitors who dwell long enough experience the hybrid without needing to refresh.
- **Risk:** it may weaken the identity of one shader as one encounter or feel like an unsolicited effect.

This strategy should be prototyped, not assumed.

### Strategy C — unobtrusive readiness invitation

The interface remains minimal. When the model becomes available, a subtle status change may indicate that a local AI mutation is ready, or **another** may gain a restrained visual state.

- **Advantage:** preserves agency and may encourage a second encounter.
- **Risk:** makes the AI more visible than the artwork may require.

### Rejected default — blocking progress screen

Do not delay the first image until WebLLM loads.

- cold-load times vary widely;
- model download may exceed the visitor's patience or data budget;
- unsupported devices would receive no artwork;
- the technical apparatus would precede the aesthetic encounter;
- the work could be mistaken for an AI-loading demonstration.

A progress display may exist inside **about**, a research build, or an explicit local-AI diagnostics view.

## Phase 0 — repository and deployment baseline

**Status:** substantially complete.

- [x] Project, architecture, research, paper, and status documents.
- [x] Dependency-free WebGL2 proof of concept.
- [x] Hybrid procedural–WebLLM decision.
- [x] Non-property encounter model.
- [x] Journal-first publication strategy.
- [ ] Choose canonical domain.
- [ ] Configure automated static deployment.
- [ ] Add privacy, accessibility, and browser-support statements.

## Phase 1 — typed shader ontology

**Target:** 20 August 2026.

### Deliverables

- typed graph or AST schema;
- canonical JSON representation;
- cost estimate per node;
- deterministic graph hash;
- first 25–40 composable primitives;
- mutation action schema;
- generator-version contract;
- graph-to-GLSL compiler;
- unit tests for type validity and deterministic output.

### Initial node categories

- coordinate sources and transforms;
- scalar and vector fields;
- noise, cellular, interference, and wave primitives;
- signed-distance primitives;
- domain warps;
- masks and thresholds;
- temporal operators;
- palettes and colour transforms;
- compositors and post-processing.

### Exit criterion

At least 95 per cent of procedurally generated graphs compile without repair, and identical seed plus generator version produces identical canonical graph and source.

## Phase 2 — visual-family library

**Target:** 20–27 August 2026.

### Deliverables

Define 8–12 initial visual families, each with:

- topology rules;
- admissible nodes and mutations;
- parameter distributions;
- cost limits;
- family-specific quality thresholds;
- examples of desirable breadth;
- documented failure motifs.

Candidate families:

1. folded flow;
2. liquid and turbulent fields;
3. interference and moiré systems;
4. cellular drift;
5. polar and tunnel spaces;
6. signed-distance compositions;
7. layered waves and coordinate folds;
8. sparse fields and negative space;
9. granular or particulate motion;
10. slow chromatic topologies;
11. broken or asymmetric symmetry;
12. restrained feedback-like structures using single-pass approximations.

### Exit criterion

Each family produces multiple recognisably different structures rather than palette variations of one template.

## Phase 3 — immediate procedural encounter

**Target:** 31 August 2026.

### Deliverables

- full-screen rendering;
- immediate shader selection;
- **another** with irreversible relinquishment;
- **use this shader** export entry point;
- **about**;
- keyboard and touch operation;
- no visible history;
- procedural candidate generation in a worker where supported;
- pre-generation of the next candidate;
- frame-budget monitoring;
- fallback for unsupported devices.

### Exit criterion

The complete artwork remains meaningful with WebLLM disabled.

## Phase 4 — perceptual rejection and local non-repetition

**Target:** 5 September 2026.

### Deliverables

Sample several small frames at fixed temporal offsets and calculate:

- graph fingerprint;
- structural family and node histogram;
- perceptual hashes;
- colour and luminance distributions;
- edge and spatial-frequency descriptors;
- temporal-frame differences;
- coarse motion and flashing indicators.

Store a bounded local history in IndexedDB. Reject candidates only when several measures agree that they are too close to recent encounters.

### Exit criterion

The system removes obvious duplicate and near-duplicate failures without converging toward one high-frequency aesthetic.

## Phase 5 — WebLLM benchmark laboratory

**Target:** 7 September 2026.

### Models

- SmolLM2 360M quantised;
- Qwen2.5 0.5B quantised;
- one approximately 1B comparison model if device capacity permits.

### Tasks

- parse compact graph summaries;
- produce schema-constrained mutation JSON;
- preserve one named property while changing another;
- simplify graphs;
- produce structural rather than parameter-only changes;
- avoid invalid target paths and unsupported operations.

### Measures

- compressed and transferred size;
- cold download time across representative connections;
- cache persistence;
- initialisation time;
- VRAM and device failure;
- inference latency;
- JSON-schema validity;
- graph-mutation validity;
- structural diversity;
- repetition;
- superficiality versus meaningful change;
- accepted-candidate rate after deterministic evaluation;
- energy use where feasible.

### Exit criterion

Select the smallest model whose accepted mutations provide a perceptible expansion of the procedural system. If none does, preserve the benchmark as research and ship procedural mode while continuing model development.

## Phase 6 — hybrid integration

**Target:** 10 September 2026.

### Deliverables

- lazy WebLLM import;
- Web Worker inference;
- model download and cache policy;
- capability and memory checks;
- structured JSON mode;
- one-retry limit for invalid output;
- procedural timeout fallback;
- mixed candidate pool;
- provenance flag recording procedural and model-influenced generation;
- no personal or behavioural input to the model;
- no model branding in the primary interface.

### Loading policy

1. render procedural shader immediately;
2. begin WebLLM loading after the critical rendering path;
3. precompute procedural candidates continuously;
4. add model-mutated candidates only after readiness;
5. never make **another** wait indefinitely for the model;
6. cache model artefacts for later visits;
7. expose progress only through optional information or research views.

### Design test

Prototype Strategies A, B, and C above. Select the one that best preserves the poetics of one-at-a-time encounter while giving sustained visitors a meaningful chance to experience the model.

## Phase 7 — export and encounter record

**Target:** 12 September 2026.

### Export targets

- raw GLSL ES 3.00;
- self-contained WebGL2 example;
- Three.js shader material;
- ShaderToy-compatible form where possible;
- ISF where the graph uses a compatible subset.

### Encounter record

Include:

- exact source;
- canonical graph;
- seed;
- graph hash;
- generator version;
- compact visual signature;
- model and mutation metadata where applicable;
- encounter identifier;
- optional local date;
- integration instructions;
- free-use, modification, sharing, and non-exclusivity statement.

### Exit criterion

Every advertised target is generated from the canonical graph and passes an automated and manual validation case.

## Phase 8 — accessibility, compatibility, and public alpha

**Target:** 15 September 2026.

### Test matrix

- current Chrome, Firefox, Safari, and Edge;
- macOS, Windows, iOS, and Android;
- recent high-power laptop;
- ordinary integrated-GPU laptop;
- representative phone and tablet;
- WebGPU enabled and unavailable;
- cold and warm model cache;
- constrained network speeds.

### Safety and access

- photosensitive-seizure limits and flashing rejection;
- reduced-motion mode;
- contrast and controls;
- keyboard access;
- explanatory text available independently of animation;
- clear model download and device-resource disclosure;
- no analytics by default;
- no fingerprinting;
- no cross-site identifiers.

### Exit criterion

A public alpha can be deployed without accounts, paid services, server computation, or hidden data collection.

## Phase 9 — domain and release

**Target:** after alpha validation.

- choose and purchase canonical domain;
- configure DNS and HTTPS;
- redirect secondary domain if purchased;
- verify domain ownership with hosting provider;
- add release tag;
- preserve versioned documentation and representative videos;
- publish privacy, free-use, and technical-context statements;
- avoid publishing model weights in the website repository when an external model host can deliver them more efficiently.

## Phase 10 — journal paper

**Begins:** after credible hybrid prototype; proceeds after stable artwork.

- maintain production diary continuously;
- build source ledger;
- draft 1,500–2,000-word argument memorandum;
- document the selected loading/encounter strategy;
- analyse individualisation without profiling and relation without property;
- document model, procedural, visitor, and validator agency;
- record device inequality, energy, provenance, and hidden labour;
- select journal after the work clarifies the strongest argument;
- develop full journal article before redirecting material toward conferences.

## Definition of first release

The first release is complete when:

- a strong shader appears immediately;
- the visitor can relinquish it or take it away;
- procedural generation is structurally broad and aesthetically credible;
- local repetition is reduced without absolute claims;
- a small local model meaningfully influences some encounters on capable devices;
- the work remains complete when the model does not run;
- exports are truthful and free to reuse;
- no account, market, profile, surveillance, or paid infrastructure is required;
- the documentation accurately states the system's limits and political conditions.
