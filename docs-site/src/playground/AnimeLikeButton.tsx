import React from 'react';
import { animate, stagger } from 'animejs';

const PARTICLE_COUNT = 10;
const HEART_D = 'M14 24.6C7.5 20.2 3 16.1 3 11.2 3 7.2 6 4.2 9.7 4.2c2.1 0 4.1 1 5.3 2.6 1.2-1.6 3.2-2.6 5.3-2.6 3.7 0 6.7 3 6.7 7 0 4.9-4.5 9-11 13.4l-1 .7-1-.7z';

/** A heart button that pops with an elastic ease and bursts a ring of
 * cobalt particles outward — anime.js `animate()` + `stagger()`. The
 * heart is a plain inline SVG (no icon-font fill weight dependency).
 * Instant, animation-free toggle under reduced motion. */
export default function AnimeLikeButton() {
  const fillRef = React.useRef<SVGPathElement>(null);
  const particlesRef = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(128);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    if (fillRef.current) {
      animate(fillRef.current, {
        opacity: next ? [0, 1] : [1, 0],
        scale: next ? [0.6, 1] : [1, 0.85],
        duration: 480,
        ease: 'outElastic(1, .6)',
      });
    }

    if (next) {
      const particles = particlesRef.current.filter((el): el is HTMLSpanElement => !!el);
      particles.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'translate(-50%, -50%) scale(1)'; });
      animate(particles, {
        translateX: () => `${(Math.random() - 0.5) * 100}px`,
        translateY: () => `${-30 - Math.random() * 50}px`,
        scale: [1, 0],
        opacity: [1, 0],
        duration: 550,
        delay: stagger(18),
        ease: 'outQuad',
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
      <button
        onClick={toggle}
        aria-pressed={liked}
        aria-label={liked ? 'Unlike' : 'Like'}
        style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2)',
        }}
      >
        <span style={{ position: 'relative', display: 'inline-flex', width: 28, height: 28 }}>
          <svg viewBox="0 0 28 28" width={28} height={28} style={{ position: 'absolute', inset: 0 }}>
            <path d={HEART_D} fill="none" stroke="var(--text-secondary)" strokeWidth={1.6} strokeLinejoin="round" />
            <path ref={fillRef} d={HEART_D} fill="var(--primary)" style={{ opacity: liked ? 1 : 0, transformOrigin: '14px 14px' }} />
          </svg>
          {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
            <span
              key={i}
              ref={(el) => { particlesRef.current[i] = el; }}
              style={{
                position: 'absolute', top: '50%', left: '50%', width: 5, height: 5, borderRadius: 'var(--radius-full)',
                background: 'var(--primary)', opacity: 0, transform: 'translate(-50%, -50%) scale(0)', pointerEvents: 'none',
              }}
            />
          ))}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
        } as React.CSSProperties}>{count}</span>
      </button>
    </div>
  );
}
