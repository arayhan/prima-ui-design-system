import React from 'react';
import { FieldLabel, FieldHelper } from '../core/_field';
import type { SelectOption } from '../core/Select';

export interface RadioGroupProps {
  /** Mono uppercase group label */
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Layout of the options. Default 'column'. */
  direction?: 'row' | 'column';
  helper?: string;
  error?: string;
  style?: React.CSSProperties;
  className?: string;
}

function RadioDot({ selected, invalid }: { selected: boolean; invalid: boolean }) {
  return (
    <span aria-hidden="true" style={{
      width: 18, height: 18, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 'var(--radius-full)',
      border: `var(--border-width) solid ${invalid ? 'var(--error)' : selected ? 'var(--primary)' : 'var(--border-strong)'}`,
      transition: 'border-color var(--duration-fast) var(--ease-spatial)',
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 'var(--radius-full)',
        background: 'var(--primary)',
        transform: selected ? 'scale(1)' : 'scale(0)',
        transition: 'transform var(--duration-fast) var(--ease-spatial)',
      }} />
    </span>
  );
}

/**
 * Prima radio group — 18px circles with a cobalt dot that scales in.
 * Same field language as every other Prima control.
 */
export function RadioGroup({ label, options, value, onChange, direction = 'column', helper, error, style, className }: RadioGroupProps) {
  const invalid = !!error;
  return (
    <div role="radiogroup" aria-label={label} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div style={{
        display: 'flex', flexDirection: direction, flexWrap: 'wrap',
        gap: direction === 'row' ? 'var(--space-5)' : 'var(--space-3)',
      }}>
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <button
              key={o.value} type="button" role="radio" aria-checked={selected}
              onClick={() => onChange && onChange(o.value)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
                background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <RadioDot selected={selected} invalid={invalid} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--on-surface)' }}>
                {o.label}
              </span>
            </button>
          );
        })}
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
