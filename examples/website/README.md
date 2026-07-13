# Website example — arayhan.dev

The full interactive site (home, blog, `/uses`, ⌘K command palette, dark mode) that this
design system was built for. It is preserved here **verbatim** from the original Claude Design
export under `site/`.

## What this is (and isn't)

- **Is:** a reference composition showing the components in a real, complete site.
- **Isn't:** part of the library's public API. Nothing here is exported from `src/index.ts`.

## How it runs

Unlike the library (ESM React + TypeScript), this kit is a **Claude Design runtime artifact**:

- `React` / `ReactDOM` load as UMD globals from a CDN.
- JSX is transpiled **in the browser** by Babel Standalone.
- Components come from the compiled global bundle `site/_ds_bundle.js`, exposed as
  `window.ArayhanDesignSystem_*`.
- Page data and image slots come from `site/ui_kits/website/{data.js,image-slot.js}` via
  `window.SITE_DATA`.

Because of that, the screens are **not** importable React modules and are intentionally not
ported to ESM stories. Instead, Storybook serves this folder statically and embeds the site in
an iframe (`Examples/Website` story), so you see the real thing in its native runtime.

## Viewing it

- In Storybook: run `pnpm storybook` and open **Examples → Website → arayhan.dev**.
- Standalone: serve this folder over HTTP and open `site/ui_kits/website/index.html`
  (e.g. `pnpm dlx serve examples/website`). It needs network access for the CDN scripts/fonts.

## Screens

`site/ui_kits/website/` — `HomeScreen`, `BlogScreens`, `ContactScreen`, `UsesScreen`,
`Isometric`, `Shared` (nav/footer/palette), plus `data.js` and `image-slot.js`.
