# Essentials + Navigation Component Wave — Design

**Date:** 2026-07-14
**Status:** Approved (user, via brainstorming session)
**Scope:** 11 new components for the Prima design system (`arayhan-design-system`), bringing the library from 48 to 59 components.

## Context

Prima covers core atoms, form controls, overlays, display/data, and blocks — but a consumer building a real app quickly hits missing essentials (Tabs, Tooltip, loading states) and navigation primitives (Breadcrumbs, Pagination, Stepper). This wave fills those gaps.

## Approach

Build in the existing idiom — the alternatives (headless+styled split, wrapping Radix) were rejected as overkill for a personal system and a break of the zero-dependency guarantee, respectively.

Idiom rules that bind every component below:
- React function components in `src/components/advanced/`, typed props interface exported, JSDoc header.
- Inline `style={{}}` reading `var(--*)` tokens only. No CSS classes except Phosphor `ph ph-*` icons.
- Injected `<style>` tags allowed ONLY where CSS pseudo-elements/keyframes are unavoidable (precedent: Marquee, RichText, Toast). Used here by: Skeleton (pulse keyframes), Spinner (rotate keyframes), ProgressBar (indeterminate keyframes), Slider (range pseudo-elements).
- Zero new dependencies. React ≥18 peer only.
- Hover/focus state via `React.useState`; motion on `--ease-spatial` at `--duration-*`; ALL animation inert under `prefers-reduced-motion` (base.css kills CSS animation; JS checks where behavior differs).
- Exactly one accent (cobalt); semantic colors only for functional status.

## Components

### Navigation group

**1. Tabs** — `src/components/advanced/Tabs.tsx`
- `TabsProps { tabs: TabItem[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; style? }`, `TabItem { value: string; label: string; icon?: string; content: ReactNode }`.
- Controlled (`value`) or uncontrolled (`defaultValue`, defaults to first tab).
- Visual: mono uppercase tab row; active tab cobalt with a 2px cobalt underline sitting on a full-width hairline; inactive tabs `--text-secondary`, ink on hover. Content panel below with `--space-5` top padding.
- A11y: `role=tablist/tab/tabpanel`, `aria-selected`, `id`/`aria-controls`/`aria-labelledby` pairing, ArrowLeft/ArrowRight roving focus (Home/End optional), inactive panels unmounted.

**2. Breadcrumbs** — `src/components/advanced/Breadcrumbs.tsx`
- `BreadcrumbsProps { items: { label: string; href?: string }[]; style? }`.
- Visual: mono uppercase 12px trail; separators are cobalt `//`; link items `--text-secondary` → cobalt on hover; final item ink, not a link.
- A11y: `<nav aria-label="Breadcrumb">`, `<ol>` semantics, `aria-current="page"` on the last item.

**3. Pagination** — `src/components/advanced/Pagination.tsx`
- `PaginationProps { page: number; pageCount: number; onChange: (page: number) => void; siblings?: number (default 1); style? }`.
- Visual: 40px bordered square buttons (SocialLinks language), mono numbers; active square fills cobalt with white numeral; prev/next `ph ph-caret-left/right` squares, disabled at 40% at the ends; overflow condensed to a mono `…` (non-interactive). Always shows first + last page.
- A11y: `<nav aria-label="Pagination">`, `aria-current="page"` on the active button, `aria-label="Page N" / "Previous page" / "Next page"`.

**4. Stepper** — `src/components/advanced/Stepper.tsx`
- `StepperProps { steps: { label: string; description?: string }[]; current: number (0-based); direction?: 'row' | 'column' (default 'row'); style? }`.
- Visual: 36px bordered squares with mono numbers (`01`, `02`…); completed = cobalt fill + `ph ph-check`; current = white with 2px cobalt border, cobalt numeral; upcoming = hairline + `--text-secondary`. 1.5px connectors between squares — cobalt when the preceding step is complete. Labels mono uppercase beside/below; optional body description in column mode.
- A11y: `<ol>`, `aria-current="step"` on the current item. Display component — steps are not clickable (YAGNI; add `onStepClick` later if needed).

### Feedback group

**5. Skeleton** — `src/components/advanced/Skeleton.tsx`
- `SkeletonProps { width?: number | string; height?: number | string (default 16); radius?: string (default 'var(--radius-sm)'); lines?: number; style? }`.
- `lines` renders N stacked bars (last one 60% width); otherwise a single box.
- Visual: `--border` (blue-tinted) fill, opacity pulses 1 → 0.55 → 1 over 1.6s via injected keyframes. Static under reduced motion (base.css).
- A11y: `aria-hidden="true"` — callers announce loading elsewhere.

**6. Spinner** — `src/components/advanced/Spinner.tsx`
- `SpinnerProps { size?: number (default 24); label?: string; style? }`.
- Visual: SVG circle — hairline `--border` ring with a cobalt quarter arc, rotating 0.9s linear via injected keyframes; optional mono uppercase label beside it. Reduced motion: arc static (base.css collapses the animation).
- A11y: `role="status"`, `aria-label` (from `label`, default "Loading").

**7. ProgressBar** — `src/components/advanced/Progress.tsx` (export name `ProgressBar`)
- `ProgressBarProps { value?: number (0–100); label?: string; showValue?: boolean (default true when label set); indeterminate?: boolean; style? }`.
- Visual: 8px full-radius track in `--background` with a hairline border; cobalt fill animates width on `--ease-spatial`. Header row: mono label left, mono `NN%` right. Indeterminate: a 30% cobalt segment slides on a loop (injected keyframes); reduced motion shows a static centered segment.
- A11y: `role="progressbar"`, `aria-valuenow/min/max` (omit `valuenow` when indeterminate), `aria-label`.

