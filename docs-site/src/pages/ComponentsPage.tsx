import React from 'react';
import { SectionHeader } from 'arayhan-design-system';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Specimen } from '../components/Specimen';
import { DocLayout } from '../components/DocLayout';
import { COMPONENTS } from '../content/components-meta';
import { FORMS, type DocMeta } from '../content/forms-meta';
import { OVERLAYS } from '../content/overlay-meta';
import { DISPLAY } from '../content/display-meta';
import { useScrollReveal } from '../motion/hooks';

const SECTIONS: { key: string; title: string; number: string; lede: string; items: DocMeta[] }[] = [
  {
    key: 'FORMS', title: 'Form controls', number: '002.2', items: FORMS,
    lede: 'Everything that collects input — checkboxes, radios, segments, search, dates — plus the validation pattern that ties the fields together.',
  },
  {
    key: 'OVERLAYS', title: 'Overlays', number: '002.3', items: OVERLAYS,
    lede: 'Floating surfaces — menus, dialogs, drawers, toasts. All close on Escape and outside click; modals lock scroll and render in portals.',
  },
  {
    key: 'DISPLAY', title: 'Display & data', number: '002.4', items: DISPLAY,
    lede: 'Content and data presentation — avatars, media, chat, accordions, carousels, tables, charts, prose, and the empty/error states.',
  },
];

const GROUPS = [
  { title: 'CORE', items: COMPONENTS.map((c) => ({ id: c.id, label: c.name })) },
  ...SECTIONS.map((s) => ({ title: s.key, items: s.items.map((c) => ({ id: c.id, label: c.name })) })),
];

function SpecimenList({ items }: { items: DocMeta[] }) {
  return (
    <>
      {items.map((c) => (
        <Specimen key={c.id} id={c.id} name={c.name} description={c.description} snippet={c.snippet} props={c.props} block={c.block}>
          {c.render()}
        </Specimen>
      ))}
    </>
  );
}

export function ComponentsPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="COMPONENTS" number="002"
        title={'EVERY PIECE,\nRENDERED LIVE'}
        lede="Typed React functions styled inline with token variables — no CSS classes, no CSS-in-JS. Core atoms, form controls, overlays, and data display."
      />
      <Section id="components-list">
        <DocLayout groups={GROUPS}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <SpecimenList items={COMPONENTS} />
            {SECTIONS.map((s) => (
              <React.Fragment key={s.key}>
                <div data-reveal>
                  <SectionHeader eyebrow={s.key} number={s.number} title={s.title} description={s.lede} />
                </div>
                <SpecimenList items={s.items} />
              </React.Fragment>
            ))}
          </div>
        </DocLayout>
      </Section>
    </div>
  );
}
