import React from 'react';

export interface ToggleGroupOption {
  value: string;
  label: string;
  /** Phosphor regular icon class */
  icon?: string;
}

export interface ToggleGroupPropsSingle {
  /** Exactly one segment active. Default. */
  type?: 'single';
  value?: string;
  onChange?: (value: string) => void;
  options: ToggleGroupOption[];
  style?: React.CSSProperties;
  className?: string;
}

export interface ToggleGroupPropsMultiple {
  /** Any number of segments can be active, including zero. */
  type: 'multiple';
  value?: string[];
  onChange?: (value: string[]) => void;
  options: ToggleGroupOption[];
  style?: React.CSSProperties;
  className?: string;
}

export type ToggleGroupProps = ToggleGroupPropsSingle | ToggleGroupPropsMultiple;

function Segment({ option, selected, first, onSelect }: {
  option: ToggleGroupOption; selected: boolean; first: boolean; onSelect: () => void;
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
 * Prima toggle group — a joined segmented control (identical visual language to
 * ButtonGroup) for on/off toggling: `type="single"` (default) behaves radio-like
 * with exactly one active segment, `type="multiple"` behaves checkbox-like with
 * any number of segments toggled independently.
 */
export function ToggleGroup(props: ToggleGroupProps) {
  const { options, style, className } = props;

  const isSelected = (v: string) =>
    props.type === 'multiple' ? (props.value ?? []).includes(v) : props.value === v;

  const handleSelect = (v: string) => {
    if (props.type === 'multiple') {
      const current = props.value ?? [];
      const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
      props.onChange && props.onChange(next);
    } else {
      props.onChange && props.onChange(v);
    }
  };

  return (
    <div
      role="group"
      className={className}
      style={{
        display: 'inline-flex', overflow: 'hidden',
        border: 'var(--border-width-emphasis) solid var(--border-strong)',
        borderRadius: 'var(--radius-sm)', ...style,
      }}
    >
      {options.map((o, i) => (
        <Segment
          key={o.value} option={o} first={i === 0} selected={isSelected(o.value)}
          onSelect={() => handleSelect(o.value)}
        />
      ))}
    </div>
  );
}
