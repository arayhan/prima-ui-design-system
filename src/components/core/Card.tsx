import React from 'react';

export interface CardProps {
  /** Enables hover lift (border-strong + translateY when interactive) */
  interactive?: boolean;
  /** Renders as <a> */
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function Card({ interactive = false, href, children, style, onClick, ...rest }: CardProps) {
  const [hover, setHover] = React.useState(false);
  const lifted = interactive && hover;
  const s = {
    display: 'block',
    background: 'color-mix(in srgb, var(--surface-card) 72%, transparent)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid ' + (lifted ? 'var(--border-strong)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
    transform: lifted ? 'perspective(900px) rotateX(1.5deg) translateY(-3px) scale(1.01)' : 'none',
    transition: 'all var(--duration-base) var(--ease-out)',
    color: 'inherit', textDecoration: 'none',
    cursor: interactive ? 'pointer' : 'default', ...style,
  };
  const Tag: any = href ? 'a' : 'div';
  return (
    <Tag href={href} onClick={onClick} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {children}
    </Tag>
  );
}
