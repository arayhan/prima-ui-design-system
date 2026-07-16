import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../src/components/core/Tabs';

const meta: Meta<typeof Tabs> = { title: 'Core/Tabs', component: Tabs };
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs
      defaultValue="overview"
      items={[
        { value: 'overview', label: 'Overview', content: <p>A quick summary of the project.</p> },
        { value: 'activity', label: 'Activity', content: <p>A running log of recent changes.</p> },
        { value: 'settings', label: 'Settings', content: <p>Permissions and notifications.</p> },
      ]}
    />
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs
      defaultValue="overview"
      items={[
        { value: 'overview', label: 'Overview', content: <p>A quick summary of the project.</p> },
        { value: 'archived', label: 'Archived', content: <p>Nothing here.</p>, disabled: true },
      ]}
    />
  ),
};
