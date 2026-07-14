import React from 'react';

// Icons: Phosphor regular (thin 1.5px strokes). Consuming pages must load the
// Phosphor regular stylesheet — it ships in the design system's styles.css closure.
const ICON_CLASS: Record<string, string> = {
  github: 'ph ph-github-logo',
  linkedin: 'ph ph-linkedin-logo',
  instagram: 'ph ph-instagram-logo',
  medium: 'ph ph-medium-logo',
  x: 'ph ph-x-logo',
};

export type SocialName = keyof typeof ICON_CLASS;

export interface SocialLink {
  name: SocialName;
  label: string;
  href: string;
}

export interface SocialLinksProps {
  /** Square size in px, default 44 */
  size?: number;
  links?: SocialLink[];
}

function SocialSquare({ link, size }: { link: SocialLink; size: number }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={link.href} aria-label={link.label} title={link.label} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, borderRadius: 'var(--radius-sm)',
        border: `var(--border-width) solid ${hover ? 'var(--primary)' : 'var(--border)'}`,
        background: 'var(--surface)', color: hover ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className={ICON_CLASS[link.name]} aria-hidden="true" style={{ fontSize: Math.round(size * 0.5), lineHeight: 1 }} />
    </a>
  );
}

const LINKS: SocialLink[] = [
  { name: 'github', label: 'GitHub', href: 'https://github.com/arayhan' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/arayhan/' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/arayhan_/' },
  { name: 'medium', label: 'Medium', href: 'https://medium.com/@arayhan' },
];

/** Prima social links — a row of bordered square icon links; border and glyph go cobalt on hover. */
export function SocialLinks({ size = 44, links = LINKS }: SocialLinksProps) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      {links.map((l) => <SocialSquare key={l.name} link={l} size={size} />)}
    </div>
  );
}
