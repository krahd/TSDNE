# Response to the critical audit of 4 August 2026

**Document addressed:** [`CRITICAL-AUDIT-2026-08-04.md`](CRITICAL-AUDIT-2026-08-04.md)  
**Response date:** 4 August 2026  
**Status:** internal remediation record; not external validation

## 1. Scope correction

The critical audit examined:

- the latest Markdown available at the time of the audit;
- an earlier snapshot of the JavaScript implementation.

Its conceptual, bibliographic, and documentation findings were therefore treated as current. Every code finding was rechecked against the latest `main` before remediation. Several findings remained valid; two runtime-pinning findings had already been partially addressed.

This response does not invalidate the audit because its code snapshot was stale. It distinguishes:

- **confirmed:** present in the latest code or documentation;
- **superseded:** no longer present when checked;
- **addressed:** changed in response;
- **deferred:** requires visual, empirical, legal, or external evaluation;
- **accepted as tension:** not a defect to remove, but a contradiction the work should stage explicitly.

## 2. Code findings

| Audit finding | Recheck | Disposition |
|---|---|---|
| No typed AST despite documentation | Confirmed | Documentation now describes a bounded family-and-trait program. The internal `graph` name is retained for compatibility. Typed AST synthesis is future research, not an implemented feature. |
| Model restricted to twelve floats | Confirmed in audited form | The model may now propose a bounded family change as well as trait changes. Within-family control remains parametric. No claim of general structural synthesis is permitted. |
| Empty proposal silently replaced and attributed to WebLLM | Confirmed | Removed. Empty or materially ineffective proposals are rejected. No authored fallback is labelled as a model proposal. |
| Model value indistinguishable from random mutation | Confirmed as an unresolved evidential problem | Random and authored baselines are implemented. The repository now requires an ablation before claiming model benefit. |
| Three sparse frames cannot screen high-frequency flashing | Confirmed | Sparse samples remain for aesthetic descriptors. A separate dense temporal screen now samples consecutive frames and rejects repeated large-area luminance transitions. It is explicitly described as a heuristic, not certification. |
| Undisclosed remote WebLLM runtime | Confirmed | The exact runtime version and `esm.run` host are disclosed. Local AI is opt-in and off by default. Model-host requests are also disclosed. Vendoring remains preferable before a durable release. |
| Unpinned WebLLM runtime | Superseded before this response | The runtime and worker already referenced a fixed WebLLM release. The remaining issue was remote execution without integrity pinning or vendoring. |
| `npm audit` presented as proof of no runtime dependency | Confirmed in documentation | Removed from the verification argument. The remote runtime is treated as a runtime dependency outside npm’s audit scope. |
| First passing candidate rather than candidate selection | Confirmed | The runtime now seeks four valid candidates and selects using recent distance and family coverage. This remains a modest heuristic, not aesthetic optimisation. |
| “Release candidate” for an unvalidated alpha | Confirmed | README and status now say alpha. Public-release gates are listed explicitly. |

## 3. Bibliographic and factual findings

| Audit finding | Disposition |
|---|---|
| Demokritos author order wrong in the genealogy | Corrected to Santiago Ferrando, Christian Clark, Tomas Laurenzo. |
| Two ShaderGPT projects conflated | Separated: the 14islands experiment announced in 2025 and the unrelated account-based `shadergpt.com` service are treated as distinct projects. |
| ShadAR records conflated | Separated into the IEEE ISMAR-Adjunct 2025 publication, the February 2026 arXiv author manuscript linked to that publication, and the expanded five-author CHI EA 2026 system using object detection. |
| LUMEN byline uncertain | Attributed to the repository account `Leonxlnx`, with the GitHub display name noted only as display metadata. |
| TWDNE corpus size insufficiently checked | Numerical corpus-size language removed from the argumentative summary unless verified directly against Gwern’s implementation record. |
| Demokritos called a “poster/proceedings record” | Rewritten as an ISEA 2025 proceedings contribution presented in the poster programme. |
| “a authored” typo | Corrected. |

## 4. Missing artistic and theoretical lineages

The audit correctly identified an imbalance: the genealogy was strong on technical systems and weak around the work’s central gesture. The following are now central:

- Wendy Hui Kyong Chun, “The Enduring Ephemeral, or the Future Is a Memory”;
- Felix Gonzalez-Torres’s candy works and paper stacks, especially taking, depletion, replenishment, endless supply, and circulation outside the displayed work;
- Tino Sehgal’s constructed situations and refusal of material documentation;
- Matthew G. Kirschenbaum’s distinction between formal and forensic materiality;
- gift and circulation scholarship where used;
- algorithmic identity and recommender-system scholarship where “personalisation” is discussed;
- relational-aesthetics claims together with their critiques rather than as unopposed affirmation.

