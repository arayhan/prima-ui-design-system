import React from 'react';

// Shared form-control building blocks (NOT exported from the library barrel).
// Prima form language: mono label above, white field with 1.5px border, cobalt
// focus border + 3px ring, 13px helper/error below.

export function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} style={{
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
    } as React.CSSProperties}>{children}</label>
  );
}

export function FieldHelper({ error, children }: { error?: boolean; children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5,
      color: error ? 'var(--error)' : 'var(--text-secondary)',
    }}>{children}</span>
  );
}

export function fieldBoxStyle(focus: boolean, invalid: boolean, extra?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%',
    fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--on-surface)',
    background: 'var(--surface)',
    border: `var(--border-width) solid ${invalid ? 'var(--error)' : focus ? 'var(--primary)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-sm)', outline: 'none',
    boxShadow: focus && !invalid ? '0 0 0 3px var(--primary-ring)' : 'none',
    transition: 'border-color var(--duration-fast) var(--ease-spatial), box-shadow var(--duration-fast) var(--ease-spatial)',
    ...extra,
  };
}

export const fieldWrap: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
};
