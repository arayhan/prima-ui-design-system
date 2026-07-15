import React from 'react';
import { Card, CTASection, Marquee, SectionHeader } from 'prima-ui';
import { Section } from '../components/Section';
import { HeroSection } from '../sections/HeroSection';
import { ManifestoSection } from '../sections/ManifestoSection';
import { useScrollReveal } from '../motion/hooks';

const INDEX = [
  { n: '001', title: 'Foundations', href: '#/foundations', desc: 'Colors, type scale, spacing, structure, and motion — every token, live and copyable.' },
  { n: '002', title: 'Components', href: '#/components', desc: 'The core eleven plus advanced controls, rendered live with code and props.' },
  { n: '003', title: 'Blocks', href: '#/blocks', desc: 'Composed, page-ready sections — hero, features, stats, contact, footer.' },
  { n: '004', title: 'Usage', href: '#/usage', desc: 'Install, import the styles once, compose. Three steps.' },
];

function IndexCard({ n, title, href, desc }: (typeof INDEX)[number]) {
  return (
    <Card interactive arrow href={href} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
      } as React.CSSProperties}>{n}</span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
        lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', margin: 0,
      } as React.CSSProperties}>{title}</h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
        color: 'var(--text-secondary)', margin: 0,
      }}>{desc}</p>
    </Card>
  );
}

export function HomePage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <HeroSection />
      <Marquee items={['ENGINEERED MINIMALISM', 'COBALT ON ICE', 'VISIBLE STRUCTURE', 'ONE ACCENT']} speed={26} />
      <ManifestoSection />
      <Section id="index">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
          <div data-reveal>
            <SectionHeader
              eyebrow="INDEX" number="002" title="Explore the system"
              description="Foundations, components, blocks, and usage each get their own page."
            />
          </div>
          <div data-reveal style={{
            display: 'grid', gap: 'var(--space-5)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          }}>
            {INDEX.map((item) => <IndexCard key={item.n} {...item} />)}
          </div>
        </div>
      </Section>
      <Section id="contact">
        <div data-reveal>
          <CTASection
            eyebrow="CONTACT"
            title={'LET’S BUILD\nSOMETHING SHARP'}
            action={{ label: 'Visit arayhan.com', href: 'https://arayhan.com' }}
            email="rayhanprima99@gmail.com"
          />
        </div>
      </Section>
    </div>
  );
}
