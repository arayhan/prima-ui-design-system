import React from 'react';
import { Application, Graphics } from 'pixi.js';
import { PixiTrailFallback } from './PixiTrailFallback';

const COBALT = 0x1b44f0; // --primary
const NODE_COUNT = 18;
const EASE = 0.32;

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * A chain of circles that trails the pointer with a cascading delay —
 * each node eases toward the previous node's last position, shrinking
 * and fading along the chain — pixi.js Graphics on a WebGL renderer.
 * Eases back to center on pointer leave. Static fallback under reduced
 * motion or without WebGL. Pauses off-screen via the shared ticker.
 */
export default function PixiTrail() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(() => !webglAvailable());

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount || failed) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let ready = false;
    let teardown: (() => void) | null = null;
    const app = new Application();

    const nodes = Array.from({ length: NODE_COUNT }, () => ({ x: 0, y: 0, targetX: 0, targetY: 0 }));
    const graphics: Graphics[] = [];

    app.init({
      backgroundAlpha: 0,
      antialias: true,
      resizeTo: mount,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true,
      preference: 'webgl',
    }).then(() => {
      if (disposed) { app.destroy(true, { children: true }); return; }
      ready = true;
      mount.appendChild(app.canvas);

      const cx = mount.clientWidth / 2;
      const cy = mount.clientHeight / 2;
      nodes.forEach((n) => { n.x = cx; n.y = cy; n.targetX = cx; n.targetY = cy; });

      for (let i = 0; i < NODE_COUNT; i++) {
        const t = i / (NODE_COUNT - 1);
        const g = new Graphics();
        g.circle(0, 0, 7 - t * 5.5).fill({ color: COBALT, alpha: 1 - t * 0.8 });
        g.position.set(cx, cy);
        app.stage.addChild(g);
        graphics.push(g);
      }

      const onPointerMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        nodes[0].targetX = e.clientX - rect.left;
        nodes[0].targetY = e.clientY - rect.top;
      };
      const onPointerLeave = () => {
        nodes[0].targetX = mount.clientWidth / 2;
        nodes[0].targetY = mount.clientHeight / 2;
      };

      const tick = () => {
        nodes[0].x += (nodes[0].targetX - nodes[0].x) * EASE;
        nodes[0].y += (nodes[0].targetY - nodes[0].y) * EASE;
        for (let i = 1; i < NODE_COUNT; i++) {
          nodes[i].x += (nodes[i - 1].x - nodes[i].x) * EASE;
          nodes[i].y += (nodes[i - 1].y - nodes[i].y) * EASE;
        }
        nodes.forEach((n, i) => graphics[i].position.set(n.x, n.y));
      };

      let io: IntersectionObserver | null = null;
      let onVisibility: (() => void) | null = null;

      if (reduced) {
        app.ticker.stop();
      } else {
        mount.addEventListener('pointermove', onPointerMove);
        mount.addEventListener('pointerleave', onPointerLeave);
        app.ticker.add(tick);

        io = new IntersectionObserver(([entry]) => {
          const visible = entry.isIntersecting && !document.hidden;
          if (visible) app.ticker.start(); else app.ticker.stop();
        });
        io.observe(mount);
        onVisibility = () => {
          if (document.hidden) app.ticker.stop(); else app.ticker.start();
        };
        document.addEventListener('visibilitychange', onVisibility);
      }

      teardown = () => {
        io?.disconnect();
        if (onVisibility) document.removeEventListener('visibilitychange', onVisibility);
        mount.removeEventListener('pointermove', onPointerMove);
        mount.removeEventListener('pointerleave', onPointerLeave);
        if (app.canvas.parentNode === mount) mount.removeChild(app.canvas);
        app.destroy(true, { children: true });
      };
    }).catch(() => setFailed(true));

    return () => {
      disposed = true;
      if (ready) teardown?.();
    };
  }, [failed]);

  return (
    <div style={{ position: 'relative', height: 260, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-width) solid var(--border)', background: 'var(--surface)' }}>
      {failed ? (
        <PixiTrailFallback />
      ) : (
        <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', left: 'var(--space-3)', bottom: 'var(--space-3)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
          pointerEvents: 'none',
        } as React.CSSProperties}
      >Move the pointer</span>
    </div>
  );
}
