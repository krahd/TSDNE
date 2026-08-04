# Privacy

TSDNE does not require an account and does not intentionally collect names, email addresses, location, browsing history, advertising identifiers, or behavioural profiles.

Shader generation, validation, perceptual comparison, and optional WebLLM inference run in the visitor's browser. The local AI model is downloaded from its external model host and cached by the browser. The host and ordinary web infrastructure may receive standard HTTP metadata such as IP address and user agent; TSDNE does not add analytics or tracking.

A bounded history of encounter identifiers, structural vectors, and compact visual descriptors is stored locally in IndexedDB or local storage to reduce obvious repetition on that device. It is not uploaded. Visitors can clear this history from **about**.

No prompt or shader graph is sent to a remote inference API. The WebLLM model receives only the current typed shader graph locally.
