import React from 'react';
import {
  Hero, FeatureGrid, StatStrip, CTASection, Footer, BlogList,
  Navbar, Testimonials, FAQSection, PricingTable, BlogDetail,
} from 'prima-ui';
import type { PropMeta } from '../components/PropsTable';
import { IsometricFallback } from '../three/IsometricFallback';

const IsometricScene = React.lazy(() => import('../three/IsometricScene'));

function HeroMedia() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', height: 260, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <React.Suspense fallback={<IsometricFallback />}>
        <IsometricScene />
      </React.Suspense>
    </div>
  );
}

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
    id: 'block-navbar',
    name: 'Navbar',
    description: 'The page\'s opening rule — Clash Display wordmark, mono-caps nav links, and an optional cobalt CTA. Pairs with Footer to bookend a page.',
    snippet: `import { Navbar } from 'prima-ui';

<Navbar
  logo="PRIMA UI"
  links={[
    { label: 'Foundations', href: '#foundations' },
    { label: 'Components', href: '#components' },
  ]}
  action={{ label: 'Get started', href: '#usage' }}
/>`,
    props: [
      { name: 'logo', type: 'string', default: "'PRIMA UI'", description: 'Wordmark, rendered in Clash Display.' },
      { name: 'logoHref', type: 'string', description: 'Wordmark link target.' },
      { name: 'links', type: 'NavLink[]', description: '{ label, href?, onClick? } mono-caps nav links.' },
      { name: 'action', type: 'NavbarAction', description: '{ label, href?, onClick? } — cobalt CTA.' },
      { name: 'sticky', type: 'boolean', default: 'false', description: 'Sticks to the top of its scroll container.' },
    ],
    render: () => (
      <Navbar
        logo="PRIMA UI"
        links={[
          { label: 'Foundations', href: '#foundations' },
          { label: 'Components', href: '#components' },
          { label: 'Blocks', href: '#blocks' },
        ]}
        action={{ label: 'Get started' }}
      />
    ),
  },
  {
    id: 'block-hero',
    name: 'Hero',
    description: 'The page opener — `//` eyebrow, mega Clash Display caps title, lede, Button pair, and an optional media slot that sits beside the copy on wide viewports.',
    snippet: `import { Hero } from 'prima-ui';

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
        media={<HeroMedia />}
        style={{ padding: 'var(--space-6) 0' }}
      />
    ),
  },
  {
    id: 'block-featuregrid',
    name: 'FeatureGrid',
    description: 'A grid of Cards, each opened by a mono running number and an optional cobalt Phosphor icon. Collapses automatically on narrow viewports.',
    snippet: `import { FeatureGrid } from 'prima-ui';

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
    id: 'block-testimonials',
    name: 'Testimonials',
    description: 'A grid of quote Cards opened by a cobalt Clash Display quotation mark, Inter body copy, and an Avatar + mono name/role footer.',
    snippet: `import { Testimonials } from 'prima-ui';

<Testimonials items={[
  { quote: 'Cobalt on ice made every screen feel like the same product.',
    name: 'Dea Larasati', role: 'PRODUCT DESIGNER' },
]} />`,
    props: [
      { name: 'items', type: 'Testimonial[]', description: '{ quote, name, role?, avatar? }.' },
      { name: 'columns', type: '2 | 3', default: '3', description: 'Column count on wide viewports.' },
    ],
    render: () => (
      <Testimonials items={[
        { quote: 'Cobalt on ice made every screen we shipped feel like the same product — even across three squads.', name: 'Dea Larasati', role: 'PRODUCT DESIGNER' },
        { quote: 'The hairline rules and mono labels do more work than any shadow ever did.', name: 'Fajar Nugroho', role: 'FRONTEND ENGINEER' },
        { quote: 'One accent color, zero debates. We just build now.', name: 'Sri Wulandari', role: 'DESIGN LEAD' },
      ]} />
    ),
  },
  {
    id: 'block-statstrip',
    name: 'StatStrip',
    description: 'A horizontal row of stats separated by hairline rules — Clash Display values over mono uppercase labels. Ice or ink.',
    snippet: `import { StatStrip } from 'prima-ui';

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
    id: 'block-pricingtable',
    name: 'PricingTable',
    description: 'A grid of plan cards; the `highlighted` plan swaps to the ink storytelling surface with a cobalt border.',
    snippet: `import { PricingTable } from 'prima-ui';

<PricingTable plans={[
  { name: 'Starter', price: '$0', period: 'MO',
    features: ['1 project', 'Community support'],
    action: { label: 'Start free', href: '#' } },
  { name: 'Pro', price: '$24', period: 'MO', highlighted: true,
    features: ['Unlimited projects', 'Priority support', 'Design tokens export'],
    action: { label: 'Go pro', href: '#' } },
]} />`,
    props: [
      { name: 'plans', type: 'PricingPlan[]', description: '{ name, price, period?, description?, features, action, highlighted? }.' },
    ],
    render: () => (
      <PricingTable plans={[
        { name: 'Starter', price: '$0', period: 'MO', description: 'For solo projects finding their footing.', features: ['1 project', 'Community support', 'Core components'], action: { label: 'Start free', href: '#/blocks' } },
        { name: 'Pro', price: '$24', period: 'MO', description: 'For teams shipping product every week.', features: ['Unlimited projects', 'Priority support', 'Design tokens export'], action: { label: 'Go pro', href: '#/blocks' }, highlighted: true },
        { name: 'Studio', price: '$64', period: 'MO', description: 'For agencies running multiple brands.', features: ['Everything in Pro', 'Multi-brand tokens', 'White-glove onboarding'], action: { label: 'Talk to us', href: '#/blocks' } },
      ]} />
    ),
  },
  {
    id: 'block-faqsection',
    name: 'FAQSection',
    description: 'A SectionHeader opener over the existing Accordion, for landing-page question/answer blocks.',
    snippet: `import { FAQSection } from 'prima-ui';

<FAQSection
  eyebrow="FAQ"
  title="QUESTIONS, ANSWERED"
  items={[
    { title: 'Is Prima free to use?', content: 'Yes — MIT licensed.' },
  ]}
/>`,
    props: [
      { name: 'eyebrow', type: 'string', default: "'FAQ'", description: 'Mono eyebrow with // prefix.' },
      { name: 'title', type: 'string', default: "'QUESTIONS, ANSWERED'", description: 'ALL-CAPS Clash Display title.' },
      { name: 'description', type: 'string', description: 'Optional lede under the title.' },
      { name: 'items', type: 'AccordionItem[]', description: '{ title, content } passed straight to Accordion.' },
    ],
    render: () => (
      <FAQSection
        eyebrow="FAQ"
        title="QUESTIONS, ANSWERED"
        items={[
          { title: 'Is Prima free to use?', content: 'Yes — it ships MIT licensed, source included.' },
          { title: 'Why only one accent color?', content: 'Constraint beats palette. Every decorative choice funnels into cobalt, so hierarchy comes from type and space instead of color.' },
          { title: 'Can I theme it?', content: 'Every value reads a CSS custom property, so swapping the token files re-themes the whole system.' },
        ]}
      />
    ),
  },
  {
    id: 'block-ctasection',
    name: 'CTASection',
    description: 'The contact/CTA block on the ink storytelling surface — eyebrow, big caps headline, cobalt CTA, mono email link, and SocialLinks.',
    snippet: `import { CTASection } from 'prima-ui';

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
    snippet: `import { BlogList } from 'prima-ui';

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
    id: 'block-blogdetail',
    name: 'BlogDetail',
    description: 'The full article view that BlogList\'s rows link to — mono meta row, Clash Display title, lede, optional author line, then a hairline rule before the body.',
    snippet: `import { BlogDetail } from 'prima-ui';

<BlogDetail
  date="JUL 2026"
  title="Designing with one accent"
  lede="Why constraint beats palette."
  tags={['Design']}
  readTime="6 MIN"
  backHref="#/blocks"
>
  <p>Article body goes here — wrap in RichText for prose styling.</p>
</BlogDetail>`,
    props: [
      { name: 'date', type: 'string', description: 'Mono date — e.g. "JUL 2026".' },
      { name: 'title', type: 'string', description: 'ALL-CAPS Clash Display title.' },
      { name: 'lede', type: 'string', description: 'Body-large paragraph under the title.' },
      { name: 'tags', type: 'string[]', description: 'Chip row.' },
      { name: 'readTime', type: 'string', description: 'Mono read-time — e.g. "6 MIN".' },
      { name: 'author', type: 'BlogAuthor', description: '{ name, role?, avatar? }.' },
      { name: 'backHref', type: 'string', description: 'Back-to-list link.' },
      { name: 'backLabel', type: 'string', default: "'ALL POSTS'", description: 'Back-link label.' },
      { name: 'children', type: 'ReactNode', description: 'Article body — wrap in RichText for prose styling.' },
    ],
    render: () => (
      <BlogDetail
        date="JUL 2026"
        title="Designing with one accent"
        lede="Why constraint beats palette — what a single cobalt taught me about hierarchy."
        tags={['Design']}
        readTime="6 MIN"
        author={{ name: 'A. Rayhan Primadedas', role: 'DESIGN ENGINEER' }}
        backHref="#/blocks"
      >
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)' }}>
          Article body renders here — wrap it in <code>RichText</code> for full prose styling (headings, lists, quotes, code).
        </p>
      </BlogDetail>
    ),
  },
  {
    id: 'block-footer',
    name: 'Footer',
    description: 'The page close: a 3px ink rule, Clash Display wordmark and tagline, mono-headed nav columns, SocialLinks, and a colophon line.',
    snippet: `import { Footer } from 'prima-ui';

<Footer
  tagline="Prima — the personal design system of A. Rayhan Primadedas."
  columns={[{ title: 'INDEX', links: [
    { label: 'Components', href: '#components' },
  ]}]}
  note="© 2026 A. RAYHAN PRIMADEDAS"
/>`,
    props: [
      { name: 'name', type: 'string', default: "'PRIMA UI'", description: 'Wordmark.' },
      { name: 'tagline', type: 'string', description: 'Body line under the wordmark.' },
      { name: 'columns', type: 'FooterColumn[]', description: '{ title, links: { label, href }[] } nav columns.' },
      { name: 'links', type: 'SocialLink[]', default: 'built-in', description: 'Social links row.' },
      { name: 'note', type: 'string', description: 'Copyright / colophon line.' },
    ],
    render: () => (
      <Footer
        tagline="Prima — the personal design system of A. Rayhan Primadedas. Engineered minimalism, cobalt on ice."
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
        note="© 2026 A. RAYHAN PRIMADEDAS — BUILT WITH PRIMA"
      />
    ),
  },
];
