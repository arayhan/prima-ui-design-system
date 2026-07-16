import React from 'react';

/* Prima charts — cobalt data on hairline grids, mono axis labels. SVG only,
   zero dependencies. One data color (the accent); semantic colors stay
   functional elsewhere. */

const mono: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em',
  fill: 'var(--text-secondary)',
};

function scalePoints(data: number[], w: number, h: number, pad: number): [number, number][] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = (w - pad * 2) / Math.max(data.length - 1, 1);
  return data.map((v, i) => [pad + i * step, h - pad - ((v - min) / span) * (h - pad * 2)]);
}

export interface LineChartProps {
  data: number[];
  /** X labels, spread across the axis (first/last always shown) */
  labels?: string[];
  height?: number;
  /** Cobalt area fill under the line. Default true. */
  area?: boolean;
  /** Accessible description */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

/** Prima line chart — a 2px cobalt line over hairline gridlines, min/max mono labels. */
export function LineChart({ data, labels, height = 220, area = true, label = 'Line chart', style, className }: LineChartProps) {
  const W = 600, H = height, PAD = 28;
  const pts = scalePoints(data, W, H, PAD);
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
  const areaPath = `${path} L${pts[pts.length - 1][0]},${H - PAD} L${pts[0][0]},${H - PAD} Z`;
  const min = Math.min(...data), max = Math.max(...data);
  const gridYs = [0.25, 0.5, 0.75].map((f) => PAD + f * (H - PAD * 2));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block', ...style }}
    >
      {gridYs.map((y) => (
        <line key={y} x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="var(--border)" strokeWidth="1" />
      ))}
      <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="var(--border-strong)" strokeWidth="1.5" />
      {area && <path d={areaPath} fill="var(--primary)" opacity="0.08" />}
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        (i === 0 || i === pts.length - 1 || data[i] === max || data[i] === min) && (
          <circle key={i} cx={x} cy={y} r="3.5" fill="var(--primary)" stroke="var(--surface)" strokeWidth="1.5" />
        )
      ))}
      <text x={PAD} y={PAD - 8} style={mono}>{max}</text>
      <text x={PAD} y={H - PAD + 16} style={mono}>{min}</text>
      {labels && labels.length > 0 && (
        <>
          <text x={PAD + 24} y={H - PAD + 16} style={mono}>{labels[0]}</text>
          <text x={W - PAD} y={H - PAD + 16} style={{ ...mono, textAnchor: 'end' } as React.CSSProperties}>{labels[labels.length - 1]}</text>
        </>
      )}
    </svg>
  );
}

export interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  /** Accessible description */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}

function Bar({ x, y, w, h, value, cx }: { x: number; y: number; w: number; h: number; value: number; cx: number }) {
  const [hover, setHover] = React.useState(false);
  return (
    <g onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <rect
        x={x} y={y} width={w} height={h} rx="4"
        fill={hover ? 'var(--primary-hover)' : 'var(--primary)'}
        style={{ transition: 'fill var(--duration-fast) var(--ease-spatial)' }}
      />
      <text x={cx} y={y - 8} style={{ ...mono, textAnchor: 'middle', fill: hover ? 'var(--primary)' : 'var(--text-secondary)' } as React.CSSProperties}>
        {value}
      </text>
    </g>
  );
}

/** Prima bar chart — cobalt bars on a 1.5px ink baseline, mono value + category labels. */
export function BarChart({ data, height = 220, label = 'Bar chart', style, className }: BarChartProps) {
  const W = 600, H = height, PAD = 28;
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const slot = (W - PAD * 2) / data.length;
  const barW = Math.min(slot * 0.55, 48);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block', ...style }}
    >
      <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="var(--border-strong)" strokeWidth="1.5" />
      {data.map((d, i) => {
        const h = ((H - PAD * 2 - 16) * d.value) / max;
        const cx = PAD + i * slot + slot / 2;
        return (
          <g key={d.label}>
            <Bar x={cx - barW / 2} y={H - PAD - h} w={barW} h={h} value={d.value} cx={cx} />
            <text x={cx} y={H - PAD + 16} style={{ ...mono, textAnchor: 'middle' } as React.CSSProperties}>
              {d.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

/** Prima sparkline — a bare cobalt line with an end dot, for stat cards. */
export function Sparkline({ data, width = 120, height = 36, style, className }: SparklineProps) {
  const pts = scalePoints(data, width, height, 3);
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className={className} style={{ width, height, display: 'block', ...style }}>
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={ex} cy={ey} r="2.5" fill="var(--primary)" />
    </svg>
  );
}
