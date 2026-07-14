import React from 'react';
import * as THREE from 'three';
import { HeroFallback } from './HeroFallback';

const COBALT = 0x1b44f0; // --primary
const INK = 0x0f1116;    // --on-surface

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The hero's WebGL moment: a cobalt wireframe terrain of drifting waves with a
 * scatter of ink particles, on a transparent canvas over the ice background.
 * Pointer parallax tilts the camera a few degrees. Renders a single static frame
 * under reduced motion; falls back to SVG without WebGL. Pauses off-screen.
 */
export default function HeroScene() {
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
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 2.1, 5.2);
    camera.lookAt(0, 0, 0);

    // Wireframe wave terrain — the cobalt motif.
    const SEG = 44;
    const plane = new THREE.PlaneGeometry(9, 9, SEG, SEG);
    plane.rotateX(-Math.PI / 2);
    const basePos = (plane.attributes.position.array as Float32Array).slice();
    const terrain = new THREE.LineSegments(
      new THREE.WireframeGeometry(plane),
      new THREE.LineBasicMaterial({ color: COBALT, transparent: true, opacity: 0.34 }),
    );
    scene.add(terrain);

    // Ink particle scatter above the terrain.
    const COUNT = 320;
    const pts = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 8;
      pts[i * 3 + 1] = Math.random() * 2.2 + 0.2;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: INK, size: 0.035, transparent: true, opacity: 0.5 }),
    );
    scene.add(particles);

    const wavePositions = terrain.geometry.attributes.position;
    const waveBase = (wavePositions.array as Float32Array).slice();
    void basePos;

    const displace = (t: number) => {
      const arr = wavePositions.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const x = waveBase[i];
        const z = waveBase[i + 2];
        arr[i + 1] = waveBase[i + 1]
          + Math.sin(x * 0.9 + t) * 0.22
          + Math.cos(z * 1.1 + t * 0.8) * 0.18;
      }
      wavePositions.needsUpdate = true;
    };

    // Pointer parallax — a few degrees of tilt, eased.
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.15;
    };
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
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
      const t = clock.getElapsedTime() * 0.7;
      displace(t);
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;
      scene.rotation.y = curX;
      scene.rotation.x = curY;
      particles.rotation.y = t * 0.03;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      // One static frame — the composition without the motion.
      displace(1.4);
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // Pause when off-screen or tab hidden.
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && !document.hidden;
      if (visible && !running && !reduced) { running = true; clock.start(); raf = requestAnimationFrame(frame); }
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
      terrain.geometry.dispose();
      (terrain.material as THREE.Material).dispose();
      plane.dispose();
      particleGeo.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [failed]);

  if (failed) return <HeroFallback />;
  return <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />;
}
