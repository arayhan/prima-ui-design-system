import React from 'react';
import { Button } from '../core/Button';
import { SocialLinks } from '../core/SocialLinks';
import type { SocialLink } from '../core/SocialLinks';

export interface CTAAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface CTASectionProps {
  /** Mono eyebrow, rendered with a `//` prefix */
  eyebrow?: string;
  /** ALL-CAPS Clash Display headline. Use \n for manual line breaks. */
  title: string;
  /** Cobalt CTA button */
  action?: CTAAction;
  /** Mono email line rendered as a mailto link */
  email?: string;
  /** Social links row; omit to use SocialLinks defaults */
  links?: SocialLink[];
  style?: React.CSSProperties;
  className?: string;
}

function EmailLink({ email }: { email: string }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={`mailto:${email}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body)', fontWeight: 500,
        color: hover ? 'var(--primary)' : 'var(--on-inverse)', textDecoration: 'none',
        borderBottom: `var(--border-width) solid ${hover ? 'var(--primary)' : 'var(--inverse-border)'}`,
        paddingBottom: 2, width: 'fit-content',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >{email}</a>
  );
}

/**
 * Prima CTA / contact block — the ink storytelling surface. Mono `//` eyebrow,
 * big caps headline, cobalt CTA, mono email link, and a SocialLinks row.
 */
export function CTASection({ eyebrow, title, action, email, links, style, className }: CTASectionProps) {
  return (
    <div className={className} style={{
      background: 'var(--inverse-surface)', borderRadius: 'var(--radius-lg)',
      padding: 'clamp(var(--space-7), 8vw, var(--space-9))',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', ...style,
    }}>
      {eyebrow && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
        } as React.CSSProperties}>// {eyebrow}</span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, var(--text-h1))', fontWeight: 600,
        lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-inverse)', margin: 0, maxWidth: 760, whiteSpace: 'pre-line',
      } as React.CSSProperties}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-6)' }}>
        {action && (
          <Button href={action.href} onClick={action.onClick} icon="→">{action.label}</Button>
        )}
        {email && <EmailLink email={email} />}
      </div>
      <SocialLinks links={links} />
    </div>
  );
}
