import React from 'react';

export interface ChipProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Prima chip — a mono uppercase cobalt tag on an ice fill with a hairline border. */
export function Chip({ children, style }: ChipProps) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: 'var(--background)', color: 'var(--primary)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
      border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
      padding: '6px 12px', ...style,
    } as React.CSSProperties}>{children}</span>
  );
}
