# arayhan Design System

React + TypeScript component library for **arayhan.dev** — the personal site / portfolio of
Rayhan (arayhan). Reconstructed as editable source from a Claude Design export, with a `tsup`
build and Storybook.

Clean, minimalist, monochrome-dominant with scarce accent blue; light + dark themes; no shadows
(depth via translucency, hairline borders, and 3D tilt). See `docs/superpowers/specs/` for the
full design brief.

## Install

```bash
pnpm install
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm storybook` | Dev playground at http://localhost:6006 |
| `pnpm build` | Build the library to `dist/` (ESM + `.d.ts` + CSS) |
| `pnpm build-storybook` | Static Storybook to `storybook-static/` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm dev` | `tsup --watch` |

## Usage

```tsx
import { Button, Card, Badge } from 'arayhan-design-system';
import 'arayhan-design-system/styles.css';

export function Example() {
  return (
    <Card interactive>
      <Badge tone="open">Open to opportunities</Badge>
      <Button>View portfolio</Button>
    </Card>
  );
}
```

Import `styles.css` once at your app root — it `@import`s all design tokens (colors, typography,
spacing, fonts, base). Fonts (Google Fonts) and icons (Phosphor duotone) are loaded via CDN;
include the Phosphor stylesheet on pages that use `SocialLinks`/icon glyphs:

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css">
```

## Components (exported API)

Eleven `core/` components. Each is a React function component styled with inline `style={{}}`
objects that read `var(--*)` CSS custom properties — **no CSS classes, no CSS-in-JS library**.

| Component | Purpose |
|---|---|
| `Button` | Pill action button — `primary` / `secondary` / `ghost`, `sm` / `md` / `lg`. |
| `IconButton` | Circular icon-only button (social links, utility actions). |
| `Badge` | Status pill; `tone="open"` adds the pulsing availability dot. |
| `Tag` | Small mono chip for tech stacks / topics. |
| `Input` | Labeled text field / textarea with blue focus ring. |
| `Card` | Hairline surface card; `interactive` lifts + tilts on hover. |
| `SectionHeading` | Mono uppercase eyebrow + `h2` + optional description. |
| `TimelineItem` | Experience timeline row (node, connector, mono period, tags). |
| `SocialLinks` | Row of the four arayhan social links as icon buttons. |
| `ThemeToggle` | Controlled sun/moon switch (host owns theme state). |
| `ScrollProgress` | Fixed 3px accent scroll-progress bar. |

Every component exports a matching `<Name>Props` interface.

## Styling idiom

- Style with inline `style={{}}` objects; reference the design language through `var(--*)` tokens
  (e.g. `var(--interactive-primary)`, `var(--text-heading)`, `var(--radius-full)`,
  `var(--space-5)`). Don't hardcode hex/px for anything a token covers.
- Themes apply via `[data-theme="dark"]` on `<html>`. `ThemeToggle` is controlled — the host sets
  the attribute and persists the choice.
- The token source of truth is `src/tokens/*.css`, reachable through `src/styles.css`.

## Project structure

```
src/
  components/core/   11 components (typed .tsx)
  tokens/            colors, typography, spacing, fonts, base (.css)
  styles.css         @imports all tokens
  index.ts           public API barrel
stories/             *.stories.tsx (core) + examples/Website.stories.tsx
examples/website/    verbatim interactive arayhan.dev kit (iframe example — NOT exported)
guidelines/          token specimen cards (reference)
docs/superpowers/    design spec + implementation plan
```

## Website example

The full interactive site (home, blog, `/uses`, ⌘K palette, dark mode) is preserved verbatim
under `examples/website/` and shown in Storybook under **Examples → Website**. It is a Claude
Design runtime artifact (global scripts + in-browser Babel), not importable library code — see
`examples/website/README.md`.

## Syncing to Claude Design

This repo is shaped for `/design-sync`: `pnpm build` emits the `dist/` bundle the sync consumes,
Storybook provides screenshot-verified previews, and the `pnpm-lock.yaml` lets the sync install
faithfully. Run `/design-sync` to push the rebuilt system back to claude.ai/design.
