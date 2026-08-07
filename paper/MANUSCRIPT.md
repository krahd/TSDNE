# One Object, No Return in *This Shader Does Not Exist*

Tomas Laurenzo

## Abstract

*This Shader Does Not Exist* is a browser artwork that presents one generated shader at a time. A visitor may remain with it, relinquish it for another unknown shader, or take its executable source. There is no catalogue, return function, recommendation process, account, ownership registry, or public archive of encounters. The austerity of this interaction is the work's principal material. TSDNE does not abolish scarcity, memory, provenance, or selection. It changes where they occur. Scarcity moves from the digital object to the moment of access; memory from a recoverable object to a lossy perceptual trace; provenance from title to computational relation; selection from behavioural inference to the authored generative system. The current artwork generates shaders locally through an explicit procedural grammar, local perceptual evaluation, and bounded anti-repetition memory. Its public runtime contains no learned generative model, although AI programming assistants have participated in its development. This paper analyses the artwork through its apparatus and production history, placing its incomplete forms of disappearance and identification in relation to personalisation, critical refusal, digital scarcity, free software, executable art, and the material persistence of software. TSDNE stages a contradiction rather than solving one: the shader can be reconstructed, copied, and continued, while the encounter cannot be retrieved through the work. Its politics reside less in what computation produces than in the conversions the apparatus refuses to perform on the visitor.

**Keywords:** new media art; generative art; software art; personalisation; provenance; scarcity; refusal; recommender systems

## 1. One object, no return

A shader appears before the visitor has asked for one. It fills the browser window and moves. There is no prompt explaining how it was produced, no list of alternatives and no previous item to compare it with. The visitor may stay. Two other actions are available. *another* withdraws the current shader and replaces it with an unknown one. *take the code* exports the executable program so that it may continue somewhere else.

These actions are technically trivial. Their combination is not.

The first version of the work grew from a familiar computational condition: abundance. A shader is a program and programs are reproducible. A generator can produce another candidate indefinitely. Contemporary interfaces normally celebrate this condition by accumulating objects, exposing catalogues, recommending alternatives, recording favourites, or simply making the next item cheaper than sustained attention to the present one. Generative systems intensify the logic because the inventory does not even need to exist beforehand. There is always another because another can be computed.

TSDNE uses this abundance to manufacture a restriction. Only one generated object is available through the encounter. Requesting another removes the current one from interface retrieval. Yet the work makes no attempt to pretend that the object has become materially unique. If its source is exported it can be copied without depriving anybody else of it. If sufficient reconstructive information is preserved, it can be produced again. The repository preserves the generator itself. The object is reproducible; access to this particular encounter is not.

This is the first contradiction on which the work depends. TSDNE does not produce scarcity by making a digital object impossible to copy. It produces scarcity by limiting the temporal organisation of access to a copyable object.

The same relocation occurs elsewhere in the system. The browser remembers that some perceptual territory has recently been occupied, but it does not preserve the shader required to return there. Technical hashes identify exported programs, but they do not become certificates or ownership records. The system selects among generated candidates, but it does not learn which candidate the visitor is likely to prefer. An action changes the artwork without becoming a durable proposition about the person performing it.

These are not missing features waiting to be added. They are the material of the work.

I use *refusal* in this paper cautiously. Zong and Matias write about data refusal from below from the standpoint of people and communities refusing the authority of institutions and data collectors (2024). Garcia et al. develop critical refusal as an active practice for investigating unequal power and generating alternatives to existing data practices (2022). TSDNE is not a community refusing an institution, and it would be politically unserious to borrow that position for an authored artwork. Their work is nevertheless useful because it makes refusal more demanding than simply leaving something out. A refusal matters when it changes the relations that a system can produce.

TSDNE is organised around such non-conversions. A visitor's action need not become a preference. Identification need not become title. Reproducibility need not become collectibility. Remembering need not make retrieval possible. The work is political not because these relations are described in an artist statement, but because they are implemented as limits on what the apparatus can do.

