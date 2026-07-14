import { SectionHeader, FeatureGrid, StatStrip } from 'arayhan-design-system';
import { Section } from '../components/Section';

/** The Prima principles — what "engineered minimalism" actually means. */
export function ManifestoSection() {
  return (
    <Section id="manifesto">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
        <div data-reveal>
          <SectionHeader
            eyebrow="MANIFESTO" number="001" title="Engineered minimalism"
            description="Prima is opinionated on purpose. Four rules decide almost every visual call, so pages come out sharp without debate."
          />
        </div>
        <div data-reveal>
          <FeatureGrid columns={2} items={[
            { icon: 'ph ph-drop', title: 'One accent', description: 'Electric cobalt #1B44F0 is the only decorative color. Every neutral is blue-tinted — a warm gray is a bug. No second accent, no gradients.' },
            { icon: 'ph ph-text-aa', title: 'Type does the talking', description: 'Clash Display ALL CAPS for display and headings (never below 18px, never body). Inter for reading. JetBrains Mono for eyebrows, labels, and code — the engineer’s fingerprint.' },
            { icon: 'ph ph-ruler', title: 'Neo-brutalism lite', description: 'Structure is shown, not implied: 1.5px hairlines, 2px interactive borders, 3px section rules. Medium radii (8/12/16) keep it soft. Never 0px, never more than 16px.' },
            { icon: 'ph ph-stack', title: 'Flat by default', description: 'Hairlines and surface contrast do the work; one soft shadow for floating elements only. Depth comes from color-block surfaces — ice, ink, cobalt — not shadows.' },
          ]} />
        </div>
        <div data-reveal>
          <StatStrip stats={[
            { value: '48', label: 'Components' },
            { value: '1', label: 'Accent color' },
            { value: '3', label: 'Typefaces' },
            { value: '8pt', label: 'Spacing grid' },
          ]} />
        </div>
      </div>
    </Section>
  );
}
