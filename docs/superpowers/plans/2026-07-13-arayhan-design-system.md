# arayhan Design System — Source Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruct an editable React+TypeScript component library from the compiled Claude Design export, with a tsup build and Storybook, preserving the design verbatim.

**Architecture:** Transcribe the export's 11 core `.jsx` components into typed `.tsx` (types from their `.d.ts`), keep tokens as CSS imported through `styles.css`, build to `dist/` with tsup, and drive dev/preview with Storybook 8 + Vite. Website screens ship as example stories, not public API.

**Tech Stack:** React 18, TypeScript 5, tsup (esbuild), Storybook 8 + Vite, pnpm.

## Global Constraints

- Package manager: **pnpm** only. Every install/run command uses `pnpm`.
- Node: 18+ (Storybook 8 / Vite 5 floor).
- Styling idiom is **fixed**: inline `style={{}}` objects reading `var(--*)` tokens. No CSS classes added, no CSS-in-JS library, no restyle.
- Components are copied **verbatim** from the export; the only edits are: `.jsx`→`.tsx`, add types from the `.d.ts`, rewrite internal `./X.jsx` imports to `./X`. No behavior changes.
- Source of truth (export, already extracted): `C:/Users/rayha/AppData/Local/Temp/claude/D--Personal-Data-source-codes-personal-arayhan-design-system/3da2979d-6915-475f-a52e-5e8dc62df955/scratchpad/ds-export/` (also re-extractable from `../personal-web/arayhan Design System.zip`).
- Public API = the 11 core components + their prop interfaces only. Website screens are never exported from `src/index.ts`.
- Fonts (Google Fonts) and icons (Phosphor duotone) stay on CDN, injected in Storybook preview.
- Commit after each task.

**Core components (11):** Button, IconButton, Badge, Tag, Input, Card, SectionHeading, TimelineItem, SocialLinks, ThemeToggle, ScrollProgress.

---

### Task 1: Repo tooling scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsup.config.ts`, `.gitignore` (exists — verify), `src/index.ts` (empty placeholder), `README.md` (stub)

**Interfaces:**
- Produces: `pnpm` scripts `build`, `dev`, `typecheck`, `storybook`, `build-storybook`; exports map `.` → `./dist/index.js`, `./styles.css` → `./dist/styles.css`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "arayhan-design-system",
  "version": "0.1.0",
  "description": "Design system for arayhan — personal website / portfolio of Rayhan.",
  "type": "module",
  "license": "MIT",
  "sideEffects": ["*.css"],
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./styles.css": "./dist/styles.css",
    "./tokens/*": "./dist/tokens/*"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.6.14",
    "@storybook/react": "^8.6.14",
    "@storybook/react-vite": "^8.6.14",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "storybook": "^8.6.14",
    "tsup": "^8.3.5",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowJs": true,
    "types": ["react", "react-dom"]
  },
  "include": ["src", "examples", "stories", ".storybook"]
}
```

- [ ] **Step 3: Write `tsup.config.ts`**

```ts
import { defineConfig } from 'tsup';
import { cpSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  onSuccess: async () => {
    cpSync('src/styles.css', 'dist/styles.css');
    cpSync('src/tokens', 'dist/tokens', { recursive: true });
  },
});
```

- [ ] **Step 4: Write placeholder `src/index.ts`**

```ts
export {};
```

- [ ] **Step 5: Write `README.md` stub**

```markdown
# arayhan Design System

React + TypeScript component library for arayhan.dev. Reconstructed from the Claude Design export.

## Install
\`\`\`bash
pnpm install
\`\`\`

## Scripts
- \`pnpm storybook\` — dev playground
- \`pnpm build\` — build library to dist/
- \`pnpm typecheck\` — type check

## Usage
\`\`\`tsx
import { Button } from 'arayhan-design-system';
import 'arayhan-design-system/styles.css';
\`\`\`
```

- [ ] **Step 6: Install deps**

