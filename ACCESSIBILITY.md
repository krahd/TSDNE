# Accessibility

TSDNE is a full-screen animated visual artwork. Some aspects of the visual experience cannot be made equivalent across every sensory or technical context, but the interface must remain operable and the risks of animation must be reduced.

## Controls

- **another**: replace the current shader;
- **take the code**: access executable source and export formats;
- **pause**: stop or resume temporal motion;
- **about**: open conceptual, privacy, and accessibility information.

Keyboard:

- `N`: another;
- `U`: take the code;
- `Space`: pause/play;
- `A`: about;
- standard `Tab`, `Shift+Tab`, `Enter`, and `Escape` behaviour.

## Motion

The application detects `prefers-reduced-motion`. Reduced-motion mode:

- lowers shader temporal motion;
- disables long crossfades;
- does not prevent access to another shader;
- remains locally configurable.

A dedicated pause control is always available.

## Colour and intensity

A reduced-intensity setting lowers saturation and contrast. Interface controls maintain high text contrast independently of the shader.

## Flash screening

Candidate shaders are sampled across a short temporal window. A conservative heuristic rejects repeated large-area luminance transitions.

This is a screening measure, not clinical certification. The final artwork still requires human review and testing on actual hardware.

## Screen readers

Controls and dialogs use semantic HTML and accessible names. The canvas is described as a generated animated shader; the system does not attempt to fabricate a detailed textual description of every visual state.

Status messages announce new shaders, pause state, errors, and local-memory clearing without exposing hashes or certificate-like identifiers.

## Local anti-repetition memory

The about panel explains the stored perceptual trace and provides a clear-history control. Clearing this memory does not disable the artwork.

## Remaining validation

Before public release:

- keyboard-only test;
- VoiceOver and one additional screen-reader test;
- mobile zoom and safe-area test;
- reduced-motion and pause test;
- independent photosensitive-seizure review where possible;
- verification that the first shader appears without a model-loading delay.
