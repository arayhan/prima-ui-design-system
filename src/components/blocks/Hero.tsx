import React from 'react';
import { Button } from '../core/Button';

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeroProps {
  /** Mono eyebrow, rendered with a `//` prefix — e.g. "DESIGN SYSTEM" */
  eyebrow?: string;
  /** ALL-CAPS Clash Display headline. Use \n for manual line breaks. */
  title: string;
  /** Body-large lede under the headline */
  lede?: string;
  /** Cobalt primary CTA */
  primaryAction?: HeroAction;
  /** Ink-bordered secondary CTA */
  secondaryAction?: HeroAction;
  /** Optional media slot (illustration, canvas, image) shown beside the copy */
  media?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima hero — the page opener. Mono `//` eyebrow, mega Clash Display caps title
 * (one manual line break max), lede, and a primary/secondary Button pair. An optional
 * `media` slot sits to the right on wide viewports and below the copy on narrow ones.
 */
export function Hero({ eyebrow, title, lede, primaryAction, secondaryAction, media, style, className }: HeroProps) {
  return (
    <div className={className} style={{
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-8)',
      padding: 'var(--space-9) 0', ...style,
    }}>
      <div style={{ flex: '1 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {eyebrow && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
          } as React.CSSProperties}>// {eyebrow}</span>
        )}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, var(--text-display))', fontWeight: 600,
          lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)', textTransform: 'uppercase',
          color: 'var(--on-surface)', margin: 0, whiteSpace: 'pre-line',
        } as React.CSSProperties}>{title}</h1>
        {lede && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
            lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)', margin: 0, maxWidth: 560,
          } as React.CSSProperties}>{lede}</p>
        )}
        {(primaryAction || secondaryAction) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
            {primaryAction && (
              <Button href={primaryAction.href} onClick={primaryAction.onClick} icon="→">{primaryAction.label}</Button>
            )}
            {secondaryAction && (
              <Button variant="secondary" href={secondaryAction.href} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
      {media && <div style={{ flex: '1 1 380px', minWidth: 0 }}>{media}</div>}
    </div>
  );
}
