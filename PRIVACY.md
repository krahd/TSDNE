# Privacy and data flows

## Baseline procedural mode

TSDNE does not require an account and does not add:

- analytics;
- advertising;
- cross-site identifiers;
- a public encounter database;
- server-side shader generation;
- a preference or recommendation model;
- remote prompt collection.

The static host still receives ordinary requests for the page and its assets. Depending on the host, those requests may expose standard network metadata such as IP address, user agent, request time, and referrer. TSDNE’s source does not control the host’s infrastructure logs.

## Local encounter trace

The browser stores a bounded record of recent encounters to reduce immediate structural and perceptual repetition. Records may contain:

- encounter identifier;
- date;
- family;
- origin;
- source/program signature;
- structural vector;
- compact rendered descriptor;
- model and mutation provenance where applicable.

IndexedDB is preferred, with a limited localStorage fallback.

This is a behavioural trace in the descriptive sense that it records what this browser was shown. The project’s safeguards are:

- the trace remains local to the browser;
- it is not uploaded by TSDNE;
- it is not linked to an account or declared identity;
- it is not shared across sites;
- it is not interpreted as taste, preference, attachment, or intent;
- it is bounded;
- it can be cleared from **about**.

Clearing browser storage may also remove it. Private-browsing behaviour varies by browser.

## Optional local-model mode

Local AI is off by default. Enabling it initiates additional data flows:

1. the pinned `@mlc-ai/web-llm` runtime is fetched from `esm.run`;
2. model artefacts are fetched from external model hosts configured by WebLLM;
3. those hosts receive ordinary request metadata;
4. browser and runtime caches may retain downloaded files;
5. inference then executes on the visitor’s device through WebGPU.

The compact shader-program description is supplied to the model locally. TSDNE does not send it to a remote inference API. This does not mean that enabling local AI is network-free or anonymous.

The current runtime version and host are exposed in the interface. Before durable release, the project should consider vendoring the runtime and self-hosting model files where licensing permits.

## Local performance records

TSDNE may store local measurements such as:

- candidate-generation time;
- model-load time;
- accepted or rejected proposal counts;
- model identifier;
- approximate download information;
- validation metadata.

These records remain local and can be cleared from **about**. They must not be interpreted as a visitor profile.

## What TSDNE does not infer

The source does not treat:

- dwell time as preference;
- replacement as dislike;
- export as ownership;
- model opt-in as endorsement;
- repeated use as identity;
- local trace as consent to research.

Any later encounter study requires a separate protocol, appropriate consent, and institutional review where applicable.

## Limits

Local execution does not by itself establish:

- complete privacy;
- offline operation;
- ethical model provenance;
- freedom from upstream logging;
- secure or immutable dependencies;
- equal access across devices;
- lower energy use.

The deployed host, browser, WebLLM runtime, model host, device, operating system, network, and extensions remain part of the data environment.

## Visitor controls

Through **about**, visitors can:

- leave local AI disabled;
- choose a model before loading;
- clear the local encounter trace;
- clear local performance records;
- enable reduced motion or reduced intensity.

A future release should add a machine-readable external-request inventory and verify it against browser network logs.
