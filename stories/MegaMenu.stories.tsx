import type { Meta, StoryObj } from '@storybook/react';
import { MegaMenu } from '../src/components/blocks/MegaMenu';

const meta: Meta<typeof MegaMenu> = { title: 'Blocks/MegaMenu', component: MegaMenu };
export default meta;
type Story = StoryObj<typeof MegaMenu>;

export const Default: Story = {
  args: {
    logo: 'PRIMA UI',
    items: [
      { label: 'Foundations', href: '#foundations' },
      {
        label: 'Components',
        columns: [
          {
            title: 'CORE',
            links: [
              { label: 'Button', href: '#components', description: 'Primary, ghost, and link variants.' },
              { label: 'Card', href: '#components', description: 'Bordered surface with optional hover lift.' },
              { label: 'Input', href: '#components', description: 'Text field with label and error state.' },
            ],
          },
          {
            title: 'ADVANCED',
            links: [
              { label: 'Dropzone', href: '#components', description: 'Drag-and-drop file upload.' },
              { label: 'ImageCropper', href: '#components', description: 'Crop and export images inline.' },
              { label: 'VideoPlayer', href: '#components', description: 'Custom-chrome video playback.' },
            ],
          },
        ],
      },
      { label: 'Blocks', href: '#blocks' },
    ],
    action: { label: 'Get started', href: '#usage' },
  },
};
