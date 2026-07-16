import React from 'react';
import { createPortal } from 'react-dom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Mono eyebrow above the title */
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  /** Footer slot pinned to the bottom */
  actions?: React.ReactNode;
  /** Which edge the panel slides from. Default 'right'. */
  side?: 'left' | 'right';
  /** Panel width in px. Default 400. */
  width?: number;
  className?: string;
}

/**
 * Prima drawer — a full-height side panel that slides over the scrim.
 * Portal-rendered; Escape and scrim click close; body scroll locks while open.
 */
export function Drawer({ open, onClose, eyebrow, title, children, actions, side = 'right', width = 400, className }: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 80, background: 'var(--scrim)',
        animation: 'prima-drawer-fade var(--duration-fast) var(--ease-spatial) both',
      }}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        className={className}
        style={{
          position: 'absolute', top: 0, bottom: 0, [side]: 0,
          width, maxWidth: 'calc(100vw - 48px)',
          background: 'var(--surface)',
          borderLeft: side === 'right' ? 'var(--border-width) solid var(--border)' : 'none',
          borderRight: side === 'left' ? 'var(--border-width) solid var(--border)' : 'none',
          display: 'flex', flexDirection: 'column',
          animation: `prima-drawer-in-${side} var(--duration-base) var(--ease-spatial) both`,
        } as React.CSSProperties}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)',
          padding: 'var(--space-6)', borderBottom: 'var(--border-width) solid var(--border)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {eyebrow && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
              } as React.CSSProperties}>// {eyebrow}</span>
            )}
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
              lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
              color: 'var(--on-surface)', margin: 0,
            } as React.CSSProperties}>{title}</h3>
          </div>
          <button
            onClick={onClose} aria-label="Close drawer"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              color: 'var(--text-secondary)', lineHeight: 1, flex: 'none',
            }}
          >
            <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
        </div>
        <div style={{
          flex: 1, overflowY: 'auto', padding: 'var(--space-6)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
          lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)',
        }}>{children}</div>
        {actions && (
          <div style={{
            display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', flexWrap: 'wrap',
            padding: 'var(--space-5) var(--space-6)', borderTop: 'var(--border-width) solid var(--border)',
          }}>{actions}</div>
        )}
      </div>
      <style>{`
        @keyframes prima-drawer-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes prima-drawer-in-right { from { transform: translateX(24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes prima-drawer-in-left { from { transform: translateX(-24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>,
    document.body,
  );
}
