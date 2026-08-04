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
- First-encounter timing and loading policy documented.
- Full staged implementation roadmap created.
- GitHub Pages, custom-domain, and hosting-portability strategy documented.
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
11. The first shader appears immediately; the visitor does not wait at a mandatory model-loading screen.
12. WebLLM becomes available in the background and may influence later or sustained encounters.

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

## First-encounter timing

These are development targets to measure, not current empirical claims:

- first procedural shader under 750 ms on a recent laptop;
- interface responsive under one second;
- cached WebLLM readiness under five seconds on a recent laptop;
- first cold-load hybrid candidate under thirty seconds on good broadband;
- one short mutation proposal under three seconds after readiness;
- no request for **another** waits indefinitely for the model.

Current smallest-model hypothesis:

- SmolLM2 360M is the lower-bound experiment;
- Qwen2.5 0.5B is the likely smallest-useful model;
- approximately 1B is a fallback only if smaller models do not produce meaningful structural mutations.

## Visitors who leave before WebLLM is ready

This remains an interaction question, not a reason to block the first shader.

Prototype and compare:

1. model influence only on later encounters;
2. one slow, validated in-place mutation when the model becomes ready;
3. a restrained readiness invitation that preserves visitor agency.

A mandatory progress screen is rejected as the default. Progress may appear in **about**, diagnostics, or a research build.

See [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md).

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

## Hosting and domains

### Initial host

GitHub Pages is the recommended first host because TSDNE is a static public artwork requiring no server, database, account, payment, or sensitive transaction.

The deployment remains portable to the existing Laurenzo hosting service.

### Repository visibility

Because `krahd/TSDNE` is private, publishing directly from it requires a GitHub plan that supports Pages for private repositories. Otherwise use either:

- a separate public deployment repository containing only built site artefacts; or
- the existing Laurenzo static host.

The published site is public even when the source repository is private.

### Domains

- preferred canonical domain, if available: `thisshaderdoesnotexist.com`;
- possible shorthand redirect: `tsdne.com`;
- do not iframe or wrap the GitHub Pages URL;
- point the canonical domain directly through DNS;
- redirect any second unrelated domain externally;
- keep model weights on an external model host rather than GitHub Pages.

Domain availability has not been verified. See [`DEPLOYMENT.md`](DEPLOYMENT.md).

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
5. Benchmark SmolLM2 360M, Qwen2.5 0.5B, and one approximately 1B comparison model.
6. Test the three non-blocking model-readiness strategies.
7. Implement offscreen candidate generation in a Web Worker where supported.
8. Add temporal descriptors and perceptual signatures stored in IndexedDB.
9. Add deterministic raw GLSL, self-contained WebGL, Three.js, ShaderToy, and ISF exports.
10. Implement the non-proprietary encounter record and free-use statement.
11. Establish accessibility and photosensitive-seizure safety rules.
12. Conduct a small internal aesthetic curation round.
13. Configure an initial GitHub Pages alpha or equivalent static deployment.
14. Maintain production notes for the first journal article.
15. Purchase and configure the project domain after availability and canonical-domain choice are confirmed.

## Development gates

- **20 August 2026:** typed graph specification, mutation language, and first visual-family library.
- **31 August 2026:** complete procedural encounter and background candidate pipeline.
- **7 September 2026:** smallest-useful WebLLM benchmark decision.
- **10 September 2026:** initial hybrid integration and model-readiness strategy prototypes.
- **15 September 2026:** public-alpha candidate with quality filtering, procedural fallback, initial hybrid mutation, exports, and deployment.
- **25 September 2026:** assess public readiness and whether any art call is useful; conference submission remains secondary to the journal-first plan.
- **After credible hybrid prototype:** draft a 1,500–2,000-word argument memorandum for the first paper.
- **After stable artwork:** verify journal scopes and select the first submission venue.
- **21 January 2027:** possible CHI Interactive Demo only if the interaction and system evidence are mature and it does not delay the journal article.

## Current blockers

- visual families and typed ontology not yet defined;
- browser model not yet selected or benchmarked;
- model-download and device-access policy not implemented;
- perceptual-signature method remains preliminary;
- in-place mutation versus readiness-invitation strategy unresolved;
- export licence and free-use wording not finalised;
- cross-browser visual validation incomplete;
- GitHub Pages entitlement for the private repository not confirmed;
- canonical domain availability not checked;
- no public domain purchased or deployed;
- paper source ledger not yet begun.
