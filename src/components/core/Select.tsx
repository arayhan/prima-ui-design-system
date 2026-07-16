import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from './_field';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  helper?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: any) => void;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
}

/** Prima select. Field language of Input + a 1.5px ink chevron (no native outline). */
export function Select({ label, helper, error, options, id, style, className, ...rest }: SelectProps) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'sel-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  return (
    <div style={fieldWrap} className={className}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div style={{ position: 'relative' }}>
        <select
          id={inputId}
          style={fieldBoxStyle(focus, invalid, {
            height: 48, padding: '0 40px 0 16px', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', ...style,
          })}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg
          aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
