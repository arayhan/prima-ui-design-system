import React from 'react';

export interface CountUpProps {
  /** Target number */
  value: number;
  /** Shown before/after the number — e.g. suffix "+" or "%" */
  prefix?: string;
  suffix?: string;
  /** Mono uppercase caption under the value */
  label?: string;
  /** Animation length in ms. Default 1200. */
  duration?: number;
  /** Decimal places. Default 0. */
  decimals?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima count-up — a Clash Display figure that counts from zero when it
 * scrolls into view (once), easing out. Renders the final value immediately
 * under reduced motion.
 */
export function CountUp({ value, prefix = '', suffix = '', label, duration = 1200, decimals = 0, style, className }: CountUpProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : 0,
  );
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }

    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplay(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 600,
        lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-heading)',
        color: 'var(--on-surface)', fontVariantNumeric: 'tabular-nums',
      } as React.CSSProperties}>
        {prefix}{display.toFixed(decimals)}{suffix}
      </span>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
        } as React.CSSProperties}>{label}</span>
      )}
    </div>
  );
}
