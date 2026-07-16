import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from './_field';

export interface InputProps {
  label?: string;
  /** Helper text below the field */
  helper?: string;
  /** Error text below the field (replaces helper, turns the border red) */
  error?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: any) => void;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
}

/** Prima text input. White field, 1.5px border, mono label above, cobalt focus ring. */
export function Input({ label, helper, error, id, style, className, ...rest }: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'in-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  return (
    <div style={fieldWrap} className={className}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <input
        id={inputId}
        style={fieldBoxStyle(focus, invalid, { height: 48, padding: '0 16px', ...style })}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}
      />
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
