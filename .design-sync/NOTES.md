# design-sync notes — Prima UI

Storybook shape. Project: `arayhan Design System` (bd91f464-39c1-470b-8a40-658666c1921a) — the
Claude Design project title, unchanged since the DesignSync tool has no rename method (see below).
Global: `PrimaUIBd91f4`. 11 components, all graded `match`.

> The system was rebuilt from the old "arayhan" language to **Prima** (cobalt on ice, Clash
> Display caps, mono `//` labels, color-block storytelling) — a complete token + component rewrite.

## Roster (11)

`Button`, `Card`, `Chip`, `Input`, `Textarea`, `Select`, `Switch`, `SectionHeader`,
`TimelineItem`, `Marquee`, `SocialLinks`. Removed in the Prima rewrite: Badge, IconButton,
ScrollProgress, SectionHeading (→ SectionHeader), Tag (→ Chip), ThemeToggle (Prima has no dark mode).

## Fixes / decisions (why the build looks the way it does)

- **[GENERAL] Flatten the styles.css @import graph.** Inline-style + `var(--*)` token DS: tokens
  live in `src/tokens/*.css`, imported by `src/styles.css`. The converter copies the css entry as
  `_ds_bundle.css` but NOT its @import targets, so a `@import`-only styles.css leaves every token
  unresolved in designs. `scripts/bundle-css.mjs` (esbuild) flattens to a self-contained
  `dist/styles.css` (remote font/icon @imports hoisted, all `:root` vars inlined). In `pnpm build`.
- **[GENERAL] Fonts + icons ride the styles.css closure.** Clash Display (Fontshare), Inter +
  JetBrains Mono (Google), and Phosphor **regular** (`src/tokens/icons.css`) are @imported so
  designs get the real fonts/icons. Prima uses `ph ph-*` (regular), NOT duotone.
- **globalName normalization.** `cfg.globalName` `PrimaUI_bd91f4` → converter emits
  `PrimaUIBd91f4` (underscore dropped). Fine for the design agent.
- **Grid-overflow overrides.** `cardMode: "column"` on Button, Input, Select, Textarea,
  SectionHeader — their stories render wider than a grid cell (form fields, side-by-side buttons,
  section rule). Presentation-only; grades carry.
- **Grade keys use story DISPLAY names, not export names** — the compare keys are space-split
  (`"With Arrow"`, `"With Helper"`, `"Title Only"`), not the camelCase export. A grade file keyed
  by the export name leaves that story ungraded → the component re-captures. Match keys to the
  `grade keys:` line the compare prints.

## Re-sync risks (watch-list)

- **CDN-fetched fonts + icons.** Clash Display (Fontshare), Inter/JetBrains Mono (Google), Phosphor
  (unpkg) load via `styles.css` @imports — verified only with network egress. Clash Display in
  particular is Fontshare-only (not Google Fonts); if the CDN is down, headings fall back and the
  compare oracle can't see it. Keep the Fontshare @import intact.
- **The CSS flatten step is load-bearing** — `scripts/bundle-css.mjs` must run in `pnpm build`.
- **No owned previews, no skipped stories.** All 11 use generated previews; every story `match`.
- **Renamed the npm package to `prima-ui`** (display name **Prima UI**). The Claude Design PROJECT
  title is still `arayhan Design System` — the DesignSync tool has no rename method; rename it in
  the claude.ai/design UI if desired.
- **Old kit removed.** The previous `examples/website/` (old arayhan.dev) and the project's old
  `guidelines/`, `ui_kits/`, flat component files were removed. `SKILL.md`, `support.js`,
  `_adherence.oxlintrc.json`, `_ds_manifest.json` (app infra) were left in the project.
