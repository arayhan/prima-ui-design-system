import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, type SpinnerVariant } from '../src/components/core/Spinner';

const meta: Meta<typeof Spinner> = { title: 'Core/Spinner', component: Spinner };
export default meta;
type Story = StoryObj<typeof Spinner>;

const VARIANTS: SpinnerVariant[] = ['ring', 'dots', 'bars', 'pulse', 'orbit'];

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Spinner variant={variant} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Ring: Story = { render: () => <Spinner variant="ring" size={32} /> };
