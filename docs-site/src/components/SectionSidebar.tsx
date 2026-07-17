import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SectionItem { label: string; to: string }
interface SectionGroup { title: string; items: SectionItem[] }

const GROUPS: SectionGroup[] = [
  {
    title: 'COMPONENTS',
    items: [
      { label: 'Core', to: '/components/core' },
      { label: 'Forms', to: '/components/forms' },
      { label: 'Overlays', to: '/components/overlays' },
      { label: 'Display', to: '/components/display' },
    ],
  },
  {
    title: 'BLOCKS',
    items: [
      { label: 'Sections', to: '/blocks' },
      { label: 'Interactions', to: '/blocks/interactions' },
      { label: 'Playground', to: '/blocks/playground' },
    ],
  },
];

function Item({ item, active }: { item: SectionItem; active: boolean }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={item.to}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', padding: '6px 0 6px var(--space-4)', marginLeft: -1.5,
        borderLeft: `var(--border-width-emphasis) solid ${active ? 'var(--primary)' : 'transparent'}`,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none',
        color: active ? 'var(--primary)' : hover ? 'var(--on-surface)' : 'var(--text-secondary)',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >{item.label}</Link>
  );
}

/**
 * Persistent left-hand section nav — Components (Core/Forms/Overlays/Display)
 * and Blocks (Sections/Interactions/Playground). Shown in place of the mobile CategoryNav
 * tab row on wide viewports (>=1024px, matching DocLayout's own breakpoint).
 */
export function SectionSidebar() {
  const { pathname } = useLocation();
  return (
    <aside
      aria-label="Sections"
      style={{
        flex: 'none', width: 176, position: 'sticky', top: 96,
        display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
      }}
    >
      {GROUPS.map((group) => (
        <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
            paddingBottom: 'var(--space-1)',
          } as React.CSSProperties}>// {group.title}</span>
          <div style={{ borderLeft: 'var(--border-width) solid var(--border)' }}>
            {group.items.map((item) => (
              <Item key={item.to} item={item} active={pathname === item.to} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
