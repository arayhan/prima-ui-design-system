import React from 'react';

export interface ScrollProgressProps {
  /** Bar height in px. Default 3. */
  height?: number;
  /** Track a scrollable element instead of the whole page. */
  container?: React.RefObject<HTMLElement>;
  style?: React.CSSProperties;
}

/**
 * Prima scroll progress — a cobalt bar that fills as the page (or a given
 * `container`) scrolls. Position defaults to fixed-at-top for page-level use;
 * pass `style={{ position: 'absolute' }}` to scope it to a container instead.
 * The fill still tracks scroll under reduced motion — it's a position
 * indicator, not decoration.
 */
export function ScrollProgress({ height = 3, container, style }: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    const target: HTMLElement | Window = container?.current ?? window;
    let raf = 0;

    const read = () => {
      if (container?.current) {
        const el = container.current;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      } else {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
      }
      raf = 0;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    target.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [container]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: container ? 'absolute' : 'fixed', top: 0, left: 0, right: 0, height, zIndex: 100,
        ...style,
      }}
    >
      <div style={{
        height: '100%', width: `${progress * 100}%`, background: 'var(--primary)',
        transition: reduced ? 'none' : 'width 80ms linear',
      }} />
    </div>
  );
}
