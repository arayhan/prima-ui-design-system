import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { INTERACTIONS } from '../content/interaction-meta';
import { useScrollReveal } from '../motion/hooks';

const CATEGORY_ITEMS = [
  { label: 'Sections', to: '/blocks' },
  { label: 'Interactions', to: '/blocks/interactions' },
];

const GROUPS = [{ title: 'INTERACTION', items: INTERACTIONS.map((b) => ({ id: b.id, label: b.name })) }];

export function InteractionsPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="BLOCKS" number="003.5"
        title={'MICRO-\nINTERACTIONS'}
        lede="Small moments of motion — magnetic pull, 3D tilt, counting figures, scroll reveals. Pure React and CSS on the system easing; every one is inert under reduced motion, and the library still ships zero animation dependencies."
      />
      <Section id="interactions-list">
        <div data-reveal style={{ marginBottom: 'var(--space-7)' }}>
          <CategoryNav items={CATEGORY_ITEMS} />
        </div>
        <DocLayout groups={GROUPS}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
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
