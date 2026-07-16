import React from 'react';
import { Sparkline } from './Chart';
import { useCountAnimationText } from '../core/_countAnimation';

export interface AnalyticsCardProps {
  /** Mono uppercase metric name — e.g. "PAGE VIEWS" */
  label: string;
  /** The headline figure — e.g. "48.2K" */
  value: string;
  /** Change since last period — e.g. "+12.4%" */
  delta?: string;
  /** Colors the delta chip. Default 'up'. */
  trend?: 'up' | 'down' | 'flat';
  /** Sparkline series */
  data?: number[];
  style?: React.CSSProperties;
  className?: string;
}

const TREND_COLOR = { up: 'var(--success)', down: 'var(--error)', flat: 'var(--text-secondary)' };

/**
 * Prima analytics card — an at-a-glance metric: mono label, Clash Display
 * value, semantic delta chip, cobalt sparkline. Compose a dashboard from a
 * grid of these plus a LineChart or BarChart.
 */
export function AnalyticsCard({ label, value, delta, trend = 'up', data, style, className }: AnalyticsCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const display = useCountAnimationText(ref as React.RefObject<Element>, value);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        padding: 'var(--space-5)', background: 'var(--surface)',
        border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)', ...style,
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
      } as React.CSSProperties}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 600,
            lineHeight: 1, letterSpacing: 'var(--tracking-heading)', color: 'var(--on-surface)',
            fontVariantNumeric: 'tabular-nums',
          } as React.CSSProperties}>{display}</span>
          {delta && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', color: TREND_COLOR[trend],
            } as React.CSSProperties}>
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {delta}
            </span>
          )}
        </div>
        {data && data.length > 1 && <Sparkline data={data} />}
      </div>
    </div>
  );
}
