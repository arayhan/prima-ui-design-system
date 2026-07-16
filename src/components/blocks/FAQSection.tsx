import React from 'react';
import { SectionHeader } from '../core/SectionHeader';
import { Accordion } from '../advanced/Accordion';
import type { AccordionItem } from '../advanced/Accordion';

export interface FAQSectionProps {
  /** Mono eyebrow, rendered with a `//` prefix. Default "FAQ" */
  eyebrow?: string;
  /** ALL-CAPS Clash Display title. Default "QUESTIONS, ANSWERED" */
  title?: string;
  description?: string;
  items: AccordionItem[];
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima FAQ section — a SectionHeader opener over the existing Accordion,
 * for landing-page question/answer blocks.
 */
export function FAQSection({
  eyebrow = 'FAQ', title = 'QUESTIONS, ANSWERED', description, items, style, className,
}: FAQSectionProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)', ...style }}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <Accordion items={items} />
    </div>
  );
}
