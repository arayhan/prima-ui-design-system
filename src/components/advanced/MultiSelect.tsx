import React from 'react';
import { FieldLabel, FieldHelper, fieldWrap } from '../core/_field';
import type { SelectOption } from '../core/Select';

export interface MultiSelectProps {
  label?: string;
  helper?: string;
  /** Error text below the field (replaces helper, turns the border red) */
  error?: string;
  options: SelectOption[];
  /** Selected values (controlled) */
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  id?: string;
  style?: React.CSSProperties;
}

function OptionRow({ option, selected, onToggle }: { option: SelectOption; selected: boolean; onToggle: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      role="option" aria-selected={selected}
      onClick={onToggle}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
        padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
        background: hover ? 'var(--background)' : 'transparent', border: 'none',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--on-surface)',
        transition: 'background var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <span aria-hidden="true" style={{
        width: 18, height: 18, flex: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 4,
        border: `var(--border-width) solid ${selected ? 'var(--primary)' : 'var(--border-strong)'}`,
        background: selected ? 'var(--primary)' : 'transparent',
        color: 'var(--on-primary)',
        transition: 'background var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}>
        {selected && <i className="ph ph-check" style={{ fontSize: 12 }} />}
      </span>
      {option.label}
    </button>
  );
}

/**
 * Prima multi-select — a field-language trigger that fills with removable cobalt
 * chips, opening a floating checklist (the one sanctioned shadow). Closes on
 * Escape and outside click. Controlled via `value` / `onChange`.
 */
export function MultiSelect({ label, helper, error, options, value, onChange, placeholder = 'Select…', id, style }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputId = id || (label ? 'ms-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;

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

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const selected = options.filter((o) => value.includes(o.value));

  return (
    <div style={{ ...fieldWrap, ...style }}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div ref={rootRef} style={{ position: 'relative' }}>
        <button
          id={inputId} aria-haspopup="listbox" aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)',
            width: '100%', minHeight: 48, padding: '8px 40px 8px 12px', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--on-surface)',
            background: 'var(--surface)',
            border: `var(--border-width) solid ${invalid ? 'var(--error)' : open ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-sm)', outline: 'none',
            boxShadow: open && !invalid ? '0 0 0 3px var(--primary-ring)' : 'none',
            transition: 'border-color var(--duration-fast) var(--ease-spatial), box-shadow var(--duration-fast) var(--ease-spatial)',
          }}
        >
          {selected.length === 0 && (
            <span style={{ color: 'var(--text-secondary)' }}>{placeholder}</span>
          )}
          {selected.map((o) => (
            <span key={o.value} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--background)', color: 'var(--primary)',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
              border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
              padding: '4px 8px',
            } as React.CSSProperties}>
              {o.label}
              <span
                role="button" aria-label={`Remove ${o.label}`}
                onClick={(e) => { e.stopPropagation(); toggle(o.value); }}
                style={{ display: 'inline-flex', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <i className="ph ph-x" style={{ fontSize: 11 }} />
              </span>
            </span>
          ))}
          <svg
            aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="var(--on-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{
              position: 'absolute', right: 14, top: '50%',
              transform: `translateY(-50%) ${open ? 'rotate(180deg)' : ''}`,
              pointerEvents: 'none', transition: 'transform var(--duration-fast) var(--ease-spatial)',
            }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div role="listbox" aria-multiselectable="true" style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 40,
            maxHeight: 260, overflowY: 'auto', padding: 'var(--space-2)',
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)',
          }}>
            {options.map((o) => (
              <OptionRow key={o.value} option={o} selected={value.includes(o.value)} onToggle={() => toggle(o.value)} />
            ))}
          </div>
        )}
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
