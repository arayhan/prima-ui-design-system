import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../src/components/core/Select';

const meta: Meta<typeof Select> = { title: 'Core/Select', component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'react', label: 'React' },
  { value: 'next', label: 'Next.js' },
  { value: 'ts', label: 'TypeScript' },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Select label="Primary stack" options={options} />
    </div>
  ),
};

export const WithHelper: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Select label="Engagement" options={[{ value: 'ft', label: 'Full-time' }, { value: 'contract', label: 'Contract' }]} helper="Pick one to start." />
    </div>
  ),
};
