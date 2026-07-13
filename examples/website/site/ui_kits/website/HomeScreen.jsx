// Home v3 — bento/spatial: rounded tiles with 3D hover tilt, no character illustration.
const HDS = window.ArayhanDesignSystem_bd91f4;
const D = window.SITE_DATA;

// ---------- hooks & text animation ----------
function useInView(threshold = 0.2) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    // Fallback: the initial IO delivery can report false if the frame is hidden/zero-sized
    // during load; above-the-fold elements then never get a `true` entry. Re-check manually.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight && r.width > 0) setInView(true);
    };
    const t1 = setTimeout(check, 300);
    const t2 = setTimeout(check, 900);
    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, style }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(28px)',
      transition: `opacity var(--duration-slow) var(--ease-out) ${delay}ms, transform var(--duration-slow) var(--ease-out) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// Per-word masked rise — words slide up out of an overflow-hidden clip. `accents` words render in blue.
function RiseText({ text, as = 'h2', fontSize, delay = 0, stagger = 55, accents = [], style }) {
  const [ref, inView] = useInView(0.3);
  const Tag = as;
  return (
    <Tag ref={ref} style={{ fontSize, margin: 0, ...style }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <span style={{
            display: 'inline-block',
            color: accents.includes(w) ? 'var(--text-accent)' : undefined,
            transform: inView ? 'none' : 'translateY(115%) rotate(4deg)',
            transition: `transform 650ms var(--ease-out) ${delay + i * stagger}ms`,
            whiteSpace: 'pre',
          }}>{w + (i < text.split(' ').length - 1 ? ' ' : '')}</span>
        </span>
      ))}
    </Tag>
  );
}

// Oversized outlined word behind a section (à la editorial portfolio heroes); slides in with scroll.
function GhostWord({ text }) {
  const ref = React.useRef(null);
  const p = useSectionProgress(ref);
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'absolute', top: 18, right: -10, zIndex: 0, pointerEvents: 'none',
      fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1, whiteSpace: 'nowrap',
      fontSize: 'clamp(90px, 16vw, 210px)', letterSpacing: '-0.03em',
      color: 'transparent', WebkitTextStroke: '1.5px var(--border-default)', opacity: 0.8,
      transform: `translateX(${(1 - p) * 70}px)`, transition: 'transform 120ms linear',
    }}>{text}</div>
  );
}

// Numbered editorial heading: 01 / EYEBROW — then animated title.
function FancyHeading({ num, eyebrow, title, description, titleSize = 'var(--text-3xl)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 680 }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-accent)' }}>{num}</span>
          <span style={{ width: 42, height: 1, background: 'var(--border-strong)' }}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{eyebrow}</span>
        </div>
      </Reveal>
      <RiseText text={title} fontSize={titleSize} />
      {description && <Reveal delay={200}><p style={{ margin: 0 }}>{description}</p></Reveal>}
    </div>
  );
}

// Ambient floating orbs + star — immersive depth for sections and page heroes.
function Orbs() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <span className="float-a" style={{ position: 'absolute', top: '12%', right: '5%', width: 34, height: 34, borderRadius: 99, background: 'radial-gradient(circle at 32% 30%, var(--blue-300), var(--blue-600))', opacity: 0.5 }}></span>
      <span className="float-c" style={{ position: 'absolute', bottom: '5%', left: '1%', width: 16, height: 16, borderRadius: 99, background: 'radial-gradient(circle at 32% 30%, var(--slate-300), var(--slate-500))', opacity: 0.35 }}></span>
      <span className="star star-2" style={{ position: 'absolute', top: '22%', left: '11%' }}>✦</span>
    </div>
  );
}

function Section({ children, id, subtle = false, full = true, ghost, orbs = false, style }) {
  return (
    <section id={id} data-screen-label={id} className={full ? 'slide' : ''} style={{ background: subtle ? 'var(--bg-subtle)' : 'transparent', overflow: 'hidden', position: 'relative', ...style }}>
      {ghost && <GhostWord text={ghost} />}
      {orbs && <Orbs />}
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '64px var(--container-pad)', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

function IsoInline({ variant, size = 220, style }) {
  const ref = React.useRef(null);
  const p = useSectionProgress(ref);
  return (
    <div ref={ref} style={{ pointerEvents: 'none', ...style }}>
      <IsoScene variant={variant} p={p} size={size} />
    </div>
  );
}

// Spatial bento tile: rounded surface with mouse-tracking 3D tilt + hover lift.
function BentoTile({ children, delay = 0, pad = 24, style, tilt = true }) {
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(false);
  const onMove = (e) => {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -4, y: ((e.clientX - r.left) / r.width - 0.5) * 5 });
  };
  return (
    <Reveal delay={delay} style={{ height: '100%' }}>
      <div onMouseMove={onMove} onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setT({ x: 0, y: 0 }); }}
        style={{
          height: '100%', boxSizing: 'border-box', padding: pad,
          background: 'color-mix(in srgb, var(--surface-card) 72%, transparent)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
          borderRadius: 20, overflow: 'hidden', position: 'relative',
          transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg) translateY(${hover ? -3 : 0}px) ${hover ? 'scale(1.012)' : ''}`,
          transition: 'border-color var(--duration-base) var(--ease-out), transform 180ms var(--ease-out)',
          willChange: 'transform',
          ...style,
        }}>
        {children}
      </div>
    </Reveal>
  );
}

