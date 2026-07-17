import React from 'react';

export interface RatingProps {
  /** Current rating, e.g. 3.5 out of `max` */
  value: number;
  /** Provide to make it interactive (click to rate) */
  onChange?: (value: number) => void;
  /** Total stars. Default 5. */
  max?: number;
  /** Allow clicking half-stars. Default false. */
  allowHalf?: boolean;
  /** Star size in px. Default 22. */
  size?: number;
  /** Mono label to the left — e.g. "4.2 (128)" */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Star({ fill, size }: { fill: number; size: number }) {
  // fill: 0 (empty) to 1 (full). Rendered as a gray star with a clipped cobalt overlay.
  return (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-flex', width: size, height: size, flex: 'none' }}>
      <i className="ph ph-star" style={{ position: 'absolute', inset: 0, fontSize: size, color: 'var(--border)' }} />
      <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${fill * 100}%` }}>
        <i className="ph ph-star-fill" style={{ fontSize: size, color: 'var(--primary)' }} />
      </span>
    </span>
  );
}

/**
 * Prima rating — a row of stars, gray with a clipped cobalt fill so fractional
 * values (e.g. 3.5) render cleanly in read-only mode. Interactive when
 * `onChange` is passed: click to rate (or half-star click with `allowHalf`),
 * with a hover preview.
 */
export function Rating({ value, onChange, max = 5, allowHalf = false, size = 22, label, style, className }: RatingProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const interactive = !!onChange;
  const display = hover ?? value;

  const pick = (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
    if (!onChange) return;
    let next = index + 1;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = (e.clientX - rect.left) < rect.width / 2;
      next = index + (half ? 0.5 : 1);
    }
    onChange(next);
  };

  const previewFor = (index: number, e: React.MouseEvent<HTMLSpanElement>) => {
    if (!onChange) return;
    let next = index + 1;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = (e.clientX - rect.left) < rect.width / 2;
      next = index + (half ? 0.5 : 1);
    }
    setHover(next);
  };

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', ...style }}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? undefined : `Rated ${value} out of ${max}`}
      onMouseLeave={() => setHover(null)}
    >
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: max }, (_, i) => {
          const fill = Math.max(0, Math.min(1, display - i));
          return (
            <span
              key={i}
              onMouseMove={interactive ? (e) => previewFor(i, e) : undefined}
              onClick={interactive ? (e) => pick(i, e) : undefined}
              style={{ cursor: interactive ? 'pointer' : 'default', lineHeight: 0 }}
            >
              <Star fill={fill} size={size} />
            </span>
          );
        })}
      </div>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
        } as React.CSSProperties}>{label}</span>
      )}
    </div>
  );
}
