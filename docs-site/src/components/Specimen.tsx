import React from 'react';
import { CodeBlock } from './CodeBlock';
import { PropsTable, type PropMeta } from './PropsTable';

export interface SpecimenProps {
  id: string;
  name: string;
  description: string;
  /** Live rendered demo */
  children: React.ReactNode;
  snippet: string;
  props?: PropMeta[];
  /** Demo needs full width (no centered row) */
  block?: boolean;
}

type Tab = 'preview' | 'code' | 'props';

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
        color: active ? 'var(--primary)' : hover ? 'var(--on-surface)' : 'var(--text-secondary)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2) 0',
        borderBottom: `var(--border-width-emphasis) solid ${active ? 'var(--primary)' : 'transparent'}`,
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      } as React.CSSProperties}
    >{children}</button>
  );
}

/**
 * Specimen frame — shadcn-style Preview / Code / Props tabs under the component
 * title. Preview is a bordered canvas rendering the real component.
 */
export function Specimen({ id, name, description, children, snippet, props, block = false }: SpecimenProps) {
  const [tab, setTab] = React.useState<Tab>('preview');

  return (
    <div id={id} data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', scrollMarginTop: 96 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', fontWeight: 600,
          lineHeight: 'var(--leading-h3)', letterSpacing: 'var(--tracking-heading)', textTransform: 'uppercase',
          color: 'var(--on-surface)', margin: 0,
        } as React.CSSProperties}>{name}</h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
          color: 'var(--text-secondary)', margin: 0, maxWidth: 640,
        }}>{description}</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-5)', borderBottom: 'var(--border-width) solid var(--border)' }}>
        <TabButton active={tab === 'preview'} onClick={() => setTab('preview')}>Preview</TabButton>
        <TabButton active={tab === 'code'} onClick={() => setTab('code')}>Code</TabButton>
        {props && props.length > 0 && (
          <TabButton active={tab === 'props'} onClick={() => setTab('props')}>Props</TabButton>
        )}
      </div>

      {tab === 'preview' && (
        <div style={{
          border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)',
          background: 'var(--surface)', minHeight: 180,
          padding: 'clamp(var(--space-5), 4vw, var(--space-7))',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: block ? 'stretch' : 'center',
          gap: 'var(--space-5)',
        }}>
          {block ? <div style={{ width: '100%' }}>{children}</div> : children}
        </div>
      )}
      {tab === 'code' && <CodeBlock code={snippet} label={`${name}.TSX`} />}
      {tab === 'props' && <PropsTable props={props ?? []} />}
    </div>
  );
}
