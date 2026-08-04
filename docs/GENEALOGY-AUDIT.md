# Audit of the TSDNE genealogy

**Audit date:** 4 August 2026  
**Audited document:** [`GENEALOGY.md`](GENEALOGY.md)  
**Audit standard:** titles, creators, dates, operating principles, technical descriptions, and comparative claims checked against primary or institutional sources wherever available.

## 1. Audit conclusion

The related-work review supports the following conclusion:

> TSDNE is not a new instance of any one established category. Every principal component has precedents. The project’s defensible contribution lies in the realised configuration of those components: one-at-a-time browser shader generation, irreversible relinquishment, non-exclusive executable transfer, bounded optional local-model intervention, absence of behavioural profiling, and rejection of tokenised or proprietary scarcity.

The review did **not** locate a verified project with that full configuration. This is a bounded research result, not proof of priority or universal non-existence.

## 2. Verification protocol

Each included item was checked for as many of the following as the available evidence allowed:

1. canonical title;
2. creator or authors;
3. publication, exhibition, or release date;
4. whether the system generates at encounter time or serves pregenerated output;
5. whether computation is local, remote, distributed, or unspecified;
6. whether source code is visible, exportable, reusable, or merely displayed;
7. whether outputs persist in a catalogue, lineage, account, token, or archive;
8. whether users prompt, select, rate, mutate, browse, refresh, or only observe;
9. whether the work collects or depends on behavioural identity;
10. whether the cited source is primary, institutional, or secondary;
11. whether the comparison describes a shared mechanism rather than superficial visual similarity;
12. whether negative claims about what a precedent does not contain are directly supportable.

Primary sources included artist sites, project sites, repositories, original papers, official specifications, and first-party documentation. Institutional sources included museum and preservation records. Secondary sources were not used to support technical claims when a primary source was available.

## 3. Corrections made or required by the audit

### 3.1 *ShadAR* date

The working source list inherited a 2025 date. The verified arXiv record is:

- Yanni Mei, Samuel Wendt, Florian Mueller, and Jan Gugenheimer, “ShadAR: LLM-driven shader generation to transform visual perception in Augmented Reality,” arXiv:2602.17481, submitted 19 February 2026.

The genealogy uses **2026**.

### 3.2 WebLLM date

WebLLM has multiple current metadata surfaces. The stable date for the research record used here is the arXiv preprint:

- Charlie F. Ruan et al., “WebLLM: A High-Performance In-Browser LLM Inference Engine,” arXiv:2412.15803, December 2024.

The repository is continuously developed and may show later release or publication metadata. The genealogy therefore refers to the 2024 paper and the current repository separately rather than presenting “2024/2026” as one date.

### 3.3 *This Waifu Does Not Exist* and public-domain language

Gwern describes the project and corpus through public-domain/CC0 language. This is evidence of the author’s circulation intent, not a legal determination concerning every upstream model, dataset, or generated output in every jurisdiction. The genealogy consequently uses **public-domain/CC0 intent** rather than asserting uncontested legal status.

### 3.4 *This Rental Does Not Exist*

The official project account verifies that:

- the project was published in February 2019;
- StyleGAN models generated room and host imagery;
- separately trained language models generated titles and descriptions;
- outputs were pregenerated;
- the site assembled a new listing every five seconds.

The work is therefore a direct precedent for the title family and timed synthetic replacement, but not for encounter-time shader synthesis.

### 3.5 *Random Art*

Andrej Bauer’s first-party accounts verify expression-tree image generation, source examples, and a later browser-running version. Claims about its exact seeding interface should be made only when the relevant historical implementation is directly recovered. The genealogy therefore relies on the verified expression-tree and browser-generation principles rather than an unsupported detailed interface reconstruction.

### 3.6 AI Co-Artist

The cited work is a real arXiv preprint, not a placeholder or invented reference:

- Kamer Ali Yuksel and Hassan Sawaf, “AI Co-Artist: A LLM-Powered Framework for Interactive GLSL Shader Animation Evolution,” arXiv:2512.08951, 2025.

Its date should be understood as preprint metadata; publication status must be rechecked before formal citation in a submitted paper.

### 3.7 No absolute uniqueness

A 128-bit seed can make exact random-seed collisions negligible at realistic scales, but it cannot guarantee:

- no repeated graph after generator normalisation;
- no perceptually similar image;
- no cross-device rendering convergence;
- no prior output on another uncoordinated device;
- no source-equivalent program under transformation.

The correct claim is local and statistical: TSDNE can generate computationally identified objects from a vast space and reduce recent structural or perceptual repetition. It cannot establish absolute global visual uniqueness without shared infrastructure, and even shared infrastructure would not settle perceptual identity.

