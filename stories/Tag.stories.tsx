import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/core/Tag';

const meta: Meta<typeof Tag> = { title: 'Core/Tag', component: Tag };
export default meta;
type Story = StoryObj<typeof Tag>;

export const Single: Story = { args: { children: 'Next.js' } };
export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      <Tag>Next.js</Tag>
      <Tag>Firebase</Tag>
      <Tag>IoT</Tag>
      <Tag>WebSocket</Tag>
      <Tag>TypeScript</Tag>
    </div>
  ),
};
