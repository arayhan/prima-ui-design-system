import React from 'react';

export interface ProgressProps {
  /** 0–100 */
  value: number;
  /** Mono label above the bar — e.g. "Uploading" */
  label?: string;
  /** Show the "N%" text next to the label. Default true. */
  showPercentage?: boolean;
  /** Bar height in px. Default 8. */
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

/** Prima progress — a cobalt-filled track with an optional mono label + percentage. */
export function Progress({ value, label, showPercentage = true, height = 8, style, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          {label && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
            } as React.CSSProperties}>{label}</span>
          )}
          {showPercentage && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
            } as React.CSSProperties}>{Math.round(clamped)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}
        style={{ background: 'var(--background)', borderRadius: 'var(--radius-full)', height, overflow: 'hidden' }}
      >
        <div style={{
          width: `${clamped}%`, height: '100%', background: 'var(--primary)', borderRadius: 'var(--radius-full)',
          transition: reduced ? 'none' : 'width var(--duration-base) var(--ease-spatial)',
        }} />
      </div>
    </div>
  );
}
