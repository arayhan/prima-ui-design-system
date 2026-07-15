/** Static SVG fallback for the isometric scene — no WebGL / reduced motion.
 *  A small cluster of extruded cobalt blocks, drawn as true isometric cubes
 *  (three visible faces per box, shaded top/right/left) — the same "stack of
 *  blocks" motif the live scene animates. */

const SIZE = 34;
const UX = { x: SIZE * 0.866, y: SIZE * 0.5 };
const UY = { x: -SIZE * 0.866, y: SIZE * 0.5 };
const UZ = { x: 0, y: -SIZE };

function project(x: number, y: number, z: number, ox: number, oy: number) {
  return { x: ox + x * UX.x + y * UY.x, y: oy + x * UX.y + y * UY.y + z * UZ.y };
}

function pointsStr(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

interface Box { gx: number; gy: number; h: number }

const BOXES: Box[] = [
  { gx: 0, gy: 0, h: 1 },
  { gx: 1, gy: 0, h: 2 },
  { gx: 1, gy: 1, h: 1.4 },
  { gx: 2, gy: 0, h: 3 },
  { gx: 2, gy: 1, h: 1.8 },
  { gx: 3, gy: 0, h: 2 },
  { gx: 3, gy: 1, h: 1.2 },
  { gx: 4, gy: 0, h: 1 },
].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));

function Cube({ ox, oy, h }: { ox: number; oy: number; h: number }) {
  const top = [project(0, 0, h, ox, oy), project(1, 0, h, ox, oy), project(1, 1, h, ox, oy), project(0, 1, h, ox, oy)];
  const right = [project(1, 0, 0, ox, oy), project(1, 1, 0, ox, oy), project(1, 1, h, ox, oy), project(1, 0, h, ox, oy)];
  const left = [project(0, 1, 0, ox, oy), project(1, 1, 0, ox, oy), project(1, 1, h, ox, oy), project(0, 1, h, ox, oy)];
  return (
    <g stroke="#0C0F16" strokeOpacity={0.18} strokeWidth={1}>
      <polygon points={pointsStr(left)} fill="#1B44F0" fillOpacity={0.35} />
      <polygon points={pointsStr(right)} fill="#1B44F0" fillOpacity={0.55} />
      <polygon points={pointsStr(top)} fill="#1B44F0" fillOpacity={0.85} />
    </g>
  );
}

export function IsometricFallback() {
  const originX = 130;
  const originY = 300;
  return (
    <svg
      viewBox="0 0 420 340" role="img" aria-label="Isometric cluster of cobalt blocks"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {BOXES.map((b, i) => {
        const anchor = project(b.gx, b.gy, 0, originX, originY);
        return <Cube key={i} ox={anchor.x} oy={anchor.y} h={b.h} />;
      })}
    </svg>
  );
}
