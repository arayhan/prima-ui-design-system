import React from 'react';
import { Button } from '../core/Button';
import type { ButtonProps } from '../core/Button';

export interface MagneticButtonProps extends ButtonProps {
  /** Maximum pull toward the pointer in px. Default 8. */
  strength?: number;
  className?: string;
}

/**
 * Prima magnetic button — the Button eases toward the pointer (≤ strength px)
 * and springs back on leave. Pointer-fine devices only; inert under reduced
 * motion. Pure CSS transitions — no animation library.
 */
export function MagneticButton({ strength = 8, style, className, ...rest }: MagneticButtonProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [snapping, setSnapping] = React.useState(false);
  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setSnapping(false);
    setOffset({
      x: Math.max(-1, Math.min(1, dx)) * strength,
      y: Math.max(-1, Math.min(1, dy)) * strength,
    });
  };

  const onLeave = () => {
    setSnapping(true);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <span
      ref={ref}
      className={className}
      onPointerMove={onMove} onPointerLeave={onLeave}
      style={{
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: snapping ? 'transform var(--duration-base) var(--ease-spatial)' : 'transform 80ms linear',
        willChange: 'transform',
      }}
    >
      <Button style={style} {...rest} />
    </span>
  );
}
