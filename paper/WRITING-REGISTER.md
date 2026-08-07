# Writing register for the TSDNE paper

## Basis

This is not a style-transfer prompt. It is a set of compositional constraints inferred from close reading of Tomas Laurenzo's:

- *Ekphrasis*;
- *5500: Performance, Control, and Politics*;
- *Extraordinary Accident: An Immersive Metaphor of Hong Kong*;
- the PhD dissertation *Decoupling and Context in New Media Art*, particularly the discussions of media appropriation, explicitation, users and programmers, technological tools, cognitive/perceptual capitalism, artificial scarcity, and geopolitical subjectivity.

The aim is to preserve the argumentative method and intellectual register of those texts without reproducing old grammatical accidents or turning recurrent phrases into mannerisms.

## The central compositional move

The characteristic move is **apparatus → contradiction → politics**.

A Laurenzo paper normally earns its abstraction by first making the apparatus legible. The reader should be able to understand what a work does, materially and computationally, before being asked what that operation means. The technical description then reveals a contradiction that is not a defect to be resolved but the location of the artistic problem.

Examples of this method across the source texts include:

- a digital image of scarred skin materially deforming the screen that carries it;
- a performer controlling a system that electrically controls the performer's own body;
- a virtual city made more meaningful by refusing the burden of realistic recreation;
- interfaces that simultaneously extend a user's action and conceal the computational knowledge that makes the action possible.

For TSDNE, the corresponding contradictions are already material:

- an infinitely copyable shader is made scarce at the level of encounter;
- a system remembers an encounter in order to deny retrieval rather than enable it;
- hashes identify a computational object while refusing to establish title;
- a visitor's action changes the object on screen while the system refuses to translate that action into knowledge about the visitor;
- taking the code preserves an object outside the very interface that makes relinquishment irreversible.

The paper should inhabit these contradictions rather than neutralise them with categorical definitions.

## Voice

### Use first person where responsibility matters

The source papers are not afraid of the authorial position. Use **I** when describing artistic intention, production decisions, failures, revisions, and responsibility. Use **we** only when it has a real referent or when making a deliberately shared argumentative move with the reader.

Avoid detached constructions that pretend artistic decisions happened by themselves:

Weak:
> It was decided that the language model would be removed.

Preferred:
> I removed the language model when it became clear that it was changing the category of the encounter.

### Do not over-explain authority

The prose should state the argument and defend it. Avoid repeated qualifiers such as "it could perhaps be argued", "in some sense", "the author suggests", and "this may be seen as" when a direct claim can be made precisely.

Precision is preferable to timidity. Where evidence does not permit a strong claim, narrow the claim instead of cushioning it rhetorically.

## Sentence and paragraph behaviour

### Move between long analytic sentences and short incisions

The source texts often accumulate a technical or philosophical condition and then puncture it with a short proposition or question. Preserve that rhythm.

Do not make every sentence the same length. Do not produce pages of symmetrical antitheses.

### Paragraphs should turn

A paragraph should rarely be a container for one topic. It should usually begin from a fact, condition, or inherited assumption and finish somewhere less comfortable.

A useful test: if the final sentence merely restates the first, the paragraph is probably unfinished.

### Questions are legitimate when the work genuinely cannot settle them

The prior papers use questions as analytic devices rather than engagement hooks. TSDNE contains appropriate unresolved questions:

- What exactly has been lost when the program remains reproducible?
- Does taking the code preserve the encounter or only its executable condition?
- What does **another** mean if the system refuses to decide why it was pressed?

Do not ask questions whose answers are already obvious from the preceding sentence.

## Theory

### Theory must work locally

Do not build a freestanding literature-review section that performs scholarly breadth and then disappears.

A reference earns space when it changes how a concrete mechanism can be read:

- Chun and Kirschenbaum belong where software persistence complicates interface disappearance;
- recommender and personalisation literature belongs where **another** is refused as feedback;
- refusal scholarship belongs where the architecture deliberately blocks conversions from action to data and from data to prediction;
- Franceschet and O'Dwyer belong where cryptographic identity becomes marketable provenance and scarcity;
- Kelty and Laurenzo's own media-appropriation/user-programmer work belong where executable code is released outside the artwork.

The theory should sharpen the apparatus. The apparatus should also be capable of resisting the theory.

### Do not import fashionable vocabularies as identities

TSDNE is not to be recoded as an STS paper, a privacy paper, a critical-design case study, a recommender-systems paper, or an NFT critique merely because those literatures are relevant.

The artwork remains the research object.

### Be geopolitically precise

