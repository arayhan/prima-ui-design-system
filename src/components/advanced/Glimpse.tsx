import React from 'react';
import { Spinner } from '../core/Spinner';

export interface GlimpseData {
  title?: string;
  description?: string;
  image?: string;
  /** Displayed domain/url text at the bottom of the card */
  url: string;
}

export interface GlimpseProps {
  href: string;
  children: React.ReactNode;
  /** Static preview data */
  data?: GlimpseData;
  /** OR lazily load it the first time the link is hovered (e.g. from your own API route) */
  loadData?: (href: string) => Promise<GlimpseData>;
  /** Delay before showing, in ms. Default 400. */
  openDelay?: number;
  /** Delay before hiding after the pointer leaves, in ms. Default 150. */
  closeDelay?: number;
  className?: string;
}

/**
 * Prima glimpse — hovering (or focusing) a link reveals a floating preview
 * card after a short delay, like a social-media link unfurl. Uses the same
 * open/close timer pattern as HoverCard.tsx. Preview data is supplied
 * directly via `data`, or lazily via `loadData` (called once per hover,
 * guarded against stale responses the same way Combobox.tsx's `loadOptions` is).
 */
export function Glimpse({ href, children, data, loadData, openDelay = 400, closeDelay = 150, className }: GlimpseProps) {
  const [open, setOpen] = React.useState(false);
  const [resolved, setResolved] = React.useState<GlimpseData | undefined>(data);
  const [loading, setLoading] = React.useState(false);
  const openTimer = React.useRef<number>();
  const closeTimer = React.useRef<number>();
  const requestHref = React.useRef<string | null>(null);

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const runLoad = () => {
    if (!loadData || data) return;
    requestHref.current = href;
    setLoading(true);
    loadData(href)
      .then((result) => {
        if (requestHref.current !== href) return; // stale response, ignore
        setResolved(result);
        setLoading(false);
      })
      .catch(() => {
        if (requestHref.current === href) setLoading(false);
      });
  };

  const scheduleOpen = () => {
    window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => {
      setOpen(true);
      runLoad();
    }, openDelay);
  };

  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  React.useEffect(() => clearTimers, []);

  // Keep resolved data in sync if a static `data` prop is passed/changed.
  React.useEffect(() => { if (data) setResolved(data); }, [data]);

  const card = resolved || (data ?? undefined);

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}
      onFocus={scheduleOpen} onBlur={scheduleClose}
    >
      <a href={href}>{children}</a>
      {open && (
        <div
          onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 40, width: 320,
            background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-floating)', overflow: 'hidden',
            animation: `prima-glimpse-in var(--duration-base) var(--ease-spatial) both`,
          } as React.CSSProperties}
        >
          {loading && !card ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
              <Spinner size={20} />
            </div>
          ) : card ? (
            <>
              {card.image && (
                <img
                  src={card.image} alt=""
                  style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ padding: 'var(--space-4)' }}>
                {card.title && (
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)',
                    textTransform: 'uppercase', color: 'var(--on-surface)',
                  } as React.CSSProperties}>
                    {card.title}
                  </div>
                )}
                {card.description && (
                  <div style={{
                    marginTop: 'var(--space-2)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
                    color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  } as React.CSSProperties}>
                    {card.description}
                  </div>
                )}
                <div style={{
                  marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--primary)',
                } as React.CSSProperties}>
                  <i className="ph ph-link" aria-hidden="true" style={{ fontSize: 12 }} />
                  {card.url}
                </div>
              </div>
            </>
          ) : null}
          <style>{`@keyframes prima-glimpse-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}
    </span>
  );
}