Methodologically, this paper is practice-led exegesis. It reads the artwork through its source, repository history, production decisions, and the formal consequences of those decisions. Implemented properties are distinguished from observations made while producing the work and, more importantly, from claims about visitor experience. I can establish from the system that *another* is not stored as dislike. I cannot establish from source code that its irreversibility produces regret. That distinction is important enough to become part of the argument itself.

## 2. The loaded generator

A fragment shader is already a generative machine. It is a small program executed repeatedly across the pixels of an image. Its output can depend on position, time, mathematical fields, simulated physical processes, noise functions, recursive transformations, and the architecture of the rendering pipeline. It is therefore image and procedure simultaneously. What appears on screen is not a stored picture waiting to be displayed, but one temporal execution of a program.

The current public vocabulary of TSDNE contains thirty-nine structural families. They range from continuous mathematical fields and geometric systems to reprographic processes, recursive structures, ray-marched space, biological forms, and physical simulations. Structure is only one dimension of the grammar. A separate colour stage maps generated fields through six colour regimes, while a surface stage applies one of seven finishes. The separation matters because a structural family is not bound to a single recognisable palette or texture. Variation is produced compositionally, not only by perturbing a set of numbers inside one visual template.

The architecture is the result of failure. An earlier generator contained twelve families and a much narrower visual vocabulary. More damagingly, its candidate scoring increasingly treated complexity as density, edge activity, and agitation. The system could enumerate many parameter combinations while appearing to generate the same kind of image. A large formal possibility space had become perceptually small.

For this artwork that is not merely an aesthetic weakness. It attacks the interaction. If three presses of *another* produce three variations of an obvious house style, relinquishment is cheap. The unknown is already known. The generator may contain combinatorial abundance while the encounter exposes a template.

The generator was consequently expanded and reorganised. Structure, colour, and finish were separated. New families were added to occupy deliberately different spatial and temporal regimes. The pressure towards maximal density was reduced so that quiet, sparse, and slow outputs could survive. The contribution of edge energy to candidate scoring was reduced when it became apparent that dithering and grain could otherwise appear algorithmically sophisticated simply because they changed many neighbouring pixels. Per-pixel activity is cheap complexity.

A later source audit found a subtler problem. Candidate families had been stored in categorical order, and the selector walked that list from a random offset until it had accumulated enough valid candidates. Because search stopped early, a pool could contain neighbours from one visual category rather than a meaningful cross-section of the grammar. The current selector instead shuffles families within broad visual categories and interleaves those categories before returning to one. This is not a claim of statistical balance. It is an artistic correction to an implementation detail that had quietly acquired aesthetic power.

The public synthesis process works in stages. Candidates are generated locally and compiled as WebGL2 fragment shaders. Fixed temporal samples yield compact descriptions of luminance, variance, colour, spatial edge activity, and temporal change. A denser temporal sequence provides a conservative screen for repeated large-area luminance changes. Candidates that fail family-specific quality constraints or this screen are rejected before display. The surviving pool is scored through its perceptual distance from recent local traces, visual articulation, recent structural families, and recent colour modes. Early encounters place greater weight on separation because immediate repetition is particularly damaging to the premise of abundance.

These measurements are not a theory of aesthetic quality. They are guard rails around an authored grammar. The selector does not infer whether a visitor will like a candidate and has no representation of a visitor's taste. Every displayed shader becomes part of the same anti-repetition history whether it was watched for seconds, exported, ignored, or immediately relinquished.

Nor is the selector offered as a computational novelty. Novelty search and quality-diversity research have long explored ways of producing behavioural difference without reducing generation to optimisation of a single objective (Lehman and Stanley 2011; Pugh, Soros, and Stanley 2016). TSDNE borrows no claim of contribution from that literature. Its local perceptual repulsion is artistic infrastructure: enough computational memory to make obvious recurrence less likely.

