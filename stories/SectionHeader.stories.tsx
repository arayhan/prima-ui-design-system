import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from '../src/components/core/SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Core/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <SectionHeader eyebrow="Selected work" number="001" title="Case studies with measurable impact"
        description="Problem, constraint, solution, impact — the shape every project ships in." />
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <SectionHeader eyebrow="About" number="002" title="Making the complex make sense" />
    </div>
  ),
};
