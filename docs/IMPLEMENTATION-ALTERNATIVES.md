# Implementation alternatives and decision record

**Date:** 4 August 2026  
**Status:** architecture options, not descriptions of current implementation

## 1. Purpose

This file records plausible technical paths for TSDNE and why the alpha uses a narrower system. It must not be read as evidence that the highest-ranked architecture has already been built.

Current alpha:

- twelve authored GLSL families;
- bounded scalar traits and palette record;
- local candidate validation and selection;
- optional model proposals over traits and family choice;
- no general typed AST.

## 2. Decision criteria

Alternatives are evaluated against:

- immediate first encounter;
- visual breadth and curation;
- static hosting;
- no paid inference;
- broad device reach;
- truthful executable export;
- inspectable agency;
- privacy and dependency limits;
- capacity to support withdrawal rather than an authoring dashboard.

## 3. Current and future alternatives

| Option | Current status | Principal value | Principal risk |
|---|---|---|---|
| Authored family templates with bounded traits | Implemented | reliable, fast, portable, curatable | recognisable families and limited structural breadth |
| Local multi-candidate selection | Implemented modestly | reduces immediate repetition | latency and metrics rewarding superficial difference |
| Typed procedural grammar or AST | Future option | real structural mutation and valid composition | major implementation burden; may not improve the artwork |
| Modular shader graph | Future option | composability and export structure | graph complexity and formulaic results |
| Mutation of verified authored programs | Partly implemented parametrically | continuity from known quality | derivative or shallow variation |
| Interactive evolution from explicit judgements | Research option | visitor comparison and search | conflicts with one-object encounter; requires study interface |
| Behaviour-driven adaptation | Not recommended for public work | long-term local adaptation | ambiguous signals; risks hidden personalisation |
| Local LLM over bounded program | Implemented experimentally | inspectable semantic proposal | download, hardware exclusion, and no demonstrated advantage |
| Local LLM over typed AST | Future research option | potentially meaningful structural action | requires AST first; model may add little |
| Raw model-written GLSL | Experimental comparison only | direct code generation | validity, safety, latency, aesthetic inconsistency |
| Tiny task-specific model | Later research option | smaller and more specialised | dataset, training, provenance, and uncertain benefit |
| Large curated static corpus | Fallback option | quality and compatibility | finite, enumerable, weak encounter-time generation |
| Global uniqueness service | Rejected for current work | cross-device allocation | infrastructure, tracking, governance, false perceptual guarantee |

## 4. Authored family templates

### Advantages

- deterministic and inspectable;
- immediate generation;
- no mandatory model;
- straightforward WebGL2 export;
- family-specific curation;
- controlled numerical behaviour.

### Limitations

- family structure is fixed in authored source;
- within-family mutation is parametric;
- a visitor may learn the family vocabulary quickly;
- high seed cardinality does not guarantee perceptual breadth.

### Current decision

Retain for alpha. Evaluate through a 200-encounter visual audit before adding a more complex representation.

## 5. Local multi-candidate selection

The alpha seeks several valid candidates and chooses using recent distance and family coverage.

### Advantages

- remains local;
- reduces obvious repetition;
- makes selection more deliberate than “first passing candidate.”

### Limitations

- additional rendering cost;
- descriptors may reward noise or superficial difference;
- no global comparison;
- no proof of aesthetic improvement.

### Current decision

Retain provisionally and measure latency and visible effect.

## 6. Typed procedural grammar

A typed grammar could represent coordinate transforms, fields, warps, masks, temporal operators, palettes, and compositors as valid nodes.

### Advantages

- meaningful structural mutation;
- invalid connections excluded;
- deterministic canonical form;
- possible multi-target export;
- clear program-level comparison.

### Limitations

- substantial engineering and curation;
- combinatorial incoherence remains possible;
- a poorly designed grammar may be more repetitive than authored families;
- the technical system could displace the artwork’s withdrawal structure.

### Decision rule

Build only if visual evidence shows that the alpha’s bounded families cannot support the intended encounter and if the grammar’s value can be evaluated explicitly.

## 7. Interactive evolution

Population-based systems are historically established and technically credible.

### Advantages

- human judgement enters selection;
- supports exploration and comparative research;
- useful for curation and offline development.

### Limitations

- a grid, ranking, or preference loop contradicts the ordinary one-object encounter;
- behaviour such as dwell or replacement is semantically ambiguous;
- global evolution requires data governance.

### Current decision

Use in a separate research or studio mode, not silently in the public work.

## 8. Optional local language model

### Advantages

- bounded semantic proposal;
- local inference after download;
- no central prompt archive or API rent;
- inspectable schema and provenance.

### Limitations

- runtime and model requests remain external;
- substantial download, memory, and energy cost;
- WebGPU and device inequality;
- no evidence of advantage over random or authored mutation;
- small models may produce superficial changes.

### Current decision

Off by default. Retain only as a testable proposal mechanism with matched baselines. Removal remains a valid outcome.

## 9. Raw GLSL generation

### Advantages

- direct relation between model output and shader source;
- compiler feedback supports repair experiments.

### Limitations

- syntax and linking failures;
- numerical instability and GPU risk;
- inconsistent uniform contracts;
- high latency from repair loops;
- model coding ability does not establish visual judgement.

### Current decision

Exclude from production. Consider only in an isolated research comparison.

## 10. Curated static corpus

### Advantages

- strongest quality control;
- immediate display;
- exhaustive export testing;
- broad device reach.

### Limitations

- finite and recoverable corpus;
- weakens encounter-time generation;
- requires storage and curation;
- repeats across devices without coordination.

### Current decision

Retain as a possible accessibility or preservation fallback, not the principal generator.

## 11. Global registry

A server or ledger could allocate seeds globally.

### Advantages

- coordinated identifiers;
- possible aggregate research;
- shared allocation history.

### Limitations

- operational dependency;
- privacy and governance;
- availability and abuse;
- no guarantee of perceptual uniqueness;
- conflict with static, non-profiling design.

### Current decision

Rejected unless global allocation later becomes artistically indispensable.

## 12. Evaluation order

1. look at the current alpha;
2. measure latency and failure;
3. curate families;
4. validate the withdrawal encounter;
5. compare model and simpler mutations;
6. only then decide whether structural synthesis is necessary.

Technical sophistication is not a substitute for visual or artistic evidence.
