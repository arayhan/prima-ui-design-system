import React from 'react';
import { Button } from '../core/Button';

export interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface EmptyStateProps {
  /** Phosphor regular icon class. Default "ph ph-tray". */
  icon?: string;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima empty state — a centered hairline panel: icon in a bordered square,
 * caps title, muted description, optional cobalt action.
 */
export function EmptyState({ icon = 'ph ph-tray', title, description, action, style, className }: EmptyStateProps) {
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 'var(--space-4)', padding: 'var(--space-8) var(--space-6)',
      background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
      borderRadius: 'var(--radius-lg)', ...style,
    }}>
      <span style={{
        width: 56, height: 56, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
        background: 'var(--background)', color: 'var(--primary)',
      }}>
        <i className={icon} aria-hidden="true" style={{ fontSize: 26 }} />
      </span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
        lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', margin: 0,
      } as React.CSSProperties}>{title}</h3>
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
          color: 'var(--text-secondary)', margin: 0, maxWidth: 380,
        }}>{description}</p>
      )}
      {action && (
        <Button href={action.href} onClick={action.onClick} style={{ marginTop: 'var(--space-2)' }}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
