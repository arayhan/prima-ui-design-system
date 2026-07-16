import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const VARIANTS: Record<AlertVariant, { color: string; icon: string }> = {
  info: { color: 'var(--info)', icon: 'ph ph-info' },
  success: { color: 'var(--success)', icon: 'ph ph-check-circle' },
  warning: { color: 'var(--warning)', icon: 'ph ph-warning' },
  error: { color: 'var(--error)', icon: 'ph ph-x-circle' },
};

export interface AlertProps {
  variant?: AlertVariant;
  title: string;
  /** Description body under the title */
  children?: React.ReactNode;
  /** Renders a dismiss button when provided */
  onClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

function CloseButton({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClose} aria-label="Dismiss"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 2, marginLeft: 'auto',
        color: hover ? 'var(--on-surface)' : 'var(--text-secondary)', lineHeight: 1, flex: 'none',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 16 }} />
    </button>
  );
}

/**
 * Prima alert — white surface, hairline border, and a 3px semantic rule on the left
 * edge. Icon and rule take the semantic color; the body stays ink. Semantic colors
 * are functional here, never decorative.
 */
export function Alert({ variant = 'info', title, children, onClose, style, className }: AlertProps) {
  const v = VARIANTS[variant];
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} className={className} style={{
      display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
      background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
      borderLeft: `var(--border-width-rule) solid ${v.color}`,
      borderRadius: 'var(--radius-sm)', padding: 'var(--space-4)', ...style,
    }}>
      <i className={v.icon} aria-hidden="true" style={{ fontSize: 20, lineHeight: 1.3, color: v.color, flex: 'none' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', minWidth: 0 }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 600,
          lineHeight: 1.4, color: 'var(--on-surface)',
        }}>{title}</span>
        {children && (
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)',
          }}>{children}</span>
        )}
      </div>
      {onClose && <CloseButton onClose={onClose} />}
    </div>
  );
}
