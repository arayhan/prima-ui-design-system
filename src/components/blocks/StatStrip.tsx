import React from 'react';
import { useCountAnimationText } from '../core/_countAnimation';

export interface Stat {
  /** The big number — e.g. "11", "5×", "100%" */
  value: string;
  /** Mono uppercase caption under the value */
  label: string;
}

export interface StatStripProps {
  stats: Stat[];
  /** Ink-surface variant for use on inverse blocks */
  inverse?: boolean;
  style?: React.CSSProperties;
}

function StatCell({ stat, inverse, rule }: { stat: Stat; inverse: boolean; rule: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const display = useCountAnimationText(ref as React.RefObject<Element>, stat.value);
  return (
    <div
      ref={ref}
      style={{
        padding: 'var(--space-6)',
        borderRight: `var(--border-width) solid ${rule}`,
        borderBottom: `var(--border-width) solid ${rule}`,
        display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        background: inverse ? 'var(--inverse-surface)' : 'var(--surface)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 600,
        lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-heading)',
        color: inverse ? 'var(--on-inverse)' : 'var(--on-surface)', fontVariantNumeric: 'tabular-nums',
      } as React.CSSProperties}>{display}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: inverse ? 'var(--inverse-muted)' : 'var(--text-secondary)',
      } as React.CSSProperties}>{stat.label}</span>
    </div>
  );
}

/**
 * Prima stat strip — a horizontal row of stats separated by 1.5px hairline rules.
 * Clash Display values over mono uppercase labels; each value counts up from 0
 * the first time it scrolls into view (instant under reduced motion). Wraps on
 * narrow viewports.
 */
export function StatStrip({ stats, inverse = false, style }: StatStripProps) {
  const rule = inverse ? 'var(--inverse-border)' : 'var(--border)';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 200px), 1fr))`,
      borderTop: `var(--border-width) solid ${rule}`,
      borderLeft: `var(--border-width) solid ${rule}`,
      ...style,
    }}>
      {stats.map((stat, i) => <StatCell key={i} stat={stat} inverse={inverse} rule={rule} />)}
    </div>
  );
}
