# Genealogy verification log

**Date:** 4 August 2026  
**Document verified:** [`GENEALOGY.md`](GENEALOGY.md)  
**Status:** internal source and claim verification; not an independent audit

## 1. Purpose

This document records how the TSDNE genealogy was checked, which claims were corrected, which sources remain mutable or incomplete, and which formulations are permitted. It does not claim independence: the verification was conducted within the same project and must not be represented as external peer review.

The verification standard is narrower and more useful than an “audit” label:

1. identify the canonical work or publication;
2. prefer proceedings, publisher, artist, project, repository, standards, or institutional records;
3. distinguish first publication from later preprint upload;
4. distinguish encounter-time generation from pregenerated delivery;
5. distinguish local execution from offline operation, total privacy, or ethical provenance;
6. distinguish source transfer from ownership;
7. distinguish computational identification from perceptual uniqueness;
8. treat absence from the search as a bounded finding, never as proof of priority.

## 2. Corrections closed

| Item | Earlier problem | Verified correction |
|---|---|---|
| *ShadAR* | The earlier verification replaced a 2025 proceedings date with the date of a later arXiv upload | Published in *2025 IEEE International Symposium on Mixed and Augmented Reality Adjunct*, pp. 959–960, DOI `10.1109/ISMAR-Adjunct68609.2025.00267`; author manuscript posted to arXiv on 19 February 2026 |
| *AI Co-Artist* | Treated only as a 2025 preprint and left for later status checking | Published in EvoMUSART 2026, LNCS 16523, pp. 192–206, DOI `10.1007/978-3-032-24350-8_13`; the 2025 arXiv version is a preprint |
| Quiroz and Dascalu | Only the 2016 system was included | Added the 2017 follow-up, *Interactive Shape Perturbation*, arXiv:1706.04077 |
| Artbreeder lineage | Picbreeder was discussed without its major browser descendant | Added Ganbreeder/Artbreeder and its explicit debt to Picbreeder |
| LLuminate | Omitted despite direct relevance to evolutionary LLM generation of shaders and other artefacts | Added Joel Simon’s LLuminate framework and repository |
| Demoscene | Effectively collapsed into generic procedural graphics | Added 4k/64k intros and executable graphics as a direct culture of executable, runtime-generated visual art |
| ShaderGPT | Omitted contemporary cloud authoring counter-model | Added service and privacy-policy comparison |
| LUMEN | Omitted close WebGL2 implementation neighbour | Added seeded browser studio, controls, perfect loops, and export comparison |
| HCI locators | Reflective, adversarial, critical-technical, and seamful design were named without precise locators | Added DOI or publisher locators for Sengers et al., Agre, DiSalvo, and Chalmers et al. |
| *Demokritos* | Named without a public locator | Added ISEA 2025 programme and ISEA Symposium Archives records |

## 3. Documentation corrections

The repository was reorganised in commit `3af2ee2`, which moved the principal project documents into `docs/`. The README and status document still pointed to their former root paths. Those links were therefore genuinely stale after the move, even though the files themselves had not been deleted.

The corrected map now uses:

- `docs/PROJECT.md`
- `docs/ARCHITECTURE.md`
- `docs/HYBRID-WEBLLM.md`
- `docs/IMPLEMENTATION-ROADMAP.md`
- `docs/PROTOTYPE.md`
- `docs/DEPLOYMENT.md`
- `docs/PAPER-1.md`
- `docs/REFERENCES.md`
- `docs/GENEALOGY.md`
- `docs/GENEALOGY-VERIFICATION.md`

Temporary public/private visibility can also cause anonymous GitHub requests to return 404, but it was not the sole cause of the broken README links after the reorganisation.

## 4. Method correction

The first genealogy declared evidence classes but did not apply them consistently. That unused classification scheme has been removed. The revised genealogy instead:

- names a source basis for each close precedent in the comparison table;
- provides locators at the point of substantive claims;
- maintains a complete source ledger;
- records unresolved matters here rather than inventing an empty “U” category.

## 5. Argument correction: necessity, not vacancy

A conjunction of sufficiently specific properties will usually appear unique. “No one combined these six features” is therefore weak evidence of artistic or research contribution.

The revised claim is:

> TSDNE’s constraints are mutually motivated refusals. Each answers a named counter-model and changes the meaning of the others.

