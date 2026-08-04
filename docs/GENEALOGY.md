# Genealogy of *This Shader Does Not Exist*

**Status:** researched working genealogy  
**Reference date:** 4 August 2026  
**Scope:** art history, media art, human–computer interaction, computer graphics, shaders, procedural and evolutionary computation, artificial intelligence, browser-local inference, software studies, political economy, accessibility, security, preservation, and implementation practice.

## 1. Purpose and method

This document positions *This Shader Does Not Exist* (TSDNE) within the histories that materially precede it. It is not a list of works that merely use shaders, browsers, generative systems, or artificial intelligence. An item is included when it clarifies at least one constitutive feature of TSDNE:

- a browser encounter organised around one generated object at a time;
- replacement as an irreversible decision;
- procedurally generated moving images;
- executable source as the transferable object;
- typed or modular shader synthesis;
- artificial intelligence operating inside a bounded artistic ontology;
- local rather than server-side inference;
- individualisation without behavioural profiling;
- relation without exclusive ownership;
- apparent abundance combined with interface-produced scarcity;
- local novelty management without a false claim of global uniqueness;
- browser-specific questions of compatibility, security, accessibility, preservation, and material cost.

“Genealogy” is used rather than “prior-art search” because the relationships are heterogeneous. Some works are close formal precedents; some establish technical methods; some function as conceptual counter-models; others expose risks or limits. Similarity does not imply derivation, and the absence of a discovered exact predecessor does not establish priority.

### Evidence classes

- **P — primary:** artist or project site, repository, technical specification, standard, original paper, or first-party documentation.
- **I — institutional:** museum, archive, university, publisher, or recognised preservation body.
- **S — secondary:** criticism, journalism, or later historical synthesis. Used only when reception is relevant or a primary account is unavailable.
- **U — unresolved:** plausible relevance but insufficiently verified. These items are excluded from the main genealogy and retained only in the audit.

The research rule was to verify title, creator, date, operating principle, and technical claims against P or I sources whenever possible.

## 2. TSDNE in one sentence

TSDNE is a browser artwork in which a visitor encounters one continuously animated, computationally generated shader, may irreversibly relinquish it for another, or may take its freely reusable executable source; generation is immediate and local, while a small optional in-browser language model may propose bounded mutations that deterministic code validates.

## 3. Closest precedents and decisive differences

