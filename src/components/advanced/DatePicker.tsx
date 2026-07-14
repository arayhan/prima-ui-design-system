import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from '../core/_field';
import { Calendar } from './Calendar';

export interface DatePickerProps {
  label?: string;
  helper?: string;
  error?: string;
  /** Selected date (controlled) */
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  /** Formats the field text. Defaults to a locale date string. */
  format?: (date: Date) => string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Prima date picker — a field-language trigger opening the Calendar in a
 * floating panel. Selecting a day closes it; Escape and outside click too.
 */
export function DatePicker({ label, helper, error, value, onChange, placeholder = 'Pick a date', format, id, style }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputId = id || (label ? 'dp-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  const fmt = format ?? ((d: Date) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }));

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div style={{ ...fieldWrap, ...style }}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div ref={rootRef} style={{ position: 'relative' }}>
        <button
          id={inputId} type="button" aria-haspopup="dialog" aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={fieldBoxStyle(open, invalid, {
            height: 48, padding: '0 44px 0 16px', textAlign: 'left', cursor: 'pointer',
            color: value ? 'var(--on-surface)' : 'var(--text-secondary)',
          })}
        >
          {value ? fmt(value) : placeholder}
        </button>
        <i
          className="ph ph-calendar-blank" aria-hidden="true"
          style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 17, color: open ? 'var(--primary)' : 'var(--text-secondary)', pointerEvents: 'none',
            transition: 'color var(--duration-fast) var(--ease-spatial)',
          }}
        />
        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 40, boxShadow: 'var(--shadow-floating)', borderRadius: 'var(--radius-md)' }}>
            <Calendar value={value} onChange={(d) => { onChange && onChange(d); setOpen(false); }} />
          </div>
        )}
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
