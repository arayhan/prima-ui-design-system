import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../src/components/core/Rating';

const meta: Meta<typeof Rating> = { title: 'Core/Rating', component: Rating };
export default meta;
type Story = StoryObj<typeof Rating>;

export const ReadOnly: Story = {
  render: () => <Rating value={4.5} label="4.5 (312 reviews)" />,
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    return <Rating value={value} onChange={setValue} allowHalf label={`${value} — click to rate`} />;
  },
};
