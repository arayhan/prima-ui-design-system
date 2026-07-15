import React from 'react';
import * as THREE from 'three';
import { IsometricFallback } from './IsometricFallback';

const COBALT = 0x1b44f0; // --primary

interface BoxSpec { x: number; z: number; h: number; phase: number }

const BOXES: BoxSpec[] = [
  { x: -2, z: 0, h: 1, phase: 0 },
  { x: -1, z: 0, h: 2, phase: 0.8 },
  { x: -0.5, z: 1, h: 1.4, phase: 1.6 },
  { x: 0, z: 0, h: 3, phase: 2.4 },
  { x: 0.5, z: 1, h: 1.8, phase: 3.2 },
  { x: 1, z: 0, h: 2, phase: 4.0 },
  { x: 1.5, z: 1, h: 1.2, phase: 4.8 },
  { x: 2, z: 0, h: 1, phase: 5.6 },
];

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * A true isometric-projection (orthographic camera, camera on the cube
 * diagonal) wireframe cluster of cobalt blocks — a small abstract "stack of
 * blocks," echoing the design system's own Blocks page. Gentle per-box bob,
 * a slow turntable spin, and a few degrees of pointer-parallax nod. Renders a
 * single static frame under reduced motion; falls back to SVG without WebGL.
 * Pauses off-screen, same lifecycle as HeroScene.
 */
export default function IsometricScene() {
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
    const group = new THREE.Group();
    scene.add(group);

    const camSize = 3.4;
    const camera = new THREE.OrthographicCamera(-camSize, camSize, camSize, -camSize, 0.1, 100);
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);

    const boxes = BOXES.map((spec) => {
      const geo = new THREE.BoxGeometry(0.85, spec.h, 0.85);
      const line = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: COBALT, transparent: true, opacity: 0.55 }),
      );
      line.position.set(spec.x, spec.h / 2, spec.z);
      group.add(line);
      geo.dispose();
      return { line, spec, baseY: spec.h / 2 };
    });

    let targetTilt = 0, curTilt = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetTilt = ((e.clientY - rect.top) / rect.height - 0.5) * 0.25;
    };
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.left = -camSize * aspect;
      camera.right = camSize * aspect;
      camera.top = camSize;
      camera.bottom = -camSize;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) renderer.render(scene, camera); });
    ro.observe(mount);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const frame = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.15;
      curTilt += (targetTilt - curTilt) * 0.05;
      group.rotation.x = curTilt;
      boxes.forEach(({ line, spec, baseY }) => {
        line.position.y = baseY + Math.sin(t * 0.6 + spec.phase) * 0.03;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      group.rotation.y = 0.5;
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
      window.removeEventListener('pointermove', onPointer);
      boxes.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [failed]);

  if (failed) return <IsometricFallback />;
  return <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />;
}
