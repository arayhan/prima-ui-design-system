import React from 'react';
import { Avatar } from './Avatar';

export interface AvatarStackItem {
  name: string;
  src?: string;
}

export interface AvatarStackProps {
  items: AvatarStackItem[];
  /** Max avatars shown before collapsing the rest into a "+N" bubble. Default 4. */
  max?: number;
  /** Diameter in px. Default 40. */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima avatar stack — an overlapping row of Avatars (e.g. "who's in this
 * meeting") with a "+N" overflow bubble once `items` exceeds `max`. Each
 * avatar gets a surface-colored ring so overlaps read as intentional layering
 * rather than muddy clipping.
 */
export function AvatarStack({ items, max = 4, size = 40, style, className }: AvatarStackProps) {
  const shown = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', ...style }}>
      {shown.map((item, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -Math.round(size * 0.3),
            position: 'relative',
            zIndex: items.length - i,
            borderRadius: 'var(--radius-full)',
            border: '2px solid var(--surface)',
          }}
        >
          <Avatar name={item.name} src={item.src} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            marginLeft: -Math.round(size * 0.3),
            position: 'relative',
            zIndex: 0,
            width: size,
            height: size,
            flex: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
            border: '2px solid var(--surface)',
            background: 'var(--background)',
            color: 'var(--primary)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: Math.round(size * 0.3),
            letterSpacing: 'var(--tracking-label)',
          } as React.CSSProperties}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
