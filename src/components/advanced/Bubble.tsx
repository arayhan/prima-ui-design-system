import React from 'react';

export interface BubbleProps {
  /** 'in' = received (white, left) · 'out' = sent (cobalt, right) */
  side?: 'in' | 'out';
  children: React.ReactNode;
  /** Mono meta line under the bubble — e.g. "09:41" or "AR · 09:41" */
  meta?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima chat bubble — received messages sit left on the white surface with a
 * hairline; sent messages sit right in cobalt. The corner nearest the sender
 * is squared to radius-sm for direction.
 */
export function Bubble({ side = 'in', children, meta, style, className }: BubbleProps) {
  const out = side === 'out';
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-1)',
      alignItems: out ? 'flex-end' : 'flex-start', ...style,
    }}>
      <div style={{
        maxWidth: 'min(420px, 85%)', padding: '10px 16px',
        background: out ? 'var(--primary)' : 'var(--surface)',
        color: out ? 'var(--on-primary)' : 'var(--on-surface)',
        border: out ? 'none' : 'var(--border-width) solid var(--border)',
        borderRadius: 'var(--radius-md)',
        borderBottomRightRadius: out ? 'var(--radius-sm)' : 'var(--radius-md)',
        borderBottomLeftRadius: out ? 'var(--radius-md)' : 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6,
      }}>{children}</div>
      {meta && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 2px',
        } as React.CSSProperties}>{meta}</span>
      )}
    </div>
  );
}
