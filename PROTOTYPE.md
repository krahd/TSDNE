# Alpha prototype milestone

**Goal:** deliver the first fully implemented, self-contained, working TSDNE alpha.

## Acceptance criteria

The alpha is complete when it provides:

- an immediate full-screen procedural shader;
- `another`, `use this shader`, and `about`;
- cryptographically seeded client-side generation;
- a typed, serialisable shader graph;
- compilation and coarse visual-quality validation;
- bounded local non-repetition;
- automatic progressive loading of Qwen2.5 0.5B through WebLLM when WebGPU and data policy permit;
- a subtle readiness invitation rather than a blocking loading screen;
- one controlled, slow in-place model mutation after sufficient dwell, with an option to invite it sooner by clicking the readiness indicator;
- later mixed procedural and model-mutated encounters through background prefetching;
- complete procedural fallback when WebLLM cannot load;
- an exportable encounter record containing source, graph, seed, lineage, and a non-property/free-use statement;
- no account, server, behavioural profile, paid inference, database, or global registry;
- static-host compatibility and a GitHub Pages workflow;
- professional public-facing project documentation.

## Implemented in this milestone

The alpha implements the acceptance criteria above in `prototype/`.

The local model proposes a restrained vector of changes to eight typed traits: scale, tempo, density, turbulence, contrast, palette, complexity, and rotation. Deterministic code validates, bounds, compiles, renders, evaluates, and either accepts or rejects the proposed mutation.

The first encounter never waits for the model. After the local model becomes ready, the small indicator in the upper-right corner becomes an invitation. The visitor may click it to invite the mutation immediately. Otherwise, after twelve seconds of dwell, the first shader may slowly awaken through a seven-second crossfade. Later hybrid candidates are prepared in the background and used by `another` when available.

## Validation still required before public release

- test the complete cold model download on Chrome, Edge, and other WebGPU-capable browsers;
- test cached initialisation;
- test representative macOS, Windows, Android, and iOS devices;
- determine current Safari/WebGPU/WebLLM behaviour;
- assess download size, memory, latency, energy, and failure modes;
- conduct photosensitive-seizure and reduced-motion review;
- curate and expand the visual families;
- verify generated exports in standalone WebGL hosts;
- finalise the public-domain/free-software licence;
- enable Pages and configure the canonical domain.
