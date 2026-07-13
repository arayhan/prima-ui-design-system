import type { Meta, StoryObj } from '@storybook/react';
import { SocialLinks } from '../src/components/core/SocialLinks';

const meta: Meta<typeof SocialLinks> = { title: 'Core/SocialLinks', component: SocialLinks };
export default meta;
type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = { render: () => <SocialLinks /> };
export const Small: Story = { render: () => <SocialLinks size={34} /> };
