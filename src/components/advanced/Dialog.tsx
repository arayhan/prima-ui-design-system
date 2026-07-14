import React from 'react';
import { createPortal } from 'react-dom';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Mono eyebrow above the title */
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  /** Footer slot — typically a Button pair */
  actions?: React.ReactNode;
  /** Max panel width in px. Default 480. */
  width?: number;
}

/**
 * Prima dialog — a centered white panel over the scrim, rendered in a portal
 * so ancestor transforms can't trap it. Escape and scrim click close; body
 * scroll locks while open.
 */
export function Dialog({ open, onClose, eyebrow, title, children, actions, width = 480 }: DialogProps) {
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
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-5)',
        animation: 'prima-dialog-fade var(--duration-fast) var(--ease-spatial) both',
      }}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        style={{
          width: '100%', maxWidth: width, maxHeight: '85vh', overflowY: 'auto',
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          border: 'var(--border-width) solid var(--border)',
          padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
          animation: 'prima-dialog-in var(--duration-base) var(--ease-spatial) both',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
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
            onClick={onClose} aria-label="Close dialog"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              color: 'var(--text-secondary)', lineHeight: 1, flex: 'none',
            }}
          >
            <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
        </div>
        {children && (
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)',
          }}>{children}</div>
        )}
        {actions && (
          <div style={{
            display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', flexWrap: 'wrap',
            borderTop: 'var(--border-width) solid var(--border)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)',
          }}>{actions}</div>
        )}
      </div>
      <style>{`
        @keyframes prima-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes prima-dialog-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>,
    document.body,
  );
}