The production history reveals where the judgement displaced from the visitor actually goes. I choose the families, parameter ranges, rejection bounds, perceptual descriptors, and relative weights. A metric can make a decision reproducible without making it objective. The dice are loaded before the visitor arrives.

This is why the private curation process associated with the project is kept architecturally separate from the public artwork. I explicitly judge generated material while developing the generator. Those judgements can guide changes to an authored system, but they do not become hidden labels inferred from public behaviour. The results of that ongoing production study are not reported here and should not be used prospectively to decorate the paper with evidence that does not yet exist. Its conceptual importance is already clear, however: refusing visitor profiling does not remove selection. It relocates selection from surveillance of the visitor to responsibility for the generator.

## 3. Difference without inference

Personalisation commonly appears as a bargain. A system knows something about us and, in exchange, gives us something more relevant. Privacy then becomes a question of degree: how little can the system know while retaining the promised advantage? Biega et al. make this problem explicit by operationalising data minimisation in recommender systems that continue to pursue personalised service (2020). The work is valuable here precisely because it is not an argument against personalisation. It shows how privacy constraints are negotiated once personalisation remains the objective.

TSDNE begins elsewhere. What if relevance is not estimated at all?

A visitor pressing *another* undeniably acts. The action changes the artwork and triggers another search. Its meaning is deliberately unresolved. It might mean that the shader is disliked. It might mean the opposite: the shader is sufficiently interesting that relinquishing it has become part of testing the work. It might express boredom, curiosity, impatience, confusion, a desire to inspect the generator, or the uncomplicated pleasure of making something happen. The system knows that the action occurred. It does not decide why.

This ambiguity is politically unusual in computational interfaces. Behaviour becomes valuable when it can be translated into a signal. A skip can become negative feedback. A click can become relevance. Duration can become engagement. Return can become preference. These translations need not be individually accurate to become operationally useful at scale. Their function is not to understand a person in the ordinary sense, but to make behaviour legible enough to predict another action.

My earlier work on the politics of HCI approached the user-programmer distinction as one such political relation rather than a neutral technical taxonomy (Laurenzo 2017). Interfaces distribute action and, at the same time, distribute knowledge of how action is interpreted. In TSDNE the refusal to assign semantic value to *another* is therefore not a privacy policy appended to an otherwise conventional interaction. It is a property of the interaction. The action acts on the artwork but does not acquire a second life as an explicit statement about the person who performed it.

The distinction becomes clearer through recommender-system accounts of serendipity. Recommender research has repeatedly tried to produce recommendations that are not merely accurate but novel, unexpected, or serendipitous; systematic reviews show how these concepts are usually articulated in relation to relevance (Ziarani and Ravanmehr 2021). Kotkov, Medlar, and Glowacka argue that the recommender-systems formulation of serendipity can be narrower than its broader experiential and social meanings (2023).

TSDNE produces a deliberately awkward case: serendipity without relevance optimisation. It seeks difference and actively avoids obvious recurrence, but it refuses to estimate whether that difference will be relevant to this visitor. The next shader cannot be a response to what the system thinks I am because the system does not construct that representation of me.

This is where *personal without personalisation*, the phrase that initially organised this research, remains useful and where it becomes dangerous. The artwork demonstrably refuses behavioural personalisation. It does not demonstrate that the encounter becomes personal. Personal significance is an experiential proposition. A later study might find that irreversible replacement changes attention or stopping behaviour; it might find frustration; it might find nothing. The artwork cannot convert its own design intention into an empirical result.

The implemented claim is narrower and, I think, more consequential. TSDNE produces **difference without inference**. If an encounter becomes personally meaningful, that meaning cannot be explained as successful prediction by the work. It has to emerge through some combination of visual form, duration, chance, attention, and the knowledge that another shader is possible but that requesting it removes the present one.