| Precedent | Shared element | Decisive difference from TSDNE |
|---|---|---|
| *This Person Does Not Exist* (Philip Wang, 2019) | “This X Does Not Exist” title; one synthetic output; refresh for another | Generated faces rather than executable processes; no source transfer, local inference, or anti-profiling/property argument |
| *This Waifu Does Not Exist* (Gwern, 2019–) | Serial refresh; attachment to transient generated figures; public-domain/CC0 intent | Static delivery of a large pregenerated corpus; not shader synthesis or browser-local generation |
| *This Rental Does Not Exist* (Christopher Schmidt, 2019) | Title family; plausible synthetic object; periodic replacement | Pregenerated listings assembled from several models; demonstration of synthetic plausibility rather than transferable executable art |
| Karl Sims, *Artificial Evolution for Computer Graphics* (1991) | Executable symbolic expressions generate images, textures, and animations; mutation and human selection | Population-based explicit optimisation; no single irreversible encounter or transfer relation |
| Andrej Bauer, *Random Art* | Typed expression trees; deterministic image generation; browser execution in later version | Still images from a stable input; no temporal relinquishment, local novelty search, or AI mutation |
| Picbreeder | Interactive evolution; executable image genotype; open-ended exploration | Persistent branching archive and public lineage rather than disappearance |
| Scott Draves, *Electric Sheep* | Endless generative animation; distributed evolution; open source; audience selection | Networked collective computation, voting, shared archive, and later editions/markets |
| John F. Simon Jr., *Every Icon* (1997) | Vast computational possibility space; one process unfolding in time | Exhaustive deterministic enumeration; no visitor choice, replacement, or export |
| Casey Reas, *Software Structures* and *Process* | Code, instruction, variation, and system as artwork | Authored software works rather than a one-at-a-time browser wager; no local AI |
| ShaderToy | Full-screen real-time browser shaders; visible source; large public corpus | Persistent editor, archive, ratings, profiles, and retrievability |
| Hydra (Olivia Jack) | Browser-native live-coded moving image; open source; shareable code | Performance instrument based on continuous authorial manipulation |
| Shader Park | Higher-level language compiled to shaders; compositional primitives | Creative coding environment, not autonomous synthesis or irreversible encounter |
| Material Maker | Node-graph procedural composition; reusable modules and export | Desktop authoring tool with explicit editing |
| Interactive Shader Format (ISF) | GLSL plus JSON metadata; portable generator/effect format | Interchange specification rather than artwork; useful export target for TSDNE |
| Quiroz and Dascalu (2016) | Browser application for interactive genetic programming of shader programs | Vertex transformations and population selection in an authoring prototype |
| Sasso, Loiacono, and Lanzi (2023) | Graph representation, mutation/recombination, feasibility heuristics, shader evolution | Unity editor extension seeded from an existing shader; designer-facing population workflow |
| Keijiro Takahashi, *AIShader* (2023) | LLM-generated shader code | Cloud ChatGPT API and Unity proof of concept; no typed ontology, novelty control, or artwork encounter |
| *AI Co-Artist* (Yuksel and Sawaf, 2025) | LLM-assisted iterative GLSL animation evolution | GPT-4-centred explicit co-creation interface; not local and not one-at-a-time |
| *ShadAR* (Mei et al., 2026) | Natural-language-to-shader generation and real-time compilation | AR authoring for user-specified perceptual transformations |
| *Demokritos* (Laurenzo, Ferrando, and Clark, 2025) | LLM-assisted shader generation; interaction; shaders as social objects | Community accumulation and self-improvement rather than singular encounter and relinquishment |
| WebLLM | Local in-browser LLM inference through WebGPU; structured generation | Runtime infrastructure, not artwork; model download, browser support, memory, and hardware remain dependencies |
| Art Blocks and *Chromie Squiggle* (2020) | Seeded generative code; live instantiation; computational identity | Blockchain allocation, editions, ownership, rarity, and secondary markets |
| Rafaël Rozendaal’s Art Website Sales Contract (2011) | Website as public artwork and transferable technical object | Canonical work remains privately collectable; TSDNE permits non-exclusive appropriation |
| Olia Lialina, *My Boyfriend Came Back from the War* (1996) | Browser-native work; consequential navigation; extensive remix history | Authored hypertext narrative rather than generated graphics |
| JODI and Alexei Shulgin’s *Form Art* (1997) | Browser and interface conventions treated as artistic material | Critical appropriation of interface form rather than generative image synthesis |

No verified precedent located in this review combines all of the following: **one-at-a-time generated shader encounter; irreversible relinquishment; freely reusable executable transfer; optional local LLM mutation; no behavioural profile; explicit rejection of proprietary scarcity**. This is a configuration claim, not a priority claim.

## 4. Chronological genealogy

### 4.1 Algorithmic and rule-based art

The algorithmic art practices of Frieder Nake, Vera Molnár, Georg Nees, Manfred Mohr, and related pioneers established that an artwork may be constituted by an algorithm and a field of possible outputs rather than one manually fixed image. Their importance to TSDNE is structural rather than stylistic:

1. instructions can be an artistic medium;
2. variation can remain legible as the consequence of authored constraints;
3. the realised image is one event in a larger possibility space;
4. technical procedure and aesthetic decision are not separable layers.

Sol LeWitt’s instruction-based work is an adjacent conceptual lineage: an executable specification may persist independently of any particular realisation. TSDNE literalises this relation by allowing the visitor to take source code capable of producing the moving image elsewhere.

Harold Cohen’s AARON is a particularly important artificial-intelligence ancestor. AARON was not a universal image service but a long-developed, artist-authored representational system. TSDNE’s optional model should be understood similarly as narrow agency inhabiting an artistic ontology rather than as an omnipotent chatbot. TSDNE distributes agency across authored graph rules, procedural generation, bounded model proposals, deterministic validators, and visitor decisions.

**Primary/institutional anchors:**

- Digital Art Museum, “The Pioneering Years”: https://dam.org/museum/artists/phase_1/
- Digital Art Museum, Vera Molnár: https://dam.org/museum/artists_ui/artists/molnar-vera/
- Whitney Museum, *Harold Cohen: AARON*: https://whitney.org/exhibitions/harold-cohen-aaron

### 4.2 Artificial evolution and open-ended image spaces

#### Karl Sims

