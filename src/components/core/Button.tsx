import React from 'react';

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary';
  /** Renders an <a> instead of <button> */
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  /** Optional trailing icon/arrow node */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
}

/**
 * Prima button. Mono uppercase label, 52px tall, radius sm.
 * primary = cobalt fill; secondary = transparent with a 2px ink border that inverts on hover.
 */
export function Button({ variant = 'primary', href, disabled, onClick, icon, children, style, className, ...rest }: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const lift = hover && !disabled;

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    height: 52, padding: '0 28px',
    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
    letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
    borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none', whiteSpace: 'nowrap', opacity: disabled ? 0.4 : 1,
    transform: lift ? 'translateY(-2px)' : 'none',
    transition:
      'transform var(--duration-base) var(--ease-spatial), background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial), box-shadow var(--duration-base) var(--ease-spatial)',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: lift ? 'var(--primary-hover)' : 'var(--primary)',
      color: 'var(--on-primary)',
      border: 'var(--border-width-emphasis) solid transparent',
      boxShadow: lift ? 'var(--primary-glow)' : 'none',
    },
    secondary: {
      background: lift ? 'var(--on-surface)' : 'transparent',
      color: lift ? 'var(--background)' : 'var(--on-surface)',
      border: 'var(--border-width-emphasis) solid var(--border-strong)',
      boxShadow: 'none',
    },
  };

  const s: React.CSSProperties = { ...base, ...variants[variant], ...style };
  const Tag: any = href ? 'a' : 'button';
  return (
    <Tag
      href={href} onClick={onClick} disabled={disabled} style={s} className={className}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}
    >
      {children}{icon}
    </Tag>
  );
}
