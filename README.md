# This Shader Does Not Exist

**TSDNE** is a browser artwork that presents one full-screen generative shader at a time. A visitor may remain with it, relinquish it for another, or take the exact code and instructions needed to use it elsewhere.

The work is centred on the poetics of refreshing: apparent generative abundance is experienced through the irreversible loss of a particular encounter. The system should produce visually compelling shaders, minimise perceptual repetition, and remain free to operate. The only planned expense is the project domain.

## Repository status

This repository is the implementation and research home of TSDNE.

- **Status:** active development; zero-cost hybrid architecture selected; dependency-free browser proof of concept included.
- **Canonical specification:** [`PROJECT.md`](PROJECT.md)
- **Architecture:** [`ARCHITECTURE.md`](ARCHITECTURE.md)
- **Hybrid WebLLM design and frozen decisions:** [`HYBRID-WEBLLM.md`](HYBRID-WEBLLM.md)
- **Ten implementation alternatives:** [`IMPLEMENTATION-ALTERNATIVES.md`](IMPLEMENTATION-ALTERNATIVES.md)
- **Research programme:** [`RESEARCH-PLAN.md`](RESEARCH-PLAN.md)
- **First journal paper:** [`PAPER-1.md`](PAPER-1.md)
- **Current decisions and next actions:** [`STATUS.md`](STATUS.md)
- **Technical and artistic references:** [`REFERENCES.md`](REFERENCES.md)
- **Baseline prototype:** [`prototype/`](prototype/)

## Current architectural decision

The preferred capable-device version combines a **typed procedural shader synthesiser** with a **small local WebLLM agent**.

1. Generate a cryptographically strong 128-bit seed in the browser.
2. Construct a valid shader graph from typed, curated visual primitives and compositional rules.
3. Present the first procedural shader immediately.
4. Load WebLLM unobtrusively in a worker where WebGPU and device resources permit.
5. Let the model propose mutations in a TSDNE-specific graph language rather than unrestricted GLSL.
6. Compile and render candidates locally with WebGL2.
7. Reject broken, blank, static, excessively expensive, inaccessible, or visibly weak candidates.
8. Compare compact structural and perceptual signatures against bounded local history.
9. Present one selected shader full-screen.
10. Export exact source, encounter metadata, and verified host templates when the visitor chooses **use this shader**.

The procedural mode remains a complete artwork on unsupported or lower-power devices. The model is consequential but does not receive personal data and does not decide validity, quality, uniqueness, or ownership.

## Personal without personalisation

TSDNE gives each visitor a particular computational encounter without collecting identity, preference, location, behavioural history, or cross-site data. The shader becomes personal through attention, relinquishment, selection, and use, not through prior profiling.

The exported encounter record identifies the shader's source, seed, graph, and generator version. It confers no ownership, exclusivity, artificial scarcity, or resale right. The code is intended to be freely copied, modified, studied, shared, and incorporated into other works.

## Uniqueness

Cryptographic seeds make exact computational collisions negligibly probable, but different seeds can produce identical or quasi-identical visuals. TSDNE therefore samples dynamic output and reduces obvious recent structural and perceptual repetition locally.

It does not claim absolute global visual uniqueness. The project treats computational identity, perceptual identity, and encounter identity as related but distinct.

## First publication

The first publication is journal-first and practice-led. Its provisional title is:

> **Personal without Personalisation: Ephemerality, Relation, and Bespoke AI in *This Shader Does Not Exist***

The paper centres exploration, refreshing, ephemerality, contingent uniqueness, personal relation without property, individualisation without surveillance, and the political and aesthetic possibilities of a local bespoke AI. Technical comparison and HCI studies may become later papers.

## Running the baseline prototype

The prototype is static and has no dependencies. Because it uses ES modules, serve the directory with any local HTTP server:

```bash
cd prototype
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

The prototype is an architectural baseline, not the final aesthetic system. Its generator contains several curated shader families, local structural non-repetition, compile validation, coarse luminance and motion checks, and a raw shader-bundle export. Verified self-contained WebGL, Three.js, ShaderToy, and ISF exports remain part of the next implementation phase.

## Zero-cost constraint

The intended deployment is a static HTTPS site. Shader generation, validation, rendering, comparison, optional local model inference, and export should run on the visitor's device. No paid API, hosted inference, account, database, or server process is required.

## Licence

The application licence and the free-use terms attached to exported shaders remain to be finalised. Neither should create exclusive ownership or artificial scarcity.