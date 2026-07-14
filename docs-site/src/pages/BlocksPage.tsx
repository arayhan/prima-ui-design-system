import React from 'react';
import { SectionHeader } from 'arayhan-design-system';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { BLOCKS } from '../content/blocks-meta';
import { INTERACTIONS } from '../content/interaction-meta';
import { useScrollReveal } from '../motion/hooks';

const GROUPS = [
  { title: 'BLOCKS', items: BLOCKS.map((b) => ({ id: b.id, label: b.name })) },
  { title: 'INTERACTION', items: INTERACTIONS.map((b) => ({ id: b.id, label: b.name })) },
];

export function BlocksPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="BLOCKS" number="003"
        title={'COMPOSED\nSECTIONS'}
        lede="Blocks assemble the core components into page-ready sections — hero, features, stats, blog, contact, footer — plus a set of micro-interaction primitives."
      />
      <Section id="blocks-list">
        <DocLayout groups={GROUPS}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {BLOCKS.map((b) => (
              <Specimen key={b.id} id={b.id} name={b.name} description={b.description} snippet={b.snippet} props={b.props} block>
                {b.render()}
              </Specimen>
            ))}
            <div data-reveal>
              <SectionHeader
                eyebrow="INTERACTION" number="003.5" title="Micro-interactions"
                description="Small moments of motion — magnetic pull, 3D tilt, counting figures, scroll reveals. Pure React and CSS on the system easing; every one is inert under reduced motion, and the library still ships zero animation dependencies."
              />
            </div>
            {INTERACTIONS.map((b) => (
              <Specimen key={b.id} id={b.id} name={b.name} description={b.description} snippet={b.snippet} props={b.props} block={b.block}>
                {b.render()}
              </Specimen>
            ))}
          </div>
        </DocLayout>
      </Section>
    </div>
  );
}
