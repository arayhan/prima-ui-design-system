import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { COMPONENTS } from '../content/components-meta';
import { useScrollReveal } from '../motion/hooks';

const CATEGORY_ITEMS = [
  { label: 'Core', to: '/components/core' },
  { label: 'Forms', to: '/components/forms' },
  { label: 'Overlays', to: '/components/overlays' },
  { label: 'Display', to: '/components/display' },
];

const GROUPS = [{ title: 'CORE', items: COMPONENTS.map((c) => ({ id: c.id, label: c.name })) }];

export function CorePage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="COMPONENTS" number="002"
        title={'CORE\nATOMS'}
        lede="Eleven typed React functions — buttons, cards, fields — styled inline with token variables. The building blocks everything else composes from."
      />
      <Section id="core-list">
        <div data-reveal style={{ marginBottom: 'var(--space-7)' }}>
          <CategoryNav items={CATEGORY_ITEMS} />
        </div>
        <DocLayout groups={GROUPS}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {COMPONENTS.map((c) => (
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
