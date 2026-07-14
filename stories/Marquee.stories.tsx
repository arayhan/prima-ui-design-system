import type { Meta, StoryObj } from '@storybook/react';
import { Marquee } from '../src/components/core/Marquee';

const meta: Meta<typeof Marquee> = {
  title: 'Core/Marquee',
  component: Marquee,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Marquee>;

const items = ['React', 'Next.js', 'TypeScript', 'Frontend Architecture', 'Tech Talks', 'Mentoring'];

export const Ice: Story = { render: () => <Marquee items={items} /> };
export const Ink: Story = { render: () => <Marquee items={items} inverse /> };
