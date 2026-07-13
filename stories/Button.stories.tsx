import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/core/Button';

const meta: Meta<typeof Button> = { title: 'Core/Button', component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'View portfolio' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Download CV' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Learn more' } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
