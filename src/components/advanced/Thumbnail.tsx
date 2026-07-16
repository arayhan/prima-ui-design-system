import React from 'react';

export interface ThumbnailProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio. Default '4 / 3'. */
  ratio?: string;
  /** Mono caption below the frame */
  caption?: string;
  /** Running number shown right of the caption — e.g. "001" */
  index?: string;
  /** Renders as a link */
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima thumbnail — a hairline media frame (radius md) whose image eases to a
 * gentle zoom on hover, with a mono caption line underneath.
 */
export function Thumbnail({ src, alt, ratio = '4 / 3', caption, index, href, style, className }: ThumbnailProps) {
  const [hover, setHover] = React.useState(false);
  const Tag: any = href ? 'a' : 'figure';
  return (
    <Tag
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', margin: 0, textDecoration: 'none', cursor: href ? 'pointer' : 'default', ...style,
      }}
    >
      <span style={{
        display: 'block', aspectRatio: ratio, overflow: 'hidden',
        borderRadius: 'var(--radius-md)',
        border: `var(--border-width) solid ${hover && href ? 'var(--primary)' : 'var(--border)'}`,
        transition: 'border-color var(--duration-fast) var(--ease-spatial)',
      }}>
        <img
          src={src} alt={alt}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform var(--duration-reveal) var(--ease-spatial)',
          }}
        />
      </span>
      {(caption || index) && (
        <span style={{
          display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)',
          marginTop: 'var(--space-3)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        } as React.CSSProperties}>
          {caption && <span style={{ color: hover && href ? 'var(--primary)' : 'var(--on-surface)', transition: 'color var(--duration-fast) var(--ease-spatial)' }}>{caption}</span>}
          {index && <span style={{ color: 'var(--text-secondary)' }}>{index}</span>}
        </span>
      )}
    </Tag>
  );
}
