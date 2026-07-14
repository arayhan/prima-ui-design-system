import React from 'react';
import type { AlertVariant } from './Alert';

const VARIANTS: Record<AlertVariant, { color: string; icon: string }> = {
  info: { color: 'var(--info)', icon: 'ph ph-info' },
  success: { color: 'var(--success)', icon: 'ph ph-check-circle' },
  warning: { color: 'var(--warning)', icon: 'ph ph-warning' },
  error: { color: 'var(--error)', icon: 'ph ph-x-circle' },
};

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: AlertVariant;
  /** Auto-dismiss delay in ms. Default 4000. */
  duration?: number;
}

interface ToastItem extends Required<Pick<ToastOptions, 'title' | 'variant' | 'duration'>> {
  id: number;
  description?: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Access the toast dispatcher. Must be used inside a ToastProvider. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>');
  return ctx;
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const v = VARIANTS[item.variant];
  const [hover, setHover] = React.useState(false);
  return (
    <div role="status" style={{
      display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
      width: 340, maxWidth: 'calc(100vw - 48px)',
      background: 'var(--inverse-surface)', color: 'var(--on-inverse)',
      border: 'var(--border-width) solid var(--inverse-border)',
      borderLeft: `var(--border-width-rule) solid ${v.color}`,
      borderRadius: 'var(--radius-sm)', padding: 'var(--space-4)',
      boxShadow: 'var(--shadow-floating)',
      animation: 'prima-toast-in var(--duration-base) var(--ease-spatial) both',
    }}>
      <i className={v.icon} aria-hidden="true" style={{ fontSize: 20, lineHeight: 1.3, color: v.color, flex: 'none' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', minWidth: 0 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 600, lineHeight: 1.4 }}>
          {item.title}
        </span>
        {item.description && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: 'var(--inverse-muted)' }}>
            {item.description}
          </span>
        )}
      </div>
      <button
        onClick={onClose} aria-label="Dismiss"
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 2, marginLeft: 'auto',
          color: hover ? 'var(--on-inverse)' : 'var(--inverse-muted)', lineHeight: 1, flex: 'none',
          transition: 'color var(--duration-fast) var(--ease-spatial)',
        }}
      >
        <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 14 }} />
      </button>
    </div>
  );
}

/**
 * Prima toast system. Wrap the app in ToastProvider, then dispatch from anywhere:
 * `const { toast } = useToast(); toast({ title: 'Saved', variant: 'success' })`.
 * Toasts stack bottom-right on the ink surface with a semantic rule, auto-dismiss,
 * and respect reduced motion via base.css.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const close = React.useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = ++idRef.current;
    const item: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 4000,
    };
    setItems((prev) => [...prev, item]);
    window.setTimeout(() => close(id), item.duration);
  }, [close]);

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" style={{
        position: 'fixed', bottom: 'var(--space-5)', right: 'var(--space-5)', zIndex: 100,
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', pointerEvents: 'none',
      }}>
        {items.map((item) => (
          <div key={item.id} style={{ pointerEvents: 'auto' }}>
            <ToastCard item={item} onClose={() => close(item.id)} />
          </div>
        ))}
        <style>{'@keyframes prima-toast-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }'}</style>
      </div>
    </ToastContext.Provider>
  );
}
