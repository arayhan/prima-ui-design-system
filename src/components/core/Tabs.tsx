import React from 'react';

export interface TabItem {
  value: string;
  label: string;
  /** Phosphor icon class */
  icon?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab value */
  value?: string;
  /** Uncontrolled initial tab value — defaults to the first item */
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

/** Prima tabs — mono-caps tab list with a 2px cobalt underline indicator, and a single rendered panel below. */
export function Tabs({ items, value, defaultValue, onChange, style, className }: TabsProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;

  const setActive = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };

  const enabled = items.filter((i) => !i.disabled);

  const focusAndActivate = (v: string) => {
    setActive(v);
    // Move DOM focus to the newly-active tab button.
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLButtonElement>(`[data-tab-value="${CSS.escape(v)}"]`);
      el?.focus();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, current: TabItem) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    if (enabled.length === 0) return;

    if (e.key === 'Home') {
      focusAndActivate(enabled[0].value);
      return;
    }
    if (e.key === 'End') {
      focusAndActivate(enabled[enabled.length - 1].value);
      return;
    }

    const currentEnabledIndex = enabled.findIndex((i) => i.value === current.value);
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const baseIndex = currentEnabledIndex === -1 ? 0 : currentEnabledIndex;
    const nextIndex = (baseIndex + dir + enabled.length) % enabled.length;
    focusAndActivate(enabled[nextIndex].value);
  };

  const activeItem = items.find((i) => i.value === active) ?? items[0];

  return (
    <div className={className} style={style}>
      <div role="tablist" style={{
        display: 'flex', gap: 'var(--space-1)',
        borderBottom: 'var(--border-width-emphasis) solid var(--border-strong)',
      }}>
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              data-tab-value={item.value}
              tabIndex={selected ? 0 : -1}
              onClick={() => !item.disabled && setActive(item.value)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '12px 16px', marginBottom: -2,
                background: 'none', border: 'none',
                borderBottom: selected ? '2px solid var(--primary)' : '2px solid transparent',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
                color: item.disabled ? 'var(--text-secondary)' : selected ? 'var(--primary)' : 'var(--text-secondary)',
                opacity: item.disabled ? 0.4 : 1,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (!item.disabled && !selected) e.currentTarget.style.color = 'var(--on-surface)';
              }}
              onMouseLeave={(e) => {
                if (!item.disabled && !selected) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {item.icon && <i className={item.icon} aria-hidden="true" style={{ fontSize: 16 }} />}
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div role="tabpanel" style={{ paddingTop: 'var(--space-5)' }}>
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
