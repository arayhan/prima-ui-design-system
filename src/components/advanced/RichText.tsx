import React from 'react';
import { cx } from '../core/_cx';

export interface RichTextProps {
  /** Rendered HTML content (headings, paragraphs, lists, quotes, code…) */
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

// Descendant styling needs real CSS — same precedent as Marquee's keyframes.
// Everything below reads tokens; nothing is hard-coded.
const PROSE_CSS = `
.prima-prose { font-family: var(--font-body); font-size: var(--text-body); line-height: var(--leading-body); color: var(--on-surface); max-width: 680px; }
.prima-prose > * + * { margin-top: var(--space-4); }
.prima-prose h2, .prima-prose h3 { font-family: var(--font-display); text-transform: uppercase; letter-spacing: var(--tracking-heading); color: var(--on-surface); }
.prima-prose h2 { font-size: var(--text-h2); line-height: var(--leading-h2); font-weight: 600; margin-top: var(--space-7); }
.prima-prose h3 { font-size: var(--text-h3); line-height: var(--leading-h3); font-weight: 600; margin-top: var(--space-6); }
.prima-prose p { margin-bottom: 0; color: var(--text-secondary); }
.prima-prose strong { color: var(--on-surface); font-weight: 600; }
.prima-prose a { color: var(--primary); text-decoration: none; border-bottom: var(--border-width) solid var(--primary); }
.prima-prose a:hover { color: var(--primary-hover); }
.prima-prose ul, .prima-prose ol { padding-left: var(--space-5); color: var(--text-secondary); }
.prima-prose li + li { margin-top: var(--space-2); }
.prima-prose li::marker { font-family: var(--font-mono); color: var(--primary); }
.prima-prose blockquote { margin: var(--space-5) 0 0; padding: var(--space-4) var(--space-5); border-left: var(--border-width-rule) solid var(--primary); background: var(--surface); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; color: var(--on-surface); font-size: var(--text-body-lg); line-height: var(--leading-body-lg); font-weight: 500; }
.prima-prose code { font-family: var(--font-mono); font-size: var(--text-code); background: var(--background); border: var(--border-width) solid var(--border); border-radius: 4px; padding: 1px 6px; color: var(--primary); }
.prima-prose pre { background: var(--inverse-surface); color: var(--on-inverse); border-radius: var(--radius-md); padding: var(--space-5); overflow-x: auto; }
.prima-prose pre code { background: none; border: none; padding: 0; color: inherit; font-size: var(--text-code); line-height: var(--leading-code); }
.prima-prose hr { border: none; border-top: var(--border-width) solid var(--border); margin: var(--space-6) 0 0; }
.prima-prose img { max-width: 100%; border-radius: var(--radius-md); border: var(--border-width) solid var(--border); }
`;

/**
 * Prima rich text — long-form prose styling for article/blog content. Wrap
 * rendered markdown/CMS HTML; headings, links, lists, quotes, and code all
 * pick up the Prima voice.
 */
export function RichText({ children, style, className }: RichTextProps) {
  return (
    <div className={cx('prima-prose', className)} style={style}>
      {children}
      <style>{PROSE_CSS}</style>
    </div>
  );
}
