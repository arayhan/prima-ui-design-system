import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem } from '../src/components/core/TimelineItem';

const meta: Meta<typeof TimelineItem> = {
  title: 'Core/TimelineItem',
  component: TimelineItem,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TimelineItem>;

export const Single: Story = {
  args: {
    period: '2023 — NOW',
    title: 'Frontend Lead',
    org: 'Anify',
    description: 'Led the team through a pivot to realtime game infrastructure.',
    tags: ['React', 'WebSocket'],
  },
};

export const Timeline: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <TimelineItem period="2023 — NOW" title="Frontend Lead" org="Anify" description="Led the team through a pivot to realtime game infra." tags={['React', 'WebSocket']} />
      <TimelineItem period="2021 — 2023" title="Senior Engineer" org="HealthTech" description="Built a national-scale vaccine logistics platform." tags={['Next.js', 'TypeScript']} />
      <TimelineItem last period="2019 — 2021" title="BSc Informatics" org="STT-NF" />
    </div>
  ),
};
