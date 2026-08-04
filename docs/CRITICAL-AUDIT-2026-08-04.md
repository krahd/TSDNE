# Critical audit of *This Shader Does Not Exist*

**Date:** 4 August 2026
**Scope:** all Markdown in the repository, the `prototype/` source, `tests/`, and the git history, checked against external sources where claims are verifiable.
**Author:** Claude (Opus 5), at Tomas Laurenzo's request.

## 0. What this document is

This is an adversarial reading, not a peer review and not an endorsement. It was produced by a language model with web access in a single session. It reads the repository against itself (documentation versus code), against the record (citations versus sources), and against the artistic and theoretical fields the project claims to enter.

It is deliberately unbalanced toward problems. Section 11 lists what is genuinely working, so that the ratio here is not mistaken for the ratio in the project.

The repository already contains a commit titled `b6fc0fe Remove misleading self-audit document`. That instinct was correct. This document should carry the same caveat permanently: **it is an internal machine-assisted critique and must never be cited as external validation.**

---

## 1. Verdict

**Is the project redundant?** Partly, and along a predictable axis.

- **As a technical artefact: currently redundant.** A browser-native WebGL2 generative shader system with seeded variation, several visual families, and multi-format export is an occupied space. [LUMEN](https://github.com/Leonxlnx/lumenshaders) — which the genealogy already names — is a zero-dependency static page with nine WebGL2 modes, perfect-loop animation, share codes, and PNG/WebM/GIF export, built by one person. It does most of what `prototype/` does and more. "LLM mutates a shader" is likewise occupied: AIShader (2023), Demokritos (2025, your own), ShaderGPT, and *AI Co-Artist*, which appeared at EvoMUSART 2026 four months ago (verified: LNCS 16523, pp. 192–206).
- **As an interaction structure: not redundant, and genuinely rare.** One object, no return, and *take the source* is not a configuration I could find realised anywhere. Its nearest relatives are not technical at all — they are art-historical, and the genealogy misses both of the important ones (§7).
- **As a theoretical contribution: at risk of redundancy it does not know about.** The project's most quotable line, "the system remembers so that the encounter can forget," restates the central argument of Wendy Chun's "The Enduring Ephemeral, or the Future Is a Memory" (*Critical Inquiry* 35:1, 2008, pp. 148–171) — that digital media conflate memory with storage, and that regeneration, not retention, is what endures. That paper has ~114 Crossref citations and is on every new-media syllabus. Presenting the formulation as a project result, in a repository that cites Couldry, Kleppmann, and DiSalvo but not Chun, will read to a media-studies reviewer as either unawareness or appropriation. This is the single most consequential omission in the repository.

**Is there a real path?** Yes, but not the one currently written down. The path runs through the *withdrawal structure*, not through the generator and not through the local model. The current plan (journal-first, AI in the title, technical genealogy as the centre of gravity) points at the project's three weakest assets. §10 sets out the alternative.

**The headline problem.** 3,345 lines of documentation, a 987-line genealogy with ~120 citations, a frozen architecture, a paper plan with a journal ranking — around roughly 55 KB of JavaScript that, by the project's own admission (`docs/PROTOTYPE.md:40`), **has never been rendered on a GPU.** Git history shows the entire corpus was produced between 3 August 18:48 and 4 August. Meanwhile `docs/PROJECT.md:19` states: "Visual quality is a constitutive artistic requirement." The project's only non-negotiable criterion is the one thing nobody has ever observed. Everything else in this audit is secondary to that.

---

## 2. Documentation versus implementation

These are the most serious findings, because in each case a public document describes a system that the code does not contain. Anyone who reads the repository and then opens `prototype/src/` will find them in minutes.

### 2.1 There is no typed graph, no AST, and no mutation ontology

`docs/ARCHITECTURE.md:19–34` specifies a typed AST whose nodes declare input/output types, coordinate domain, admissible parents and children, numerical stability conditions, and semantic tags. `docs/HYBRID-WEBLLM.md:129–141` specifies a bounded mutation vocabulary: `insert`, `remove`, `replace`, `rewire`, `retime`, `repalette`, `duplicate`, `invert`, `attenuate`, `amplify`, `simplify`. `docs/HYBRID-WEBLLM.md:101–115` shows the model returning operations targeting `warp[0].type`.

What `prototype/src/generator.js` actually constructs:

```js
{ schema: "tsdne-graph-v2", generator: "tsdne-alpha-2",
  family: <one of 12 strings>, seed: [...], traits: {...}, palette: {...} }
```

A family label, a seed, twelve scalar traits, and a palette record. There is no graph, no node typing, no topology, no admissible-child relation, nothing to rewire. Every family is a hand-written GLSL template parameterised by the same twelve knobs.

This is a legitimate and sensible implementation. It is not the implementation the documents describe, and §8 of the planned paper ("Bespoke AI and divided agency") is written about the absent one.

### 2.2 The model's entire action vocabulary is twelve floats

`prototype/src/ai.js` — `mutationSchema()` — permits exactly:

```
{ changes: { scale, tempo, density, turbulence, contrast, palette,
             complexity, rotation, symmetry, softness, drift, depth }  // each -1..1
  intention: string(≤160) }
```

`mutateCandidate()` applies these at `step = 0.22` and clamps to [0,1]. **The model cannot change family.** It cannot alter structure, topology, or anything the `PROJECT.md` calls constitutive. It can nudge twelve numbers by at most ±0.22 inside a fixed template.

`docs/PROJECT.md:46` states: "Variation must occur in structure, not merely palette or numeric parameters." The local model — the component the first paper is named after — operates *exclusively* in the register the specification forbids.

The consequence for the paper is severe and worth stating bluntly: **a 0.5B model emitting twelve bounded floats is not distinguishable, by any evidence currently in this repository, from a random number generator.** "The AI is consequential but not sovereign" (`README.md:35`) asserts consequence that has not been demonstrated and, on this architecture, may not exist. A reviewer at EvoMUSART or Digital Creativity will ask for the ablation. There isn't one.

### 2.3 A hidden branch manufactures the appearance of model agency

`prototype/src/generator.js`, in `normaliseMutation()`:

```js
if (Object.values(result).every(v => Math.abs(v) < .06)) {
  result.palette = .28; result.turbulence = -.18; result.drift = .16;
}
```

When the model proposes nothing meaningful, the system silently substitutes a fixed authored mutation and attributes the result to `origin: "webllm"` with `model: <id>` in the encounter record.

For any project this is a small hack. For *this* project — whose thesis is the honest division of agency between authored system, model, and visitor, and whose verification log contains a claim register entry rejecting "The model creates the shader" as an "incorrect division of agency" — it is a falsified attribution written into the exported artefact. It must either be removed, or surfaced (`origin: "fallback-mutation"`), before anything is published or deployed. It is exactly the kind of detail that turns a good paper into a retraction.

### 2.4 The flash-safety claim is not supported by the metric

`README.md:63` and `ACCESSIBILITY.md` both claim "candidate rejection for extreme temporal change and high flash ratios."

`prototype/src/main.js`: `SAMPLE_TIMES = [.73, 2.11, 4.47], SAMPLE_SIZE = 64`.

Three 64×64 frames, sampled 1.4 s and 2.4 s apart. `flashRatio` in `perception.js` counts pixels whose luminance differs by >120 between two of those frames. Photosensitive risk is defined by transitions at ≥3 Hz over a sufficient visual field. A shader flashing at 10 Hz will, with high probability, present near-identical luminance at t=0.73 and t=2.11 and pass the gate. The metric detects *slow* luminance drift and is close to blind to *flashing*.

The documents do correctly disclaim clinical seizure safety, which is good practice. But the affirmative claim — that candidates are rejected for high flash ratios — describes protection that does not exist, and it appears in the two documents a cautious visitor would actually read. Either implement dense temporal sampling (≥60 samples/s over ≥5 s, luminance-weighted over screen area, per the Harding/WCAG 2.3.1 approach) or delete the claim. Do not ship it as written.

### 2.5 Runtime code is fetched from a third-party CDN

`prototype/src/ai.js` and `ai-worker.js`: `https://esm.run/@mlc-ai/web-llm@0.2.84`.

Three consequences the documents do not acknowledge:

- `PRIVACY.md` discloses that "the local AI model is downloaded from its external model host." It does not disclose that the *inference library itself* is fetched from jsDelivr, which is a separate host receiving a separate request with IP and user agent.
- `docs/PROTOTYPE.md:36` — "`npm audit` reports no vulnerabilities because the project has no installed runtime dependencies" — is technically true and substantively misleading. The project has a runtime dependency; it is simply not installed via npm. `npm audit` returning clean here is evidence of nothing and should not be listed under "Automated verification."
- Executing unpinned-by-hash remote code in a GPL artwork is a supply-chain surface, in a repository that contains a section on shader-pipeline security and cites DarthShader. Vendor the library, or pin with SRI.

### 2.6 Version and status inconsistency

`package.json` says `0.1.0-alpha.1`. `CHANGELOG.md` says `0.1.0-alpha.1`. `README.md:11` and `STATUS.md:5` say "release candidate." `docs/PROTOTYPE.md` is titled "Release-candidate implementation record" and simultaneously records that visual validation could not be performed.

An alpha that has never been executed is not a release candidate. The word inflates the state of the work in the most publicly visible file. Given that `RELEASE-CHECKLIST.md` exists and is unticked, the honest status is "alpha, unrendered."

---

## 3. Citation and factual errors

The genealogy's citation work is, on the whole, better than most published related-work sections. I verified a sample directly and the hard ones held: *AI Co-Artist* is genuinely EvoMUSART 2026, LNCS 16523, pp. 192–206, DOI `10.1007/978-3-032-24350-8_13`; Picbreeder's DOI, volume, and issue are right; the 128-bit birthday bound in `docs/ARCHITECTURE.md:15` (≈1.47 × 10⁻²¹ at 10⁹ encounters) is arithmetically correct; the WebLLM VRAM figures in `ai.js`, including the counterintuitive inversion where Llama 3.2 1B (879 MB) sits below Qwen2.5 0.5B (945 MB), match the real WebLLM model records.

The errors below are the exceptions.

### 3.1 Your own paper is miscited, with you as first author

`docs/GENEALOGY.md:66` — "*Demokritos* (Laurenzo, Ferrando & Clark, 2025)".

The actual author order, per your own publications page, is **Ferrando, Santiago, Christian Clark, and Tomas Laurenzo**. `docs/REFERENCES.md:67` has it right; the genealogy table has it wrong. Of every error in this repository, this is the one to fix first. A public repository that promotes its author to first position on a co-authored paper is a straightforward misattribution to two colleagues, and it is the kind of thing that is noticed.

### 3.2 ShaderGPT: two different projects conflated, wrong date

`docs/GENEALOGY.md:53, 337–341` describes "ShaderGPT (2026–)" at `shadergpt.com` as an account-based cloud authoring service collecting account information, shader code, usage data, and payment information.

There are at least two distinct things called ShaderGPT:

- **`shadergpt.14islands.com`** — an experiment by the Scandinavian studio 14islands, publicly announced in **February 2025**, comparing which LLM writes the best GLSL. This is the one with the press coverage (Slanted, Abduzeedo) and the one most readers will think you mean.
- **`shadergpt.com`** — a separate product carrying "© 2024 ShaderGPT", operated by an unrelated party ("all4ndev"), with sign-in and an empty community gallery.

Neither is "2026–". The genealogy has taken one project's name and press profile and attached another project's privacy policy to it. Since ShaderGPT functions in the argument as the *cloud counter-model* — the thing TSDNE's politics are defined against — a misidentified counter-model weakens the political argument specifically.

### 3.3 ShadAR: the "correction" in the verification log is itself wrong

`docs/GENEALOGY-VERIFICATION.md:26` records as a closed correction that the February 2026 arXiv posting is a "later author-manuscript upload" of the ISMAR-Adjunct 2025 paper.

The ISMAR-Adjunct 2025 citation is correct (DOI `10.1109/ISMAR-Adjunct68609.2025.00267`, pp. 959–960). But arXiv:2602.17481 is not the same manuscript: it describes a substantially extended system with an added object-detection and segmentation stage enabling selective manipulation. And there is a third version the repository misses entirely — an extended abstract in **CHI 2026**, DOI `10.1145/3772363.3799378`.

So a document whose purpose is to record verification contains a verification that was performed incorrectly and then marked closed. That is worse than the original error, because it certifies it. It also invalidates the document's implicit promise. Recheck every entry in the "Corrections closed" table before relying on any of them.

### 3.4 Minor

- `docs/GENEALOGY.md:54` dates LUMEN 2026 and names "Leon Lin". The GitHub display name for `Leonxlnx` is indeed "Leon Lin", so the attribution holds, but "Leon Lin" is a display name, not a verified byline — attribute as `Leonxlnx (Leon Lin)`.
- `docs/GENEALOGY.md:307`: "a authored visual vocabulary" — typo.
- `docs/GENEALOGY.md:41` states TWDNE served 100,000 pregenerated images. Verify the figure against Gwern's own implementation notes before it reaches a manuscript; approximate corpus sizes drift in secondary retellings.
- The Demokritos entry is described in `REFERENCES.md` as "ISEA 2025 poster/proceedings record." It is a proceedings paper (ISEA 2025, Seoul, May 2025). Fix the hedge.

---

## 4. Conceptual problems

These are not errors of fact. They are places where the argument, as written, will not survive a good reader.

### 4.1 "Personal without personalisation" equivocates on *personal*

This is the paper's title and its central claim, and it currently trades on two meanings:

- **individualised** — fitted to *this* person, which is what personalisation systems produce;
- **personally meaningful** — mattering to someone, which is what encounter and attention produce.

TSDNE delivers the second and explicitly refuses the first. But the second is not an alternative to personalisation; it is a property of practically every aesthetic encounter, including with objects that are identical for everyone. A random draw is not the opposite of profiling — it is the *absence* of any individualisation at all, which is the ordinary condition of art.

The sharpest form of the objection: *This Person Does Not Exist* — the project's own named precedent — is already "personal without personalisation" in exactly the sense TSDNE claims. So is a fortune cookie. The concept as stated does not distinguish TSDNE from the thing it inherits its title from.

There is a real argument nearby, but it has to be made rather than assumed: that the *combination* of singular delivery, irreversibility, and transferability constructs an attachment that random delivery alone does not, and that this attachment is structurally different from the attachment that recommender systems engineer. That is an empirical claim about visitors, which means the argument needs the user study that `docs/PAPER-1.md:127` currently declares optional. **The paper's title claim is the one claim that cannot be established from the realised artwork alone.**

### 4.2 The affective machinery and the honesty policy work against each other

The work's charge depends on the visitor believing the relinquished shader is gone and was singular. The project's admirable epistemic honesty — the claim register, the "no absolute uniqueness" language, `about` disclosing the local history — tells the visitor that it is neither: the seed is exported, the generator is deterministic, the space is inexhaustible, and IndexedDB has been keeping notes.

Refreshing is a wager only if something is at stake. Here, the visitor is discarding one draw from an infinite urn, and the interface tells them so. Regret requires scarcity the work refuses to manufacture.

This is a genuine and interesting tension — arguably the most interesting thing in the project — and no document names it. The way through is not to resolve it but to *stage* it: the work's subject becomes the gap between an interface that performs loss and a substrate that cannot lose anything. That is a much better paper than "personal without personalisation," and it is the one Chun's essay (§1) makes available and demands you engage.

### 4.3 The politics are paratextual

The refusals — no account, no analytics, no archive, no token, local inference — are real. But nearly all of them are *invisible in the encounter*. `docs/HYBRID-WEBLLM.md:189–196` explicitly requires that model status, branding, and inference statistics stay out of the visual field. What the visitor sees is a shader and two buttons.

So the political content lives in the artist statement, the README, and the paper — not in the work. A reviewer at *AI & Society* or *Convergence* will make exactly this point: not collecting data is the default behaviour of a static HTML page, and a negative virtue rendered imperceptible is a claim about the artist's intentions rather than a property of the artwork.

Note also the direct tension with the genealogy's own §5.5, which aligns the project with **seamful design** — showing the seams. A work committed to seamful design that hides its most politically loaded seam has an unresolved commitment. Either the seams surface in the encounter (a refusal that is *felt*, not merely declared), or the seamful-design lineage should be dropped from the paper.

### 4.4 "The system remembers so that the encounter can forget"

Beyond the Chun problem in §1: the mechanism underneath this sentence is a deduplication cache. Sixty-four-bit average hashes of three 64×64 frames, stored in IndexedDB, with a bounded window. The sentence is doing a great deal of conceptual work on top of an engineering commonplace.

That is not fatal — reframing infrastructure as poetics is legitimate artistic work, and the formulation is genuinely good. But `STATUS.md:44` presents it as "a further conceptual result," and it is not a result. It is a description. Present it as a figure, cite Chun, and let it earn its place.

Related: the claim that the local history is "not a behavioural profile" is a claim about *use*, not about *kind*. A per-device record of what a visitor was shown, in sequence, is a behavioural trace. The project's actual guarantee — bounded, local, clearable, never interpreted as preference, never uploaded — is strong and defensible. Say that, rather than denying the category.

### 4.5 The "atlas" reintroduces everything the work refuses

`docs/PROJECT.md:84` proposes "an atlas of places where claimed shaders later appear, submitted voluntarily by users."

That is a public archive, a canonical registry, and a light form of tracking — three of the eight named refusals in the necessity table. Voluntary submission mitigates the surveillance objection but not the archive objection. Either drop it, or make the contradiction explicit and interesting (the archive returns from outside, built by the visitors rather than the work). Right now it sits in the outputs list unexamined, and a reviewer will find it.

### 4.6 CC0 gives away what you may not own

`GENERATED-SHADERS-LICENSE.md` waives rights in generated shader source. In most jurisdictions, machine-generated output with no human author in the specific instance is unlikely to attract copyright at all — the "to the extent possible under law" hedge is correct and doing all the work.

The political framing ("relation without property") is therefore thinner than presented: the gesture gives away something the artist probably could not have held. The genuinely non-trivial gesture is the GPL on the generator — the thing that *is* authored and that *does* carry rights. The paper should lead with that and treat CC0 on outputs as a clarifying formality rather than a sacrifice.

---

## 5. The AI is the weakest component and carries the most weight

Consolidating §2.1–2.3 into the decision it implies.

**Costs, as built:** ~290 MB download, ~945 MB VRAM, WebGPU-only, HTTPS-only, ≥4 GB device memory, a third-party CDN, model provenance and training-labour questions the project honestly flags but cannot resolve, and energy displaced onto the visitor's device — all of which the genealogy's §8.3 correctly identifies as an equity and ecology problem, and then commits to anyway.

**Benefit, as built:** the model can move twelve parameters by ±0.22 within a fixed family, and when it fails, the system pretends it succeeded.

**Perceptibility:** zero, by design. Mode A is declared "a complete artwork, not a degraded error page." So on the project's own account, nothing is lost when the model is absent.

Three coherent responses:

1. **Cut it.** The work becomes cleaner, faster, universally accessible, ecologically defensible, and loses nothing the visitor can perceive. §9 of the paper (politics and material limits) gets *stronger*, because refusing local AI on device-inequality grounds is a sharper political act in 2026 than adopting it. Cost: you lose the "bespoke AI" framing and the EvoMUSART-shaped angle.
2. **Give it real power.** Let the model cross families, compose structures, or act on something the visitor can see. This requires building the typed graph the documents already describe — which is the honest way to close the §2.1 gap.
3. **Keep it and make the ablation the paper.** Run model-proposed mutations against random mutations against authored heuristics, blind, with human raters. If the model wins, that is a genuine finding about small local models in bounded artistic ontologies. If it loses, *publishing that* is a better and rarer contribution than most of what is at EvoMUSART — a negative result about bespoke local AI, from an artist, with the artwork as the apparatus.

Option 3 is the strongest research move and option 1 is the strongest artistic move. What is not viable is the current position: maximum claim, minimum capability, no evidence.

---

## 6. Aesthetic risk

Nothing in the repository establishes that the artwork looks good, and one structural feature suggests it may not look *varied*.

Twelve families with twelve shared scalar knobs is a small space *perceptually*, whatever its cardinality. A visitor who presses **another** thirty times will see each family two or three times. *This Person Does Not Exist* survives serial refresh because a face model's within-class variety is enormous; a template-with-knobs system's is not. `docs/PROJECT.md:20` promises to "minimise perceptual repetition"; the mechanism (a 64-bit aHash over three frames) can detect near-duplicates, but it cannot manufacture structural variety that the grammar does not contain.

This is testable today and should be, before anything else: generate 200 encounters, render them, and look. If families are recognisable as families within a session, the wager collapses — the visitor learns the alphabet and stops believing in abundance. That failure mode would invalidate the core interaction, and it is cheap to check.

Secondary: `MAX_ATTEMPTS = 72` is a rejection loop, not the "8–32 candidate batch with Pareto or family-specific selection" of `docs/ARCHITECTURE.md:61–73`. Thresholds without selection means the work shows the first thing that passes, not the best of several. That is a defensible artistic choice — but then the architecture document should say so, and the research strand on plural descriptors and family coverage has not begun.

---

## 7. Missing genealogy

The genealogy is thorough on the technical and computational axes and comparatively thin exactly where an art journal or an art jury will look. Four omissions are significant enough to be liabilities; all are verified.

1. **Wendy Hui Kyong Chun, "The Enduring Ephemeral, or the Future Is a Memory"** (*Critical Inquiry* 35:1, 2008, 148–171). Argues that digital media conflate memory with storage, and that what endures does so through constant regeneration rather than retention. This is the project's memory/forgetting thesis, published eighteen years ago. Non-negotiable citation.

2. **Felix Gonzalez-Torres, the candy spills** (*"Untitled" (Portrait of Ross in L.A.)*, 1991, and related). The visitor takes a piece and carries it away; the work depletes; the owner replenishes it; certificates govern ownership without governing the taken piece. This is *precisely* the structure of **use this shader** — appropriation without deprivation, custody separated from title, an "endless supply" that is nonetheless experienced as loss. It is the closest precedent in the history of art to TSDNE's central gesture, it is canonical, and it is absent. Any art-context reviewer will name it within a paragraph. Citing it also *strengthens* the project: it gives the gesture a lineage instead of an assertion.

3. **Tino Sehgal, constructed situations.** Ephemeral works sold without documentation, without written contract, without photographs — the artwork exists only in encounter and transfers by verbal agreement before witnesses. This is the strongest available precedent for refusing the archive as a constitutive artistic decision rather than a technical setting, and for the difference between "not recorded" and "destroyed."

4. **Matthew Kirschenbaum, *Mechanisms* (MIT Press, 2008)** — forensic versus formal materiality. The project's distinction between "unverifiable deletion" and "unavailable through the interface" *is* Kirschenbaum's distinction, and he supplies the vocabulary already.

Also worth adding, in descending order of importance: **Marcel Mauss and Lewis Hyde on the gift** (the repository argues gift circulation without citing either); **Walter Benjamin on aura** (the "singular without scarcity" argument is a direct intervention in that debate and currently pretends the debate does not exist); **John Cheney-Lippold, *We Are Data*** (algorithmic identity, directly on "personal without personalisation"); **Nick Seaver, *Computing Taste*** (recommenders as culture); **Nicolas Bourriaud, *Relational Aesthetics*, with Claire Bishop's critique** (the "relation rather than property" claim is relational-aesthetics vocabulary; Bishop's objection — that relational work mistakes conviviality for politics — is the exact objection §4.3 raises here, and the paper should meet it head-on rather than be met by it); **Christopher Kelty, *Two Bits*** (free software as recursive public, for the user-programmer continuum).

