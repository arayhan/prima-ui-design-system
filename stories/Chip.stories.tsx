import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../src/components/core/Chip';

const meta: Meta<typeof Chip> = { title: 'Core/Chip', component: Chip };
export default meta;
type Story = StoryObj<typeof Chip>;

export const Single: Story = { args: { children: 'React' } };
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip>React</Chip>
      <Chip>Next.js</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Frontend Architecture</Chip>
    </div>
  ),
};
