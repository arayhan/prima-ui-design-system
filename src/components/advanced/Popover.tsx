import React from 'react';

export interface PopoverProps {
  /** The element that opens the popover on click (or Enter/Space if focused) */
  trigger: React.ReactNode;
  /** Arbitrary floating content */
  children: React.ReactNode;
  /** Which side the panel opens on. Default 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Edge alignment along the trigger (top/bottom sides only). Default 'start'. */
  align?: 'start' | 'end';
  style?: React.CSSProperties;
  className?: string;
}

const SIDE_STYLE: Record<string, React.CSSProperties> = {
  bottom: { top: 'calc(100% + 8px)' },
  top: { bottom: 'calc(100% + 8px)' },
  right: { left: 'calc(100% + 8px)', top: 0 },
  left: { right: 'calc(100% + 8px)', top: 0 },
};

/**
 * Prima popover — a generic floating content panel anchored to a trigger.
 * Unlike Dropdown (a list of menu items), Popover's content is arbitrary.
 * Closes on Escape and outside click.
 */
export function Popover({ trigger, children, side = 'bottom', align = 'start', style, className }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const alignStyle: React.CSSProperties =
    side === 'top' || side === 'bottom'
      ? (align === 'end' ? { right: 0 } : { left: 0 })
      : {};

  return (
    <div ref={rootRef} className={className} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span
        role="button" tabIndex={0}
        aria-haspopup="dialog" aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((v) => !v); }
        }}
        style={{ cursor: 'pointer' }}
      >
        {trigger}
      </span>
      {open && (
        <div
          role="dialog"
          style={{
            position: 'absolute', zIndex: 40, minWidth: 240,
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)', padding: 'var(--space-4)',
            ...SIDE_STYLE[side], ...alignStyle,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
