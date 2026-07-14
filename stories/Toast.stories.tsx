import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/core/Button';
import { ToastProvider, useToast } from '../src/components/advanced/Toast';

const meta: Meta = { title: 'Advanced/Toast' };
export default meta;

function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button onClick={() => toast({ title: 'Saved', description: 'Your changes are live.', variant: 'success' })}>
        Success toast
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Build failed', description: 'styles.css could not be resolved.', variant: 'error' })}>
        Error toast
      </Button>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
