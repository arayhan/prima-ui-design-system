import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../src/components/advanced/Dropdown';

const meta: Meta<typeof Dropdown> = { title: 'Advanced/Dropdown', component: Dropdown };
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    label: 'Actions',
    items: [
      { label: 'Edit', icon: 'ph ph-pencil-simple' },
      { label: 'Duplicate', icon: 'ph ph-copy' },
      { label: 'Share', icon: 'ph ph-share-network' },
      { label: 'Delete', icon: 'ph ph-trash', danger: true },
    ],
  },
};
