import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from '../src/components/core/SectionHeading';

const meta: Meta<typeof SectionHeading> = { title: 'Core/SectionHeading', component: SectionHeading };
export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    eyebrow: 'Portfolio',
    title: 'Selected work',
    description: 'Case studies with measurable impact.',
  },
};

export const TitleOnly: Story = { args: { title: 'About' } };
