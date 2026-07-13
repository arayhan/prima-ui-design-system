import type { Meta, StoryObj } from '@storybook/react';

/**
 * The full interactive arayhan.dev site — home, blog, /uses, ⌘K palette, dark mode.
 *
 * This is the original Claude Design "website" UI kit, preserved verbatim under
 * `examples/website/site/` and rendered here in its native runtime (React UMD +
 * in-browser Babel + the `window.ArayhanDesignSystem_*` global bundle) via an iframe.
 * It is a reference composition, NOT part of the library's exported API.
 */
const meta: Meta = {
  title: 'Examples/Website',
  parameters: {
    layout: 'fullscreen',
    // The kit runs its own React/Babel runtime; iframe isolation is intentional.
  },
};
export default meta;

const Frame = () => (
  <iframe
    title="arayhan.dev — interactive site"
    src="/website/site/ui_kits/website/index.html"
    style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
  />
);

export const ArayhanDev: StoryObj = {
  name: 'arayhan.dev (full site)',
  render: () => <Frame />,
};
