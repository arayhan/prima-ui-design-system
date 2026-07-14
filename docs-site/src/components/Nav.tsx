import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap, useGSAP } from '../motion/gsap';

const LINKS = [
  { label: 'Foundations', to: '/foundations' },
  { label: 'Components', to: '/components' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Usage', to: '/usage' },
  { label: 'Contact', to: '/contact' },
];

function NavLink({ label, to, active }: { label: string; to: string; active: boolean }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={to}
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
 * and a cobalt scroll-progress hairline along the bottom edge.
 */
export function Nav() {
  const ref = React.useRef<HTMLElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

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
        <div style={{ display: 'flex', gap: 'var(--space-5)', overflowX: 'auto' }}>
          {LINKS.map((l) => <NavLink key={l.to} {...l} active={pathname === l.to} />)}
        </div>
      </div>
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