// Page hero header for subpages (blog, uses): mono path eyebrow + rising title.
function PageHero({ path, title, description, ghost, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)', position: 'relative', overflow: 'hidden' }}>
      {ghost && <GhostWord text={ghost} />}
      <Orbs />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '132px var(--container-pad) 48px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{path}</span>
            <span style={{ flex: 'none', width: 42, height: 1, background: 'var(--border-strong)' }}></span>
          </div>
        </Reveal>
        <RiseText as="h1" text={title} fontSize="clamp(36px, 4vw, 52px)" />
        {description && <Reveal delay={200}><p style={{ margin: 0, maxWidth: 620, fontSize: 'var(--text-lg)' }}>{description}</p></Reveal>}
        {children}
      </div>
    </div>
  );
}

// ---------- hero ----------
// Ambient particle field — deterministic positions, gentle float.
function Particles({ count = 16 }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    top: (i * 53 + 7) % 100,
    size: 3 + (i % 3) * 1.5,
    dur: 5 + (i % 4) * 1.6,
    delay: (i % 5) * 0.9,
    blue: i % 4 === 0,
  }));
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {dots.map((d, i) => (
        <span key={i} className="particle" style={{
          position: 'absolute', left: d.left + '%', top: d.top + '%',
          width: d.size, height: d.size, borderRadius: 99,
          background: d.blue ? 'var(--accent)' : 'var(--border-strong)',
          opacity: d.blue ? 0.55 : 0.5,
          animation: `float-y ${d.dur}s ease-in-out infinite ${d.delay}s`,
        }}></span>
      ))}
    </div>
  );
}

