import React from 'react';

export interface CodeSnippetProps {
  code: string;
  /** Mono toolbar label — e.g. "INSTALL.SH" */
  label?: string;
  /** Hide the copy button */
  noCopy?: boolean;
  style?: React.CSSProperties;
}

/**
 * Prima code snippet — an ink storytelling panel with a mono toolbar and copy
 * button. Monochrome on purpose (zero dependencies); pair with a highlighter
 * in your app if you need color.
 */
export function CodeSnippet({ code, label = 'CODE', noCopy = false, style }: CodeSnippetProps) {
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
        {!noCopy && (
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
        )}
      </div>
      <pre style={{
        margin: 0, padding: 'var(--space-5)', overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)', fontWeight: 400,
        lineHeight: 'var(--leading-code)', color: 'var(--on-inverse)',
      }}>
        <code style={{ fontFamily: 'inherit', fontSize: 'inherit' }}>{code}</code>
      </pre>
    </div>
  );
}
