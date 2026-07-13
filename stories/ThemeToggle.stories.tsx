import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '../src/components/core/ThemeToggle';

const meta: Meta<typeof ThemeToggle> = { title: 'Core/ThemeToggle', component: ThemeToggle };
export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Controlled: Story = {
  render: () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    return <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />;
  },
};
