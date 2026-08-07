# Paper 1 plan

## Provisional title

**Personal without Personalisation: Encounter, Relinquishment, and Provenance without Title in *This Shader Does Not Exist***

Alternative:

**This Shader Does Not Exist: Singular Encounter without Scarcity, Profiling, or Property**

## Publication strategy

The first publication is a substantial practice-led journal article. It is not a technical shader-generation paper and does not depend on a novelty claim about procedural graphics.

The article's contribution is the articulation and material enactment of a computational relation that refuses several assumptions of platform culture:

- individual difference requires behavioural extraction;
- personal significance requires exclusive possession;
- computational identity should become certification;
- provenance should become title;
- generative abundance should become a catalogue;
- ephemerality requires destruction;
- contemporary generativity requires a foundation model.

## Central argument

TSDNE demonstrates that a computational system may produce a singular and personally meaningful encounter without profiling the visitor, predicting preference, issuing ownership, manufacturing scarcity, or restricting circulation.

The work does not claim that the generated shader is globally unique. Its singularity belongs to the encounter rather than to an exclusive object.

The generator is infrastructure for this argument rather than the paper's novelty claim. Its visual range must nevertheless be credible: if successive shaders appear trivially similar, the work's proposition of computational abundance fails experientially regardless of the conceptual framing.

## Core formulations

> **TSDNE retains provenance but abolishes title.**
>
> **The shader can be identified, copied, and reconstructed, but not claimed.**
>
> **The system remembers enough not to repeat, but not enough to restore.**
>
> **The procedural system produces difference. The visitor produces relation.**

## Current realised generator

As of 7 August 2026, the public runtime uses no language model. It generates locally through an explicit procedural grammar with **forty-nine structural families** organised across continuous fields, constructivist and hard-edge geometry, reprographic systems, recursive/fractal systems, marched three-dimensional space, biological and physical systems, line/lattice systems, synthetic period styles, volumetric/water systems, and rule-driven structures.

Visual variation is separated into three axes:

1. **structure** — the family determines the underlying spatial or dynamical system;
2. **colour** — an independent `shade()` stage maps scalar structure into one of six colour regimes;
3. **finish** — an independent surface stage supplies seven clean/reprographic treatments.

The move from twelve families, through the thirty-nine-family expansion, to the current forty-nine-family grammar emerged from production criticism rather than a claim of algorithmic firstness. Earlier revisions exposed stylistic convergence and a systematic bias towards dense, high-edge, dither-like results. The current system broadens the grammar, separates structural and surface axes, and uses stratified family scheduling so candidate pools cross macro-categories before returning to them.

The paper should use this production history as evidence that perceived abundance is not guaranteed by a large formal possibility space: it must be sustained perceptually across actual encounters.

## Research questions

1. How can an interface stage a meaningful encounter with computational abundance without offering a catalogue or recommendation process?
2. What does relinquishment mean when the underlying object is computationally reproducible?
3. Can provenance remain a technical capacity without becoming title, certification, or collectible value?
4. Can individualised experience be produced without extracting information from the visitor?
5. Can local memory preserve difference without constructing a behavioural history or recoverable archive?
6. What political and aesthetic work is performed by refusing a foundation model within the contemporary “does not exist” genre?
7. How does executable transfer complicate the distinction between viewer, user, and programmer?
8. What forms of private artistic curation can improve an authored generator without turning public visitors into behavioural training data?

## Key distinctions

### Personal / personalised

Personal significance emerges from an event, duration, and decision. Personalisation emerges from a system's representation of a person. TSDNE permits the first while refusing the second.

### Singular encounter / unique object

The work stages one situated relation in time without guaranteeing that no similar program or image can recur.

### Provenance / title

A seed, graph, program, and hash may identify a computational object. Title converts identification into a social and legal claim. TSDNE retains the former and refuses the latter.

### Reproducibility / collectibility

The ability to reconstruct an object does not require the production of a scarce collectible.

### Relinquishment / destruction

The interface withdraws access without pretending that deterministic computation has ceased to permit reproduction.

### Memory of difference / behavioural history

The local anti-repetition system stores lossy perceptual traces and never interprets them as preference.

### Generative computation / foundation-model AI

Procedural systems generate without a learned runtime corpus. TSDNE uses this distinction to enter and contest the cultural space of contemporary generative AI.

### Runtime refusal / development assistance

The public artwork does not run an LLM, diffusion model, learned checkpoint, remote inference service, or third-party generative API. Development of the software and documentation has nevertheless used contemporary programming assistants, including AI-assisted code generation under the artist's direction and review. The paper must preserve this distinction explicitly rather than allowing “authored procedural system” to imply that no AI-assisted development occurred.

## Private curation as production methodology

