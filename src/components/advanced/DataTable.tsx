import React from 'react';

export interface DataTableColumn {
  /** Row object key to read */
  key: string;
  label: string;
  align?: 'left' | 'right';
  /** Enable click-to-sort on this column */
  sortable?: boolean;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  /** Mono caption above the table — e.g. "PROJECTS — 2026" */
  caption?: string;
  style?: React.CSSProperties;
  className?: string;
}

type Sort = { key: string; dir: 1 | -1 } | null;

function compare(a: React.ReactNode, b: React.ReactNode): number {
  const na = Number(a); const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return String(a ?? '').localeCompare(String(b ?? ''));
}

function BodyRow({ row, columns }: { row: Record<string, React.ReactNode>; columns: DataTableColumn[] }) {
  const [hover, setHover] = React.useState(false);
  return (
    <tr
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? 'var(--background)' : 'transparent', transition: 'background var(--duration-fast) var(--ease-spatial)' }}
    >
      {columns.map((c) => (
        <td key={c.key} style={{
          padding: 'var(--space-3) var(--space-4)', textAlign: c.align ?? 'left',
          borderBottom: 'var(--border-width) solid var(--border)',
          fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--on-surface)',
        }}>{row[c.key]}</td>
      ))}
    </tr>
  );
}

/**
 * Prima data table — mono uppercase headers over a 2px ink rule, hairline row
 * separators, ice hover. Columns opt into sorting with `sortable`.
 */
export function DataTable({ columns, rows, caption, style, className }: DataTableProps) {
  const [sort, setSort] = React.useState<Sort>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => compare(a[sort.key], b[sort.key]) * sort.dir);
  }, [rows, sort]);

  const toggleSort = (key: string) => {
    setSort((prev) => (prev?.key === key ? (prev.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 }));
  };

  return (
    <div className={className} style={{ overflowX: 'auto', ...style }}>
      {caption && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          marginBottom: 'var(--space-3)',
        } as React.CSSProperties}>// {caption}</div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                  aria-sort={active ? (sort!.dir === 1 ? 'ascending' : 'descending') : undefined}
                  style={{
                    padding: 'var(--space-3) var(--space-4)', textAlign: c.align ?? 'left',
                    borderBottom: 'var(--border-width-emphasis) solid var(--border-strong)',
                    fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                    letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
                    color: active ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: c.sortable ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap',
                  } as React.CSSProperties}
                >
                  {c.label}
                  {c.sortable && (
                    <span aria-hidden="true" style={{ marginLeft: 6, color: active ? 'var(--primary)' : 'var(--border)' }}>
                      {active ? (sort!.dir === 1 ? '↑' : '↓') : '↕'}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => <BodyRow key={i} row={row} columns={columns} />)}
        </tbody>
      </table>
    </div>
  );
}
