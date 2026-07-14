import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../src/components/core/Card';
import { Chip } from '../src/components/core/Chip';

const meta: Meta<typeof Card> = { title: 'Core/Card', component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Static: Story = {
  render: () => (
    <Card style={{ maxWidth: 380 }}>
      <h3>Design systems that ship</h3>
      <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
        A token pipeline, verified previews, and a bundle engineers can build with.
      </p>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive arrow href="#" style={{ maxWidth: 380 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Chip>React</Chip>
        <Chip>TypeScript</Chip>
      </div>
      <h3>Realtime game infrastructure</h3>
      <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
        Led the team through a pivot to realtime infra.
      </p>
    </Card>
  ),
};
