import React from 'react';
import { Pagination } from './Pagination';

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
  /** Render a global search field above the table */
  searchable?: boolean;
  /** Render a per-column filter input row under the header */
  filterable?: boolean;
  /** Paginate rows at this many per page */
  pageSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

type Sort = { key: string; dir: 1 | -1 } | null;

function compare(a: React.ReactNode, b: React.ReactNode): number {
  const na = Number(a); const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return String(a ?? '').localeCompare(String(b ?? ''));
}

function matches(value: React.ReactNode, query: string): boolean {
  return String(value ?? '').toLowerCase().includes(query.toLowerCase());
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

const filterInputStyle: React.CSSProperties = {
  width: '100%', height: 32, padding: '4px 8px', fontSize: 14,
  fontFamily: 'var(--font-body)', color: 'var(--on-surface)',
  background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
  borderRadius: 'var(--radius-sm)', outline: 'none',
};

/**
 * Prima data table — mono uppercase headers over a 2px ink rule, hairline row
 * separators, ice hover. Columns opt into sorting with `sortable`. Opt into a
 * global search (`searchable`), per-column filters (`filterable`), and
 * pagination (`pageSize`) — all backward compatible; omit them and the table
 * renders exactly as before.
 */
export function DataTable({ columns, rows, caption, searchable, filterable, pageSize, style, className }: DataTableProps) {
  const [sort, setSort] = React.useState<Sort>(null);
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [page, setPage] = React.useState(1);

  React.useEffect(() => { setPage(1); }, [search, filters]);

  const toggleSort = (key: string) => {
    setSort((prev) => (prev?.key === key ? (prev.dir === 1 ? { key, dir: -1 } : null) : { key, dir: 1 }));
  };

  const processed = React.useMemo(() => {
    let result = rows;

    if (filterable) {
      const activeFilters = Object.entries(filters).filter(([, v]) => v.trim());
      if (activeFilters.length) {
        result = result.filter((row) => activeFilters.every(([key, q]) => matches(row[key], q)));
      }
    }

    if (searchable && search.trim()) {
      result = result.filter((row) => columns.some((c) => matches(row[c.key], search)));
    }

    if (sort) {
      result = [...result].sort((a, b) => compare(a[sort.key], b[sort.key]) * sort.dir);
    }

    return result;
  }, [rows, filters, filterable, search, searchable, sort, columns]);

  const totalPages = pageSize ? Math.max(1, Math.ceil(processed.length / pageSize)) : 1;
  const visible = pageSize ? processed.slice((page - 1) * pageSize, page * pageSize) : processed;

  return (
    <div className={className} style={{ overflowX: 'auto', ...style }}>
      {caption && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          marginBottom: 'var(--space-3)',
        } as React.CSSProperties}>// {caption}</div>
      )}
      {searchable && (
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
          style={{
            width: '100%', maxWidth: 320, height: 44, padding: '0 14px', marginBottom: 'var(--space-4)',
            fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--on-surface)',
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-sm)', outline: 'none',
          }}
          onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-ring)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        />
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
          {filterable && (
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={{ padding: '0 var(--space-4) var(--space-3)', borderBottom: 'var(--border-width) solid var(--border)' }}>
                  <input
                    type="text" placeholder="Filter…"
                    value={filters[c.key] ?? ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, [c.key]: e.target.value }))}
                    style={filterInputStyle}
                  />
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {visible.map((row, i) => <BodyRow key={i} row={row} columns={columns} />)}
        </tbody>
      </table>
      {pageSize && (
        <div style={{ paddingTop: 'var(--space-5)' }}>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
