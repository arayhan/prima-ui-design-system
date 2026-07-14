import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../src/components/core/Textarea';

const meta: Meta<typeof Textarea> = { title: 'Core/Textarea', component: Textarea };
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea label="Message" placeholder="Got a hard problem? Good. Bring it." />
    </div>
  ),
};

export const WithHelper: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea label="Project brief" placeholder="What are you building?" helper="A paragraph is plenty." />
    </div>
  ),
};
