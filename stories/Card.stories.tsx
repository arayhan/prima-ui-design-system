import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/core/Card';
import { Tag } from '../src/components/core/Tag';

const meta: Meta<typeof Card> = { title: 'Core/Card', component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Static: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>SMILE cold-storage IoT</h3>
      <p style={{ color: 'var(--text-body)', marginTop: 8 }}>71% cost reduction on national vaccine logistics.</p>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive href="#" style={{ maxWidth: 360 }}>
      <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Anify realtime infra</h3>
      <p style={{ color: 'var(--text-body)', margin: '8px 0 12px' }}>Led the team through a pivot to realtime game infrastructure.</p>
      <div style={{ display: 'flex', gap: 6 }}>
        <Tag>React</Tag>
        <Tag>WebSocket</Tag>
      </div>
    </Card>
  ),
};
