import React from 'react';
import { Button } from '../core/Button';

export interface MegaMenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
  /** Optional one-line description shown under the label */
  description?: string;
}

export interface MegaMenuColumn {
  /** Mono uppercase column heading — e.g. "PRODUCTS" */
  title?: string;
  links: MegaMenuLink[];
}

export interface MegaMenuItem {
  label: string;
  /** Simple link — ignored if `columns` is present */
  href?: string;
  onClick?: () => void;
  /** If present, this item opens a full-width panel of these columns instead of navigating */
  columns?: MegaMenuColumn[];
}

export interface MegaMenuAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface MegaMenuProps {
  logo?: string;
  logoHref?: string;
  items: MegaMenuItem[];
  action?: MegaMenuAction;
  style?: React.CSSProperties;
  className?: string;
}

const RESPONSIVE_CSS = `
.prima-megamenu-toggle { display: none; }
@media (max-width: 767px) {
  .prima-megamenu-toggle { display: inline-flex !important; }
  .prima-megamenu-links { display: none; width: 100%; flex-direction: column !important; align-items: flex-start !important; }
  .prima-megamenu-links--open { display: flex !important; }
  .prima-megamenu-item { width: 100% !important; }
  .prima-megamenu-panel { position: static !important; box-shadow: none !important; border: none !important; padding: var(--space-4) 0 var(--space-4) var(--space-4) !important; }
}
`;

function PanelLink({ link, onNavigate }: { link: MegaMenuLink; onNavigate: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={link.href}
      onClick={() => { link.onClick?.(); onNavigate(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 2, textDecoration: 'none',
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
        color: hover ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      {link.label}
      {link.description && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>{link.description}</span>
      )}
    </a>
  );
}

function TopLink({ item, onNavigate }: { item: MegaMenuItem; onNavigate: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={item.href}
      onClick={() => { item.onClick?.(); onNavigate(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none',
        color: hover ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >{item.label}</a>
  );
}

function ColumnsTrigger({ item, open, onToggle, onHoverOpen }: {
  item: MegaMenuItem; open: boolean; onToggle: () => void; onHoverOpen: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button" aria-haspopup="true" aria-expanded={open}
      onClick={onToggle}
      onMouseEnter={() => { setHover(true); onHoverOpen(); }} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: open || hover ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >
      {item.label}
      <i className="ph ph-caret-down" aria-hidden="true" style={{
        fontSize: 12, transform: open ? 'rotate(180deg)' : 'none',
        transition: 'transform var(--duration-fast) var(--ease-spatial)',
      }} />
    </button>
  );
}

/**
 * Prima mega menu — a nav bar where top-level items with `columns` open a
 * full-width panel of link groups instead of navigating directly. Pairs with
 * Footer to bookend a page. Collapses behind a hamburger below 768px.
 */
export function MegaMenu({ logo = 'PRIMA UI', logoHref, items, action, style, className }: MegaMenuProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLElement>(null);
  const hoverTimer = React.useRef<number>();

  const close = () => setOpenIndex(null);

  React.useEffect(() => {
    if (openIndex === null) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [openIndex]);

  React.useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const onHoverOpen = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    if (openIndex !== null) {
      setOpenIndex(i);
    } else {
      hoverTimer.current = window.setTimeout(() => setOpenIndex(i), 150);
    }
  };

  return (
    <nav
      ref={rootRef} className={className}
      style={{
        position: 'relative', background: 'var(--surface)',
        borderBottom: 'var(--border-width-rule) solid var(--border-strong)', ...style,
      }}
    >
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-5)', padding: 'var(--space-5) 0',
      }}>
        <a href={logoHref} style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
          color: 'var(--on-surface)', textDecoration: 'none',
        } as React.CSSProperties}>{logo}</a>

        <button
          type="button" className="prima-megamenu-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            alignItems: 'center', justifyContent: 'center', width: 36, height: 36,
            background: 'none', border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
            color: 'var(--on-surface)', cursor: 'pointer',
          }}
        >
          <i className={mobileOpen ? 'ph ph-x' : 'ph ph-list'} aria-hidden="true" style={{ fontSize: 18 }} />
        </button>

        <div className={`prima-megamenu-links${mobileOpen ? ' prima-megamenu-links--open' : ''}`} style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap',
        }}>
          {items.map((item, i) => (
            <div key={item.label} className="prima-megamenu-item" style={{ position: 'relative' }}>
              {item.columns ? (
                <>
                  <ColumnsTrigger
                    item={item} open={openIndex === i}
                    onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                    onHoverOpen={() => onHoverOpen(i)}
                  />
                  {/* Mobile inline disclosure — indented list under the trigger, no floating panel */}
                  {mobileOpen && openIndex === i && (
                    <div className="prima-megamenu-panel" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingTop: 'var(--space-3)' }}>
                      {item.columns.flatMap((col) => col.links).map((link) => (
                        <PanelLink key={link.label} link={link} onNavigate={() => setMobileOpen(false)} />
                      ))}
                    </div>
                  )}
                  {openIndex === i && !mobileOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + var(--space-5))', left: 0, right: 0, zIndex: 40,
                      background: 'var(--surface)',
                      borderTop: 'var(--border-width) solid var(--border)',
                      borderBottom: 'var(--border-width) solid var(--border)',
                      boxShadow: 'var(--shadow-floating)',
                    } as React.CSSProperties}>
                      <div style={{
                        maxWidth: 'var(--container-max)', margin: '0 auto',
                        padding: 'var(--space-7) var(--container-pad)',
                        display: 'grid', gap: 'var(--space-7)',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      }}>
                        {item.columns.map((col, ci) => (
                          <div key={col.title ?? ci} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {col.title && (
                              <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
                              } as React.CSSProperties}>// {col.title}</span>
                            )}
                            {col.links.map((link) => <PanelLink key={link.label} link={link} onNavigate={close} />)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <TopLink item={item} onNavigate={() => setMobileOpen(false)} />
              )}
            </div>
          ))}
          {action && (
            <Button href={action.href} onClick={() => { action.onClick?.(); setMobileOpen(false); }}>
              {action.label}
            </Button>
          )}
        </div>
      </div>
      <style>{RESPONSIVE_CSS}</style>
    </nav>
  );
}
