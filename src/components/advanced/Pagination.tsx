import React from 'react';

export interface PaginationProps {
  /** Current page, 1-indexed */
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Numbered pages shown on each side of the current one. Default 1. */
  siblingCount?: number;
  style?: React.CSSProperties;
  className?: string;
}

const ELLIPSIS = '…';

function pageRange(page: number, totalPages: number, siblingCount: number): (number | typeof ELLIPSIS)[] {
  const totalSlots = siblingCount * 2 + 5; // first, last, current, 2 ellipses
  if (totalPages <= totalSlots) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, totalPages - 1);
  const pages: (number | typeof ELLIPSIS)[] = [1];
  if (left > 2) pages.push(ELLIPSIS);
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < totalPages - 1) pages.push(ELLIPSIS);
  pages.push(totalPages);
  return pages;
}

function PageButton({ active, disabled, onClick, children, label }: {
  active?: boolean; disabled?: boolean; onClick?: () => void; children: React.ReactNode; label: string;
}) {
  const [hover, setHover] = React.useState(false);
  const lit = (hover && !disabled) || active;
  return (
    <button
      type="button" aria-label={label} aria-current={active ? 'page' : undefined} disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 36, height: 36, padding: '0 10px',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)',
        background: active ? 'var(--primary)' : 'transparent',
        color: disabled ? 'var(--border)' : active ? 'var(--on-primary)' : lit ? 'var(--primary)' : 'var(--on-surface)',
        border: `var(--border-width) solid ${active ? 'var(--primary)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'color var(--duration-fast) var(--ease-spatial), background var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >{children}</button>
  );
}

/**
 * Prima pagination — mono numbered page buttons with prev/next arrows and an
 * ellipsis for large ranges. Controlled: `page`/`onChange`.
 */
export function Pagination({ page, totalPages, onChange, siblingCount = 1, style, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = pageRange(page, totalPages, siblingCount);
  return (
    <nav aria-label="Pagination" className={className} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', ...style }}>
      <PageButton label="Previous page" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <i className="ph ph-caret-left" aria-hidden="true" style={{ fontSize: 14 }} />
      </PageButton>
      {pages.map((p, i) => p === ELLIPSIS ? (
        <span key={`e${i}`} aria-hidden="true" style={{
          minWidth: 36, textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)',
        }}>{ELLIPSIS}</span>
      ) : (
        <PageButton key={p} label={`Page ${p}`} active={p === page} onClick={() => onChange(p)}>{p}</PageButton>
      ))}
      <PageButton label="Next page" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        <i className="ph ph-caret-right" aria-hidden="true" style={{ fontSize: 14 }} />
      </PageButton>
    </nav>
  );
}
