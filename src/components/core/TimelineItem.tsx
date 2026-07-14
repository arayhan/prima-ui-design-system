import React from 'react';
import { Chip } from './Chip';

export interface TimelineItemProps {
  /** Mono year/period column — e.g. "2023 — NOW" */
  period: string;
  title: string;
  /** Company / event, shown after the title in secondary text */
  org?: string;
  description?: string;
  /** Tech tags, rendered as chips */
  tags?: string[];
  /** Hides the 2px connector below (last row) */
  last?: boolean;
}

/**
 * Prima timeline row for color-block storytelling: a mono year column, a 2px connector
 * with a cobalt node dot, and an ALL-CAPS title with optional org, description, and chips.
 */
export function TimelineItem({ period, title, org, description, tags = [], last = false }: TimelineItemProps) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
      <div style={{
        flex: 'none', width: 88, paddingTop: 2, textAlign: 'right',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase', color: 'var(--text-secondary)',
      } as React.CSSProperties}>{period}</div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: 12 }}>
        <span style={{
          width: 12, height: 12, borderRadius: 'var(--radius-full)', marginTop: 3, flex: 'none',
          background: 'var(--primary)', border: '2px solid var(--background)', boxShadow: '0 0 0 1.5px var(--primary)',
        }} />
        {!last && <span style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />}
      </div>

      <div style={{ paddingBottom: last ? 0 : 'var(--space-7)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          lineHeight: 'var(--leading-h3)', color: 'var(--on-surface)', margin: 0,
        } as React.CSSProperties}>
          {title}{org && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400, color: 'var(--text-secondary)', textTransform: 'none' }}> · {org}</span>}
        </h3>
        {description && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
            color: 'var(--text-secondary)', margin: 'var(--space-2) 0 0', maxWidth: 560,
          }}>{description}</p>
        )}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
            {tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        )}
      </div>
    </div>
  );
}
