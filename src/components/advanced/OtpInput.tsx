import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from '../core/_field';

export interface OtpInputProps {
  /** Number of boxes. Default 6. */
  length?: number;
  /** Controlled value, e.g. "123456" */
  value?: string;
  onChange?: (value: string) => void;
  /** Restrict input to digits only. Default true. */
  numeric?: boolean;
  label?: string;
  helper?: string;
  error?: string;
  /** Auto-focus the first empty box on mount. Default false. */
  autoFocus?: boolean;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima OTP/PIN field — N mono single-character boxes. Auto-advances on
 * type, walks backward clearing on Backspace, arrow-keys move between
 * boxes, and pasting a full code distributes across all boxes at once.
 */
export function OtpInput({
  length = 6, value = '', onChange, numeric = true, label, helper, error, autoFocus = false, id, style, className,
}: OtpInputProps) {
  const chars = React.useMemo(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) arr.push('');
    return arr;
  }, [value, length]);

  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const invalid = !!error;
  const inputId = id || (label ? 'otp-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);

  React.useEffect(() => {
    if (!autoFocus) return;
    const firstEmpty = chars.findIndex((c) => !c);
    const target = firstEmpty === -1 ? 0 : firstEmpty;
    refs.current[target]?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = (next: string[]) => onChange && onChange(next.join(''));

  const setChar = (index: number, char: string) => {
    const next = [...chars];
    next[index] = char;
    emit(next);
  };

  const onInput = (index: number, raw: string) => {
    const char = raw.slice(-1);
    if (!char) { setChar(index, ''); return; }
    if (numeric && !/^\d$/.test(char)) return;
    setChar(index, char);
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (chars[index]) {
        setChar(index, '');
      } else if (index > 0) {
        e.preventDefault();
        const next = [...chars];
        next[index - 1] = '';
        emit(next);
        refs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let text = e.clipboardData.getData('text');
    if (numeric) text = text.replace(/\D/g, '');
    text = text.slice(0, length);
    if (!text) return;
    const next = [...chars];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    emit(next);
    const focusIndex = Math.min(text.length, length - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div style={fieldWrap} className={className}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {chars.map((char, i) => (
          <input
            key={i}
            id={i === 0 ? inputId : undefined}
            ref={(el) => { refs.current[i] = el; }}
            value={char}
            inputMode={numeric ? 'numeric' : 'text'}
            maxLength={1}
            onChange={(e) => onInput(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex((f) => (f === i ? null : f))}
            style={fieldBoxStyle(focusedIndex === i, invalid, {
              width: 48, height: 52, textAlign: 'center',
              fontSize: 'var(--text-h3)', fontFamily: 'var(--font-mono)', padding: 0,
            })}
          />
        ))}
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
