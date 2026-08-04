# Alpha implementation record

**Date:** 4 August 2026  
**Version:** `0.1.0-alpha.1` with post-audit source revisions  
**Status:** source implemented; integrated browser and aesthetic validation incomplete

## What this record establishes

The repository contains a runnable static browser implementation with:

- authored procedural shader generation;
- deterministic seeding;
- local rendering and validation;
- bounded local non-repetition;
- optional local-model proposals;
- explicit mutation provenance;
- executable exports;
- accessibility controls;
- automated tests and CI configuration.

This record does **not** establish:

- visual quality;
- sufficient perceptual variety;
- acceptable latency on representative hardware;
- public-release readiness;
- browser or mobile compatibility;
- photosensitive-content safety certification;
- meaningful visitor attachment or regret;
- superiority of model proposals;
- correct execution of all export targets.

## Current representation

The alpha uses a bounded family program:

- twelve authored families;
- twelve scalar traits;
- a palette record;
- a seed;
- a generator version.

The source retains the term `graph`, but no general typed AST or arbitrary graph topology exists.

## Candidate validation

A candidate passes through:

1. cost estimation;
2. GLSL compilation;
3. sparse rendered descriptors;
4. family-specific luminance, variance, motion, and saturation thresholds;
5. a separate dense screen for repeated large-area luminance transitions;
6. recent structural and perceptual comparison.

The runtime seeks four valid candidates and selects using recent distance and family coverage.

The dense screen is a heuristic, not clinical or standards certification.

## Optional local model

- disabled by default;
- requires explicit opt-in;
- fetches a pinned WebLLM runtime from `esm.run`;
- downloads model artefacts from external hosts;
- may propose trait changes or a family change;
- cannot bypass validation;
- receives attribution only when its proposal is used;
- cannot be claimed to outperform random or authored baselines before study.

The previous hidden fallback that converted an empty model response into an authored mutation has been removed.

## Automated verification performed during remediation

A local reconstruction of the revised modules passed:

- JavaScript syntax checks for `generator.js`, `ai.js`, `perception.js`, and `main.js`;
- twelve generator and perception tests;
- deterministic generation across all families;
- rejection of empty mutation proposals;
- bounded mutation and lineage preservation;
- explicit model-proposal provenance;
- random and authored baseline generation;
- rejection of a synthetic repeated full-frame flashing sequence;
- acceptance of a stable synthetic sequence.

Repository CI must confirm the integrated tree. The absence of installed npm dependencies does not cover the optional remotely imported WebLLM runtime and must not be presented as a supply-chain audit.

## Required visual review

Before changing status from alpha:

1. Render at least 200 encounters on a GPU-equipped browser.
2. Produce a contact sheet grouped by family.
3. Record which families become recognisable through repetition.
4. Identify weak motifs, dead areas, excessive similarity, and undesirable motion.
5. Remove or revise inadequate families.
6. Measure first-encounter and **another** latency after four-candidate selection and dense screening.
7. Review the work at desktop, laptop, tablet, and phone scales.

Visual quality remains a constitutive requirement and cannot be inferred from passing code.

## Required browser and accessibility review

- Chrome, Edge, Firefox, and Safari;
- macOS and Windows;
- representative Android and iOS devices;
- keyboard-only operation;
- VoiceOver and at least one additional screen reader;
- reduced-motion and reduced-intensity modes;
- context loss and recovery;
- WebGL2 failure;
- WebGPU absence;
- interrupted or failed model download;
- data-saver behaviour;
- external photosensitive-content assessment.

## Required export review

Execute each output in its target environment:

- raw GLSL in the documented WebGL2 contract;
- standalone HTML in a clean browser context;
- Three.js adapter in a minimal project;
- ShaderToy adaptation;
- ISF adaptation;
- encounter JSON round-trip.

A generated file’s structural resemblance to a target format is not proof that it runs correctly.

## Required model study

Use matched parent candidates to compare:

- model proposal;
- random baseline;
- authored baseline;
- no mutation.

Report validation rates and blinded judgements. Preserve a null or negative result.

## Status transition criteria

### Alpha → beta

- 200-encounter visual review completed;
- unacceptable families revised or removed;
- integrated tests and CI pass;
- primary desktop browsers tested;
- generation latency acceptable;
- all exports execute;
- privacy and external-request inventory confirmed;
- no critical accessibility or security defect known.

### Beta → release candidate

- public or staged deployment tested;
- representative mobile review completed;
- assistive-technology review completed;
- external photosensitive-content review completed;
- dependency and model-licence review completed;
- final content, source, and documentation agree;
- release checklist complete.

The project should not call itself a release candidate before these gates are met.
