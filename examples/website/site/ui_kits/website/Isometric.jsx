// Isometric illustrations (SVG cubes in brand palette) + scroll-progress hook + right-side nav dots.
const IDS = window.ArayhanDesignSystem_bd91f4;

// 0..1 progress of a section entering the viewport (0 = top at viewport bottom, 1 = settled).
function useSectionProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = null;
    const read = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      // Progress of the CONTAINING SECTION entering the viewport — elements low in a
      // snapped 100vh slide would otherwise never reach p=1.
      const target = el.closest('section') || el;
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.7))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return p;
}

// Isometric primitives: cube, pyramid, floating plane, orbit ring.
function Cube({ x, y, s, h, top, left, right, style }) {
  const w = s * 0.866, u = s * 0.5;
  const pts = (arr) => arr.map(([a, b]) => a + ',' + b).join(' ');
  return (
    <g style={style}>
      <polygon points={pts([[x - w, y + u], [x, y + 2 * u], [x, y + 2 * u + h], [x - w, y + u + h]])} fill={left} />
      <polygon points={pts([[x + w, y + u], [x, y + 2 * u], [x, y + 2 * u + h], [x + w, y + u + h]])} fill={right} />
      <polygon points={pts([[x, y], [x + w, y + u], [x, y + 2 * u], [x - w, y + u]])} fill={top} />
    </g>
  );
}

function Pyramid({ x, y, s, h, left, right, style }) {
  const w = s * 0.866, u = s * 0.5;
  const apex = `${x},${y + u - h}`;
  return (
    <g style={style}>
      <polygon points={`${x - w},${y + u} ${x},${y + 2 * u} ${apex}`} fill={left} />
      <polygon points={`${x + w},${y + u} ${x},${y + 2 * u} ${apex}`} fill={right} />
    </g>
  );
}

function Plane({ x, y, s, top, style }) {
  const w = s * 0.866, u = s * 0.5;
  return (
    <g style={style}>
      <polygon points={`${x},${y} ${x + w},${y + u} ${x},${y + 2 * u} ${x - w},${y + u}`} fill={top} />
    </g>
  );
}

function Ring({ x, y, rx, stroke, style }) {
  return (
    <g style={style}>
      <ellipse className="ring-anim" cx={x} cy={y} rx={rx} ry={rx * 0.5} fill="none"
        stroke={stroke} strokeWidth="1.5" strokeDasharray="7 7" />
    </g>
  );
}

const BLUE = { top: '#93C5FD', left: '#2563EB', right: '#1E40AF' };
const BLUE_SOFT = { top: 'var(--iso-slate2-top)', left: 'var(--iso-slate2-left)', right: 'var(--iso-slate2-right)' };
const SLATE = { top: 'var(--iso-slate-top)', left: 'var(--iso-slate-left)', right: 'var(--iso-slate-right)' };

