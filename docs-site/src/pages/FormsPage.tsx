import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { CategoryNav } from '../components/CategoryNav';
import { SectionSidebar } from '../components/SectionSidebar';
import { FORMS } from '../content/forms-meta';
import { useScrollReveal } from '../motion/hooks';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CATEGORY_ITEMS = [
  { label: 'Core', to: '/components/core' },
  { label: 'Forms', to: '/components/forms' },
  { label: 'Overlays', to: '/components/overlays' },
  { label: 'Display', to: '/components/display' },
];

const GROUPS = [{ title: 'FORMS', items: FORMS.map((c) => ({ id: c.id, label: c.name })) }];

export function FormsPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);
  const wide = useMediaQuery('(min-width: 1024px)');

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="COMPONENTS" number="002.2"
        title={'FORM\nCONTROLS'}
        lede="Everything that collects input — checkboxes, radios, segments, search, dates, sliders, toggles — plus the validation pattern that ties the fields together."
      />
      <Section id="forms-list">
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
                {FORMS.map((c) => (
                  <Specimen key={c.id} id={c.id} name={c.name} description={c.description} snippet={c.snippet} props={c.props} block={c.block}>
                    {c.render()}
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
