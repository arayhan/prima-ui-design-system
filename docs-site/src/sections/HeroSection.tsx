import React from 'react';
import { Button } from 'prima-ui';
import { Container } from '../components/Section';
import { useLineReveal, useMagnetic, usePrefersReducedMotion } from '../motion/hooks';
import { gsap, useGSAP, MOTION_OK } from '../motion/gsap';
import { HeroFallback } from '../three/HeroFallback';

const HeroScene = React.lazy(() => import('../three/HeroScene'));

const TITLE_LINES = ['ENGINEERED', 'MINIMALISM'];

function RevealLine({ children, size }: { children: React.ReactNode; size: string }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', padding: '0.04em 0' }}>
      <span data-reveal-line style={{
        display: 'block',
        fontFamily: 'var(--font-display)', fontSize: size, fontWeight: 600,
        lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)',
        textTransform: 'uppercase', color: 'var(--on-surface)',
      } as React.CSSProperties}>{children}</span>
    </span>
  );
}

function MagneticButton(props: React.ComponentProps<typeof Button>) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useMagnetic(ref);
  return <span ref={ref} style={{ display: 'inline-block' }}><Button {...props} /></span>;
}

/**
 * Full-viewport opener. The staggered 800ms line reveal is the page's one big
 * orchestrated moment; the three.js cobalt terrain drifts behind the type.
 */
export function HeroSection() {
  const ref = React.useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  useLineReveal(ref as React.RefObject<HTMLElement>, 0.15);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo('[data-hero-fade]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, delay: 0.7, duration: 0.6, stagger: 0.12 });
        gsap.to('[data-scroll-cue]', { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut', delay: 1.6 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header
      id="top" ref={ref}
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 64 }}
    >
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.8 }}>
        <React.Suspense fallback={<div style={{ position: 'absolute', right: '-8%', top: '15%', width: '55%', height: '70%', opacity: 0.35 }}><HeroFallback /></div>}>
          <HeroScene />
        </React.Suspense>
      </div>

      <Container style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 860 }}>
          <span data-hero-fade style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          } as React.CSSProperties}>// PRIMA — DESIGN SYSTEM V0.1.0</span>

          <h1 style={{ margin: 0 }}>
            {TITLE_LINES.map((line) => (
              <RevealLine key={line} size="clamp(52px, 10.5vw, 132px)">{line}</RevealLine>
            ))}
          </h1>

          <p data-hero-fade style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
            lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)', margin: 0, maxWidth: 540,
          }}>
            Cobalt on ice. One accent, three typefaces, visible structure — the personal
            design system of A. Rayhan Primadedas, documented end to end.
          </p>

          <div data-hero-fade style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
            <MagneticButton href="#/components" icon="→">Explore components</MagneticButton>
            <MagneticButton variant="secondary" href="https://arayhan.com" target="_blank" rel="noreferrer" icon="↗">
              Visit arayhan.com
            </MagneticButton>
          </div>
        </div>
      </Container>

      <div
        data-scroll-cue aria-hidden="true"
        style={{
          position: 'absolute', bottom: 'var(--space-5)', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: 'var(--tracking-label)',
          color: reduced ? 'var(--text-secondary)' : 'var(--primary)',
        } as React.CSSProperties}
      >↓ SCROLL</div>
    </header>
  );
}