// Scene definitions — abstract isometric compositions (blue + slate only), assembled on scroll.
const SCENES = {
  // About — layered platform with floating apex + satellite planes
  stack: [
    { k: 'ring', x: 160, y: 138, rx: 128, stroke: 'var(--border-strong)' },
    { k: 'cube', x: 160, y: 148, s: 92, h: 24, c: SLATE },
    { k: 'cube', x: 160, y: 110, s: 62, h: 22, c: BLUE_SOFT },
    { k: 'pyr', x: 160, y: 66, s: 42, h: 38, c: BLUE, floaty: true },
    { k: 'plane', x: 66, y: 84, s: 26, c: BLUE_SOFT, floaty: true },
    { k: 'plane', x: 254, y: 62, s: 20, c: SLATE, floaty: true },
  ],
  // Experience — rising walkway of planes toward a monolith
  steps: [
    { k: 'ring', x: 170, y: 148, rx: 132, stroke: 'var(--border-strong)' },
    { k: 'plane', x: 78, y: 198, s: 50, c: SLATE },
    { k: 'plane', x: 138, y: 164, s: 50, c: BLUE_SOFT },
    { k: 'plane', x: 198, y: 130, s: 50, c: SLATE },
    { k: 'cube', x: 258, y: 82, s: 46, h: 28, c: BLUE_SOFT },
    { k: 'pyr', x: 258, y: 40, s: 26, h: 26, c: BLUE, floaty: true },
  ],
  // Projects — impact towers + drifting cap
  bars: [
    { k: 'ring', x: 160, y: 210, rx: 124, stroke: 'var(--border-strong)' },
    { k: 'cube', x: 90, y: 150, s: 46, h: 60, c: SLATE },
    { k: 'cube', x: 160, y: 110, s: 46, h: 100, c: BLUE_SOFT },
    { k: 'cube', x: 230, y: 60, s: 46, h: 150, c: BLUE },
    { k: 'plane', x: 230, y: 24, s: 30, c: BLUE_SOFT, floaty: true },
    { k: 'plane', x: 88, y: 110, s: 18, c: BLUE_SOFT, floaty: true },
  ],
  // Speaking — stage, speaker beacon, floating audience tiles
  stage: [
    { k: 'ring', x: 160, y: 142, rx: 136, stroke: 'var(--border-strong)' },
    { k: 'cube', x: 160, y: 158, s: 118, h: 18, c: SLATE },
    { k: 'pyr', x: 160, y: 96, s: 36, h: 48, c: BLUE, floaty: true },
    { k: 'plane', x: 88, y: 224, s: 20, c: BLUE_SOFT, floaty: true },
    { k: 'plane', x: 150, y: 240, s: 20, c: BLUE_SOFT, floaty: true },
    { k: 'plane', x: 212, y: 226, s: 20, c: BLUE_SOFT, floaty: true },
  ],
  // Now — drifting prism field
  float: [
    { k: 'ring', x: 150, y: 118, rx: 112, stroke: 'var(--border-strong)' },
    { k: 'pyr', x: 150, y: 118, s: 62, h: 54, c: BLUE_SOFT, floaty: true },
    { k: 'plane', x: 236, y: 76, s: 30, c: BLUE, floaty: true },
    { k: 'plane', x: 76, y: 62, s: 22, c: SLATE, floaty: true },
    { k: 'cube', x: 232, y: 182, s: 26, h: 14, c: SLATE, floaty: true },
  ],
  // Contact — tile field assembling around a beacon
  grid: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
    const row = Math.floor(i / 3), col = i % 3;
    if (i === 4) return { k: 'pyr', x: 160, y: 118, s: 34, h: 36, c: BLUE, floaty: true };
    return {
      k: i % 2 ? 'plane' : 'cube', x: 160 + (col - row) * 46, y: 92 + (col + row) * 23, s: 42, h: 12,
      c: i % 2 ? BLUE_SOFT : SLATE,
    };
  }),
};

function IsoScene({ variant, p, size = 300, style }) {
  const items = SCENES[variant] || [];
  const n = items.length;
  return (
    <svg viewBox="0 0 320 280" width={size} height={size * 0.875} aria-hidden="true"
      style={{ overflow: 'visible', display: 'block', ...style }}>
      {items.map((it, i) => {
        const local = Math.max(0, Math.min(1, p * (n * 0.7 + 1) - i * 0.7));
        const ease = 1 - Math.pow(1 - local, 3);
        const anim = it.floaty && ease >= 1 ? `float-y ${5 + i}s var(--ease-out) infinite ${i * 0.7}s` : 'none';
        const st = { opacity: ease, transform: `translateY(${(1 - ease) * 46}px)`, animation: anim };
        if (it.k === 'ring') return <Ring key={i} x={it.x} y={it.y} rx={it.rx} stroke={it.stroke} style={{ opacity: ease }} />;
        if (it.k === 'pyr') return <Pyramid key={i} x={it.x} y={it.y} s={it.s} h={it.h} {...it.c} style={st} />;
        if (it.k === 'plane') return <Plane key={i} x={it.x} y={it.y} s={it.s} {...it.c} style={st} />;
        return <Cube key={i} x={it.x} y={it.y} s={it.s} h={it.h} {...it.c} style={st} />;
      })}
    </svg>
  );
}

