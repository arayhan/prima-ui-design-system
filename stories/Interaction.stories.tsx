import type { Meta, StoryObj } from '@storybook/react';
import { BlogList, CountUp, MagneticButton, RevealOnScroll, TiltCard } from '../src/index';

const meta: Meta = { title: 'Blocks/Interaction' };
export default meta;

export const MagneticButtonStory: StoryObj = {
  name: 'MagneticButton',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      <MagneticButton icon="→">Start a project</MagneticButton>
      <MagneticButton variant="secondary" strength={12}>Stronger pull</MagneticButton>
    </div>
  ),
};

export const TiltCardStory: StoryObj = {
  name: 'TiltCard',
  render: () => (
    <div style={{ maxWidth: 340, padding: 24 }}>
      <TiltCard>
        <h3 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', margin: 0 }}>Tilt me</h3>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
          Move the pointer around this card.
        </p>
      </TiltCard>
    </div>
  ),
};

export const CountUpStory: StoryObj = {
  name: 'CountUp',
  render: () => (
    <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
      <CountUp value={48} suffix="+" label="Components" />
      <CountUp value={99.9} suffix="%" decimals={1} label="Uptime" />
    </div>
  ),
};

export const RevealOnScrollStory: StoryObj = {
  name: 'RevealOnScroll',
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {['ONE', 'TWO', 'THREE'].map((n, i) => (
        <RevealOnScroll key={n} delay={i * 80}>
          <div style={{
            padding: 24, background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', color: 'var(--primary)',
          }}>// {n}</div>
        </RevealOnScroll>
      ))}
    </div>
  ),
};

export const BlogListStory: StoryObj = {
  name: 'BlogList',
  render: () => (
    <BlogList posts={[
      { date: 'JUL 2026', title: 'Designing with one accent', description: 'Why constraint beats palette.', tags: ['Design'], readTime: '6 MIN', href: '#' },
      { date: 'MAY 2026', title: 'Inline styles, no regrets', tags: ['React'], readTime: '9 MIN', href: '#' },
    ]} />
  ),
};
