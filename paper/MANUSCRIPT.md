# One Object, No Return in *This Shader Does Not Exist*

Tomas Laurenzo

## Abstract

*This Shader Does Not Exist* is a browser artwork that presents one generated shader at a time. A visitor may remain with it, replace it with another unknown shader, or take its executable source. There is no catalogue, return function, recommendation process, account, ownership registry, or public archive. The apparent austerity of this interaction is the work's principal material. TSDNE does not abolish scarcity, memory, provenance, or selection; it changes where they occur. Scarcity moves from the digital object to the moment of access. Memory moves from a recoverable object to a lossy perceptual trace used only to reduce repetition. Provenance identifies an executable program without becoming title, certification, or exclusive possession. Selection is performed in the authored generator rather than through inference about the visitor. The current system generates shaders locally through a procedural grammar of thirty-nine structural families, independent colour and surface processes, local perceptual evaluation, and bounded anti-repetition memory. Its public runtime contains no learned generative model, although AI programming assistants have been used in its development. I analyse the work through its implementation and production history, placing its deliberately incomplete forms of disappearance and identification in relation to recommender systems, critical refusal, crypto-art provenance, free software, and the material persistence of software. TSDNE stages a contradiction rather than a solution: the shader can be reconstructed; the encounter cannot be retrieved. Its politics lie in refusing to make the visitor equally reconstructable.

**Keywords:** new media art; generative art; software art; personalisation; provenance; scarcity; refusal; recommender systems

## 1. One object, no return

Computational abundance is usually presented as an advantage. A catalogue grows. A feed never ends. A streaming service promises that almost everything is available, then deploys another computational system to decide which fraction of everything should be put in front of us. Generative systems radicalise this condition because the inventory no longer needs to pre-exist. An image, text, song, or program can be produced on demand, and the interface can always offer one more.

*This Shader Does Not Exist* starts from the same abundance and imposes an apparently unnecessary restriction on it. One shader appears. It occupies the browser window and moves. The visitor can watch it for as long as desired. There are two consequential actions. **another** replaces it with an unknown shader and provides no way back. **take the code** exports the executable program so that it may continue somewhere else. There is no grid of alternatives, no prompt, no history of previous results, no favourite button, no recommendation, no account, no ownership claim. The interface is almost perversely poor in features.

The restriction is not an attempt to pretend that digital objects have become materially scarce. They have not. The shader is source code. If it is exported, it can be copied without depriving anybody else of it. If its seed, program and generator version are preserved, it can be reconstructed. The repository itself preserves the software that makes the encounter possible. What becomes scarce is therefore not the object but a particular form of access to it. TSDNE creates a temporary and local scarcity inside an infrastructure of reproducibility.

