import React from 'react';

export interface IconButtonProps {
  /** Accessible label (required) */
  label: string;
  /** Icon node (~18px) */
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Diameter in px, default 40 */
  size?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function IconButton({ label, children, onClick, href, size = 40, style, ...rest }: IconButtonProps) {
  const [hover, setHover] = React.useState(false);
  const s = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: size, height: size, borderRadius: 'var(--radius-full)',
    background: hover ? 'var(--bg-muted)' : 'transparent',
    border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
    color: 'var(--text-heading)', cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)', ...style,
  };
  const Tag: any = href ? 'a' : 'button';
  return (
    <Tag aria-label={label} title={label} href={href} onClick={onClick} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {children}
    </Tag>
  );
}