The private curation system is an **external audit surface over the exact production TSDNE runtime**. It is not a second generator, a forked selector, or a visitor-facing feature. Generation, validation, quality screening, anti-repetition, selection, provenance, rendering, and prefetch are centralised in the shared production runtime; the curation adapter only observes the resulting encounter and records an explicit judgement.

The deployed curation route is intentionally unlinked from the public artwork and excluded from indexing. Its data remains local to the curator's browser.

The audit has no fixed quota. A session may contain two judgements or many dozens; closing the browser ends that session, and later sessions continue the cumulative local corpus. This makes sustained curation practically feasible without converting it into a compulsory long experiment.

The three labels are:

- **OK** — the shader is acceptable for TSDNE as-is;
- **not OK** — the shader should not appear in TSDNE as-is;
- **repetitive** — the shader is acceptable in itself but too similar to something shown recently.

This distinction separates intrinsic visual failure from sequence-level failure. In analysis, `OK + repetitive` constitute individually acceptable outputs, while `repetitive` also marks a failure of perceived abundance or anti-repetition.

The rating interface is intentionally blind to family names, seeds, scores, hashes, and diagnostics. An optional comment can be added after a judgement.

### What the audit records

Each explicit rating is paired with production telemetry already generated by TSDNE:

- global/session ordinal, timestamp, and display duration;
- application version and deployed Git revision where available;
- runtime, selector, generator, perception, and curation-protocol versions;
- browser and display environment;
- exact seed, graph, traits, palette, family and macro-category;
- colour mode, finish, and variant;
- source and graph hashes;
- compact perceptual descriptors, quality assessment, and flash-screen result;
- selector score components;
- complete ranked candidate pool;
- every generation/validation attempt and its rejection stage/reason;
- recent non-reconstructive perceptual traces available to the selector before selection;
- generation duration;
- a small visual thumbnail;
- optional qualitative comment.

The curation layer recalculates none of these production decisions. Its architectural invariant is:

> **TSDNE produces; curation observes.**

### No online adaptation

Curation labels never alter generation while a corpus is being collected. The process is:

`production → observation → export/analysis → explicit authored revision → later version`

not:

`production ↔ curator preference model`.

The corpus is used to diagnose weak families, parameter regions, family/colour/finish interactions, quality thresholds, selector weights, and shortcomings in the perceptual-distance metric. Any resulting change is made explicitly in a later version of the authored system.

### Repetition as a particularly useful signal

The `repetitive` label directly tests a central requirement of the artwork. For every such judgement, analysis can compare the curator's explicit perception of repetition with the selector's own measured distance to the recent local traces that were available when it made its decision.

A case where the curator marks `repetitive` while the metric reports high novelty identifies a missing component in the perceptual descriptor or a poorly calibrated threshold. The reverse disagreement is equally useful. This produces evidence about the anti-repetition mechanism without treating `another` itself as dislike or preference.

### Methodological status

The audit is best described as a bounded-by-practice, first-person generator audit within an autobiographical-design / research-through-design production process. It documents how the artist inspects and revises an authored generative system.

It is **not** a user-preference study and cannot establish what a broader visitor population likes. Its rates are descriptive of the production audit, not estimates of population preference.

The paper should therefore use the corpus as transparent production evidence rather than statistical authority.

## Visual genealogy and explicit reference

The expanded grammar makes historical references explicit in family names, including Hans Richter, Viking Eggeling, Suprematism, and Bauhaus, alongside procedural references such as Truchet systems, Julia/orbit-trap fractals, Apollonian structures, ray-marched space, phyllotaxis, contour mapping, reprographic techniques, cellular automata and other rule-driven systems.

This should be documented as a legible genealogy rather than treated as neutral stylistic vocabulary. The paper should distinguish explicit formal reference from model-based stylistic imitation: TSDNE's public runtime contains no learned corpus, but its authored rules still emerge from histories of art, cinema, mathematics, computer graphics, printing, and visual culture.

## Verification as production evidence

The current repository verification includes:

- JavaScript syntax checks;
- 37 unit and architectural-contract tests;
- tests that the curation adapter and public adapter both delegate production mechanics to the shared runtime;
- tests that the curation vocabulary is exactly `OK / not OK / repetitive` and that ratings do not adapt generation online;
- tests covering family/category ledgers, stratified scheduling, provenance, export, anti-repetition traces, perceptual descriptors, quality checks and flash screening;
- a real WebGL2 headless-browser compile/render smoke test across all forty-nine structural families under three variant conditions each: **147/147 conditions pass** on the current CI revision;
- verified GitHub Pages deployment with a generated build manifest so curation records can identify the deployed Git commit.

These checks establish technical consistency and one real WebGL2-driver smoke test. They do not replace actual artistic inspection, cross-browser/device testing, or photosensitive-safety review.

## Proposed structure

### 1. Introduction

Introduce the saturation of generative output and the platform assumption that individualised experience requires extraction. Present TSDNE's question and central contribution.

