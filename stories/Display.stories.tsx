import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Accordion, AnalyticsCard, Avatar, AvatarStack, Bubble, BarChart, Carousel, Chip, CodeSnippet,
  Comparison, DataTable, Deck, EmptyState, ErrorState, Glimpse, ImageCropper, ImageZoom, LineChart,
  Pagination, RichText, Thumbnail, Tree, VideoPlayer,
} from '../src/index';
import type { TreeNode } from '../src/index';

const meta: Meta = { title: 'Advanced/Display' };
export default meta;

const IMG = (seed: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#F8FBFD"/><circle cx="${100 + (seed.charCodeAt(0) % 200)}" cy="150" r="40" fill="#1B44F0"/></svg>`)}`;

const PLACEHOLDER_IMG = 'https://picsum.photos/seed/prima/800/600';
const SAMPLE_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function PaginationDemo() {
  const [page, setPage] = React.useState(4);
  return <Pagination page={page} totalPages={12} onChange={setPage} />;
}

export const AvatarStory: StoryObj = {
  name: 'Avatar',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Avatar name="A. Rayhan Primadedas" status="online" />
      <Avatar name="Ada Lovelace" size={56} status="away" />
      <Avatar name="Grace Hopper" size={64} status="busy" />
    </div>
  ),
};

export const ThumbnailStory: StoryObj = {
  name: 'Thumbnail',
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Thumbnail src={IMG('alpha')} alt="Alpha" caption="Alpha" index="001" href="#" />
    </div>
  ),
};

export const BubbleStory: StoryObj = {
  name: 'Bubble',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Bubble meta="AR · 09:41">Morning — is the docs site live?</Bubble>
      <Bubble side="out" meta="09:42">Deployed last night. Take a look.</Bubble>
    </div>
  ),
};

export const AccordionStory: StoryObj = {
  name: 'Accordion',
  render: () => (
    <Accordion
      defaultOpen={0}
      items={[
        { title: 'What is Prima?', content: 'The personal design system of A. Rayhan Primadedas.' },
        { title: 'Can I use it?', content: 'MIT licensed — go ahead.' },
      ]}
    />
  ),
};

export const CarouselStory: StoryObj = {
  name: 'Carousel',
  render: () => (
    <Carousel items={['alpha', 'beta', 'gamma'].map((s, i) => (
      <Thumbnail key={s} src={IMG(s)} alt={s} caption={s} index={String(i + 1).padStart(3, '0')} />
    ))} />
  ),
};

export const DataTableStory: StoryObj = {
  name: 'DataTable',
  render: () => (
    <DataTable
      caption="PROJECTS — 2026"
      columns={[
        { key: 'name', label: 'Project', sortable: true },
        { key: 'stack', label: 'Stack' },
        { key: 'year', label: 'Year', align: 'right', sortable: true },
      ]}
      rows={[
        { name: 'Prima docs', stack: <Chip>React</Chip>, year: '2026' },
        { name: 'Realtime infra', stack: <Chip>WebGL</Chip>, year: '2025' },
      ]}
    />
  ),
};

export const ChartsStory: StoryObj = {
  name: 'Charts',
  render: () => (
    <div style={{ display: 'grid', gap: 32, gridTemplateColumns: '1fr 1fr', maxWidth: 900 }}>
      <LineChart data={[12, 18, 14, 22, 19, 28, 24, 34, 31, 42]} labels={['JAN', 'OCT']} />
      <BarChart data={[
        { label: 'Q1', value: 24 }, { label: 'Q2', value: 38 },
        { label: 'Q3', value: 31 }, { label: 'Q4', value: 47 },
      ]} />
    </div>
  ),
};

export const AnalyticsStory: StoryObj = {
  name: 'AnalyticsCard',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <AnalyticsCard label="PAGE VIEWS" value="48.2K" delta="+12.4%" trend="up" data={[31, 40, 28, 51, 42, 60, 55]} />
      <AnalyticsCard label="BOUNCE RATE" value="22%" delta="-3.1%" trend="down" data={[40, 36, 38, 31, 29, 26, 22]} />
    </div>
  ),
};

