import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../src/components/core/Slider';

const meta: Meta<typeof Slider> = { title: 'Core/Slider', component: Slider };
export default meta;
type Story = StoryObj<typeof Slider>;

export const Controlled: Story = {
  render: () => {
    const [volume, setVolume] = React.useState(60);
    return (
      <div style={{ width: 320 }}>
        <Slider value={volume} onChange={setVolume} label="Volume" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Slider value={30} onChange={() => {}} label="Volume" disabled />
    </div>
  ),
};
