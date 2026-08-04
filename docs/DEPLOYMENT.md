# Deployment strategy

**Status date:** 4 August 2026  
**Current status:** alpha; staging deployment not yet validated

## 1. Requirements

The baseline artwork must remain deployable as static files with:

- HTTPS;
- HTML, CSS, JavaScript, and static assets;
- WebGL2;
- no application server;
- no account system;
- no project database;
- no paid inference endpoint.

Optional local-model mode additionally requires:

- WebGPU;
- a pinned WebLLM runtime;
- external or self-hosted model artefacts;
- disclosed network requests;
- explicit visitor opt-in.

The deployment must not block the procedural encounter while optional model assets load.

## 2. Hosting options

### GitHub Pages

Suitable for staging or production when:

- the current account and repository configuration support the intended Pages route;
- static hosting limits are compatible with the site;
- required MIME types and HTTPS work;
- public deployment from a private source repository is understood and acceptable.

GitHub plan entitlements, Pages limits, domain behaviour, and Actions configuration are mutable. Recheck current official GitHub documentation at deployment time rather than relying on figures preserved in this repository.

### Separate public deployment repository

A private source repository may publish only the deployable `prototype/` artefacts to a public Pages repository.

This separates research notes from the deployment repository, but client-side JavaScript remains inspectable in the deployed site.

### Existing Laurenzo hosting

The infrastructure used for `laurenzo.net` may be preferable when it provides:

- simpler private staging;
- explicit cache and security headers;
- redirect management;
- more transparent logs;
- easier self-hosting of runtime assets;
- less dependence on GitHub plan features.

The choice should be made after comparing actual current capabilities, not assumed in advance.

## 3. Recommended sequence

1. deploy to a non-public or obscure staging URL;
2. run browser and mobile smoke tests;
3. inspect all network requests;
4. verify local storage and clearing;
5. measure procedural generation latency;
6. test optional model opt-in, loading, failure, and caching;
7. execute all export targets;
8. complete accessibility and photosensitive-content review;
9. only then select production hosting and domain.

## 4. External runtime and model assets

The current alpha imports a pinned WebLLM runtime from `esm.run` and obtains model files through WebLLM’s configured external hosts.

Before production, decide among:

- retain remote delivery with explicit disclosure;
- vendor and bundle the runtime;
- self-host model files where licensing permits;
- publish asset hashes and an external-request manifest;
- remove optional local AI from the public build.

Version pinning alone does not provide Subresource Integrity for a dynamic import and does not eliminate supply-chain risk.

Model downloads should remain opt-in and off by default. Do not place large model files in the principal static deployment without measuring bandwidth, caching, cost, and preservation consequences.

## 5. Privacy and logs

“No analytics” does not mean “no logs.” Static hosts, CDNs, DNS providers, runtime hosts, and model hosts may retain ordinary request metadata.

Before release:

- document which services receive requests;
- inspect network traffic in a clean browser profile;
- review host logging and retention controls where available;
- avoid adding analytics, advertising, cross-site identifiers, or fingerprinting;
- ensure the public privacy notice matches the deployed topology.

## 6. Domains

Possible domains:

- `thisshaderdoesnotexist.com`;
- `tsdne.com` as a shorter redirect.

Availability and price must be checked at purchase time. Do not wrap one deployment in an iframe. Use one canonical HTTPS origin and redirect secondary domains permanently.

The title itself remains provisional until visual and public testing, so domain purchase need not precede staging.

## 7. Caching and versioning

Preserve:

- application version;
- generator schema and version;
- WebLLM runtime version where used;
- model identifier and licence;
- deployment commit;
- browser and hardware notes;
- representative screenshots and video;
- external-request inventory.

Cache policy should distinguish:

- small versioned application assets;
- optional large model artefacts;
- user-clearable local encounter traces;
- local diagnostic records.

## 8. Offline and exhibition deployment

The baseline procedural artwork should be packageable for local exhibition hardware.

A genuinely offline package requires:

- bundled application assets;
- no remote fonts or runtime imports;
- vendored model runtime and artefacts if local AI is retained;
- tested cache-independent startup;
- documented hardware and browser version;
- recovery procedure after context or device failure.

Do not describe the current web deployment as offline-capable while it retains remote optional assets.

## 9. Security headers

Where the host allows, evaluate:

- Content Security Policy;
- restrictive `connect-src`, `script-src`, and worker policies;
- `X-Content-Type-Options`;
- referrer policy;
- permissions policy;
- framing restrictions;
- immutable caching for versioned assets.

A policy must be tested with WebGL, module workers, dynamic runtime loading, and model fetches. Do not publish a nominal CSP that is silently disabled or overly permissive.

## 10. Production gate

Production deployment requires:

- alpha and beta criteria in [`PROTOTYPE.md`](PROTOTYPE.md);
- completed [`../RELEASE-CHECKLIST.md`](../RELEASE-CHECKLIST.md);
- staged network and storage verification;
- accessible public notices;
- final decision on model inclusion;
- final title and canonical domain decision;
- preservation capture.

The application remains host-portable. The domain and artwork should not depend conceptually on one hosting provider.
