import React from 'react';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  /** Diameter, default 40 */
  size?: number;
}

export function ThemeToggle({ theme, onToggle, size = 40 }: ThemeToggleProps) {
  const [hover, setHover] = React.useState(false);
  const dark = theme === 'dark';
  return (
    <button aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle theme"
      onClick={onToggle}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: 'var(--radius-full)',
        background: hover ? 'var(--bg-muted)' : 'transparent',
        border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
        color: 'var(--text-heading)', cursor: 'pointer',
        transition: 'all var(--duration-fast) var(--ease-out)',
      }}>
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
        </svg>
      )}
    </button>
  );
}
