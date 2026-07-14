## Building with the Arayhan Design System (Prima)

Engineered minimalism: an **ice** base (`#F8FBFD`), cool **ink** text (`#0F1116`), and exactly
ONE accent — electric **cobalt** (`#1B44F0`). Every neutral is blue-tinted; a warm gray is a bug.
No second accent, no gradients, no glows beyond the one cobalt button glow. Flat by default —
hairline borders and surface contrast do the work, not shadows.

### Setup — no provider, just the stylesheet

Components are self-contained React function components; there is **no provider or theme wrapper**,
and **no dark mode** (the ink surface is a storytelling block, not a theme). One setup step:
`import 'arayhan-design-system/styles.css'` once at the app root. It defines every `--*` token and
`@import`s the fonts (Clash Display from Fontshare; Inter + JetBrains Mono from Google) and the
Phosphor icon font. Without it nothing is styled and `SocialLinks` icons render empty.

### Styling idiom — CSS-variable tokens, inline styles, no class system

There is **no utility-class or CSS-in-JS system**. Style with the `style={{}}` prop and reference
the design through `var(--*)` tokens — never hardcode a hex/px a token covers. Real token names
(all defined in `styles.css`):

- **Color:** `--primary` (+`--primary-hover`, `--on-primary`), `--background` (ice), `--surface`
  (white), `--on-surface` (ink), `--text-secondary`, `--border`, `--border-strong` (ink line).
- **Inverse (ink storytelling block):** `--inverse-surface`, `--on-inverse`, `--inverse-muted`,
  `--inverse-border`. Semantic: `--success`, `--warning`, `--error`, `--info`.
- **Cobalt effects:** `--primary-ring` (focus), `--primary-glow` (button hover), `--shadow-floating`.
- **Type:** `--font-display` (Clash Display — ALL CAPS ≥18px, never body), `--font-body` (Inter),
  `--font-mono` (JetBrains Mono — labels/eyebrows). Sizes `--text-display/h1/h2/h3/body-lg/body/label/code`;
  weights `--weight-regular/medium/semibold/bold`; tracking `--tracking-display/heading/label`.
- **Structure:** radii `--radius-sm` (8, buttons/inputs/chips) / `--radius-md` (12, cards) /
  `--radius-lg` (16) / `--radius-full`; border widths `--border-width` (1.5px) /
  `--border-width-emphasis` (2px) / `--border-width-rule` (3px section rules).
- **Spacing (8pt):** `--space-1`…`--space-9` (4→96px), `--container-max` (1200px), `--section-gap`.
- **Motion:** `--ease-spatial`, `--duration-fast/base`, `--duration-reveal`.

**Type rules:** display/h1/h2 are Clash Display, **uppercase**, tight tracking. Labels/eyebrows are
mono, uppercase, `--tracking-label`, usually `--primary`, prefixed `//` or numbered `001`. Icons use
Phosphor **regular** classes: `<i className="ph ph-github-logo" />`.

### Where the truth lives

Read **`styles.css`** (the full token list) before styling, and each component's **`.prompt.md`**
(usage) and **`.d.ts`** (`<Name>Props`) before composing. The 11 components: `Button`, `Card`,
`Chip`, `Input`, `Textarea`, `Select`, `Switch`, `SectionHeader`, `TimelineItem`, `Marquee`,
`SocialLinks`.

### One idiomatic snippet

```tsx
import { SectionHeader, Card, Chip, Button } from 'arayhan-design-system';

function Work() {
  return (
    <section style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--space-5)' }}>
      <SectionHeader eyebrow="Selected work" number="001" title="Case studies with measurable impact" />
      <Card interactive arrow style={{ marginTop: 'var(--space-6)', maxWidth: 380 }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Chip>React</Chip><Chip>TypeScript</Chip>
        </div>
        <h3>Realtime game infrastructure</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
          Led the team through a pivot to realtime infra.
        </p>
        <Button style={{ marginTop: 'var(--space-4)' }}>Read the case study</Button>
      </Card>
    </section>
  );
}
```
