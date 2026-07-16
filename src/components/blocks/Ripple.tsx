import React from 'react';

export interface RippleProps {
  /** A single focusable/clickable element, typically a Button */
  children: React.ReactElement;
  /** Ripple fill. Default the cobalt focus-ring tint. */
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

interface Dot { id: number; x: number; y: number; size: number }

/**
 * Prima ripple — wraps a click target with an expanding, fading ripple from
 * the pointer-down point. Pure CSS keyframes; a no-op wrapper under reduced motion.
 */
export function Ripple({ children, color = 'var(--primary-ring)', style, className }: RippleProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [dots, setDots] = React.useState<Dot[]>([]);
  const idRef = React.useRef(0);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = idRef.current++;
    setDots((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size }]);
    window.setTimeout(() => setDots((prev) => prev.filter((d) => d.id !== id)), 600);
  };

  return (
    <span
      ref={ref} onPointerDown={onPointerDown}
      className={className}
      style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', borderRadius: 'inherit', ...style }}
    >
      {children}
      {dots.map((d) => (
        <span
          key={d.id} aria-hidden="true"
          style={{
            position: 'absolute', left: d.x - d.size / 2, top: d.y - d.size / 2, width: d.size, height: d.size,
            borderRadius: 'var(--radius-full)', background: color, pointerEvents: 'none',
            animation: 'prima-ripple 600ms ease-out forwards',
          }}
        />
      ))}
      <style>{'@keyframes prima-ripple { from { transform: scale(0); opacity: 0.6; } to { transform: scale(1); opacity: 0; } }'}</style>
    </span>
  );
}
