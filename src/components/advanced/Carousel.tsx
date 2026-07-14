import React from 'react';

export interface CarouselProps {
  /** Slides — each becomes one snap-aligned panel */
  items: React.ReactNode[];
  /** Slide width as a CSS size. Default 'min(420px, 85%)'. */
  slideWidth?: string;
  /** Accessible name */
  label?: string;
  style?: React.CSSProperties;
}

function ArrowButton({ icon, label, onClick, disabled }: { icon: string; label: string; onClick: () => void; disabled: boolean }) {
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;
  return (
    <button
      type="button" aria-label={label} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--primary)' : 'var(--surface)', cursor: disabled ? 'not-allowed' : 'pointer',
        border: `var(--border-width-emphasis) solid ${active ? 'var(--primary)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-sm)', color: active ? 'var(--on-primary)' : 'var(--on-surface)',
        opacity: disabled ? 0.35 : 1,
        transition: 'background var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className={icon} aria-hidden="true" style={{ fontSize: 18 }} />
    </button>
  );
}

/**
 * Prima carousel — a scroll-snap track with prev/next controls and a mono
 * running counter ("002 / 005"). Native scrolling stays available (swipe,
 * trackpad); buttons scroll one slide, honoring reduced motion.
 */
export function Carousel({ items, slideWidth = 'min(420px, 85%)', label = 'Carousel', style }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const measure = React.useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const slide = track.children[0] as HTMLElement;
    const step = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    setIndex(Math.min(items.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
  }, [items.length]);

  const go = (delta: number) => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const slide = track.children[0] as HTMLElement;
    const step = slide.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: delta * step, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div role="region" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', ...style }}>
      <div
        ref={trackRef}
        onScroll={measure}
        style={{
          display: 'flex', gap: 'var(--space-5)', overflowX: 'auto',
          scrollSnapType: 'x mandatory', paddingBottom: 'var(--space-2)',
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ flex: 'none', width: slideWidth, scrollSnapAlign: 'start' }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
        } as React.CSSProperties}>
          <span style={{ color: 'var(--primary)' }}>{String(index + 1).padStart(3, '0')}</span>
          {' / '}{String(items.length).padStart(3, '0')}
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <ArrowButton icon="ph ph-arrow-left" label="Previous slide" onClick={() => go(-1)} disabled={index === 0} />
          <ArrowButton icon="ph ph-arrow-right" label="Next slide" onClick={() => go(1)} disabled={index >= items.length - 1} />
        </div>
      </div>
    </div>
  );
}
