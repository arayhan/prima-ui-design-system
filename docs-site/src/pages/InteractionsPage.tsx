import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { SectionSidebar } from '../components/SectionSidebar';
import { INTERACTIONS } from '../content/interaction-meta';
import { useScrollReveal } from '../motion/hooks';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CATEGORY_ITEMS = [
  { label: 'Sections', to: '/blocks' },
  { label: 'Interactions', to: '/blocks/interactions' },
];

const GROUPS = [{ title: 'INTERACTION', items: INTERACTIONS.map((b) => ({ id: b.id, label: b.name })) }];

export function InteractionsPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);
  const wide = useMediaQuery('(min-width: 1024px)');

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="BLOCKS" number="003.5"
        title={'MICRO-\nINTERACTIONS'}
        lede="Small moments of motion — magnetic pull, 3D tilt, counting figures, scroll reveals. Pure React and CSS on the system easing; every one is inert under reduced motion, and the library still ships zero animation dependencies."
      />
      <Section id="interactions-list">
        {!wide && (
          <div data-reveal style={{ marginBottom: 'var(--space-7)' }}>
            <CategoryNav items={CATEGORY_ITEMS} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'flex-start' }}>
          {wide && <SectionSidebar />}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <DocLayout groups={GROUPS}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                {INTERACTIONS.map((b) => (
                  <Specimen key={b.id} id={b.id} name={b.name} description={b.description} snippet={b.snippet} props={b.props} block={b.block}>
                    {b.render()}
                  </Specimen>
                ))}
              </div>
            </DocLayout>
          </div>
        </div>
      </Section>
    </div>
  );
}
