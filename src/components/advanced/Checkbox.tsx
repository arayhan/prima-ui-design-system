import React from 'react';
import { FieldHelper } from '../core/_field';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  /** Error text below (turns the box border red) */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Prima checkbox — an 18px square that fills cobalt with a check glyph.
 * The same control language as MultiSelect's option rows.
 */
export function Checkbox({ checked = false, onChange, label, disabled, error, id, style }: CheckboxProps) {
  const invalid = !!error;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      <button
        type="button" role="checkbox" aria-checked={checked} id={id} disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
          background: 'none', border: 'none', padding: 0, font: 'inherit', textAlign: 'left',
          cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        }}
      >
        <span aria-hidden="true" style={{
          width: 18, height: 18, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 4,
          border: `var(--border-width) solid ${invalid ? 'var(--error)' : checked ? 'var(--primary)' : 'var(--border-strong)'}`,
          background: checked ? 'var(--primary)' : 'transparent',
          color: 'var(--on-primary)',
          transition: 'background var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
        }}>
          {checked && <i className="ph ph-check" style={{ fontSize: 12 }} />}
        </span>
        {label && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--on-surface)' }}>
            {label}
          </span>
        )}
      </button>
      {error && <FieldHelper error>{error}</FieldHelper>}
    </div>
  );
}