This distinction matters because digital culture has repeatedly tried to solve the absence of material scarcity by producing substitutes for it. Crypto art made the operation unusually explicit: a reproducible digital work could be associated with a cryptographic token, public provenance, limited edition and tradable ownership (Franceschet et al. 2021). The object remained copyable while scarcity moved into a registry. Rachel O'Dwyer's broader account of tokens shows why this exceeds the comparatively short history of NFTs. Tokens can bind access, exchange, identity, governance and value to programmable systems, and precisely because they are programmable they can create new kinds of control as easily as they create new kinds of circulation (O'Dwyer 2023).

TSDNE uses some of the same low-level possibilities and refuses their conversion. It computes deterministic identifiers and cryptographic hashes. It can establish correspondence between an exported source file and the program from which it was produced. It does not mint anything. There is no public registry, no serial number in the ordinary encounter, no transfer record, no rarity score and no assertion that a person owns the first or only legitimate instance. The technical capacity to identify remains; title does not follow from it.

This is one of several non-conversions around which the work is organised. Visitor behaviour does not become preference. Difference does not become recommendation. Provenance does not become ownership. Reproducibility does not become collectibility. Memory does not become retrieval. Abundance does not become a catalogue.

I do not use the term *refusal* here to suggest that an artwork declining to implement a recommender system occupies the same political position as communities refusing coercive or extractive data infrastructures. Zong and Matias's account of data refusal from below is explicitly written from the standpoint of people who refuse institutions and data collectors; its analysis of autonomy, power, time and cost depends on that standpoint (Zong and Matias 2024). Garcia et al. similarly describe critical refusal as an informed practice that investigates power differences in order to produce alternatives to existing data practices (Garcia et al. 2022). TSDNE is an authored system, not a community resisting an institution. But these accounts are useful precisely because they make refusal more demanding than subtraction. A refusal has to change the relations produced by a system. Removing a button is politically uninteresting if the architecture continues to perform the same conversion somewhere else.

The question, then, is not what TSDNE lacks. It is what its absences make technically impossible, socially unavailable, or aesthetically consequential. To answer it we have to begin with the apparatus.

## 2. A shader appears

A fragment shader is already a generative machine. It is a small program executed repeatedly across the pixels of an image. Its output can depend on position, time, mathematical fields, simulated physical processes, noise functions, recursive transformations and any other computation that fits within the rendering pipeline. It is therefore both image and procedure. What the visitor sees is not a file waiting to be displayed but one temporal execution of a program.

The current TSDNE generator contains thirty-nine structural families. They include continuous mathematical fields, hard-edge geometric systems, reprographic processes, recursive and fractal structures, ray-marched three-dimensional spaces, biological forms and physical simulations. Structure is only one axis. A separate colour stage maps scalar or vector structures through six colour regimes, while a final surface stage applies one of seven finishes, including clean rendering, grain, posterisation, dithering, scanlines, vignette and bloom. These stages are deliberately separable. A structural system is not tied to a single palette or surface treatment.

This architecture did not begin as an elegant plan. An earlier implementation contained twelve families and a much narrower visual vocabulary. More importantly, its candidate scoring rewarded complexity in ways that increasingly made complexity synonymous with density, edge energy and visual agitation. The generator could produce many parameter combinations while the work looked as if it could produce only one aesthetic. A large formal possibility space had become perceptually small.

That failure matters more to this paper than the number thirty-nine. TSDNE depends on abundance, but abundance is not established by counting combinations. If a visitor presses **another** three times and receives three recognisably similar images, the work has already contradicted itself. The computer may be able to enumerate millions of programs; the encounter has nevertheless exposed a template.

The generator was therefore expanded and reorganised. Structure, colour and finish were separated. Families were added that occupy very different spatial and temporal regimes. The earlier systematic pressure towards maximal density was relaxed so that sparse, slow and quiet outputs could survive. The selector's edge contribution was reduced because dithering and grain could otherwise acquire a spurious advantage: per-pixel activity is cheap complexity. Candidate pools were changed to sample across broad visual categories instead of walking through a categorically ordered list and stopping as soon as enough neighbouring candidates passed validation. These were not optimisations towards a generic definition of beauty. They were corrections made when the apparatus failed to sustain the condition on which the encounter depends.

The public generator now works in several stages. For the first encounter it seeks a small pool of technically valid candidates; later encounters use a larger pool. Candidate generation is divided across animation frames so that a shader already on screen continues to move while the next pool is produced. Each candidate is compiled and rendered locally with WebGL2. Fixed temporal samples provide compact descriptions of luminance, variance, colour, spatial edge activity and temporal change. A denser temporal sequence screens for repeated large-area luminance changes. Candidates that fail family-specific quality bounds or the flash heuristic are rejected before they can be shown. The remaining candidates are scored by perceptual distance from recent local traces, visual articulation, structural-family separation and, within the current session, colour-mode separation. Early encounters give additional weight to perceptual separation because immediate recurrence is especially damaging to the work's proposition.

None of this is a recommendation system. It does not estimate whether the visitor will like a shader. The score is a property of the relationship between candidate images and a bounded history of previously displayed images. Every displayed shader enters the same history regardless of whether it was watched for ten seconds or ten minutes, exported, ignored or immediately relinquished.

Nor is the selector presented as an algorithmic contribution. Novelty search and quality-diversity research have long investigated ways of producing behavioural difference without optimising a single objective (Lehman and Stanley 2011; Pugh, Soros, and Stanley 2016). TSDNE uses a much more modest apparatus. Its use of perceptual descriptors and local repulsion is artistic infrastructure. It exists because the work requires the next shader not to look trivially like the one just lost.

There is an important consequence here. Refusing to model the visitor does not eliminate selection. It relocates it.

In a personalised platform, selection increasingly occurs after observing a person. The platform gathers past action, represents it as a profile or embedding, and uses that representation to decide what should appear next. In TSDNE, selection is moved backwards into the production of the generator. I decide which families exist, which parameter ranges are permitted, which visual failures are automatically rejected, what counts as perceptual distance, and how strongly the system should avoid recent formal characteristics. These decisions are no less subjective because they are expressed as code.

For that reason, the project includes a private, artist-only curation instrument. It is deliberately separate from the public artwork. The planned study does not infer preference from browsing behaviour. I explicitly mark generated examples as interesting, not interesting, or indeterminate and can add a qualitative comment. The revised protocol separates a balanced audit of the generator from an audit of the public selector, because those are different questions. The first asks which families, parameter regions and colour/finish combinations are weak. The second asks whether the selector itself consistently prefers stronger candidates than the alternatives it generated. The exploratory observations may be used to revise the generator, but they cannot then serve as an unbiased demonstration that the revision improved it; that requires a held-out batch.

This private curation is not an embarrassing return of the judgement that the public work claims to refuse. It is the point. TSDNE does not refuse judgement. It refuses the conversion of visitor behaviour into an involuntary source of aesthetic training data. The politics of the system depend partly on where judgement is allowed to happen and who is made legible to whom.

## 3. Difference without inference

Personalisation is often treated as an almost self-evident good. A system knows something about me and therefore gives me something more relevant. The privacy problem then appears as a matter of degree: how little can the system know while preserving the advantage of personalisation? Biega et al. make precisely this problem computationally explicit by studying data minimisation in recommender systems that continue to optimise personalised service (Biega et al. 2020). Their work is not an argument against personalisation; it demonstrates how technically and legally difficult even the apparently modest principle of collecting only necessary data becomes once personalisation remains the objective.

TSDNE asks a different question. What if relevance is not estimated at all?

A visitor who presses **another** undeniably acts. The action changes the work and initiates another search. But the meaning of the action is deliberately left unresolved. It could mean that the current shader is disliked. It could mean the opposite: the shader is compelling, but the visitor wants to test whether letting it go matters. It could express boredom, curiosity, impatience, confusion, a desire to see the generator's range, or nothing more than the pleasure of pressing the button. The interface knows that the action occurred. It does not know why.

Most contemporary interaction systems are uncomfortable with this ambiguity. Behaviour becomes useful when it can be translated into a signal. A skip can become negative feedback. A click can become relevance. Dwell time can become engagement. A return can become preference. At sufficient scale these translations do not need to be individually true to become operationally valuable. The user is made statistically legible.

My earlier work on the politics of HCI described the user/programmer division not as a neutral technical taxonomy but as a political relation embedded in design (Laurenzo 2017). Interfaces distribute agency while also distributing knowledge of how that agency is implemented. They permit some operations and conceal others. In TSDNE the refusal to assign semantic value to **another** is therefore not a privacy notice added to an otherwise conventional interface. It is an interaction decision. The action has an effect on the artwork but does not acquire a second life as a statement about the person who performed it.

This also changes the meaning of serendipity. Recommender-systems research has worked for years on serendipitous recommendation, partly because accurate prediction can produce obvious, homogeneous or unsurprising results. Reviews of the field repeatedly encounter relevance, novelty and unexpectedness as components of operational definitions (Ziarani and Ravanmehr 2021). Kotkov, Medlar and Glowacka argue that the recommender-systems formulation can be narrower than broader understandings of serendipity and call for greater attention to what serendipitous encounters actually are (Kotkov, Medlar, and Glowacka 2023).

TSDNE produces a deliberately strange case: **serendipity without relevance optimisation**. It seeks difference and tries to avoid obvious repetition, but it refuses to estimate whether the difference will be relevant to this visitor. The system is not trying to surprise me with something I will retrospectively recognise as exactly right. It is simply refusing to close the space of possible encounters around a model of me.

This is where the phrase *personal without personalisation* remains useful, but only if it is kept in its proper epistemic place. The work demonstrably refuses behavioural personalisation. It does not yet demonstrate that an encounter becomes personal. That would be a claim about experience, not source code. A visitor study might eventually show that the possibility of irreversible replacement changes attention, attachment or stopping behaviour. It might show frustration. It might show no meaningful difference at all. The artwork cannot pre-empt that result.

What it can establish is the condition under which such a question becomes possible. Personal significance, if it occurs, cannot be attributed to successful prediction by the system because no model of the visitor exists. It has to emerge from attention, chance, duration, visual form, the knowledge that another shader is available, and the knowledge that requesting it withdraws the present one.

Critical refusal is useful here insofar as it prevents us from describing this as mere absence. Garcia et al. insist on refusal as generative practice, a way of investigating and altering unequal data relations rather than simply saying no (Garcia et al. 2022). TSDNE's modest contribution to that discussion is architectural. It asks what an interface becomes when several common conversions are not merely prohibited by policy but absent from the data model. There is no preference field waiting to be populated later. There is no account to which a history can be attached. There is no engagement score that must be anonymised. The system's ignorance of motive is not perfect privacy, nor a universal ethical solution. It is a designed incapacity.

There is something aesthetically important about that incapacity. The next shader cannot be a response to what the system thinks I am. It can only be another event in a sequence whose continuity is visual rather than psychological. The system remembers the field it has occupied. It does not remember me.

## 4. Scarcity in the wrong place

Digital scarcity has always been awkward because digital reproduction is extraordinarily good. Benjamin's account of technological reproducibility predates software, but the tension he identifies between reproducibility and the historically specific authority of the art object becomes more literal when the object is executable information. Software does not merely tolerate reproduction; execution usually depends on exact copying. A shader sent from server to browser, copied into GPU memory and executed thousands of times per second is an improbable place to search for an unrepeatable original.

TSDNE does not search for one.

When **another** is pressed, the current shader disappears from the interface. This is a real loss at the level of the interaction. The interface has no back button and no gallery history. The local memory that remains is intentionally insufficient to reconstruct the program. Yet the event is not destruction. The generator remains. The same source may have been exported. A screen recording may exist. The repository preserves the rules. With enough reconstructive information, a deterministic program could be produced again.

The difference between loss and destruction is essential. Calling the shader destroyed would turn an interface convention into metaphysics. Calling nothing scarce because the substrate is reproducible would make the opposite mistake. It would ignore the fact that access is always organised, even when copies are cheap.

The work therefore places scarcity in the wrong place. Or, more precisely, in a place where contemporary digital systems often try to eliminate it. The scarce element is a moment of availability. There is one object now, not because the network cannot provide a thousand, but because the interface refuses to. The visitor may keep looking or give up the current relation for an unknown one.

This is not the scarcity of possession. Pressing **take the code** makes that distinction explicit. The exported shader does not become unavailable to anybody else. The manifest says that it is not a certificate and creates no title, ownership, exclusivity, scarcity, authenticity or uniqueness claim. The authored application is free software under the GPL; generated shaders carry a CC0-oriented waiver only to the extent that relevant rights can actually be waived. The legal position is deliberately less romantic than the interface gesture. Copyright status is not dissolved by saying that an object is free, and an authored generator does not purify its outputs of every possible third-party right or historical reference.

What matters is that the work does not use exclusivity to make the encounter consequential. This separates it from the market logic of crypto art without requiring a caricature of blockchain as mere fraud. Franceschet et al. describe crypto art as limited-edition digital art whose token supplies transparent origin and provenance and can be securely held and traded (Franceschet et al. 2021). That architecture solves a real technical and social problem for a market: how can a reproducible digital file participate in practices of provenance, scarcity and exchange? TSDNE asks the inverse question. Once a program can be identified, why should identification culminate in exclusive possession at all?

The inverse is not innocent. TSDNE still produces value through restriction. **another** matters because the current shader cannot be recalled through the artwork. The work refuses market scarcity and manufactures temporal scarcity instead. This is why describing it as “without scarcity” would be false and politically convenient. It would allow the artwork to enjoy the affective force of loss while denying that it engineered the condition that makes loss possible.

My PhD work described artificial scarcity as one of the ways intellectual-property regimes make infinitely or cheaply reproducible information behave economically like finite matter (Laurenzo 2014). TSDNE does something almost perverse with the same possibility. It creates artificial scarcity but refuses to make that scarcity transferable. There is no scarce asset to accumulate. The restriction belongs to the encounter and expires with it.

The result is not a moral solution to property. It is an aesthetic experiment with where scarcity can be located. The shader is copyable. The moment is not. If the visitor takes the code, the program continues and the moment still ends.

## 5. Provenance without title

The title *This Shader Does Not Exist* cites a familiar cultural form. “This X Does Not Exist” sites became shorthand for generative models capable of producing plausible synthetic instances of categories such as faces. In that usage, non-existence is usually representational: the depicted person is plausible but has no corresponding person in the world. TSDNE makes the phrase less comfortable because a shader very obviously exists. It is executing. It can be inspected, copied, modified and run elsewhere.

Its non-existence is therefore not ontological. The shader was not waiting in a catalogue. It becomes available through computation and an encounter. The title also occupies a contemporary AI-coded phrase while declining the foundation-model apparatus usually associated with it. The public work contains no LLM, diffusion model, learned checkpoint or remote inference service. This is a runtime fact, not a declaration of technological innocence. AI programming assistants have contributed code and documentation during development, and this is recorded in the repository. The distinction is between how the artwork produces a visitor encounter and how software was produced, not between pure and contaminated authorship.

A procedural system is also not without a corpus simply because it has no training dataset. Its corpus is less conveniently hidden.

Several of TSDNE's structural families name their debts directly. `richter-rhythm` and `eggeling-diagonal` refer to early abstract film; MoMA describes Richter's *Rhythmus 21* and *Rhythmus 23*, together with Eggeling's *Symphonie diagonale*, as works that produce cinema through changing abstract forms rather than recording the visible world (Museum of Modern Art 2012). `suprematist-drift` and `bauhaus-tiles` point towards histories of geometric abstraction that run through Suprematism, Constructivism and the Bauhaus (Metropolitan Museum of Art 2004). Other families expose mathematical and computational genealogies in their names: Truchet tilings, Julia orbit traps, Apollonian packing, iterated transformations, ray marching, phyllotaxis, contour mapping, halftoning and dithering.

These names are not claims that a shader recreates a particular artwork. They make a different point. Authored procedural generation also inherits forms, techniques and assumptions. The absence of a learned runtime corpus does not remove influence. What changes is the possibility of making some of those inheritances legible and contestable inside the program.

This gives provenance a second meaning. TSDNE has **computational provenance**, a relation among seed, program, source, version and hash. It also has **cultural provenance**, a relation among the authored grammar and histories of visual, mathematical and computational form. Neither requires title.

The distinction connects directly to media appropriation and explicitation. I have previously argued that new media art can be characterised in part by the inscription of technological knowledge into artistic practice and by making explicit conditions that other media leave implicit (Laurenzo 2016a). The point was never that writing code automatically produces critical art. It was that appropriating the means of technological production can make the tool itself available as artistic material.

**take the code** is TSDNE's most literal implementation of that position. Without it, the artwork's refusal of a back button could be read as a small theatre of deprivation: I control access to the object and call the resulting lack meaningful. Export changes the relation. The interface withholds retrieval while the work maximises reproducibility outside itself. A visitor can leave with GLSL source, a standalone WebGL page and adapters for other shader environments. The continuation does not preserve the interface event, but it preserves and exposes the computational object.

Free software matters here not as a badge of openness but because source circulation redistributes the ability to inspect, modify and maintain an infrastructure. Kelty's account of free software is particularly useful because it treats sharing source, writing licences, coordinating modification and maintaining technical systems as cultural and political practices rather than as a single licensing choice (Kelty 2008). TSDNE is not, by itself, the recursive public Kelty describes. But the GPL does make a concrete commitment: the generator that stages withdrawal is itself available for technical appropriation.

This produces another reversal. The ordinary visitor encounters an intentionally narrow interface. The technically curious visitor can leave the interface entirely and enter the code. The transition is consistent with the user-programmer continuum I have argued for elsewhere (Laurenzo 2017). “User” and “programmer” are not natural categories of people; they are roles produced partly by what an interface exposes and what knowledge it presumes. TSDNE does not demand that everybody programme. It refuses to make programming an illegitimate continuation of looking.

Provenance without title is therefore more than a statement about NFTs. It describes an asymmetry in what the system chooses to know and what social operations it refuses to derive from that knowledge. A hash can answer whether two byte sequences correspond. It cannot answer who deserves to own the encounter. The latter would require another apparatus.

## 6. Memory without retrieval

The most technically modest part of TSDNE may be the one that produces its strangest temporal condition.

After a shader is shown, the browser stores a compact perceptual trace. The persistent record includes a local random identifier, time, broad family information and lossy descriptors of the rendered output. It does not contain the shader source, seed, complete program, parameters, screenshot or video frame. The trace cannot be used by the interface to restore a relinquished shader. It can only help push future candidate selection away from perceptual regions that this browser has recently occupied.

The system remembers enough not to repeat, but not enough to restore.

This formulation would be trivial if digital memory were simply a continuum from less storage to more storage. It is not. The project contains several simultaneous memories with different permissions. Git remembers versions of the software. The active JavaScript state contains reconstructive information for the shader currently on screen. An exported source file can preserve a chosen shader indefinitely. Cryptographic provenance can establish technical correspondence. The local anti-repetition store remembers a lossy description. The visible encounter, meanwhile, refuses to expose a history at all.

Calling TSDNE an anti-archive is therefore useful only if the term remains qualified. It is an **encounter-level anti-archive**, built on top of other archives. Its politics do not depend on the fantasy that the digital has forgotten. They depend on which memory is made available to whom and for what operation.

Wendy Hui Kyong Chun's “The Enduring Ephemeral” is important precisely because it dismantles an easy opposition between digital ephemerality and memory. Networked digital media can appear evanescent while depending on forms of storage, regeneration and repetition that make the ephemeral endure (Chun 2008). Matthew Kirschenbaum's *Mechanisms* approaches digital materiality from another direction, insisting on the physical and forensic conditions through which apparently immaterial computational objects are stored, erased, copied and recovered (Kirschenbaum 2008). Together they make it difficult to sustain a naïve rhetoric of disappearance.

TSDNE should be difficult in exactly this way. **another** produces interface disappearance in a medium built for repeatability. The work does not resolve this contradiction by secretly deleting every possible trace, nor by conceding that nothing was lost. It distributes remembering and forgetting unevenly.

The local trace is particularly revealing because it reverses the most common direction of personalisation memory. Platforms preserve behavioural history so that the past can return as prediction. What did this person click? What can that click tell us about the next item to show? TSDNE preserves a history only so that a perceptual region is less likely to return. It does not save the object; it saves a reason not to see something too much like it again.

This is still behaviourally situated data in a minimal sense. A particular browser was shown a particular sequence, and the state of that sequence changes future output. Describing the system as containing “no behavioural data” would therefore be an overclaim. The defensible distinction is narrower and more important: the trace is not uploaded, attached to an identity or interpreted as preference. The visitor cannot be reconstructed from it as a taste profile, and the shader cannot be reconstructed from it as an object.

The clear operation deletes the persistent anti-repetition store and resets the corresponding in-session family and colour-separation state. Clearing the memory does not produce a privileged fresh identity; there is no account to reset. It only removes the local constraint that previous display has placed on subsequent generation.

There is an obvious technical objection. If I care so much about non-repetition, why not maintain a global registry of every shader ever produced? Because that solution would destroy the problem the work is trying to construct. A global registry would transform ephemerality into accumulation, local difference into global identity, and a technical memory into an archive of objects. It would also invite precisely the certificate logic that the work refuses elsewhere. The project accepts the possibility of recurrence because preventing recurrence at all costs would require a different politics of memory.

The shader may return. It just should not return because the system has learned that I like it.

## 7. The loaded dice

A work built around refusals risks becoming self-congratulatory. No account, no profile, no model, no token, no certificate: the list can start to sound as if virtue were the absence of software. This would be both technically inaccurate and artistically dull.

TSDNE is heavily designed. Its randomness is constrained. Its visual grammar is authored. Its selector encodes judgements about articulation and difference. Its family boundaries are mine. Its colour modes and finishes are mine. Even the decision to preserve quiet images after an earlier version became systematically dense is an aesthetic judgement expressed as code. The dice are loaded.

This does not invalidate the refusal of behavioural personalisation. It locates power more accurately. The system does not become neutral when it stops knowing the visitor. It becomes more visibly responsible for what it produces. The private curation study is partly an attempt to make that responsibility inspectable. Rather than allowing public visitor behaviour to become an endless optimisation signal, I have to confront the generator as my own authored apparatus: which visual histories I encoded, which families fail, which formal habits become repetitive, which quantitative proxies quietly reward a house style.

The same qualification applies to the refusal of a runtime model. Earlier versions of TSDNE experimented with browser-local language models that proposed shader mutations. The approach was technically viable, but it began to reorganise the artwork around the model: loading states, mutation semantics, the question of whether the model had produced a better result, and the temptation to make its agency visible. The work was becoming a shader-exploration interface. I removed the model not because procedural code is politically pure but because the model was solving a problem the artwork did not need to have.

The current runtime is materially simpler to preserve and audit. It also avoids sending prompts or visitor behaviour to an inference service because there are no prompts and no inference service. But none of this proves lower energy use, ethical labour, equal access or cultural neutrality. The browser still runs on hardware with material supply chains. WebGL drivers and browser engines are enormous infrastructures produced elsewhere. Static hosting generates network traffic. Some visual families are computationally more expensive than others. The project remains inside the technical and economic conditions it criticises.

Development further complicates any purity narrative. Contemporary AI programming assistants have contributed code and documentation under my direction and review. The repository states this explicitly. “Authored procedural system” therefore means that the rules used at runtime are explicit, inspectable and accepted as part of the artwork; it does not mean that every character was typed without machine assistance. The relevant political question is not whether AI touched the project. It is what role computation is given, what it is allowed to infer, and how its operation is made consequential.

The legal gesture is similarly incomplete. GPL and CC0-oriented language cannot abolish copyright law. They operate inside it. The generator's explicit visual genealogies also make clear that source availability is not the same as cultural source-lessness. A family called `richter-rhythm` can expose a debt more honestly than an opaque training corpus might, but naming is not in itself a sufficient account of appropriation. Legibility opens the problem; it does not settle it.

Finally, there is the unresolved question of experience. I can establish that **another** does not create a preference label. I cannot establish from code that the visitor experiences relinquishment. I can establish that a shader cannot be recovered through the interface after replacement. I cannot infer regret from that fact. I can make the conditions for attention and uncertainty more deliberate; I cannot command attention.

This limit is important because it prevents the work from turning its own visitors into rhetorical data. The temptation would be easy: the interface has a striking structure, therefore the structure must create attachment; the object disappears, therefore the visitor must feel loss. That would repeat conceptually what the software refuses technically, converting ambiguous behaviour into knowledge about a person without sufficient evidence.

TSDNE is more interesting if it leaves the contradiction open.

Computational abundance is not freedom simply because everything can be generated. Scarcity is not necessarily property simply because access is restricted. Memory is not necessarily an archive simply because a trace persists. Provenance is not necessarily title simply because a hash can identify a program. And interaction is not necessarily information about a person simply because an action occurred.

The work makes these separations technically small and politically explicit. One object is present. Another is possible. Asking for it withdraws the present one. Taking the code preserves something else: not ownership, not the duration of watching, not the decision that made the shader matter, but the executable condition from which images can continue to happen.

The shader can be reconstructed. The visitor should not have to be.

## References

Benjamin, Walter. 2008 [1936]. “The Work of Art in the Age of Its Technological Reproducibility.” In *The Work of Art in the Age of Its Technological Reproducibility, and Other Writings on Media*, edited by Michael W. Jennings, Brigid Doherty, and Thomas Y. Levin. Cambridge, MA: Harvard University Press. **[Edition/page verification required before submission.]**

Biega, Asia J., Peter Potash, Hal Daumé III, Fernando Diaz, and Michèle Finck. 2020. “Operationalizing the Legal Principle of Data Minimization for Personalization.” In *Proceedings of the 43rd International ACM SIGIR Conference on Research and Development in Information Retrieval*, 399–408. https://doi.org/10.1145/3397271.3401034.

Chun, Wendy Hui Kyong. 2008. “The Enduring Ephemeral, or the Future Is a Memory.” *Critical Inquiry* 35 (1): 148–171. https://doi.org/10.1086/595632.

Franceschet, Massimo, Giovanni Colavizza, T’Ai Smith, Blake Finucane, Martin Lukas Ostachowski, Sergio Scalet, Jonathan Perkins, James Morgan, and Sebastian Hernández. 2021. “Crypto Art: A Decentralized View.” *Leonardo* 54 (4): 402–405. https://doi.org/10.1162/leon_a_02003.

Garcia, Patricia, Tonia Sutherland, Niloufar Salehi, Marika Cifor, and Anubha Singh. 2022. “No! Re-imagining Data Practices Through the Lens of Critical Refusal.” *Proceedings of the ACM on Human-Computer Interaction* 6 (CSCW2), Article 315: 1–20. https://doi.org/10.1145/3557997.

Kelty, Christopher M. 2008. *Two Bits: The Cultural Significance of Free Software*. Durham, NC: Duke University Press. https://doi.org/10.1215/9780822389002.

Kirschenbaum, Matthew G. 2008. *Mechanisms: New Media and the Forensic Imagination*. Cambridge, MA: MIT Press.

Kotkov, Denis, Alan Medlar, and Dorota Glowacka. 2023. “Rethinking Serendipity in Recommender Systems.” In *Proceedings of the 2023 Conference on Human Information Interaction and Retrieval*, 383–387. https://doi.org/10.1145/3576840.3578310.

Laurenzo, Tomas. 2014. *Decoupling and Context in New Media Art*. PhD dissertation, Universidad de la República, Uruguay. **[Institutional metadata verification required before submission.]**

Laurenzo, Tomas. 2016a. “Media Appropriation and Explicitation.” *Journal of Science and Technology of the Arts* 8 (2): 27–36. https://doi.org/10.7559/citarj.v8i2.181.

Laurenzo, Tomas. 2017. “Politics of HCI and the User–Programmer Continuum.” In *Proceedings of the 23rd International Symposium on Electronic Art, ISEA2017*. **[Final proceedings pagination verification required before submission.]**

Lehman, Joel, and Kenneth O. Stanley. 2011. “Abandoning Objectives: Evolution through the Search for Novelty Alone.” *Evolutionary Computation* 19 (2): 189–223. https://doi.org/10.1162/EVCO_a_00025.

Metropolitan Museum of Art. 2004. “Geometric Abstraction.” *Heilbrunn Timeline of Art History*. **[Author/date/access metadata verification required before submission.]**

Museum of Modern Art. 2012. “Inventing Abstraction, 1910–1925” collection and exhibition records for Hans Richter and Viking Eggeling. **[Replace with final cited catalogue/collection records before submission.]**

O'Dwyer, Rachel. 2023. *Tokens: The Future of Money in the Age of the Platform*. London: Verso.

Pugh, Justin K., Lisa B. Soros, and Kenneth O. Stanley. 2016. “Quality Diversity: A New Frontier for Evolutionary Computation.” *Frontiers in Robotics and AI* 3: 40. https://doi.org/10.3389/frobt.2016.00040.

Ziarani, Reza Jafari, and Reza Ravanmehr. 2021. “Serendipity in Recommender Systems: A Systematic Literature Review.” *Journal of Computer Science and Technology* 36 (2): 375–396. https://doi.org/10.1007/s11390-020-0135-9.

Zong, Jonathan, and J. Nathan Matias. 2024. “Data Refusal from Below: A Framework for Understanding, Evaluating, and Envisioning Refusal as Design.” *ACM Journal on Responsible Computing* 1 (1): 1–23. https://doi.org/10.1145/3630107.
