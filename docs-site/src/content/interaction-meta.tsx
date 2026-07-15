import React from 'react';
import {
  Button, CountUp, MagicBorder, MagneticButton, RevealOnScroll, Ripple,
  ScrollProgress, Spotlight, TextScramble, TiltCard,
} from 'prima-ui';
import type { DocMeta } from './forms-meta';

function ScrollProgressDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <div style={{ position: 'relative' }}>
        <ScrollProgress container={containerRef as React.RefObject<HTMLElement>} />
        <div
          ref={containerRef}
          style={{
            height: 160, overflowY: 'auto', marginTop: 3,
            border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
          }}
        >
          {['One', 'Two', 'Three', 'Four', 'Five'].map((n) => (
            <p key={n} style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)',
              lineHeight: 'var(--leading-body)', margin: 0,
            }}>Paragraph {n} — scroll this box to fill the bar above it.</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export const INTERACTIONS: DocMeta[] = [
  {
    id: 'magnetic-button',
    name: 'MagneticButton',
    description: 'The Button eases toward the pointer (a few px) and springs back on leave. Pointer-fine devices only; inert under reduced motion. Pure CSS transitions — the library ships no animation dependency.',
    snippet: `import { MagneticButton } from 'prima-ui';

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
    snippet: `import { TiltCard } from 'prima-ui';

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
    snippet: `import { CountUp } from 'prima-ui';

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
    snippet: `import { RevealOnScroll } from 'prima-ui';

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
  {
    id: 'magic-border',
    name: 'MagicBorder',
    description: 'A cobalt conic-gradient ring that continuously rotates behind a clipped surface — wrap any card or panel to give it a "live" edge. Pure CSS keyframes; freezes under reduced motion.',
    snippet: `import { MagicBorder } from 'prima-ui';

<MagicBorder>
  <div style={{ padding: 24 }}>Always-on accent</div>
</MagicBorder>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Wrapped content.' },
      { name: 'thickness', type: 'number', default: '2', description: 'Ring thickness in px.' },
      { name: 'speed', type: 'number', default: '3.5', description: 'Seconds per revolution.' },
      { name: 'radius', type: 'string', default: "'var(--radius-md)'", description: 'Corner radius.' },
    ],
    render: () => (
      <div style={{ width: 280, maxWidth: '100%' }}>
        <MagicBorder>
          <div style={{ padding: 'var(--space-6)' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
              letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
            }}>// ALWAYS ON</span>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', textTransform: 'uppercase',
              margin: 'var(--space-3) 0 0',
            }}>Magic border</h3>
          </div>
        </MagicBorder>
      </div>
    ),
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A cobalt radial glow that follows the pointer inside a hairline card. Pointer-fine devices only.',
    snippet: `import { Spotlight } from 'prima-ui';

<Spotlight size={260}>
  <h3>Move your cursor</h3>
  <p>The glow tracks the pointer.</p>
</Spotlight>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Card content.' },
      { name: 'size', type: 'number', default: '260', description: 'Spotlight diameter in px.' },
    ],
    render: () => (
      <div style={{ width: 320, maxWidth: '100%' }}>
        <Spotlight>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)', color: 'var(--primary)',
          }}>// 002</span>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', textTransform: 'uppercase',
            margin: 'var(--space-3) 0 var(--space-2)',
          }}>Move your cursor</h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-body)', margin: 0,
          }}>The glow tracks the pointer across the card.</p>
        </Spotlight>
      </div>
    ),
  },
  {
    id: 'ripple',
    name: 'Ripple',
    description: 'Wraps a click target with an expanding, fading ripple from the pointer-down point. A no-op wrapper under reduced motion.',
    snippet: `import { Ripple, Button } from 'prima-ui';

<Ripple>
  <Button variant="secondary">Click me</Button>
</Ripple>`,
    props: [
      { name: 'children', type: 'ReactElement', description: 'A single clickable element, typically Button.' },
      { name: 'color', type: 'string', default: "'var(--primary-ring)'", description: 'Ripple fill.' },
    ],
    render: () => (
      <div style={{ padding: 'var(--space-4)' }}>
        <Ripple>
          <Button variant="secondary">Click me</Button>
        </Ripple>
      </div>
    ),
  },
  {
    id: 'text-scramble',
    name: 'TextScramble',
    description: 'Mono characters cycle randomly before resolving left-to-right into the real text, once on scroll-into-view (or on hover). Shows the final text immediately under reduced motion.',
    snippet: `import { TextScramble } from 'prima-ui';

<TextScramble text="ENGINEERED MINIMALISM" onHover />`,
    props: [
      { name: 'text', type: 'string', description: 'Target text.' },
      { name: 'duration', type: 'number', default: '900', description: 'Scramble length in ms.' },
      { name: 'onHover', type: 'boolean', default: 'false', description: 'Trigger on hover instead of scroll-into-view.' },
    ],
    render: () => (
      <div style={{ padding: 'var(--space-4)' }}>
        <TextScramble text="HOVER TO SCRAMBLE" onHover style={{ fontSize: 'var(--text-h3)', color: 'var(--on-surface)' }} />
      </div>
    ),
  },
  {
    id: 'scroll-progress',
    name: 'ScrollProgress',
    description: 'A cobalt bar that fills as the page (or a given container) scrolls. Defaults to fixed-at-top for page-level use; pass a `container` ref to scope it to a scrollable box instead.',
    snippet: `import { ScrollProgress } from 'prima-ui';

// Page-level (mount once near the app root):
<ScrollProgress />

// Scoped to a scrollable container:
<ScrollProgress container={panelRef} style={{ position: 'absolute' }} />`,
    props: [
      { name: 'height', type: 'number', default: '3', description: 'Bar height in px.' },
      { name: 'container', type: 'RefObject<HTMLElement>', description: 'Tracks this element\'s scroll instead of the page.' },
    ],
    render: () => <ScrollProgressDemo />,
    block: true,
  },
];
