import React from 'react';

export interface ContextMenuItem {
  label: string;
  /** Phosphor regular icon class — e.g. "ph ph-pencil-simple" */
  icon?: string;
  onSelect?: () => void;
  /** Renders in the error color (destructive actions) */
  danger?: boolean;
}

export interface ContextMenuProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
  style?: React.CSSProperties;
  className?: string;
}

function Item({ item, onClose }: { item: ContextMenuItem; onClose: () => void }) {
  const [hover, setHover] = React.useState(false);
  const color = item.danger ? 'var(--error)' : 'var(--on-surface)';
  return (
    <button
      role="menuitem"
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
 * Prima context menu — right-click anywhere inside the wrapped content to
 * open a menu at the cursor. Closes on selection, outside click, and Escape.
 */
export function ContextMenu({ children, items, style, className }: ContextMenuProps) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const close = () => setPos(null);

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    if (!pos) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [pos]);

  const [clamped, setClamped] = React.useState<{ x: number; y: number } | null>(null);

  React.useLayoutEffect(() => {
    if (!pos) { setClamped(null); return; }
    const el = menuRef.current;
    if (!el) { setClamped(pos); return; }
    const rect = el.getBoundingClientRect();
    const x = Math.min(pos.x, window.innerWidth - rect.width - 8);
    const y = Math.min(pos.y, window.innerHeight - rect.height - 8);
    setClamped({ x: Math.max(8, x), y: Math.max(8, y) });
  }, [pos]);

  return (
    <div ref={wrapRef} className={className} style={style} onContextMenu={onContextMenu}>
      {children}
      {pos && (
        <div
          ref={menuRef} role="menu"
          style={{
            position: 'fixed', left: (clamped ?? pos).x, top: (clamped ?? pos).y, zIndex: 60,
            minWidth: 200, padding: 'var(--space-2)',
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)',
            visibility: clamped ? 'visible' : 'hidden',
          }}
        >
          {items.map((item, i) => <Item key={i} item={item} onClose={close} />)}
        </div>
      )}
    </div>
  );
}
