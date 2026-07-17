import type { ReactNode } from 'react';
import type { PropMeta } from '../components/PropsTable';

export interface PlaygroundMeta {
  id: string;
  name: string;
  description: string;
  library: string;
  snippet: string;
  props: PropMeta[];
  render: () => ReactNode;
  block?: boolean;
}

export const PLAYGROUND: PlaygroundMeta[] = [];
