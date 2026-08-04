# Architecture

## 1. Status

This document distinguishes:

- **implemented alpha architecture**;
- **validated limitations**;
- **later research architecture**.

The current source does not implement a general typed AST, arbitrary topology, graph rewiring, or unrestricted shader synthesis. Earlier documents described those elements prospectively and were incorrectly read as implementation records.

## 2. Implemented representation

Each candidate contains a serialisable object with:

- schema and generator version;
- one of twelve authored shader families;
- a 128-bit seed;
- twelve bounded scalar traits;
- a cosine-palette record.

The source retains the historical names `createGraph`, `compileGraph`, and `graph` for API and export compatibility. The more accurate description is **bounded family program**.

Changing family selects a different authored GLSL template. Changing traits alters scale, tempo, density, turbulence, contrast, palette phase, complexity, rotation, symmetry, softness, drift, and depth within the selected family.

## 3. Implemented pipeline

### 3.1 Seed

`crypto.getRandomValues()` produces four unsigned 32-bit words. The seed identifies the candidate and initialises deterministic `xoshiro128**` sampling.

The birthday-bound probability of an exact 128-bit collision is negligible at realistic scale. This says nothing about perceptual similarity.

### 3.2 Candidate generation

A candidate is constructed by:

1. selecting a family;
2. sampling bounded traits;
3. sampling a palette;
4. emitting GLSL ES 3.00 from the family template;
5. calculating a structural vector and source signature.

### 3.3 Cost gate

Each family has an authored cost estimate. Candidate complexity adds a bounded cost contribution. Candidates above the current threshold are rejected before rendering.

This is a coarse estimate, not instruction counting or measured GPU time.

### 3.4 Sparse rendered descriptor

Three fixed temporal samples at `0.73`, `2.11`, and `4.47` seconds are rendered at `64 × 64` pixels. They supply:

- luminance mean and variance;
- edge energy;
- colour histograms;
- saturation;
- average temporal difference;
- maximum pointwise temporal difference;
- spatial difference hashes.

These samples describe broad appearance and motion. They are not used as a high-frequency flashing test.

### 3.5 Dense luminance-change screen

Candidates that pass the broad descriptor are sampled separately at 60 samples per second for 1.25 seconds at `24 × 24` pixels.

The screen estimates the proportion of pixels undergoing a large luminance transition between consecutive frames. It rejects a sequence when three or more substantial large-area transitions occur in a rolling one-second window.

Limitations:

- it is screen-level and low-resolution;
- it is a conservative heuristic rather than a clinical test;
- it does not implement the complete Harding Flash and Pattern Analyser;
- it does not establish WCAG certification;
- it requires external validation before release.

### 3.6 Recent-similarity gate

Accepted candidates are compared with a bounded local encounter trace using:

- rendered descriptor distance;
- histogram distance;
- spatial-hash distance;
- family and trait vector distance.

A candidate is rejected only when the combined measure falls below a local threshold. The threshold is empirical and requires visual calibration.

### 3.7 Candidate selection

The alpha seeks up to four valid candidates within a maximum of 72 attempts. It selects among valid candidates using:

- distance from recent encounters;
- a small penalty for families heavily represented in local history.

This is not a universal beauty score, Pareto optimiser, or learned taste model. It is a modest anti-repetition and coverage mechanism.

### 3.8 Encounter trace

The browser stores a bounded record containing:

- encounter identifier and date;
- family and origin;
- source/program signature;
- structural vector;
- compact rendered descriptor;
- model and mutation provenance where applicable.

IndexedDB is preferred; localStorage is a limited fallback. The trace is local, clearable, and not interpreted as preference.

### 3.9 Rendering

The chosen GLSL ES 3.00 fragment shader runs in WebGL2 with a fixed uniform contract:

- `u_resolution`;
- `u_time`;
- `u_motion`;
- `u_intensity`.

The first alpha uses single-pass rendering and authored helper functions.

### 3.10 Export

The same accepted source and program record feed:

- raw GLSL;
- encounter JSON;
- standalone WebGL HTML;
- Three.js adaptation;
- ShaderToy adaptation;
- ISF adaptation.

