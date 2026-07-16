import React from 'react';

export interface DropdownItem {
  label: string;
  /** Phosphor regular icon class — e.g. "ph ph-pencil-simple" */
  icon?: string;
  onSelect?: () => void;
  /** Renders in the error color (destructive actions) */
  danger?: boolean;
}

export interface DropdownProps {
  /** Trigger label (mono uppercase, styled like a secondary Button) */
  label: string;
  items: DropdownItem[];
  /** Edge the menu aligns to. Default 'left'. */
  align?: 'left' | 'right';
  style?: React.CSSProperties;
  className?: string;
}

function MenuItem({ item, onClose, itemRef }: { item: DropdownItem; onClose: () => void; itemRef: (el: HTMLButtonElement | null) => void }) {
  const [hover, setHover] = React.useState(false);
  const color = item.danger ? 'var(--error)' : 'var(--on-surface)';
  return (
    <button
      role="menuitem" ref={itemRef}
      onClick={() => { item.onSelect?.(); onClose(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
        padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
        background: hover ? 'var(--background)' : 'transparent', border: 'none',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color,
        transition: 'background var(--duration-fast) var(--ease-spatial)',
      }}
    >
      {item.icon && <i className={item.icon} aria-hidden="true" style={{ fontSize: 16, color: item.danger ? 'var(--error)' : 'var(--primary)' }} />}
      {item.label}
    </button>
  );
}

/**
 * Prima dropdown menu — a secondary-button trigger opening a floating white panel
 * (the one sanctioned shadow). Closes on Escape, outside click, and selection;
 * ArrowUp/ArrowDown move focus through the items.
 */
export function Dropdown({ label, items, align = 'left', style, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const els = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
        const idx = els.indexOf(document.activeElement as HTMLButtonElement);
        const next = e.key === 'ArrowDown'
          ? els[(idx + 1) % els.length]
          : els[(idx - 1 + els.length) % els.length];
        next?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button
        aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
          height: 48, padding: '0 20px', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          background: open || hover ? 'var(--on-surface)' : 'transparent',
          color: open || hover ? 'var(--background)' : 'var(--on-surface)',
          border: 'var(--border-width-emphasis) solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
        } as React.CSSProperties}
      >
        {label}
        <i className="ph ph-caret-down" aria-hidden="true" style={{
          fontSize: 14,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform var(--duration-fast) var(--ease-spatial)',
        }} />
      </button>
      {open && (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 8px)', [align]: 0, zIndex: 40,
          minWidth: 220, padding: 'var(--space-2)',
          background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)',
        } as React.CSSProperties}>
          {items.map((item, i) => (
            <MenuItem key={item.label} item={item} onClose={() => setOpen(false)} itemRef={(el) => { itemRefs.current[i] = el; }} />
          ))}
        </div>
      )}
    </div>
  );
}
