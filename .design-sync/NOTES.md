# design-sync notes — arayhan-design-system

Storybook shape. Project: `arayhan Design System` (bd91f464-39c1-470b-8a40-658666c1921a).
Global: `ArayhanDesignSystemBd91f4`. 11 core components, all graded `match` from images.

## Fixes applied (why the build looks the way it does)

- **[GENERAL] Flatten the styles.css @import graph.** The DS styles entirely via inline styles
  reading `var(--*)` tokens; the tokens live in `src/tokens/*.css`, imported by `src/styles.css`.
  The converter copies the css entry as `_ds_bundle.css` but does NOT carry its `@import` targets,
  so a `@import`-only `styles.css` left every token unresolved in rendered designs (previews looked
  fine only because Storybook's decorator inlined them). Fix: `scripts/bundle-css.mjs` runs esbuild
  to flatten `src/styles.css` into a self-contained `dist/styles.css` (remote font @import hoisted,
  all `:root` vars inlined). Wired into `pnpm build` (`tsup && node scripts/bundle-css.mjs`).
  **Re-sync risk:** if the build changes, keep `dist/styles.css` self-contained — a bare @import
  file re-breaks every design's styling and the compare oracle can't see it (§4a font rule analog).

- **[GENERAL] Phosphor icons must ride the styles.css closure.** `SocialLinks` (and icon usage in
  `IconButton`) uses `ph-duotone ph-*` classes from the Phosphor web font. It was only loaded via
  the Storybook preview decorator (CDN `<link>`), NOT in the design-facing closure — so designs
  would render empty icons. Fix: `src/tokens/icons.css` `@import`s the Phosphor duotone + regular
  CDN stylesheets, and `src/styles.css` imports it, so the flattened closure carries it.

- **globalName normalization.** `cfg.globalName` was set to `ArayhanDesignSystem_bd91f4` (to match
  the original export's bundle), but the converter PascalCase-normalizes it to
  `ArayhanDesignSystemBd91f4` (underscore dropped). The old interactive website kit in the project
  referenced the underscore name and was **removed** from the project this sync (preserved in-repo
  at `examples/website/`). If website-kit compat ever matters again, the global name can't be forced
  to keep the underscore via config.

- **Grid overflow overrides.** `Input` → `cardMode: "column"` (ContactForm story wider than a cell);
  `ScrollProgress` → `cardMode: "single"` (position:fixed bar escapes any cell). Presentation-only.

## Re-sync risks (watch-list for the next run)

- **CDN-fetched assets (fonts + icons).** Google Fonts (Bricolage Grotesque / Schibsted Grotesk /
  JetBrains Mono / Caveat) and Phosphor icons load from CDN via `styles.css` `@import`s. Verified
  only with network egress; offline or CDN-down → wrong fonts / empty icons. Not visible to the
  compare oracle (both panels fall back identically) — check the CDN @imports survive any build change.
- **The CSS flatten step is load-bearing.** `scripts/bundle-css.mjs` must run in `pnpm build`; if
  someone reverts `dist/styles.css` to the raw @import version, designs silently lose all tokens.
- **No owned previews, no skipped stories.** All 11 components use generated previews; every story
  graded `match` from images. Story counts all ≤6 (no `[STORY_CAP]` tail ungraded).
- **First sync had no anchor.** Deletes were reviewed by hand against the project's file list (old
  flat `components/core/*.jsx`, `readme.md`, `ui_kits/`, `assets/`, `uploads/` removed). Kept the
  foundation `guidelines/*.html` (still token-accurate) and app-infra (`SKILL.md`, `support.js`,
  `_adherence.oxlintrc.json`, `_ds_manifest.json`). Future re-syncs use the uploaded `_ds_sync.json`
  anchor, so run with `--remote`.
- **Old `tokens/*.css` remain in the project** (harmless — the new closure is self-contained). Not
  deleted to avoid touching anything the app or guidelines might reference.
