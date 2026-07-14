import { CountUp, MagneticButton, RevealOnScroll, TiltCard } from 'arayhan-design-system';
import type { DocMeta } from './forms-meta';

export const INTERACTIONS: DocMeta[] = [
  {
    id: 'magnetic-button',
    name: 'MagneticButton',
    description: 'The Button eases toward the pointer (a few px) and springs back on leave. Pointer-fine devices only; inert under reduced motion. Pure CSS transitions — the library ships no animation dependency.',
    snippet: `import { MagneticButton } from 'arayhan-design-system';

<MagneticButton icon="→" href="https://arayhan.com" strength={8}>
  Start a project
</MagneticButton>`,
    props: [
      { name: 'strength', type: 'number', default: '8', description: 'Maximum pull toward the pointer in px.' },
      { name: '…ButtonProps', type: '—', description: 'Everything Button takes: variant, href, icon, onClick…' },
    ],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', padding: 'var(--space-4)' }}>
        <MagneticButton icon="→">Start a project</MagneticButton>
        <MagneticButton variant="secondary" strength={12}>Stronger pull</MagneticButton>
      </div>
    ),
  },
  {
    id: 'tilt-card',
    name: 'TiltCard',
    description: 'A hairline card that tilts in 3D toward the pointer and settles back on leave, gaining a faint cobalt glow at full tilt. Pointer-fine only; inert under reduced motion.',
    snippet: `import { TiltCard } from 'arayhan-design-system';

<TiltCard maxTilt={8}>
  <h3>Realtime infrastructure</h3>
  <p>Move the pointer around this card.</p>
</TiltCard>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Card content.' },
      { name: 'maxTilt', type: 'number', default: '8', description: 'Maximum tilt in degrees.' },
    ],
    render: () => (
      <div style={{ width: 340, maxWidth: '100%' }}>
        <TiltCard>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
          }}>// 001</span>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', textTransform: 'uppercase',
            margin: 'var(--space-3) 0 var(--space-2)',
          }}>Tilt me</h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)', margin: 0,
          }}>Move the pointer around this card — it follows in 3D and settles back when you leave.</p>
        </TiltCard>
      </div>
    ),
  },
  {
    id: 'count-up',
    name: 'CountUp',
    description: 'A Clash Display figure that counts from zero the first time it scrolls into view, easing out. Renders the final value immediately under reduced motion.',
    snippet: `import { CountUp } from 'arayhan-design-system';

<CountUp value={48} suffix="+" label="Components" />
<CountUp value={99.9} suffix="%" decimals={1} label="Uptime" />`,
    props: [
      { name: 'value', type: 'number', description: 'Target number.' },
      { name: 'prefix / suffix', type: 'string', description: 'Text around the number — e.g. "+", "%".' },
      { name: 'label', type: 'string', description: 'Mono caption under the value.' },
      { name: 'duration', type: 'number', default: '1200', description: 'Animation length in ms.' },
      { name: 'decimals', type: 'number', default: '0', description: 'Decimal places.' },
    ],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
        <CountUp value={48} suffix="+" label="Components" />
        <CountUp value={99.9} suffix="%" decimals={1} label="Uptime" />
        <CountUp value={12} label="Years of craft" />
      </div>
    ),
  },
  {
    id: 'reveal-on-scroll',
    name: 'RevealOnScroll',
    description: 'Wraps content that rises and fades in the first time it enters the viewport — the system easing at the reveal duration. Stagger siblings with increasing delay. Content stays visible under reduced motion.',
    snippet: `import { RevealOnScroll } from 'arayhan-design-system';

<RevealOnScroll><Card>First</Card></RevealOnScroll>
<RevealOnScroll delay={80}><Card>Second</Card></RevealOnScroll>
<RevealOnScroll delay={160}><Card>Third</Card></RevealOnScroll>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Content to reveal.' },
      { name: 'delay', type: 'number', default: '0', description: 'Delay in ms — stagger siblings with 0/80/160…' },
      { name: 'distance', type: 'number', default: '24', description: 'Rise distance in px.' },
    ],
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', width: '100%' }}>
        {['ONE', 'TWO', 'THREE'].map((n, i) => (
          <RevealOnScroll key={n} delay={i * 80}>
            <div style={{
              padding: 'var(--space-5)', background: 'var(--surface)',
              border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
            }}>// {n}</div>
          </RevealOnScroll>
        ))}
      </div>
    ),
    block: true,
  },
];
