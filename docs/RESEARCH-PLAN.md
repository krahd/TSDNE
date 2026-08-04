# Research plan

## Research programme

TSDNE supports a research programme with three linked but separable strands.

## A. Browser-native code generation

### Question

How can a browser synthesise aesthetically compelling, executable shader programs under strict validity, latency, compatibility, and zero-cost constraints?

### Comparative study

Implement at least four generators behind the same typed representation and renderer:

1. random typed grammar;
2. graph mutation and recombination;
3. novelty search over procedural candidates;
4. local browser model generating constrained ASTs.

Optional fifth condition: local code model generating raw GLSL.

### Measures

- initial download size;
- cold and warm start time;
- candidate generation latency;
- compile and link success;
- runtime frame time;
- device memory and failures;
- device and browser coverage;
- structural diversity;
- perceptual distance across temporal samples;
- human aesthetic judgements;
- human estimates of repetition;
- energy use where measurable;
- export portability.

### Contribution

The paper should not be organised around proving that browser shader synthesis is unprecedented. Its contribution can be a rigorous comparison of how technical architectures shape visual possibility, access, material cost, and artistic experience.

## B. Perceptual non-repetition

### Question

What does it mean for two dynamic shaders to be the same or different?

### Descriptor families

- graph and AST fingerprints;
- source-token or tree-edit distance;
- DCT or wavelet perceptual hashes on sampled frames;
- colour and luminance histograms;
- edge orientation and spatial-frequency spectra;
- optical-flow or temporal-difference descriptors;
- symmetry and repetition estimates;
- lightweight image embeddings;
- human pairwise similarity judgements.

### Experiment

Construct a controlled dataset of generated shaders with known relationships:

- identical code and seed;
- same graph, different parameters;
- same family, different structure;
- different family with similar visual output;
- visually similar sampled frames but different motion;
- different output across GPU precision and browser implementations.

Compare descriptor agreement and identify which combinations best predict human judgements without collapsing diversity.

## C. The poetics of refreshing

### Questions

- Does the statement that a shader may not return change viewing duration?
- What predicts a decision to keep or relinquish a shader?
- Does exportability change attachment?
- Do visitors regret refreshing?
- Does a visible history weaken the work?
- How does perceived abundance affect standards of acceptance?

### Possible study

With explicit consent, compare interface conditions:

- reversible gallery versus irreversible another;
- export available versus unavailable;
- uniqueness statement versus no statement;
- immediate next shader versus a short delay;
- current encounter only versus a small visible history.

Primary outcomes: dwell, refresh count, claim rate, return, reported attachment, regret, and interpretation. The public artwork does not need to collect this data; a separate study deployment can.

## Development experiments

### Experiment 1: grammar baseline

Build 8–12 visual families and generate 10,000 offline or browser candidates. Measure validity, performance, family coverage, and structural duplication.

### Experiment 2: visual rejection

Test whether cheap browser metrics can remove blank, static, clipped, and trivial output without selecting only high-frequency noise.

### Experiment 3: model comparison

On capable devices, compare SmolLM2 135M, Qwen2.5 0.5B, and Qwen2.5-Coder 0.5B for constrained graph generation and raw GLSL generation. Record model weight, memory, latency, validity, and visual quality. The 135M model is a size baseline, not expected to be a strong shader author.

### Experiment 4: cross-device rendering

Render identical seeds on representative Chrome, Safari, Firefox, desktop, and mobile configurations. Measure pixel, perceptual, and motion differences caused by precision, driver, and implementation.

### Experiment 5: export portability

Test every generated shader against the promised target templates. A target is advertised only after automated and manual compatibility tests.

## Data and ethics

- The generator can operate without analytics.
- Research data collection must be a separate explicit-consent mode.
- Do not use device fingerprinting as a hidden uniqueness mechanism.
- Do not retain browsing identity or cross-site identifiers.
- If claimed shader locations are documented, submission should be voluntary.
- Photosensitive-seizure risk must be addressed before public deployment.

## Publication routes

- Creativity & Cognition;
- CHI Interactive Demos, Late-Breaking Work, or later full paper;
- DIS;
- EvoMUSART;
- ACM Multimedia art/demo tracks;
- ISEA;
- SIGGRAPH Art Papers or Art Gallery;
- Leonardo, Digital Creativity, or JSTA;
- software-studies or artistic-research journals for the ephemerality and transfer argument.
