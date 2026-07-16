import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from './_field';

export interface TextareaProps {
  label?: string;
  helper?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
}

/** Prima textarea. Same field language as Input, min-height 120px, vertical resize. */
export function Textarea({ label, helper, error, id, style, className, ...rest }: TextareaProps) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'ta-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  return (
    <div style={fieldWrap} className={className}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <textarea
        id={inputId}
        style={fieldBoxStyle(focus, invalid, {
          minHeight: 120, padding: '14px 16px', resize: 'vertical', lineHeight: 'var(--leading-body)', ...style,
        })}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}
      />
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