Generated adapters remain claims until executed in their target hosts.

## 4. Optional local-model path

### 4.1 Consent and loading

Local AI is off by default. A visitor who enables it opts into:

- a pinned `@mlc-ai/web-llm` runtime fetched from `esm.run`;
- external model-file downloads;
- WebGPU inference;
- local caching controlled by browser and runtime behaviour.

### 4.2 Proposal vocabulary

The current model schema permits:

- bounded changes to twelve traits;
- an optional change to one of the twelve families;
- a short stated intention.

It does not permit:

- arbitrary node insertion;
- graph rewiring;
- unrestricted GLSL;
- new family definition;
- arbitrary topology;
- direct acceptance of its own proposal.

### 4.3 Validation and provenance

A proposal must contain:

- at least two material trait changes; or
- a valid family change.

Empty proposals are rejected. The system does not insert an authored fallback and label it as a model action.

An accepted mutation records:

- proposer type;
- model identifier;
- source and target family;
- active traits;
- normalised changes;
- intention;
- parent encounter;
- runtime version.

The candidate then passes the same cost, rendering, descriptor, dense luminance, and recent-similarity gates as a procedural candidate.

### 4.4 Comparative baselines

The source implements:

- a matched random mutation baseline;
- an authored continuity baseline.

They support a future comparison among:

- model proposal;
- random proposal;
- authored heuristic;
- unmutated procedural generation.

No model advantage is assumed before that study.

## 5. External dependencies and trust boundary

The baseline procedural work is static and has no installed runtime package dependency.

When local AI is enabled, it relies on remotely served code and model artefacts. Exact version pinning reduces accidental drift but does not provide Subresource Integrity for dynamic module imports and does not eliminate supply-chain risk.

Before durable release, evaluate:

1. vendoring the WebLLM runtime;
2. building a local bundle;
3. publishing hashes and an asset manifest;
4. self-hosting model artefacts where licensing permits;
5. maintaining an explicit external-request inventory.

`npm audit` does not inspect remotely imported runtime code and must not be cited as evidence that this path has no dependency risk.

## 6. Cross-device originality

A static client can provide:

- highly reliable computational identifiers;
- deterministic regeneration from source materials;
- local session and browser non-repetition;
- statistical diversity across a large sampled space.

It cannot provide:

- a global allocation history;
- proof that no other device generated the same seed;
- proof that no perceptually similar image exists;
- a universal scarcity claim.

Accurate formulation:

> TSDNE generates computationally identified candidates and reduces recent structural and perceptual repetition within a bounded local context. It does not guarantee global visual uniqueness.

## 7. Performance risks introduced by remediation

The revised alpha performs more validation than the audited snapshot:

- it seeks four valid candidates rather than the first valid candidate;
- it performs dense temporal screening after broad validation.

These changes may increase first-encounter and replacement latency. Real-device measurement is mandatory. If latency damages the encounter, the design must be revised rather than hidden.

Possible responses include:

- smaller candidate batches;
- background precomputation;
- family-specific dense-screen exemptions justified by static analysis;
- worker-based validation;
- progressive validation with conservative family limits.

## 8. Later structural-synthesis research

A later version may implement a typed program grammar with nodes for:

- coordinate domains and transformations;
- fields and pattern generators;
- signed-distance primitives;
- warps;
- masks;
- temporal operators;
- palettes;
- compositors;
- post-processing.

Such nodes would declare:

- input and output types;
- admissible connections;
- numerical constraints;
- cost estimates;
- export compatibility;
- semantic roles.

Only after this representation exists may documentation claim operations such as insertion, removal, replacement, rewiring, duplication, or typed recombination.

This path is optional. The artwork’s withdrawal structure does not depend on implementing it.

## 9. Validation gates

Before public release:

- run the complete test suite on the integrated repository;
- render at least 200 encounters;
- measure candidate-generation latency;
- test dense-screen false positives and false negatives with synthetic sequences and real families;
- inspect every family visually;
- execute every export target;
- test WebGL2 and optional WebGPU failure paths;
- test external-request disclosures against actual network logs;
- perform browser, mobile, accessibility, and security review.