export const EmptyStateStory: StoryObj = {
  name: 'EmptyState',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <EmptyState title="No projects yet" description="Create your first project to see it here." action={{ label: 'New project' }} />
    </div>
  ),
};

export const ErrorStateStory: StoryObj = {
  name: 'ErrorState',
  render: () => (
    <ErrorState code="404" title="This page moved or never was" description="Check the address, or head back." action={{ label: 'Back to home', href: '#' }} />
  ),
};

export const CodeSnippetStory: StoryObj = {
  name: 'CodeSnippet',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <CodeSnippet label="INSTALL.SH" code={'pnpm add prima-ui'} />
    </div>
  ),
};

export const RichTextStory: StoryObj = {
  name: 'RichText',
  render: () => (
    <RichText>
      <h3>Engineered minimalism</h3>
      <p>One accent. Three typefaces. <strong>Visible structure.</strong></p>
      <blockquote>A warm gray is a bug.</blockquote>
      <ul><li>Ice, not white</li><li>Ink as a surface, not a mode</li></ul>
    </RichText>
  ),
};

export const AvatarStackStory: StoryObj = {
  name: 'AvatarStack',
  render: () => (
    <AvatarStack
      max={4}
      items={[
        { name: 'A. Rayhan Primadedas' },
        { name: 'Ada Lovelace' },
        { name: 'Grace Hopper' },
        { name: 'Alan Turing' },
        { name: 'Margaret Hamilton' },
      ]}
    />
  ),
};

export const PaginationStory: StoryObj = {
  name: 'Pagination',
  render: () => <PaginationDemo />,
};

export const ImageCropperStory: StoryObj = {
  name: 'ImageCropper',
  render: () => (
    <ImageCropper src={PLACEHOLDER_IMG} aspect={1} onCropChange={() => {}} />
  ),
};

export const ImageZoomStory: StoryObj = {
  name: 'ImageZoom',
  render: () => (
    <div style={{ width: 240 }}>
      <ImageZoom src={PLACEHOLDER_IMG} alt="Placeholder study" />
    </div>
  ),
};

export const VideoPlayerStory: StoryObj = {
  name: 'VideoPlayer',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <VideoPlayer src={SAMPLE_VIDEO} />
    </div>
  ),
};

export const ComparisonStory: StoryObj = {
  name: 'Comparison',
  render: () => (
    <Comparison
      style={{ width: 420, aspectRatio: '16/10' }}
      aspectRatio={16 / 10}
      after={<img src={PLACEHOLDER_IMG} alt="Color" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      before={<img src={`${PLACEHOLDER_IMG}?grayscale`} alt="Grayscale" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    />
  ),
};

function DeckStoryDemo() {
  const cards = ['ONE', 'TWO', 'THREE'].map((label) => (
    <div key={label} style={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--surface)', fontFamily: 'var(--font-display)', fontSize: 24, textTransform: 'uppercase',
    }}>{label}</div>
  ));
  return <Deck>{cards}</Deck>;
}
export const DeckStory: StoryObj = { name: 'Deck', render: () => <DeckStoryDemo /> };

export const GlimpseStory: StoryObj = {
  name: 'Glimpse',
  render: () => (
    <Glimpse
      href="https://github.com/arayhan/prima-ui"
      data={{ title: 'Prima UI', description: 'Engineered minimalism, cobalt on ice.', image: PLACEHOLDER_IMG, url: 'github.com/arayhan/prima-ui' }}
    >
      Prima UI on GitHub
    </Glimpse>
  ),
};

const TREE_DATA: TreeNode[] = [
  { id: 'src', label: 'src', children: [{ id: 'index', label: 'index.ts' }] },
  { id: 'readme', label: 'README.md' },
];
export const TreeStory: StoryObj = {
  name: 'Tree',
  render: () => (
    <div style={{ width: 240 }}>
      <Tree data={TREE_DATA} defaultExpanded={['src']} />
    </div>
  ),
};
