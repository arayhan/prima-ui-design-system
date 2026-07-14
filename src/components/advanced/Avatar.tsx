import React from 'react';

export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online: 'var(--success)',
  busy: 'var(--error)',
  away: 'var(--warning)',
  offline: 'var(--border)',
};

export interface AvatarProps {
  /** Image source; falls back to initials from `name` */
  src?: string;
  /** Full name — used for initials and alt text */
  name: string;
  /** Diameter in px. Default 44. */
  size?: number;
  status?: AvatarStatus;
  style?: React.CSSProperties;
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');
}

/**
 * Prima avatar — a full-radius circle (the one sanctioned use of radius-full)
 * with a hairline border. Falls back to mono initials on ice; an optional
 * semantic status dot sits bottom-right.
 */
export function Avatar({ src, name, size = 44, status, style }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const showImage = src && !failed;
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, flex: 'none', ...style }}>
      {showImage ? (
        <img
          src={src} alt={name} onError={() => setFailed(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            borderRadius: 'var(--radius-full)', border: 'var(--border-width) solid var(--border)',
          }}
        />
      ) : (
        <span
          role="img" aria-label={name}
          style={{
            width: '100%', height: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-full)', border: 'var(--border-width) solid var(--border)',
            background: 'var(--background)', color: 'var(--primary)',
            fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: Math.round(size * 0.34),
            letterSpacing: 'var(--tracking-label)',
          } as React.CSSProperties}
        >{initials(name)}</span>
      )}
      {status && (
        <span
          title={status}
          style={{
            position: 'absolute', right: 0, bottom: 0,
            width: Math.max(10, Math.round(size * 0.24)), height: Math.max(10, Math.round(size * 0.24)),
            borderRadius: 'var(--radius-full)', background: STATUS_COLOR[status],
            border: '2px solid var(--surface)',
          }}
        />
      )}
    </span>
  );
}
