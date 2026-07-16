import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { DISPLAY } from '../content/display-meta';
import { useScrollReveal } from '../motion/hooks';

const CATEGORY_ITEMS = [
  { label: 'Core', to: '/components/core' },
  { label: 'Forms', to: '/components/forms' },
  { label: 'Overlays', to: '/components/overlays' },
  { label: 'Display', to: '/components/display' },
];

const GROUPS = [{ title: 'DISPLAY', items: DISPLAY.map((c) => ({ id: c.id, label: c.name })) }];

export function DisplayPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="COMPONENTS" number="002.4"
        title={'DISPLAY\n& DATA'}
        lede="Content and data presentation — avatars, media, chat, accordions, carousels, tables, charts, prose, and the empty/error states."
      />
      <Section id="display-list">
        <div data-reveal style={{ marginBottom: 'var(--space-7)' }}>
          <CategoryNav items={CATEGORY_ITEMS} />
        </div>
        <DocLayout groups={GROUPS}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {DISPLAY.map((c) => (
              <Specimen key={c.id} id={c.id} name={c.name} description={c.description} snippet={c.snippet} props={c.props} block={c.block}>
                {c.render()}
              </Specimen>
            ))}
          </div>
        </DocLayout>
      </Section>
    </div>
  );
}
