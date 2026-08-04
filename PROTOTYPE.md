# Release-candidate implementation record

**Goal:** deliver a bounded, self-contained, open-source TSDNE artwork that is complete without remote services and meaningfully incorporates optional local AI.

## Implemented acceptance criteria

- immediate full-screen procedural encounter;
- twelve typed visual families;
- cryptographically seeded, deterministic graph and GLSL generation;
- client-side WebGL compilation and cost limits;
- three-frame perceptual descriptors;
- structural and visual nearest-history comparison;
- IndexedDB history with local clearing;
- family-specific quality thresholds and flash-risk rejection;
- non-blocking Qwen2.5 0.5B WebLLM integration;
- selectable SmolLM2 360M and Llama 3.2 1B comparison models;
- model loading, inference timeout, retry, interruption, memory, HTTPS, WebGPU, and data-saver handling;
- subtle readiness invitation and one optional in-place awakening;
- later prefetched hybrid candidates;
- complete procedural fallback;
- pause, reduced motion, reduced intensity, keyboard controls, live announcements, and visible focus;
- raw GLSL, encounter JSON, standalone WebGL, Three.js, ShaderToy, and ISF exports;
- GPL application licence and CC0 generated-shader dedication;
- privacy, accessibility, contribution, security, citation, release, CI, and Pages files;
- local timing instrumentation without analytics or upload.

## Automated verification

- all JavaScript modules pass `node --check`;
- ten unit tests pass;
- all twelve families produce deterministic GLSL;
- generated mutations remain bounded and preserve lineage;
- identical descriptors are detected as similar;
- flat/static visual data is rejected;
- every promised export format is generated;
- `npm audit` reports no vulnerabilities because the project has no installed runtime dependencies.

## Environment limitation

The execution environment used for this implementation blocks local browser navigation and does not provide a usable GPU browser context. It therefore could not complete visual WebGL/WebGPU or model-download validation. This is an environmental validation limitation, not pending source implementation.

## Manual release validation

Before public announcement, run the release candidate on representative hardware and record:

- WebGL rendering in Chrome, Edge, Firefox, and Safari;
- one cold and one cached WebLLM load;
- one in-place awakening and one prefetched hybrid encounter;
- model JSON compliance and fallback behaviour;
- exported standalone files;
- reduced-motion and pause behaviour;
- flash analysis with an appropriate external tool;
- mobile memory and orientation behaviour.

Any resulting defects should be fixed before the repository is made public.
