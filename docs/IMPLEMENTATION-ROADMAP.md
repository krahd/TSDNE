# Implementation roadmap

**Status date:** 4 August 2026  
**Current phase:** `0.1.0-alpha.2`  
**Principle:** visual, experiential, and empirical evidence gates later technical expansion

## 1. Current baseline

Implemented:

- one shader at a time;
- **another** without interface retrieval;
- **use this shader** with executable exports;
- twelve authored WebGL2 families;
- bounded family-and-trait programs;
- seeded deterministic source generation;
- local validity, quality, similarity, and luminance-change screening;
- four-candidate local selection;
- bounded local encounter traces;
- optional opt-in local-model proposals;
- explicit provenance and comparison baselines;
- static deployment workflow.

Not implemented:

- general typed AST;
- arbitrary structural mutation or recombination;
- evidence that the model improves the work;
- validated visual breadth;
- complete browser, mobile, export, security, or accessibility coverage;
- public encounter evidence.

## 2. Gate A: visual reality

This gate precedes further architecture work.

### Tasks

- render at least 200 encounters on a real GPU;
- create contact sheets grouped by family;
- record first-paint and replacement latency;
- identify recurrent motifs and visually weak families;
- test reduced-motion and reduced-intensity outputs;
- remove, rewrite, or expand inadequate families;
- determine whether four-candidate selection improves the visible sequence.

### Evidence

- contact sheets;
- representative video;
- family-level notes;
- latency measurements;
- retained and rejected examples;
- explicit curation decisions.

### Exit criterion

The visual field is credible for sustained use, and the generator’s limitations are documented rather than hidden behind seed-space cardinality.

## 3. Gate B: runtime integrity

### Tasks

- run integrated `npm run verify` in CI and locally;
- test WebGL2 compilation and context recovery;
- verify dense-screen performance and false positives;
- test IndexedDB and localStorage fallback;
- inspect actual network requests;
- decide whether to vendor WebLLM;
- review model and dependency licences;
- execute every export target;
- test failure paths for WebGPU, model download, timeout, cache, and memory.

### Exit criterion

Documentation, source, network behaviour, and advertised exports agree.

## 4. Gate C: accessibility and visual safety

### Tasks

- external photosensitive-content analysis;
- keyboard-only review;
- VoiceOver and one additional screen reader;
- reduced-motion review across major browsers;
- mobile touch-target and orientation review;
- test common display refresh rates, zoom, and full-screen modes;
- add pre-exposure guidance that does not require prolonged viewing.

### Exit criterion

No known critical accessibility defect remains, and all limitations are exposed accurately.

## 5. Gate D: staged deployment

### Tasks

- deploy privately or to staging;
- verify static hosting and HTTPS;
- confirm privacy and external-request disclosures against network logs;
- run desktop and mobile smoke tests;
- verify storage-clearing controls;
- test a clean first visit and cached return visit;
- document deployment environment and preservation requirements.

### Exit criterion

The work can be used outside the development environment without contradicting its documentation.

## 6. Gate E: encounter evidence

### Minimum practice documentation

- field notes from public or exhibition use;
- examples of replacement and export decisions;
- visitor statements collected with appropriate consent;
- documentation of misunderstandings and failures;
- distinction between observation and interpretation.

### Formal study, if pursued

Possible conditions:

- retrieval versus no retrieval;
- export versus no export;
- recoverability disclosure versus minimal disclosure;
- model, random, authored, and no-mutation proposals.

A formal study requires an explicit protocol and institutional review where applicable. Public artwork telemetry is not a substitute.

## 7. Model decision gate

The optional model should be retained only after a matched comparison.

### Conditions

- same parent candidates;
- comparable mutation magnitude;
- equal validation;
- blinded evaluation;
- separate measures of continuity, difference, interest, and preference;
- technical acceptance and latency;
- device and energy costs.

### Possible decisions

1. retain because a material difference is demonstrated;
2. retain as a disclosed experiment or negative result;
3. remove from the public artwork;
4. reserve for research/exhibition mode.

No outcome is predetermined.

## 8. Structural-synthesis option

A typed program grammar remains a separate research project, not the next automatic milestone.

Proceed only if visual review shows that authored families and bounded traits cannot sustain the desired field and if structural synthesis serves the encounter rather than technical ambition.

Possible components:

- typed coordinate, field, mask, warp, temporal, palette, and compositor nodes;
- valid connection rules;
- deterministic canonicalisation;
- cost and compatibility metadata;
- typed insertion, removal, replacement, and rewiring;
- graph-to-GLSL compilation;
- export support;
- structural mutation baselines;
- visual comparison with the alpha generator.

Exit criterion:

- measurable expansion of perceptual and compositional breadth;
- acceptable latency and device coverage;
- source and documentation alignment;
- no dependence on unrestricted model-written GLSL.

## 9. Public alpha criteria

Before public alpha:

- Gate A visual review complete;
- integrated tests and CI pass;
- primary desktop browsers tested;
- all export targets executed;
- external-request inventory confirmed;
- safety and accessibility limitations visible;
- local AI remains optional and off by default;
- privacy and storage controls work;
- no release-candidate language.

## 10. Beta criteria

Before beta:

- representative mobile testing;
- assistive-technology review;
- external photosensitive-content review;
- curated family set stable;
- measured generation latency acceptable;
- dependency and model-licence review complete;
- staged deployment stable;
- preservation package started.

## 11. Release-candidate criteria

Before release candidate:

- beta defects resolved;
- public or exhibition encounter documented;
- source and all public documentation reconciled;
- final title and model decision made;
- release checklist complete;
- versioned representative captures preserved;
- publication claims limited to available evidence.

## 12. Publication sequence

1. complete visual and runtime gates;
2. deploy or exhibit;
3. document encounters;
4. run model ablation only if model claims remain relevant;
5. write the practice-based paper from realised evidence;
6. pursue separate technical papers only where a method and result exist.

The roadmap is evidence-gated rather than date-driven. Ambitious deadlines may be added operationally, but completion labels must follow completed validation.
