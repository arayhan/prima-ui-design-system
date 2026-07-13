## Building with the arayhan design system

Clean, minimalist, monochrome-dominant. Black/white/slate carries the UI; accent **blue is
scarce** (links, the scroll bar, timeline nodes, small labels). No shadows — depth comes from
translucent surfaces + hairline borders. Light theme default; dark via `[data-theme="dark"]`.

### Setup — no provider, just the stylesheet

Components are self-contained React function components; there is **no ThemeProvider or root
wrapper to mount**. Two setup steps only:

1. Load the stylesheet once at the app root: `import 'arayhan-design-system/styles.css'`. It
   defines every `--*` token and `@import`s the webfonts (Bricolage Grotesque / Schibsted Grotesk
   / JetBrains Mono / Caveat) and the Phosphor icon font from CDN. Without it, nothing is styled
   and `SocialLinks` icons render empty.
2. For dark mode, set `document.documentElement.setAttribute('data-theme', 'dark')`. `ThemeToggle`
   is **controlled** — you own the state and set the attribute; it renders only the sun/moon button.

### Styling idiom — CSS-variable tokens, inline styles, no class system

There is **no utility-class or CSS-in-JS system**. Style with the `style={{}}` prop, and reference
the design language through `var(--*)` tokens — never hardcode a hex or px that a token covers. Real
token names (all defined in `styles.css`):

- **Surfaces / bg:** `--bg-page`, `--bg-subtle`, `--bg-muted`, `--surface-card`, `--surface-raised`, `--surface-accent`
- **Text:** `--text-heading`, `--text-body`, `--text-muted`, `--text-accent`, `--text-on-primary`, `--text-inverse`
- **Interactive / accent:** `--interactive-primary` (+`-hover`), `--accent` (+`-hover`), `--accent-soft`, `--status-open` (the "open to work" green)
- **Borders:** `--border-default`, `--border-strong`, `--border-accent`, `--focus-ring`
- **Radii:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` (pill)
- **Spacing:** `--space-1`…`--space-10`, plus `--section-gap`, `--container-max`, `--container-pad`
- **Type:** `--font-display` (headings), `--font-body`, `--font-mono` (meta/labels), `--font-hand` (captions only); sizes `--text-xs`…`--text-5xl`; `--weight-medium/semibold/bold`; `--tracking-tight/wide`
- **Motion:** `--duration-fast/base`, `--ease-out`

**Icons:** Phosphor, duotone weight — the only real CSS classes in the system:
`<i className="ph-duotone ph-github-logo" />`, sized via `fontSize`. The Phosphor font is loaded by
`styles.css`, so these resolve in any design.

### Where the truth lives

Read **`styles.css`** (the full token list) before styling, and each component's **`.prompt.md`**
(usage + examples) and **`.d.ts`** (`<Name>Props` — the exact API) before composing it. The 11
components: `Button`, `IconButton`, `Badge`, `Tag`, `Input`, `Card`, `SectionHeading`,
`TimelineItem`, `SocialLinks`, `ThemeToggle`, `ScrollProgress`.

### One idiomatic snippet

```tsx
import { Card, Badge, Button, SectionHeading } from 'arayhan-design-system';

function Hero() {
  return (
    <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8)' }}>
      <SectionHeading eyebrow="Portfolio" title="Selected work"
        description="Case studies with measurable impact." />
      <Card interactive style={{ marginTop: 'var(--space-6)' }}>
        <Badge tone="open">Open to opportunities</Badge>
        <h3 style={{ font: 'var(--weight-semibold) var(--text-xl) var(--font-display)', color: 'var(--text-heading)', margin: 'var(--space-3) 0' }}>
          SMILE cold-storage IoT
        </h3>
        <p style={{ color: 'var(--text-body)' }}>71% cost reduction on national vaccine logistics.</p>
        <Button style={{ marginTop: 'var(--space-4)' }}>View case study</Button>
      </Card>
    </section>
  );
}
```
