import React from 'react';

export interface PropMeta {
  name: string;
  type: string;
  default?: string;
  description: string;
}

const cell: React.CSSProperties = {
  padding: 'var(--space-3) var(--space-4)',
  borderBottom: 'var(--border-width) solid var(--border)',
  textAlign: 'left', verticalAlign: 'top',
};

/** Prima props table — mono prop names, cobalt types, body descriptions. */
export function PropsTable({ props }: { props: PropMeta[] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
        <thead>
          <tr>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th key={h} style={{
                ...cell, borderBottom: 'var(--border-width-emphasis) solid var(--border-strong)',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
              } as React.CSSProperties}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td style={{ ...cell, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', fontWeight: 500, color: 'var(--on-surface)', whiteSpace: 'nowrap' }}>{p.name}</td>
              <td style={{ ...cell, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', color: 'var(--primary)' }}>{p.type}</td>
              <td style={{ ...cell, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{p.default ?? '—'}</td>
              <td style={{ ...cell, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', minWidth: 220 }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
