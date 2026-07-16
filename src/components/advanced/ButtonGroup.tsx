import React from 'react';

export interface ButtonGroupOption {
  value: string;
  label: string;
  /** Phosphor regular icon class */
  icon?: string;
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Segment({ option, selected, first, onSelect }: {
  option: ButtonGroupOption; selected: boolean; first: boolean; onSelect: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button" aria-pressed={selected}
      onClick={onSelect}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        height: 44, padding: '0 18px', cursor: 'pointer',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        background: selected ? 'var(--primary)' : hover ? 'var(--background)' : 'var(--surface)',
        color: selected ? 'var(--on-primary)' : 'var(--on-surface)',
        border: 'none',
        borderLeft: first ? 'none' : 'var(--border-width) solid var(--border-strong)',
        transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >
      {option.icon && <i className={option.icon} aria-hidden="true" style={{ fontSize: 15 }} />}
      {option.label}
    </button>
  );
}

/**
 * Prima button group — a segmented control. Joined mono uppercase segments inside
 * one 2px ink border; the active segment fills cobalt.
 */
export function ButtonGroup({ options, value, onChange, label, style, className }: ButtonGroupProps) {
  return (
    <div
      role="group" aria-label={label}
      className={className}
      style={{
        display: 'inline-flex', overflow: 'hidden',
        border: 'var(--border-width-emphasis) solid var(--border-strong)',
        borderRadius: 'var(--radius-sm)', ...style,
      }}
    >
      {options.map((o, i) => (
        <Segment
          key={o.value} option={o} first={i === 0} selected={value === o.value}
          onSelect={() => onChange && onChange(o.value)}
        />
      ))}
    </div>
  );
}
