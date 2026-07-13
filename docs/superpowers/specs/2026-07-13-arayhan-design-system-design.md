# arayhan Design System — source library reconstruction

**Date:** 2026-07-13
**Status:** Approved
**Owner:** Rayhan (arayhan)

## Summary

Reconstruct a faithful, editable **React + TypeScript component library** from an existing
compiled Claude Design export (`personal-web/arayhan Design System.zip`). The export is the
*output* of a Claude Design project — a bundle (`_ds_bundle.js`, `components/core/*.{jsx,d.ts,prompt.md}`,
`tokens/*.css`, `guidelines/*.html`, `ui_kits/website/*`) with no editable source behind it.

This project turns that output back into maintainable source with a real build and Storybook, so
the design system is (a) developable and (b) re-syncable to claude.ai/design via `/design-sync`
(which bundles from a repo's own `dist/`).

**Nothing is redesigned.** Components keep their exact structure, inline-style approach, and visual
language. The work is transcription (`.jsx` → typed `.tsx`), tooling, and stories.

## Goals

- A standalone DS library repo in `arayhan-design-system/` that builds to `dist/`.
- The 11 core components exported with proper TypeScript prop types (from their `.d.ts`).
- Storybook 8 (Vite) as the dev playground and future `/design-sync` screenshot source.
- Visual parity with the exported bundle — components render identically in Storybook.
- Clean library surface: only core components in the public API.

## Non-goals

- The actual arayhan.dev website (Next.js site) — separate future project.
- Any redesign, restyle, or new components beyond what the export contains.
- Exporting the `ui_kits/website/` screens as public library API (they become example stories only).
- Running `/design-sync` itself — that's a later, separate step once this repo exists.

## Source inventory (from the export)

- **Core components (11):** Button, IconButton, Badge, Tag, Input, Card, SectionHeading,
  TimelineItem, SocialLinks, ThemeToggle, ScrollProgress. Each has `.jsx` + `.d.ts` + `.prompt.md`.
- **Tokens:** `tokens/{colors,typography,spacing,fonts,base}.css`; entry `styles.css` `@import`s them.
- **Guidelines:** `guidelines/*.html` token specimen cards (kept for reference).
- **Website kit:** `ui_kits/website/{HomeScreen,BlogScreens,ContactScreen,UsesScreen,Isometric,Shared}.jsx`
  plus `data.js`, `image-slot.js` — full-page compositions, used as example stories only.

## Design language (preserved verbatim)

- **Styling idiom:** React function components using inline `style={{}}` objects that read
  `var(--*)` CSS custom properties. **No CSS classes, no CSS-in-JS library.** Tokens live in plain
  CSS files imported through `styles.css`.
- **Color:** monochrome-dominant (black/white/slate); blue `--accent` scarce (links, scroll bar,
  section numbers, timeline nodes). Green only for the "open to work" dot.
- **Type:** Bricolage Grotesque (display), Schibsted Grotesk (body), JetBrains Mono (code/meta),
  Caveat (handwritten captions only). Google Fonts.
- **Themes:** light default + dark via `[data-theme="dark"]` on `<html>`.
- **Depth:** no shadows — translucent surfaces + `backdrop-filter: blur`, hairline borders, 3D tilt.
- **Icons:** Phosphor duotone web-font (class names like `ph-duotone ph-github-logo`), via CDN.

## Stack decisions

| Concern | Decision | Rationale |
|---|---|---|
| Language | TypeScript + React 18 | Typed source from the `.d.ts` contracts. |
| Styling | Unchanged: inline styles + CSS tokens | Faithful to the export; the DS's actual idiom. |
| Build | `tsup` (esbuild) → ESM `dist/` + `.d.ts` + CSS | Matches what `/design-sync` bundles from. |
| Dev/preview | Storybook 8 + Vite | Playground + screenshot source for future sync. |
| Package manager | **pnpm** (`pnpm-lock.yaml`) | Fast, strict; `/design-sync` auto-detects it. |
| Fonts | Google Fonts `@import` (CDN) | Faithful default; self-host later if sync needs it. |
| Icons | Phosphor duotone via CDN | Faithful default; matches the export. |

## Repository structure

```
arayhan-design-system/
├─ src/
│  ├─ components/core/        11 components as typed .tsx
│  ├─ tokens/                 colors, typography, spacing, fonts, base .css
│  ├─ styles.css              @imports all tokens
│  └─ index.ts                barrel — exports every component + prop type
├─ examples/website/          Home/Blog/Contact/Uses/Isometric/Shared (+ data, image-slot)
│                             — NOT exported from index.ts
├─ stories/                   *.stories.tsx (core) + website example stories
├─ .storybook/                main.ts, preview.ts (loads styles.css + fonts, theme toggle)
├─ guidelines/                token specimen HTML (reference)
├─ docs/superpowers/specs/    this spec
├─ package.json
├─ tsconfig.json
├─ tsup.config.ts
├─ .gitignore
└─ README.md
```

## Public API

`src/index.ts` exports the 11 core components and their prop interfaces (e.g. `Button`,
`ButtonProps`). Consumers import `import { Button } from 'arayhan-design-system'` and
`import 'arayhan-design-system/styles.css'`. Website screens are **not** exported.

## Component transcription rules

- `.jsx` → `.tsx`: keep implementation byte-for-byte where possible; add types.
- Prop types come from the matching `.d.ts`. Merge the interface into the component signature
  (`export function Button(props: ButtonProps)`), export both the component and the interface.
- Preserve inline styles, hover/active state hooks, and token references exactly.
- Internal imports rewritten from `./IconButton.jsx` to `./IconButton` (TS resolution).
- `React.ReactNode`, `JSX.Element` etc. resolved via `@types/react`.

## Build & scripts

- `pnpm build` → `tsup` emits `dist/index.js` (ESM), `dist/index.d.ts`, and copies
  `styles.css` + `tokens/` to `dist/`.
- `pnpm dev` → `tsup --watch`.
- `pnpm typecheck` → `tsc --noEmit`.
- `pnpm storybook` → Storybook dev server (port 6006).
- `pnpm build-storybook` → static Storybook.

`package.json` exports map: `.` → `dist/index.js` (+ types), `./styles.css` → `dist/styles.css`.

## Storybook

- `.storybook/main.ts`: stories glob `../stories/**/*.stories.tsx`, framework
  `@storybook/react-vite`, `@storybook/addon-essentials`.
- `.storybook/preview.ts`: imports `src/styles.css`; sets up light/dark backgrounds and a
  `data-theme` toggle so both themes are visible; injects the Phosphor + Google Fonts CDN links.
- One story file per core component covering its main variants/props (from `.prompt.md` examples
  and `.d.ts` prop ranges). Website screens become "Examples/…" stories rendering the ported kits.

## Verification (definition of done)

1. `pnpm typecheck` passes with no errors.
2. `pnpm build` produces `dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `dist/tokens/`.
3. `pnpm storybook` boots; every core component story renders; visual parity with the export
   spot-checked (Button variants, Card, Input, SocialLinks icons, ThemeToggle switching themes).
4. Website example stories render the full screens without runtime errors.

## Risks / notes

- **CDN dependency:** fonts + Phosphor icons load from CDN, so Storybook needs network for exact
  rendering. Acceptable now; self-hosting (`@fontsource` + local Phosphor CSS) is a future option
  if `/design-sync` fidelity or offline dev demands it.
- **Website kit complexity:** `ui_kits/website/*` are large (Home ~24KB, Blog ~19KB) and reference
  `data.js` / `image-slot.js` / uploaded assets. They ship as example stories; if an asset path
  breaks, the fix is local to `examples/website/`, not the library.
- **`.d.ts` mentions Lucide** in a comment (`icon?: … Lucide SVG`) while the runtime uses Phosphor —
  the comment is stale; components take a generic `ReactNode` icon, so no code dependency. Keep the
  runtime behavior (Phosphor), leave the prop generic.

## Out-of-scope follow-ups (not this project)

- Run `/design-sync` to push the rebuilt `dist/` back to claude.ai/design.
- Build the arayhan.dev website consuming this library.
- Replace placeholder case-study copy with real numbers.
