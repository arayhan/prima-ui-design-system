import React from 'react';
import { Button } from '../core/Button';

export interface PricingAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface PricingPlan {
  name: string;
  /** Big Clash Display price — e.g. "$12", "FREE" */
  price: string;
  /** Mono suffix after the price — e.g. "MO" */
  period?: string;
  description?: string;
  features: string[];
  action: PricingAction;
  /** Swaps the card to the ink storytelling surface with a cobalt border */
  highlighted?: boolean;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  style?: React.CSSProperties;
}

/**
 * Prima pricing table — a grid of plan cards; the `highlighted` plan swaps to
 * the ink surface with a cobalt border, mirroring CTASection's storytelling surface.
 */
export function PricingTable({ plans, style }: PricingTableProps) {
  return (
    <div style={{
      display: 'grid', gap: 'var(--space-5)',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
      ...style,
    }}>
      {plans.map((plan) => {
        const inverse = !!plan.highlighted;
        return (
          <div
            key={plan.name}
            style={{
              display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
              background: inverse ? 'var(--inverse-surface)' : 'var(--surface)',
              border: inverse
                ? 'var(--border-width-emphasis) solid var(--primary)'
                : 'var(--border-width) solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: 'var(--space-6)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--primary)',
            } as React.CSSProperties}>// {plan.name}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', fontWeight: 600,
                letterSpacing: 'var(--tracking-heading)', color: inverse ? 'var(--on-inverse)' : 'var(--on-surface)',
              } as React.CSSProperties}>{plan.price}</span>
              {plan.period && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)',
                  letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
                  color: inverse ? 'var(--inverse-muted)' : 'var(--text-secondary)',
                } as React.CSSProperties}>/{plan.period}</span>
              )}
            </div>
            {plan.description && (
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
                color: inverse ? 'var(--inverse-muted)' : 'var(--text-secondary)', margin: 0,
              }}>{plan.description}</p>
            )}
            <ul style={{
              display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              margin: 0, padding: 0, listStyle: 'none', flex: 1,
            }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)',
                  color: inverse ? 'var(--on-inverse)' : 'var(--on-surface)',
                }}>
                  <i className="ph ph-check" aria-hidden="true" style={{ color: 'var(--primary)', fontSize: 16, flex: 'none' }} />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={inverse ? 'primary' : 'secondary'}
              href={plan.action.href} onClick={plan.action.onClick}
            >{plan.action.label}</Button>
          </div>
        );
      })}
    </div>
  );
}
