import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { UsageSection } from '../sections/UsageSection';
import { useScrollReveal } from '../motion/hooks';

export function UsagePage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="HOW TO USE" number="004"
        title={'THREE STEPS\nTO PRIMA'}
        lede="React ≥18 is the only peer dependency. Styles, fonts, and icons arrive through one CSS import."
      />
      <UsageSection />
    </div>
  );
}