Two more observations on the genealogy as a document:

- It is very long, and its length is itself a claim about how much prior work has been assimilated. `docs/GENEALOGY-VERIFICATION.md:140` correctly requires that every cited source be read in its cited form before submission. Given the corpus was assembled in roughly a day, that requirement currently applies to nearly all of it. Budget the reading time honestly — this is weeks, not an afternoon.
- The "necessity rather than conjunctive novelty" reframing (§3.1) is the best piece of argumentation in the repository. It is intellectually honest, it anticipates the strongest objection, and it converts a weak novelty claim into a defensible one. Keep it and lead with it.

---

## 8. The title

"This Shader Does Not Exist" is factually inverted: the shader *does* exist, more concretely than a StyleGAN face, and you can take it home and run it. The whole point of the work is that the object is real, executable, and portable.

Two ways to play this, and the project should choose consciously:

- **Exploit it.** The title is a lie the work refutes. "This X Does Not Exist" names a genre of synthetic images that are pure surface — and TSDNE hands you the process. Read that way the title is an argument, and the genealogy's §4.9 becomes a critique of the genre rather than an inheritance from it. This is a good move and nothing in the repository currently makes it.
- **Abandon it.** The format is a 2019 meme. In 2026 it reads as dated, it frames an artwork as a tech demo, it guarantees that every reviewer's first association is a GAN novelty site, and it puts the work in a lineage where it is derivative rather than one where it is unusual.

