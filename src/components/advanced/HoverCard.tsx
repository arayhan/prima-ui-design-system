import React from 'react';

export interface HoverCardProps {
  /** The element that triggers the card on hover/focus */
  trigger: React.ReactNode;
  /** Floating preview content */
  children: React.ReactNode;
  /** Delay before opening, in ms. Default 400. */
  openDelay?: number;
  /** Delay before closing after the pointer leaves, in ms. Default 150. */
  closeDelay?: number;
  /** Which side the panel opens on. Default 'bottom'. */
  side?: 'top' | 'bottom';
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima hover card — hovering (or focusing) the trigger reveals a floating
 * preview after a short delay; leaving both the trigger and the card closes
 * it after a shorter delay, so crossing the gap between them doesn't flicker.
 */
export function HoverCard({ trigger, children, openDelay = 400, closeDelay = 150, side = 'bottom', style, className }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const openTimer = React.useRef<number>();
  const closeTimer = React.useRef<number>();

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const scheduleOpen = () => {
    window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  };

  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  React.useEffect(() => clearTimers, []);

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}
      onFocus={scheduleOpen} onBlur={scheduleClose}
    >
      {trigger}
      {open && (
        <span
          onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}
          style={{
            position: 'absolute', left: 0, zIndex: 40, minWidth: 260,
            [side === 'bottom' ? 'top' : 'bottom']: 'calc(100% + 10px)',
            display: 'block', background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)', padding: 'var(--space-5)',
            opacity: 1, transform: 'translateY(0)',
            animation: `prima-hovercard-in var(--duration-base) var(--ease-spatial) both`,
          } as React.CSSProperties}
        >
          {children}
          <style>{`@keyframes prima-hovercard-in { from { opacity: 0; transform: translateY(${side === 'bottom' ? '-6px' : '6px'}); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </span>
      )}
    </span>
  );
}