Sims’s *Artificial Evolution for Computer Graphics* represented procedures as symbolic expressions and used evolutionary operations plus human selection to generate images, textures, and animations. It remains one of the clearest ancestors of typed procedural shader evolution. It established program trees as visual genotypes, mutation and recombination of executable representations, human aesthetic judgement as fitness, and exploration of a design space rather than direct construction of one image.

TSDNE adopts the program-space insight but withholds the population. Its visitor does not optimise among visible alternatives; replacing the current work is a decision made without seeing the next one.

- Karl Sims, “Artificial Evolution for Computer Graphics”: https://www.karlsims.com/papers/siggraph91.html

#### Interactive evolutionary computation

Hideyuki Takagi’s survey formalised the field in which human evaluation supplies fitness for evolutionary search. It also identifies evaluation fatigue, a relevant reason not to turn TSDNE into repeated rating or ranking. Dwell, replacement, or export may be studied as signals in a separate consented study, but they must not be silently equated with preference.

- Takagi, “Interactive Evolutionary Computation,” DOI: https://doi.org/10.1109/5.949485

#### Random Art

Andrej Bauer’s *Random Art* generates expression trees that describe images. The system is a useful technical ancestor for structurally valid, compositional image synthesis. Bauer’s later account also records the migration of the generator into the browser, making software ageing and dependency change part of the project’s history.

- https://math.andrej.com/2010/04/21/random-art-in-python/
- https://math.andrej.com/2010/08/17/random-art-and-the-law-of-rotten-software/

#### Picbreeder

Picbreeder enabled users to evolve images collaboratively. Images persisted as mathematical objects with branchable lineages. Its importance lies in open-ended stepping stones, executable genotype, mutation, and distributed human judgement. It is also an inverse model for TSDNE: Picbreeder’s value is public accumulation and genealogy; TSDNE ends the interface relation when the visitor chooses another.

- Secretan et al., “Picbreeder,” DOI: https://doi.org/10.1162/EVCO_a_00030

#### Novelty search and MAP-Elites

Novelty search replaces objective fitness with behavioural difference. MAP-Elites maps diverse high-performing solutions across user-defined feature dimensions. These methods support TSDNE’s intended use of plural descriptors, family coverage, and rejection of recent repetition. They do not justify a universal beauty function.

Appropriate roles are limited:

- avoiding immediate structural repetition;
- maintaining coverage across visual families;
- rejecting blank, clipped, static, or trivial failures;
- selecting from several valid candidates without reducing all values to one score.

- Lehman and Stanley, “Abandoning Objectives,” DOI: https://doi.org/10.1162/EVCO_a_00025
- Mouret and Clune, “Illuminating Search Spaces by Mapping Elites”: https://arxiv.org/abs/1504.04909
- Woolley and Stanley, novelty-assisted interactive evolution: https://arxiv.org/abs/1207.6682

#### Electric Sheep

*Electric Sheep* combines distributed generative animation, evolutionary selection, open-source software, and audience voting. It supplies a major ancestor for inexhaustible animated visual culture. Its networked collective archive and later collectable forms are decisive differences: TSDNE keeps production local, withholds a public corpus, and refuses editioned scarcity.

- https://electricsheep.org/
- https://github.com/scottdraves/electricsheep

### 4.3 Exhaustive and inexhaustible software artworks

John F. Simon Jr.’s *Every Icon* attempts to display every black-and-white configuration of a 32 × 32 grid. It makes a finite computational space experientially equivalent to infinity. TSDNE shares the tension between bounded program and perceived inexhaustibility, but uses seeded synthesis, motion, family variation, and local novelty control rather than exhaustive enumeration.

- Whitney Artport: https://artport.whitney.org/v1/everyicon.html

Casey Reas’s *Software Structures* and *Process* works translate instruction-based art into variable time-based systems. They establish software as both medium and visible behaviour. TSDNE adds one-at-a-time availability, source transfer, local AI, and a non-proprietary politics of circulation.

- https://reas.com/process
- https://processing.org/overview/

### 4.4 Browser and net-art genealogies

Early net art established that browsers, protocols, interface conventions, errors, windows, links, and HTML controls are artistic material. JODI’s works destabilised expectations of legibility and usability; Alexei Shulgin’s *Form Art* repurposed standard controls as graphic matter. TSDNE is less visibly antagonistic, but its browser materiality is constitutive: WebGL/WebGPU capability, loading, caching, compilation, device limits, local storage, and fallback behaviour all affect the encounter.

