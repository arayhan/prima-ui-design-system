import React from 'react';

export interface MarqueeProps {
  /** Phrases to loop across the strip */
  items: string[];
  /** Seconds per loop (lower = faster). Default 30. */
  speed?: number;
  /** Ink-surface variant for use between/inside inverse blocks */
  inverse?: boolean;
  /** Cobalt separator drawn between items */
  separator?: string;
  style?: React.CSSProperties;
}

/**
 * Prima marquee — a mono uppercase text strip that divides major sections.
 * Decorative only; one per page. Loops right-to-left; respects reduced motion via base.css.
 */
export function Marquee({ items, speed = 30, inverse = false, separator = '//', style }: MarqueeProps) {
  const row = (
    <div style={{ display: 'flex', flex: 'none', alignItems: 'center' }}>
      {items.map((t, i) => (
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-6)', paddingRight: 'var(--space-6)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', color: inverse ? 'var(--on-inverse)' : 'var(--on-surface)', whiteSpace: 'nowrap',
        } as React.CSSProperties}>
          {t}<span style={{ color: 'var(--primary)' }}>{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div style={{
      overflow: 'hidden',
      background: inverse ? 'var(--inverse-surface)' : 'var(--background)',
      borderTop: `var(--border-width) solid ${inverse ? 'var(--inverse-border)' : 'var(--border)'}`,
      borderBottom: `var(--border-width) solid ${inverse ? 'var(--inverse-border)' : 'var(--border)'}`,
      padding: 'var(--space-4) 0', ...style,
    }}>
      <div style={{ display: 'flex', width: 'max-content', animation: `prima-marquee ${speed}s linear infinite` }}>
        {row}{row}
        <style>{'@keyframes prima-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }'}</style>
      </div>
    </div>
  );
}
