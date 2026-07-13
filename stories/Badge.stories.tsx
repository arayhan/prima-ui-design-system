import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/core/Badge';

const meta: Meta<typeof Badge> = { title: 'Core/Badge', component: Badge };
export default meta;
type Story = StoryObj<typeof Badge>;

export const Open: Story = { args: { tone: 'open', children: 'Open to opportunities' } };
export const Accent: Story = { args: { tone: 'accent', children: 'New' } };
export const Neutral: Story = { args: { tone: 'neutral', children: 'Freelance' } };
export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Badge tone="open">Open to opportunities</Badge>
      <Badge tone="accent">New</Badge>
      <Badge tone="neutral">Freelance</Badge>
    </div>
  ),
};
