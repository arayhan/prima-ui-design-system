import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../src/components/core/Input';

const meta: Meta<typeof Input> = { title: 'Core/Input', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { label: 'Email', type: 'email', placeholder: 'you@company.com' } };
export const WithHelper: Story = { args: { label: 'Company', placeholder: 'Acme Inc.', helper: 'Optional' } };
export const WithError: Story = { args: { label: 'Email', value: 'not-an-email', error: 'Enter a valid email address.' } };
export const Field: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Input label="Full name" placeholder="Ada Lovelace" />
    </div>
  ),
};
