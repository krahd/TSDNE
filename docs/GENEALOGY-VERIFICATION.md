# Genealogy source-status and claim register

**Date:** 4 August 2026  
**Applies to:** [`GENEALOGY.md`](GENEALOGY.md) and [`REFERENCES.md`](REFERENCES.md)  
**Status:** internal, machine-assisted verification record; not an independent audit

## 1. Purpose

This file records the evidential status of sources and claims used in the TSDNE genealogy. It does not certify the genealogy as correct and must not be represented as peer review or external validation.

A previous version used the heading “Corrections closed.” That language was too strong. Bibliographic metadata, project behaviour, and interpretive claims require different forms of checking, and several records remain mutable or incompletely read.

## 2. Verification states

Each source may pass through the following states:

1. **Lead only** — discovered through search, a model, a bibliography, or a secondary reference.
2. **Canonical record checked** — publisher, proceedings, artist, institutional, standards, or repository record inspected.
3. **Relevant passage or behaviour checked** — the passage, feature, interface, or code supporting the genealogy’s claim inspected directly.
4. **Full source read** — the complete work read by the human author responsible for the manuscript.
5. **Submission ready** — bibliographic form, interpretation, quotation or paraphrase, and manuscript claim checked together.

The current repository contains sources at states 1–3. It does not claim that the complete bibliography has reached states 4 or 5.

## 3. Primary-source corrections and distinctions

| Item | Current verified distinction | Current state |
|---|---|---|
| *AI Co-Artist* | 2025 arXiv preprint; published at EvoMUSART 2026 in LNCS 16523, pp. 192–206, DOI `10.1007/978-3-032-24350-8_13` | Canonical publisher record checked |
| *ShadAR*, ISMAR | Four-author paper published in IEEE ISMAR-Adjunct 2025, pp. 959–960, DOI `10.1109/ISMAR-Adjunct68609.2025.00267` | Canonical proceedings record checked |
| *ShadAR*, arXiv | arXiv:2602.17481, posted 19 February 2026, identifies itself as an author manuscript associated with the 2025 ISMAR-Adjunct publication; it is not used to replace the proceedings date | Record and manuscript front matter checked |
| *ShadAR*, CHI EA | Distinct expanded five-author CHI 2026 extended abstract, article 860, DOI `10.1145/3772363.3799378`; includes object-detection-assisted selective manipulation | Canonical institutional/publisher record checked |
| *Demokritos* | Author order is Santiago Ferrando, Christian Clark, Tomas Laurenzo; ISEA 2025 proceedings contribution presented in the poster programme | Programme and author publication record checked |
| ShaderGPT by 14islands | Separate 2025 experiment at `shadergpt.14islands.com`, announced by 14islands in February 2025 | Creator record and live project checked |
| `shadergpt.com` | Separate account-based service with its own operator, interface, and privacy policy; its policies must not be attributed to 14islands | Service and policy checked; mutable |
| LUMEN | Repository account `Leonxlnx`; GitHub display name “Leon Lin” is display metadata, not an independently verified byline | Repository checked; byline remains limited |
| TWDNE | Gwern’s primary implementation record states 100,000 images, 100,000 text snippets, fifteen-second replacement, pause, and no rewind/history | Primary project record checked |
| Quiroz and Dascalu | 2016 procedural vertex-shader system and 2017 *Interactive Shape Perturbation* follow-up are distinct records | Manuscript records checked |

These entries remain subject to final manuscript-level human reading and bibliographic formatting.

## 4. Art-historical and media-theoretical additions

The earlier genealogy overemphasised technical neighbours. The revised document gives central status to:

- Wendy Hui Kyong Chun, “The Enduring Ephemeral, or the Future Is a Memory”;
- Matthew G. Kirschenbaum, *Mechanisms*;
- Felix Gonzalez-Torres’s candy works and paper stacks;
- Tino Sehgal’s constructed situations;
- gift and circulation scholarship where actually used;
- algorithmic identity and recommender-system scholarship;
- relational aesthetics together with its critiques;
- free-software publics and executable circulation.

Current verification boundary:

- publisher and institutional records have been checked for bibliographic and project descriptions;
- these sources must still be read in the form cited before manuscript submission;
- structural comparison does not establish equivalence of historical, political, embodied, or memorial content.

In particular, comparison with Gonzalez-Torres concerns taking, circulation, replenishment, and endless supply. It must not appropriate the bodily, mourning, AIDS-related, or political meanings of the works.

## 5. Implementation-related claim correction

The genealogy and project documents now distinguish the implemented alpha from future technical research.

### Implemented

- twelve authored GLSL families;
- bounded scalar traits and palette record;
- seeded deterministic generation;
- local selection and recent non-repetition;
- optional model proposals over traits and family choice;
- random and authored comparison baselines;
- executable exports.

