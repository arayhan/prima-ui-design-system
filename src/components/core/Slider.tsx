import React from 'react';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  /** Default 0 */
  min?: number;
  /** Default 100 */
  max?: number;
  /** Default 1 */
  step?: number;
  label?: string;
  /** Show the current value next to the label. Default true. */
  showValue?: boolean;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima slider — a native range input drives drag/keyboard/click interaction;
 * a decorative track + fill + thumb underneath renders the visual state.
 */
export function Slider({
  value, onChange, min = 0, max = 100, step = 1, label, showValue = true,
  disabled, id, style, className,
}: SliderProps) {
  const [active, setActive] = React.useState(false);
  const clamped = Math.max(min, Math.min(max, value));
  const percent = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          {label && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
            } as React.CSSProperties}>{label}</span>
          )}
          {showValue && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
            } as React.CSSProperties}>{clamped}</span>
          )}
        </div>
      )}
      <div style={{
        position: 'relative', height: 18, display: 'flex', alignItems: 'center',
        opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'default',
      }}>
        <div style={{
          position: 'relative', width: '100%', height: 6,
          background: 'var(--background)', borderRadius: 'var(--radius-full)',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%', width: `${percent}%`,
            background: 'var(--primary)', borderRadius: 'var(--radius-full)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: `${percent}%`, transform: 'translate(-50%, -50%)',
            width: 18, height: 18, borderRadius: 'var(--radius-full)', background: 'var(--surface)',
            border: 'var(--border-width-emphasis) solid var(--primary)',
            boxShadow: active ? 'var(--shadow-floating)' : 'none',
            cursor: disabled ? 'not-allowed' : 'grab',
            transition: 'box-shadow var(--duration-fast) var(--ease-spatial)',
          }} />
        </div>
        <input
          type="range"
          id={id}
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={clamped}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          onPointerDown={() => setActive(true)}
          onPointerUp={() => setActive(false)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            margin: 0, opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
      </div>
    </div>
  );
}
