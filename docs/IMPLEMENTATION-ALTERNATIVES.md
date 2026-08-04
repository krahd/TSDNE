# Ten implementation alternatives

The alternatives are ranked for TSDNE's constraints: no paid services, no required server compute, strong visual output, broad device reach, code export, and a credible path to non-repetition.

## Summary ranking

| Rank | Architecture | Feasibility | Aesthetic control | Device coverage | Main conclusion |
|---:|---|---|---|---|---|
| 1 | Typed procedural AST / grammar | Very high | High | Very high | Best production foundation |
| 2 | Modular shader graph composition | Very high | High | Very high | Best companion to the typed grammar |
| 3 | Mutation and recombination of verified shaders | High | High | Very high | Strong expansion mechanism |
| 4 | Client-side novelty search over procedural candidates | High | Medium–high | High | Essential selection layer |
| 5 | Interactive evolution from visitor behaviour | High | Emergent | Very high | Valuable research layer, not sole generator |
| 6 | Browser LLM generates constrained DSL / JSON AST | Medium | Medium–high | Medium | Promising optional research path |
| 7 | Tiny custom shader model in ONNX / WASM | Medium | Potentially high | Medium–high | Strong research project, requires training work |
| 8 | Browser code LLM generates raw GLSL | Medium–low | Unstable | Medium–low | Technically possible, poor default |
| 9 | Large static pre-generated corpus | Very high | Very high | Very high | Reliable fallback, weak generative claim |
| 10 | Globally coordinated uniqueness service | Technically high | Neutral | High | Only route to strong global allocation; violates pure static constraint |

## 1. Typed procedural AST or grammar

Generate a typed expression tree or graph from curated primitives and transpile it to GLSL.

**Pros**

- No model download or service.
- Validity can be guaranteed structurally.
- Fast enough to generate many candidates locally.
- Reproducible from a seed.
- Easy to export to several host formats.
- Aesthetic knowledge can be encoded explicitly without fixing every image.
- Works with WebGL2 across desktop and mobile.

**Cons**

- Requires careful design of primitives, typing, depth, and family rules.
- Poor grammar design produces recognisable formulaic output.
- Human authorship of the design space is visible and must be embraced rather than hidden.

**Assessment:** best foundation.

## 2. Modular shader graph composition

Represent noise, warps, SDFs, palettes, masks, and compositors as reusable shader modules. Construct graphs from compatible modules.

**Pros**

- Strong correspondence between code organisation and visual structure.
- Modules can be tested independently.
- Supports family-level curation and later community contribution.
- Facilitates cost estimation and multiple export targets.
- Related systems such as shader modules, Material Maker, Shader Park, and ISF demonstrate the viability of modular shader construction.

**Cons**

- Graph combinatorics can still produce incoherent images.
- Uniform naming, coordinate spaces, and numerical ranges require discipline.
- Complex graphs can create very large shaders.

**Assessment:** combine with option 1.

## 3. Mutation and recombination of verified seed shaders

Begin with a curated collection of excellent shaders or graph structures. Mutate parameters, replace subgraphs, and recombine compatible regions.

**Pros**

- Starts from known aesthetic quality.
- Mutations can be typed and validated.
- Enables gradual growth of the design space.
- Closely aligned with established interactive evolutionary shader research.

**Cons**

- May remain visibly derivative of a small seed set.
- Requires provenance and licence discipline.
- Naive crossover often destroys composition.

**Assessment:** strong expansion mechanism after the initial grammar exists.

## 4. Client-side novelty search

Generate a batch of candidates, render samples, compute descriptors, and select candidates that are valid, visually structured, and distant from recent outputs.

**Pros**

- Makes visual non-repetition operational.
- Remains entirely local.
- Can compare multiple definitions of similarity.
- Converts generation from one random draw into a search process.
- Produces publishable research on dynamic perceptual distance.

**Cons**

- Candidate rendering consumes device energy and time.
- Simple metrics can reward noise or superficial difference.
- Learned embeddings add model downloads and may encode unrelated biases.
- No local metric can establish global uniqueness.

**Assessment:** essential as a selection layer; begin with cheap descriptors and add optional embeddings later.

## 5. Interactive evolution from visitor behaviour

Treat dwell time, refresh, claim, return, or explicit preference as signals that alter future sampling.

**Pros**

- The work learns from its own encounter structure.
- Refresh and claim become both poetic actions and evolutionary signals.
- Enables research on taste, stopping, regret, and collective selection.
- Can operate locally without collecting data.

**Cons**

- Dwell is not equivalent to liking.
- Global learning requires data collection and governance.
- Optimisation may collapse diversity toward popular motifs.
- New visitors have little personal history.

**Assessment:** use as optional local adaptation or an explicit consented study; never silently optimise a global aesthetic.

## 6. Browser LLM generates a constrained DSL or JSON AST

