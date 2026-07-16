import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from '../src/components/advanced/Alert';
import { Banner } from '../src/components/advanced/Banner';

const meta: Meta<typeof Alert> = { title: 'Advanced/Alert', component: Alert };
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { title: 'Heads up', children: 'Semantic colors are functional here, never decorative.' },
};
export const Success: Story = {
  args: { variant: 'success', title: 'Saved', children: 'Your changes are live.' },
};
export const Warning: Story = {
  args: { variant: 'warning', title: 'Check your tokens', children: 'A warm gray is a bug in Prima.' },
};
export const Error: Story = {
  args: { variant: 'error', title: 'Build failed', children: 'styles.css could not be resolved.', onClose: () => {} },
};
export const Stack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Alert title="Heads up">Semantic colors are functional, never decorative.</Alert>
      <Alert variant="success" title="Saved">Your changes are live.</Alert>
      <Alert variant="warning" title="Check your tokens">A warm gray is a bug in Prima.</Alert>
      <Alert variant="error" title="Build failed" onClose={() => {}}>styles.css could not be resolved.</Alert>
    </div>
  ),
};

export const BannerStory: StoryObj = {
  name: 'Banner',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Banner variant="info" action={{ label: 'Read the changelog', href: '#' }}>
        Prima 2.3 ships six new advanced components.
      </Banner>
      <Banner variant="warning" onDismiss={() => {}}>
        Your API key expires in 3 days. Rotate it before it lapses.
      </Banner>
    </div>
  ),
};
