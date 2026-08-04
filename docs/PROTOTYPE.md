# Revised prototype specification

## Status

The target is a complete procedural release candidate. The WebLLM predecessor is preserved on `archive/webllm-release-candidate-2026-08-04`.

## Required first encounter

1. The browser begins local candidate generation.
2. A small candidate pool is compiled and sampled.
3. Invalid, unsafe, flat, excessively repetitive, or technically costly candidates are rejected.
4. The most suitable candidate is displayed.
5. No model, loading bar, prompt, or deferred awakening exists.
6. The first displayed shader is the complete artwork, not a fallback.

## Required subsequent encounter

1. A larger candidate pool is prefetched in the background.
2. Selecting **another** relinquishes the present shader through the interface.
3. The prefetched shader appears without revealing a search interface.
4. The displayed shader contributes only a non-reconstructive trace to local anti-repetition memory.
5. The system does not infer whether the previous shader was liked.

## First-impression protection

For the first four encounters:

- consecutive macro-families should differ;
- perceptual novelty receives the highest selection weight;
- repeated palette, motion, density, and symmetry regimes should be strongly discouraged;
- the system should generate a larger variety than a single random draw would provide.

The purpose is not personalisation. It is to make the work’s claimed abundance perceptually credible.

## Interface

Normal encounter controls:

- **another**;
- **take the code**;
- **pause**;
- **about**.

The interface must not display:

- family names;
- seed;
- hash;
- serial number;
- rarity;
- novelty score;
- quality score;
- model status;
- generation lineage;
- certificate language.

Errors may be shown unobtrusively.

## Export

Taking the code provides six formats and a plain technical manifest. The manifest is reconstructive because the visitor deliberately chooses continuation.

The manifest must state that it is not a certificate and creates no title.

## Local storage

Permitted:

- accessibility preferences;
- bounded perceptual traces;
- local random trace keys;
- display timestamps;
- broad family labels.

Prohibited:

- source;
- graph;
- seed;
- shader hash;
- screenshots;
- video;
- interaction labels such as like/dislike;
- dwell-based preference interpretation;
- cross-device identifiers.

## Completion tests

- first shader visible within an acceptable measured interval on target hardware;
- no external request beyond static project assets;
- no obvious repeat across three reloads;
- no repeated family across the first three **another** actions unless every alternative fails validation;
- source hashes absent from the normal DOM;
- IndexedDB records cannot reconstruct an output;
- exported code reconstructs the selected output;
- deleting local anti-repetition memory does not affect any account or remote state;
- reduced-motion and reduced-intensity settings work;
- all automated tests pass.