Run a small code or language model locally and require schema-constrained output describing the shader graph. Validate and transpile the result.

**Pros**

- Allows semantic prompts or broad conceptual mutations.
- Grammar-constrained generation prevents many syntax errors.
- Model output remains inspectable and repairable.
- WebLLM supports structured generation; Transformers.js can run ONNX text-generation models in the browser.

**Cons**

- Model download can be 100 MB to roughly 1 GB or more.
- WebGPU support and available memory vary substantially.
- Small models may not understand visual composition well.
- First load and generation latency conflict with immediate encounter.
- Model licensing and caching become part of deployment.

**Assessment:** best machine-learning experiment, but optional and loaded only on capable devices or in a research mode.

## 7. Tiny custom shader model in ONNX / WASM

Train a compact transformer, graph model, or variational model specifically on a licensed shader corpus or on the project's own ASTs. Deploy it with ONNX Runtime Web or Transformers.js.

**Pros**

- Model size and vocabulary can be tailored to the task.
- Training on typed ASTs can improve validity and compression.
- Could learn useful distributions without general-language overhead.
- Strong basis for research on client-side code generation.

**Cons**

- Requires dataset construction, provenance, training, evaluation, and model conversion.
- Training still requires one-off compute, even if deployment is free.
- A small corpus may overfit or reproduce source structures.
- The model may add little beyond a well-designed grammar.

**Assessment:** ambitious research track after the procedural system produces its own corpus.

## 8. Browser code LLM generates raw GLSL

Run a code model such as Qwen2.5-Coder 0.5B locally through WebLLM or Transformers.js and ask it to emit complete fragment shaders.

**Pros**

- Direct and conceptually legible form of client-side code generation.
- Can use compiler errors for repair loops.
- Open models and browser runtimes already make it technically possible.
- A 0.5B code model is considerably smaller than mainstream LLMs.

**Cons**

- The original 0.5B model is approximately 1 GB; browser-optimised variants still impose substantial download and memory costs.
- WebLLM reports about 945 MB VRAM for a q4f16 Qwen2.5 0.5B configuration.
- Raw output may fail compilation, violate the uniform contract, hang the GPU, or be visually poor.
- Code competence does not imply aesthetic competence.
- Mobile and Safari/Firefox support cannot be assumed.
- Multiple repair-and-render attempts increase latency and energy use.

**Assessment:** useful experimental comparison, not the production generator.

## 9. Large static pre-generated corpus

Generate and curate thousands of shaders offline, store them as static assets, and assign them pseudorandomly.

**Pros**

- Highest quality control.
- Near-instant experience.
- Broad compatibility and predictable performance.
- Static hosting only.
- Exact exports can be exhaustively tested.

**Cons**

- Finite corpus.
- Users can eventually enumerate or recover it.
- Cross-device allocation still repeats without shared state.
- Weakens the claim that generation occurs in the encounter.
- Storage and bandwidth grow with corpus size.

**Assessment:** excellent fallback and launch-safety layer; not sufficient as the final generative system.

## 10. Globally coordinated uniqueness service

Use a backend, database, edge worker, or ledger to allocate seeds and reject global duplicates.

**Pros**

- Enables strong global guarantees about seed or code allocation.
- Supports retirement, claim status, global novelty signatures, and aggregate research.
- Can coordinate cross-device sequences.

**Cons**

- Requires infrastructure and ongoing operational dependency.
- Perceptual uniqueness remains difficult even with a registry.
- Introduces privacy, abuse, availability, and governance issues.
- Free tiers can change or disappear.
- Contradicts the preferred static, no-compute architecture.

**Assessment:** not recommended for the first work. Add only if global allocation becomes artistically necessary.

# Iteration 1: direct browser LLM

The first examined architecture was:

1. load a small code LLM in the browser;
2. prompt it to produce GLSL;
3. compile;
4. repair with compiler feedback;
5. render and score;
6. repeat until acceptable.

This is technically feasible. WebLLM runs local models through WebGPU, Transformers.js supports text generation through ONNX Runtime Web, and Qwen2.5-Coder 0.5B has a browser-compatible ONNX conversion. It is not the preferred architecture because mandatory model weight, memory, first-load latency, device support, compiler failure, and inconsistent visual quality all work against the immediate full-screen encounter.

# Iteration 2: constrained hybrid

The revised architecture is:

1. typed procedural generator produces several valid graph candidates;
2. browser compiles and renders them offscreen;
3. cheap quality and novelty descriptors reject weak candidates;
4. one candidate is shown immediately;
5. generation of the next candidate continues in the background;
6. a local model, when available, may propose graph mutations or constrained JSON—not raw production GLSL;
7. export is generated deterministically from the graph.

This retains client-side code generation as a real research problem while protecting the artwork's speed, reach, and aesthetic coherence.