The dissertation repeatedly resists categories produced at cultural centres and then applied universally. The manuscript should retain that suspicion. Do not turn North American/European platform scholarship into a universal description of all computational life. State the specific systems and political economies being criticised.

## Politics

Politics should be material rather than appended.

The source papers repeatedly reject artworks in which politics is a theme placed on top of an otherwise conventional apparatus. For TSDNE, the politics must therefore be found in operations such as:

- refusing to interpret visitor behaviour;
- refusing accounts and behavioural profiles;
- separating identification from ownership;
- allowing source reproduction;
- withholding an inventory;
- keeping anti-repetition memory non-reconstructive;
- avoiding a runtime model dependency;
- disclosing rather than denying the histories embedded in an authored grammar.

Do not write a final paragraph saying that these choices are "political implications". Analyse them as the politics of the work from the beginning.

## Technology

### Technical detail is part of the artwork

The manuscript should name relevant mechanisms: WebGL2, procedural families, colour and finish stages, perceptual descriptors, local persistence, cryptographic hashes, candidate selection, source export. These details are not implementation appendices when they determine the meaning of the encounter.

### Avoid technical fetishism

A number is useful only when it helps the argument. Thirty-nine families matters because the earlier twelve-family version visibly converged. Six colour modes and seven finish modes matter if they help explain how perceived abundance is produced. Hash algorithms matter only insofar as they support identity/integrity without title.

Do not fill the paper with implementation trivia merely to establish technical credibility.

### Name failure

The earlier papers do not present technology as frictionless. Keep production failures visible: the first generator was too stylistically narrow; maximal-complexity weighting produced sameness; the WebLLM version changed the work's interaction; selector bias had to be audited; real browser validity is not guaranteed by textual GLSL tests.

Failure is evidence about the artwork's problem.

## Art

Do not reduce the artwork to an illustrative interface for an argument.

The visual encounter must matter. The paper should describe duration, motion, colour, density, surface, visual genealogy, and the strange position of a shader that is both image and executable process.

The source texts permit sensuous language when earned by the work. Avoid generic descriptions such as "visually compelling", "immersive", "dynamic", or "engaging" unless made specific.

## Scientific and empirical register

The paper may be provocative without pretending hypotheses are findings.

Use three explicit levels of assertion:

1. **implemented fact** — established by source inspection or execution;
2. **production observation** — documented judgement made during development;
3. **visitor/phenomenological proposition** — requires empirical encounter evidence or must remain a question.

Examples:

- "**another** is not stored as a negative label" is an implemented fact.
- "the twelve-family generator became visibly repetitive" is a production observation that should be supported by preserved outputs/notes where possible.
- "relinquishment produces regret" is not presently a finding.

Do not promote level 2 or 3 claims into level 1 through confident prose.

## Recurrent conceptual interests to preserve

The source texts show sustained interests that are genuinely relevant to TSDNE:

- power and the distribution of technical knowledge;
- apparatuses that act back on their users;
- the instability of the user/programmer division;
- appropriation of technical knowledge as artistic practice;
- explicitation of normally hidden mechanisms;
- control that is always partial;
- the politics of interfaces;
- artificial scarcity;
- the capture of perception, attention, gesture, and cognition;
- geopolitical asymmetry in technological discourse;
- the body or subject as something produced by technical relations rather than merely represented by them;
- artworks as ways of thinking, rather than examples attached to prior theory.

The manuscript should make continuities with this work where they are real, but it must not become a retrospective of the author's career.

## Things to remove in every revision

- abstract-opening paragraphs that could introduce any AI/new-media paper;
- "In today's rapidly evolving digital landscape" language;
- claims that the work is "novel" without specifying the contribution;
- long enumerations of refusals where one analytic paragraph would be stronger;
- rhetorical triples and parallel constructions repeated until they become machine-like;
- section conclusions beginning "Thus", "Therefore", or "In this way" merely to summarise;
- detached descriptions of "the artist";
- inflated verbs such as "revolutionises", "redefines", "transforms" unless literally defended;
- universal claims about AI ethics, capitalism, visitors, or digital culture;
- false binaries between transparent procedural code and opaque machine learning;
- generic praise of serendipity, openness, participation, or free culture;
- sentimental claims about gifts or freedom that ignore infrastructure and law;
- conclusions that resolve the artwork's constitutive contradiction.

## A final test for the manuscript

The paper should be recognisably continuous with *Ekphrasis*, *5500*, and *Extraordinary Accident* even if the reader never sees the bibliography.

Not because it repeats their vocabulary, but because it does the same kind of work: it starts from a technically precise apparatus, finds the political and philosophical problem already operating inside it, and refuses the comfort of pretending that the contradiction can be solved by naming it.
