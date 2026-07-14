import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/core/Switch';

const meta: Meta<typeof Switch> = { title: 'Core/Switch', component: Switch };
export default meta;
type Story = StoryObj<typeof Switch>;

export const On: Story = { render: () => <Switch checked onChange={() => {}} /> };
export const Off: Story = { render: () => <Switch checked={false} onChange={() => {}} /> };

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = React.useState(true);
    return <Switch checked={on} onChange={setOn} label="Available for work" />;
  },
};
