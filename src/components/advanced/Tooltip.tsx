import React from 'react';

export interface TooltipProps {
  /** Short plain-text hint */
  content: string;
  children: React.ReactElement;
  /** Which side the tooltip opens on. Default 'top'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing, in ms. Default 200. */
  delay?: number;
  className?: string;
}

const SIDE_POSITION: Record<NonNullable<TooltipProps['side']>, React.CSSProperties> = {
  top: { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
  bottom: { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
  left: { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
  right: { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
};

/**
 * Prima tooltip — a short plain-text hint on hover/focus. Distinct from HoverCard
 * (rich preview content, longer delay): shorter delay, simpler positioning, and
 * uses role="tooltip" since its content is a single short label, not a rich panel.
 */
export function Tooltip({ content, children, side = 'top', delay = 200, className }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const showTimer = React.useRef<number>();
  const tooltipId = React.useId();

  const scheduleShow = () => {
    window.clearTimeout(showTimer.current);
    showTimer.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    window.clearTimeout(showTimer.current);
    setVisible(false);
  };

  React.useEffect(() => () => window.clearTimeout(showTimer.current), []);

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={scheduleShow} onMouseLeave={hide}
      onFocus={scheduleShow} onBlur={hide}
    >
      {React.cloneElement(children, { 'aria-describedby': visible ? tooltipId : undefined })}
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute', zIndex: 50, minWidth: 0,
            background: 'var(--inverse-surface)', color: 'var(--on-inverse)',
            padding: '6px 10px', borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            whiteSpace: 'nowrap', boxShadow: 'var(--shadow-floating)',
            opacity: 1, transition: 'opacity var(--duration-fast) var(--ease-spatial)',
            ...SIDE_POSITION[side],
          } as React.CSSProperties}
        >
          {content}
        </span>
      )}
    </span>
  );
}
