import React from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export interface TextScrambleProps {
  text: string;
  /** Scramble duration in ms. Default 900. */
  duration?: number;
  /** Trigger on hover instead of once-on-scroll-into-view. Default false. */
  onHover?: boolean;
  style?: React.CSSProperties;
}

/**
 * Prima text scramble — mono characters cycle randomly before resolving
 * left-to-right into the real text, once on scroll-into-view (or on hover).
 * Renders the final text immediately under reduced motion.
 */
export function TextScramble({ text, duration = 900, onHover = false, style }: TextScrambleProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const running = React.useRef(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [display, setDisplay] = React.useState(text);

  const scramble = React.useCallback(() => {
    if (reduced || running.current) return;
    running.current = true;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const revealCount = Math.floor(p * text.length);
      setDisplay(
        text.split('').map((ch, i) => (ch === ' ' || i < revealCount ? ch : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''),
      );
      if (p < 1) requestAnimationFrame(tick); else running.current = false;
    };
    requestAnimationFrame(tick);
  }, [text, duration, reduced]);

  React.useEffect(() => {
    setDisplay(text);
    if (onHover || reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { scramble(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [text, onHover, reduced, scramble]);

  return (
    <span
      ref={ref}
      onMouseEnter={onHover ? scramble : undefined}
      style={{ fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-label)', ...style }}
    >{display}</span>
  );
}
