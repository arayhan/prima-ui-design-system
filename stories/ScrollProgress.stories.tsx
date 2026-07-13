import type { Meta, StoryObj } from '@storybook/react';
import { ScrollProgress } from '../src/components/core/ScrollProgress';

const meta: Meta<typeof ScrollProgress> = {
  title: 'Core/ScrollProgress',
  component: ScrollProgress,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof ScrollProgress>;

export const Default: Story = {
  render: () => (
    <div>
      <ScrollProgress />
      <div style={{ padding: 40 }}>
        <p style={{ color: 'var(--text-muted)' }}>Scroll the preview — the accent bar fills at the top.</p>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} style={{ margin: '0 0 24px', color: 'var(--text-body)' }}>
            Section {i + 1} — placeholder content to make the page scrollable.
          </p>
        ))}
      </div>
    </div>
  ),
};
