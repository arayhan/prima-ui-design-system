import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../src/components/advanced/MultiSelect';

const meta: Meta<typeof MultiSelect> = { title: 'Advanced/MultiSelect', component: MultiSelect };
export default meta;

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'gsap', label: 'GSAP' },
  { value: 'three', label: 'Three.js' },
  { value: 'vite', label: 'Vite' },
];

function Demo() {
  const [value, setValue] = React.useState<string[]>(['react', 'ts']);
  return (
    <div style={{ maxWidth: 380 }}>
      <MultiSelect
        label="Tech stack" options={OPTIONS} value={value} onChange={setValue}
        helper="Pick everything that applies."
      />
    </div>
  );
}

export const Default: StoryObj = { render: () => <Demo /> };