Critical refusal sharpens this because the system's ignorance is not presented as innocence. Garcia et al. describe critical refusal as a generative practice, one that investigates power in order to make alternative data practices possible (2022). TSDNE's operation is small by comparison, but concrete. There is no preference field waiting to be anonymised, no engagement score to be retained responsibly, and no account to which a behavioural history can be attached. The system's refusal to infer motive is a designed incapacity.

That incapacity does not make the artwork neutral. It makes authorship harder to outsource. If the next shader is monotonous, offensive, derivative, technically broken, or simply dull, I cannot explain it as the inevitable result of giving the visitor what the visitor wanted. The responsibility returns to the generator.

## 4. Scarcity in the wrong place

When *another* is pressed, a shader disappears from the interface. This is a real loss at the level of the encounter and an absurdly incomplete one at the level of computation. The generator remains. The source may have been exported. A screen recording may exist. A deterministic program can be reconstructed when its reconstructive information survives. Calling the shader destroyed would turn an interface convention into metaphysics. Saying that nothing was lost because bits are reproducible would make the opposite mistake. Access is organised even when copies are cheap.

Felix Gonzalez-Torres provides a particularly useful artistic counterpoint. In *"Untitled" (Death by Gun)* (1990), visitors may take printed sheets from a stack; the work was conceived as an edition of endless copies and can be reprinted as the stack is depleted (Wye 2004, 245). His candy works similarly make taking, diminution, replenishment, and circulation constitutive to the artwork rather than accidents of exhibition. The significance for TSDNE is not a shared aesthetics and certainly not an equivalence of political projects. It is the material relation between taking and depletion.

In Gonzalez-Torres, taking something away can diminish the displayed manifestation while the work remains conceptually renewable. TSDNE separates these operations. *take the code* duplicates the computational object and does not diminish the shader still running in the browser. *another*, which gives the visitor nothing to keep, performs the depletion: it removes access to the current encounter. Taking preserves the object; moving on produces the loss.

This inversion exposes the kind of scarcity TSDNE manufactures. It is not scarcity of possession. It is scarcity of interface access. One object is present now not because the network could not provide a thousand, but because the work refuses to provide a thousand at once.

Contemporary crypto art offers the opposite redistribution. Franceschet et al. describe a system in which reproducible digital works become associated with tokens that support provenance, limited editions, possession, and exchange (2021). The file remains technically copyable while scarcity and title are organised through a registry. O'Dwyer's broader account of tokens is useful because it shows how programmable value can bind ownership, access, identity, governance, and platform control rather than merely reproducing older property relations in digital form (2023).

TSDNE also uses deterministic identifiers and cryptographic hashes. What follows from them is different. An exported manifest can establish correspondence between source and a particular generated program. It does not mint an asset. There is no public registry, transfer history, rarity score, serial hierarchy, or claim that one copy is the authentic copy from which the others derive their lesser status. The technical capacity to identify remains; title does not follow from it.

This matters to my own earlier account of artificial scarcity. In the context of cognitive capitalism, I described intellectual-property regimes as mechanisms that fence forms of knowledge whose reproducibility otherwise resists commodity scarcity (Laurenzo 2014). TSDNE deliberately engineers an artificial scarcity of another kind. The restriction is real, but it is not transferable. There is no scarce asset produced by *another* that can later be accumulated or sold. The scarcity belongs to the encounter and expires with it.

The distinction prevents an easy moral narrative. TSDNE does not stand outside scarcity. It uses scarcity to produce consequence. Describing the work as *singularity without scarcity* would allow it to enjoy the affective power of withdrawal while denying the operation that creates that power. The more accurate proposition is stranger: the source is non-scarce; the encounter is scarce.

Whether this scarcity actually makes a visitor care cannot be established here. The work can create the condition of non-return. It cannot legislate the value of what has been lost.

## 5. Provenance without title

