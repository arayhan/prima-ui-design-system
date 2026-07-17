/** Static SVG fallback — a fading chain of cobalt dots, no WebGL / reduced motion. */

const NODES = 18;

export function PixiTrailFallback() {
  const dots = Array.from({ length: NODES }, (_, i) => {
    const t = i / (NODES - 1);
    return {
      cx: 60 + t * 280,
      cy: 112 + Math.sin(t * Math.PI * 1.4) * 46,
      r: 7 - t * 5.5,
      opacity: 1 - t * 0.8,
    };
  });
  return (
    <svg viewBox="0 0 400 225" role="img" aria-label="Static fading chain of cobalt dots" style={{ width: '100%', height: '100%', display: 'block' }}>
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#1B44F0" fillOpacity={d.opacity} />)}
    </svg>
  );
}
