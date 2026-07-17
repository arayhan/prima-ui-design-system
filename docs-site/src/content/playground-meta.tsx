import React from 'react';
import type { PropMeta } from '../components/PropsTable';
import { ThreeParticleFieldFallback } from '../playground/ThreeParticleFieldFallback';

const ThreeParticleField = React.lazy(() => import('../playground/ThreeParticleField'));

function ThreeParticleFieldDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <React.Suspense fallback={<div style={{ height: 260 }}><ThreeParticleFieldFallback /></div>}>
        <ThreeParticleField />
      </React.Suspense>
    </div>
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
];