The title *This Shader Does Not Exist* deliberately borrows from another piece of computational culture. Phillip Wang launched *This Person Does Not Exist* in 2019 as an extremely simple interface to NVIDIA's StyleGAN: one synthetic face appeared, and refreshing the page generated another (Wilson 2019; Karras, Laine, and Aila 2019). The site's force came partly from the mismatch between representational plausibility and ontological absence. The image looked like a photograph of somebody; the somebody had never existed.

A shader makes the phrase harder to sustain. It plainly exists. It is executing. It can be inspected, copied, modified, and run somewhere else. Its "non-existence" cannot therefore mean that there is no corresponding object in the world. The shader was not waiting in a catalogue before the encounter; it is instantiated through computation. The title relocates non-existence from representation to availability.

It also occupies an AI-coded phrase while declining the generative apparatus now expected from it. The current public runtime contains no LLM, diffusion model, learned checkpoint, or remote inference service. This is a runtime fact rather than a claim of technological purity. Contemporary AI programming assistants have participated in the development of code and documentation, and the repository discloses this. The relevant distinction is between the architecture that produces the visitor encounter and the heterogeneous tools through which software is made.

Nor does procedural generation escape history because it has no learned corpus. A procedural system is also trained, metaphorically if not statistically, on the history of its author and its medium. Its corpus is less conveniently hidden.

Several structural-family names make this explicit. `richter-rhythm` and `eggeling-diagonal` point towards the early abstract-film experiments of Hans Richter and Viking Eggeling. MoMA's account of the 1925 *Der absolute Film* programme describes Richter's *Rhythmus 21* and *Rhythmus 23* and Eggeling's *Symphonie diagonale* as nonrepresentational cinema constructed through abstract forms changing over time (Museum of Modern Art 2012; Dickerman 2012). `suprematist-drift` and `bauhaus-tiles` expose other twentieth-century geometries. Truchet tilings, Julia sets, Apollonian packing, iterative transformations, ray marching, phyllotaxis, contour mapping, halftoning, and dithering expose mathematical, graphic, and reprographic inheritances.

The names are not claims that a generated shader recreates a particular historical artwork. They make the opposite point: authored procedural generation also inherits form. The absence of a training dataset cannot become an alibi for pretending that form arrived without sources. What explicit code can offer is legibility. Some influences can be named, inspected, criticised, and replaced inside the grammar.

This gives provenance two meanings. There is **computational provenance**, the relation among a seed, generated program, source, generator version, and hashes. There is also **cultural provenance**, the relation between the grammar and the visual, mathematical, political, and technical histories from which its vocabulary is constructed. Neither requires title.

The distinction returns to the idea of media appropriation that has organised much of my earlier work. I have described new media art not simply as art that uses technical objects, but as a practice in which technological knowledge is appropriated into artistic production and in which normally implicit technical operations can become explicit artistic material (Laurenzo 2016). Writing code is not automatically critical practice. The relevant operation is the appropriation of the knowledge that permits the technical production and the possibility of making that production speak aesthetically and politically.

*take the code* is TSDNE's bluntest implementation of this idea. Without it, the no-return interface risks becoming a small theatre of deprivation: I control access to an object and call the resulting limitation meaningful. Export changes the relation. The work withholds retrieval inside the encounter while maximising reproducibility outside it. A visitor may leave with raw GLSL, a standalone WebGL document, a technical manifest, and adapters for other shader environments. What is preserved is not the duration of looking or the decision that made the shader significant. It is the executable condition from which the image can continue.

Free software matters here for the same reason. Kelty's account of free software treats source circulation, modification, licensing, and infrastructural maintenance as cultural and political practices rather than reducing "open" to an adjective attached to a file (2008). TSDNE does not by itself constitute the recursive public he describes, and it would be an inflation to claim so. The GPL nevertheless establishes a material fact: the software that stages withdrawal is itself technically available for appropriation and modification.