The trade-off is real: the title buys shareability at the cost of seriousness at art venues. Given that §10 recommends prioritising art venues, that trade-off currently points the wrong way — unless you take the first option and make the inversion explicit in the work itself.

---

## 9. Provenance of the documents

Said plainly because it will matter more than any single finding above.

The repository's prose has a consistent and recognisable machine register: uniform sentence length, heavy nominalisation, symmetrical bullet structures, pervasive "not X but Y" constructions, and section headers that promise deliberation ("Status: agreed direction", "agreed architecture", "Frozen architecture") over decisions that git shows were made within hours. The genealogy assembles ~120 citations in a working day.

This is not a problem in itself — it is a legitimate and productive way to work, and much of the output is good. It becomes a problem in three specific places:

1. **Submission.** A practice-based article arguing for honest, legible, bounded machine agency in artmaking, whose own text was substantially machine-generated without disclosure, is exposed to an obvious and damaging line of attack. Journals increasingly require an AI-use statement; this project has an unusually strong reason to write a candid one and, if handled well, an unusually good opportunity to make the disclosure part of the argument.
2. **Verification.** §3.3 shows what happens when a verification document is generated rather than performed: the error survives and is certified. Everything labelled "verified" in this repository should be treated as *drafted* until a human has opened the source.
3. **Voice.** The artist statement does not currently sound like you. `docs/PROJECT.md:62` describes "Laurenzo's practice" in the third person. The strongest asset in a practice-based submission is a distinctive authorial position, and it is the one thing the current documents do not have.

