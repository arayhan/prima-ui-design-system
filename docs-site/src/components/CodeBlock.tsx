import React from 'react';
import type { HighlighterCore } from 'shiki';

type Lang = 'tsx' | 'bash';

// Lazy singleton — fine-grained shiki core: only the two grammars and one theme
// we use, on the JS regex engine (no WASM). Loads once, in its own chunk.
let highlighterPromise: Promise<HighlighterCore> | null = null;
function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('@shikijs/langs/tsx'),
      import('@shikijs/langs/bash'),
      import('@shikijs/themes/github-dark-default'),
    ]).then(([core, engine, tsx, bash, theme]) =>
      core.createHighlighterCore({
        langs: [tsx.default, bash.default],
        themes: [theme.default],
        engine: engine.createJavaScriptRegexEngine({ forgiving: true }),
      }),
    );
  }
  return highlighterPromise;
}

function useHighlighted(code: string, lang: Lang): string | null {
  const [html, setHtml] = React.useState<string | null>(null);
  React.useEffect(() => {
    let alive = true;
    getHighlighter().then((h) => {
      if (!alive) return;
      setHtml(h.codeToHtml(code, {
        lang, theme: 'github-dark-default',
        colorReplacements: { '#0d1117': 'transparent' },
      }));
    }).catch(() => { /* keep plain fallback */ });
    return () => { alive = false; };
  }, [code, lang]);
  return html;
}

export interface CodeBlockProps {
  code: string;
  /** Mono toolbar label — e.g. "USAGE.TSX" */
  label?: string;
  lang?: Lang;
  style?: React.CSSProperties;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable — ignore */ }
  };
  return (
    <button
      onClick={copy} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      aria-label={copied ? 'Copied' : 'Copy code'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: copied ? 'var(--success)' : hover ? 'var(--on-inverse)' : 'var(--inverse-muted)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        transition: 'color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >
      <i className={copied ? 'ph ph-check' : 'ph ph-copy'} aria-hidden="true" style={{ fontSize: 14 }} />
      {copied ? 'COPIED' : 'COPY'}
    </button>
  );
}

/**
 * Prima code panel — shadcn-style: an ink surface with a mono toolbar, a copy
 * button, and Shiki syntax highlighting (github-dark on the Prima ink).
 */
export function CodeBlock({ code, label = 'TSX', lang = 'tsx', style }: CodeBlockProps) {
  const html = useHighlighted(code, lang);

  return (
    <div style={{
      background: 'var(--inverse-surface)', borderRadius: 'var(--radius-md)',
      border: 'var(--border-width) solid var(--inverse-border)', overflow: 'hidden', ...style,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'var(--space-3) var(--space-5)',
        borderBottom: 'var(--border-width) solid var(--inverse-border)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--inverse-muted)',
        } as React.CSSProperties}>// {label}</span>
        <CopyButton code={code} />
      </div>
      <div className="prima-code">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre><code style={{ color: 'var(--on-inverse)' }}>{code}</code></pre>
        )}
        <style>{`
          .prima-code pre {
            margin: 0; padding: var(--space-5); overflow-x: auto;
            background: transparent !important;
            font-family: var(--font-mono); font-size: var(--text-code); line-height: var(--leading-code);
          }
          .prima-code code { font-family: inherit; font-size: inherit; background: transparent; }
        `}</style>
      </div>
    </div>
  );
}
