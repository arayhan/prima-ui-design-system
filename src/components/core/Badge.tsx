import React from 'react';

export interface BadgeProps {
  tone?: 'accent' | 'neutral' | 'open';
  /** Show pulsing green dot (implied by tone="open") */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge({ tone = 'accent', dot = false, children, style }: BadgeProps) {
  const tones = {
    accent: { background: 'var(--accent-soft)', color: 'var(--text-accent)', border: '1px solid var(--accent-soft-border)' },
    neutral: { background: 'var(--bg-muted)', color: 'var(--text-body)', border: '1px solid var(--border-default)' },
    open: { background: 'color-mix(in srgb, var(--surface-card) 60%, transparent)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      borderRadius: 'var(--radius-full)', padding: '5px 13px',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
      ...tones[tone], ...style,
    } as React.CSSProperties}>
      {(dot || tone === 'open') && (
        <span style={{
          width: 8, height: 8, borderRadius: 99, background: 'var(--status-open)', flex: 'none',
          animation: 'ds-pulse 2s infinite',
        }}></span>
      )}
      <style>{'@keyframes ds-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5);} 60% { box-shadow: 0 0 0 6px rgba(16,185,129,0);} }'}</style>
      {children}
    </span>
  );
}
