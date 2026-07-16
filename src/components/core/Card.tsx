import React from 'react';

export interface CardProps {
  /** Enables the hover response (ice-tone background + arrow nudge) */
  interactive?: boolean;
  /** Renders as <a> */
  href?: string;
  onClick?: () => void;
  /** Show a cobalt arrow that nudges right on hover (interactive cards) */
  arrow?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
}

/**
 * Prima card. White surface, 1.5px hairline border, radius md. Flat — no shadow, no lift.
 * Interactive cards shift to the ice background tone and nudge a cobalt arrow on hover.
 */
export function Card({ interactive = false, href, onClick, arrow = false, children, style, className, ...rest }: CardProps) {
  const [hover, setHover] = React.useState(false);
  const active = interactive && hover;

  const s: React.CSSProperties = {
    display: 'block', position: 'relative',
    background: active ? 'var(--background)' : 'var(--surface)',
    border: 'var(--border-width) solid var(--border)',
    borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
    color: 'var(--on-surface)', textDecoration: 'none',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'background var(--duration-base) var(--ease-spatial)',
    ...style,
  };
  const Tag: any = href ? 'a' : 'div';
  return (
    <Tag
      href={href} onClick={onClick} style={s} className={className}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}
    >
      {children}
      {arrow && interactive && (
        <span aria-hidden="true" style={{
          display: 'inline-block', marginTop: 'var(--space-4)',
          fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: 'var(--text-h3)', lineHeight: 1,
          transform: active ? 'translateX(6px)' : 'translateX(0)',
          transition: 'transform var(--duration-base) var(--ease-spatial)',
        }}>→</span>
      )}
    </Tag>
  );
}
