import React from 'react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

const VARIANTS: Record<BannerVariant, { color: string; icon: string }> = {
  info: { color: 'var(--info)', icon: 'ph ph-info' },
  success: { color: 'var(--success)', icon: 'ph ph-check-circle' },
  warning: { color: 'var(--warning)', icon: 'ph ph-warning' },
  error: { color: 'var(--error)', icon: 'ph ph-x-circle' },
};

export interface BannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BannerProps {
  children: React.ReactNode; // message content
  variant?: BannerVariant; // default 'info'
  /** Optional inline action link/button */
  action?: BannerAction;
  /** Shows a dismiss (x) button; called when clicked */
  onDismiss?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

function ActionLink({ action, color }: { action: BannerAction; color: string }) {
  const [hover, setHover] = React.useState(false);
  const Tag: any = action.href ? 'a' : 'button';
  return (
    <Tag
      href={action.href}
      onClick={action.onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, lineHeight: 1.4,
        color, textDecoration: 'none', whiteSpace: 'nowrap',
        borderBottom: `var(--border-width) solid ${hover ? color : 'transparent'}`,
        transition: 'border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      {action.label}
    </Tag>
  );
}

function DismissButton({ onDismiss }: { onDismiss: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onDismiss} aria-label="Dismiss"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 2, flex: 'none', lineHeight: 1,
        color: hover ? 'var(--on-surface)' : 'var(--text-secondary)',
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 16 }} />
    </button>
  );
}

/**
 * Prima banner — full-width, page-level notification. Where Alert is a
 * bordered card meant to sit inline within content, Banner spans edge to
 * edge with a bolder semantic top rule, for pinning at the top of a page
 * or section. Reuses Alert's exact semantic color/icon mapping.
 */
export function Banner({ children, variant = 'info', action, onDismiss, style, className }: BannerProps) {
  const v = VARIANTS[variant];
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} className={className} style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
      background: 'var(--background)',
      borderTop: `var(--border-width-rule) solid ${v.color}`,
      borderBottom: 'var(--border-width) solid var(--border)',
      padding: 'var(--space-4) var(--container-pad)', ...style,
    }}>
      <i className={v.icon} aria-hidden="true" style={{ fontSize: 20, color: v.color, flex: 'none' }} />
      <div style={{
        flex: 1, minWidth: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
        lineHeight: 1.5, color: 'var(--on-surface)',
      }}>{children}</div>
      {action && <ActionLink action={action} color={v.color} />}
      {onDismiss && <DismissButton onDismiss={onDismiss} />}
    </div>
  );
}
