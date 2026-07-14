import React from 'react';
import { Hero, FeatureGrid, StatStrip, CTASection, Footer, BlogList } from 'arayhan-design-system';
import type { PropMeta } from '../components/PropsTable';

export interface BlockMeta {
  id: string;
  name: string;
  description: string;
  snippet: string;
  props: PropMeta[];
  render: () => React.ReactNode;
}

export const BLOCKS: BlockMeta[] = [
  {
    id: 'block-hero',
    name: 'Hero',
    description: 'The page opener — `//` eyebrow, mega Clash Display caps title, lede, Button pair, and an optional media slot that sits beside the copy on wide viewports.',
    snippet: `import { Hero } from 'arayhan-design-system';

<Hero
  eyebrow="DESIGN SYSTEM — V0.1.0"
  title={'ENGINEERED\\nMINIMALISM'}
  lede="Cobalt on ice. One accent, three typefaces, visible structure."
  primaryAction={{ label: 'Get started', href: '#usage' }}
  secondaryAction={{ label: 'View components', href: '#components' }}
/>`,
    props: [
      { name: 'title', type: 'string', description: 'ALL-CAPS headline; use \\n for manual line breaks.' },
      { name: 'eyebrow', type: 'string', description: 'Mono eyebrow with // prefix.' },
      { name: 'lede', type: 'string', description: 'Body-large paragraph under the headline.' },
      { name: 'primaryAction', type: 'HeroAction', description: '{ label, href?, onClick? } — cobalt CTA.' },
      { name: 'secondaryAction', type: 'HeroAction', description: 'Ink-bordered secondary CTA.' },
      { name: 'media', type: 'ReactNode', description: 'Optional media slot (canvas, image, illustration).' },
    ],
    render: () => (
      <Hero
        eyebrow="DESIGN SYSTEM — V0.1.0"
        title={'ENGINEERED\nMINIMALISM'}
        lede="Cobalt on ice. One accent, three typefaces, visible structure."
        primaryAction={{ label: 'Get started' }}
        secondaryAction={{ label: 'View components' }}
        style={{ padding: 'var(--space-6) 0' }}
      />
    ),
  },
  {
    id: 'block-featuregrid',
    name: 'FeatureGrid',
    description: 'A grid of Cards, each opened by a mono running number and an optional cobalt Phosphor icon. Collapses automatically on narrow viewports.',
    snippet: `import { FeatureGrid } from 'arayhan-design-system';

<FeatureGrid items={[
  { icon: 'ph ph-drop', title: 'One accent',
    description: 'Electric cobalt is the only decorative color.' },
  { icon: 'ph ph-text-aa', title: 'Three typefaces',
    description: 'Clash Display, Inter, JetBrains Mono.' },
]} />`,
    props: [
      { name: 'items', type: 'FeatureItem[]', description: '{ icon?, title, description, index? } — index defaults to "001", "002", …' },
      { name: 'columns', type: '2 | 3', default: '3', description: 'Column count on wide viewports.' },
    ],
    render: () => (
      <FeatureGrid items={[
        { icon: 'ph ph-drop', title: 'One accent', description: 'Electric cobalt is the only decorative color. Everything else is ice, white, and cool ink.' },
        { icon: 'ph ph-text-aa', title: 'Three typefaces', description: 'Clash Display for confidence, Inter for reading, JetBrains Mono for labels and code.' },
        { icon: 'ph ph-ruler', title: 'Visible structure', description: '1.5px hairlines, 2px interactive borders, 3px section rules.' },
      ]} />
    ),
  },
  {
    id: 'block-statstrip',
    name: 'StatStrip',
    description: 'A horizontal row of stats separated by hairline rules — Clash Display values over mono uppercase labels. Ice or ink.',
    snippet: `import { StatStrip } from 'arayhan-design-system';

<StatStrip stats={[
  { value: '16', label: 'Components' },
  { value: '1', label: 'Accent color' },
  { value: '8pt', label: 'Spacing grid' },
]} />`,
    props: [
      { name: 'stats', type: 'Stat[]', description: '{ value, label } pairs.' },
      { name: 'inverse', type: 'boolean', default: 'false', description: 'Ink-surface variant.' },
    ],
    render: () => (
      <StatStrip stats={[
        { value: '48', label: 'Components' },
        { value: '1', label: 'Accent color' },
        { value: '3', label: 'Typefaces' },
        { value: '8pt', label: 'Spacing grid' },
      ]} />
    ),
  },
  {
    id: 'block-ctasection',
    name: 'CTASection',
    description: 'The contact/CTA block on the ink storytelling surface — eyebrow, big caps headline, cobalt CTA, mono email link, and SocialLinks.',
    snippet: `import { CTASection } from 'arayhan-design-system';

<CTASection
  eyebrow="CONTACT"
  title={'LET\\u2019S BUILD\\nSOMETHING SHARP'}
  action={{ label: 'Start a project', href: 'https://arayhan.com' }}
  email="rayhanprima99@gmail.com"
/>`,
    props: [
      { name: 'title', type: 'string', description: 'ALL-CAPS headline; use \\n for manual line breaks.' },
      { name: 'eyebrow', type: 'string', description: 'Mono eyebrow with // prefix.' },
      { name: 'action', type: 'CTAAction', description: '{ label, href?, onClick? } — cobalt CTA.' },
      { name: 'email', type: 'string', description: 'Mono mailto link.' },
      { name: 'links', type: 'SocialLink[]', default: 'built-in', description: 'Social links row.' },
    ],
    render: () => (
      <CTASection
        eyebrow="CONTACT"
        title={'LET’S BUILD\nSOMETHING SHARP'}
        action={{ label: 'Start a project', href: 'https://arayhan.com' }}
        email="rayhanprima99@gmail.com"
      />
    ),
  },
  {
    id: 'block-bloglist',
    name: 'BlogList',
    description: 'Hairline-separated article rows — mono date column, caps title that goes cobalt on hover with an arrow nudge, optional description, chips, and read-time.',
    snippet: `import { BlogList } from 'arayhan-design-system';

<BlogList posts={[
  { date: 'JUL 2026', title: 'Designing with one accent',
    description: 'Why constraint beats palette.',
    tags: ['Design'], readTime: '6 MIN', href: '/blog/one-accent' },
]} />`,
    props: [
      { name: 'posts', type: 'BlogPost[]', description: '{ date, title, description?, tags?, href?, readTime? }.' },
    ],
    render: () => (
      <BlogList posts={[
        { date: 'JUL 2026', title: 'Designing with one accent', description: 'Why constraint beats palette — what a single cobalt taught me about hierarchy.', tags: ['Design'], readTime: '6 MIN', href: '#/blocks' },
        { date: 'MAY 2026', title: 'Inline styles, no regrets', description: 'Shipping a component library with zero CSS classes.', tags: ['React', 'CSS'], readTime: '9 MIN', href: '#/blocks' },
        { date: 'FEB 2026', title: 'The ink surface', description: 'Color-block storytelling instead of dark mode.', readTime: '4 MIN', href: '#/blocks' },
      ]} />
    ),
  },
  {
    id: 'block-footer',
    name: 'Footer',
    description: 'The page close: a 3px ink rule, Clash Display wordmark and tagline, mono-headed nav columns, SocialLinks, and a colophon line.',
    snippet: `import { Footer } from 'arayhan-design-system';

<Footer
  tagline="Prima — the personal design system of Ahmed Rayhan."
  columns={[{ title: 'INDEX', links: [
    { label: 'Components', href: '#components' },
  ]}]}
  note="© 2026 AHMED RAYHAN"
/>`,
    props: [
      { name: 'name', type: 'string', default: "'ARAYHAN®'", description: 'Wordmark.' },
      { name: 'tagline', type: 'string', description: 'Body line under the wordmark.' },
      { name: 'columns', type: 'FooterColumn[]', description: '{ title, links: { label, href }[] } nav columns.' },
      { name: 'links', type: 'SocialLink[]', default: 'built-in', description: 'Social links row.' },
      { name: 'note', type: 'string', description: 'Copyright / colophon line.' },
    ],
    render: () => (
      <Footer
        tagline="Prima — the personal design system of Ahmed Rayhan. Engineered minimalism, cobalt on ice."
        columns={[
          { title: 'INDEX', links: [
            { label: 'Foundations', href: '#foundations' },
            { label: 'Components', href: '#components' },
          ] },
          { title: 'ELSEWHERE', links: [
            { label: 'arayhan.com', href: 'https://arayhan.com' },
            { label: 'GitHub', href: 'https://github.com/arayhan' },
          ] },
        ]}
        note="© 2026 AHMED RAYHAN — BUILT WITH PRIMA"
      />
    ),
  },
];
