import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from '../src/components/blocks/FeatureGrid';

const meta: Meta<typeof FeatureGrid> = { title: 'Blocks/FeatureGrid', component: FeatureGrid };
export default meta;
type Story = StoryObj<typeof FeatureGrid>;

export const ThreeColumns: Story = {
  args: {
    items: [
      { icon: 'ph ph-drop', title: 'One accent', description: 'Electric cobalt is the only decorative color. Everything else is ice, white, and cool ink.' },
      { icon: 'ph ph-text-aa', title: 'Three typefaces', description: 'Clash Display for confidence, Inter for reading, JetBrains Mono for the engineer’s fingerprint.' },
      { icon: 'ph ph-ruler', title: 'Visible structure', description: '1.5px hairlines, 2px interactive borders, 3px section rules. Structure is shown, not implied.' },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    items: [
      { title: 'Ice, not white', description: 'The page base is #F8FBFD — never pure white. Cards sit on white so surfaces read in layers.' },
      { title: 'Ink storytelling', description: 'The blue-black surface is a narrative block, not a dark mode. Use it once per page for emphasis.' },
    ],
  },
};