Run: `pnpm install`
Expected: completes, writes `pnpm-lock.yaml`, creates `node_modules/`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold repo tooling (pnpm, tsup, ts, storybook deps)"
```

---

### Task 2: Tokens, styles, guidelines

**Files:**
- Create: `src/tokens/{colors,typography,spacing,fonts,base}.css`, `src/styles.css`, `guidelines/*.html`

**Interfaces:**
- Produces: `src/styles.css` `@import`s all five token files; `var(--*)` tokens available to all components.

- [ ] **Step 1: Copy token CSS verbatim from the export**

Copy `ds-export/tokens/{colors,typography,spacing,fonts,base}.css` → `src/tokens/` and `ds-export/styles.css` → `src/styles.css` unchanged.

- [ ] **Step 2: Copy guidelines**

Copy `ds-export/guidelines/*.html` → `guidelines/` (reference only, not built).

- [ ] **Step 3: Verify import graph**

Run: `node -e "const c=require('fs').readFileSync('src/styles.css','utf8'); if(!/tokens\/colors\.css/.test(c)) throw new Error('styles.css missing token imports'); console.log('ok')"`
Expected: `ok`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, styles entry, and guideline specimens"
```

---

### Task 3: Port 11 core components + barrel export

**Files:**
- Create: `src/components/core/{Button,IconButton,Badge,Tag,Input,Card,SectionHeading,TimelineItem,SocialLinks,ThemeToggle,ScrollProgress}.tsx`
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: token CSS from Task 2.
- Produces: named exports for each component + its `<Name>Props` interface from `src/index.ts`.

- [ ] **Step 1: Transcribe each component**

For each of the 11: take `ds-export/components/core/<Name>.jsx`, save as `src/components/core/<Name>.tsx`, keeping the body verbatim. Apply exactly these edits:
- Merge the prop shape from `ds-export/components/core/<Name>.d.ts` into a `export interface <Name>Props { ... }` and type the component's props param with it.
- Rewrite internal imports: `from './IconButton.jsx'` → `from './IconButton'`.
- Ensure `import React from 'react';` remains.
- No other changes. (SocialLinks also exports `SocialIcon` + `SocialIconName`-style prop — keep its extra exports.)

Example (Button):

```tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Button({ variant = 'primary', size = 'md', icon, children, href, disabled, onClick, style, ...rest }: ButtonProps) {
  // ...body copied verbatim from ds-export/components/core/Button.jsx...
}
```

- [ ] **Step 2: Write the barrel `src/index.ts`**

```ts
export { Button } from './components/core/Button';
export type { ButtonProps } from './components/core/Button';
export { IconButton } from './components/core/IconButton';
export type { IconButtonProps } from './components/core/IconButton';
export { Badge } from './components/core/Badge';
export type { BadgeProps } from './components/core/Badge';
export { Tag } from './components/core/Tag';
export type { TagProps } from './components/core/Tag';
export { Input } from './components/core/Input';
export type { InputProps } from './components/core/Input';
export { Card } from './components/core/Card';
export type { CardProps } from './components/core/Card';
export { SectionHeading } from './components/core/SectionHeading';
export type { SectionHeadingProps } from './components/core/SectionHeading';
export { TimelineItem } from './components/core/TimelineItem';
export type { TimelineItemProps } from './components/core/TimelineItem';
export { SocialLinks, SocialIcon } from './components/core/SocialLinks';
export type { SocialLinksProps } from './components/core/SocialLinks';
export { ThemeToggle } from './components/core/ThemeToggle';
export type { ThemeToggleProps } from './components/core/ThemeToggle';
export { ScrollProgress } from './components/core/ScrollProgress';
export type { ScrollProgressProps } from './components/core/ScrollProgress';
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: PASS (no errors). Fix any type gaps by widening prop interfaces to match the verbatim runtime usage — never by changing runtime behavior.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: port 11 core components to typed tsx + barrel export"
```

---

### Task 4: Library build

**Files:** none new (uses `tsup.config.ts` from Task 1).

**Interfaces:**
- Consumes: `src/index.ts`, `src/styles.css`, `src/tokens/`.
- Produces: `dist/index.js`, `dist/index.d.ts`, `dist/styles.css`, `dist/tokens/`.

- [ ] **Step 1: Build**

Run: `pnpm build`
Expected: tsup emits `dist/index.js` + `dist/index.d.ts`; `onSuccess` copies `dist/styles.css` and `dist/tokens/`.

- [ ] **Step 2: Verify dist artifacts**

Run: `node -e "['dist/index.js','dist/index.d.ts','dist/styles.css','dist/tokens/colors.css'].forEach(f=>{if(!require('fs').existsSync(f))throw new Error('missing '+f)});console.log('ok')"`
Expected: `ok`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: verify library build emits dist artifacts"
```

(Only `.gitignore`/config changes get committed; `dist/` is ignored.)

---

### Task 5: Storybook config + core stories

**Files:**
- Create: `.storybook/main.ts`, `.storybook/preview.ts`, `stories/<Name>.stories.tsx` for each core component (11).

**Interfaces:**
- Consumes: barrel exports from Task 3, `src/styles.css`.
- Produces: a bootable Storybook with one story per core component.

- [ ] **Step 1: Write `.storybook/main.ts`**

```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
};
export default config;
```

- [ ] **Step 2: Write `.storybook/preview.ts`**

```ts
import type { Preview } from '@storybook/react';
import '../src/styles.css';

// Inject CDN fonts + Phosphor duotone icons (kept faithful to the export).
if (typeof document !== 'undefined') {
  const add = (href: string) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l);
  };
  add('https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css');
  add('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0B1120' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: { title: 'Theme', icon: 'circlehollow', items: ['light', 'dark'] },
    },
  },
  decorators: [
    (Story, ctx) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', ctx.globals.theme);
      }
      return Story();
    },
  ],
};
export default preview;
```

- [ ] **Step 3: Write one story per core component**

Base each story on the component's `.prompt.md` example + `.d.ts` prop ranges. Example (`stories/Button.stories.tsx`):

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/core/Button';

const meta: Meta<typeof Button> = { title: 'Core/Button', component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'View portfolio' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Download CV' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Learn more' } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

Write the analogous story file for the other 10 (IconButton, Badge, Tag, Input, Card, SectionHeading, TimelineItem, SocialLinks, ThemeToggle, ScrollProgress), each covering its main props from its `.prompt.md`/`.d.ts`.

- [ ] **Step 4: Build Storybook (headless verification)**

Run: `pnpm build-storybook`
Expected: completes, writes `storybook-static/` with no compile errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add storybook config and core component stories"
```

---

### Task 6: Website example screens + stories

**Files:**
- Create: `examples/website/{HomeScreen,BlogScreens,ContactScreen,UsesScreen,Isometric,Shared}.tsx`, `examples/website/{data,image-slot}.js`, `stories/examples/Website.stories.tsx`

**Interfaces:**
- Consumes: core components (via relative import into `src/`), tokens.
- Produces: "Examples/Website" stories. NOT exported from `src/index.ts`.

- [ ] **Step 1: Copy screens verbatim**

Copy `ds-export/ui_kits/website/{HomeScreen,BlogScreens,ContactScreen,UsesScreen,Isometric,Shared}.jsx` → `examples/website/` as `.tsx`, and `data.js` + `image-slot.js` unchanged. Rewrite internal `./X.jsx` imports to `./X`. If a screen imports a core component from a relative kit path, repoint it to `../../src/components/core/<Name>`.

- [ ] **Step 2: Write example stories**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { HomeScreen } from '../../examples/website/HomeScreen';

const meta: Meta = { title: 'Examples/Website', parameters: { layout: 'fullscreen' } };
export default meta;

export const Home: StoryObj = { render: () => <HomeScreen /> };
```

Add exports for the other screens (Blog, Contact, Uses) following the same pattern, matching each file's actual export name.

- [ ] **Step 3: Typecheck (allowJs tolerates the .js data files)**

Run: `pnpm typecheck`
Expected: PASS. If a screen has deep type errors from verbatim JS, keep the file as `.jsx` under `examples/` (allowed by `allowJs`) rather than forcing types — examples are not the public API.

- [ ] **Step 4: Build Storybook**

Run: `pnpm build-storybook`
Expected: completes; example stories included.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add website example screens as storybook examples"
```

---

### Task 7: Final verification + README polish

**Files:**
- Modify: `README.md` (component list, structure, conventions header note)

**Interfaces:**
- Consumes: everything above.
- Produces: final documented, verified repo.

- [ ] **Step 1: Full verification sweep**

Run in order, all must pass:
```bash
pnpm typecheck
pnpm build
pnpm build-storybook
```
Expected: all succeed; `dist/` + `storybook-static/` present.

- [ ] **Step 2: Manual render spot-check**

Run: `pnpm storybook` and confirm in the browser (or a screenshot) that Button variants, Card, Input, SocialLinks (Phosphor icons visible), and ThemeToggle (switches light/dark) render matching the export.

- [ ] **Step 3: Flesh out `README.md`**

List the 11 exported components, the folder structure, the styling idiom (inline styles + `var(--*)` tokens), and how a future `/design-sync` consumes `dist/`.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "docs: finalize README with component list and conventions"
```

---

## Self-Review

**Spec coverage:**
- Editable TS source ✓ (Task 3). Build to dist ✓ (Task 4). Storybook ✓ (Task 5). Website as examples ✓ (Task 6). pnpm ✓ (Task 1). Tokens/styles ✓ (Task 2). Visual parity verify ✓ (Task 7). Guidelines carried ✓ (Task 2). Public API = 11 core only ✓ (Task 3 barrel; screens excluded in Task 6).
- No gaps found.

**Placeholder scan:** `src/index.ts` starts as `export {}` placeholder (Task 1) but is fully written in Task 3 — intentional, not a plan placeholder. No "TBD"/"handle edge cases" left.

**Type consistency:** Component export names and `<Name>Props` interfaces used in the Task 3 barrel match the file names created in Task 3 Step 1. Story imports (Task 5/6) reference the same paths. tsup entry `src/index.ts` matches Task 1 config.
