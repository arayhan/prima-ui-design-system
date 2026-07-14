import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Optional trailing label text */
  label?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Prima switch — 50×28 pill. Cobalt track on, hairline track off; white knob slides 150ms. */
export function Switch({ checked = false, onChange, disabled, label, id, style }: SwitchProps) {
  return (
    <button
      type="button" role="switch" aria-checked={checked} id={id} disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
        background: 'none', border: 'none', padding: 0, font: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style,
      }}
    >
      <span style={{
        position: 'relative', width: 50, height: 28, flex: 'none', display: 'inline-block',
        borderRadius: 'var(--radius-full)',
        background: checked ? 'var(--primary)' : 'var(--border)',
        transition: 'background var(--duration-fast) var(--ease-spatial)',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: checked ? 25 : 3, width: 22, height: 22,
          borderRadius: 'var(--radius-full)', background: '#FFFFFF',
          transition: 'left var(--duration-fast) var(--ease-spatial)',
        }} />
      </span>
      {label && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--on-surface)' }}>
          {label}
        </span>
      )}
    </button>
  );
}