### 3.8 Local inference, privacy, and ethics

Local inference changes the data path but does not automatically establish privacy, autonomy, decoloniality, sustainability, or fairness. The audit requires the project to distinguish:

- **no server-side prompt inference** from **no network activity**;
- **no project-controlled behavioural profile** from **no browser or infrastructure metadata**;
- **model execution on the visitor’s device** from **local production of the model**;
- **reduced central collection** from **absence of upstream extraction**;
- **shifted energy use** from **reduced energy use**.

Model files remain externally hosted, downloaded, cached, and subject to upstream licences and provenance. WebGPU and browser behaviour may expose device differences. The artwork’s privacy statement must enumerate actual network requests and storage rather than rely on the word “local.”

### 3.9 Behaviour is not preference

The following public actions are semantically underdetermined:

- dwell time;
- requesting another shader;
- exporting source;
- invoking the model;
- closing the page;
- returning later.

They may indicate attention, confusion, performance delay, practical interest, aesthetic attachment, curiosity, or other factors. They must not be silently converted into liking, quality, or taste. Any HCI study must use explicit consent and an analysis model that preserves ambiguity.

### 3.10 Scarcity and ownership

TSDNE creates **interface scarcity**, not low computational supply. Source export grants a copy and permissions under the stated terms. It does not create:

- exclusive ownership;
- unique legal title;
- a right to prevent similar generation;
- a tokenised claim;
- reliable evidence that no related shader exists elsewhere.

The encounter record documents correspondence among source, seed, graph, version, and moment. It must not be framed as a scarcity certificate.

### 3.11 Licence status and scope

The release candidate now adopts explicit terms:

- the application is licensed under **GNU GPL 3.0 or later**;
- generated shader outputs are dedicated, to the extent possible under law, under **CC0 1.0**;
- encounter records expressly reject ownership, exclusivity, and artificial scarcity.

This resolves the earlier absence of a licence, but it does not remove the need for a release audit. The project must still verify:

- compatibility and notice requirements for bundled dependencies;
- licences and acceptable-use conditions for downloaded model artefacts;
- whether example or third-party material is included in exports;
- the jurisdictional limits of CC0 and rights that cannot be waived;
- that documentation never implies CC0 controls upstream model or training-data rights.

### 3.12 Security and resource bounds

Generated GPU programs require more than syntax validation. The audit confirms the relevance of:

- typed construction;
- maximum graph depth and source size;
- bounded loops or prohibition of uncontrolled loops;
- numerical-domain checks;
- compile/link timeouts;
- frame-budget rejection;
- protection against pathological derivatives, texture access, and memory use;
- browser-context isolation;
- fuzzing and adversarial testing;
- rejection of unsafe flashing and luminance patterns.

DarthShader and WebGPU/WebGL security documentation justify treating the generator as an untrusted-program pipeline even when its primitives are authored locally.

### 3.13 Accessibility

`prefers-reduced-motion` for interface transitions is insufficient. The visual generator itself requires:

- temporal-luminance constraints;
- flash-frequency checks;
- avoidance of high-contrast repetitive motion likely to trigger discomfort;
- a meaningful reduced-motion visual mode;
- keyboard and screen-reader operation;
- non-visual description of the current process and controls;
- a lower-power fallback that remains aesthetically intentional.

Accessibility must be tested over the generated possibility space, not only over one curated example.

### 3.14 Preservation

The browser, WebGL/WebGPU implementation, external model host, model format, and dependency versions are historically unstable. Preservation requires:

- source and build-independent static assets;
- generator and schema versioning;
- archived model identifiers and licences;
- representative encounter packages;
- screenshots and lossless or high-quality video documentation;
- browser and hardware notes;
- deterministic regeneration tests where possible;
- an emulation or re-performance plan;
- archival deposit outside the live domain.

## 4. Source-quality findings

### Strong primary or institutional coverage

The following areas have sufficiently strong sources for the present genealogy:

- algorithmic-art pioneers and AARON;
- Karl Sims and interactive evolutionary computation;
- Picbreeder, novelty search, MAP-Elites, and *Electric Sheep*;
- *Every Icon*, Reas, and Processing;
- Rhizome/Whitney browser and net-art histories;
- Rozendaal’s contract;
- ShaderToy-adjacent official tools and repositories;
- ISF, Material Maker, Shader Park, Hydra, glslCanvas, glslViewer, and twigl;
- procedural and evolutionary shader papers;
- AIShader, AI Co-Artist, ShadAR, and WebLLM;
- local-first software, Human–Data Interaction, data colonialism, and free-software definitions;
- WebGL/WebGPU standards, WCAG, and shader-fuzzing work.