| TSDNE constraint | Principal counter-model | What the constraint does |
|---|---|---|
| One object at a time | ShaderToy, Artbreeder, feeds, galleries, parameter studios | Removes comparison, ranking, previews, and browsing |
| Irreversible **another** | Saved seeds, browser history, persistent branches, archives | Makes search consequential |
| Executable source transfer | Image-only “This X Does Not Exist” sites and platform-bound output | Transfers the generative process rather than only its rendered surface |
| No behavioural profile | Recommenders, accounts, analytics, taste optimisation | Makes the relation personal after encounter rather than personalised beforehand |
| Optional bounded local model | Cloud shader assistants and general prompt services | Makes model agency narrow, explicit, defeasible, and non-essential |
| No proprietary scarcity | Art Blocks, NFTs, editions, canonical ownership | Separates singularity from exclusion and resale |
| No public archive | ShaderToy, Artbreeder, Picbreeder, *Electric Sheep* | Refuses accumulation as the default measure of value |
| Bounded local history | Global registries and hidden cross-user tracking | Reduces local repetition without constructing a social identity |

## 6. Central conceptual consequence

The bounded IndexedDB history is not merely an optimisation mechanism.

> The system remembers so that the encounter can forget.

The interface denies retrieval, while compact local signatures prevent immediate perceptual return. Three forms of memory diverge:

- computational memory retains bounded signatures;
- interface memory is deliberately absent;
- human memory remains affective, partial, and unverifiable.

This must remain transparent and clearable. It must never be converted into a behavioural profile or interpreted as evidence of taste.

## 7. Claim register

| Potential claim | Status | Permitted formulation |
|---|---|---|
| “The first AI-generated shader artwork” | False | LLM shader tools and published systems precede TSDNE |
| “No similar project exists” | Unprovable | No verified project located in this bounded review realises the same motivated configuration |
| “The configuration is novel because it has six properties” | Weak | The constraints form a coherent set of refusals directed at named counter-models |
| “Every shader is unique” | Unprovable | Candidates have computational identities; recent structural and perceptual repetition is reduced locally |
| “Private because local” | Too broad | Project-controlled inference and generation occur locally; network, browser, cache, model, and hosting conditions are disclosed |
| “The visitor owns the shader” | Misleading | The visitor receives reusable source under stated non-exclusive terms |
| “The shader disappears forever” | False | It becomes unavailable through the TSDNE interface after relinquishment |
| “The model creates the shader” | Incorrect division of agency | The model proposes bounded mutations; authored systems validate and render them |
| “Behaviour measures preference” | Unsupported | Behaviour remains semantically ambiguous unless studied with explicit consent |
| “Local AI is environmentally preferable” | Unsupported | Computation is displaced to the visitor’s device and must be measured rather than assumed |

## 8. Source-status register

### Stable enough for the current genealogy

- Karl Sims and interactive evolutionary computation;
- Picbreeder, Ganbreeder/Artbreeder, novelty search, and MAP-Elites;
- *Electric Sheep*, *Every Icon*, Reas, Processing, and AARON;
- demoscene 4k/64k intros and executable graphics;
- ShaderToy, Hydra, Shader Park, Material Maker, ISF, and related shader tools;
- Quiroz and Dascalu 2016/2017; Sasso, Loiacono, and Lanzi 2023;
- AIShader, published *AI Co-Artist*, published *ShadAR*, and *Demokritos* programme/archive records;
- WebLLM’s 2024 research paper;
- reflective, critical-technical, adversarial, seamful, local-first, and Human–Data Interaction references;
- WebGL/WebGPU, WCAG, and shader-security documentation.

### Mutable and requiring recheck at manuscript freeze

- current WebLLM release, supported models, memory requirements, and browser coverage;
- ShaderGPT features, data practices, pricing, and account requirements;
- LUMEN implementation, repository state, licence, and export formats;
- platform policies for ShaderToy, Artbreeder, and Art Blocks;
- model artefact licences and acceptable-use terms;
- browser support for WebGPU, OffscreenCanvas, IndexedDB, and relevant APIs;
- final proceedings pagination and bibliographic form for *Demokritos* if a more specific record becomes available.

## 9. Human-read requirement

Before submission, every source actually cited in the manuscript must be opened and read in the form being cited. Repository descriptions, search snippets, and metadata records are sufficient for constructing this working genealogy but not substitutes for reading the final cited publication. The manuscript bibliography should contain only sources that have passed that final human check.
