import React from 'react';
import { createPortal } from 'react-dom';

export interface ImageZoomProps {
  src: string;
  alt: string;
  /** Thumbnail display width/height — natural image sizing if omitted */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima image zoom — a thumbnail that opens a full-screen lightbox (portal,
 * same scrim/Escape/scroll-lock pattern as Dialog) where the image scales up
 * and pans to follow the cursor.
 */
export function ImageZoom({ src, alt, style, className }: ImageZoomProps) {
  const [open, setOpen] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 50, y: 50 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={className}
        style={{
          cursor: 'zoom-in', borderRadius: 'var(--radius-md)',
          border: 'var(--border-width) solid var(--border)', ...style,
        }}
      />
      {open && createPortal(
        <div
          onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(12,15,22,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-5)',
            animation: 'prima-imagezoom-fade var(--duration-fast) var(--ease-spatial) both',
          }}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close zoomed image"
            style={{
              position: 'fixed', top: 'var(--space-5)', right: 'var(--space-5)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              color: '#fff', lineHeight: 1, zIndex: 91,
            }}
          >
            <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 22 }} />
          </button>
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
            style={{
              position: 'relative', maxWidth: '90vw', maxHeight: '90vh', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: '90vw', maxHeight: '90vh', display: 'block',
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transform: 'scale(2.5)',
                animation: 'prima-imagezoom-in var(--duration-base) var(--ease-spatial) both',
              }}
            />
          </div>
          <style>{`
            @keyframes prima-imagezoom-fade { from { opacity: 0; } to { opacity: 1; } }
            @keyframes prima-imagezoom-in { from { transform: scale(1); } to { transform: scale(2.5); } }
          `}</style>
        </div>,
        document.body,
      )}
    </>
  );
}
