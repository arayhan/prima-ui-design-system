import React from 'react';
import { Button } from '../core/Button';

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarProps {
  /** Wordmark — e.g. "PRIMA UI" */
  logo?: string;
  logoHref?: string;
  links?: NavLink[];
  /** Cobalt CTA button */
  action?: NavbarAction;
  /** Sticks to the top of its scroll container. Default false. */
  sticky?: boolean;
  style?: React.CSSProperties;
}

const RESPONSIVE_CSS = `
.prima-navbar-toggle { display: none; }
@media (max-width: 767px) {
  .prima-navbar-toggle { display: inline-flex !important; }
  .prima-navbar-links { display: none; width: 100%; flex-direction: column !important; align-items: flex-start !important; }
  .prima-navbar-links--open { display: flex !important; }
}
`;

function NavAnchor({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={link.href}
      onClick={(e) => { link.onClick && link.onClick(); onNavigate(); void e; }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: hover ? 'var(--primary)' : 'var(--on-surface)', textDecoration: 'none',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >{link.label}</a>
  );
}

/**
 * Prima navbar — the page's opening rule: Clash Display wordmark, mono-caps
 * nav links, and an optional cobalt CTA. Pairs with Footer to bookend a page.
 * Below 768px the links collapse behind a hamburger toggle into a stacked panel.
 */
export function Navbar({ logo = 'PRIMA UI', logoHref, links = [], action, sticky = false, style }: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <nav style={{
      position: sticky ? 'sticky' : 'static', top: 0, zIndex: 10,
      background: 'var(--surface)',
      borderBottom: 'var(--border-width-rule) solid var(--border-strong)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
      gap: 'var(--space-5)', padding: 'var(--space-5) 0', ...style,
    }}>
      <a href={logoHref} style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
        letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', textDecoration: 'none',
      } as React.CSSProperties}>{logo}</a>

      <button
        type="button" className="prima-navbar-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          alignItems: 'center', justifyContent: 'center', width: 36, height: 36,
          background: 'none', border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
          color: 'var(--on-surface)', cursor: 'pointer',
        }}
      >
        <i className={open ? 'ph ph-x' : 'ph ph-list'} aria-hidden="true" style={{ fontSize: 18 }} />
      </button>

      <div className={`prima-navbar-links${open ? ' prima-navbar-links--open' : ''}`} style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap',
      }}>
        {links.map((link) => <NavAnchor key={link.label} link={link} onNavigate={() => setOpen(false)} />)}
        {action && (
          <Button href={action.href} onClick={() => { action.onClick && action.onClick(); setOpen(false); }}>
            {action.label}
          </Button>
        )}
      </div>
      <style>{RESPONSIVE_CSS}</style>
    </nav>
  );
}
