import type { Meta, StoryObj } from '@storybook/react';
import { CTASection } from '../src/components/blocks/CTASection';

const meta: Meta<typeof CTASection> = { title: 'Blocks/CTASection', component: CTASection };
export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    eyebrow: 'CONTACT',
    title: 'LET’S BUILD\nSOMETHING SHARP',
    action: { label: 'Start a project', href: 'https://arayhan.com' },
    email: 'rayhanprima99@gmail.com',
  },
};
