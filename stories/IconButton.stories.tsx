import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../src/components/core/IconButton';

const meta: Meta<typeof IconButton> = { title: 'Core/IconButton', component: IconButton };
export default meta;
type Story = StoryObj<typeof IconButton>;

export const GitHub: Story = {
  args: {
    label: 'GitHub',
    href: 'https://github.com/arayhan',
    children: <i className="ph-duotone ph-github-logo" style={{ fontSize: 18 }} />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton label="Small" size={32}><i className="ph-duotone ph-star" style={{ fontSize: 15 }} /></IconButton>
      <IconButton label="Default"><i className="ph-duotone ph-star" style={{ fontSize: 18 }} /></IconButton>
      <IconButton label="Large" size={52}><i className="ph-duotone ph-star" style={{ fontSize: 24 }} /></IconButton>
    </div>
  ),
};
