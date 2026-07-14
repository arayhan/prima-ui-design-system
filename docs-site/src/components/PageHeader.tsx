import React from 'react';
import { Container } from './Section';
import { useLineReveal } from '../motion/hooks';

export interface PageHeaderProps {
  /** Mono eyebrow with // prefix — e.g. "FOUNDATIONS" */
  eyebrow: string;
  /** Running number — e.g. "002" */
  number?: string;
  /** Mega Clash Display title. Use \n for manual line breaks. */
  title: string;
  lede?: string;
}

/**
 * Page opener for the inner pages — each page gets its own 800ms staggered
 * line-reveal moment under a 3px ink rule.
 */
export function PageHeader({ eyebrow, number, title, lede }: PageHeaderProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  useLineReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref} style={{ paddingTop: 128 }}>
      <Container>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-4)',
          borderTop: 'var(--border-width-rule) solid var(--border-strong)', paddingTop: 'var(--space-3)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          } as React.CSSProperties}>// {eyebrow}</span>
          {number && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
            }}>{number}</span>
          )}
        </div>
        <h1 style={{ margin: 'var(--space-5) 0 0' }}>
          {title.split('\n').map((line) => (
            <span key={line} style={{ display: 'block', overflow: 'hidden', padding: '0.04em 0' }}>
              <span data-reveal-line style={{
                display: 'block',
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 7.5vw, 92px)', fontWeight: 600,
                lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)',
                textTransform: 'uppercase', color: 'var(--on-surface)',
              } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>
        {lede && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
            lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)',
            margin: 'var(--space-5) 0 0', maxWidth: 640,
          }}>{lede}</p>
        )}
      </Container>
    </div>
  );
}
