# Changelog

## 0.3.1-alpha.1 — information surface

### Information and authorship

- Reworked the information dialog as a quieter editorial surface rather than a dense application panel.
- Added a manuscript-derived **statement** alongside **about**, **privacy**, and **accessibility**, all rendered inside the same information window.
- Moved the Tomas Laurenzo attribution to the information footer, on the same line as the application version.
- Added one restrained ochre accent to headings, active information navigation, selected quotations, and the author link to break typographic monotony without introducing gradients, cards, or decorative product-UI styling.
- Added regression tests for the internal information views, attribution/footer placement, statement propositions, and restrained colour treatment.

## 0.3.0-alpha.1 — expanded aesthetic range

### Visual range

- Added eleven structural families, taking the grammar to forty-nine, and
  opening aesthetic directions the previous set did not reach:
  - **wireframe-solid** — projected polyhedron edges with depth falloff;
  - **stereo-parallax** — side-by-side eyes with lens distortion;
  - **grid-horizon** — receding neon grid under a banded sun;
  - **memphis-pattern** — flat confetti primitives on a bright ground;
  - **latent-wash** — the surface of a generative image model, rendered
    procedurally: latent-grid interpolation, repeated contrast pushes,
    checkerboard upsampling artefacts and residual noise. No model is involved
    or consulted; it is an authored imitation of an appearance;
  - **volume-tomogram** — emission-absorption volume with a travelling slice;
  - **caustic-pool** — light refracted through a moving surface;
  - **newton-basins** — Newton's method basins of attraction;
  - **rule-automaton** — elementary cellular automaton in closed form, where
    rule 90 from a single live cell is evaluated directly by a bitwise AND;
  - **grammar-spiral** — context-free substitution of one rule on one shape;
  - **branch-growth** — a tree grown by folding space, with a growth front.
- Removed **echo-garden**. Measured against the rest of the grammar it was
  below median in internal variability and among the closest neighbours of both
  `aurora-ribbons` and `tidal-ink`, so it contributed a duplicate of a soft
  radial bloom rather than a distinct outcome.
- Reworked `stereo-parallax` after measurement showed it produced nearly the
  same image every time (within-family variability 0.07 against a median of
  0.26). It now has three scene variants and a freely varying lens strength,
  raising variability to 0.19.
- Widened the parameter spread of `volume-tomogram` and `grid-horizon` for the
  same reason.
- Raised the `neon` ground level and widened its glow, which had made it the
  colour mode most often rejected as too dark, and lifted the darkest `riso`
  ink. Measured across 238 samples per mode, all six modes now sit within
  0.33–0.37 internal spread, so none was pruned.

### Selection

- Collapsed the four hand-maintained lists of the same families — the family
  list, the per-family thresholds, the macro-category ledger behind the
  stratified `familySchedule()`, and the builder map — into a single
  `FAMILY_TABLE`, from which all four are derived. Adding a family to one list
  and not the others previously either dropped it out of the sampler or threw
  at generation time, which is exactly what the expansion to forty-nine
  families did to the category ledger.
- Clearing anti-repetition memory now also resets the session-only recent
  colour-mode list. This was audit item 4.

### Grammar, colour and finish

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
- Added colour separation to candidate selection.
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
