import React from 'react';

export interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  /** Label and/or icon content */
  children?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima toggle — a single pressable button that stays "on" once pressed, like a
 * toolbar bold/italic toggle. Distinct from Switch (a settings on/off pill).
 */
export function Toggle({ pressed, onPressedChange, children, disabled, style, className }: ToggleProps) {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      className={className}
      onClick={() => !disabled && onPressedChange(!pressed)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
        height: 40, padding: '0 16px', borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        background: pressed ? 'var(--primary)' : hover ? 'var(--background)' : 'transparent',
        color: pressed ? 'var(--on-primary)' : 'var(--on-surface)',
        border: pressed ? 'var(--border-width-emphasis) solid transparent' : 'var(--border-width) solid var(--border)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </button>
  );
}
