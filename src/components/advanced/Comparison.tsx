import React from 'react';

export interface ComparisonProps {
  /** Rendered on the left/under side (revealed as the slider moves right) */
  before: React.ReactNode;
  /** Rendered on the right/top side (revealed as the slider moves left) */
  after: React.ReactNode;
  /** Slider position 0-100 (controlled) */
  value?: number;
  /** Initial position (uncontrolled). Default 50. */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Move the slider by following the pointer on hover instead of requiring drag. Default false. */
  hoverMode?: boolean;
  /** Fixed aspect ratio, e.g. 16/9. If omitted, the container just takes the height of its content/style. */
  aspectRatio?: number;
  style?: React.CSSProperties;
  className?: string;
}

function clampPct(n: number) {
  return Math.max(0, Math.min(100, n));
}

/**
 * Prima comparison slider — two full-size layers with a draggable vertical
 * divider that reveals `after` on the right and `before` on the left, like an
 * image-diff viewer. Supports drag (default) or pointer-follow (`hoverMode`),
 * plus real keyboard control on the handle (ArrowLeft/ArrowRight, ±5 with Shift).
 */
export function Comparison({
  before, after, value, defaultValue = 50, onChange, hoverMode = false, aspectRatio, style, className,
}: ComparisonProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const pct = isControlled ? (value as number) : internal;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  const setPct = React.useCallback((next: number) => {
    const clamped = clampPct(next);
    if (!isControlled) setInternal(clamped);
    onChange && onChange(clamped);
  }, [isControlled, onChange]);

  const pctFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return pct;
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const onPointerDownHandle = (e: React.PointerEvent) => {
    if (hoverMode) return;
    e.preventDefault();
    setDragging(true);
  };

  // Attach window-level listeners only while a drag is in progress, added on
  // pointerdown and removed on pointerup — same pattern as ImageCropper.tsx.
  React.useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: PointerEvent) => setPct(pctFromClientX(e.clientX));
    const handleUp = () => setDragging(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, setPct]);

  const onContainerMouseMove = (e: React.MouseEvent) => {
    if (!hoverMode) return;
    setPct(pctFromClientX(e.clientX));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 5 : 1;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPct(pct - step); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPct(pct + step); }
    else if (e.key === 'Home') { e.preventDefault(); setPct(0); }
    else if (e.key === 'End') { e.preventDefault(); setPct(100); }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={onContainerMouseMove}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)',
        userSelect: 'none', cursor: hoverMode ? 'default' : 'ew-resize',
        ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{after}</div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pct}% 0 0)` }}>{before}</div>

      {/* Divider line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, width: 2,
          background: 'var(--surface)', transform: 'translateX(-50%)',
          boxShadow: '0 0 0 1px var(--border)', pointerEvents: 'none',
        }}
      />

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation="horizontal"
        aria-label="Comparison slider position"
        onPointerDown={onPointerDownHandle}
        onKeyDown={onKeyDown}
        style={{
          position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)',
          width: 40, height: 40, borderRadius: 'var(--radius-full)', background: 'var(--surface)',
          border: 'var(--border-width-emphasis) solid var(--primary)', boxShadow: 'var(--shadow-floating)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'ew-resize', touchAction: 'none',
        }}
      >
        <i className="ph ph-arrows-left-right" aria-hidden="true" style={{ fontSize: 14, color: 'var(--primary)' }} />
      </div>
    </div>
  );
}
