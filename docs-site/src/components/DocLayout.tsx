import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export interface DocGroup {
  /** Mono group heading — e.g. "CORE" */
  title?: string;
  items: { id: string; label: string }[];
}

function SidebarLink({ id, label, active }: { id: string; label: string; active: boolean }) {
  const [hover, setHover] = React.useState(false);
  const go = () => {
    // Plain anchors would collide with the hash router — scroll imperatively.
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <button
      onClick={go}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      aria-current={active ? 'true' : undefined}
      style={{
        display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
        background: 'none', border: 'none', padding: '5px 0 5px var(--space-4)', marginLeft: -1.5,
        borderLeft: `var(--border-width-emphasis) solid ${active ? 'var(--primary)' : 'transparent'}`,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: active ? 'var(--primary)' : hover ? 'var(--on-surface)' : 'var(--text-secondary)',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      } as React.CSSProperties}
    >{label}</button>
  );
}

/**
 * Docs layout — content column plus a sticky "on this page" sidebar on the
 * right (≥1024px). Below that, the same nav collapses into a disclosure panel
 * above the content instead of disappearing. The active item tracks scroll position.
 */
export function DocLayout({ groups, children }: { groups: DocGroup[]; children: React.ReactNode }) {
  const wide = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = React.useState(false);
  const ids = React.useMemo(() => groups.flatMap((g) => g.items.map((i) => i.id)), [groups]);
  const [active, setActive] = React.useState<string>(ids[0] ?? '');

  React.useEffect(() => {
    // Active item = the last specimen whose top has crossed the reading line
    // (~180px under the fixed nav). Plain scroll listener — deterministic, and
    // unlike IntersectionObserver it isn't tied to rendering frames.
    let timer = 0;
    const measure = () => {
      timer = 0;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!timer) timer = window.setTimeout(measure, 80);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, [ids]);

  const nav = groups.map((group, gi) => (
    <div key={group.title ?? gi} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {group.title && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          paddingBottom: 'var(--space-1)',
        } as React.CSSProperties}>// {group.title}</span>
      )}
      <div style={{ borderLeft: 'var(--border-width) solid var(--border)' }}>
        {group.items.map((item) => (
          <SidebarLink key={item.id} id={item.id} label={item.label} active={active === item.id} />
        ))}
      </div>
    </div>
  ));

  return (
    <div style={{ display: wide ? 'flex' : 'block', gap: 'var(--space-8)', alignItems: 'flex-start' }}>
      {!wide && (
        <div style={{
          marginBottom: 'var(--space-6)',
          border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
        }}>
          <button
            type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
            style={{
              display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
              padding: 'var(--space-4)', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
            } as React.CSSProperties}
          >
            On this page
            <i className={open ? 'ph ph-caret-up' : 'ph ph-caret-down'} aria-hidden="true" style={{ fontSize: 16 }} />
          </button>
          {open && (
            <div style={{
              padding: '0 var(--space-4) var(--space-4)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
            }}>{nav}</div>
          )}
        </div>
      )}
      <div style={{ flex: '1 1 0', minWidth: 0 }}>{children}</div>
      {wide && (
        <aside
          aria-label="On this page"
          style={{
            flex: 'none', width: 216, position: 'sticky', top: 96,
            maxHeight: 'calc(100vh - 128px)', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
          }}
        >
          {nav}
        </aside>
      )}
    </div>
  );
}
