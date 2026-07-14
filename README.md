# Arayhan Design System

**Prima** — the personal design system of Ahmed Rayhan (rayhan.dev). React + TypeScript
component library built around *engineered minimalism*: an ice-blue base, exactly one electric
cobalt accent, bold **Clash Display** all-caps display type, mono `//` labels, and color-block
storytelling. Reconstructed with a `tsup` build and Storybook.

> The npm package is `arayhan-design-system`; the design language is **Prima**.

## Install

```bash
pnpm install
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm storybook` | Dev playground at http://localhost:6006 |
| `pnpm build` | Build the library to `dist/` (ESM + `.d.ts` + flattened CSS) |
| `pnpm build-storybook` | Static Storybook |
| `pnpm typecheck` | `tsc --noEmit` |

## Usage

```tsx
import { Button, Card, Chip, SectionHeader } from 'arayhan-design-system';
import 'arayhan-design-system/styles.css';

export function Example() {
  return (
    <Card interactive arrow>
      <Chip>React</Chip>
      <h3>Realtime game infrastructure</h3>
      <Button>Read the case study</Button>
    </Card>
  );
}
```

Import `styles.css` once at your app root — it `@import`s all design tokens plus the webfonts
(**Clash Display** from Fontshare, **Inter** + **JetBrains Mono** from Google Fonts) and the
**Phosphor** icon font, all from CDN.

## Components (exported API)

Eleven components, each a React function component styled with inline `style={{}}` objects that
read `var(--*)` tokens — **no CSS classes, no CSS-in-JS**. All heading/label styling comes from
tokens; the only real class names are Phosphor's `ph ph-*` icon classes.

| Component | Purpose |
|---|---|
| `Button` | Mono uppercase button — `primary` (cobalt) / `secondary` (2px ink border, inverts on hover). |
| `Card` | White surface, 1.5px hairline, radius md; `interactive` shifts to ice + nudges a cobalt arrow. |
| `Chip` | Mono uppercase cobalt tag on an ice fill. |
| `Input` | White field, mono label above, cobalt focus ring, helper/error below. |
| `Textarea` | Input's field language, min-height 120px, vertical resize. |
| `Select` | Input's field language + a 1.5px ink chevron. |
| `Switch` | 50×28 pill; cobalt track on, hairline off; knob slides 150ms. |
| `SectionHeader` | Mono `//` cobalt eyebrow + running number above a 3px ink rule + caps title. |
| `TimelineItem` | Vertical timeline row — mono year column, 2px connector, cobalt node. |
| `Marquee` | Mono uppercase scrolling strip (ice or ink), one per page. |
| `SocialLinks` | Bordered square icon links; border + glyph go cobalt on hover. |

Every component exports a matching `<Name>Props` interface.

## Design language (Prima, in brief)

- **One accent.** Ice `#F8FBFD` base, cool ink `#0F1116` text, exactly one cobalt `#1B44F0`
  accent. Every neutral is blue-tinted — a warm gray is a bug. No second accent, no gradients.
- **Type does the talking.** Clash Display 700/600 **ALL CAPS** for display/h1/h2 (never below
  18px, never body); Inter for body; JetBrains Mono for labels/eyebrows/code (`//` prefix, `001`
  numbering, usually cobalt).
- **Neo-brutalism lite.** Visible structure: 1.5px default borders, 2px on interactive, 3px
  section rules; medium radii (`sm` 8 / `md` 12 / `lg` 16) keep it soft. Never 0px, never >16px.
- **Flat by default.** Hairlines and surface contrast do the work; one soft shadow for floating
  elements only. Depth comes from color-block surfaces (ice → ink → cobalt), not shadows.

Token source of truth: `src/tokens/*.css`, reachable through `src/styles.css`.

## Project structure

```
src/
  components/core/   11 components (typed .tsx) + _field.tsx helper
  tokens/            colors, typography, fonts, spacing/radii/borders/motion, base, icons (.css)
  styles.css         @imports all tokens
  index.ts           public API barrel
stories/             *.stories.tsx
docs/superpowers/    design spec + implementation plan
```

## Syncing to Claude Design

This repo is shaped for `/design-sync`: `pnpm build` emits the `dist/` bundle the sync consumes,
Storybook provides screenshot-verified previews, and `pnpm-lock.yaml` lets the sync install
faithfully.
