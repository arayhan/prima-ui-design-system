import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from '../core/_field';
import type { SelectOption } from '../core/Select';

export interface ComboboxProps {
  label?: string;
  helper?: string;
  error?: string;
  options: SelectOption[];
  /** Selected value (controlled) */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Text shown when the filter matches nothing */
  emptyText?: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

function ComboOption({ option, selected, highlighted, onSelect }: {
  option: SelectOption; selected: boolean; highlighted: boolean; onSelect: () => void;
}) {
  return (
    <button
      role="option" aria-selected={selected}
      onMouseDown={(e) => { e.preventDefault(); onSelect(); }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', width: '100%',
        padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
        background: highlighted ? 'var(--background)' : 'transparent', border: 'none',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--on-surface)',
      }}
    >
      {option.label}
      {selected && <i className="ph ph-check" aria-hidden="true" style={{ fontSize: 14, color: 'var(--primary)' }} />}
    </button>
  );
}

/**
 * Prima combobox — a searchable single select. Type to filter the floating list,
 * pick with the pointer or ArrowUp/ArrowDown + Enter. Escape and outside click close.
 */
export function Combobox({ label, helper, error, options, value, onChange, placeholder = 'Search…', emptyText = 'No matches.', id, style, className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputId = id || (label ? 'cb-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;

  const selectedOption = options.find((o) => o.value === value);
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) { setOpen(false); setQuery(''); }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const pick = (v: string) => {
    onChange && onChange(v);
    setOpen(false);
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHighlight((h) => Math.min(h + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && open && filtered[highlight]) { e.preventDefault(); pick(filtered[highlight].value); }
  };

  return (
    <div className={className} style={{ ...fieldWrap, ...style }}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div ref={rootRef} style={{ position: 'relative' }}>
        <input
          id={inputId} role="combobox" aria-expanded={open} aria-autocomplete="list"
          value={open ? query : (selectedOption?.label ?? '')}
          placeholder={selectedOption ? selectedOption.label : placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlight(0); }}
          onFocus={() => { setFocus(true); setOpen(true); }}
          onBlur={() => setFocus(false)}
          onKeyDown={onKeyDown}
          style={fieldBoxStyle(focus, invalid, { height: 48, padding: '0 40px 0 16px' })}
        />
        <i
          className="ph ph-magnifying-glass" aria-hidden="true"
          style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, color: open ? 'var(--primary)' : 'var(--text-secondary)', pointerEvents: 'none',
            transition: 'color var(--duration-fast) var(--ease-spatial)',
          }}
        />
        {open && (
          <div role="listbox" style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 40,
            maxHeight: 260, overflowY: 'auto', padding: 'var(--space-2)',
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)',
          }}>
            {filtered.length === 0 && (
              <div style={{
                padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
              } as React.CSSProperties}>{emptyText}</div>
            )}
            {filtered.map((o, i) => (
              <ComboOption
                key={o.value} option={o} selected={o.value === value} highlighted={i === highlight}
                onSelect={() => pick(o.value)}
              />
            ))}
          </div>
        )}
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
