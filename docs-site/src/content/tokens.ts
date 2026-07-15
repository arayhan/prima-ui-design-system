/** Token data mirrored from src/tokens/*.css for the foundations visualizations.
 *  If a token changes there, update it here. */

export interface ColorToken {
  varName: string;
  hex: string;
  label: string;
  /** Swatch text needs light ink */
  dark?: boolean;
}

export const COLOR_GROUPS: { title: string; colors: ColorToken[] }[] = [
  {
    title: 'THE ONE ACCENT',
    colors: [
      { varName: '--primary', hex: '#1B44F0', label: 'Electric cobalt', dark: true },
      { varName: '--primary-hover', hex: '#1638C4', label: 'Cobalt hover', dark: true },
      { varName: '--on-primary', hex: '#FFFFFF', label: 'On primary' },
    ],
  },
  {
    title: 'LIGHT SURFACES',
    colors: [
      { varName: '--background', hex: '#F8FBFD', label: 'Ice — page base' },
      { varName: '--surface', hex: '#FFFFFF', label: 'Surface — cards, fields' },
      { varName: '--on-surface', hex: '#0F1116', label: 'Cool ink text', dark: true },
      { varName: '--text-secondary', hex: '#5B6472', label: 'Secondary text', dark: true },
      { varName: '--border', hex: '#DFE7EF', label: 'Hairline border' },
      { varName: '--border-strong', hex: '#0F1116', label: 'Ink line', dark: true },
    ],
  },
  {
    title: 'INK STORYTELLING',
    colors: [
      { varName: '--inverse-surface', hex: '#0C0F16', label: 'Blue-black surface', dark: true },
      { varName: '--on-inverse', hex: '#F2F6FA', label: 'On inverse' },
      { varName: '--inverse-muted', hex: '#97A0AE', label: 'Inverse muted' },
      { varName: '--inverse-border', hex: '#232936', label: 'Inverse border', dark: true },
    ],
  },
  {
    title: 'SEMANTIC (FUNCTIONAL ONLY)',
    colors: [
      { varName: '--success', hex: '#1D9E75', label: 'Success', dark: true },
      { varName: '--warning', hex: '#BA7517', label: 'Warning', dark: true },
      { varName: '--error', hex: '#D8391F', label: 'Error', dark: true },
      { varName: '--info', hex: '#1B44F0', label: 'Info', dark: true },
    ],
  },
];

export interface TypeToken {
  varName: string;
  px: number;
  label: string;
  family: 'display' | 'body' | 'mono';
  sample: string;
}

export const TYPE_SCALE: TypeToken[] = [
  { varName: '--text-display', px: 76, label: 'Display', family: 'display', sample: 'PRIMA' },
  { varName: '--text-h1', px: 48, label: 'H1', family: 'display', sample: 'COBALT ON ICE' },
  { varName: '--text-h2', px: 34, label: 'H2', family: 'display', sample: 'ENGINEERED MINIMALISM' },
  { varName: '--text-h3', px: 21, label: 'H3', family: 'display', sample: 'VISIBLE STRUCTURE' },
  { varName: '--text-body-lg', px: 19, label: 'Body large', family: 'body', sample: 'Inter carries the reading voice of the system.' },
  { varName: '--text-body', px: 16, label: 'Body', family: 'body', sample: 'Body text is set in Inter at a generous line height.' },
  { varName: '--text-code', px: 14, label: 'Code', family: 'mono', sample: "import { Button } from 'prima-ui';" },
  { varName: '--text-label', px: 12, label: 'Label', family: 'mono', sample: '// EYEBROWS, LABELS, RUNNING NUMBERS' },
];

export const SPACING: { varName: string; px: number }[] = [
  { varName: '--space-1', px: 4 },
  { varName: '--space-2', px: 8 },
  { varName: '--space-3', px: 12 },
  { varName: '--space-4', px: 16 },
  { varName: '--space-5', px: 24 },
  { varName: '--space-6', px: 32 },
  { varName: '--space-7', px: 48 },
  { varName: '--space-8', px: 64 },
  { varName: '--space-9', px: 96 },
];

export const RADII: { varName: string; px: string; use: string }[] = [
  { varName: '--radius-sm', px: '8px', use: 'buttons, inputs, chips' },
  { varName: '--radius-md', px: '12px', use: 'cards' },
  { varName: '--radius-lg', px: '16px', use: 'large media, modals' },
  { varName: '--radius-full', px: '999px', use: 'dots, avatars, pills' },
];

export const BORDERS: { varName: string; px: string; use: string }[] = [
  { varName: '--border-width', px: '1.5px', use: 'default hairline' },
  { varName: '--border-width-emphasis', px: '2px', use: 'interactive / emphasized' },
  { varName: '--border-width-rule', px: '3px', use: 'section-opening rules' },
];

export const MOTION: { varName: string; value: string; use: string }[] = [
  { varName: '--ease-spatial', value: 'cubic-bezier(0.16, 1, 0.3, 1)', use: 'every transition' },
  { varName: '--duration-fast', value: '150ms', use: 'color, focus, small state' },
  { varName: '--duration-base', value: '250ms', use: 'transforms, backgrounds' },
  { varName: '--duration-reveal', value: '800ms', use: 'hero line reveals' },
];
