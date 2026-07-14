import React from 'react';
import { gsap, useGSAP, DUR_REVEAL, MOTION_OK } from './gsap';

/** True when the user prefers reduced motion (live-updates on change). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Staggered line reveal for elements marked `data-reveal-line` inside the scope.
 * The page's one orchestrated 800ms moment — used by the hero.
 */
export function useLineReveal(scope: React.RefObject<HTMLElement>, delay = 0) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-reveal-line]',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: DUR_REVEAL, stagger: 0.09, delay },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/**
 * Scroll-triggered rise+fade for elements marked `data-reveal` inside the scope.
 * Each element animates when it enters the viewport; staggers siblings slightly.
 */
export function useScrollReveal(scope: React.RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0, opacity: 1, duration: DUR_REVEAL * 0.75, delay: (i % 4) * 0.06,
              // Clear the residual transform once done — a leftover transform makes
              // each specimen a stacking context, so popovers inside one would be
              // painted over by later siblings.
              clearProps: 'transform,opacity',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/**
 * Magnetic hover — the element eases toward the pointer (≤ maxShift px) and snaps
 * back on leave. Pointer-fine devices only; inert under reduced motion.
 */
export function useMagnetic(ref: React.RefObject<HTMLElement>, maxShift = 8) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      xTo(Math.max(-1, Math.min(1, dx)) * maxShift);
      yTo(Math.max(-1, Math.min(1, dy)) * maxShift);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, maxShift]);
}
