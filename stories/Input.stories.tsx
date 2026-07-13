import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/core/Input';

const meta: Meta<typeof Input> = { title: 'Core/Input', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Email: Story = { args: { label: 'Email', type: 'email', placeholder: 'you@company.com' } };
export const WithHint: Story = { args: { label: 'Company', placeholder: 'Acme Inc.', hint: 'Optional' } };
export const Textarea: Story = { args: { label: 'Message', textarea: true, placeholder: 'What are you building?' } };
export const ContactForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <Input label="Name" placeholder="Your name" />
      <Input label="Email" type="email" placeholder="you@company.com" />
      <Input label="Message" textarea placeholder="What are you building?" />
    </div>
  ),
};
