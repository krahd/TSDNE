# Deployment

## Requirements

TSDNE is a static site consisting of HTML, CSS, JavaScript, SVG assets, and GLSL source assembled in the browser.

It requires:

- HTTPS in production;
- WebGL2;
- standard browser cryptography for SHA-256;
- IndexedDB or a reduced localStorage fallback.

It does not require:

- Node.js in production;
- a database server;
- an API key;
- a language model;
- a model CDN;
- server-side inference;
- analytics;
- user accounts.

## Recommended deployment sequence

1. keep the repository private during visual and hardware validation;
2. run `npm run verify`;
3. serve `prototype/` locally and complete browser testing;
4. enable GitHub Pages through the committed workflow or publish the same directory on the Laurenzo host;
5. verify that no unexpected network requests occur after static loading;
6. attach the canonical domain;
7. enable HTTPS;
8. archive the release commit and a standalone source snapshot.

## GitHub Pages

The project is compatible with GitHub Pages because it has no server component. The Pages workflow verifies the repository and publishes `prototype/`.

A public repository is the simplest Pages configuration. A private-source/public-site configuration depends on the GitHub plan. A separate public deployment repository is an acceptable alternative.

## Laurenzo hosting

The same static directory may be hosted alongside `laurenzo.net`. This may provide greater control over headers, redirects, caching, and long-term domain management.

The artwork must remain portable between hosts.

## Domain

Recommended canonical domain:

`thisshaderdoesnotexist.com`

Optional short redirect:

`tsdne.com`

The short domain should redirect to the canonical domain rather than frame it.

## Caching

Recommended:

- long immutable cache for versioned assets;
- short cache for `index.html` during active development;
- correct JavaScript module MIME types;
- no service worker in the first release unless offline behaviour is carefully tested.

## Preservation

Archive:

- repository commit;
- static release directory;
- licence files;
- browser compatibility matrix;
- sample exported shaders;
- screenshots and video;
- documentation of local storage schema;
- generator and perception versions.

The removal of WebLLM means preservation no longer depends on a remote package URL, checkpoint repository, or model format.
