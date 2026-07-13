import React from 'react';

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Optional leading icon node (~16px) */
  icon?: React.ReactNode;
  /** Renders an <a> instead of <button> */
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Button({ variant = 'primary', size = 'md', icon, children, href, disabled, onClick, style, ...rest }: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { padding: '6px 14px', fontSize: 'var(--text-sm)', height: 34 },
    md: { padding: '10px 20px', fontSize: 'var(--text-sm)', height: 42 },
    lg: { padding: '12px 26px', fontSize: 'var(--text-base)', height: 50 },
  };
  const variants = {
    primary: {
      background: hover ? 'var(--interactive-primary-hover)' : 'var(--interactive-primary)',
      color: 'var(--text-on-primary)',
      border: '1px solid transparent',
    },
    secondary: {
      background: hover ? 'var(--bg-muted)' : 'var(--surface-card)',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: hover ? 'var(--bg-muted)' : 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid transparent',
    },
  };

  const shine = variant === 'primary'
    ? 'color-mix(in srgb, var(--text-on-primary) 30%, transparent)'
    : 'color-mix(in srgb, var(--text-heading) 14%, transparent)';

  const s = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    position: 'relative', overflow: 'hidden',
    fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)',
    borderRadius: 'var(--radius-full)', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1, textDecoration: 'none', whiteSpace: 'nowrap',
    transition: 'all var(--duration-fast) var(--ease-out)',
    transform: active && !disabled ? 'scale(0.97)' : hover && !disabled ? 'perspective(600px) rotateX(-5deg) translateY(-2px)' : 'none',
    boxShadow: hover && !disabled ? 'var(--shadow-md)' : 'none',
    ...sizes[size], ...variants[variant], ...style,
  };

  const Tag: any = href ? 'a' : 'button';
  return (
    <Tag
      href={href} disabled={disabled} onClick={onClick} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}
      {...rest}
    >
      <span aria-hidden="true" style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '55%', pointerEvents: 'none',
        background: `linear-gradient(105deg, transparent, ${shine}, transparent)`,
        transform: hover && !disabled ? 'translateX(260%)' : 'translateX(-140%)',
        transition: hover && !disabled ? 'transform 650ms var(--ease-out)' : 'none',
      }}></span>
      {icon}{children}
    </Tag>
  );
}
