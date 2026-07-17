/** Static SVG dot grid — shown when WebGL is unavailable or motion is reduced. */

const COLS = 16;
const ROWS = 9;

export function ThreeParticleFieldFallback() {
  const dots: { cx: number; cy: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dots.push({ cx: (c + 0.5) * (400 / COLS), cy: (r + 0.5) * (225 / ROWS) });
    }
  }
  return (
    <svg viewBox="0 0 400 225" role="img" aria-label="Static grid of cobalt dots" style={{ width: '100%', height: '100%', display: 'block' }}>
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={2} fill="#1B44F0" fillOpacity={0.45} />)}
    </svg>
  );
}
