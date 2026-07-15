import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../motion/gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LINKS = [
  { label: 'Foundations', to: '/foundations' },
  { label: 'Components', to: '/components' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Usage', to: '/usage' },
  { label: 'Contact', to: '/contact' },
];

function NavLink({ label, to, active, onNavigate }: { label: string; to: string; active: boolean; onNavigate: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={to} onClick={onNavigate}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none',
        color: active || hover ? 'var(--primary)' : 'var(--text-secondary)',
        transition: 'color var(--duration-fast) var(--ease-spatial)', whiteSpace: 'nowrap',
      } as React.CSSProperties}
    >{active ? `// ${label}` : label}</Link>
  );
}

/**
 * Fixed top bar: wordmark (home), mono route links with active highlight,
 * and a cobalt scroll-progress hairline along the bottom edge. Below 768px
 * the links collapse behind a hamburger toggle into a dropdown panel.
 */
export function Nav() {
  const ref = React.useRef<HTMLElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const narrow = useMediaQuery('(max-width: 767px)');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  useGSAP(
    () => {
      // Progress hairline — runs even under reduced motion (position indicator,
      // not decoration).
      if (barRef.current) {
        gsap.to(barRef.current, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.3 },
        });
      }
    },
    { scope: ref },
  );

  const links = LINKS.map((l) => (
    <NavLink key={l.to} {...l} active={pathname === l.to} onNavigate={() => setOpen(false)} />
  ));

  return (
    <nav
      ref={ref}
      aria-label="Site"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(248, 251, 253, 0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: 'var(--border-width) solid var(--border)',
      }}
    >
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)',
      }}>
        <Link to="/" style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
          color: 'var(--on-surface)', textDecoration: 'none', whiteSpace: 'nowrap',
        } as React.CSSProperties}>PRIMA<span style={{ color: 'var(--primary)' }}>.</span></Link>

        {narrow ? (
          <button
            type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36,
              background: 'none', border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
              color: 'var(--on-surface)', cursor: 'pointer',
            }}
          >
            <i className={open ? 'ph ph-x' : 'ph ph-list'} aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-5)', overflowX: 'auto' }}>{links}</div>
        )}
      </div>

      {narrow && open && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
          padding: 'var(--space-5) var(--container-pad)',
          borderTop: 'var(--border-width) solid var(--border)', background: 'var(--surface)',
        }}>{links}</div>
      )}

      <div
        ref={barRef}
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, right: 0, bottom: -1.5, height: 3,
          background: 'var(--primary)', transform: 'scaleX(0)', transformOrigin: 'left center',
        }}
      />
    </nav>
  );
}
