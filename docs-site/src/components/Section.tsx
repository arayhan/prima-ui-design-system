import React from 'react';

/** Centered content column — Prima's 1200px container. */
export function Container({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-pad)', ...style }}>
      {children}
    </div>
  );
}

/** Page section — anchor id, vertical rhythm, containered children. */
export function Section({ id, children, style }: { id: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section id={id} style={{ padding: 'clamp(var(--space-7), 9vw, var(--space-9)) 0', scrollMarginTop: 64, ...style }}>
      <Container>{children}</Container>
    </section>
  );
}
