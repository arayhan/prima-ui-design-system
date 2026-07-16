import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from '../core/_field';

export interface PasswordInputProps {
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

/**
 * Prima password field — Input's field language plus an eye toggle that
 * reveals the value. The toggle announces its state for screen readers.
 */
export function PasswordInput({ label, helper, error, id, style, className, ...rest }: PasswordInputProps) {
  const [focus, setFocus] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const inputId = id || (label ? 'pw-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  return (
    <div className={className} style={fieldWrap}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div style={{ position: 'relative' }}>
        <input
          id={inputId} type={visible ? 'text' : 'password'}
          style={fieldBoxStyle(focus, invalid, { height: 48, padding: '0 48px 0 16px', ...style })}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)',
            color: hover || visible ? 'var(--primary)' : 'var(--text-secondary)',
            transition: 'color var(--duration-fast) var(--ease-spatial)',
          }}
        >
          <i className={visible ? 'ph ph-eye-slash' : 'ph ph-eye'} aria-hidden="true" style={{ fontSize: 18 }} />
        </button>
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
