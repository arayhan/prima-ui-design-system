import React from 'react';
import { CTASection, SocialLinks } from 'arayhan-design-system';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { useScrollReveal } from '../motion/hooks';

export function ContactPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="CONTACT" number="005"
        title={'SAY\nHELLO'}
        lede="Design systems, interactive sites, and sharp interfaces. The fastest route is email — or everything else below."
      />
      <Section id="contact-cta">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
          <div data-reveal>
            <CTASection
              eyebrow="LET’S TALK"
              title={'LET’S BUILD\nSOMETHING SHARP'}
              action={{ label: 'Visit arayhan.com', href: 'https://arayhan.com' }}
              email="rayhanprima99@gmail.com"
            />
          </div>
          <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
            } as React.CSSProperties}>// ELSEWHERE</span>
            <SocialLinks size={52} />
          </div>
        </div>
      </Section>
    </div>
  );
}
