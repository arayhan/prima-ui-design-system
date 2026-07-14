import React from 'react';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  /** Delay before the reveal in ms — stagger siblings with 0/80/160… */
  delay?: number;
  /** Rise distance in px. Default 24. */
  distance?: number;
  style?: React.CSSProperties;
}

/**
 * Prima reveal-on-scroll — wraps content that rises and fades in the first
 * time it enters the viewport, on the system easing at the reveal duration.
 * Pure CSS transition driven by IntersectionObserver; content renders
 * immediately (and stays visible) under reduced motion.
 */
export function RevealOnScroll({ children, delay = 0, distance = 24, style }: RevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity var(--duration-reveal) var(--ease-spatial) ${delay}ms, transform var(--duration-reveal) var(--ease-spatial) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