The interface therefore produces two positions without stabilising them as identities. The visitor can remain a viewer of an intentionally narrow encounter, or can move outside that encounter and inspect or alter the code. This is consonant with the user-programmer continuum I have argued for elsewhere (Laurenzo 2017). User and programmer are not natural types of people. They are roles produced partly by what interfaces expose, what knowledge they demand, and what actions they authorise.

TSDNE retains provenance but refuses to turn provenance into title. A hash can establish that two byte sequences correspond. It cannot establish who deserves to own the encounter. That conclusion would require another apparatus.

## 6. Memory without retrieval

After a shader is shown, the browser stores a compact perceptual trace. The persistent record contains a local random identifier, time, structural-family information, and lossy descriptors of rendered output. It contains no shader source, seed, full program, parameter set, screenshot, or video frame. The record is intentionally insufficient for TSDNE to reconstruct the relinquished shader. It serves one purpose: to make future candidates that occupy similar perceptual territory less likely to be selected.

The system remembers enough not to repeat, but not enough to restore.

This sentence is tempting because it sounds like a theory. It is only interesting when the different kinds of memory in the artwork are kept separate. Git remembers versions of the software. The active JavaScript state contains reconstructive information about the shader currently on screen. Export can preserve a chosen shader indefinitely. Cryptographic hashes maintain technical correspondence. The local anti-repetition database remembers a lossy description. The encounter interface exposes no history at all.

TSDNE is therefore not an archive-free artwork. Calling it an anti-archive is useful only at the level at which the refusal actually operates. It is an **encounter-level anti-archive** built on top of other systems of storage. The politics lie in which memory is made available to whom and for what operation.

Chun's account of the "enduring ephemeral" is particularly important here because it refuses the comfortable opposition between digital disappearance and digital memory (2008). Networked computational media can appear fleeting while depending on storage, regeneration, and repetition. Kirschenbaum's *Mechanisms* attacks the same fantasy from the material side, distinguishing the formal behaviour of digital objects from their forensic inscription in material storage (2008). TSDNE would be conceptually weak if it claimed to make the digital disappear. Software is very good at surviving its own interfaces.

The artwork instead performs disappearance in a medium organised around reproducibility.

The local trace makes this particularly visible because it reverses the usual direction of personalisation memory. Behavioural systems preserve histories so that the past can return as prediction: what did this person click, and what does that event let us infer about what should be shown next? TSDNE preserves a history so that a perceptual region is less likely to return. It does not save the object. It saves a reason not to see something too similar to it immediately again.

This is still behaviourally situated data in a minimal sense. A particular browser has been shown a sequence, and the state of that sequence affects later generation. Describing TSDNE as containing "no behavioural data" would be convenient and false. The narrower claim is sufficient: the stored trace is neither an identity record nor a preference representation, and the artwork does not interpret it as either. It is also intentionally insufficient to reconstruct the shader that produced it.

The visitor can clear this anti-repetition memory. The current implementation removes the persistent trace store and resets corresponding in-session family and colour separation. This does not produce a newly anonymous identity because there was no account to reset. It simply removes the local formal constraint that prior display placed on future synthesis.

Why not solve repetition completely by storing every shader ever produced in a global registry? Because the solution would destroy the problem. A global uniqueness service would transform local memory into accumulation, perceptual difference into object identity, and an anti-repetition mechanism into a public archive. It would also invite the certificate logic that the work refuses elsewhere. The possibility of recurrence is accepted because preventing recurrence at any cost would require a different politics of memory.

The shader may return. It should not return because the system has learned that I like it.

## 7. The loaded dice

A work organised around refusal can easily become self-congratulatory. No profile, no account, no learned model, no token, no certificate: the list begins to sound as if virtue were simply the absence of software. It is not.

TSDNE is heavily designed. Its randomness is constrained. Its grammar encodes my visual interests. Its candidate screening decides which failures may become visible and which are discarded before anyone sees them. Its selector contains judgements about articulation and perceptual distance. The categories by which the selector avoids repetition are authored categories. Even the distinction between an active image and one that is too active is an aesthetic and technical decision expressed numerically.

