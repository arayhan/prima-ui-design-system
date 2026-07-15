import React from 'react';

// Shared count-up engine for any component that displays a numeric string
// (StatStrip, AnalyticsCard, SectionHeader's number). NOT exported from the
// library barrel — internal like _field.tsx.

interface ParsedNumber { prefix: string; suffix: string; value: number; decimals: number; padWidth: number }

function parse(target: string): ParsedNumber | null {
  const match = target.match(/\d+(\.\d+)?/);
  if (match === null || match.index === undefined) return null;
  const numStr = match[0];
  const [intPart, decPart] = numStr.split('.');
  return {
    prefix: target.slice(0, match.index),
    suffix: target.slice(match.index + numStr.length),
    value: parseFloat(numStr),
    decimals: decPart ? decPart.length : 0,
    padWidth: intPart.length,
  };
}

function format(current: number, p: ParsedNumber): string {
  const fixed = current.toFixed(p.decimals);
  const [intStr, decStr] = fixed.split('.');
  return p.prefix + intStr.padStart(p.padWidth, '0') + (decStr ? '.' + decStr : '') + p.suffix;
}

/**
 * Animates the first numeric run inside `target` from 0 the first time `ref`
 * scrolls into view (ease-out cubic, same curve as CountUp), preserving any
 * prefix/suffix text and zero-padding width. Falls back to `target` immediately
 * if it has no numeric portion, or under reduced motion.
 */
export function useCountAnimationText(ref: React.RefObject<Element>, target: string, duration = 1200): string {
  const parsed = React.useMemo(() => parse(target), [target]);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [display, setDisplay] = React.useState(target);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (!parsed || reduced) { setDisplay(target); return; }
    setDisplay(format(0, parsed));
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(parsed.value * eased, parsed));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);

  return display;
}