// 3D-immersive character — hooded figure with volumetric gradient shading (à la 3D mascot renders),
// faceless void under the hood, accent sneakers. Original artwork in brand palette.
function Char3D({ size = 200, style }) {
  return (
    <svg viewBox="0 0 170 270" width={size * 0.63} height={size} aria-hidden="true" style={{ overflow: 'visible', display: 'block', ...style }}>
      <defs>
        <radialGradient id="c3d-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--blue-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--blue-500)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c3d-hoodie" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="45%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B1120" />
        </linearGradient>
        <linearGradient id="c3d-hood" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#293548" />
          <stop offset="100%" stopColor="#0B1120" />
        </linearGradient>
        <radialGradient id="c3d-void" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#293548" />
          <stop offset="100%" stopColor="#05080F" />
        </radialGradient>
        <linearGradient id="c3d-shoe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--blue-400)" />
          <stop offset="100%" stopColor="var(--blue-700)" />
        </linearGradient>
        <linearGradient id="c3d-pants" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B1120" />
        </linearGradient>
      </defs>
      {/* ambient glow */}
      <ellipse cx="85" cy="120" rx="85" ry="110" fill="url(#c3d-glow)" />
      {/* reflection pool under feet */}
      <ellipse cx="85" cy="258" rx="52" ry="10" fill="var(--accent-soft)" />
      {/* waving arm (behind body) */}
      <g className="char-arm">
        <path d="M118 118 C138 104 146 84 148 62" stroke="url(#c3d-hoodie)" strokeWidth="17" strokeLinecap="round" fill="none" />
        <circle cx="149" cy="55" r="8.5" fill="#D9A87C" />
      </g>
      {/* hood */}
      <path d="M85 6 C118 6 132 32 130 58 C129 74 120 84 85 84 C50 84 41 74 40 58 C38 32 52 6 85 6 Z" fill="url(#c3d-hood)" />
      {/* face void */}
      <ellipse cx="85" cy="50" rx="29" ry="31" fill="url(#c3d-void)" />
      {/* hood rim highlight */}
      <path d="M56 32 C62 16 72 10 85 10" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* torso hoodie */}
      <path d="M50 82 C60 90 110 90 120 82 C134 96 138 128 136 152 C120 162 50 162 34 152 C32 128 36 96 50 82 Z" fill="url(#c3d-hoodie)" />
      {/* kangaroo pocket */}
      <path d="M62 128 C70 136 100 136 108 128 L104 150 C96 156 74 156 66 150 Z" fill="#0B1120" opacity="0.65" />
      {/* drawstrings */}
      <path d="M78 88 L76 106 M92 88 L94 106" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="76" cy="109" r="2.5" fill="#94A3B8" />
      <circle cx="94" cy="109" r="2.5" fill="#94A3B8" />
      {/* resting arm */}
      <path d="M50 96 C36 112 32 132 36 148" stroke="url(#c3d-hoodie)" strokeWidth="17" strokeLinecap="round" fill="none" />
      <circle cx="36" cy="153" r="8" fill="#D9A87C" />
      {/* shorts */}
      <path d="M44 156 L48 196 L80 196 L82 162 Z" fill="url(#c3d-pants)" />
      <path d="M126 156 L122 196 L90 196 L88 162 Z" fill="url(#c3d-pants)" />
      {/* legs */}
      <rect x="56" y="194" width="17" height="42" rx="8" fill="#1E293B" />
      <rect x="96" y="194" width="17" height="42" rx="8" fill="#0F172A" />
      {/* sneakers — accent, chunky white soles */}
      <path d="M50 236 C50 230 76 230 76 236 L77 246 L49 246 Z" fill="url(#c3d-shoe)" />
      <rect x="47" y="244" width="32" height="9" rx="4.5" fill="#F8FAFC" />
      <path d="M92 236 C92 230 118 230 118 236 L119 246 L91 246 Z" fill="url(#c3d-shoe)" />
      <rect x="89" y="244" width="32" height="9" rx="4.5" fill="#F8FAFC" />
    </svg>
  );
}