// One-row mini gallery under the hero: drifting marquee, tilted frames, hover to straighten.
function HeroMarquee() {
  const slots = [
    { id: 'marquee-1', src: '../../assets/speaking-genkit-talk.jpg', label: 'GDG Depok' },
    { id: 'marquee-2', label: 'DevFest' },
    { id: 'marquee-3', label: 'Firebase ID' },
    { id: 'marquee-4', label: 'Bootcamp' },
    { id: 'marquee-5', label: 'IO Extended' },
    { id: 'marquee-6', label: 'Workshop' },
    { id: 'marquee-7', label: 'Community' },
  ];
  return (
    <div className="marquee" style={{ marginTop: 34, overflow: 'hidden', padding: '14px 0 6px' }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 18, width: 'max-content' }}>
        {slots.map((s, i) => (
          <div key={s.id} className="marquee-card" style={{
            width: 200, height: 124, flex: 'none', position: 'relative',
            transform: `rotate(${i % 2 ? 1.8 : -1.8}deg)`,
            transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
            borderRadius: 'var(--radius-md)',
          }}>
            <image-slot id={s.id} shape="rounded" radius="10" src={s.src} placeholder={s.label}></image-slot>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ go }) {
  const logos = ['Anify', 'Badr Interactive', 'Astra', 'UNDP', 'GoTo Impact', 'Google for Developers'];
  return (
    <Section id="hero" ghost="RAYHAN">
      <Particles count={16} />
      <div className="grid-hero" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 56, alignItems: 'center', paddingTop: 12, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <img src="../../assets/speaking-genkit-talk.jpg" alt="Rayhan" style={{ width: 44, height: 44, borderRadius: 99, objectFit: 'cover', border: '2px solid var(--border-strong)' }} />
              <span style={{ fontFamily: 'var(--font-hand)', fontSize: 23, color: 'var(--text-heading)', transform: 'rotate(-2deg)' }}>hey — I'm Rayhan!</span>
              <HDS.Badge tone="open">{D.hero.badge}</HDS.Badge>
            </div>
          </Reveal>
          <RiseText as="h1" text={D.hero.title} accents={['ships,', 'teaches,', 'scales.']} fontSize="clamp(36px, 4.2vw, 56px)" stagger={70} />
          <Reveal delay={350}><p style={{ margin: 0, fontSize: 'var(--text-lg)', maxWidth: 540 }}>{D.hero.sub}</p></Reveal>
          <Reveal delay={450}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
              <HDS.Button variant="primary" size="lg" onClick={() => go('contact')}>Get in touch</HDS.Button>
              <HDS.Button variant="secondary" size="lg" href="../../assets/cv-rayhan.pdf" target="_blank"
                icon={<i className="ph-duotone ph-download-simple" style={{ fontSize: 18 }}></i>}>
                Download CV
              </HDS.Button>
              <HDS.SocialLinks size={40} />
            </div>
          </Reveal>
          <Reveal delay={550}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap', marginTop: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', flex: 'none' }}>Shipped with</span>
              {logos.map((n) => (
                <span key={n} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{n}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={250}><IsoHero photo="../../assets/speaking-genkit-talk.jpg" /></Reveal>
      </div>
      <Reveal delay={500}><HeroMarquee /></Reveal>
    </Section>
  );
}

// ---------- sections ----------
function About() {
  const stats = [
    ['7 yrs', 'React & Next.js', 'ph-code'],
    ['71%', 'hosting costs cut', 'ph-trend-down'],
    ['1,800', 'community members', 'ph-users-three'],
  ];
  return (
    <Section id="about" subtle ghost="ABOUT" orbs>
      <FancyHeading num="01" eyebrow="About" title="Engineer, lead, and teacher" />
      <div className="grid-about" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 28, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BentoTile delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {D.about.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
            </div>
          </BentoTile>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {stats.map(([n, l, icon], i) => (
              <BentoTile key={l} delay={180 + i * 80} pad={20}>
                <i className={'ph-duotone ' + icon} style={{ fontSize: 22, color: 'var(--text-muted)' }}></i>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-3xl)', color: 'var(--text-heading)', marginTop: 10 }}>{n}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 2 }}>{l}</div>
              </BentoTile>
            ))}
          </div>
        </div>
        <BentoTile delay={160} pad={0} style={{ minHeight: 300 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <image-slot id="about-casual" shape="rect" placeholder="Drop a casual photo"></image-slot>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 16px 12px', background: 'linear-gradient(transparent, rgba(11,17,32,.55))', pointerEvents: 'none' }}>
            <span style={{ fontFamily: 'var(--font-hand)', fontSize: 20, color: '#fff' }}>off duty ☼</span>
          </div>
        </BentoTile>
      </div>
    </Section>
  );
}

function Experience() {
  const groups = Object.keys(D.experience);
  const [active, setActive] = React.useState(groups[0]);
  const rows = D.experience[active];
  return (
    <Section id="experience" ghost="CAREER" orbs>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
        <FancyHeading num="02" eyebrow="Experience" title="Where I've worked and taught" />
        <IsoInline variant="steps" size={180} style={{ flex: 'none', marginBottom: -10 }} />
      </div>
      <Reveal delay={100}>
        <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
          {groups.map((g) => (
            <button key={g} onClick={() => setActive(g)} style={{
              padding: '8px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 500,
              border: '1px solid ' + (active === g ? 'transparent' : 'var(--border-default)'),
              background: active === g ? 'var(--interactive-primary)' : 'transparent',
              color: active === g ? 'var(--text-on-primary)' : 'var(--text-body)',
              transition: 'all var(--duration-fast) var(--ease-out)',
            }}>{g}</button>
          ))}
        </div>
      </Reveal>
      <BentoTile delay={180} pad={28} tilt={false} style={{ marginTop: 20, maxHeight: '46vh', overflowY: 'auto' }}>
        {rows.map((r, i) => (
          <HDS.TimelineItem key={r.title + r.period} {...r} last={i === rows.length - 1} />
        ))}
      </BentoTile>
    </Section>
  );
}

// Masonry work grid: case-study cards + screenshot slots + iso chart, varied heights.
function Projects() {
  const cells = [
    { type: 'project', p: D.projects[0] },
    { type: 'shot', id: 'proj-smile-shot', label: 'Drop a SMILE dashboard screenshot', ratio: '4/3' },
    { type: 'project', p: D.projects[1] },
    { type: 'iso' },
    { type: 'shot', id: 'proj-anify-shot', label: 'Drop an Anify screenshot', ratio: '4/2.6' },
    { type: 'project', p: D.projects[2] },
  ];
  return (
    <Section id="projects" subtle ghost="WORK" orbs>
      <FancyHeading num="03" eyebrow="Portfolio" title="Selected work" description="Case studies, not screenshots — each one ends with measurable impact." />
      <div className="masonry" style={{ columnGap: 16, marginTop: 32 }}>
        {cells.map((cell, i) => (
          <div key={i} style={{ breakInside: 'avoid', marginBottom: 16 }}>
            {cell.type === 'project' && (
              <BentoTile delay={100 + i * 70}>
                <h3 style={{ fontSize: 'var(--text-xl)' }}>{cell.p.name}</h3>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 4 }}>{cell.p.role}</div>
                <p style={{ margin: '14px 0 0', fontSize: 'var(--text-sm)' }}>{cell.p.problem}</p>
                <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--bg-muted)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>Impact</span>
                  <p style={{ margin: '4px 0 0', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-heading)' }}>{cell.p.impact}</p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                  {cell.p.tags.map((t) => <HDS.Tag key={t}>{t}</HDS.Tag>)}
                </div>
              </BentoTile>
            )}
            {cell.type === 'shot' && (
              <BentoTile delay={100 + i * 70} pad={0} style={{ aspectRatio: cell.ratio }}>
                <div style={{ position: 'absolute', inset: 0 }}>
                  <image-slot id={cell.id} shape="rect" placeholder={cell.label}></image-slot>
                </div>
              </BentoTile>
            )}
            {cell.type === 'iso' && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                <IsoInline variant="bars" size={210} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// Each talk gets its own mini photo gallery — drop event shots into the frames.
function SpeakingRow({ talk, index, first }) {
  const shots = [0, 1, 2].map((j) => ({
    id: `speak-${index}-${j}`,
    src: first && j === 0 ? '../../assets/speaking-genkit-talk.jpg' : null,
  }));
  return (
    <BentoTile delay={120 + index * 90} pad={24} style={{ marginTop: index > 0 ? 16 : 0 }}>
      <div className="grid-speak" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 32, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{talk.period}</div>
          <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 8 }}>{talk.title}<span style={{ color: 'var(--text-muted)', fontWeight: 500 }}> · {talk.org}</span></h3>
          <p style={{ margin: '10px 0 0', fontSize: 'var(--text-sm)', maxWidth: 420 }}>{talk.description}</p>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {shots.map((s, j) => (
            <div key={s.id} className="marquee-card" style={{
              flex: j === 0 ? 1.5 : 1, aspectRatio: j === 0 ? '4/3' : '3/4', position: 'relative', minWidth: 0,
              transform: `rotate(${j % 2 ? 1.6 : -1.6}deg)`,
              transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
              borderRadius: 'var(--radius-md)',
            }}>
              <image-slot id={s.id} shape="rounded" radius="10" src={s.src} placeholder="Drop event photo"></image-slot>
            </div>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}

function Speaking() {
  return (
    <Section id="speaking" ghost="STAGE" orbs>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
        <FancyHeading num="04" eyebrow="Speaking" title="On stage, 350–600 people at a time" description="10+ talks across GDG, DevFest, and Firebase Indonesia — each with its own gallery." />
        <IsoInline variant="stage" size={180} style={{ flex: 'none', marginBottom: -10 }} />
      </div>
      <div style={{ marginTop: 24 }}>
        {D.experience.Speaking.map((talk, i) => (
          <SpeakingRow key={talk.title} talk={talk} index={i} first={i === 0} />
        ))}
      </div>
    </Section>
  );
}

function Now() {
  const icons = ['ph-users-three', 'ph-sparkle', 'ph-briefcase'];
  return (
    <Section id="now" ghost="NOW" orbs>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
        <FancyHeading num="05" eyebrow="Now" title="What I'm doing now" description="Updated July 2026." />
        <IsoInline variant="float" size={180} style={{ flex: 'none', marginBottom: -10 }} />
      </div>
      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 28 }}>
        {D.now.map((n, i) => (
          <BentoTile key={n} delay={120 + i * 90}>
            <i className={'ph-duotone ' + icons[i % icons.length]} style={{ fontSize: 24, color: 'var(--text-muted)' }}></i>
            <p style={{ margin: '12px 0 0', fontSize: 'var(--text-sm)' }}>{n}</p>
          </BentoTile>
        ))}
      </div>
    </Section>
  );
}

const HOME_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'now', label: 'Now' },
];

function HomeScreen({ go }) {
  const [active, setActive] = React.useState('hero');
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    HOME_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const goSection = (id) => go(id);
  return (
    <main>
      <NavDots sections={HOME_SECTIONS} active={active} />
      <Hero go={goSection} />
      <About />
      <Experience />
      <Projects />
      <Speaking />
      <Now />
    </main>
  );
}

Object.assign(window, { HomeScreen, PageHero, RiseText, Reveal, BentoTile });
