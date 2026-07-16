import React from 'react';

export interface SpotlightProps {
  children: React.ReactNode;
  /** Spotlight diameter in px. Default 260. */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima spotlight — a cobalt radial glow that follows the pointer inside a
 * hairline card. Pointer-fine devices only; a no-op wrapper on touch.
 */
export function Spotlight({ children, size = 260, style, className }: SpotlightProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: size / 2, y: size / 2 });
  const [active, setActive] = React.useState(false);
  const enabled = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove} onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}
      className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', ...style,
      }}
    >
      {enabled && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: pos.x - size / 2, top: pos.y - size / 2, width: size, height: size,
            background: 'radial-gradient(circle, var(--primary-ring), transparent 70%)',
            opacity: active ? 1 : 0, transition: 'opacity var(--duration-base) var(--ease-spatial)',
            pointerEvents: 'none',
          }}
        />
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
