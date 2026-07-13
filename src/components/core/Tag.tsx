import React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Tag({ children, style }: TagProps) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      borderRadius: 'var(--radius-sm)', padding: '3px 9px',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
      background: 'color-mix(in srgb, var(--bg-muted) 65%, transparent)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: 'var(--text-body)',
      border: '1px solid var(--border-default)', ...style,
    }}>{children}</span>
  );
}