Olia Lialina’s *My Boyfriend Came Back from the War* made browser form, action, and narrative inseparable. Its remix history demonstrates how a work may continue through appropriation. TSDNE changes the consequence from branching narrative to relinquishment of a generated visual process.

The single-serving website is another formal ancestor. It reduces a domain to one gesture, function, image, or provocation. TSDNE shares this directness but combines it with real-time executable graphics and a deliberately narrow action vocabulary.

Rafaël Rozendaal’s Art Website Sales Contract distinguishes public access from private collection. TSDNE adopts the distinction between access and relation but rejects a canonical private owner: source export produces a usable copy without exclusion or control over other copies.

- Rhizome Net Art Anthology: https://net-art.org/net-art-anthology
- Rhizome, *My Boyfriend Came Back from the War*: https://rhizome.org/editorial/2016/nov/10/my-boyfriend-came-back-from-the-war/
- Whitney Artport Idea Line: https://artport.whitney.org/commissions/idea-line/textonly.html
- Rozendaal contract: https://www.artwebsitesalescontract.com/
- Rhizome ArtBase: https://artbase.rhizome.org/wiki/About
- Webrecorder: https://webrecorder.net/about/

### 4.5 “This X Does Not Exist” as interface genre

*This Person Does Not Exist* established the most recognisable version of the title and interaction: a synthetic object is shown with almost no interface; reloading produces another. It converted generative-model capability into an immediately understandable public demonstration.

The many successors turned the phrase into a genre. *This Waifu Does Not Exist* is especially relevant because its author documented implementation, pre-generated a very large corpus, attached generated text, and explicitly discussed compulsive replacement and regret. Its public-domain/CC0 position also makes it relevant to non-exclusive circulation. *This Rental Does Not Exist* combined StyleGAN imagery and trained text models into a new fictional listing every five seconds, foregrounding epistemic uncertainty about online representation.

TSDNE inherits the title family and one-output directness but changes the ontological object. The visitor receives an executable process rather than only an image. It also changes generation from server or pre-generated delivery to immediate browser procedure plus optional local model mutation.

The genre has also generated privacy research showing that “non-existent” synthetic faces can resemble training subjects or real identities. This is a warning against treating generated output as ontologically or ethically detached from source data.

- Design Museum, *This Person Does Not Exist*: https://designmuseum.org/exhibitions/ai-life-and-legacy/this-person-does-not-exist
- Gwern, *This Waifu Does Not Exist*: https://gwern.net/twdne
- Gwern implementation notes: https://gwern.net/blog/2019/twdne-website
- *This Rental Does Not Exist*: https://thisrentaldoesnotexist.com/about/
- Webster et al., “This Person (Probably) Exists”: https://arxiv.org/abs/2107.06018
- Tinsley, Czajka, and Flynn, “This Face Does Not Exist … But It Might Be Yours!”: https://arxiv.org/abs/2101.05084

### 4.6 Shader cultures, tools, and interchange

ShaderToy is the dominant reference for browser-visible fragment-shader culture: full-screen rendering, immediate execution, visible source, remixing, comments, profiles, rankings, and a persistent corpus. TSDNE uses the recognisable aesthetic and technical object but removes the editor, catalogue, social metrics, and retrievability.

The Book of Shaders, glslCanvas, glslViewer, and twigl made fragment-shader practice more accessible and portable. Hydra made browser-native image synthesis a live-coding and performance practice. Shader Park supplies a higher-level compositional language compiled to shader execution. Material Maker demonstrates procedural node-graph authoring and export. ISF demonstrates a portable shader-plus-metadata contract across audiovisual hosts.

These projects collectively validate TSDNE’s implementation choices:

- a typed or modular representation can protect validity;
- the same graph can transpile to more than one target;
- source and uniform metadata can form a portable object;
- browser-native execution can be artistically complete rather than a thin preview;
- accessibility of authoring does not require concealing computational structure.

- ShaderToy: https://www.shadertoy.com/
- The Book of Shaders: https://thebookofshaders.com/
- glslCanvas: https://patriciogonzalezvivo.com/2015/glslCanvas/
- glslViewer: https://patriciogonzalezvivo.com/2015/glslViewer/
- twigl: https://github.com/doxas/twigl
- Hydra: https://hydra.ojack.xyz/
- Shader Park: https://shaderpark.com/ and https://github.com/shader-park/shader-park-core
- Material Maker: https://www.materialmaker.org/ and https://github.com/RodZill4/material-maker
- ISF: https://isf.video/ and https://github.com/Vidvox/isf