The sentence “the system remembers so that the encounter can forget” is retained only as a project figure. It is not presented as an original theoretical result and must be situated through Chun, Kirschenbaum, and related scholarship.

## 5. Conceptual dispositions

### 5.1 Withdrawal rather than technical vacancy

Accepted. The project’s strongest realised structure is:

> one object, no return, take the source

The paper and README now lead with withdrawal, non-retrieval, performed loss, and executable transfer rather than technical novelty or a six-property conjunction.

### 5.2 “Personal without personalisation”

Accepted as an unresolved problem. The phrase conflated:

- personally meaningful encounter;
- system-level fitting to an individual.

TSDNE may enable the first while refusing the second, but this does not by itself distinguish the work from ordinary aesthetic experience. The phrase is now a research question, not the paper’s established thesis.

### 5.3 Interface loss versus reproducible substrate

Accepted as a constitutive tension. The project now states:

- the interface can withdraw access;
- the system cannot prove universal deletion;
- deterministic regeneration and exported source complicate disappearance;
- the gap between performed loss and recoverable computation is part of the work.

### 5.4 Politics located in paratext

Partly accepted and addressed. The ordinary visual field remains minimal, but **about** now exposes:

- the bounded local encounter trace;
- the absence of a preference model;
- external runtime and model requests;
- opt-in local AI;
- model-proposal attribution and rejection;
- licensing limits;
- the status of visual-safety screening.

The project should not cite seamful design unless these conditions remain inspectable in the encounter.

### 5.5 Local history as behavioural trace

Accepted. The repository no longer denies the category absolutely. It makes the narrower claim that the trace is bounded, local, clearable, not uploaded, not attached to an identity, and not interpreted as taste.

### 5.6 Proposed atlas

Removed from the core specification. A later visitor-built archive could become a separate and deliberately contradictory work, but it cannot be included casually in a project whose encounter refuses retrieval and canonical accumulation.

### 5.7 CC0 and property

Accepted. GPL on the authored generator is the substantive free-software commitment. CC0 is described as a clarifying waiver to the extent waivable rights exist, not as relinquishment of a property right that necessarily attached to every output.

### 5.8 AI as weakest component

Accepted as a research risk. Local AI remains optional and off by default. Three outcomes remain legitimate:

1. model proposals outperform matched baselines;
2. no meaningful difference is found and reported as a negative result;
3. the model is removed from the public artwork.

The current repository does not choose among these outcomes in advance.

## 6. Title disposition

The title is retained provisionally, but its inversion is now explicit:

> The shader does exist: it is executable, inspectable, and transferable.

The title cites and contradicts the synthetic-image genre rather than claiming that a generated shader lacks material or computational existence. Renaming remains possible after aesthetic and public testing.

## 7. Documentation provenance

The audit’s criticism of machine register and machine-certified verification is accepted.

Actions:

- added [`AI-USE-STATEMENT.md`](AI-USE-STATEMENT.md);
- removed third-person self-description from the project specification;
- reduced “agreed”, “frozen”, and premature completion language;
- separated implementation facts, interpretive propositions, hypotheses, and future work;
- prohibited treating search snippets or machine-produced source summaries as completed human verification;
- retained the audit and this response as internal records rather than external endorsement.

## 8. Deferred gates

The following cannot be repaired by prose or unit tests:

- visual quality across 200 or more rendered encounters;
- whether family repetition becomes obvious;
- whether withdrawal produces attachment, regret, or changed stopping behaviour;
- whether visitors understand executable transfer;
- whether local-model proposals differ meaningfully from random and authored baselines;
- clinical or standards-level photosensitive-content evaluation;
- browser, mobile, assistive-technology, and export-host validation;
- model provenance, energy, and licensing assessment;
- editorial transformation into Tomas Laurenzo’s final authorial voice.

Until these gates are completed, the repository remains an alpha and the practice-based article remains preparatory.

## 9. Current claim boundary

Permitted:

> TSDNE realises a browser encounter in which one generated shader is available at a time, replacement prevents interface retrieval, and executable source may be taken into another context without exclusivity.

Not yet permitted:

> The work produces attachment, regret, personalisation, superior AI variation, clinically safe motion, global uniqueness, or a new theory of digital memory.

---

*Internal remediation record. Machine-assisted, reviewed within the project, and not independent peer review.*
