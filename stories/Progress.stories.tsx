import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../src/components/core/Progress';

const meta: Meta<typeof Progress> = { title: 'Core/Progress', component: Progress };
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Progress value={68} label="Uploading" />
    </div>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Progress value={42} showPercentage={false} />
    </div>
  ),
};
