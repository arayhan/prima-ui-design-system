import type { Preview } from '@storybook/react';
import '../src/styles.css';

// Belt-and-suspenders: styles.css already @imports these, but inject the Clash Display
// (Fontshare) + Inter/JetBrains Mono + Phosphor regular stylesheets directly too, so the
// preview renders with the real fonts/icons even before the closure resolves.
if (typeof document !== 'undefined') {
  const add = (href: string) => {
    if (document.head.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  };
  add('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
  add('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
  add('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'ice',
      values: [
        { name: 'ice', value: '#F8FBFD' },   // Prima page base
        { name: 'ink', value: '#0C0F16' },   // inverse storytelling surface
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
};
export default preview;
