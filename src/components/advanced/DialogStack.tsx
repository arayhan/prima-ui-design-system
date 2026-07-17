import React from 'react';
import { createPortal } from 'react-dom';

export interface DialogStackFrame {
  id: string;
  /** Mono eyebrow above the title */
  eyebrow?: string;
  title: string;
  content: React.ReactNode;
  /** Footer slot — typically a Button pair */
  actions?: React.ReactNode;
}

export interface DialogStackProps {
  open: boolean;
  /** Ordered stack — last item is the active/topmost frame */
  frames: DialogStackFrame[];
  /** Closes the ENTIRE stack (Escape, scrim click, or an explicit close action) */
  onClose: () => void;
  /** Pops back to the previous frame — if provided, a back button appears in the header when frames.length > 1 */
  onBack?: () => void;
  /** Max panel width in px. Default 480. */
  width?: number;
  className?: string;
}

/**
 * Prima dialog stack — a kibo-ui "Dialog Stack"-inspired multi-frame dialog.
 * Renders every frame in the stack as a centered panel over a single shared
 * scrim; older frames recede slightly (translated up + scaled down + faded)
 * behind the active, topmost frame. Same portal, scrim, Escape and
 * body-scroll-lock behavior as Dialog, and the same panel visual language.
 */
export function DialogStack({ open, frames, onClose, onBack, width = 480, className }: DialogStackProps) {
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

  if (!open || frames.length === 0) return null;

  return createPortal(
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 80, background: 'var(--scrim)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-5)',
        animation: 'prima-dialog-fade var(--duration-fast) var(--ease-spatial) both',
      }}
    >
      {frames.map((frame, i) => {
        const distanceFromTop = frames.length - 1 - i;
        const isTop = distanceFromTop === 0;
        const showBack = !!onBack && frames.length > 1;

        return (
          <div
            key={frame.id}
            role="dialog" aria-modal="true" aria-label={frame.title}
            className={className}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: `translate(-50%, -50%) translateY(${-distanceFromTop * 14}px) scale(${1 - distanceFromTop * 0.04})`,
              opacity: isTop ? 1 : Math.max(0.5, 1 - distanceFromTop * 0.15),
              pointerEvents: isTop ? 'auto' : 'none',
              zIndex: 80 + (frames.length - distanceFromTop),
              transition: 'transform 250ms var(--ease-spatial), opacity 250ms var(--ease-spatial)',
              width: '100%', maxWidth: width, maxHeight: '85vh', overflowY: 'auto',
              background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
              border: 'var(--border-width) solid var(--border)',
              padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {showBack && (
                    <button
                      onClick={onBack} aria-label="Back"
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: '0 0 0 -4px',
                        color: 'var(--text-secondary)', lineHeight: 1, flex: 'none',
                      }}
                    >
                      <i className="ph ph-arrow-left" aria-hidden="true" style={{ fontSize: 18 }} />
                    </button>
                  )}
                  {frame.eyebrow && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                      letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
                    } as React.CSSProperties}>// {frame.eyebrow}</span>
                  )}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
                  lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
                  color: 'var(--on-surface)', margin: 0,
                } as React.CSSProperties}>{frame.title}</h3>
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
            {frame.content && (
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)',
              }}>{frame.content}</div>
            )}
            {frame.actions && (
              <div style={{
                display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', flexWrap: 'wrap',
                borderTop: 'var(--border-width) solid var(--border)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-2)',
              }}>{frame.actions}</div>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes prima-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>,
    document.body,
  );
}