### 4.7 Procedural and evolutionary shader synthesis

Quiroz and Dascalu developed a web application using interactive genetic programming to generate vertex shaders. Sasso, Loiacono, and Lanzi describe a graph-based procedural shader evolution tool with mutation, crossover, and feasibility-oriented heuristics. These works directly precede TSDNE’s typed graph, structural mutation, candidate generation, and validation layers.

The decisive shift is from an authoring environment to an encounter. TSDNE’s visitor is not asked to operate a genetic-programming tool. The evolutionary or novelty mechanisms remain backstage, and the public action vocabulary is restricted to staying, relinquishing, and taking.

- Quiroz and Dascalu: https://arxiv.org/abs/1608.05231
- Sasso, Loiacono, and Lanzi: https://arxiv.org/abs/2312.17587

Related procedural material systems such as MatFormer and text/image-to-procedural-material research show that graph structures can be generated or inferred while retaining editability. They are less direct artistic precedents but relevant implementation comparisons.

- MatFormer: https://arxiv.org/abs/2207.01044
- Hu et al., “Generating Procedural Materials from Text or Image Prompts”: https://arxiv.org/abs/2304.13172

### 4.8 LLM-generated shaders

Keijiro Takahashi’s *AIShader* is a concise early repository demonstrating ChatGPT-generated shaders inside Unity. *AI Co-Artist* frames LLM generation as iterative shader-animation evolution with user feedback. *ShadAR* uses natural-language intent to generate and compile shaders that transform an AR viewport. *Demokritos* treats LLM-generated shaders as community-centred, self-improving cultural objects.

TSDNE should cite all four, but it should not position itself as another unrestricted prompt-to-GLSL interface. Its distinctive technical decisions are:

- a procedural first image independent of model loading;
- a project-specific typed ontology;
- model output restricted to bounded mutation data rather than sovereign source generation;
- deterministic validation, compilation, and rejection;
- complete operation when the model is unavailable;
- no required account, prompt log, or paid API.

- AIShader: https://github.com/keijiro/AIShader
- Yuksel and Sawaf, “AI Co-Artist”: https://arxiv.org/abs/2512.08951
- Mei et al., “ShadAR”: https://arxiv.org/abs/2602.17481
- Laurenzo, Ferrando, and Clark, “Demokritos,” ISEA 2025

### 4.9 Browser-local artificial intelligence

WebLLM demonstrates high-performance in-browser language-model inference through WebGPU and browser runtimes. Transformers.js and ONNX Runtime Web provide adjacent browser inference infrastructures. They support a meaningful division between a remote generative service and software that runs on the visitor’s device.

Local execution, however, must not be equated with ethical innocence. It may reduce central prompt collection and API dependence, but it still involves:

- model weights produced elsewhere;
- training data and labour outside the encounter;
- network transfer of large artefacts;
- browser caches and local storage;
- unequal access to compatible GPUs and memory;
- electricity use shifted to the visitor;
- implementation-specific privacy and fingerprinting surfaces.

TSDNE’s political argument should therefore be precise: local inference changes where computation and data flow occur; it does not abolish extraction, provenance, inequality, or environmental cost.

- WebLLM paper: https://arxiv.org/abs/2412.15803
- WebLLM repository: https://github.com/mlc-ai/web-llm
- Transformers.js: https://github.com/huggingface/transformers.js
- ONNX Runtime Web: https://onnxruntime.ai/docs/tutorials/web/
- WebGPU specification: https://www.w3.org/TR/webgpu/

### 4.10 HCI: search, stopping, regret, and attachment

TSDNE’s interaction is a sequential search problem under uncertainty. The visitor evaluates the current object without seeing the next one and must decide whether to stop or continue. Relevant HCI and decision-science concepts include satisficing, reservation thresholds, information foraging, stopping behaviour, endowment, possession attachment, and subjective ownership.

These concepts should be used carefully:

- replacement is not evidence of dislike;
- dwell is not evidence of preference;
- export may indicate practical interest, attachment, curiosity, or collection;
- scarcity is produced by interface rules rather than low supply;
- regret is a possible interpretation, not an automatic psychological effect;
- a “choice overload” narrative is too generic because alternatives are sequential and hidden rather than simultaneously displayed.

