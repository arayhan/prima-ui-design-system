import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Prima motion constants — mirror src/tokens/spacing.css. No foreign easings. */
export const EASE_SPATIAL = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const DUR_FAST = 0.15;
export const DUR_BASE = 0.25;
export const DUR_REVEAL = 0.8;

/** Media query GSAP animations are gated behind. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

gsap.defaults({ ease: EASE_SPATIAL, duration: DUR_BASE });

export { gsap, ScrollTrigger, useGSAP };
