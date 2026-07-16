import React from 'react';

export interface MenuBarItem {
  label: string;
  /** Phosphor regular icon class — e.g. "ph ph-pencil-simple" */
  icon?: string;
  onSelect?: () => void;
  /** Renders in the error color (destructive actions) */
  danger?: boolean;
}

export interface MenuBarMenu {
  /** Top-level trigger label — e.g. "File", "Edit" */
  label: string;
  items: MenuBarItem[];
}

export interface MenuBarProps {
  menus: MenuBarMenu[];
  style?: React.CSSProperties;
  className?: string;
}

function Item({ item, onClose, itemRef }: {
  item: MenuBarItem; onClose: () => void; itemRef: (el: HTMLButtonElement | null) => void;
}) {
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

function Trigger({ menu, index, open, onToggle, onHoverSwitch, triggerRef }: {
  menu: MenuBarMenu; index: number; open: boolean; onToggle: () => void; onHoverSwitch: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      ref={triggerRef}
      role="menuitem" aria-haspopup="menu" aria-expanded={open}
      onClick={onToggle}
      onMouseEnter={() => { setHover(true); onHoverSwitch(); }} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
        padding: '8px 14px', border: 'none', cursor: 'pointer',
        background: open || hover ? 'var(--background)' : 'transparent',
        color: 'var(--on-surface)', borderRadius: 'var(--radius-sm)',
        transition: 'background var(--duration-fast) var(--ease-spatial)',
      }}
    >{menu.label}</button>
  );
}

/**
 * Prima menu bar — a row of top-level triggers, each opening a dropdown of
 * items. Only one menu open at a time; once one is open, hovering a sibling
 * trigger switches to it. Arrow keys move between triggers and, within an
 * open menu, between items. Escape and outside click close.
 */
export function MenuBar({ menus, style, className }: MenuBarProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const close = () => setOpenIndex(null);

  React.useEffect(() => {
    if (openIndex === null) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const i = openIndex;
        close();
        triggerRefs.current[i]?.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const els = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
        if (!els.length) return;
        const idx = els.indexOf(document.activeElement as HTMLButtonElement);
        const next = e.key === 'ArrowDown'
          ? els[(idx + 1) % els.length]
          : els[(idx - 1 + els.length) % els.length];
        next?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = e.key === 'ArrowRight'
          ? (openIndex + 1) % menus.length
          : (openIndex - 1 + menus.length) % menus.length;
        setOpenIndex(next);
        triggerRefs.current[next]?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [openIndex, menus.length]);

  const onTriggerKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && openIndex === null) {
      e.preventDefault();
      setOpenIndex(index);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = e.key === 'ArrowRight' ? (index + 1) % menus.length : (index - 1 + menus.length) % menus.length;
      triggerRefs.current[next]?.focus();
      if (openIndex !== null) setOpenIndex(next);
    }
  };

  return (
    <div
      ref={rootRef} role="menubar" className={className}
      style={{
        display: 'flex', gap: 'var(--space-1)', width: 'fit-content',
        background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: 'var(--space-1)', ...style,
      }}
    >
      {menus.map((menu, i) => (
        <div key={menu.label} style={{ position: 'relative' }} onKeyDown={(e) => onTriggerKeyDown(i, e)}>
          <Trigger
            menu={menu} index={i} open={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            onHoverSwitch={() => { if (openIndex !== null && openIndex !== i) setOpenIndex(i); }}
            triggerRef={(el) => { triggerRefs.current[i] = el; }}
          />
          {openIndex === i && (
            <div role="menu" style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 40,
              minWidth: 200, padding: 'var(--space-2)',
              background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
              borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)',
            }}>
              {menu.items.map((item, j) => (
                <Item
                  key={item.label} item={item} onClose={close}
                  itemRef={(el) => { itemRefs.current[j] = el; }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
