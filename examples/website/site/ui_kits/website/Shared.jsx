// Shared chrome: Nav, Footer, CommandPalette
const DS = window.ArayhanDesignSystem_bd91f4;

function Wordmark({ onClick }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: 'var(--text-heading)', textDecoration: 'none' }}>
      arayhan<span style={{ color: 'var(--accent)' }}>_</span>
    </a>
  );
}

function Nav({ view, go, theme, onToggleTheme, onOpenPalette }) {
  const items = [
    { id: 'home', label: 'Home', num: '01' },
    { id: 'blog', label: 'Blog', num: '02' },
    { id: 'uses', label: 'Uses', num: '03' },
    { id: 'contact', label: 'Contact', num: '04' },
  ];
  const refs = React.useRef({});
  const [ind, setInd] = React.useState({ left: 0, width: 0, ready: false });
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);

  const measure = React.useCallback(() => {
    const el = refs.current[view];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [view]);
  React.useLayoutEffect(() => {
    measure();
    const t = setTimeout(measure, 350); // re-measure after webfonts settle
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [measure]);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const capsule = {
    pointerEvents: 'auto', display: 'flex', alignItems: 'center',
    background: 'color-mix(in srgb, var(--surface-raised) 82%, transparent)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--border-default)', borderRadius: 'var(--radius-full)',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    transition: 'all var(--duration-base) var(--ease-out)',
  };

  return (
    <header style={{
      position: 'fixed', top: scrolled ? 10 : 18, left: 0, right: 0, zIndex: 90,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', pointerEvents: 'none', gap: 12,
      transition: 'top var(--duration-base) var(--ease-out)',
    }}>
      {/* wordmark chip */}
      <div className="nav-wordmark" style={{ ...capsule, padding: '8px 18px' }}>
        <Wordmark onClick={() => go('home')} />
      </div>

      {/* center dock with sliding inverted-pill indicator */}
      <nav style={{ ...capsule, position: 'relative', padding: scrolled ? 4 : 6, gap: 2 }}>
        <span aria-hidden="true" style={{
          position: 'absolute', top: scrolled ? 4 : 6, bottom: scrolled ? 4 : 6,
          left: ind.left, width: ind.width,
          background: 'var(--interactive-primary)', borderRadius: 'var(--radius-full)',
          transition: ind.ready ? 'left 420ms cubic-bezier(0.34, 1.56, 0.64, 1), width 420ms cubic-bezier(0.34, 1.56, 0.64, 1), top var(--duration-base), bottom var(--duration-base)' : 'none',
          opacity: ind.ready ? 1 : 0,
        }}></span>
        {items.map((it) => {
          const active = view === it.id, hov = hovered === it.id;
          return (
            <a key={it.id} href="#" ref={(el) => { refs.current[it.id] = el; }} className="nav-item"
              onClick={(e) => { e.preventDefault(); go(it.id); }}
              onMouseEnter={() => setHovered(it.id)} onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', zIndex: 1, display: 'flex', alignItems: 'baseline', gap: 7,
                padding: '8px 18px', borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)', fontWeight: 500,
                color: active ? 'var(--text-on-primary)' : hov ? 'var(--text-heading)' : 'var(--text-body)',
                transition: 'color var(--duration-base) var(--ease-out)',
                transform: hov && !active ? 'translateY(-1px)' : 'none',
              }}>
              <span className="nav-num" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, opacity: active ? 0.7 : 0.5 }}>{it.num}</span>
              <span>{it.label}</span>
            </a>
          );
        })}
      </nav>

      {/* utilities chip */}
      <div style={{ ...capsule, padding: '5px 6px', gap: 6 }}>
        <button onClick={onOpenPalette} className="nav-cmdk" style={{
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          border: 'none', background: 'transparent',
          borderRadius: 'var(--radius-full)', padding: '8px 12px',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
        }}>
          <i className="ph ph-magnifying-glass" style={{ fontSize: 13 }}></i>
          <span>⌘K</span>
        </button>
        <span style={{ width: 1, height: 18, background: 'var(--border-default)' }}></span>
        <DS.ThemeToggle theme={theme} onToggle={onToggleTheme} size={34} />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-default)', marginTop: 'var(--space-9)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '32px var(--container-pad)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-heading)' }}>arayhan<span style={{ color: 'var(--accent)' }}>_</span></span>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>© 2026 · Jakarta, Indonesia</span>
        <div style={{ marginLeft: 'auto' }}><DS.SocialLinks size={34} /></div>
      </div>
    </footer>
  );
}

function CommandPalette({ open, onClose, go }) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  const actions = [
    { label: 'Go home', hint: 'H', run: () => go('home') },
    { label: 'Read the blog', hint: 'B', run: () => go('blog') },
    { label: 'Open /uses', hint: 'U', run: () => go('uses') },
    { label: 'Download CV', hint: 'PDF', run: () => window.open('../../assets/cv-rayhan.pdf', '_blank') },
    { label: 'GitHub', hint: '↗', run: () => window.open('https://github.com/arayhan', '_blank') },
    { label: 'LinkedIn', hint: '↗', run: () => window.open('https://www.linkedin.com/in/arayhan/', '_blank') },
    { label: 'Email me', hint: '↗', run: () => window.open('mailto:hello@arayhan.dev', '_blank') },
  ];
  const filtered = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));
  const [sel, setSel] = React.useState(0);
  React.useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
  React.useEffect(() => { setSel(0); }, [q]);
  if (!open) return null;
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[sel]) { filtered[sel].run(); onClose(); }
    if (e.key === 'Escape') onClose();
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'var(--scrim)', zIndex: 200, display: 'flex', justifyContent: 'center', paddingTop: '15vh' }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 560, maxWidth: 'calc(100vw - 48px)', height: 'fit-content',
        background: 'color-mix(in srgb, var(--surface-raised) 78%, transparent)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
      }}>
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
          placeholder="Type a command or search…"
          style={{
            width: '100%', boxSizing: 'border-box', padding: '16px 20px', border: 'none', outline: 'none',
            background: 'transparent', color: 'var(--text-heading)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
            borderBottom: '1px solid var(--border-default)',
          }} />
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column' }}>
          {filtered.length === 0 && <div style={{ padding: '14px 14px', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>No results.</div>}
          {filtered.map((a, i) => (
            <button key={a.label} onClick={() => { a.run(); onClose(); }} onMouseEnter={() => setSel(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', cursor: 'pointer',
                padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: 'none',
                background: i === sel ? 'var(--bg-muted)' : 'transparent',
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 500,
              }}>
              <span>{a.label}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{a.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Scroll-to-top — bottom-right, appears after scrolling.
function ScrollTopButton() {
  const [show, setShow] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed', right: 22, bottom: 24, zIndex: 80,
        width: 46, height: 46, borderRadius: 'var(--radius-full)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hover ? 'var(--interactive-primary-hover)' : 'var(--interactive-primary)',
        color: 'var(--text-on-primary)', border: 'none',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        opacity: show ? 1 : 0,
        transform: show ? (hover ? 'translateY(-3px)' : 'none') : 'translateY(16px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'all var(--duration-base) var(--ease-out)',
      }}>
      <i className="ph ph-arrow-up" style={{ fontSize: 19 }}></i>
    </button>
  );
}

Object.assign(window, { Wordmark, Nav, Footer, CommandPalette, ScrollTopButton });
