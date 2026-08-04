# Contributing

TSDNE is an artwork with a deliberately narrow interaction. Contributions are welcome when they strengthen that interaction rather than turn the project into a general shader editor or generative platform.

## Appropriate contributions

- WebGL2 correctness and compatibility;
- visually substantial authored shader families;
- performance improvements that preserve output;
- perceptual anti-repetition methods that do not model visitors;
- accessibility and photosensitive-seizure safety;
- static-site preservation;
- export correctness;
- privacy verification;
- documentation corrections;
- tests and reproducible bug reports.

## Out of scope for `main`

- prompt interfaces;
- LLM or diffusion-model runtime dependencies;
- preference learning;
- like/dislike controls;
- recommender logic;
- user-directed evolutionary lineages;
- accounts, social feeds, collections, leaderboards, or galleries;
- certificates, minting, ownership registries, rarity scores, or NFT integration;
- claims of guaranteed uniqueness;
- analytics or fingerprinting.

Experimental work in those areas should use a separate branch or project. The former WebLLM implementation is preserved at `archive/webllm-release-candidate-2026-08-04`.

## Visual-family contributions

A proposed family should:

1. be materially distinguishable from existing families;
2. contain meaningful internal variation;
3. support quiet as well as dense parameter regions;
4. compile under WebGL2;
5. remain within the project’s frame budget;
6. pass flash, luminance, variance, and motion screening;
7. avoid copied shader source unless licensing and attribution are explicit;
8. include deterministic tests.

## Pull requests

Include:

- purpose and conceptual fit;
- screenshots or short recordings where relevant;
- browser and device tested;
- performance observations;
- accessibility implications;
- tests added or updated;
- confirmation that no personal data or external runtime dependency was introduced.

## Development

```bash
npm install --ignore-scripts
npm run verify
cd prototype
python3 -m http.server 8080
```

Open `http://localhost:8080`.
