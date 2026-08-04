# Accessibility and visual safety

TSDNE is intrinsically visual and animated. Accessibility and visual safety are therefore part of the artwork’s material design rather than supplementary documentation.

## Implemented interaction provisions

- keyboard commands: `N` another, `U` use, `Space` pause/play, `A` about;
- visible pause/play control;
- system `prefers-reduced-motion` detection;
- manual reduced-motion mode;
- manual reduced-intensity mode;
- no automatic slow model mutation when reduced motion is active;
- crossfades removed under reduced motion;
- semantic buttons and dialog labelling;
- live announcements;
- visible focus;
- skip link;
- a complete procedural path without WebGPU or a model download.

## Automated visual screening

The alpha uses two distinct temporal analyses.

### Broad motion descriptor

Three frames sampled at separated times describe general motion and appearance. These samples help reject effectively static or extreme candidates. They are not a flashing-safety test.

### Dense luminance-change screen

Candidates that pass broad validation are sampled at 60 samples per second for 1.25 seconds at low resolution. The screen estimates how much of the rendered area undergoes a large luminance transition between consecutive samples and rejects sequences with three or more substantial transitions in a rolling one-second window.

This is intended to catch obvious repeated full-screen or large-area flashing that the earlier sparse metric could miss.

## What the screen does not establish

The automated screen is:

- not a medical assessment;
- not a Harding Flash and Pattern Analyser;
- not WCAG certification;
- not a guarantee that every device, refresh rate, scaling mode, or browser will produce the same temporal output;
- not a complete analysis of red flash, spatial pattern hazards, or all photosensitive responses;
- not a replacement for human and specialist review.

The project must not use the phrases “seizure safe”, “clinically safe”, or “WCAG compliant” on the basis of this implementation.

## Visitor guidance

Visitors sensitive to animation should:

1. enable system reduced motion before opening the work where possible;
2. use the visible **pause** control immediately;
3. enable reduced intensity in **about**;
4. avoid enabling optional local-model transitions if motion remains uncomfortable.

The work should display this guidance before public release in a form that does not require prolonged exposure to the animation.

## Validation still required

Before release:

- run external photosensitive-content analysis on representative families and worst-case parameter settings;
- test at common display refresh rates;
- test browser zoom, full-screen, and high-DPI scaling;
- review false negatives and false positives in the dense screen;
- test reduced-motion behaviour in Chrome, Edge, Firefox, and Safari;
- conduct keyboard-only review;
- test VoiceOver and at least one additional screen reader;
- inspect focus order, announcements, dialog closure, and exported-code controls;
- review mobile touch targets and orientation changes;
- document known limits in the deployed interface.

## Aesthetic consequence

Reduced motion and reduced intensity must remain meaningful versions of the artwork, not error states. Accessibility settings may alter rhythm, transition, saturation, and model participation, but they should preserve the central decision: remain, replace, or take the source.
