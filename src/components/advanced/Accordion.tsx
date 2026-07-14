import React from 'react';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several items open at once. Default false. */
  multiple?: boolean;
  /** Index open initially */
  defaultOpen?: number;
  style?: React.CSSProperties;
}

function Row({ item, index, open, onToggle, last }: {
  item: AccordionItem; index: number; open: boolean; onToggle: () => void; last: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ borderBottom: last ? 'none' : 'var(--border-width) solid var(--border)' }}>
      <button
        type="button" aria-expanded={open}
        onClick={onToggle}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '100%',
          padding: 'var(--space-4) 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)', color: open ? 'var(--primary)' : 'var(--text-secondary)',
          flex: 'none', transition: 'color var(--duration-fast) var(--ease-spatial)',
        } as React.CSSProperties}>{String(index + 1).padStart(3, '0')}</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
          color: open || hover ? 'var(--primary)' : 'var(--on-surface)', flex: 1,
          transition: 'color var(--duration-fast) var(--ease-spatial)',
        } as React.CSSProperties}>{item.title}</span>
        <i
          className="ph ph-plus" aria-hidden="true"
          style={{
            fontSize: 18, flex: 'none', color: open ? 'var(--primary)' : 'var(--on-surface)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform var(--duration-base) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
          }}
        />
      </button>
      <div style={{
        display: 'grid', gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--duration-base) var(--ease-spatial)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '0 0 var(--space-5) calc(var(--space-4) + 34px)',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)', color: 'var(--text-secondary)', maxWidth: 640,
          }}>{item.content}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Prima accordion — hairline-separated rows with mono running numbers and a
 * plus glyph that rotates into a close. Height animates via the grid-rows trick.
 */
export function Accordion({ items, multiple = false, defaultOpen, style }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<number>>(
    () => new Set(defaultOpen !== undefined ? [defaultOpen] : []),
  );

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : (prev.has(i) ? prev : []));
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div style={{ borderTop: 'var(--border-width-emphasis) solid var(--border-strong)', ...style }}>
      {items.map((item, i) => (
        <Row key={i} item={item} index={i} open={open.has(i)} onToggle={() => toggle(i)} last={i === items.length - 1} />
      ))}
    </div>
  );
}
