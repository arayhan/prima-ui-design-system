import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '../src/components/blocks/Hero';

const meta: Meta<typeof Hero> = { title: 'Blocks/Hero', component: Hero };
export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    eyebrow: 'DESIGN SYSTEM — V0.1.0',
    title: 'ENGINEERED\nMINIMALISM',
    lede: 'Cobalt on ice. One accent, three typefaces, visible structure. The personal design system of A. Rayhan Primadedas.',
    primaryAction: { label: 'Get started', href: '#usage' },
    secondaryAction: { label: 'View components', href: '#components' },
  },
};

export const WithMedia: Story = {
  args: {
    ...Default.args,
    media: (
      <div style={{
        aspectRatio: '4 / 3', borderRadius: 'var(--radius-lg)',
        border: 'var(--border-width) solid var(--border)', background: 'var(--surface)',
        display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)', fontSize: 'var(--text-label)', letterSpacing: 'var(--tracking-label)',
      }}>MEDIA SLOT</div>
    ),
  },
};
