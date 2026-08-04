# Public release checklist

**Current status:** alpha; no release-candidate claim

## Source and automated verification

- [x] JavaScript syntax checks configured;
- [x] unit tests configured;
- [x] CI workflow present;
- [x] static deployment workflow present;
- [x] explicit mutation-provenance tests;
- [x] synthetic high-frequency luminance-change tests;
- [x] random and authored comparison baselines;
- [x] integrated CI pass confirmed for `0.1.0-alpha.2`;
- [x] all automated failures resolved;
- [ ] network-request inventory generated;
- [ ] remotely loaded WebLLM runtime vendored or supply-chain decision documented;
- [ ] model and dependency licence inventory complete.

## Visual and performance validation

- [ ] render at least 200 encounters on a real GPU;
- [ ] create family-grouped contact sheets;
- [ ] review within-family repetition;
- [ ] review cross-family similarity;
- [ ] remove or revise weak families;
- [ ] measure cold first encounter;
- [ ] measure **another** latency;
- [ ] measure dense-screen cost;
- [ ] measure four-candidate selection cost;
- [ ] record representative videos;
- [ ] confirm visual quality in reduced-motion and reduced-intensity modes.

## Browser and device validation

- [ ] Chrome on macOS;
- [ ] Edge on macOS or Windows;
- [ ] Firefox procedural mode;
- [ ] Safari on macOS;
- [ ] Safari on iOS;
- [ ] Chrome on Android;
- [ ] representative integrated-GPU laptop;
- [ ] low-memory device;
- [ ] WebGPU-unavailable fallback;
- [ ] WebGL context loss and recovery;
- [ ] clean first visit;
- [ ] cached return visit;
- [ ] private-browsing behaviour documented.

## Optional local-model validation

- [ ] explicit opt-in confirmed on a clean browser profile;
- [ ] runtime-host request confirmed;
- [ ] model-host requests confirmed;
- [ ] cold model download measured;
- [ ] cached model load measured;
- [ ] failure, interruption, timeout, and memory paths tested;
- [ ] empty proposals rejected in a real-browser model session;
- [ ] provenance records inspected in a real-browser model session;
- [ ] model, random, and authored baselines compared if model claims remain in scope;
- [ ] decision made: public, research-only, or removed.

## Accessibility and visual safety

- [ ] keyboard-only review;
- [ ] VoiceOver review;
- [ ] second screen-reader review;
- [ ] focus order and dialog review;
- [ ] mobile touch-target review;
- [ ] reduced-motion review in major browsers;
- [ ] pre-exposure guidance implemented;
- [ ] external photosensitive-content analysis;
- [ ] common refresh-rate and full-screen testing;
- [ ] limitations visible in deployed interface.

## Export validation

- [ ] raw GLSL executed under documented uniform contract;
- [ ] standalone WebGL HTML opened cleanly;
- [ ] Three.js adapter executed;
- [ ] ShaderToy adaptation executed;
- [ ] ISF adaptation executed;
- [ ] encounter JSON round-trip tested;
- [x] licences and provenance included accurately in generated structures;
- [ ] unsupported target-host features documented after execution tests.

## Documentation reconciliation

- [x] README status changed to alpha;
- [x] bounded family program distinguished from typed AST;
- [x] audit response added;
- [x] AI-use statement added;
- [x] bibliography corrections recorded;
- [x] privacy and accessibility pages aligned with source;
- [x] all current Markdown checked against the final source structure;
- [x] all public HTML checked against the final source structure;
- [ ] central references read in full by the author;
- [ ] final publication prose rewritten in authorial voice;
- [ ] current model artefacts, licences, and runtime behaviour rechecked in a real browser;
- [x] no stale release-candidate claim remains outside preserved audit and historical records.

## Staging and release

- [ ] deploy to staging;
- [ ] run desktop and mobile smoke tests;
- [ ] inspect actual network traffic;
- [ ] test storage-clearing controls;
- [ ] preserve a staging capture and environment record;
- [ ] choose public-repository strategy;
- [ ] enable production hosting;
- [ ] choose and purchase canonical domain if desired;
- [ ] configure DNS and HTTPS;
- [ ] publish privacy, accessibility, licence, and source links;
- [ ] tag only after all release-candidate gates in `docs/PROTOTYPE.md` are met.
