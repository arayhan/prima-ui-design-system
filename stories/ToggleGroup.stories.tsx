import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../src/components/core/Toggle';
import { ToggleGroup } from '../src/components/core/ToggleGroup';

const meta: Meta = { title: 'Core/Toggle' };
export default meta;

export const ToggleStory: StoryObj = {
  name: 'Toggle',
  render: () => {
    const [bold, setBold] = React.useState(true);
    return (
      <Toggle pressed={bold} onPressedChange={setBold}>
        <i className="ph ph-text-b" aria-hidden="true" />
      </Toggle>
    );
  },
};

export const ToggleGroupStory: StoryObj = {
  name: 'ToggleGroup',
  render: () => {
    const [align, setAlign] = React.useState('left');
    const [format, setFormat] = React.useState<string[]>(['bold']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ToggleGroup
          value={align} onChange={setAlign}
          options={[
            { value: 'left', label: 'Left', icon: 'ph ph-text-align-left' },
            { value: 'center', label: 'Center', icon: 'ph ph-text-align-center' },
            { value: 'right', label: 'Right', icon: 'ph ph-text-align-right' },
          ]}
        />
        <ToggleGroup
          type="multiple" value={format} onChange={setFormat}
          options={[
            { value: 'bold', label: 'Bold', icon: 'ph ph-text-b' },
            { value: 'italic', label: 'Italic', icon: 'ph ph-text-italic' },
            { value: 'underline', label: 'Underline', icon: 'ph ph-text-underline' },
          ]}
        />
      </div>
    );
  },
};