// Hero centerpiece — isometric glass device with floating UI panels, orbs, stars; mouse parallax.
function IsoHero({ photo }) {
  const [par, setPar] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPar({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  const layer = (d) => ({ transform: `translate(${par.x * d}px, ${par.y * d}px)`, transition: 'transform 300ms var(--ease-out)' });
  const glass = {
    background: 'color-mix(in srgb, var(--surface-card) 55%, transparent)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid var(--border-strong)', borderRadius: 14, padding: 12,
  };
  const bar = (w, accent) => (
    <span style={{ display: 'block', height: 7, width: w, borderRadius: 99, background: accent ? 'var(--accent)' : 'var(--bg-muted)', marginTop: 7 }}></span>
  );
  return (
    <div onMouseMove={onMove} onMouseLeave={() => setPar({ x: 0, y: 0 })}
      style={{ position: 'relative', width: '100%', maxWidth: 460, aspectRatio: '1 / 0.92', margin: '0 auto' }}>
      {/* glow orbs */}
      <span className="float-a" style={{ position: 'absolute', top: '4%', left: '5%', width: 46, height: 46, borderRadius: 99, background: 'radial-gradient(circle at 32% 30%, var(--blue-300), var(--blue-600))', opacity: 0.85 }}></span>
      <span className="float-c" style={{ position: 'absolute', top: '16%', right: '8%', width: 20, height: 20, borderRadius: 99, background: 'radial-gradient(circle at 32% 30%, var(--blue-200), var(--blue-500))' }}></span>
      <span className="float-b" style={{ position: 'absolute', bottom: '20%', left: '-2%', width: 14, height: 14, borderRadius: 99, background: 'radial-gradient(circle at 32% 30%, var(--slate-300), var(--slate-500))' }}></span>
      {/* stars */}
      <span className="star" style={{ position: 'absolute', top: '1%', right: '34%' }}>✦</span>
      <span className="star star-2" style={{ position: 'absolute', bottom: '4%', right: '6%' }}>✦</span>
      <span className="star star-3" style={{ position: 'absolute', top: '44%', left: '-3%' }}>✦</span>
      {/* isometric slab + device */}
      <svg viewBox="0 0 460 300" aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'visible', ...layer(6) }}>
        <polygon points="230,30 440,152 230,274 20,152" fill="var(--accent-soft)" opacity="0.45" />
        <polygon points="230,30 440,152 230,274 20,152" fill="none" stroke="var(--border-strong)" strokeWidth="1.2" strokeDasharray="6 6" className="ring-anim" />
        {/* device body */}
        <polygon points="124,148 230,210 230,228 124,166" fill="var(--iso-slate-right)" />
        <polygon points="336,148 230,210 230,228 336,166" fill="var(--iso-slate-left)" />
        <polygon points="230,86 336,148 230,210 124,148" fill="var(--iso-slate-top)" />
        {/* screen */}
        <polygon points="230,96 322,150 230,204 138,150" fill="var(--bg-page)" stroke="var(--accent-soft-border)" strokeWidth="1.5" />
        <polygon points="230,118 252,131 230,144 208,131" fill="var(--accent)" opacity="0.9" />
        <line x1="242" y1="156" x2="282" y2="133" stroke="var(--border-strong)" strokeWidth="5" strokeLinecap="round" />
        <line x1="236" y1="170" x2="296" y2="135" stroke="var(--border-default)" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      </svg>
      {/* 3D character standing centre-stage on the slab */}
      <div style={{ position: 'absolute', bottom: '26%', left: '50%', marginLeft: -66, zIndex: 1, ...layer(10) }}>
        <div className="char-bob">
          <Char3D size={210} />
        </div>
      </div>
      {/* floating glass UI panels */}
      <div style={{ position: 'absolute', top: '38%', left: '-3%', width: 128, transform: 'rotate(-7deg)', zIndex: 2, ...glass, ...layer(18) }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Deploys</span>
        {bar('82%', true)}{bar('58%')}{bar('70%')}
      </div>
      <div style={{ position: 'absolute', top: '2%', right: '12%', width: 104, transform: 'rotate(5deg)', ...glass, ...layer(26) }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Hosting</span>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--text-heading)', marginTop: 4 }}>−71%</div>
      </div>
      <div style={{ position: 'absolute', bottom: '8%', right: '2%', width: 158, transform: 'rotate(-4deg)', display: 'flex', gap: 10, alignItems: 'center', ...glass, ...layer(22) }}>
        <img src={photo} alt="Rayhan" style={{ width: 34, height: 34, borderRadius: 99, objectFit: 'cover', border: '2px solid var(--border-strong)', flex: 'none' }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-heading)' }}>arayhan_</div>
          {bar('100%')}
        </div>
      </div>
    </div>
  );
}

// Right-side nav dots — one per slide, click to snap there.
function NavDots({ sections, active }) {
  const [hovered, setHovered] = React.useState(null);
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };
  return (
    <nav aria-label="Sections" className="nav-dots" style={{
      position: 'fixed', right: 22, top: '50%', transform: 'translateY(-50%)', zIndex: 60,
      display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end',
    }}>
      {sections.map((s) => {
        const on = active === s.id, hov = hovered === s.id;
        return (
          <button key={s.id} onClick={() => go(s.id)} aria-label={s.label}
            onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'transparent',
              cursor: 'pointer', padding: 0,
            }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase', color: 'var(--text-heading)',
              background: 'var(--surface-raised)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)', padding: '3px 8px', boxShadow: 'var(--shadow-sm)',
              opacity: hov ? 1 : 0, transform: hov ? 'none' : 'translateX(6px)',
              transition: 'all var(--duration-fast) var(--ease-out)', pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>{s.label}</span>
            <span style={{
              width: on ? 10 : 8, height: on ? 10 : 8, borderRadius: 99, flex: 'none',
              background: on ? 'var(--interactive-primary)' : 'transparent',
              border: '2px solid ' + (on ? 'var(--interactive-primary)' : 'var(--border-strong)'),
              boxShadow: on ? '0 0 0 4px var(--bg-muted)' : 'none',
              transition: 'all var(--duration-base) var(--ease-out)',
            }}></span>
          </button>
        );
      })}
    </nav>
  );
}

Object.assign(window, { useSectionProgress, IsoScene, IsoHero, Char3D, NavDots });
