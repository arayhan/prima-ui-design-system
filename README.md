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
| `pnpm docs:dev` | Documentation site dev server (Vite, http://localhost:5173) |
| `pnpm docs:build` | Static documentation site to `docs-site/dist/` |

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

Forty-eight components — eleven core atoms, twenty-seven advanced controls, and ten composed
blocks — each a React function component styled with inline `style={{}}` objects that read
`var(--*)` tokens — **no CSS classes, no CSS-in-JS**. All heading/label styling comes from
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

### Advanced — form controls

| Component | Purpose |
|---|---|
| `Checkbox` / `RadioGroup` | 18px cobalt-filled square / circle-with-dot; label, disabled, error. |
| `ButtonGroup` | Segmented control — joined mono segments, active fills cobalt. |
| `PasswordInput` | Input's field language + eye toggle. |
| `MultiSelect` | Field-language trigger filling with removable cobalt chips + floating checklist. |
| `Combobox` | Searchable single select — type to filter, arrows + Enter to pick. |
| `Calendar` / `DatePicker` | Month grid with cobalt selection / field trigger opening it in a popover. |

### Advanced — overlays

| Component | Purpose |
|---|---|
| `Dropdown` | Secondary-button trigger + floating menu; Escape/outside-click/arrow-key handling. |
| `Dialog` | Portal modal — centered panel over the scrim, scroll lock, Escape/scrim close. |
| `Drawer` | Portal side panel (left/right) with pinned actions footer. |
| `ToastProvider` / `useToast` | Ink-surface toasts, bottom-right stack, semantic rule, auto-dismiss. |

### Advanced — display & data

| Component | Purpose |
|---|---|
| `Alert` | White surface with a 3px semantic left rule — info/success/warning/error, dismissible. |
| `Avatar` | Full-radius circle, initials fallback, semantic status dot. |
| `Thumbnail` | Hairline media frame; image zooms gently on hover; mono caption. |
| `Bubble` | Chat bubbles — received white/left, sent cobalt/right. |
| `Accordion` | Numbered hairline rows; plus rotates to close; animated height. |
| `Carousel` | Scroll-snap track with prev/next controls and a mono counter. |
| `DataTable` | Mono headers over a 2px ink rule; opt-in column sorting; ice hover. |
| `LineChart` / `BarChart` / `Sparkline` | Cobalt data on hairline grids, mono labels. SVG, zero deps. |
| `AnalyticsCard` | Metric card — mono label, display value, semantic delta, sparkline. |
| `EmptyState` / `ErrorState` | Nothing-here panel / cobalt 404-500 treatment (inline or full page). |
| `CodeSnippet` | Ink code panel with mono toolbar + copy (monochrome, zero deps). |
| `RichText` | Prose styling for long-form content — headings, quotes, lists, code. |

### Blocks (composed sections)

| Block | Purpose |
|---|---|
| `Hero` | Page opener — `//` eyebrow, mega caps title, lede, Button pair, optional media slot. |
| `FeatureGrid` | Grid of Cards with mono running numbers + cobalt Phosphor icons. |
| `StatStrip` | Horizontal stats separated by hairline rules (ice or ink). |
| `CTASection` | Contact/CTA on the ink storytelling surface — headline, CTA, email, SocialLinks. |
| `Footer` | 3px closing rule, wordmark, mono nav columns, SocialLinks, colophon line. |
| `BlogList` | Hairline article rows — mono date, caps title with hover arrow, chips, read-time. |
| `MagneticButton` | Button that eases toward the pointer and springs back (micro-interaction). |
| `TiltCard` | Card that tilts in 3D toward the pointer with a faint cobalt glow. |
| `CountUp` | Clash Display figure that counts up when scrolled into view. |
| `RevealOnScroll` | Rise-and-fade reveal wrapper on the system easing (IO + CSS only). |

All interaction blocks are pure React + CSS (no animation dependency), pointer-fine gated
where relevant, and inert under `prefers-reduced-motion`.

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
  components/core/     11 atomic components (typed .tsx) + _field.tsx helper
  components/advanced/ 27 controls: forms, overlays, display & data (incl. charts)
  components/blocks/   10 composed blocks + micro-interaction primitives
  tokens/            colors, typography, fonts, spacing/radii/borders/motion, base, icons (.css)
  styles.css         @imports all tokens
  index.ts           public API barrel
stories/             *.stories.tsx
docs-site/           documentation website (Vite + React + GSAP + three.js)
docs/superpowers/    design spec + implementation plan
```

## Syncing to Claude Design

This repo is shaped for `/design-sync`: `pnpm build` emits the `dist/` bundle the sync consumes,
Storybook provides screenshot-verified previews, and `pnpm-lock.yaml` lets the sync install
faithfully.