The dice are loaded.

This does not undermine the refusal of behavioural personalisation. It locates power more accurately. When the system stops pretending to know the visitor, the responsibility for what it produces becomes harder to hide inside the visitor's supposed preferences. The generator has to be judged as an authored apparatus.

The code contains a useful example of this distinction. During development, experimental family builders have existed that are not part of the public family vocabulary. Technical existence is not artistic inclusion. A function can compile and still have no right to appear in the work. The curation of the generator is therefore not merely debugging; it is the process through which computational possibility becomes the artwork's visual language.

The same qualification applies to the absence of a learned model from the runtime. Earlier versions experimented with browser-local language models proposing shader mutations. The experiment was technically plausible, but it began to reorganise the encounter around the model: model loading, model agency, the interpretation of mutation, and the question of whether the model had produced something better. The work was becoming an interface for exploring AI-generated shaders. I removed the model not because procedural code is politically pure but because the model was solving a problem the artwork did not need to have.

This decision makes the public runtime simpler to preserve and inspect. It also means there are no prompts or inference requests to send to a remote service. It proves nothing about the environmental virtue of the work, the labour conditions under which its hardware was manufactured, or the cultural neutrality of its grammar. Browser engines, GPU drivers, hosting infrastructure, operating systems, and supply chains remain largely outside the work's control. Refusing one dependency does not dissolve infrastructure.

AI-assisted development makes the point sharper. Programming assistants have contributed to the production of code and documentation under my direction and review. "Authored procedural system" therefore describes the public runtime and the responsibility taken for its rules; it does not mean that every character was typed in technological isolation. The politically interesting distinction is not AI versus no AI. It is where computation is placed, what it is allowed to know, and what relation is produced by that knowledge.

The legal gesture is also incomplete. GPL and the project's CC0-oriented waiver operate inside copyright rather than outside it. Cultural provenance complicates the gesture further. A family named after Richter can make an inheritance more visible than an opaque statistical corpus might, but naming a debt is not the same as settling it. Legibility opens the problem to criticism. It does not purify the work.

Finally, the visitor remains unresolved. I can establish that *another* is not recorded as a preference label. I can establish that replacing a shader removes it from encounter-level retrieval. I cannot infer from either fact that a visitor becomes attached to the shader, feels loss, or experiences the work as personally meaningful. Doing so would repeat rhetorically the operation that the software refuses technically: converting ambiguous behaviour into knowledge about a person without adequate evidence.

The artwork is more useful if that contradiction remains open.

Computational abundance is not freedom simply because another object can always be generated. Scarcity is not property simply because access can be restricted. Memory is not necessarily retrieval simply because a trace persists. Provenance is not title simply because a hash identifies a program. Interaction is not automatically information about a person simply because an action occurred.

TSDNE makes these separations with a small apparatus. One object is present. Another is possible. Asking for it withdraws the present one. Taking the code preserves something else: not ownership, not the duration of looking, not the decision that made the shader matter, but an executable condition from which images may continue to happen.

The shader can be reconstructed. The visitor should not have to be.

## References

Biega, Asia J., Peter Potash, Hal Daumé III, Fernando Diaz, and Michèle Finck. 2020. “Operationalizing the Legal Principle of Data Minimization for Personalization.” In *Proceedings of the 43rd International ACM SIGIR Conference on Research and Development in Information Retrieval*, 399–408. https://doi.org/10.1145/3397271.3401034.

Chun, Wendy Hui Kyong. 2008. “The Enduring Ephemeral, or the Future Is a Memory.” *Critical Inquiry* 35 (1): 148–171. https://doi.org/10.1086/595632.

Dickerman, Leah, ed. 2012. *Inventing Abstraction, 1910–1925: How a Radical Idea Changed Modern Art*. New York: Museum of Modern Art.

