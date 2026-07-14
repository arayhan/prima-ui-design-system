import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { FoundationsSection } from '../sections/FoundationsSection';
import { useScrollReveal } from '../motion/hooks';

export function FoundationsPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="FOUNDATIONS" number="001"
        title={'TOKENS,\nMADE TANGIBLE'}
        lede="Every visual decision reads a CSS variable from src/tokens. Click a swatch to copy its variable; replay the easing; measure the 8pt grid."
      />
      <FoundationsSection />
    </div>
  );
}
