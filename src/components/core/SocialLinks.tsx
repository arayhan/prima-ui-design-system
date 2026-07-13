import React from 'react';
import { IconButton } from './IconButton';

// Icons: Phosphor duotone (https://phosphoricons.com). Consuming pages must include:
// <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css">
const ICON_CLASS = {
  github: 'ph-duotone ph-github-logo',
  linkedin: 'ph-duotone ph-linkedin-logo',
  instagram: 'ph-duotone ph-instagram-logo',
  medium: 'ph-duotone ph-medium-logo',
};

export type SocialName = keyof typeof ICON_CLASS;

export interface SocialIconProps {
  name: SocialName;
  size?: number;
}

export function SocialIcon({ name, size = 18 }: SocialIconProps) {
  return <i className={ICON_CLASS[name]} aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}></i>;
}

export interface SocialLink {
  name: SocialName;
  label: string;
  href: string;
}

export interface SocialLinksProps {
  size?: number;
  links?: SocialLink[];
}

const LINKS: SocialLink[] = [
  { name: 'github', label: 'GitHub', href: 'https://github.com/arayhan' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/arayhan/' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/arayhan_/' },
  { name: 'medium', label: 'Medium', href: 'https://medium.com/@arayhan' },
];

export function SocialLinks({ size = 40, links = LINKS }: SocialLinksProps) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {links.map((l) => (
        <IconButton key={l.name} label={l.label} href={l.href} size={size} target="_blank" rel="noreferrer">
          <SocialIcon name={l.name} size={Math.round(size * 0.45)} />
        </IconButton>
      ))}
    </div>
  );
}
