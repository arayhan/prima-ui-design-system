import React from 'react';
import { Tag } from './Tag';

export interface TimelineItemProps {
  /** e.g. "2023 — now" */
  period: string;
  title: string;
  /** Company / event, rendered muted after the title */
  org?: string;
  description?: string;
  /** Tech tags */
  tags?: string[];
  /** Hides the connector line below (last row) */
  last?: boolean;
}

export function TimelineItem({ period, title, org, description, tags = [], last = false }: TimelineItemProps) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: 12 }}>
        <span style={{
          width: 11, height: 11, borderRadius: 99, marginTop: 5, flex: 'none',
          background: 'var(--bg-page)', border: '2.5px solid var(--text-heading)',
        }}></span>
        {!last && <span style={{ width: 1, flex: 1, background: 'var(--border-default)', marginTop: 6 }}></span>}
      </div>
      <div style={{ paddingBottom: last ? 0 : 'var(--space-6)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{period}</div>
        <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 6 }}>
          {title}{org && <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}> · {org}</span>}
        </h3>
        {description && <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-body)', maxWidth: 560 }}>{description}</p>}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}