### Not implemented

- general typed AST;
- arbitrary node insertion or removal;
- topology rewiring;
- unrestricted structural synthesis;
- model-generated new families;
- evidence that model proposals outperform simpler baselines.

The source retains historical `graph` names for compatibility. Documentation must call the current representation a bounded family program.

## 6. Argument correction

The genealogy does not argue:

> No prior work has the exact same collection of properties.

It argues:

> TSDNE’s constraints form a motivated structure in which one generated process is temporarily available, replacement prevents interface retrieval, and executable source can circulate without exclusivity.

Each constraint answers a counter-model:

| Constraint | Counter-model or problem | Function |
|---|---|---|
| One object at a time | catalogues, population grids, authoring studios | removes simultaneous comparison |
| No interface return | saved histories and archives | makes replacement a withdrawal |
| Executable export | image-only generative sites | lets the process persist elsewhere |
| No ownership certificate | tokenised scarcity | separates circulation from exclusive title |
| Bounded local trace | immediate recurrence and central registries | reduces repetition without shared profiling |
| No preference model | recommender systems | avoids fitting output to a behavioural profile |
| Optional local model | mandatory cloud inference | makes model participation defeasible and inspectable |
| Explicit provenance | generic AI authorship claims | distinguishes procedural, authored, random, and model actions |

This is an argument about necessity and coherence, not vacancy.

## 7. Conceptual claim correction

### Memory and forgetting

“The system remembers so that the encounter can forget” is retained as a project figure. It is not presented as a new theory or a research result. It requires direct engagement with Chun, Kirschenbaum, and related scholarship.

### Personalisation

“Personal without personalisation” is an open empirical and conceptual question. TSDNE does not currently individualise output to a person. It permits personally meaningful encounter without a preference model, which is not by itself unique to this artwork.

### Behavioural trace

The local encounter record is a behavioural trace in the descriptive sense. The defensible claim is that it is bounded, clearable, local, not uploaded, not attached to an account, and not interpreted as preference.

### Disappearance

The shader does not disappear universally. It becomes unavailable through the TSDNE interface after replacement. Seeds, files, caches, storage, and exported source may persist.

## 8. Claim register

| Potential claim | Status | Permitted formulation |
|---|---|---|
| “First AI-generated shader artwork” | False | LLM shader tools and publications precede TSDNE |
| “First browser shader generator” | False | Browser-native shader authoring and generation have substantial precedents |
| “No similar work exists” | Unprovable | No work located in this bounded review was found to realise the same withdrawal-and-transfer structure |
| “Every shader is unique” | Unprovable | Candidates have computational identities; recent repetition is reduced locally |
| “The shader disappears” | Too broad | Replacement removes interface retrieval; computational traces may persist |
| “The visitor owns the shader” | Misleading | The visitor receives non-exclusive reusable source |
| “The model creates or improves the shader” | Unsupported | The model proposes bounded changes that may be rejected; advantage requires comparison |
| “The system personalises without profiling” | Unsupported | The current system does not fit output to a person; personal meaning remains an empirical question |
| “Local AI is private” | Too broad | Inference executes locally after disclosed runtime and model requests; upstream and browser conditions remain |
| “The local trace is not behavioural data” | Too broad | It is a bounded local encounter trace not interpreted as preference or linked to identity |
| “The animation is safe” | Unsupported | A conservative dense luminance-change heuristic is implemented; external evaluation remains required |
| “Local AI is environmentally preferable” | Unsupported | Device-side memory, energy, and hardware costs require measurement |
| “The project discovered a new digital-memory principle” | False/unsupported | The implementation is interpreted through established media theory |

## 9. Mutable records

Recheck at manuscript or release freeze:

- current WebLLM version, runtime host, model catalogue, and browser support;
- model licences, provenance statements, and file hosts;
- LUMEN features, repository status, and licence;
- both ShaderGPT services and their data practices;
- platform policies for ShaderToy, Artbreeder, and Art Blocks;
- browser support for WebGPU, IndexedDB, OffscreenCanvas, and related APIs;
- exact proceedings form and pagination for sources lacking a stable publisher record;
- exhibition and institutional descriptions that may change URLs.

## 10. Human-read requirement

Before submission:

1. open every source in the form being cited;
2. read the relevant passage in context;
3. read complete sources carrying central theoretical weight;
4. verify all quotations and paraphrases;
5. check author order, title, venue, year, pagination, and DOI;
6. remove sources that remain leads only;
7. rewrite the argument in the author’s own voice;
8. disclose machine assistance according to venue policy.

Repository metadata, search snippets, and this file are research aids. They are not substitutes for scholarly reading.
