# Changelog

## Unreleased

### Visual range

- Expanded the authored grammar from twelve to thirty-nine visual families,
  adding constructivist geometry (Richter, Eggeling, Suprematist, Bauhaus),
  reprographic surfaces (halftone, ordered dither, broadcast artefact),
  recursive and fractal systems (Apollonian, Julia orbit traps, KIFS, Droste),
  marched space with a moving camera (corridor, terrain, orbiting solid,
  volumetric cloud), biological systems (mitosis, venation, diatoms, dendritic
  networks), and physical systems (interference, iso-contours, marbling,
  contour survey, phyllotaxis, circuit traces).
- Separated colour from structure. Every family now expresses itself as a
  scalar field and resolves colour through a generated `shade()` function, so
  the same structure can arrive as a spectral field, a two-ink screen print, a
  riso separation, a paper-and-ink drawing, a neon ground, or a tinted
  monochrome.
- Added a reprographic `finish()` stage: grain, posterisation, ordered
  dithering, scanlines, vignette, and highlight bloom.
- Relaxed complexity enrichment so sparse, quiet and slow results remain
  reachable instead of forcing every result towards maximal density.
- Added colour separation to candidate selection and widened the family
  schedule across the whole vocabulary.
- Under-weighted per-pixel edge energy in the complexity score, which was
  quietly promoting dithered surfaces into a house style.

### Feedback and responsiveness

- Added an activity indicator with a search counter, so generation is visibly
  under way rather than apparently stalled.
- Ran candidate search in frame-budgeted slices, so the running shader keeps
  animating and the indicator keeps turning while the search continues.
- Ordered candidate validation cheapest-first, paying for the thirteen-frame
  flash screen only for candidates that would otherwise be shown. Every shader
  reaching the screen still passes the flash screen.
- A foreground request now waits for a background search already under way
  instead of starting a competing one.
- Raised control contrast, which light-ground results made necessary.

## 0.2.0-alpha.1 — revised procedural artwork

### Concept

- Re-centred TSDNE on encounter, serendipity, relinquishment, and free circulation.
- Removed the language model from the target public artwork.
- Frozen the formulations:
  - TSDNE retains provenance but abolishes title.
  - The shader can be identified, copied, and reconstructed, but not claimed.
- Replaced certificate and collectible implications with implicit technical provenance.
- Defined the local anti-repetition mechanism as an anti-archive.

### Runtime

- Removed WebLLM client and worker.
- Removed model loading, readiness, awakening, mutation, and model settings.
- Added deterministic complexity enrichment over the authored procedural grammar.
- Added local candidate pools and maximin perceptual novelty selection.
- Added stronger family separation across early encounters.
- Replaced reconstructive encounter history with bounded non-reconstructive perceptual traces.
- Added SHA-256 graph and source provenance kept outside the normal encounter.
- Replaced encounter certificates with technical manifests explicitly marked as non-certificates.
- Renamed the public continuation control to **take the code**.

### Documentation

- Rewrote project, architecture, genealogy, paper, research, privacy, accessibility, deployment, and release documents.
- Preserved the complete WebLLM predecessor at `archive/webllm-release-candidate-2026-08-04`.

## 0.1.0-alpha.2 — preserved predecessor

The previous release candidate implemented optional local WebLLM mutation, B + C awakening, model provenance, mutation baselines, and technical-study scaffolding. It remains available on the archive branch.
