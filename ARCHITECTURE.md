# Recommended architecture

## Decision

The recommended production architecture is a **client-side typed procedural synthesiser with novelty search**, progressively augmented by optional local machine learning.

It is selected because it can be fast, deterministic, portable, aesthetically controlled, and free to operate. It avoids a large mandatory model download and does not make the artwork dependent on WebGPU availability or the ability of a small language model to emit valid, compelling GLSL.

## Pipeline

### 1. Seed

Generate at least 128 bits with `crypto.getRandomValues()`. The seed determines the structural program and parameters. It is encoded into the encounter identifier and export package.

A random 128-bit seed makes exact seed collision negligible in realistic use. At one billion encounters, the approximate birthday-bound probability is about `1.47 × 10^-21`. This does not guarantee perceptual uniqueness because different seeds may map to similar images.

### 2. Typed intermediate representation

Generate an AST or graph rather than concatenating arbitrary source. Nodes declare:

- input and output types;
- coordinate domain;
- admissible parents and children;
- numerical stability conditions;
- estimated cost;
- export compatibility;
- semantic tags such as warp, field, mask, palette, SDF, pattern, or compositor.

The representation should make invalid programs difficult or impossible to express.

### 3. Structural synthesis

Choose a visual family, depth, and topology. Sample compatible primitives and parameters under family-specific constraints. Apply mutation and recombination only at typed boundaries.

### 4. Source generation

Transpile the graph to a conservative WebGL2 / GLSL ES 3.00 fragment shader. Use a fixed uniform contract:

- `u_resolution`;
- `u_time`;
- optional `u_pointer`;
- optional textures declared explicitly.

The first release should avoid multi-pass rendering and implementation-defined behaviour.

### 5. Validation

Compile in an isolated WebGL context. Reject candidates that:

- fail compilation or linking;
- exceed a time or instruction-complexity estimate;
- produce NaN or invalid output;
- render almost entirely black, white, or one colour;
- remain effectively static when motion is required;
- flash or change luminance at unsafe rates;
- fall below minimum contrast and structure thresholds;
- exceed the target frame budget.

### 6. Candidate search

Generate a small batch—initially 8–32 candidates—and score them locally. The score should be plural rather than a single learned taste value:

- validity and performance;
- luminance variance;
- colour-distribution balance;
- edge and spatial-frequency structure;
- temporal difference and motion rhythm;
- distance from recent outputs;
- family coverage;
- penalties for trivial symmetry, excessive noise, clipping, or common failure motifs.

Use Pareto selection or family-specific thresholds rather than one universal beauty score.

### 7. Repetition control

Store compact local signatures in IndexedDB:

- seed and structural signature;
- family and graph fingerprint;
- perceptual hashes from several time samples;
- colour histograms;
- temporal descriptors;
- optional small image embeddings.

Reject candidates too close to recent local history. A bounded cache is sufficient.

### 8. Encounter

Display the selected shader full-screen. The visitor's actions are limited to **another**, **use this shader**, **about**, full-screen, and accessibility controls.

### 9. Export

Transpile the same AST into verified targets rather than asking an LLM to explain integration:

- raw GLSL ES 3.00;
- self-contained WebGL2 HTML;
- Three.js material;
- ShaderToy-compatible main function where possible;
- ISF document where the shader uses a compatible subset;
- metadata, uniforms, seed, licence, and attribution.

### 10. Optional local model

A small client-side model may later:

- propose graph mutations;
- classify a requested aesthetic region;
- generate a constrained JSON graph under a schema;
- name or describe a shader;
- repair a graph using compiler feedback.

It should not be required for baseline generation. The model should produce a DSL/AST, not unrestricted source.

## Cross-device originality

### What can be achieved without a backend

- negligibly probable exact seed collision;
- deterministic code generation from a seed and generator version;
- enormous structural and parameter space;
- balanced sampling across visual families;
- local non-repetition per browser installation;
- avoidance of immediate repetition within one session;
- public reproducibility when a user deliberately shares a seed or export.

### What cannot be guaranteed

A static site has no shared memory. Two disconnected devices cannot know what the other has generated. Therefore it cannot guarantee that no other device has produced the same seed, structure, or perceptually similar image.

A true global guarantee requires a shared registry, an allocation authority, or a globally synchronised ledger. All introduce infrastructure, privacy, availability, and governance costs. TSDNE should use the accurate formulation:

> The system generates from a vast seeded design space and actively minimises structural and perceptual repetition locally and statistically; it does not claim absolute global uniqueness.

## Compatibility strategy

- **Primary renderer:** WebGL2, because it is widely deployed and sufficient for the artwork.
- **Optional acceleration:** WebGPU for model inference or candidate analysis, never required.
- **Fallback:** curated WebGL1-compatible family or a pre-rendered still/video on unsupported devices.
- **Background work:** Web Workers and OffscreenCanvas where supported, with a main-thread fallback.
- **Storage:** IndexedDB for signatures; localStorage only for small preferences and current encounter metadata.
- **Hosting:** static HTTPS deployment.