A separate consented study could compare irreversible and reversible versions, history and no-history conditions, export availability, or claims about uniqueness. The public artwork itself need not collect behavioural data.

- Caplin, Dean, and Martin, “Search and Satisficing”: https://doi.org/10.1257/aer.101.7.2899
- Simon and Kadane, “Optimal Problem-Solving Search”: https://doi.org/10.1016/0004-3702(75)90002-8
- Pirolli, “Rational Analyses of Information Foraging on the Web”: https://doi.org/10.1207/s15516709cog0000_20
- Kogut, “Possession Attachment”: https://doi.org/10.1002/bdm.698
- Reb and Connolly, “Possession, Feelings of Ownership and the Endowment Effect”: https://www.cambridge.org/core/journals/judgment-and-decision-making/article/possession-feelings-of-ownership-and-the-endowment-effect/A726037DF9BECAA30A484183892D66C8

### 4.11 Reflective, seamful, and adversarial design

Reflective design and critical technical practice argue that systems should expose and question the assumptions embedded in technical construction. Seamful design treats boundaries, breakdowns, and infrastructural differences as potentially meaningful rather than always concealing them. Adversarial design treats designed artefacts as sites of political contestation.

For TSDNE, this supports:

- showing local-model state without turning it into a dashboard;
- preserving meaningful procedural fallback rather than declaring unsupported devices deficient;
- accurately naming local storage and model download;
- exposing divided agency between procedure, model, validator, and visitor;
- refusing claims of absolute uniqueness or automatic ethical superiority;
- treating compatibility differences as part of the artwork’s material conditions.

Key references include Phoebe Sengers et al., “Reflective Design”; Philip Agre, *Computation and Human Experience*; Carl DiSalvo, *Adversarial Design*; and Matthew Chalmers and related seamful-design work.

### 4.12 Individualisation without profiling

Contemporary personalisation usually means prior modelling of a person through behavioural data, prediction, recommendation, or market segmentation. TSDNE proposes a different temporal structure: the object becomes personal through attention and decision after it appears, not because the system has inferred the visitor in advance.

This distinction is politically meaningful only if the implementation remains aligned:

- no cross-site identity;
- no hidden behavioural profile;
- no remote prompt history;
- no device fingerprint used as uniqueness infrastructure;
- local novelty history bounded and disclosed;
- research data collected only in a separate explicit-consent mode.

Human–Data Interaction and data-colonialism research provide relevant critical frameworks. Local-first software provides a related design tradition in which data and computation remain under greater user control, while also warning that local-first is an architectural property, not a complete political programme.

- Mortier et al., “Human–Data Interaction”: https://arxiv.org/abs/1412.6159
- Kleppmann et al., “Local-First Software”: https://doi.org/10.1145/3359591.3359737
- Couldry and Mejias, “Data Colonialism”: https://doi.org/10.1177/1527476418796632

### 4.13 Relation without property and executable circulation

Free-software traditions establish freedoms to run, study, modify, and redistribute software. TSDNE’s export mechanism should be understood in this lineage rather than as a transfer of exclusive ownership. The encounter record may establish correspondence and provenance, but hashes, seeds, or metadata should not be rhetorically converted into scarcity certificates.

Art Blocks is the clearest counter-model. It combines generative code, seeds, live rendering, fixed editions, token ownership, rarity, and markets. TSDNE preserves code, generation, and identity while rejecting allocation as property. Rozendaal’s contract is an intermediate model: the website remains public but the canonical work is sold. TSDNE instead permits multiple continuations without a privileged owner.

- GNU Free Software Definition: https://www.gnu.org/philosophy/free-sw.html
- Art Blocks, *Chromie Squiggle*: https://www.artblocks.io/collection/chromie-squiggle-by-snowfro
- Art Blocks, “Inside the Algorithm”: https://www.artblocks.io/articles/chromie-squiggle-algorithm-guide

### 4.14 Security, accessibility, ecology, and preservation

Generated shader code is an untrusted-program problem. Compilation success is insufficient. Candidates must be bounded for numerical stability, runtime cost, resource use, flashing, and platform behaviour. Typed generation narrows the attack and failure surface but does not remove it. Shader-fuzzing research, including DarthShader, is relevant to validation and testing.

