# Contributing

TSDNE is an authored open-source artwork. Contributions are welcome when they preserve the artistic constraints documented in [`docs/PROJECT.md`](docs/PROJECT.md), [`docs/HYBRID-WEBLLM.md`](docs/HYBRID-WEBLLM.md), and [`STATUS.md`](STATUS.md).

## Useful contributions

- browser and device compatibility reports;
- accessibility and photosensitive-content reviews;
- verified export adapters;
- performance measurements;
- corrections to documentation and references;
- technically bounded visual primitives or families that materially expand the aesthetic field;
- tests for model, rendering, storage, and fallback failures.

## Not in scope

- accounts, tracking, advertising, analytics, marketplaces, NFTs, ownership certificates, or behavioural profiles;
- paid inference dependencies;
- unrestricted remote prompt collection;
- changes that make WebLLM mandatory for the first encounter;
- claims of absolute visual uniqueness.

Before proposing code, run:

```bash
npm test
npm run check
```

Describe the artistic and technical consequence of the change, not only its implementation.
