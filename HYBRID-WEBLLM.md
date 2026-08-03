# Hybrid procedural generation and WebLLM

**Status:** agreed architecture  
**Date:** 3 August 2026

## Decision

TSDNE will combine a **typed procedural shader synthesiser** with an optional but meaningful **local WebLLM agent**.

The two systems have different responsibilities:

> The procedural system defines what can exist. The model proposes how a viable possibility might become otherwise.

The procedural system remains the reliable substrate. It guarantees valid structures, bounded cost, exportability, broad device support, and an immediate first encounter. WebLLM provides situated variation by proposing mutations inside a bespoke representation. It does not need to write unrestricted GLSL and should not become the visible protagonist of the artwork.

## Why use WebLLM

Using a local model has artistic, political, and computational value when it is materially integrated rather than added as branding.

- Inference can occur on the visitor's device.
- The current shader graph need not leave the browser.
- The work requires no account, API rent, central prompt archive, or behavioural profile.
- The model is deliberately narrow rather than presented as universal intelligence.
- Its action vocabulary and limits can be documented and inspected.
- The model can participate in an individualised encounter without knowing the visitor.
- The system demonstrates a form of computational personal relation that does not depend on surveillance, exclusive ownership, artificial scarcity, or market exchange.

Local inference is not automatically just or non-extractive. Model provenance, training labour, hardware requirements, energy, browser compatibility, and unequal device access remain part of the work's context and possible research.

## Division of labour

### Procedural system

The procedural layer controls:

- the typed graph or abstract syntax tree;
- available visual primitives and operators;
- valid type connections;
- coordinate systems, fields, masks, warps, palettes, compositors, and temporal operations;
- structural and numerical constraints;
- shader cost and performance limits;
- deterministic GLSL generation;
- compilation and runtime validation;
- verified export formats;
- fallback operation on devices without WebGPU or sufficient model capacity.

### WebLLM agent

The local model proposes:

- graph mutations;
- substitutions and rewiring;
- structural simplification or complication;
- changes of rhythm, symmetry, scale, density, palette relation, or temporal behaviour;
- preservation of one visual property while disrupting another;
- combinations that are unlikely under uniform procedural sampling.

It does not decide whether a candidate compiles, performs adequately, differs sufficiently from recent encounters, or should be shown.

### Validator and selector

The deterministic system:

1. validates the proposed mutation against a schema;
2. applies it to a valid graph;
3. generates GLSL;
4. compiles and renders it;
5. samples several temporal frames;
6. rejects technical, accessibility, and obvious aesthetic failures;
7. compares structural and perceptual signatures with recent local history;
8. selects among viable candidates through plural thresholds and family coverage rather than one universal beauty score.

The AI is consequential but not sovereign.

## Bespoke representation

The model should operate on a TSDNE-specific graph description rather than raw source code. A graph may describe:

- coordinate domain and transformations;
- field and pattern generators;
- signed-distance primitives;
- domain warps;
- masks and layer relations;
- colour systems;
- temporal operators;
- compositing and post-processing;
- cost and compatibility metadata.

A simplified graph could resemble:

```json
{
  "coordinates": {"system": "centred", "scale": 2.4},
  "field": {"primitive": "voronoi", "frequency": 5.2},
  "warp": [{"type": "sinusoidal", "strength": 0.7}],
  "palette": {"type": "cosine", "contrast": 0.8},
  "composition": {"symmetry": "radial", "layers": 2}
}
```

The model returns mutation operations rather than a complete replacement:

```json
{
  "operations": [
    {"operation": "replace", "target": "warp[0].type", "value": "curl"},
    {"operation": "retime", "target": "field", "speed_multiplier": 0.63}
  ],
  "intention": [
    "reduce central symmetry",
    "introduce slow local turbulence",
    "preserve large dark regions"
  ]
}
```

The prose intention may support research and debugging, but only the validated graph mutation affects execution.

## Bespoke AI

A bespoke AI does not initially require training a model from scratch.

### 1. Bespoke ontology

TSDNE defines the concepts through which the model understands shaders. The ontology is an artistic account of executable visual form.

### 2. Bespoke action language

The model operates through a bounded mutation vocabulary such as:

- `insert`
- `remove`
- `replace`
- `rewire`
- `retime`
- `repalette`
- `duplicate`
- `invert`
- `attenuate`
- `amplify`
- `simplify`

### 3. Bespoke dispositions

System instructions and examples can encourage the model to:

- change structure rather than only parameters;
- preserve one characteristic while disrupting another;
- treat slowness, quietness, emptiness, and simplification as valid;
- avoid equating complexity or detail with quality;
- alternate continuity and rupture;
- avoid repeatedly reproducing fashionable generative-art motifs.

### 4. Bespoke weights, later

