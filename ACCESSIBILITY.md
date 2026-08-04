# Accessibility and visual safety

TSDNE is intrinsically visual and animated, but accessibility and visual safety remain material design requirements.

Implemented:

- keyboard access: `N` another, `U` use, `Space` pause/play, `A` about;
- pause/play control;
- system `prefers-reduced-motion` detection;
- reduced-motion and reduced-intensity settings;
- no automatic in-place awakening when reduced motion is active;
- crossfades disabled under reduced motion;
- semantic controls, dialog labels, live announcements, visible focus, and skip link;
- candidate rejection for extreme temporal differences and high flash ratio;
- complete procedural fallback without WebGPU.

The project does not claim clinical seizure safety. Public release requires testing with recognised flash-analysis methods and representative devices. Visitors who are sensitive to animation should enable system reduced motion or use the pause control immediately.
