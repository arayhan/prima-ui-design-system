import React from 'react';
import { Chip } from '../core/Chip';
import { Avatar } from '../advanced/Avatar';

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface BlogDetailProps {
  /** Mono date — e.g. "JUL 2026" */
  date: string;
  title: string;
  lede?: string;
  tags?: string[];
  /** Mono read-time — e.g. "6 MIN" */
  readTime?: string;
  author?: BlogAuthor;
  backHref?: string;
  /** Default "ALL POSTS" */
  backLabel?: string;
  /** Article body — wrap in RichText for prose styling */
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima blog detail — the full article view that BlogList's rows link to.
 * Mono meta row (date, tags, read-time), Clash Display title, lede, an
 * optional author line, then a hairline rule before the article body.
 */
export function BlogDetail({
  date, title, lede, tags, readTime, author, backHref, backLabel = 'ALL POSTS', children, style, className,
}: BlogDetailProps) {
  return (
    <article className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', ...style }}>
      {backHref && (
        <a href={backHref} style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', width: 'fit-content',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: 'var(--primary)', textDecoration: 'none',
        } as React.CSSProperties}>← {backLabel}</a>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
        } as React.CSSProperties}>{date}</span>
        {readTime && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
          } as React.CSSProperties}>{readTime}</span>
        )}
        {tags && tags.length > 0 && (
          <span style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </span>
        )}
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, var(--text-h1))', fontWeight: 600,
        lineHeight: 'var(--leading-h1)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
        color: 'var(--on-surface)', margin: 0, maxWidth: 760,
      } as React.CSSProperties}>{title}</h1>
      {lede && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
          lineHeight: 'var(--leading-body-lg)', color: 'var(--text-secondary)', margin: 0, maxWidth: 640,
        } as React.CSSProperties}>{lede}</p>
      )}
      {author && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Avatar name={author.name} src={author.avatar} size={40} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
            } as React.CSSProperties}>{author.name}</span>
            {author.role && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
              } as React.CSSProperties}>{author.role}</span>
            )}
          </div>
        </div>
      )}
      {children && (
        <div style={{ borderTop: 'var(--border-width-rule) solid var(--border-strong)', paddingTop: 'var(--space-6)' }}>
          {children}
        </div>
      )}
    </article>
  );
}