A later research phase may fine-tune a small model on accepted and rejected mutations, paired comparisons, and authored explanations. This is not required for the first artwork.

## Progressive operation

### Mode A: procedural

Used when WebGPU is unavailable, the model has not loaded, the visitor declines the download, the device lacks capacity, or inference fails. The artwork remains complete.

### Mode B: hybrid

The procedural system and WebLLM both produce candidates. This is the preferred capable-device mode.

A candidate batch may contain:

- purely procedural graphs;
- deterministic graph mutations;
- recombinations of verified structures;
- WebLLM-proposed mutations.

Candidates compete only after deterministic validation.

### Mode C: research or exhibition mode

A separate interface may expose:

- model and procedural proposals;
- rejected mutations;
- compiler and schema failures;
- disagreements among models;
- deterministic interventions that overruled the model.

This mode is not part of the ordinary public encounter.

## Loading and interaction

- The first shader must appear immediately through procedural generation.
- WebLLM loads unobtrusively in a Web Worker after the encounter begins.
- The interface does not become a chat window or model dashboard.
- Model branding, token streams, and inference statistics remain absent from the main visual field.
- A model failure never prevents the visitor from receiving another shader.

## Model scale and selection

Begin with small instruction models in approximately the 0.5B–1B range and benchmark rather than assume a winner.

Evaluate:

- model and runtime download size;
- cold and warm start latency;
- memory consumption and failure rates;
- structured-output validity;
- mutation validity and diversity;
- tendency toward superficial parameter changes;
- tendency toward unnecessary complication;
- aesthetic interest after deterministic selection;
- desktop and mobile support;
- energy use where measurable.

The model's task is narrow: understand a compact graph and propose a few valid mutations. General benchmark superiority is not the selection criterion.

## Uniqueness and repetition

Cryptographic seeds provide highly reliable computational identifiers, not guaranteed visual uniqueness.

Different seeds or graphs may produce identical or quasi-identical appearances. TSDNE should respond proportionately:

- sample several small frames at fixed times;
- compute graph fingerprints and temporal perceptual signatures;
- compare candidates with current-session and bounded local-browser history;
- reject only when several measures agree that a candidate is too close;
- maintain family coverage and avoid turning difference into one optimisation objective.

The system does not claim absolute global uniqueness. Disconnected static clients share no allocation history, and visual identity is not reducible to a hash.

The work distinguishes:

- **computational identity:** seed, graph, generator version, and source;
- **perceptual identity:** the contingent resemblance among rendered outputs;
- **encounter identity:** this visitor's relation to this shader at this moment.

The accurate formulation is:

> TSDNE generates computationally distinct candidates and actively reduces recent perceptual repetition. It does not guarantee absolute visual uniqueness.

## Encounter record without ownership

Hashes and identifiers do not create property.

When a visitor chooses **use this shader**, the export may include:

- exact shader source;
- seed;
- canonical graph hash;
- generator version;
- compact visual signature;
- encounter identifier;
- optional local date;
- verified host templates;
- a free-use statement.

The record authenticates correspondence among these materials. It does not identify the visitor, confer exclusivity, prevent reuse, or establish economic ownership.

Suggested statement:

> This record identifies a computational encounter generated by TSDNE. It confers no ownership, scarcity, exclusivity, or control over subsequent use. The shader may be copied, modified, shared, studied, and incorporated into other works.

The relationship is personal because the visitor encountered, considered, relinquished, or carried the shader elsewhere. It is not proprietary.

## Political and aesthetic proposition

TSDNE asks whether a computational object can be:

- personal without being behaviourally personalised;
- individualised without profiling;
- singular without a guarantee of uniqueness;
- meaningful without exclusive ownership;
- freely circulating without becoming an extractive platform;
- generated by AI without requiring central surveillance or continuous rent.

The result becomes personal **after** the encounter rather than being personalised **before** it through prediction.

## Bounded scope

The first artwork is not:

- a global uniqueness registry;
- a blockchain or NFT project;
- a marketplace;
- an account system;
- a social network;
- a profiling engine;
- an unrestricted shader-writing chatbot;
- a universal visual-similarity infrastructure.

It remains a small static browser artwork with one shader, one decision, local generation, optional local AI, free code, and no public history.

## Frozen architecture

1. Typed procedural synthesis is the substrate.
2. WebLLM proposes constrained graph mutations on capable devices.
3. The first encounter never waits for model loading.
4. Procedural mode is a complete artwork, not a degraded error page.
5. The model does not receive personal or behavioural data.
6. Raw GLSL generation is an experiment, not the production default.
7. Deterministic validation controls validity, safety, performance, and export.
8. Local perceptual comparison reduces obvious repetition without absolute claims.
9. Encounter records identify relations and artefacts, not ownership.
10. The public interface foregrounds exploration, attachment, relinquishment, and use rather than AI spectacle.
