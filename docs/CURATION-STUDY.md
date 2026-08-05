# Private generator curation study

## Status

This document describes the researcher-only curation instrument on branch:

`research/curation-instrument-250`

It is not part of the public artwork and must not be merged into the public interface without an explicit conceptual decision.

## Purpose

The planned inspection of 250 generated shaders should produce structured evidence rather than an informal memory of what looked good or bad.

The instrument supports explicit assessment by Tomas Laurenzo of each selected shader as:

- **interesting**;
- **not interesting**;
- **skip / cannot judge**;
- optional free-text comment.

The explicit rating is the only preference label. Viewing duration, generation conditions, and comments are recorded as contextual evidence and must not be silently interpreted as preference.

## Why this is separate from TSDNE

The public artwork refuses preference learning and behavioural personalisation. The curation instrument is an internal production and research tool used by the artist to revise an authored generator.

The separation is architectural and conceptual:

- public TSDNE stores only non-reconstructive perceptual traces for repetition control;
- the private instrument intentionally stores reconstructive shader graphs, seeds, hashes, and explicit ratings;
- public visitors are not profiled;
- the artist explicitly labels generated material during a bounded development study;
- no adaptive changes are applied during the study itself.

The 250 observations therefore document artistic curation of the generator rather than visitor personalisation.

## Running the instrument

From the repository root:

```bash
cd prototype
python3 -m http.server 8080
```

Open:

`http://localhost:8080/curation.html`

Keyboard controls:

- `I`: interesting;
- `X`: not interesting;
- `S`: skip / cannot judge;
- `Enter`: save the selected rating and generate the next shader;
- `Cmd/Ctrl + Enter`: save while the comment field is focused.

## Recorded fields

Each observation stores:

### Explicit assessment

- rating;
- optional comment;
- ordinal within the study;
- session identifier;
- timestamp;
- viewing duration.

### Reconstructive candidate data

- candidate identifier;
- seed;
- complete shader graph and traits;
- structural vector;
- family;
- estimated cost;
- generator version;
- graph and source SHA-256 hashes.

The full GLSL source is not duplicated in the dataset because it can be reconstructed from the stored graph and generator version. The source hash verifies correspondence.

### Perceptual and technical measurements

- luminance distribution;
- variance;
- edge density;
- saturation;
- temporal difference;
- dense flash-screen result;
- quality checks.

### Selector context

- final selection score;
- novelty component;
- visual-complexity component;
- family-separation component;
- early-encounter flag;
- candidate-pool size;
- generation attempts and rejection summary;
- ranked summaries for all valid candidates in the pool.

The pool summaries make it possible to distinguish weaknesses in the generator from weaknesses introduced by the current selection function.

### Environment

- viewport and screen dimensions;
- device-pixel ratio;
- user agent and platform;
- available processor count;
- exposed device-memory estimate, where supported;
- reduced-motion preference;
- generation duration.

## Storage and export

The study uses a separate IndexedDB database:

`tsdne-curation-research`

The instrument can export:

- complete JSON for reproducibility and detailed analysis;
- flattened CSV for statistical exploration.

The browser data should be exported at regular intervals, not only after item 250. A practical schedule is after 25, 50, 100, 150, 200, and 250 ratings.

The **clear study data** operation is destructive and starts a new session.

## Analysis

Run:

```bash
node scripts/analyse-curation.mjs path/to/tsdne-curation-YYYY-MM-DD-250.json
```

This produces:

- `*-analysis.json`;
- `*-analysis.md`.

The report includes:

- overall explicit-interest rate with a Wilson interval;
- per-family rates and uncertainty intervals;
- skip counts;
- viewing times as context;
- trait, selector, and perceptual mean differences;
- standardised effects using Cohen's d;
- all comments grouped with rating and family.

## Interpretation limits

The study is useful for generator revision, but it is not a controlled causal experiment.

1. The current selector determines which candidates are shown, so observed traits are sampled conditionally.
2. Families may receive unequal sample counts.
3. Repeated judgements by one artist measure an artistic curation process, not population preference.
4. Ratings may drift as the artist learns the generator and develops more specific criteria.
5. Viewing duration must not be interpreted as liking.
6. Comments may be more diagnostic than the binary label.
7. The same 250 observations must not be used both to optimise the generator and to claim unbiased improvement.

## Recommended revision protocol

### Phase 1: exploratory curation

Use the first 250 ratings to identify:

- weak visual families;
- weak parameter regions;
- recurrent technical artefacts;
- traits associated with positive or negative judgements;
- mismatches between the current complexity score and artistic judgement;
- cases where the selector chooses a weaker candidate than alternatives in the logged pool;
- recurring concepts in comments.

### Phase 2: explicit generator revision

Document every change as one of:

- family removal or probability reduction;
- parameter-range restriction;
- authored grammar revision;
- selection-weight revision;
- quality-threshold revision;
- new family or compositional operator.

Do not train an opaque predictor directly on 250 labels as the first response. The principal aim is to improve the authored generator while retaining intelligibility and artistic control.

### Phase 3: held-out validation

After revision, generate a new fixed batch not used for development. Compare:

- explicit-interest rate;
- family-level performance;
- comment categories;
- perceptual coverage;
- repetition;
- generation cost and latency.

A blinded A/B comparison between old and revised generators would provide stronger evidence than simply repeating the same adaptive curation process.

## Publication value

The process may support the principal TSDNE paper as production evidence, especially for claims about:

- the necessity of credible perceived abundance;
- authored procedural complexity;
- the relation between computation and artistic curation;
- separation between public non-personalisation and private production judgement;
- transparent revision of a generator rather than behavioural optimisation of visitors.

A separate methods or technical paper would only be justified if the study develops a stronger formal contribution, such as a reproducible artist-in-the-loop curation method, a substantive analysis of selector bias, or a validated generator-revision protocol. The mere collection of 250 personal ratings is not independently a technical contribution.

## Research ethics and disclosure

Because the sole intended participant is the artist-developer, the current instrument is best understood as production research and self-study. Any later inclusion of other participants would require a separate protocol addressing consent, data handling, recruitment, compensation, withdrawal, and institutional review requirements.
