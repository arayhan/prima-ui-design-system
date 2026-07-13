import React from 'react';

export interface InputProps {
  label?: string;
  hint?: string;
  /** Render a textarea */
  textarea?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
  id?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Input({ label, hint, textarea = false, id, style, ...rest }: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'in-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const s = {
    width: '100%', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
    color: 'var(--text-heading)',
    background: 'color-mix(in srgb, var(--surface-card) 70%, transparent)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid ' + (focus ? 'var(--border-accent)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-sm)', padding: '11px 14px', outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'all var(--duration-fast) var(--ease-out)',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? 120 : undefined,
    lineHeight: 'var(--leading-normal)',
    boxSizing: 'border-box', ...style,
  };
  const Field: any = textarea ? 'textarea' : 'input';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-medium)', color: 'var(--text-heading)',
        } as React.CSSProperties}>{label}</label>
      )}
      <Field id={inputId} style={s} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest} />
      {hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}
