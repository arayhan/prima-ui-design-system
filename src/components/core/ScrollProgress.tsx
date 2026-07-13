import React from 'react';

export interface ScrollProgressProps {
  /** Ref to a scrollable element; defaults to the window */
  target?: { current: HTMLElement | null };
  /** Bar height in px, default 3 */
  height?: number;
}

export function ScrollProgress({ target, height = 3 }: ScrollProgressProps) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = target && target.current ? target.current : null;
    const scroller: HTMLElement | Window = el || window;
    const read = () => {
      const max = el
        ? el.scrollHeight - el.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const top = el ? el.scrollTop : window.scrollY;
      setP(max > 0 ? Math.min(1, top / max) : 0);
    };
    read();
    scroller.addEventListener('scroll', read, { passive: true });
    return () => scroller.removeEventListener('scroll', read);
  }, [target]);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height, zIndex: 100, pointerEvents: 'none' }}>
      <div style={{
        height: '100%', width: (p * 100) + '%', background: 'var(--accent)',
        borderRadius: '0 2px 2px 0', transition: 'width 80ms linear',
      }}></div>
    </div>
  );
}
