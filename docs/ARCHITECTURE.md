# Revised architecture

## Principle

Every software component must support the encounter rather than turning TSDNE into an interactive shader-design environment.

The architecture is fully local and static-hostable. It has no inference API, model host, account system, database server, analytics service, or external runtime dependency.

## Pipeline

```text
cryptographic seed
      ↓
authored procedural graph
      ↓
complexity enrichment
      ↓
GLSL source
      ↓
WebGL2 compile and temporal rendering
      ↓
quality and safety screening
      ↓
perceptual descriptor
      ↓
novelty-and-complexity tournament
      ↓
one displayed shader
      ├── active reconstructive state in memory
      └── non-reconstructive local perceptual trace
```

## Authored procedural grammar

The generator contains several macro-families. Each family maps a deterministic trait vector and palette to a complete fragment shader.

The generator is not claimed as a technically unprecedented shader system. Its responsibilities are:

- produce materially different dynamic visual structures;
- expose sufficient internal variation for perceptual separation;
- remain comprehensible and maintainable;
- compile reliably on WebGL2;
- support deterministic reconstruction;
- permit code export;
- remain independent from remote services.

A complexity-enrichment layer biases candidates towards articulated structures while preserving silence, darkness, asymmetry, and sparse regions. Complexity is not defined as maximal motion, maximal density, or maximal GPU cost.

## Candidate pool

The system creates a small pool of locally generated candidates. Each candidate is compiled and rendered at fixed temporal samples.

Initial display uses a smaller pool to preserve acceptable startup time. Later encounters are prefetched from a larger pool in the background.

The visitor never sees the pool. It is not a catalogue.

## Quality screening

Candidates may be rejected for:

- shader compilation failure;
- excessive estimated computational cost;
- near-black or near-white output;
- insufficient variance;
- negligible temporal development, unless reduced motion is active;
- excessive saturation;
- repeated large-area luminance changes;
- runtime or context failure.

These checks establish admissibility, not beauty.

## Perceptual descriptors

The browser samples several low-resolution frames and calculates compact descriptors including:

- mean luminance;
- luminance variance;
- coarse luminance histogram;
- coarse RGB histograms;
- edge magnitude;
- saturation ratio;
- temporal frame difference;
- coarse spatial perceptual hash.

The descriptors are lossy and deliberately non-reconstructive.

## Novelty selection

For each valid candidate, the system estimates:

- minimum perceptual distance from recent local traces;
- visual complexity and articulation;
- recent macro-family separation.

A maximin-style tournament favours candidates that are distant from the closest prior encounter while still satisfying quality and complexity constraints.

The first four encounters weight novelty and family separation especially strongly. This addresses the critical first-impression failure in which repeated similar outputs make the project appear shallow.

The algorithm is related to novelty search and quality-diversity methods, but it is used here as invisible sequence-level quality control rather than as an interactive exploration interface.

## Anti-repetition memory

IndexedDB stores only:

```text
local random key
display time
broad family label
compact perceptual descriptor
```

It never stores:

```text
seed
source hash
source program
graph
parameter vector
rendered frame
screenshot
video
visitor identity
preference label
```

The database is bounded and old traces are deleted. A localStorage fallback uses the same reduced schema.

A version upgrade deletes the predecessor’s reconstructive encounter records.

## Active state and loss

The current shader necessarily exists in active program memory and in the WebGL context. When **another** is selected, the interface releases the relation to that shader and replaces it.

The system does not claim global erasure. It simply provides no interface route back and does not add reconstructive data to local history.

This distinction is essential:

- interface loss is real as an interaction condition;
- deterministic reproducibility remains technically possible;
- the work does not manufacture scarcity by pretending otherwise.

## Internal provenance

For the active shader, the browser calculates:

- SHA-256 of canonical graph data;
- SHA-256 of GLSL source;
- generator version;
- deterministic seed.

These values remain absent from the normal visual encounter. Their ordinary roles are integrity checking and export support.

No registry exists and no certificate is issued.

## Export

When the visitor deliberately takes the code, TSDNE exports:

- technical manifest JSON;
- raw GLSL fragment shader;
- self-contained WebGL2 page;
- Three.js adapter;
- ShaderToy adapter;
- ISF adapter.

The manifest contains enough technical information to reconstruct the program. It records no owner and states:

- `documentType: technical-manifest-not-certificate`;
- no title is conferred;
- no ownership or exclusivity is conferred;
- no scarcity or uniqueness is claimed.

## Privacy

Privacy follows from the architecture:

- no network request is required after static assets load;
- no model is downloaded;
- no interaction event is transmitted;
- no identity is created;
- no preference is inferred;
- no cross-session behavioural model is constructed;
- the local anti-repetition memory can be cleared.

## Preservation

The artwork consists of standard HTML, CSS, JavaScript, WebGL2, and authored source. Preservation requires no remote model repository, API key, checkpoint format, inference runtime, or vendor service.

A release should archive:

- source tree;
- generator version;
- test suite;
- build-free static site;
- browser compatibility record;
- sample exports;
- video documentation;
- written conceptual specification.
