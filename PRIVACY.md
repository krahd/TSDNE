# Privacy

## Summary

*This Shader Does Not Exist* is designed so that privacy does not depend on trusting an operator’s promises.

The artwork performs generation, rendering, validation, novelty selection, and hashing locally in the browser. It has no account, analytics, advertising, remote inference, behavioural profile, or server-side generation.

## Network activity

After the static site files are loaded, the artwork requires no network service to generate or evaluate shaders.

It does not download a language model or contact a model host.

The hosting provider may retain ordinary web-server request logs. Those logs are outside the artwork’s application logic and must be documented separately by the chosen host.

## Local settings

The browser may store:

- reduced-motion preference;
- reduced-intensity preference;
- pause state where applicable;
- bounded anti-repetition traces.

## Anti-repetition memory

The anti-repetition database stores only:

- a random local key;
- display time;
- broad shader family;
- compact perceptual descriptors.

It does not store:

- shader source;
- graph;
- seed;
- hash;
- image or video;
- personal identity;
- location;
- interaction history labelled as preference;
- dwell time;
- like or dislike;
- account or cross-device identifier.

The traces cannot reconstruct a relinquished shader. They are used only to avoid obvious perceptual recurrence.

The memory is bounded, remains on the device, and can be cleared from the **about** panel.

## No personalisation

TSDNE does not interpret:

- **another** as rejection;
- remaining as approval;
- taking code as stable preference;
- repeated visits as identity.

Future outputs are repelled from previously displayed visual regions without attempting to move towards an inferred taste.

## Internal provenance

The active shader has deterministic seeds and SHA-256 graph and source hashes. These values are held in runtime memory and may be included in a technical manifest when the visitor deliberately takes the code.

They are not written to the anti-repetition database and are not transmitted to a registry.

## Clearing data

The **clear local anti-repetition memory** control deletes the IndexedDB store and localStorage fallback used by the artwork.

Browser site-data controls may also remove all local TSDNE data.
