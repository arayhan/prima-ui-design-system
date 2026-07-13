import type { Preview } from '@storybook/react';
import '../src/styles.css';

// Inject CDN fonts + Phosphor duotone icons (kept faithful to the export).
if (typeof document !== 'undefined') {
  const add = (href: string) => {
    if (document.head.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  };
  add('https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css');
  add('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0B1120' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', ctx.globals.theme);
      }
      return Story();
    },
  ],
};
export default preview;
