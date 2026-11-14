# Packed Svelte compatibility tests

Build `embla-carousel`, `embla-carousel-reactive-utils`, and `embla-carousel-svelte`, then run:

```sh
yarn workspace embla-carousel-svelte test:compatibility
```

The runner packs all three local packages and installs them into a disposable consumer outside the repository. It needs npm registry access and leaves the consumer path in its output for inspection. No package is published.

The matrix covers Svelte 3.59.2, 4.2.20, 5.0.0, 5.28.2, 5.29.0, and the latest published Svelte 5 version. Every version checks packed ESM/CJS exports, strict TypeScript with NodeNext (ESM and CJS) and bundler resolution, compiled action mounting/cleanup, and server rendering without browser globals. Older compilers must reject attachment syntax.

Svelte 5.29.0 and latest 5 also check the attachment's nested option and plugin reactivity, equivalent configurations, API identity, callback replacement, untracked callback reads/writes, conditional removal/remounting, cleanup on unmount, SSR, hydration, and the typed documentation example with `svelte-check`.

The DOM tests use jsdom and inert resize/intersection observers. They verify integration lifecycle behavior rather than carousel geometry or browser gestures. The package's Jest tests separately protect the legacy event, action update/cleanup, global options, and server overload contracts.
