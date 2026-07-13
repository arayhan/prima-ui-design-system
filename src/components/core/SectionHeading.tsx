import React from 'react';

export interface SectionHeadingProps {
  /** Small uppercase mono label above the title, e.g. "EXPERIENCE" */
  eyebrow?: string;
  title: string;
  description?: string;
  style?: React.CSSProperties;
}

export function SectionHeading({ eyebrow, title, description, style }: SectionHeadingProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640, ...style }}>
      {eyebrow && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontWeight: 'var(--weight-medium)',
        } as React.CSSProperties}>{eyebrow}</span>
      )}
      <h2 style={{ fontSize: 'var(--text-3xl)' }}>{title}</h2>
      {description && (
        <p style={{ margin: 0, color: 'var(--text-body)', fontSize: 'var(--text-base)' }}>{description}</p>
      )}
    </div>
  );
}