---

## 10. The path

Reordered from what `docs/PAPER-1.md` proposes.

### Immediate, before anything else

1. **Render it.** Open the prototype on a real GPU. Generate 200 encounters and look at all of them. This gates every other decision in the project, and it costs an afternoon.
2. Fix the Demokritos author order (§3.1).
3. Remove or relabel the fake-mutation branch (§2.3).
4. Fix or remove the flash-safety claim (§2.4).
5. Change "release candidate" to "alpha" everywhere (§2.6).
6. Add Chun, Gonzalez-Torres, Sehgal, Kirschenbaum (§7).

### Then decide the two forks

- **The AI fork** (§5): cut it, empower it, or make the ablation the research. Do not proceed with the current configuration.
- **The title fork** (§8): make the inversion explicit, or rename.

### Publication and visibility — invert the current plan

The journal-first strategy is wrong for this work at this stage. A practice-based article is only as strong as the realised practice behind it, and there is currently no deployment, no audience, no documentation, and no encounter data. *Digital Creativity* and *Leonardo* will both ask what happened when people used it.

Recommended order:

1. **Deploy publicly.** Nothing in the research programme is possible without it. Static hosting; the infrastructure is already written.
2. **EvoMUSART 2027** (submissions ~November 2026). The venue just published *AI Co-Artist* and *EvoArtist* — both LLM-driven evolutionary generation with explicit optimisation and populations. TSDNE positioned as the deliberate counter-argument (no population, no visible optimisation, no comparison, irreversibility as method) would land in a receptive room *and* be the interesting paper in the session. If you take option 3 of §5, the negative result on bespoke local AI is a genuinely rare and valuable submission there.
3. **ISEA and SIGGRAPH Art Papers / Art Gallery.** Exhibition is what a work about encounter actually needs, and it generates the documentation and audience the journal article requires. It also builds directly on the Demokritos presence.
4. **Then the journal.** *Leonardo* or *Digital Creativity*, written after the work has been shown, with real encounter documentation. Reframed: not "personal without personalisation" (§4.1), but the gap between an interface that performs loss and a substrate incapable of losing anything (§4.2) — with Chun, Gonzalez-Torres, and Kirschenbaum as the theoretical spine.
5. **The perceptual-similarity paper** (research strand B) is the most technically publishable component and the least developed. "When are two dynamic shaders the same?" is a real open question with a real method, and it is currently a 64-bit aHash. Treat it as a separate, later, honest technical paper — or drop the strand rather than gesture at it.

