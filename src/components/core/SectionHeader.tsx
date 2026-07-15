import React from 'react';
import { useCountAnimationText } from './_countAnimation';

export interface SectionHeaderProps {
  /** Mono eyebrow, rendered with a `//` prefix — e.g. "ABOUT" → "// ABOUT" */
  eyebrow?: string;
  /** Running number shown at the right of the rule — e.g. "001" */
  number?: string;
  title: string;
  description?: string;
  style?: React.CSSProperties;
}

/**
 * Prima section opener: a mono `//` cobalt eyebrow + running number above a 3px ink
 * rule, then an ALL-CAPS Clash Display title and an optional lede.
 */
function AnimatedNumber({ number }: { number: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const display = useCountAnimationText(ref as React.RefObject<Element>, number);
  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums',
      }}
    >{display}</span>
  );
}

export function SectionHeader({ eyebrow, number, title, description, style }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', ...style }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderTop: 'var(--border-width-rule) solid var(--border-strong)', paddingTop: 'var(--space-3)', gap: 'var(--space-4)',
      }}>
        {eyebrow && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          } as React.CSSProperties}>// {eyebrow}</span>
        )}
        {number && <AnimatedNumber number={number} />}
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 600,
        lineHeight: 'var(--leading-h2)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', margin: 0, maxWidth: 680,
      } as React.CSSProperties}>{title}</h2>
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
          lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)', margin: 0, maxWidth: 640,
        } as React.CSSProperties}>{description}</p>
      )}
    </div>
  );
}
