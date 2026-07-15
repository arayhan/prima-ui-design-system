import React from 'react';
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

/** Install → import styles → compose. Three steps, all copyable. */
export function UsageSection() {
  return (
    <Section id="usage">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <Step n="01" title="Install">
          <CodeBlock label="TERMINAL" lang="bash" code={`pnpm add prima-ui
# or: npm install prima-ui`} />
        </Step>

        <Step n="02" title="Import the styles once">
          <CodeBlock label="MAIN.TSX" code={`import 'prima-ui/styles.css';
// pulls in all tokens + Clash Display, Inter,
// JetBrains Mono, and the Phosphor icon font (CDN)`} />
        </Step>

        <Step n="03" title="Compose">
          <CodeBlock label="APP.TSX" code={`import { Hero, FeatureGrid, CTASection, Footer } from 'prima-ui';

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
}`} />
        </Step>
      </div>
    </Section>
  );
}
