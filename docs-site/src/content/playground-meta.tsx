import React from 'react';
import type { PropMeta } from '../components/PropsTable';
import { ThreeParticleFieldFallback } from '../playground/ThreeParticleFieldFallback';

const ThreeParticleField = React.lazy(() => import('../playground/ThreeParticleField'));
const AnimeLikeButton = React.lazy(() => import('../playground/AnimeLikeButton'));
const TheatreScrubber = React.lazy(() => import('../playground/TheatreScrubber'));

function ThreeParticleFieldDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <React.Suspense fallback={<div style={{ height: 260 }}><ThreeParticleFieldFallback /></div>}>
        <ThreeParticleField />
      </React.Suspense>
    </div>
  );
}

function AnimeLikeButtonDemo() {
  return (
    <React.Suspense fallback={<div style={{ height: 44, width: 90 }} />}>
      <AnimeLikeButton />
    </React.Suspense>
  );
}

function TheatreScrubberDemo() {
  return (
    <React.Suspense fallback={<div style={{ height: 120 }} />}>
      <TheatreScrubber />
    </React.Suspense>
  );
}

export interface PlaygroundMeta {
  id: string;
  name: string;
  description: string;
  library: string;
  snippet: string;
  props: PropMeta[];
  render: () => React.ReactNode;
  block?: boolean;
}

export const PLAYGROUND: PlaygroundMeta[] = [
  {
    id: 'playground-three-particles',
    name: 'Particle Field',
    library: 'three.js',
    description: 'A grid of points that spring away from the pointer and burst outward on click — three.js Points driven by a small hand-rolled spring simulation. Static under reduced motion; falls back to a plain SVG dot grid without WebGL.',
    snippet: `import * as THREE from 'three';

// a Points cloud on an orthographic camera; each point
// carries a spring offset that repels from the pointer
// and bursts outward on click, then eases back to rest.`,
    props: [],
    render: () => <ThreeParticleFieldDemo />,
    block: true,
  },
  {
    id: 'playground-anime-like',
    name: 'Like Burst',
    library: 'anime.js',
    description: 'Click to like — the heart pops with an elastic ease and a ring of cobalt particles bursts outward and fades, staggered a few milliseconds apart with anime.js. Skips straight to the end state under reduced motion.',
    snippet: `import { animate, stagger } from 'animejs';

animate(heartFill, {
  opacity: [0, 1], scale: [0.6, 1],
  duration: 480, ease: 'outElastic(1, .6)',
});
animate(particles, {
  translateX: () => \`\${(Math.random() - 0.5) * 100}px\`,
  translateY: () => \`\${-30 - Math.random() * 50}px\`,
  scale: [1, 0], opacity: [1, 0],
  duration: 550, delay: stagger(18),
});`,
    props: [],
    render: () => <AnimeLikeButtonDemo />,
  },
  {
    id: 'playground-theatre-scrubber',
    name: 'Assemble Scrubber',
    library: 'Theatre.js',
    description: 'Three tiles fly in from scattered, rotated, transparent starting poses and assemble into a row — driven by a hand-authored @theatre/core keyframe sequence. Scrub the timeline directly, or press Play to run it.',
    snippet: `import { getProject, types } from '@theatre/core';

const project = getProject('Assemble', { state });
const sheet = project.sheet('Assemble');
const tile = sheet.object('TileA', {
  x: types.number(-150), rotate: types.number(-60),
  opacity: types.number(0, { range: [0, 1] }),
});
tile.onValuesChange((v) => { /* apply v.x, v.rotate, v.opacity */ });

sheet.sequence.position = 0.6;   // scrub
sheet.sequence.play({ range: [0, 1.2] });`,
    props: [],
    render: () => <TheatreScrubberDemo />,
  },
];
