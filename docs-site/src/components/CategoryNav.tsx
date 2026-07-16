import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface CategoryNavItem {
  label: string;
  to: string;
}

function Item({ item, active }: { item: CategoryNavItem; active: boolean }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={item.to}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '8px 16px', borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none',
        background: active ? 'var(--on-surface)' : 'transparent',
        color: active ? 'var(--background)' : hover ? 'var(--on-surface)' : 'var(--text-secondary)',
        border: `var(--border-width-emphasis) solid ${active ? 'var(--border-strong)' : 'var(--border)'}`,
        transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >{item.label}</Link>
  );
}

/** Sibling-section switcher — a row of segments linking between sub-routes (e.g. Core/Forms/Overlays/Display). */
export function CategoryNav({ items }: { items: CategoryNavItem[] }) {
  const { pathname } = useLocation();
  return (
    <div style={{
      display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap',
      paddingBottom: 'var(--space-6)', borderBottom: 'var(--border-width) solid var(--border)',
    }}>
      {items.map((item) => <Item key={item.to} item={item} active={pathname === item.to} />)}
    </div>
  );
}
