import React from 'react';
import { Chip } from '../core/Chip';

export interface BlogPost {
  /** Mono date column — e.g. "JUL 2026" */
  date: string;
  title: string;
  description?: string;
  tags?: string[];
  href?: string;
  /** Mono read-time — e.g. "6 MIN" */
  readTime?: string;
}

export interface BlogListProps {
  posts: BlogPost[];
  style?: React.CSSProperties;
}

function PostRow({ post, last }: { post: BlogPost; last: boolean }) {
  const [hover, setHover] = React.useState(false);
  const Tag: any = post.href ? 'a' : 'div';
  return (
    <Tag
      href={post.href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap',
        padding: 'var(--space-5) 0', textDecoration: 'none',
        borderBottom: last ? 'none' : 'var(--border-width) solid var(--border)',
        cursor: post.href ? 'pointer' : 'default',
      }}
    >
      <span style={{
        flex: 'none', width: 96, paddingTop: 4,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
      } as React.CSSProperties}>{post.date}</span>
      <span style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
          color: hover && post.href ? 'var(--primary)' : 'var(--on-surface)',
          transition: 'color var(--duration-fast) var(--ease-spatial)',
        } as React.CSSProperties}>{post.title}</span>
        {post.description && (
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
            color: 'var(--text-secondary)', maxWidth: 560,
          }}>{post.description}</span>
        )}
        {post.tags && post.tags.length > 0 && (
          <span style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-1)' }}>
            {post.tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </span>
        )}
      </span>
      <span style={{
        flex: 'none', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', paddingTop: 4,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)',
      } as React.CSSProperties}>
        {post.readTime}
        {post.href && (
          <span aria-hidden="true" style={{
            color: 'var(--primary)', fontSize: 'var(--text-h3)', lineHeight: 1,
            transform: hover ? 'translateX(6px)' : 'translateX(0)',
            transition: 'transform var(--duration-base) var(--ease-spatial)',
          }}>→</span>
        )}
      </span>
    </Tag>
  );
}

/**
 * Prima blog list — hairline-separated article rows: mono date column, caps
 * title that goes cobalt on hover with an arrow nudge, optional description,
 * chips, and read-time.
 */
export function BlogList({ posts, style }: BlogListProps) {
  return (
    <div style={{ borderTop: 'var(--border-width-emphasis) solid var(--border-strong)', ...style }}>
      {posts.map((post, i) => <PostRow key={post.title} post={post} last={i === posts.length - 1} />)}
    </div>
  );
}