### Items requiring fresh verification before publication

The following must be rechecked at manuscript freeze because their status or metadata can change:

- formal publication status of AI Co-Artist;
- formal publication status of ShadAR;
- current WebLLM release, model catalogue, and browser requirements;
- current licences of WebLLM models and bundled dependencies;
- current ShaderToy, Art Blocks, and platform policies;
- dependency and model-licence compatibility with the release terms;
- current browser support for WebGPU, OffscreenCanvas, and relevant storage APIs.

### Excluded or de-emphasised categories

The review considered but did not enumerate every item in the following broad categories because they do not materially sharpen the project’s position:

- generic GAN and diffusion art;
- prompt galleries without shader or browser specificity;
- arbitrary AI coding assistants;
- conventional screensavers;
- procedural texture packages lacking relevant interaction or circulation models;
- NFT collections without generative-code relevance;
- single-serving novelty sites unrelated to synthetic generation or irreversibility;
- browser demos that merely display a fixed shader;
- shader repositories whose only relation is use of GLSL;
- general recommendation-system literature not concerned with sequential hidden alternatives;
- generic privacy claims not tied to browser-local computation.

Exclusion does not indicate low quality or irrelevance to other research. It prevents the genealogy from confusing topical proximity with historical or conceptual lineage.

## 5. Adversarial comparison matrix

| Claim TSDNE might make | Audit result | Permissible formulation |
|---|---|---|
| “The first AI-generated shader artwork” | False/unsupported | LLM-generated shader tools and projects clearly precede it |
| “Every shader is unique” | Unprovable | Computationally identified; recent repetition reduced locally and statistically |
| “Private because it runs locally” | Too broad | Project-controlled inference and generation occur locally; network, cache, browser, and upstream-model conditions are disclosed |
| “Personalised without surveillance” | Internally contradictory | Personal without behavioural personalisation |
| “The visitor owns the shader” | Legally and conceptually misleading | The visitor receives reusable source under CC0-oriented generated-output terms, without exclusivity |
| “The shader disappears forever” | False if exported, cached, recorded, or reproducible | The encounter becomes unavailable through TSDNE after relinquishment |
| “The model creates the shader” | Incorrect division of agency | The model proposes bounded mutations; authored procedural and validation systems determine executable visibility |
| “User behaviour evolves aesthetic quality” | Unsupported without study | Behaviour may be studied separately; the public work does not equate action with preference |
| “No server” | Too absolute | Static hosting and external asset delivery remain; no required server-side generation or project database |
| “Open source” settles every rights question | False | GPL/CC0 terms govern the project’s own release claims; dependency, model, and upstream rights remain separately auditable |
| “Environmentally preferable” | Unsupported | Local execution shifts computation and can be measured; no general carbon advantage is claimed |
| “No similar work exists” | Impossible to establish | No verified work located in this bounded review combines the complete configuration |

## 6. Implementation consequences

The genealogy and audit imply the following non-negotiable implementation requirements:

1. Keep the first procedural shader independent of model readiness.
2. Maintain a complete non-WebGPU path.
3. Generate or mutate a typed graph/AST, not unrestricted production GLSL.
4. Compile and render only inside bounded validation contexts.
5. Store only bounded local novelty signatures and disclose them.
6. Do not use device fingerprinting for global identity.
7. Treat perceptual similarity as plural and temporally sampled.
8. Preserve family diversity rather than optimise one scalar aesthetic score.
9. Make source export deterministic from the same graph used to render.
10. Separate encounter metadata from any claim of ownership.
11. Maintain explicit application and generated-output terms, dependency notices, and model-licence records.
12. Enumerate model and network dependencies in the privacy statement.
13. Build accessibility checks into candidate validation.
14. Archive a reproducible preservation package.
15. Keep research telemetry out of the public artwork unless a separate consented mode is activated.

## 7. Final positioning statement

The most defensible account of TSDNE is:

> TSDNE recomposes established histories of algorithmic art, interactive evolution, browser art, shader culture, local inference, and critical interface design into a deliberately constrained encounter. It uses computational abundance to construct temporal scarcity, permits continuation through non-exclusive executable appropriation, and makes an object personal through relation rather than through a prior behavioural model. Its contribution depends on the realised interaction and technical discipline, not on a claim that any individual component is unprecedented.

## 8. Audit status

**Pass, with qualifications.** The genealogy is sufficiently grounded for project documentation and design decisions. Before scholarly submission, every mutable technical source and preprint must be rechecked, dependency/model licence compatibility must be verified, and claims about visitor interpretation must be supported either by practice-based analysis or a consented study.