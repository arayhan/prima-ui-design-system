import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/core/Button';

const meta: Meta<typeof Button> = { title: 'Core/Button', component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Start a project' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'View work' } };
export const WithArrow: Story = { args: { children: 'Read the case study', icon: '→' } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };
export const Pair: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button>Start a project</Button>
      <Button variant="secondary">View work</Button>
    </div>
  ),
};
