import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../src/components/blocks/Footer';

const meta: Meta<typeof Footer> = { title: 'Blocks/Footer', component: Footer };
export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    tagline: 'Prima — the personal design system of Ahmed Rayhan. Engineered minimalism, cobalt on ice.',
    columns: [
      {
        title: 'INDEX',
        links: [
          { label: 'Foundations', href: '#foundations' },
          { label: 'Components', href: '#components' },
          { label: 'Blocks', href: '#blocks' },
        ],
      },
      {
        title: 'ELSEWHERE',
        links: [
          { label: 'arayhan.com', href: 'https://arayhan.com' },
          { label: 'GitHub', href: 'https://github.com/arayhan' },
        ],
      },
    ],
    note: '© 2026 AHMED RAYHAN — BUILT WITH PRIMA',
  },
};