### On redundancy, finally

The generator is replaceable and should stop carrying argumentative weight. What is not replaceable is the withdrawal structure — one object, no return, take the source — and its art-historical lineage is strong, unoccupied in a computational medium, and currently uncited. **Build the work around the gesture, not around the pipeline.** Every hour spent on the shader grammar competes with LUMEN and loses; every hour spent on what it means to hand someone a running process and then close the door does not compete with anything.

---

## 11. What is genuinely working

To keep the balance honest:

- **The necessity-not-vacancy reframing** (`GENEALOGY.md:75–88`) is genuinely good scholarship and pre-empts the obvious attack.
- **The claim register** (`GENEALOGY-VERIFICATION.md:98–112`) is a discipline most projects never impose on themselves. Ten claims, each with a permitted formulation. That table should survive into the paper.
- **The computational / perceptual / encounter identity distinction** is clean, useful, and does real work. It is the project's most transferable conceptual contribution.
- **Refusing to claim global uniqueness**, refusing NFT logic, refusing "local AI is ethical," refusing to read dwell time as preference, and refusing an environmental claim without measurement — that is five separate opportunities to overclaim, declined. It is unusual and it is right.
- **The citation accuracy is above average** where I could check it. The 128-bit birthday bound is correct. The WebLLM VRAM figures are correct, including the counterintuitive one. The *AI Co-Artist* citation, which looked like the most likely fabrication in the document, is exactly right down to the page range.
- **The Demokritos relation is stated openly** rather than buried, and the transformation is articulated specifically.
- **The interaction gesture is good.** One object, no return, take the code. That is a real artwork's worth of idea, and it survives everything in this audit.

