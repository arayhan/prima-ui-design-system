import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { SectionSidebar } from '../components/SectionSidebar';
import { BLOCKS } from '../content/blocks-meta';
import { useScrollReveal } from '../motion/hooks';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CATEGORY_ITEMS = [
  { label: 'Sections', to: '/blocks' },
  { label: 'Interactions', to: '/blocks/interactions' },
];

const GROUPS = [{ title: 'BLOCKS', items: BLOCKS.map((b) => ({ id: b.id, label: b.name })) }];

export function BlocksPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);
  const wide = useMediaQuery('(min-width: 1024px)');

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="BLOCKS" number="003"
        title={'COMPOSED\nSECTIONS'}
        lede="Blocks assemble the core components into page-ready sections — hero, features, stats, blog, contact, footer."
      />
      <Section id="blocks-list">
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
                {BLOCKS.map((b) => (
                  <Specimen key={b.id} id={b.id} name={b.name} description={b.description} snippet={b.snippet} props={b.props} block>
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
