# Status

**Status date:** 3 August 2026  
**Repository:** `krahd/TSDNE`  
**Phase:** active architecture and browser-prototype development

## Completed

- Project statement, interaction, and poetic centre consolidated.
- Zero-cost and client-side constraints established.
- Ten implementation architectures researched and ranked.
- Two architecture iterations completed.
- Cross-device originality claim bounded accurately.
- Dependency-free WebGL2 proof of concept added.
- `krahd/TSDNE` recorded as the implementation and research repository.
- Hybrid procedural-generation and WebLLM design documented.
- Non-proprietary encounter model documented.
- Journal-first paper argument and outline documented.
- Canonical `academic-writing` records updated to point to this repository.

## Frozen artistic decisions

1. TSDNE remains a small, bounded, self-contained browser artwork.
2. The public experience centres one full-screen shader, **another**, **use this shader**, and **about**.
3. Refreshing is a wager that relinquishes the current encounter.
4. Visual quality is a constitutive requirement.
5. The work does not need or seek an absolute originality or priority claim.
6. No account, profile, behavioural personalisation, advertising, marketplace, NFT, blockchain, or ownership certificate.
7. Exported shaders are intended to circulate freely.
8. A hash or encounter identifier records computational correspondence; it does not confer property, exclusivity, or scarcity.
9. The work explores personal relation without ownership and individualisation without surveillance.
10. The public interface foregrounds the encounter rather than AI branding or technical spectacle.

## Frozen technical direction

Use a **hybrid typed procedural and local WebLLM architecture**.

### Procedural substrate

- curated shader primitives and visual families;
- typed AST or graph generation;
- cryptographically strong seeds;
- deterministic GLSL generation;
- browser compilation and validation;
- local candidate search and plural visual-quality gates;
- structural and perceptual non-repetition;
- exact verified export templates;
- complete operation without the model.

### WebLLM agent

- load unobtrusively after the first procedural shader appears;
- run locally in a worker on capable devices;
- receive shader graphs, not personal data;
- propose mutations through a TSDNE-specific JSON action language;
- avoid unrestricted raw-GLSL generation as the production default;
- remain subject to deterministic schema, compilation, performance, safety, and selection controls.

### Progressive modes

- **Procedural:** complete artwork when WebGPU, memory, consent, or model loading is unavailable.
- **Hybrid:** preferred capable-device mode combining procedural candidates and model-proposed mutations.
- **Research/exhibition:** optional interface exposing proposals, rejections, failures, and disagreements; not part of the ordinary public experience.

See [`HYBRID-WEBLLM.md`](HYBRID-WEBLLM.md).

## Uniqueness position

### Defensible

- Generation can run entirely client-side without a paid service.
- Exact seed collisions can be made negligibly probable with cryptographically strong 128-bit seeds.
- Distinct seeds and graphs provide computational identities.
- Several temporal render samples and local signatures can reduce obvious recent visual repetition.
- Computational, perceptual, and encounter identity can be studied as different things.

### Not claimed

- Every shader is globally or aesthetically unique.
- A perceptually similar shader can never appear on another device.
- A hash determines whether two images are aesthetically the same.
- A local similarity filter constitutes a global registry.
- Small local models are inherently ethical or universally accessible.

Canonical statement:

> TSDNE generates computationally distinct candidates and actively reduces recent perceptual repetition. It does not guarantee absolute visual uniqueness.

## Encounter record

The export should contain:

- exact shader source;
- seed;
- canonical graph hash;
- generator version;
- compact visual signature;
- encounter identifier;
- optional local date;
- verified host templates;
- free-use and non-exclusivity statement.

The encounter record identifies a relation and an artefact. It does not identify the visitor or create ownership.

## First paper

**Priority:** journal before conference.

Provisional title:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

Alternative:

> **This Shader Does Not Exist: Generative Abundance without Surveillance or Property**

The first paper is practice-led and centres:

- exploration and the poetics of refreshing;
- ephemerality without unverifiable destruction;
- contingent rather than absolute uniqueness;
- personal relation without exclusive property;
- individualisation without behavioural profiling;
- local bespoke AI and divided agency;
- the possibility of computational systems that are personal and generative without reproducing the dominant extractive model of personalisation.

Current journal candidates, to be reverified before selection:

1. *Digital Creativity*;
2. *Leonardo*;
3. *Journal of Science and Technology of the Arts*;
4. *AI & Society*, only with a distinct sociotechnical argument;
5. *Convergence* or a comparable media journal if the personalisation argument becomes primary.

See [`PAPER-1.md`](PAPER-1.md).

## Immediate work

1. Define the first 8–12 visual families and admissible composition rules.
2. Replace baseline string templates with a typed intermediate representation.
3. Define the TSDNE mutation schema and action vocabulary.
4. Implement the first constrained WebLLM mutation experiment behind progressive enhancement.
5. Benchmark one or more approximately 0.5B–1B instruction models for structured mutation proposals.
6. Implement offscreen candidate generation in a Web Worker where supported.
7. Add temporal descriptors and perceptual signatures stored in IndexedDB.
8. Add deterministic raw GLSL, self-contained WebGL, Three.js, ShaderToy, and ISF exports.
9. Implement the non-proprietary encounter record and free-use statement.
10. Establish accessibility and photosensitive-seizure safety rules.
11. Conduct a small internal aesthetic curation round.
12. Maintain production notes for the first journal article.
13. Purchase and configure the project domain only after the name and deployment path are final.

## Development gates

- **20 August 2026:** typed graph specification, mutation language, and first visual-family library.
- **15 September 2026:** complete full-screen encounter with quality filtering, procedural fallback, initial hybrid mutation, and export.
- **25 September 2026:** assess the artwork's public readiness and whether any art call is useful; conference submission is secondary to the journal-first plan.
- **After credible hybrid prototype:** draft a 1,500–2,000-word argument memorandum for the first paper.
- **After stable artwork:** verify journal scopes and select the first submission venue.
- **21 January 2027:** possible CHI Interactive Demo only if the interaction and system evidence are mature and it does not delay the journal article.

## Current blockers

- visual families and typed ontology not yet defined;
- browser model not yet selected or benchmarked;
- model-download and device-access policy not yet designed;
- perceptual-signature method remains preliminary;
- export licence and free-use wording not finalised;
- cross-browser visual validation incomplete;
- no public domain purchased or deployed;
- paper source ledger not yet begun.
