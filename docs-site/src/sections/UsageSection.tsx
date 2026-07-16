import React from 'react';
import { ButtonGroup } from 'prima-ui';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
  letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
};

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
        <span style={{ ...monoLabel, color: 'var(--primary)' } as React.CSSProperties}>{n}</span>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 'var(--tracking-heading)', color: 'var(--on-surface)', margin: 0,
        } as React.CSSProperties}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

const APP_TSX_CSS = `import { Hero, FeatureGrid, CTASection, Footer } from 'prima-ui';

export function App() {
  return (
    <>
      <Hero
        eyebrow="PORTFOLIO"
        title={'ENGINEERED\\nMINIMALISM'}
        primaryAction={{ label: 'See the work', href: '#work' }}
      />
      <FeatureGrid items={features} />
      <CTASection eyebrow="CONTACT" title="LET'S TALK" email="you@example.com" />
      <Footer note="© 2026" />
    </>
  );
}`;

const APP_TSX_TAILWIND = `import { Hero, FeatureGrid, CTASection, Footer } from 'prima-ui';

export function App() {
  return (
    <>
      <Hero
        className="mb-space-9"
        eyebrow="PORTFOLIO"
        title={'ENGINEERED\\nMINIMALISM'}
        primaryAction={{ label: 'See the work', href: '#work' }}
      />
      <FeatureGrid className="max-w-6xl mx-auto" items={features} />
      <CTASection eyebrow="CONTACT" title="LET'S TALK" email="you@example.com" />
      <Footer className="mt-space-9" note="© 2026" />
    </>
  );
}`;

/** Install → import styles → compose. Three steps, all copyable — pick Plain CSS or Tailwind. */
export function UsageSection() {
  const [mode, setMode] = React.useState<string>('css');

  return (
    <Section id="usage">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <div data-reveal>
          <ButtonGroup
            label="Styling approach"
            value={mode} onChange={setMode}
            options={[
              { value: 'css', label: 'Plain CSS' },
              { value: 'tailwind', label: 'Tailwind' },
            ]}
          />
        </div>

        <Step n="01" title="Install">
          <CodeBlock label="TERMINAL" lang="bash" code={`pnpm add prima-ui
# or: npm install prima-ui`} />
        </Step>

        <Step n="02" title="Import the styles once">
          {mode === 'css' ? (
            <CodeBlock label="MAIN.TSX" code={`import 'prima-ui/styles.css';
// pulls in all tokens + Clash Display, Inter,
// JetBrains Mono, and the Phosphor icon font (CDN)`} />
          ) : (
            <CodeBlock label="GLOBAL.CSS" code={`@import "tailwindcss";
@import "prima-ui/tailwind.css";
/* one import: tokens, fonts, icons, base resets, AND a
   Tailwind @theme mapping — bg-primary, text-h1,
   font-display, p-space-4, rounded-md, and more. */`} />
          )}
        </Step>

        <Step n="03" title="Compose">
          {mode === 'css' ? (
            <CodeBlock label="APP.TSX" code={APP_TSX_CSS} />
          ) : (
            <CodeBlock label="APP.TSX" code={APP_TSX_TAILWIND} />
          )}
          {mode === 'tailwind' && (
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6,
              color: 'var(--text-secondary)', margin: 0, maxWidth: 560,
            }}>
              Every component accepts a <code>className</code> — layer Tailwind utilities (Prima's own
              token classes, or Tailwind's stock ones) on top of the component's built-in styling. Properties
              the component already sets inline (color, padding, background) win over classes by CSS
              specificity — <code>className</code> is for layout, spacing, and anything the component
              doesn't already control.
            </p>
          )}
        </Step>
      </div>
    </Section>
  );
}
