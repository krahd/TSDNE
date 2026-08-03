# This Shader Does Not Exist

**TSDNE** is a browser artwork that presents one full-screen generative shader at a time. A visitor may remain with it, relinquish it for another, or take the exact code and instructions needed to use it elsewhere.

The work is centred on the poetics of refreshing: apparent generative abundance is experienced through the irreversible loss of a particular encounter. The system should produce visually compelling shaders, minimise perceptual repetition, and remain free to operate. The only planned expense is the project domain.

## Repository status

This repository is now the implementation and research home of TSDNE.

- **Status:** research and zero-cost architecture selected; dependency-free browser proof of concept included.
- **Canonical specification:** [`PROJECT.md`](PROJECT.md)
- **Architecture:** [`ARCHITECTURE.md`](ARCHITECTURE.md)
- **Ten implementation alternatives:** [`IMPLEMENTATION-ALTERNATIVES.md`](IMPLEMENTATION-ALTERNATIVES.md)
- **Research programme:** [`RESEARCH-PLAN.md`](RESEARCH-PLAN.md)
- **Current decisions and next actions:** [`STATUS.md`](STATUS.md)
- **Technical and artistic references:** [`REFERENCES.md`](REFERENCES.md)
- **Baseline prototype:** [`prototype/`](prototype/)

## Current architectural decision

The first public version should use a **typed procedural shader synthesiser**, not unrestricted LLM generation.

1. Generate a cryptographically strong 128-bit seed in the browser.
2. Construct a valid shader from typed, curated visual primitives and compositional rules.
3. Compile and render it locally with WebGL2.
4. Reject broken, blank, static, excessively expensive, or obviously weak candidates.
5. Compare compact visual and structural signatures against local history.
6. Present the selected shader full-screen.
7. Export the exact source and tested host templates when the visitor chooses **use this shader**.

A small browser model may later propose or mutate the constrained intermediate representation. It should not be required for the artwork to function.

## Running the baseline prototype

The prototype is static and has no dependencies. Because it uses ES modules, serve the directory with any local HTTP server:

```bash
cd prototype
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

The prototype is an architectural baseline, not the final aesthetic system. Its generator contains several curated shader families, local structural non-repetition, compile validation, coarse luminance and motion checks, and a raw shader-bundle export. Verified self-contained WebGL, Three.js, ShaderToy, and ISF exports remain part of the next implementation phase.

## Zero-cost constraint

The intended deployment is a static HTTPS site. All shader generation, validation, rendering, comparison, and export should run on the visitor's device. No paid API, hosted model inference, database, or server process is required.

## Licence

The licence for the application and the licence attached to exported shaders remain to be decided. They may need to differ.
