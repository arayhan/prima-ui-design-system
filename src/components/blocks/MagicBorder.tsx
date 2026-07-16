import React from 'react';

export interface MagicBorderProps {
  children: React.ReactNode;
  /** Ring thickness in px. Default 2. */
  thickness?: number;
  /** Seconds per revolution. Default 3.5. */
  speed?: number;
  /** Corner radius; inherits the card scale by default. */
  radius?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima magic border — a cobalt conic-gradient ring that continuously
 * rotates behind a clipped surface. Pure CSS keyframes, no dependency.
 * The ring freezes under reduced motion (static accent, not decoration-in-motion).
 */
export function MagicBorder({ children, thickness = 2, speed = 3.5, radius = 'var(--radius-md)', style, className }: MagicBorderProps) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div className={className} style={{
      position: 'relative', borderRadius: radius, padding: thickness,
      overflow: 'hidden', isolation: 'isolate', ...style,
    }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '-150%',
          background: 'conic-gradient(from 0deg, transparent 0%, var(--primary) 12%, transparent 28%)',
          animation: reduced ? 'none' : `prima-magic-spin ${speed}s linear infinite`,
        }}
      />
      <div style={{
        position: 'relative', height: '100%',
        background: 'var(--surface)', borderRadius: `calc(${radius} - ${thickness}px)`,
      }}>
        {children}
      </div>
      <style>{'@keyframes prima-magic-spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}