---

## 12. Line register

| File | Line(s) | Finding | Severity |
|---|---|---|---|
| `docs/GENEALOGY.md` | 66 | Demokritos author order wrong; self promoted to first author | **critical** |
| `prototype/src/generator.js` | `normaliseMutation` | Hardcoded fallback attributed to the model | **critical** |
| `README.md`, `ACCESSIBILITY.md` | 63 / body | Flash-rejection claim unsupported by 3-sample metric | **critical** |
| `docs/PROJECT.md` vs `prototype/src/ai.js` | 46 / `mutationSchema` | Model confined to the register the spec forbids | high |
| `docs/HYBRID-WEBLLM.md` | 101–141 | Mutation ontology does not exist in code | high |
| `docs/ARCHITECTURE.md` | 19–34 | Typed AST does not exist in code | high |
| `docs/GENEALOGY-VERIFICATION.md` | 26 | Closed "correction" is itself incorrect; misses CHI 2026 version | high |
| `docs/GENEALOGY.md` | 53, 337–341 | Two ShaderGPTs conflated; date wrong; counter-model misidentified | high |
| `README.md`, `STATUS.md` | 11 / 5 | "Release candidate" for unrendered alpha | medium |
| `prototype/src/ai.js` | `WEBLLM_URL` | Undisclosed third-party CDN; unpinned remote code | medium |
| `docs/PROTOTYPE.md` | 36 | `npm audit` cited as verification; "no runtime dependencies" false | medium |
| `docs/PROJECT.md` | 84 | Atlas reintroduces the archive | medium |
| `docs/ARCHITECTURE.md` | 61–73 | Candidate selection described but not implemented (`MAX_ATTEMPTS=72`) | low |
| `docs/GENEALOGY.md` | 307 | "a authored" typo | low |
| `docs/GENEALOGY.md` | 41 | TWDNE corpus size unverified | low |
| `docs/REFERENCES.md` | 67 | "poster/proceedings record" hedge; it is a proceedings paper | low |

---

*Machine-assisted internal critique, 4 August 2026. Not peer review. Not external validation.*
