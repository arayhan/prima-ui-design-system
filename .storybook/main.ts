import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Serve the verbatim interactive website kit so the Examples story can iframe it.
  // examples/website/site/... is served at /website/site/...
  staticDirs: ['../examples'],
};
export default config;