Accessibility cannot be reduced to keyboard controls. The generated visual space itself must be constrained for photosensitive-seizure risk, rapid luminance change, contrast, reduced-motion preferences, and meaningful alternatives on unsupported or lower-power devices. A reduced-motion mode should remain an artwork, not merely freeze an arbitrary frame.

Browser-local generation also has an ecological and distributive cost. Candidate batches consume energy; model weights consume bandwidth and storage; capable hardware is unequally distributed. These costs should be measured where feasible and stated without claiming that local execution is inherently low carbon.

Preservation is constitutive. Web standards, browser engines, GPU drivers, dependencies, and model-hosting arrangements will change. TSDNE should archive source, generator version, export schemas, representative recordings, model identifiers, licences, compatibility notes, and a preservation build. Webrecorder and Rhizome’s ArtBase provide relevant institutional precedents, but reproducible source and emulation documentation remain necessary.

- Khronos WebGL: https://www.khronos.org/webgl/
- Khronos WebGL security: https://www.khronos.org/news/permalink/webgl-security
- W3C WebGPU security/privacy: https://www.w3.org/TR/webgpu/
- DarthShader paper: https://arxiv.org/abs/2409.01824
- DarthShader repository: https://github.com/wgslfuzz/darthshader
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

## 5. Internal lineage within Laurenzo’s practice

TSDNE directly extends three established concerns:

1. **Media appropriation and the user–programmer continuum.** The spectator may become custodian, user, modifier, or distributor of the executable medium rather than only viewer of an image.
2. **Politics of HCI.** The small action vocabulary constructs scarcity, attention, power, and disappearance rather than serving as a neutral convenience layer.
3. **Demokritos.** LLM-assisted shader generation continues, but the social organisation is inverted: accumulation, community improvement, and persistent corpus become singularity, relinquishment, and non-exclusive transfer.

TSDNE should cite this continuity without using it to avoid the broader histories above.

## 6. What TSDNE must not claim

TSDNE should not claim to originate:

- algorithmic or generative art;
- endless computational image spaces;
- browser-based art;
- single-serving websites;
- the “This X Does Not Exist” title;
- one-output-at-a-time generative demonstration;
- shader sharing or browser shader execution;
- interactive evolutionary art;
- procedural shader evolution;
- LLM-generated shaders;
- browser-local LLM inference;
- seeded computational identity;
- executable or open-source artworks;
- ephemeral digital encounters;
- artistic critique of ownership, surveillance, or personalisation.

## 7. What appears distinctive

The strongest contribution is not a novel component but an artistic synthesis whose components constrain one another:

- immediate procedural generation prevents AI latency from governing first contact;
- optional local AI refuses central prompt collection while remaining materially limited;
- typed mutation makes the model consequential without making it sovereign;
- one visible shader turns computational abundance into temporal scarcity;
- irreversible replacement can produce attachment and regret without an ownership registry;
- source export permits persistence through appropriation rather than platform archive;
- free circulation supports relation without exclusion;
- no behavioural profile allows the encounter to become personal after the fact rather than personalised in advance;
- accurate uniqueness language rejects both tokenised artificial scarcity and naive claims about generative novelty.

## 8. Minimum related work for future papers

Any substantial paper on TSDNE should discuss, at minimum:

1. *This Person Does Not Exist*, *This Waifu Does Not Exist*, and the title/interface genre;
2. Sims, Takagi, Picbreeder, novelty search, MAP-Elites, and *Electric Sheep*;
3. AARON, *Every Icon*, Reas, and Processing;
4. browser/net-art lineages including Lialina, JODI, Shulgin, and Rozendaal;
5. ShaderToy, The Book of Shaders, Hydra, Shader Park, Material Maker, and ISF;
6. Quiroz and Dascalu; Sasso, Loiacono, and Lanzi;
7. AIShader, *AI Co-Artist*, *ShadAR*, and *Demokritos*;
8. WebLLM, Transformers.js, ONNX Runtime Web, and WebGPU;
9. sequential search, satisficing, information foraging, and attachment;
10. local-first, Human–Data Interaction, data colonialism, and free software;
11. Art Blocks as a political counter-model;
12. browser preservation, accessibility, shader security, and material cost.

## 9. Research boundary

This review aims to be comprehensive within TSDNE’s defined feature set, not exhaustive of every generative artwork, shader repository, browser experiment, or AI coding tool. Inclusion is based on explanatory relevance. The accompanying audit records corrections, exclusions, unresolved references, and limitations.