### 2. The artwork

Describe the interface: appearance, remaining, relinquishment, and continuation. Explain why the interaction is intentionally narrow.

### 3. Abundance without a catalogue

Discuss the difference between computational possibility and browsable inventory. Explain why showing one object at a time changes the experience of abundance, and why visual heterogeneity must be engineered and curated if abundance is to remain credible in use.

### 4. Serendipity and relinquishment

Analyse **another** as a wager rather than a filter or optimisation command. Address curiosity, regret, attachment, and uncertainty.

### 5. Personal without personalisation

Situate the work against recommendation systems, behavioural profiling, engagement optimisation, and extractive individualisation.

### 6. Provenance without title

Examine cryptographic and computational identity while refusing certificate aesthetics, registries, uniqueness claims, and ownership. Develop the two frozen formulations.

### 7. Interface loss over reproducible substrates

Discuss the tension between irreversibility in interaction and reproducibility in computation. Avoid false claims of destruction.

### 8. The anti-archive

Describe local perceptual memory: remembering enough to avoid repetition while preserving no route back. Distinguish it from archives, profiles, and deduplication alone.

### 9. Refusing the model

Explain the decision not to use a model at runtime. Connect the title to the contemporary AI imaginary while arguing that generativity exceeds foundation models. Address training corpora, labour, copyright, device inequality, dependency, and preservation without turning the article into a universal anti-AI claim. Explicitly disclose AI-assisted software development so the runtime refusal is not confused with a claim of tool purity.

### 10. Authored visual genealogy and private curation

Describe the historical, computational, and reprographic lineages of the procedural grammar; the expansion of its visual vocabulary; structure/colour/finish separation; the production critique that motivated those changes; and the external artist-only curation audit. Treat this as production methodology and evidence, not visitor personalisation or a technical-priority claim.

### 11. Executable circulation and the user–programmer continuum

Discuss code transfer as a movement from spectatorship towards appropriation and potential programming. Clarify that circulation does not confer exclusive rights.

### 12. Material limits and contradictions

Acknowledge browser infrastructure, energy, hardware, hosting, authored selection, AI-assisted development, and the impossibility of complete non-extraction. Discuss the limits of anti-copyright gestures within existing law.

### 13. Conclusion

Return to the proposition that personal relation does not require behavioural personalisation or property.

## Evidence required before submission

- stable public artwork and documentation of the exact interaction;
- sustained private curation corpus from one or several practical sessions;
- analysis separating `not OK` from `repetitive` failures;
- explicit record of generator/selector revisions motivated by the audit;
- real-device and cross-browser rendering checks beyond CI's headless WebGL2 smoke test;
- evidence that early encounters remain perceptually diverse in actual use;
- inspection of local anti-repetition storage and privacy behaviour;
- verified export examples;
- reduced-motion and photosensitive-safety review;
- production notes explaining removal of runtime WebLLM and later AI-assisted development work;
- explicit visual-grammar genealogy;
- critical reflection on failures, selector bias, metric disagreements, and revisions;
- screenshots and video documentation;
- optional consented interviews or observational study only if they materially support claims about visitor phenomenology.

No arbitrary number of curation judgements is required for the artwork or paper. The evidentiary value lies in the documented relation between inspection, diagnosis, revision, and later production behaviour.

## Claims to avoid

- first browser shader artwork;
- first generative artwork without profiling;
- guaranteed visual uniqueness;
- destruction of relinquished shaders;
- total absence of extraction or material cost;
- universal solution to AI ethics;
- invention of anti-repetition, novelty search, procedural grammar, or first-person curation;
- invention of provenance without ownership;
- implication that hashes are politically neutral;
- implication that CC0 resolves every possible third-party right;
- implication that “authored procedural” means produced without AI-assisted development;
- treating the forty-nine-family grammar, structure/colour/finish separation, shared runtime, or curation method as technical firsts without evidence;
- treating curator ratings as public-user preferences or population statistics.

## Contribution statement

The article contributes a practice-based account of an interaction architecture in which computational abundance is encountered without a catalogue, difference is produced without profiling, provenance is retained without title, local memory prevents obvious repetition without preserving a recoverable archive, and executable objects circulate without exclusive possession. Its production history further demonstrates that refusing public personalisation does not remove the need for intensive artistic curation: heterogeneity is developed privately in the authored system rather than extracted publicly from visitors.

## Candidate journals

Venue scope must be verified immediately before submission. Current likely candidates remain:

1. *Digital Creativity*;
2. *Leonardo*;
3. *Journal of Science and Technology of the Arts*;
4. *Convergence* or a comparable media journal if the personalisation/platform argument becomes dominant;
5. *AI & Society* only if the refusal of foundation-model generativity is sufficiently distinct from other ongoing AI-and-memory work.
