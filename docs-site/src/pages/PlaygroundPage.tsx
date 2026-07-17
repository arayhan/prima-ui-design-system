import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { SectionSidebar } from '../components/SectionSidebar';
import { PLAYGROUND } from '../content/playground-meta';
import { useScrollReveal } from '../motion/hooks';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CATEGORY_ITEMS = [
  { label: 'Sections', to: '/blocks' },
  { label: 'Interactions', to: '/blocks/interactions' },
  { label: 'Playground', to: '/blocks/playground' },
];

const GROUPS = [{ title: 'PLAYGROUND', items: PLAYGROUND.map((b) => ({ id: b.id, label: b.name })) }];

export function PlaygroundPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);
  const wide = useMediaQuery('(min-width: 1024px)');

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="BLOCKS" number="003.6"
        title={'MOTION\nPLAYGROUND'}
        lede="A few heavier microinteractions built on real animation libraries — three.js, anime.js, Theatre.js, pixi.js. These live in the docs site only; the published package still ships zero animation dependencies."
      />
      <Section id="playground-list">
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
                {PLAYGROUND.map((b) => (
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
