import React from 'react';
import { Section } from '../components/Section';
import { COLOR_GROUPS, TYPE_SCALE, SPACING, RADII, BORDERS, MOTION, type ColorToken } from '../content/tokens';
import { gsap } from '../motion/gsap';

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
  letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
};

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      ...monoLabel, color: 'var(--primary)',
      borderTop: 'var(--border-width-emphasis) solid var(--border-strong)', paddingTop: 'var(--space-3)',
    } as React.CSSProperties}>// {children}</div>
  );
}

function Swatch({ token }: { token: ColorToken }) {
  const [copied, setCopied] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${token.varName})`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch { /* ignore */ }
  };
  const ink = token.dark ? '#F2F6FA' : '#0F1116';
  return (
    <button
      onClick={copy} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      title={`Copy var(${token.varName})`}
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: 132, padding: 'var(--space-4)', textAlign: 'left', cursor: 'pointer',
        background: token.hex, color: ink,
        border: `var(--border-width) solid ${hover ? 'var(--primary)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'transform var(--duration-base) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <span style={{ ...monoLabel, opacity: 0.85 } as React.CSSProperties}>
        {copied ? 'COPIED ✓' : token.varName}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 500 }}>{token.label}</span>
        <span style={{ ...monoLabel, opacity: 0.7 } as React.CSSProperties}>{token.hex}</span>
      </span>
    </button>
  );
}

function TypeRow({ t }: { t: (typeof TYPE_SCALE)[number] }) {
  const family = t.family === 'display' ? 'var(--font-display)' : t.family === 'body' ? 'var(--font-body)' : 'var(--font-mono)';
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 'var(--space-5)', flexWrap: 'wrap',
      borderBottom: 'var(--border-width) solid var(--border)', padding: 'var(--space-4) 0',
    }}>
      <span style={{ ...monoLabel, color: 'var(--text-secondary)', width: 150, flex: 'none' } as React.CSSProperties}>
        {t.label} · {t.px}px
      </span>
      <span style={{
        fontFamily: family, fontSize: `min(${t.px}px, 11vw)`,
        fontWeight: t.family === 'display' ? 600 : 400, lineHeight: 1.2,
        textTransform: t.family === 'display' ? 'uppercase' : 'none',
        letterSpacing: t.family === 'display' ? 'var(--tracking-display)' : 'var(--tracking-normal)',
        color: t.family === 'mono' ? 'var(--primary)' : 'var(--on-surface)',
        overflowWrap: 'anywhere',
      } as React.CSSProperties}>{t.sample}</span>
    </div>
  );
}

function MotionPlayground() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState('--duration-base');

  const play = (varName: string, ms: number) => {
    setActive(varName);
    const dot = dotRef.current;
    const track = trackRef.current;
    if (!dot || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dist = track.clientWidth - dot.clientWidth;
    gsap.fromTo(dot, { x: 0 }, { x: dist, duration: ms / 1000, ease: 'expo.out', overwrite: true });
  };

  return (
    <div style={{
      border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
      background: 'var(--surface)', padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
    }}>
      <div ref={trackRef} style={{
        position: 'relative', height: 48, borderRadius: 'var(--radius-sm)',
        background: 'var(--background)', border: 'var(--border-width) solid var(--border)',
      }}>
        <div ref={dotRef} style={{
          position: 'absolute', top: 7, left: 7, width: 32, height: 32,
          borderRadius: 'var(--radius-sm)', background: 'var(--primary)',
        }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        {MOTION.filter((m) => m.varName.startsWith('--duration')).map((m) => (
          <button
            key={m.varName} onClick={() => play(m.varName, parseInt(m.value, 10))}
            style={{
              ...monoLabel,
              color: active === m.varName ? 'var(--on-primary)' : 'var(--on-surface)',
              background: active === m.varName ? 'var(--primary)' : 'transparent',
              border: 'var(--border-width) solid ' + (active === m.varName ? 'var(--primary)' : 'var(--border)'),
              borderRadius: 'var(--radius-sm)', padding: '10px 14px', cursor: 'pointer',
              transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
            } as React.CSSProperties}
          >{m.varName.replace('--duration-', '')} · {m.value}</button>
        ))}
        <span style={{ ...monoLabel, color: 'var(--text-secondary)', alignSelf: 'center' } as React.CSSProperties}>
          EASE: cubic-bezier(0.16, 1, 0.3, 1)
        </span>
      </div>
    </div>
  );
}

/** Tokens made tangible — colors, type, spacing, structure, motion. */
export function FoundationsSection() {
  return (
    <Section id="foundations">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {COLOR_GROUPS.map((group) => (
            <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <SubHead>{group.title}</SubHead>
              <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                {group.colors.map((c) => <Swatch key={c.varName} token={c} />)}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SubHead>TYPE SCALE</SubHead>
          <div>{TYPE_SCALE.map((t) => <TypeRow key={t.varName} t={t} />)}</div>
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SubHead>SPACING — 8PT SCALE</SubHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {SPACING.map((s) => (
              <div key={s.varName} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{ ...monoLabel, color: 'var(--text-secondary)', width: 110, flex: 'none' } as React.CSSProperties}>{s.varName}</span>
                <span style={{ height: 20, width: s.px, background: 'var(--primary)', borderRadius: 2, flex: 'none' }} />
                <span style={{ ...monoLabel, color: 'var(--text-secondary)' } as React.CSSProperties}>{s.px}px</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <SubHead>RADII</SubHead>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              {RADII.map((r) => (
                <div key={r.varName} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <div style={{
                    width: 84, height: 84, background: 'var(--surface)',
                    border: 'var(--border-width-emphasis) solid var(--border-strong)', borderRadius: r.px === '999px' ? '999px' : r.px,
                  }} />
                  <span style={{ ...monoLabel, color: 'var(--text-secondary)' } as React.CSSProperties}>{r.px}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', color: 'var(--text-secondary)' }}>{r.use}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <SubHead>BORDERS</SubHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {BORDERS.map((b) => (
                <div key={b.varName} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <span style={{ width: 120, borderTop: `${b.px} solid var(--border-strong)`, flex: 'none' }} />
                  <span style={{ ...monoLabel, color: 'var(--text-secondary)' } as React.CSSProperties}>{b.px} — {b.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <SubHead>MOTION — REPLAY THE EASING</SubHead>
          <MotionPlayground />
        </div>
      </div>
    </Section>
  );
}
