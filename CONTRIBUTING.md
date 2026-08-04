# Contributing

TSDNE is an authored open-source artwork in alpha. Contributions are welcome when they preserve the central structure documented in [`docs/PROJECT.md`](docs/PROJECT.md):

> **one object, no return, take the source**

Technical sophistication is not sufficient by itself. A change should state its consequence for the encounter, visual field, access, circulation, or claim boundary.

## High-priority contributions

- reproducible browser and device compatibility reports;
- family-grouped visual review and contact sheets;
- accessibility and photosensitive-content review;
- validated export adapters;
- generation and rendering performance measurements;
- security and external-request analysis;
- dependency and model-licence corrections;
- tests for rendering, storage, model, network, and fallback failures;
- corrections to references and attribution;
- visual families or primitives that demonstrably expand the aesthetic field;
- model, random, and authored mutation comparisons.

## Evidence expected

Depending on the contribution, include:

- browser, OS, device, and GPU;
- exact commit;
- reproduction steps;
- screenshots or video;
- console or network logs without personal data;
- before/after latency;
- automated tests;
- accessibility consequence;
- artistic consequence;
- limitations and unresolved risks.

## Not in scope for the ordinary artwork

- accounts;
- advertising;
- analytics;
- cross-site tracking;
- public ownership registries;
- marketplaces, NFTs, or scarcity certificates;
- hidden preference models;
- paid inference dependencies;
- unrestricted remote prompt collection;
- mandatory model loading;
- population grids or galleries replacing the one-object encounter;
- absolute visual-uniqueness claims;
- visitor-affect claims inferred from dwell time alone;
- authored fallbacks attributed to a model.

Research or diagnostic modes may test some otherwise excluded interfaces when they are clearly separated from the public artwork and use appropriate consent.

## Representation boundary

The current alpha uses authored families and bounded traits. Do not describe it as a typed AST or submit changes that rely on nonexistent graph topology.

A future typed grammar should be proposed as a distinct research change with:

- schema;
- compiler;
- validity rules;
- tests;
- export implications;
- visual comparison with the current system;
- justification for the artwork.

## Local-model contributions

Model changes must preserve:

- opt-in operation;
- procedural completeness;
- explicit runtime and model requests;
- proposal provenance;
- deterministic validation;
- rejection of ineffective proposals;
- matched simpler baselines;
- no claim of model superiority without evidence.

## Verification

Run:

```bash
npm run verify
```

Passing tests do not establish visual quality, accessibility, security, or target-host export compatibility. State which manual checks were performed.

## Documentation and AI assistance

Follow [`docs/AI-USE-STATEMENT.md`](docs/AI-USE-STATEMENT.md). Machine-produced code, prose, citations, and audits remain subject to human responsibility. Do not alter author order, collaborator status, quotations, or licensing representations without direct verification.
