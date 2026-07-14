import type { Meta, StoryObj } from '@storybook/react';
import { StatStrip } from '../src/components/blocks/StatStrip';

const meta: Meta<typeof StatStrip> = { title: 'Blocks/StatStrip', component: StatStrip };
export default meta;
type Story = StoryObj<typeof StatStrip>;

const stats = [
  { value: '48', label: 'Components' },
  { value: '1', label: 'Accent color' },
  { value: '3', label: 'Typefaces' },
  { value: '8pt', label: 'Spacing grid' },
];

export const Default: Story = { args: { stats } };
export const Inverse: Story = { args: { stats, inverse: true } };
