# Optional local-model protocol

**Status:** implemented alpha with unresolved research value  
**Date:** 4 August 2026

## 1. Decision

TSDNE retains an optional browser-local language model as an experimental proposal mechanism. It is:

- off by default;
- unnecessary for the baseline artwork;
- constrained to a bounded program representation;
- explicitly attributed;
- subject to deterministic rejection;
- evaluated against random and authored baselines rather than presumed valuable.

The model is not described as bespoke merely because it runs locally. The bespoke element, where defensible, lies in the narrow action vocabulary, the authored visual families, and the validation context.

## 2. Current representation

The model receives:

- the current family;
- the list of available families;
- twelve normalised traits;
- an instruction describing the permitted scope.

This is a bounded family program. It is not a typed AST and does not contain arbitrary nodes or topology.

The current schema permits the model to return:

```json
{
  "changes": {
    "scale": 0.2,
    "tempo": -0.4,
    "density": 0,
    "turbulence": 0.5,
    "contrast": 0,
    "palette": -0.1,
    "complexity": -0.3,
    "rotation": 0,
    "symmetry": -0.6,
    "softness": 0.2,
    "drift": 0,
    "depth": 0
  },
  "targetFamily": "",
  "intention": "reduce symmetry and slow the field while retaining its broad spatial rhythm"
}
```

`targetFamily` may be empty to retain the family or name one of the twelve authored families.

## 3. What the model can and cannot do

### Can

- propose bounded changes to traits;
- request a change to an existing authored family;
- state a short intention;
- produce a proposal that may be logged for later comparison.

### Cannot

- define a new shader family;
- insert or remove typed nodes;
- rewire arbitrary graph topology;
- write unrestricted GLSL in the production path;
- decide that its own proposal is valid;
- bypass visual, cost, similarity, or luminance-change screening;
- receive visitor identity or a behavioural profile;
- claim that a failed proposal succeeded.

Earlier mutation vocabularies listing `insert`, `remove`, `replace`, `rewire`, `duplicate`, and similar operations described a possible future AST. They are not current capabilities.

## 4. Consent and network behaviour

Local AI is disabled for new visitors until they opt in through **about**.

Enabling it may cause:

1. a request to `esm.run` for the pinned WebLLM runtime;
2. requests to external model hosts for model artefacts;
3. browser and runtime cache writes;
4. substantial memory and GPU use;
5. local performance records.

“Local inference” describes where inference executes. It does not mean:

- no network requests;
- complete privacy;
- open or ethical training data;
- low energy use;
- equal device access;
- freedom from supply-chain risk.

The procedural work remains complete when the model is disabled, unsupported, still loading, interrupted, or rejected.

## 5. Proposal validity

A proposal is materially valid only when it contains:

- at least two trait deltas with absolute magnitude of at least `0.06`; or
- a valid family change.

An ineffective proposal is rejected.

The alpha previously inserted a fixed authored mutation when the model returned negligible changes and then labelled the result as WebLLM-derived. That branch has been removed. Authored interventions must be labelled as authored.

## 6. Provenance

A model-derived child records:

- `origin: "model-proposal"`;
- model identifier;
- parent encounter identifier;
- normalised changes;
- active traits;
- requested family;
- intention;
- proposer type;
- runtime version where available.

This record does not establish authorship, ownership, intelligence, or aesthetic success. It identifies the path by which the candidate was proposed.

## 7. Deterministic validation

After the proposal is applied, the resulting candidate must pass the same gates as any other candidate:

1. known family;
2. bounded traits;
3. cost threshold;
4. GLSL compilation;
5. broad rendered descriptor;
6. family-specific luminance, variance, motion, and saturation thresholds;
7. dense high-frequency luminance-change screen;
8. distance from recent local encounters.

A rejected proposal is not shown and should remain available only in an explicit research or diagnostic mode.

## 8. Comparison baselines

The source includes two baselines.

### Random baseline

- changes two to five distinct traits;
- samples bounded signed magnitudes;
- occasionally requests a family change;
- carries `baseline: "random"`.

### Authored baseline

- balances complexity, symmetry, tempo, and softness using a transparent heuristic;
- carries `baseline: "authored"`.

Neither baseline is currently part of the ordinary public encounter. They exist to make a controlled comparison possible.

## 9. Required ablation

The model should not remain central to the publication argument without a study comparing:

- model proposals;
- matched random proposals;
- authored heuristic proposals;
- no mutation.

A defensible protocol would:

1. begin from the same parent candidates;
2. normalise proposal magnitude and opportunity for family change;
3. apply the same deterministic validation;
4. blind raters to proposal origin;
5. measure technical acceptance, perceptual distance, perceived continuity, interest, and preference separately;
6. preserve negative results;
7. avoid interpreting dwell time alone as preference.

Possible outcomes:

- the model produces a measurable difference;
- the model differs but is not preferred;
- the model is indistinguishable from simpler baselines;
- the model performs worse;
- device and ecological costs outweigh any benefit.

All are valid research results.

## 10. Interaction modes

### Procedural mode

The baseline public work. Immediate, static-host compatible, and available without WebGPU or model downloads.

### Optional proposal mode

After opt-in, the model may propose one slow mutation to the first encounter or contribute a later prefetched candidate. The interface labels an accepted proposal as such.

### Research mode

A separate later interface may expose:

- parent and child programs;
- model, random, and authored proposals;
- accepted and rejected candidates;
- proposal magnitudes;
- family transitions;
- compiler and validation failures;
- blinded comparison instruments.

This mode should not be confused with the ordinary artwork.

## 11. Political boundary

Local inference can refuse several platform conventions:

- central prompt collection;
- API rent;
- account requirements;
- server-side behavioural linking.

It can also reproduce other inequalities:

- hardware exclusion;
- model-training opacity;
- energy use displaced to visitors;
- remote dependency delivery;
- unequal latency and failure;
- software supply-chain concentration.

The project should expose this ambivalence. It should not use “local” as an ethical conclusion.

## 12. Publication language

Permitted:

> An optional local model proposes bounded changes within an authored family program. Proposals are attributed, validated, and may be rejected. The project includes random and authored baselines for evaluating whether the model contributes a meaningful difference.

Not permitted before an ablation:

> The AI is consequential, personalises the encounter, improves the shader, creates bespoke aesthetics, or produces results unattainable by simpler procedures.

## 13. Future structural path

A later typed grammar could permit meaningful operations such as:

- inserting a compatible warp;
- replacing a field generator;
- rewiring a compositor;
- duplicating or removing a layer;
- changing temporal operators;
- simplifying a program under a cost constraint.

This requires implementation, tests, renderer integration, export support, and visual evaluation. It is not implied by the current use of the word `graph` in source code.