Franceschet, Massimo, Giovanni Colavizza, T’Ai Smith, Blake Finucane, Martin Lukas Ostachowski, Sergio Scalet, Jonathan Perkins, James Morgan, and Sebastian Hernández. 2021. “Crypto Art: A Decentralized View.” *Leonardo* 54 (4): 402–405. https://doi.org/10.1162/leon_a_02003.

Garcia, Patricia, Tonia Sutherland, Niloufar Salehi, Marika Cifor, and Anubha Singh. 2022. “No! Re-imagining Data Practices Through the Lens of Critical Refusal.” *Proceedings of the ACM on Human-Computer Interaction* 6 (CSCW2), Article 315: 1–20. https://doi.org/10.1145/3557997.

Karras, Tero, Samuli Laine, and Timo Aila. 2019. “A Style-Based Generator Architecture for Generative Adversarial Networks.” In *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*, 4401–4410. https://doi.org/10.1109/CVPR.2019.00453.

Kelty, Christopher M. 2008. *Two Bits: The Cultural Significance of Free Software*. Durham, NC: Duke University Press. https://doi.org/10.1215/9780822389002.

Kirschenbaum, Matthew G. 2008. *Mechanisms: New Media and the Forensic Imagination*. Cambridge, MA: MIT Press.

Kotkov, Denis, Alan Medlar, and Dorota Glowacka. 2023. “Rethinking Serendipity in Recommender Systems.” In *Proceedings of the 2023 Conference on Human Information Interaction and Retrieval*, 383–387. https://doi.org/10.1145/3576840.3578310.

Laurenzo, Tomas. 2014. *Decoupling and Context in New Media Art*. PhD dissertation, Universidad de la República, Facultad de Ingeniería, Instituto de Computación, PEDECIBA, Uruguay.

Laurenzo, Tomas. 2016. “Media Appropriation and Explicitation.” *Journal of Science and Technology of the Arts* 8 (2): 27–36. https://doi.org/10.7559/citarj.v8i2.181.

Laurenzo, Tomas. 2017. “Politics of HCI and the User-Programmer Continuum.” In *ISEA2017 Manizales: Bio-Creation and Peace, Proceedings of the 23rd International Symposium on Electronic Art*, 507–510. Manizales: Universidad de Caldas.

Lehman, Joel, and Kenneth O. Stanley. 2011. “Abandoning Objectives: Evolution through the Search for Novelty Alone.” *Evolutionary Computation* 19 (2): 189–223. https://doi.org/10.1162/EVCO_a_00025.

Museum of Modern Art. 2012. “Rhythmus 23.” Gallery label for *Inventing Abstraction, 1910–1925*, New York.

O'Dwyer, Rachel. 2023. *Tokens: The Future of Money in the Age of the Platform*. London: Verso.

Pugh, Justin K., Lisa B. Soros, and Kenneth O. Stanley. 2016. “Quality Diversity: A New Frontier for Evolutionary Computation.” *Frontiers in Robotics and AI* 3: 40. https://doi.org/10.3389/frobt.2016.00040.

Wilson, Mark. 2019. “Refresh This Crazy Website to Create New People Who Don’t Exist.” *Fast Company*, February 19.

Wye, Deborah. 2004. *Artists and Prints: Masterworks from The Museum of Modern Art*. New York: Museum of Modern Art.

Ziarani, Reza Jafari, and Reza Ravanmehr. 2021. “Serendipity in Recommender Systems: A Systematic Literature Review.” *Journal of Computer Science and Technology* 36 (2): 375–396. https://doi.org/10.1007/s11390-020-0135-9.

Zong, Jonathan, and J. Nathan Matias. 2024. “Data Refusal from Below: A Framework for Understanding, Evaluating, and Envisioning Refusal as Design.” *ACM Journal on Responsible Computing* 1 (1): 1–23. https://doi.org/10.1145/3630107.
