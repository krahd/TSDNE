# This Shader Does Not Exist

*This Shader Does Not Exist* (TSDNE) is a browser artwork about serendipity, computational abundance, relinquishment, executable persistence, and non-proprietary relation.

One generated shader appears at a time. The visitor may remain with it, relinquish it for another unknown possibility, or take its freely reusable code elsewhere. There is no catalogue, comparison grid, prompt, recommendation system, account, ownership registry, or public archive.

> **TSDNE retains provenance but abolishes title.**
>
> **The shader can be identified, copied, and reconstructed, but not claimed.**

## The encounter

TSDNE does not ask the visitor to design a shader or navigate an optimisation space. Its interaction is deliberately narrow:

1. a shader appears;
2. the visitor may remain with it;
3. **another** relinquishes it through the interface;
4. **take the code** permits its executable form to continue elsewhere.

The work produces a singular encounter without claiming a scarce or unique object. A shader may be computationally reproducible and still be unavailable after it is relinquished through the interface. This is interface-produced loss over a reproducible substrate, not simulated destruction.

## Personal without personalisation

The artwork creates individual difference without identifying or modelling the visitor. It does not collect personal information, infer taste, maintain an account, build a recommendation profile, or optimise towards predicted engagement.

The encounter may become personal because of attention, decision, attachment, regret, or continuation. It is not personalised because the system has classified the visitor.

## Generativity without a language model

The public artwork uses authored procedural systems, WebGL2, deterministic seeds, perceptual analysis, and local novelty-and-quality search. It does not use an LLM or external inference service.

This is a deliberate artistic and infrastructural decision. The title enters the cultural field of generative-AI “does not exist” projects while refusing the assumption that contemporary generativity must depend on a foundation model, scraped training corpus, remote model host, or high-memory device.

Shader richness is treated as an artistic and engineering requirement. Candidate programs are generated from several authored visual grammars, rendered locally, screened for technical and perceptual quality, and selected for difference from recent encounters.

## Local anti-repetition memory

A shallow generator would undermine the work: three similar results can make computational abundance appear fraudulent. TSDNE therefore keeps a bounded local memory of perceptual difference.

The memory stores only:

- a local random key;
- time of display;
- broad visual family;
- compact, non-reconstructive colour, luminance, spatial, and temporal descriptors.

It does **not** store:

- shader source;
- seed;
- graph or parameters;
- image or video frames;
- account or identity;
- inferred preference;
- a route back to a relinquished shader.

The system remembers enough not to repeat, but not enough to restore. The memory never leaves the browser and can be cleared from **about**.

## Provenance without title

The software internally computes deterministic seeds and cryptographic hashes. These support technical integrity, debugging, reconstruction of deliberately exported code, and verification that a source file corresponds to a graph.

They are not presented as certificates. TSDNE provides:

- no minting;
- no public registry;
- no serial-number display;
- no edition;
- no authenticity theatre;
- no global uniqueness claim;
- no ownership or transfer record;
- no artificial scarcity.

When the visitor takes the code, a plain technical manifest accompanies it. The manifest explicitly describes itself as **not a certificate** and confers no title.

## Status

The current target is the complete revised public-release candidate described in [`docs/UPDATED-VERSION-GOAL.md`](docs/UPDATED-VERSION-GOAL.md).

The former WebLLM, model-mutation, and awakening implementation is preserved at the branch:

`archive/webllm-release-candidate-2026-08-04`

## Running locally

```bash
cd prototype
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser with WebGL2.

To verify the source:

```bash
npm install --ignore-scripts
npm run verify
```

The project has no runtime package dependency and can be served as static files.

## Interaction

- **another** — relinquish the present shader and encounter another;
- **take the code** — download or copy executable source and adapters;
- **pause** — pause or resume motion;
- **about** — read the work’s position, privacy architecture, and accessibility settings.

Keyboard controls:

- `N`: another;
- `U`: take the code;
- `Space`: pause or play;
- `A`: about.

## Architecture

The browser performs all generation and evaluation locally:

1. the authored procedural grammar generates candidate shader programs;
2. WebGL2 compiles and renders them;
3. fixed temporal samples produce compact perceptual descriptors;
4. technical, flash, motion, luminance, and variance checks reject unsuitable candidates;
5. a maximin novelty tournament favours candidates distant from recent local traces;
6. early encounters apply stricter family and perceptual separation;
7. only the selected shader is shown;
8. its reconstructive information remains in active memory unless the visitor takes the code;
9. only a non-reconstructive perceptual trace enters local anti-repetition memory.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Privacy

TSDNE has:

- no analytics;
- no cookies;
- no account;
- no advertising;
- no fingerprinting;
- no behavioural profile;
- no remote inference;
- no server-side generation;
- no third-party model request.

See [`PRIVACY.md`](PRIVACY.md).

## Free circulation

The authored application and generator are licensed under GPL-3.0-or-later. Generated shader output is offered under a CC0 waiver to the extent that waivable rights exist.

The gesture is not “you own this.” It is “this executable form may continue elsewhere.”

See [`GENERATED-SHADERS-LICENSE.md`](GENERATED-SHADERS-LICENSE.md).

## Research and writing

The first paper is practice-led and HCI-adjacent. Its central claim is not a new shader-generation algorithm. It examines how computational systems may stage personally meaningful difference while refusing behavioural personalisation, proprietary title, certification, accumulation, and manufactured scarcity.

See:

- [`docs/PROJECT.md`](docs/PROJECT.md)
- [`docs/PAPER-1.md`](docs/PAPER-1.md)
- [`docs/GENEALOGY.md`](docs/GENEALOGY.md)
- [`docs/RESEARCH-PLAN.md`](docs/RESEARCH-PLAN.md)

## Authorship

Concept, artistic direction, procedural grammar, software, and writing: Tomas Laurenzo.
