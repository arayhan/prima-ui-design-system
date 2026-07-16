import React from 'react';
import { Card } from '../core/Card';
import { Avatar } from '../advanced/Avatar';

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialsProps {
  items: Testimonial[];
  /** Column count on wide viewports (collapses automatically when narrow) */
  columns?: 2 | 3;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Prima testimonials — a grid of quote Cards opened by a cobalt Clash Display
 * quotation mark, Inter body copy, and an Avatar + mono name/role footer.
 */
export function Testimonials({ items, columns = 3, style, className }: TestimonialsProps) {
  return (
    <div className={className} style={{
      display: 'grid', gap: 'var(--space-5)',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${columns === 2 ? 380 : 280}px), 1fr))`,
      ...style,
    }}>
      {items.map((item, i) => (
        <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <span aria-hidden="true" style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 1, color: 'var(--primary)',
          } as React.CSSProperties}>&ldquo;</span>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-lg)', fontWeight: 500,
            lineHeight: 'var(--leading-body-lg)', color: 'var(--on-surface)', margin: 0, flex: 1,
          } as React.CSSProperties}>{item.quote}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Avatar name={item.name} src={item.avatar} size={40} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
              } as React.CSSProperties}>{item.name}</span>
              {item.role && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)',
                } as React.CSSProperties}>{item.role}</span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
