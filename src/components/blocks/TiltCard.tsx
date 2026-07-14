import React from 'react';

export interface TiltCardProps {
  children: React.ReactNode;
  /** Maximum tilt in degrees. Default 8. */
  maxTilt?: number;
  style?: React.CSSProperties;
}

/**
 * Prima tilt card — a white hairline card that tilts in 3D toward the pointer
 * and settles back on leave, with a faint cobalt glow at full tilt.
 * Pointer-fine only; inert under reduced motion. Pure CSS transforms.
 */
export function TiltCard({ children, maxTilt = 8, style }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [settling, setSettling] = React.useState(false);
  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setSettling(false);
    setTilt({ rx: -py * maxTilt, ry: px * maxTilt });
  };

  const onLeave = () => {
    setSettling(true);
    setTilt({ rx: 0, ry: 0 });
  };

  const intensity = Math.min(1, (Math.abs(tilt.rx) + Math.abs(tilt.ry)) / maxTilt);

  return (
    <div style={{ perspective: 800 }}>
      <div
        ref={ref}
        onPointerMove={onMove} onPointerLeave={onLeave}
        style={{
          background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: settling
            ? 'transform var(--duration-base) var(--ease-spatial), box-shadow var(--duration-base) var(--ease-spatial)'
            : 'transform 80ms linear, box-shadow 80ms linear',
          boxShadow: intensity > 0.05 ? `0 ${8 + intensity * 12}px ${24 + intensity * 16}px rgba(27, 68, 240, ${0.06 + intensity * 0.08})` : 'none',
          transformStyle: 'preserve-3d', willChange: 'transform',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
