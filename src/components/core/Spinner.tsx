import React from 'react';

export type SpinnerVariant = 'ring' | 'dots' | 'bars' | 'pulse' | 'orbit';

export interface SpinnerProps {
  /** Visual style. Default 'ring'. */
  variant?: SpinnerVariant;
  /** Size in px. Default 24. */
  size?: number;
  /** Accessible label. Default "Loading". */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

const KEYFRAMES = `
@keyframes prima-spin-ring { to { transform: rotate(360deg); } }
@keyframes prima-spin-dot { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
@keyframes prima-spin-bar { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
@keyframes prima-spin-pulse { 0% { transform: scale(0.7); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
@keyframes prima-spin-orbit { to { transform: rotate(360deg); } }
`;

function Ring({ size }: { size: number }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: 'var(--radius-full)',
      border: `${Math.max(2, size / 10)}px solid var(--border)`,
      borderTopColor: 'var(--primary)',
      animation: 'prima-spin-ring 700ms linear infinite',
    }} />
  );
}

function Dots({ size }: { size: number }) {
  const dot = Math.max(3, size / 4);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: dot / 2, height: size }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: dot, height: dot, borderRadius: 'var(--radius-full)', background: 'var(--primary)',
          animation: 'prima-spin-dot 1000ms ease-in-out infinite', animationDelay: `${i * 130}ms`,
        }} />
      ))}
    </span>
  );
}

function Bars({ size }: { size: number }) {
  const barW = Math.max(2, size / 6);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: barW / 2, height: size }}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} style={{
          width: barW, height: size, borderRadius: barW / 2, background: 'var(--primary)',
          animation: 'prima-spin-bar 900ms ease-in-out infinite', animationDelay: `${i * 100}ms`,
        }} />
      ))}
    </span>
  );
}

function Pulse({ size }: { size: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 'var(--radius-full)', background: 'var(--primary)',
        animation: 'prima-spin-pulse 1200ms ease-out infinite',
      }} />
      <span style={{
        position: 'absolute', inset: size * 0.28, borderRadius: 'var(--radius-full)', background: 'var(--primary)',
      }} />
    </span>
  );
}

function Orbit({ size }: { size: number }) {
  const dot = Math.max(3, size / 5);
  return (
    <span style={{
      position: 'relative', display: 'inline-block', width: size, height: size,
      animation: 'prima-spin-orbit 900ms linear infinite',
    }}>
      <span style={{
        position: 'absolute', top: 0, left: '50%', width: dot, height: dot, marginLeft: -dot / 2,
        borderRadius: 'var(--radius-full)', background: 'var(--primary)',
      }} />
      <span style={{
        position: 'absolute', inset: dot / 2, borderRadius: 'var(--radius-full)',
        border: '1.5px solid var(--border)',
      }} />
    </span>
  );
}

const VARIANTS: Record<SpinnerVariant, React.ComponentType<{ size: number }>> = {
  ring: Ring, dots: Dots, bars: Bars, pulse: Pulse, orbit: Orbit,
};

/**
 * Prima spinner — five cobalt loading indicators (ring, dots, bars, pulse,
 * orbit) in one component. Keeps animating regardless of reduced motion,
 * same as ScrollProgress — it's a live status indicator, not decoration.
 */
export function Spinner({ variant = 'ring', size = 24, label = 'Loading', style, className }: SpinnerProps) {
  const Variant = VARIANTS[variant];
  return (
    <span role="status" aria-label={label} className={className} style={{ display: 'inline-flex', ...style }}>
      <Variant size={size} />
      <style>{KEYFRAMES}</style>
    </span>
  );
}
