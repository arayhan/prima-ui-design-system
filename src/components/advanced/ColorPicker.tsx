import React from 'react';
import { FieldLabel, FieldHelper, fieldBoxStyle, fieldWrap } from '../core/_field';
import { Popover } from './Popover';

export interface ColorPickerProps {
  /** Hex color, e.g. "#1B44F0" */
  value: string;
  onChange: (hex: string) => void;
  /** Preset swatches. A sensible default set is provided if omitted. */
  presets?: string[];
  label?: string;
  helper?: string;
  error?: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

const DEFAULT_PRESETS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308',
  '#84CC16', '#22C55E', '#10B981', '#14B8A6',
  '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
  '#D946EF', '#EC4899', '#000000', '#FFFFFF',
];

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Prima color picker — a swatch trigger that opens a Popover with a preset
 * grid plus a hex text input for custom values. The hex input only commits
 * (calls `onChange`) once its content is a syntactically valid hex color, so
 * users can type freely without being fought over intermediate states.
 */
export function ColorPicker({ value, onChange, presets = DEFAULT_PRESETS, label, helper, error, id, style, className }: ColorPickerProps) {
  const [draft, setDraft] = React.useState(value);
  const inputId = id || (label ? 'cp-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;

  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  const trigger = (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        ...fieldBoxStyle(false, invalid, { height: 56, padding: 'var(--space-3)' }),
      }}
    >
      <div
        style={{
          width: 44, height: 44, flex: 'none',
          borderRadius: 'var(--radius-sm)', background: value,
          border: 'var(--border-width) solid var(--border)',
        }}
      />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body)', color: 'var(--on-surface)' }}>
        {value}
      </span>
    </div>
  );

  return (
    <div className={className} style={{ ...fieldWrap, ...style }}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <Popover trigger={trigger}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minWidth: 220 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 'var(--space-2)' }}>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-label={preset}
                onClick={() => onChange(preset)}
                style={{
                  width: 32, height: 32, padding: 0, cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)', background: preset,
                  border: `2px solid ${preset.toLowerCase() === value.toLowerCase() ? 'var(--on-surface)' : 'var(--border)'}`,
                }}
              />
            ))}
          </div>
          <input
            id={inputId}
            type="text"
            value={draft}
            onChange={(e) => {
              const next = e.target.value;
              setDraft(next);
              if (HEX_RE.test(next)) onChange(next);
            }}
            style={fieldBoxStyle(false, invalid, { height: 40, padding: '0 12px', fontFamily: 'var(--font-mono)' })}
          />
        </div>
      </Popover>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
