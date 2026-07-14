import React from 'react';
import { Button } from '../core/Button';
import type { EmptyStateAction } from './EmptyState';

export interface ErrorStateProps {
  /** The big code — e.g. "404", "500". Default "404". */
  code?: string;
  title: string;
  description?: string;
  /** Primary action — usually "Back to home" */
  action?: EmptyStateAction;
  /** Full-page treatment (min-height 60vh, centered) for error pages */
  fullPage?: boolean;
  style?: React.CSSProperties;
}

/**
 * Prima error state — a mono `// ERROR` eyebrow, the code in mega Clash Display
 * cobalt, caps title, muted description, and a way back. Use `fullPage` for
 * 404/500 pages; omit it for inline error panels.
 */
export function ErrorState({ code = '404', title, description, action, fullPage = false, style }: ErrorStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', gap: 'var(--space-4)',
      minHeight: fullPage ? '60vh' : undefined,
      padding: fullPage ? 'var(--space-8) var(--space-5)' : 'var(--space-7) var(--space-5)', ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
      } as React.CSSProperties}>// ERROR</span>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(72px, 16vw, 140px)', fontWeight: 600,
        lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)',
        color: 'var(--primary)',
      } as React.CSSProperties}>{code}</span>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 600,
        lineHeight: 'var(--leading-h2)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', margin: 0,
      } as React.CSSProperties}>{title}</h2>
      {description && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
          color: 'var(--text-secondary)', margin: 0, maxWidth: 420,
        }}>{description}</p>
      )}
      {action && (
        <Button href={action.href} onClick={action.onClick} icon="→" style={{ marginTop: 'var(--space-2)' }}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
