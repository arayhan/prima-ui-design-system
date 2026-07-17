import React from 'react';
import * as THREE from 'three';
import { ThreeParticleFieldFallback } from './ThreeParticleFieldFallback';

const COBALT = 0x1b44f0; // --primary
const COLS = 22;
const ROWS = 13;
const SPACING = 0.42;

const REPEL_RADIUS = 1.6;
const REPEL_STRENGTH = 26;
const BURST_RADIUS = 2.4;
const BURST_STRENGTH = 7;
const SPRING_K = 55;
const DAMPING = 0.9;

interface Particle { baseX: number; baseY: number; ox: number; oy: number; vx: number; vy: number }

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * A grid of cobalt points that spring away from the pointer and burst
 * outward on click — three.js Points + a lightweight spring simulation
 * (no physics library). Static grid under reduced motion; SVG fallback
 * without WebGL. Pauses off-screen, same lifecycle as IsometricScene.
 */
export default function ThreeParticleField() {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(() => !webglAvailable());

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount || failed) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camSize = 3.2;
    const camera = new THREE.OrthographicCamera(-camSize, camSize, camSize, -camSize, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const particles: Particle[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        particles.push({
          baseX: (c - (COLS - 1) / 2) * SPACING,
          baseY: (r - (ROWS - 1) / 2) * SPACING,
          ox: 0, oy: 0, vx: 0, vy: 0,
        });
      }
    }

    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.baseX;
      positions[i * 3 + 1] = p.baseY;
      positions[i * 3 + 2] = 0;
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: COBALT, size: 0.06, transparent: true, opacity: 0.75 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let halfW = camSize;
    let halfH = camSize;
    const pointer = { x: 0, y: 0, active: false };

    const toWorld = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      const nx = (clientX - rect.left) / rect.width * 2 - 1;
      const ny = -((clientY - rect.top) / rect.height * 2 - 1);
      return { x: nx * halfW, y: ny * halfH };
    };

    const onPointerMove = (e: PointerEvent) => {
      const w = toWorld(e.clientX, e.clientY);
      pointer.x = w.x; pointer.y = w.y; pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };
    const onClick = (e: PointerEvent) => {
      const w = toWorld(e.clientX, e.clientY);
      particles.forEach((p) => {
        const dx = p.baseX + p.ox - w.x;
        const dy = p.baseY + p.oy - w.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        if (dist < BURST_RADIUS) {
          const push = (1 - dist / BURST_RADIUS) * BURST_STRENGTH;
          p.vx += (dx / dist) * push;
          p.vy += (dy / dist) * push;
        }
      });
    };
    if (!reduced) {
      mount.addEventListener('pointermove', onPointerMove);
      mount.addEventListener('pointerleave', onPointerLeave);
      mount.addEventListener('pointerdown', onClick);
    }

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      halfW = camSize * aspect;
      halfH = camSize;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) renderer.render(scene, camera); });
    ro.observe(mount);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

    const frame = () => {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 1 / 30);
      particles.forEach((p, i) => {
        let fx = -p.ox * SPRING_K;
        let fy = -p.oy * SPRING_K;
        if (pointer.active) {
          const dx = p.baseX + p.ox - pointer.x;
          const dy = p.baseY + p.oy - pointer.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < REPEL_RADIUS) {
            const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            fx += (dx / dist) * push;
            fy += (dy / dist) * push;
          }
        }
        p.vx = (p.vx + fx * dt) * DAMPING;
        p.vy = (p.vy + fy * dt) * DAMPING;
        p.ox += p.vx * dt;
        p.oy += p.vy * dt;
        posAttr.setXY(i, p.baseX + p.ox, p.baseY + p.oy);
      });
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !document.hidden;
      if (visible && !running && !reduced) { running = true; raf = requestAnimationFrame(frame); }
      if (!visible && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(mount);
    const onVisibility = () => {
      if (document.hidden && running) { running = false; cancelAnimationFrame(raf); }
      else if (!document.hidden && !running && !reduced) { running = true; raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      mount.removeEventListener('pointerdown', onClick);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [failed]);

  return (
    <div style={{ position: 'relative', height: 260, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-width) solid var(--border)', background: 'var(--surface)' }}>
      {failed ? (
        <ThreeParticleFieldFallback />
      ) : (
        <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />
      )}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', left: 'var(--space-3)', bottom: 'var(--space-3)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
          pointerEvents: 'none',
        } as React.CSSProperties}
      >Move · click for a burst</span>
    </div>
  );
}
