# Deployment and domain strategy

**Status date:** 3 August 2026  
**Decision state:** GitHub Pages is the recommended initial host; existing Laurenzo infrastructure remains a fallback or later migration path.

## Hosting requirements

TSDNE is deliberately compatible with static hosting.

The public site requires:

- HTTPS;
- HTML, CSS, JavaScript, WebAssembly, and static assets;
- WebGL2;
- optional WebGPU for WebLLM;
- service-worker or browser-cache support;
- correct MIME types;
- no application server;
- no database;
- no user accounts;
- no paid inference endpoint.

Model artefacts should be downloaded from an appropriate external model host or CDN and cached locally by the browser. They should not normally be committed to or served from the website repository.

## Recommended initial architecture

### Application

Host the static application through GitHub Pages from `krahd/TSDNE` or from a dedicated deployment branch/workflow.

### Model artefacts

Load the selected MLC/WebLLM model from its model repository or a suitable external host with correct CORS and caching support.

### Domain

Point one canonical custom domain directly to GitHub Pages through DNS. Do not embed or wrap the GitHub Pages site in an iframe.

The browser should show the canonical TSDNE domain while GitHub Pages serves the underlying static files.

## GitHub Pages suitability

GitHub Pages is appropriate because:

- TSDNE is a public non-commercial artwork;
- the site is static;
- GitHub supplies HTTPS and custom-domain support;
- deployment can be tied directly to repository commits;
- the application itself should remain small;
- model traffic can be served externally rather than consuming Pages storage and bandwidth;
- no sensitive transaction or server-side state is required.

Current documented constraints include:

- private-repository Pages requires GitHub Pro, Team, or Enterprise;
- a Pages site remains publicly accessible even when its source repository is private;
- published sites have a documented 1 GB maximum;
- Pages has a soft bandwidth limit of 100 GB per month;
- one GitHub Pages site accepts one custom-domain value in its `CNAME` configuration;
- apex and `www` variants of the same domain can redirect automatically when configured correctly;
- unrelated secondary domains require an external redirect.

These limits are compatible with TSDNE as long as model weights are not served from the Pages repository.

## Private-repository question

`krahd/TSDNE` is private.

Possible routes:

### Route A — GitHub Pages from the private repository

Use this when the GitHub account plan supports Pages for private repositories.

Advantages:

- one repository;
- simplest versioning and deployment;
- source can remain private while the published site is public.

### Route B — private source repository plus public deployment repository

Build the static site from `krahd/TSDNE` and publish only generated site artefacts to a separate public Pages repository.

Advantages:

- works without private-repository Pages entitlement;
- keeps research notes and source implementation private;
- public repository contains only deployable assets.

Costs:

- additional deployment configuration;
- public build artefacts reveal browser-side JavaScript and shaders regardless, since all client-side code is ultimately inspectable.

### Route C — existing Laurenzo hosting

Deploy the generated static site to the same paid hosting infrastructure used for `laurenzo.net`.

Advantages:

- avoids GitHub plan dependency;
- may provide more control over redirects, caching headers, custom response headers, logs, and deployment topology;
- both domains can be handled within one existing hosting account;
- easier later migration if custom workers, edge redirects, or headers become necessary.

Costs:

- deployment becomes coupled to the Laurenzo hosting configuration;
- may create unnecessary integration work for a deliberately self-contained artwork;
- exact benefits depend on the actual host and plan.

## Recommendation

Begin with GitHub Pages unless one of these conditions applies:

- the GitHub plan does not support Pages from the private repository and a public deployment repository is undesirable;
- the existing Laurenzo host provides an already working static deployment pipeline that is equally simple;
- TSDNE later requires response headers, edge redirects, or traffic controls unavailable through Pages;
- Pages bandwidth becomes material.

The application should remain host-portable so migration consists primarily of changing deployment and DNS.

## Domains

The intended long domain is:

- `thisshaderdoesnotexist.com`

The shorter alternative is:

- `tsdne.com`

The spelling `thishaderdoesnotexist.com` omits the second `s` in `this shader` and should not be used unless intentionally acquired as a typo redirect.

Domain availability was not established by the current web search and must be checked through a registrar immediately before purchase.

## One or both domains

### Preferred canonical domain

`thisshaderdoesnotexist.com` is the stronger artwork title and should be the canonical public address if available and affordable.

### Secondary shorthand

`tsdne.com` is useful as:

- a short spoken and printed address;
- a protective registration;
- a redirect to the canonical site.

If both are purchased:

1. configure one as the only canonical GitHub Pages domain;
2. redirect the other at the registrar, DNS provider, Cloudflare, or the existing Laurenzo host;
3. use a permanent HTTPS redirect rather than iframe wrapping;
4. retain one canonical origin for service-worker caches, model storage, analytics-free privacy claims, and search indexing.

GitHub Pages does not accept two unrelated domains in one `CNAME` file.

## DNS outline for GitHub Pages

The exact records must be copied from current GitHub documentation when deployment occurs.

General sequence:

1. verify the domain through GitHub before pointing DNS where possible;
2. configure the custom domain in repository **Settings → Pages**;
3. configure the apex with GitHub's supported `A`, `ALIAS`, or `ANAME` records;
4. configure `www` as a `CNAME` pointing to the GitHub Pages account domain;
5. wait for DNS and certificate propagation;
6. enable **Enforce HTTPS**;
7. test apex, `www`, canonical redirects, service worker, model downloads, and browser caches;
8. avoid wildcard DNS records.

## Model-hosting and bandwidth policy

Do not place a 300 MB–1 GB WebLLM model inside GitHub Pages unless there is a compelling preservation reason.

At 300 MB per cold visitor:

- 100 visitors transfer approximately 30 GB;
- 1,000 visitors transfer approximately 300 GB.

This can exceed GitHub Pages' soft bandwidth allowance quickly.

Instead:

- use official or project-controlled Hugging Face/MLC model hosting;
- rely on long-lived browser caching;
- load only one selected small model;
- avoid downloading the model until the procedural encounter is already visible;
- consider explicit disclosure of model size and local storage use;
- retain a clear-cache control in **about** or diagnostics;
- record model version and integrity metadata.

## Deployment workflow

### Initial alpha

1. Build static files.
2. Run syntax, unit, deterministic-generation, export, and browser smoke tests.
3. Deploy to the default `github.io` project URL.
4. Test WebGL2, WebGPU, workers, service worker, external model CORS, caching, and mobile behaviour.
5. Purchase and attach the custom domain only after the deployment is stable.

### Production

1. Push or merge to `main`.
2. GitHub Actions builds and tests the site.
3. Publish an immutable build artefact to Pages.
4. Preserve generator version and release tag.
5. Keep project research documents outside the published site unless deliberately exposed.
6. Confirm custom domain and HTTPS after every deployment change.

## Portability rule

The site must not depend on GitHub-specific runtime APIs. It should be deployable unchanged, or with only base-path configuration, to:

- GitHub Pages;
- the existing Laurenzo static host;
- Netlify, Cloudflare Pages, or another static host;
- local exhibition hardware;
- an offline package.

The domain belongs to the artwork, not to the hosting provider.

## Current decision

- Use immediate procedural rendering.
- Do not block the first encounter with model loading.
- Develop and test on GitHub Pages first.
- Keep the deployment portable to the existing Laurenzo host.
- Use one canonical domain and redirect any secondary domain.
- Prefer `thisshaderdoesnotexist.com` as the canonical name if available.
- Consider purchasing `tsdne.com` as a shorthand redirect if the additional annual cost is acceptable.
