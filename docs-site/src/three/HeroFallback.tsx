/** Static SVG fallback for the hero scene — no WebGL / reduced motion.
 *  An isometric cobalt line grid, the same motif the live scene animates. */
export function HeroFallback() {
  const lines: JSX.Element[] = [];
  const N = 10;
  const size = 420;
  const step = size / N;
  for (let i = 0; i <= N; i++) {
    const p = i * step;
    lines.push(<line key={`h${i}`} x1={0} y1={p} x2={size} y2={p} />);
    lines.push(<line key={`v${i}`} x1={p} y1={0} x2={p} y2={size} />);
  }
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Isometric cobalt grid"
      style={{ width: '100%', height: '100%', display: 'block', transform: 'rotateX(55deg) rotateZ(45deg)', transformOrigin: 'center' }}
    >
      <g stroke="#1B44F0" strokeWidth="1" opacity="0.5" fill="none">{lines}</g>
      <circle cx={size / 2} cy={size / 2} r={5} fill="#1B44F0" />
    </svg>
  );
}