### Slotting into existing groups

**8. Slider** (→ Forms) — `src/components/advanced/Slider.tsx`
- `SliderProps { min?: 0; max?: 100; step?: 1; value: number; onChange: (v: number) => void; label?: string; showValue?: boolean (default true); helper?: string; error?: string; id?; style? }`.
- Native `<input type="range">` for free keyboard/AT support. Styling via one injected scoped stylesheet (`.prima-slider`): 2px track — filled portion cobalt via inline `linear-gradient` background sized to the percentage, remainder `--border`; thumb 18px, radius-full, white with 2px cobalt border, cobalt focus ring (`--primary-ring`).
- Field language: mono label left, mono cobalt value right, helper/error below (reuses `_field` helpers).

**9. Tooltip** (→ Overlays) — `src/components/advanced/Tooltip.tsx`
- `TooltipProps { content: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' (default 'top'); delay?: number (default 300); children: ReactElement-ish (wrapped in an inline-block span) }`.
- Shows on pointer hover AND keyboard focus (wrapper listens to focusin/focusout); hides on leave/blur/Escape.
- Visual: ink surface (`--inverse-surface`), `--on-inverse` 13px body text, hairline `--inverse-border`, radius sm, padding 6/10, max-width 240, positioned absolutely 8px off the chosen side. Flat — no arrow. Fade+2px rise on `--duration-fast` (CSS transition, reduced-motion safe).
- A11y: `role="tooltip"`, wrapper sets `aria-describedby` to the tooltip id while visible.

**10. Badge** (→ Display) — `src/components/advanced/Badge.tsx`
- `BadgeProps { children?: ReactNode; count?: number; max?: number (default 99, overflow renders "99+"); variant?: 'cobalt' | 'success' | 'warning' | 'error' | 'neutral' (default 'cobalt'); dot?: boolean; style? }`.
- Visual: count/status pill — radius-full, filled variant color, white 11px mono numeral; `dot` renders an 8px presence dot only. When `children` given, wraps them `position: relative` and pins the pill/dot to the top-right corner; standalone otherwise.
- Distinct from Chip (mono uppercase *tag* on ice); Badge is a *status/count marker* — semantic fills allowed because status is functional.

**11. Kbd** (→ Display) — `src/components/advanced/Kbd.tsx`
- `KbdProps { children: ReactNode; style? }`.
- Visual: `<kbd>` — mono 12px, white surface, hairline border with a 2px bottom edge (keycap depth without a shadow), radius sm, padding 2/7, ink text. Compose combos manually: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`.

## Integration

- **Exports:** all 11 (+ prop types) appended to `src/index.ts`.
- **Docs metas:** new `docs-site/src/content/navigation-meta.tsx` (Tabs, Breadcrumbs, Pagination, Stepper) and `feedback-meta.tsx` (Skeleton, Spinner, ProgressBar); Slider appended to `forms-meta.tsx`, Tooltip to `overlay-meta.tsx`, Badge + Kbd to `display-meta.tsx`. Each entry: id, name, description, snippet, props, live demo.
- **ComponentsPage:** two new sections/sidebar groups — order: CORE, FORMS, NAVIGATION, OVERLAYS, FEEDBACK, DISPLAY (numbers 002.2–002.6 reflowed).
- **Stories:** new `stories/Navigation.stories.tsx`, `stories/Feedback.stories.tsx`; Slider story added to `FormControls.stories.tsx`, Tooltip to `Overlays.stories.tsx`, Badge/Kbd to `Display.stories.tsx`.
- **README:** rows added to the advanced tables (split as Navigation/Feedback subsections or appended); count updated to fifty-nine.
- **Displayed stats:** "48" → "59" in `ManifestoSection`, `StatStrip.stories`, `blocks-meta` StatStrip demo.

## Error handling / edge cases

- Pagination clamps `page` into `[1, pageCount]`; `pageCount ≤ 1` renders nothing.
- Tabs with unknown `value` falls back to the first tab.
- Slider clamps `value` into `[min, max]`.
- ProgressBar clamps `value` into `[0, 100]`.
- Badge `count = 0` renders nothing unless `dot`.
- Tooltip unmounts its panel entirely when hidden (no stale `aria-describedby`).

## Verification

1. `pnpm typecheck` (library + stories) and `pnpm --filter docs-site exec tsc --noEmit`.
2. `pnpm build` — 59 exports in `dist/index.d.ts`.
3. `pnpm docs:build` and `pnpm build-storybook` — green.
4. Browser pass on the dev server (components page): Tabs switch via click + arrow keys; Breadcrumbs render with `aria-current`; Pagination clicks change the active square, ellipsis appears for long ranges, ends disable; Stepper shows completed/current/upcoming states; Skeleton/Spinner/ProgressBar render (animation verified visually when the pane is visible); Slider drag/arrow-keys update the value readout; Tooltip appears on hover and focus, hides on Escape; Badge count/overflow/dot; Kbd renders.
5. Reduced-motion audit: the three keyframe users (Skeleton, Spinner, ProgressBar indeterminate) are static-safe via base.css; Slider and Tooltip use plain transitions, which base.css already collapses.
