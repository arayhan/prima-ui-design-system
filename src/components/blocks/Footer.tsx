import React from 'react';
import { SocialLinks } from '../core/SocialLinks';
import type { SocialLink } from '../core/SocialLinks';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  /** Mono uppercase column heading — e.g. "INDEX" */
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  /** Wordmark — e.g. "PRIMA UI" */
  name?: string;
  /** Body line under the wordmark */
  tagline?: string;
  /** Mono nav columns */
  columns?: FooterColumn[];
  /** Social links row; omit to use SocialLinks defaults */
  links?: SocialLink[];
  /** Copyright / colophon line — e.g. "© 2026 A. Rayhan Primadedas" */
  note?: string;
  style?: React.CSSProperties;
  className?: string;
}

function FooterAnchor({ link }: { link: FooterLink }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={link.href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 500,
        color: hover ? 'var(--primary)' : 'var(--text-secondary)', textDecoration: 'none',
        transition: 'color var(--duration-fast) var(--ease-spatial)', width: 'fit-content',
      }}
    >{link.label}</a>
  );
}

/**
 * Prima footer — a 3px ink rule opens it (the page's closing section rule), then
 * the Clash Display wordmark + tagline, mono-headed nav columns, SocialLinks,
 * and a mono copyright line under a hairline.
 */
export function Footer({ name = 'PRIMA UI', tagline, columns = [], links, note, style, className }: FooterProps) {
  return (
    <footer className={className} style={{
      borderTop: 'var(--border-width-rule) solid var(--border-strong)',
      paddingTop: 'var(--space-7)', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)', ...style,
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', flex: '1 1 280px' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase', color: 'var(--on-surface)',
          } as React.CSSProperties}>{name}</span>
          {tagline && (
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 400,
              lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', margin: 0, maxWidth: 380,
            }}>{tagline}</p>
          )}
          <SocialLinks links={links} />
        </div>
        {columns.map((col) => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
            } as React.CSSProperties}>// {col.title}</span>
            {col.links.map((link) => <FooterAnchor key={link.label} link={link} />)}
          </div>
        ))}
      </div>
      {note && (
        <div style={{
          borderTop: 'var(--border-width) solid var(--border)', paddingTop: 'var(--space-4)',
          paddingBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
          } as React.CSSProperties}>{note}</span>
        </div>
      )}
    </footer>
  );
}
