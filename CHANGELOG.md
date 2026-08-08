# Changelog

## Unreleased — runtime and local-memory corrections

### Changed

- **Pause is momentary rather than a stored preference.** Asking for another
  shader now resumes first, from the control and from the `n` shortcut alike:
  requesting another shader is asking to watch one, and arriving at a new shader
  held on a single frame reads as a failure to generate rather than as a paused
  artwork. A reload likewise always begins playing. Pause is no longer written to
  the persisted settings, and is forced off as they are read, so a stored value
  from an earlier build does not outlive the load either. Reduced motion and
  reduced intensity are unaffected and still persist, being preferences about how
  the work is watched rather than momentary acts of attention.

### Fixed

- **Pausing no longer disables generation.** Candidates were sampled at the
  visitor's own render settings, and every family gates its time terms as
  `u_time*u_motion`. With the artwork paused, motion is 0, so every sampled
  frame came back identical and all forty-nine families were rejected as
  `too-static`. Because the setting is persisted, pausing and reloading left the
  artwork permanently unable to produce a shader — and once an empty quality
  cycle became a normal retry, that same condition became an unbounded search
  loop rather than a visible error. Validation now always samples at full motion
  and full intensity: whether a shader is fit to appear is a property of the
  shader, not of how it happens to be watched. The motion floor consequently
  applies to every candidate, including under reduced motion, where it was
  previously skipped altogether.
- **Pausing holds the current moment.** Pause was expressed as `u_motion = 0`,
  but the uniform scales absolute time rather than the rate of time, so zeroing
  it collapsed effective time and displayed the shader's *first* frame instead of
  freezing what was on screen. Reduced motion jumped backwards to 12% of elapsed
  time for the same reason. The rate is now integrated into a per-display clock
  and `u_motion` stays at 1, so effective time is continuous and monotonic and a
  change of setting only affects what happens next. Returning to a backgrounded
  tab now resumes where the shader left off instead of lurching forward.
- **An exhausted shader search reports instead of looping forever.** An empty
  quality cycle is a normal outcome and still retries, but the retry had no
  ceiling, so a *systematic* rejection — every family failing one check at once,
  as `too-static` did while validation inherited the viewer's motion setting —
  became an unbounded silent loop rather than a reported failure, and in a
  background prefetch it never surfaced at all. Consecutive empty cycles are now
  bounded by `maxSearchCycles` (default 6, and each cycle already validates
  `maxAttempts` candidates). Past the ceiling the runtime raises an error that
  names its own dominant cause and carries the full audit, so a real fault is
  diagnosable instead of appearing as a hang.
- **Clearing the local anti-repetition memory is no longer undone.** A prefetch
  already in flight would install its candidate afterwards, so the next shader
  was still the one selected against the traces the visitor had just erased.
  Clearing now invalidates any generation that was already under way.
- **A repeat is recognised against a stored perceptual trace.** `nearestDistance`
  blended a structural term that stored traces deliberately do not carry, which
  pinned every comparison to a floor of 0.28 — above the `isTooSimilar`
  threshold — so a shader compared against its own trace was never a repeat. The
  structural axis now participates only where both sides have one.
- **A curation rating that cannot be stored is reported.** On the localStorage
  fallback path, taken where IndexedDB is unavailable, a quota failure was
  swallowed and `saveRecord` still reported success, silently losing research
  data. Failures now surface in the instrument and do not advance to the next
  shader. Session rows stay best-effort, since every record carries its own
  build and environment snapshot.
- Background prefetch failures are now observed by both adapters, which is how
  the pause defect stayed invisible until the visitor pressed **another**.
- An unrecognised family reports which family is unknown instead of throwing a
  property-of-undefined `TypeError` from `estimateCost`.
- Removed a redundant timer in the crossfade that could only ever re-assign a
  value already set synchronously.

### Testing

- Extended the `diagnostics/runtime/` first-encounter smoke test to run under
  each viewing setting rather than only the default, and to assert that the
  encounter carries a real temporal reading — which is only reachable when
  validation samples at full motion, so it is what distinguishes a fixed paused
  runtime from a broken one. Kept its timeout race, since an unbounded search
  presents as a hang rather than an error, and reports both. It now drives
  `another({ initial: true })` under an effectively unbounded frame budget
  instead of `start()`: the render loop and the frame-budget yields spent the
  headless virtual-time budget without adding coverage, and running two settings
  through `start()` did not finish at all. No Node test can reach this path.
- The motion clock is exported as `shaderMotionRate()` and `advanceShaderClock()`
  so pause, reduced motion, and tab-backgrounding behaviour are covered by
  ordinary Node tests.
- **The WebGL diagnostics now actually assert.** Both CI steps grepped the
  dumped DOM for their own success marker, but that marker is a literal inside
  each page's inline script, so `--dump-dom` echoed it back whether or not the
  page ever finished and the check could not fail. They now assert on the
  `data-tsdne-compile` / `data-tsdne-runtime` attribute the script sets only on
  completion, which never appears in the page source.
- **The runtime diagnostic can now finish.** It had been passing vacuously while
  the page was in fact dumped still reading `running`: the runtime awaits
  `loadRecentTraces()`, and under `--virtual-time-budget` the virtual clock races
  to exhaustion without waiting on IndexedDB, so `createTSDNERuntime()` never
  resolved. The page now removes `indexedDB` and takes the synchronous
  localStorage fallback, which completes in about four seconds. Generation is
  what this page is for; the storage path is covered by Node tests.
- Added `tests/runtime-search-cycles.test.mjs`, which drives the real runtime —
  `buildCandidatePool`, `validateCandidate`, `qualityAssessment` and the search
  loop — against a fake WebGL2 context. It confirms that a systematically
  rejected search raises a named error after the ceiling, that an unlucky cycle
  is still only a retry, and it hangs if the ceiling is removed.

## 0.3.1-alpha.3 — first-encounter recovery

### Runtime

- Fixed a regression where a search batch containing only candidate-level compile/link, sampling, validation, or generation failures could be promoted into a fatal artwork error.
- Candidate-level failures are now treated as rejected candidates and searched past, just like cost and visual-quality failures.
- Added a production-runtime smoke diagnostic that executes the real `runtime.start()` path and requires an actual first encounter, rather than only compiling hand-picked shader examples.
- Added the first-encounter smoke to CI alongside the 147-condition WebGL family compile/render matrix.

## 0.3.1-alpha.2 — information surface

### Information and authorship

- Reworked the information dialog as a quieter editorial surface rather than a dense application panel.
- Added a manuscript-derived **statement** alongside **about**, **privacy**, and **accessibility**, all rendered inside the same information window.
- Moved the Tomas Laurenzo attribution to the information footer, on the same line as the application version.
- Added one restrained phosphor-green accent to headings, active information navigation, selected quotations, and the author link to break typographic monotony without introducing gradients, cards, or decorative product-UI styling.
- Added regression tests for the internal information views, attribution/footer placement, statement propositions, and restrained colour treatment.

### Search feedback

- Background prefetch is now visually silent. The search status appears on the initial encounter and only when an explicit request for **another** actually has to wait for a shader.
- An empty quality-check cycle is no longer treated as an error. The production runtime records the rejected cycle, emits a retry event, and immediately begins another search cycle; the user sees a brief explanatory status only when they are actively waiting.
- Kept this retry policy inside the single production runtime so `/curation/` observes exactly the same behaviour rather than implementing its own generation or recovery logic.

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