# Security policy

TSDNE is a static browser artwork. It has no account system, application server, payment flow, or project-controlled user database. Its security boundary nevertheless includes generated shader execution, browser and GPU stacks, remote dependency loading, model artefacts, exported files, and local storage.

## Report privately

Report vulnerabilities to **tomas@laurenzo.net**. Do not include unnecessary personal information, secrets, or third-party data.

Useful reports include:

- code execution outside the intended WebGL or browser scope;
- generated shaders causing browser, GPU, or device instability;
- malformed exports executing unintended code;
- dependency or model substitution;
- compromise of remotely imported runtime code;
- transmission of local encounter records;
- persistent cross-site identifiers;
- storage clearing that does not work as described;
- model prompts or program descriptions sent to remote inference services;
- denial-of-service through candidate generation or validation;
- unsafe handling of untrusted future shader primitives;
- discrepancies between disclosed and actual network requests.

## Current trust boundary

### Procedural mode

The current generator emits GLSL from authored templates and bounded values. It does not execute unrestricted model-written GLSL. This reduces but does not remove risks in:

- browser shader translators;
- GPU drivers;
- WebGL implementations;
- expensive or pathological parameter combinations;
- exported host integrations.

### Optional local-model mode

When enabled, the alpha imports a pinned WebLLM runtime from `esm.run` and downloads model artefacts from external hosts. Version pinning does not provide Subresource Integrity for the dynamic import and does not eliminate upstream or delivery compromise.

Before durable release, evaluate:

- vendoring or bundling the runtime;
- publishing asset hashes;
- self-hosting permissible model files;
- documenting every external request;
- testing compromise and offline failure behaviour.

### Local storage

The bounded encounter trace and performance records are local browser data. A vulnerability that uploads, exposes, expands, or fails to clear these records is in scope.

### Exports

Every export format must be treated as generated code. A structurally plausible export is not automatically safe or correct. Test exports in isolated target environments before publication.

## Supported versions

Only the latest commit on `main` is currently maintained during alpha development. No tagged release is considered security-supported until the release checklist is complete.

## Coordinated disclosure

Please allow reasonable time to reproduce and address a report before public disclosure. TSDNE will not request concealment of unresolved public risk indefinitely.

## Limits

This policy is not a security certification. Browser, GPU, operating-system, hosting, runtime, model, and third-party infrastructure remain outside the project’s complete control.
