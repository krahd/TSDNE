# External curation audit

**Status:** implemented on `main`  
**Route:** `/curation/` within the deployed artwork  
**Public navigation:** none  
**Runtime relationship:** observer of the production TSDNE runtime, never a second generator

## Purpose

The curation audit exists to make sustained artistic inspection of TSDNE useful without changing the public artwork into a preference-learning or shader-exploration system.

The curator sees the same production runtime that a visitor sees. The audit layer records an explicit judgement and the production state that led to the encounter. It does not generate, validate, rank, reject, mutate, or otherwise select shaders itself.

The architectural invariant is:

> **TSDNE produces; curation observes.**

No curation label is supplied to the runtime. Generation therefore remains unchanged while an audit corpus is being collected.

## Interaction

The route presents the shader full-screen with a small bottom overlay:

- `F` — **OK**: acceptable for TSDNE as-is;
- `G` — **not OK**: should not appear in TSDNE as-is;
- `H` — **repetitive**: acceptable in itself, but too similar to something shown recently;
- `C` — add or revise an optional comment on the most recently rated shader;
- `E` — export the complete JSON dataset;
- `Shift+E` — export a flattened CSV.

A rating is committed immediately and the production runtime is asked for `another`. The interface has no family name, selector score, seed, hash, or diagnostic information visible before judgement.

The distinction between **not OK** and **repetitive** is constitutive:

- **not OK** is an intrinsic curation failure;
- **repetitive** is a sequence-level failure of perceived abundance or anti-repetition.

A repetitive shader is therefore counted as individually acceptable while also marking a failure of placement.

## Sessions and continuity

There is no fixed run length and no progress target. Closing the browser ends the current curation session but does not delete prior records. Reopening `/curation/` starts a new session and resumes the cumulative corpus.

This permits short or long working sessions without changing the method. The useful sample size is whatever corpus has accumulated when a generator revision is being considered.

Each new page load receives a new session identifier. Records retain both global and within-session ordinals so fatigue, changes of criterion, and version changes can be inspected later.

## Storage

Curation data is stored only in the curator's browser, in a dedicated IndexedDB database (`tsdne-curation-audit`) with a localStorage fallback. It is separate from the public anti-repetition store.

The curation dataset is intentionally reconstructive because it is private production evidence. For every rated encounter it records:

- explicit rating and optional comment;
- global and session ordinals;
- timestamps and display duration;
- application version and deployed Git commit when available;
- runtime, selector, generator, perception, and protocol versions;
- browser and display environment;
- exact seed, graph, traits, palette, family and macro-category;
- colour mode, finish and variant;
- source and graph hashes;
- compact perceptual descriptors and quality/flash results;
- selector score components;
- complete ranked candidate-pool summaries;
- every attempted candidate, including technical or quality rejection stage and reason;
- the recent non-reconstructive perceptual traces available to the production selector before selection;
- generation duration;
- a small visual thumbnail of the displayed encounter.

The audit does not upload these records. Export is an explicit local download.

## Decoupling from production

`prototype/src/runtime.js` is the single production runtime. It owns:

- generation;
- family scheduling;
- WebGL compilation and validation;
- perceptual sampling;
- safety and quality rejection;
- candidate-pool construction;
- selector scoring;
- anti-repetition history;
- provenance attachment;
- display and prefetch.

Both `prototype/src/main.js` and `prototype/src/curation.js` are adapters around that runtime. Contract tests fail if either adapter imports the low-level generator, selector, perception, history, WebGL, or provenance modules directly.

The curation route is therefore an auditing surface over TSDNE, not another TSDNE implementation.

## Analysis

Export JSON and run:

```bash
npm run analyse:curation -- path/to/tsdne-curation-*.json
```

The analysis separates:

1. **intrinsic acceptability** — `OK + repetitive` versus `not OK`;
2. **sequence repetition** — frequency and context of `repetitive` judgements;
3. family, macro-category, colour-mode and finish patterns;
4. selector scores by explicit judgement;
5. technical and quality rejection funnels;
6. session-level changes;
7. comments;
8. human `repetitive` judgements versus the selector's own perceptual distance to recent traces.

The purpose is diagnosis and explicit revision. The corpus should identify weak families, parameter regions, family/colour/finish interactions, quality thresholds, selector weights, and shortcomings in the perceptual distance metric.

It is not used as an online recommender and should not be treated as a population-preference dataset.

## Revision epochs

A curation corpus describes the production version that generated it. Ratings must never silently alter that version.

When the audit motivates changes:

1. export the current corpus;
2. analyse and document the proposed revisions;
3. modify TSDNE explicitly;
4. bump the relevant implementation/version record;
5. begin subsequent curation sessions against the revised runtime.

Comparing later epochs is useful evidence, but the process should remain practical rather than becoming a compulsory long-form experiment.

## Methodological position

For the practice-led paper, this is best described as an artist-led first-person generator audit within an autobiographical-design / research-through-design production process. It provides evidence about how the authored generator was inspected and revised.

It does not establish what a broader visitor population likes, nor does it convert the public visitor into a source of behavioural optimisation data.
