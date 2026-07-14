import React from 'react';
import { Card } from '../core/Card';

export interface FeatureItem {
  /** Phosphor regular icon class — e.g. "ph ph-cube" */
  icon?: string;
  title: string;
  description: string;
  /** Mono running number; defaults to the item's position ("001", "002", …) */
  index?: string;
}

export interface FeatureGridProps {
  /** Column count on wide viewports (collapses automatically when narrow) */
  columns?: 2 | 3;
  items: FeatureItem[];
  style?: React.CSSProperties;
}

/**
 * Prima feature grid — a grid of Cards, each opened by a mono running number
 * (and optional cobalt Phosphor icon), then an H3 title and body copy.
 */
export function FeatureGrid({ columns = 3, items, style }: FeatureGridProps) {
  return (
    <div style={{
      display: 'grid', gap: 'var(--space-5)',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === 2 ? 380 : 280}px), 1fr))`,
      ...style,
    }}>
      {items.map((item, i) => (
        <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
            }}>{item.index ?? String(i + 1).padStart(3, '0')}</span>
            {item.icon && (
              <i className={item.icon} aria-hidden="true" style={{ fontSize: 24, lineHeight: 1, color: 'var(--primary)' }} />
            )}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
            lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
            color: 'var(--on-surface)', margin: 0,
          } as React.CSSProperties}>{item.title}</h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400,
            lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', margin: 0,
          }}>{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
