import React from 'react';
import {
  Accordion, Alert, AnalyticsCard, Avatar, AvatarStack, BarChart, Banner, Bubble, Button, Carousel,
  Chip, CodeSnippet, DataTable, EmptyState, ErrorState, ImageCropper, ImageZoom, LineChart,
  Pagination, RichText, Thumbnail, VideoPlayer,
} from 'prima-ui';
import type { CropRect } from 'prima-ui';
import type { DocMeta } from './forms-meta';

function DismissibleAlertDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: 480, maxWidth: '100%' }}>
      <Alert title="Heads up">Semantic colors are functional here, never decorative.</Alert>
      <Alert variant="success" title="Saved">Your changes are live.</Alert>
      <Alert variant="warning" title="Check your tokens">A warm gray is a bug in Prima.</Alert>
      {open ? (
        <Alert variant="error" title="Build failed" onClose={() => setOpen(false)}>
          styles.css could not be resolved. (Dismiss me.)
        </Alert>
      ) : (
        <Button variant="secondary" onClick={() => setOpen(true)} style={{ alignSelf: 'flex-start' }}>
          Bring the error back
        </Button>
      )}
    </div>
  );
}

const IMG = (seed: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#F8FBFD"/><g stroke="#1B44F0" stroke-width="1" opacity="0.55">${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="300"/><line x1="0" y1="${i * 30}" x2="400" y2="${i * 30}"/>`).join('')}</g><circle cx="${100 + (seed.charCodeAt(0) % 200)}" cy="${80 + (seed.charCodeAt(1) % 140)}" r="34" fill="#1B44F0"/><text x="20" y="284" font-family="monospace" font-size="14" fill="#0F1116">// ${seed.toUpperCase()}</text></svg>`)}`;

// Stable, deterministic placeholder media used across the ImageCropper/ImageZoom/VideoPlayer demos.
const PLACEHOLDER_IMG = 'https://picsum.photos/seed/prima/800/600';
const SAMPLE_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function DismissibleBannerDemo() {
  const [dismissed, setDismissed] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
      <Banner variant="info" action={{ label: 'Read the changelog', href: '#/foundations' }}>
        Prima 2.3 ships six new advanced components.
      </Banner>
      {!dismissed && (
        <Banner variant="warning" onDismiss={() => setDismissed(true)}>
          Your API key expires in 3 days. Rotate it before it lapses.
        </Banner>
      )}
    </div>
  );
}

function AvatarStackDemo() {
  return (
    <AvatarStack
      max={4}
      items={[
        { name: 'A. Rayhan Primadedas' },
        { name: 'Ada Lovelace' },
        { name: 'Grace Hopper' },
        { name: 'Alan Turing' },
        { name: 'Margaret Hamilton' },
        { name: 'Katherine Johnson' },
      ]}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(4);
  return <Pagination page={page} totalPages={12} onChange={setPage} />;
}

function ImageCropperDemo() {
  const [rect, setRect] = React.useState<CropRect | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
      <ImageCropper src={PLACEHOLDER_IMG} aspect={1} onCropChange={setRect} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--text-secondary)' }}>
        {rect ? `x:${rect.x} y:${rect.y} w:${rect.width} h:${rect.height}` : 'Loading…'}
      </div>
    </div>
  );
}

function VideoPlayerDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <VideoPlayer src={SAMPLE_VIDEO} />
    </div>
  );
}

function CarouselDemo() {
  return (
    <Carousel
      label="Work"
      items={['alpha', 'beta', 'gamma', 'delta'].map((s, i) => (
        <Thumbnail key={s} src={IMG(s)} alt={s} caption={s} index={String(i + 1).padStart(3, '0')} />
      ))}
    />
  );
}

const SERIES = [12, 18, 14, 22, 19, 28, 24, 34, 31, 42, 38, 48];

export const DISPLAY: DocMeta[] = [
  {
    id: 'alert',
    name: 'Alert',
    description: 'White surface, hairline border, and a 3px semantic rule on the left edge. Icon and rule take the semantic color; the body stays ink. Pass onClose to make it dismissible.',
    snippet: `import { Alert } from 'prima-ui';

<Alert title="Heads up">Semantic colors are functional, never decorative.</Alert>
<Alert variant="success" title="Saved">Your changes are live.</Alert>
<Alert variant="error" title="Build failed" onClose={dismiss}>
  styles.css could not be resolved.
</Alert>`,
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Semantic color of the rule and icon.' },
      { name: 'title', type: 'string', description: 'Bold first line.' },
      { name: 'children', type: 'ReactNode', description: 'Description body under the title.' },
      { name: 'onClose', type: '() => void', description: 'Renders a dismiss button when provided.' },
    ],
    render: () => <DismissibleAlertDemo />,
  },
  {
    id: 'banner',
    name: 'Banner',
    description: 'Full-width, page-level notification — where Alert is a bordered card meant to sit inline, Banner spans edge to edge with a bolder semantic top rule, for pinning at the top of a page or section. Reuses Alert\'s exact semantic color/icon mapping.',
    snippet: `import { Banner } from 'prima-ui';

<Banner variant="info" action={{ label: 'Read the changelog', href: '/changelog' }}>
  Prima 2.3 ships six new advanced components.
</Banner>
<Banner variant="warning" onDismiss={() => setDismissed(true)}>
  Your API key expires in 3 days. Rotate it before it lapses.
</Banner>`,
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Semantic color of the top rule and icon.' },
      { name: 'children', type: 'ReactNode', description: 'Message content.' },
      { name: 'action', type: '{ label, href?, onClick? }', description: 'Optional inline action link/button.' },
      { name: 'onDismiss', type: '() => void', description: 'Renders a dismiss button when provided.' },
    ],
    render: () => <DismissibleBannerDemo />,
    block: true,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'A full-radius circle — the one sanctioned use of radius-full — with a hairline border. Falls back to mono initials on ice; the optional status dot uses semantic colors.',
    snippet: `import { Avatar } from 'prima-ui';

<Avatar name="A. Rayhan Primadedas" status="online" />
<Avatar name="Ada Lovelace" size={56} />
<Avatar src="/me.jpg" name="A. Rayhan Primadedas" size={64} status="busy" />`,
    props: [
      { name: 'name', type: 'string', description: 'Used for initials fallback and alt text.' },
      { name: 'src', type: 'string', description: 'Image source; broken images fall back to initials.' },
      { name: 'size', type: 'number', default: '44', description: 'Diameter in px.' },
      { name: 'status', type: "'online' | 'busy' | 'away' | 'offline'", description: 'Semantic status dot, bottom-right.' },
    ],
    render: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <Avatar name="A. Rayhan Primadedas" status="online" />
        <Avatar name="Ada Lovelace" size={56} status="away" />
        <Avatar name="Grace Hopper" size={64} status="busy" />
        <Avatar name="Prima" size={72} />
      </div>
    ),
  },
  {
    id: 'avatarstack',
    name: 'AvatarStack',
    description: 'An overlapping row of Avatars — e.g. "who\'s in this meeting" — with a "+N" overflow bubble once items exceeds max. Each avatar gets a surface-colored ring so overlaps read as intentional layering rather than muddy clipping.',
    snippet: `import { AvatarStack } from 'prima-ui';

<AvatarStack
  max={4}
  items={[
    { name: 'A. Rayhan Primadedas' },
    { name: 'Ada Lovelace' },
    { name: 'Grace Hopper' },
    { name: 'Alan Turing' },
    { name: 'Margaret Hamilton' },
  ]}
/>`,
    props: [
      { name: 'items', type: '{ name, src? }[]', description: 'People in stacking order; src falls back to initials.' },
      { name: 'max', type: 'number', default: '4', description: 'Avatars shown before collapsing the rest into a "+N" bubble.' },
      { name: 'size', type: 'number', default: '40', description: 'Diameter in px.' },
    ],
    render: () => <AvatarStackDemo />,
  },
  {
    id: 'thumbnail',
    name: 'Thumbnail',
    description: 'A hairline media frame (radius md) whose image eases to a gentle zoom on hover — one of the smallest Prima micro-interactions — with a mono caption line.',
    snippet: `import { Thumbnail } from 'prima-ui';

<Thumbnail
  src="/work/alpha.jpg" alt="Alpha case study"
  caption="Alpha" index="001" href="/work/alpha"
/>`,
    props: [
      { name: 'src / alt', type: 'string', description: 'The image.' },
      { name: 'ratio', type: 'string', default: "'4 / 3'", description: 'CSS aspect-ratio of the frame.' },
      { name: 'caption / index', type: 'string', description: 'Mono caption line below.' },
      { name: 'href', type: 'string', description: 'Renders as a link; hover goes cobalt.' },
    ],
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%' }}>
        <Thumbnail src={IMG('alpha')} alt="Alpha" caption="Alpha" index="001" href="#/components" />
        <Thumbnail src={IMG('beta')} alt="Beta" caption="Beta" index="002" href="#/components" />
      </div>
    ),
    block: true,
  },
  {
    id: 'bubble',
    name: 'Bubble',
    description: 'Chat bubbles — received messages sit left on the white surface with a hairline; sent messages sit right in cobalt. The corner nearest the sender squares off for direction.',
    snippet: `import { Bubble } from 'prima-ui';

<Bubble meta="AR · 09:41">Morning — is the docs site live?</Bubble>
<Bubble side="out" meta="09:42">Deployed last night. Take a look.</Bubble>`,
    props: [
      { name: 'side', type: "'in' | 'out'", default: "'in'", description: 'Received (white, left) or sent (cobalt, right).' },
      { name: 'children', type: 'ReactNode', description: 'Message content.' },
      { name: 'meta', type: 'string', description: 'Mono meta line under the bubble.' },
    ],
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 420, maxWidth: '100%' }}>
        <Bubble meta="AR · 09:41">Morning — is the docs site live?</Bubble>
        <Bubble side="out" meta="09:42">Deployed last night. Take a look.</Bubble>
        <Bubble meta="AR · 09:43">The cobalt hero is sharp. Ship it.</Bubble>
      </div>
    ),
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Hairline-separated rows with mono running numbers and a plus glyph that rotates into a close. Height animates smoothly; one item open by default, or several with multiple.',
    snippet: `import { Accordion } from 'prima-ui';

<Accordion
  defaultOpen={0}
  items={[
    { title: 'What is Prima?', content: 'The personal design system of A. Rayhan Primadedas.' },
    { title: 'Can I use it?', content: 'MIT licensed — go ahead.' },
  ]}
/>`,
    props: [
      { name: 'items', type: 'AccordionItem[]', description: '{ title, content } rows.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow several items open at once.' },
      { name: 'defaultOpen', type: 'number', description: 'Index open initially.' },
    ],
    render: () => (
      <Accordion
        defaultOpen={0}
        items={[
          { title: 'What is Prima?', content: 'The personal design system of A. Rayhan Primadedas — engineered minimalism: one cobalt accent, three typefaces, visible structure.' },
          { title: 'Can I use it?', content: 'MIT licensed. Install it, import the styles once, and compose.' },
          { title: 'Why only one accent?', content: 'Constraint is the design. With a single accent, every cobalt pixel means something.' },
        ]}
      />
    ),
    block: true,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'A scroll-snap track with prev/next controls and a mono running counter. Native scrolling stays available — swipe and trackpad both work; buttons honor reduced motion.',
    snippet: `import { Carousel, Thumbnail } from 'prima-ui';

<Carousel items={projects.map((p) => (
  <Thumbnail key={p.id} src={p.image} alt={p.title} caption={p.title} />
))} />`,
    props: [
      { name: 'items', type: 'ReactNode[]', description: 'Slides — each becomes one snap panel.' },
      { name: 'slideWidth', type: 'string', default: "'min(420px, 85%)'", description: 'CSS width per slide.' },
      { name: 'label', type: 'string', default: "'Carousel'", description: 'Accessible region name.' },
    ],
    render: () => <CarouselDemo />,
    block: true,
  },
  {
    id: 'datatable',
    name: 'DataTable',
    description: 'Mono uppercase headers over a 2px ink rule, hairline row separators, ice hover. Columns opt into click-to-sort with sortable.',
    snippet: `import { DataTable } from 'prima-ui';

<DataTable
  caption="PROJECTS — 2026"
  columns={[
    { key: 'name', label: 'Project', sortable: true },
    { key: 'stack', label: 'Stack' },
    { key: 'year', label: 'Year', align: 'right', sortable: true },
  ]}
  rows={projects}
/>`,
    props: [
      { name: 'columns', type: 'DataTableColumn[]', description: '{ key, label, align?, sortable? }.' },
      { name: 'rows', type: 'Record<string, ReactNode>[]', description: 'Row objects keyed by column key.' },
      { name: 'caption', type: 'string', description: 'Mono caption above the table.' },
    ],
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
          { name: 'Brand site', stack: <Chip>GSAP</Chip>, year: '2024' },
        ]}
      />
    ),
    block: true,
  },
  {
    id: 'charts',
    name: 'Charts',
    description: 'LineChart, BarChart, and Sparkline — cobalt data on hairline grids with mono labels. SVG, zero dependencies, one data color: the accent.',
    snippet: `import { LineChart, BarChart, Sparkline } from 'prima-ui';

<LineChart data={[12, 18, 14, 22, 28, 34, 48]} labels={['JAN', 'JUL']} />
<BarChart data={[
  { label: 'Q1', value: 24 }, { label: 'Q2', value: 38 },
  { label: 'Q3', value: 31 }, { label: 'Q4', value: 47 },
]} />
<Sparkline data={[3, 5, 4, 8, 7, 11]} />`,
    props: [
      { name: 'LineChart.data', type: 'number[]', description: 'Series values, evenly spaced.' },
      { name: 'LineChart.labels', type: 'string[]', description: 'First/last shown on the x-axis.' },
      { name: 'LineChart.area', type: 'boolean', default: 'true', description: 'Cobalt fill under the line.' },
      { name: 'BarChart.data', type: '{ label, value }[]', description: 'One bar per entry, values labeled.' },
      { name: 'Sparkline.data', type: 'number[]', description: 'Bare trend line for stat cards.' },
      { name: '*.height', type: 'number', default: '220', description: 'Chart height in px.' },
    ],
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', width: '100%' }}>
        <LineChart data={SERIES} labels={['JAN', 'DEC']} />
        <BarChart data={[
          { label: 'Q1', value: 24 }, { label: 'Q2', value: 38 },
          { label: 'Q3', value: 31 }, { label: 'Q4', value: 47 },
        ]} />
      </div>
    ),
    block: true,
  },
  {
    id: 'analytics',
    name: 'AnalyticsCard',
    description: 'An at-a-glance metric: mono label, Clash Display value, semantic delta chip, cobalt sparkline. Compose a dashboard from a grid of these plus a LineChart.',
    snippet: `import { AnalyticsCard } from 'prima-ui';

<AnalyticsCard
  label="PAGE VIEWS" value="48.2K"
  delta="+12.4%" trend="up"
  data={[31, 40, 28, 51, 42, 60, 55]}
/>`,
    props: [
      { name: 'label', type: 'string', description: 'Mono uppercase metric name.' },
      { name: 'value', type: 'string', description: 'The headline figure.' },
      { name: 'delta', type: 'string', description: 'Change since last period.' },
      { name: 'trend', type: "'up' | 'down' | 'flat'", default: "'up'", description: 'Colors the delta (success/error/muted).' },
      { name: 'data', type: 'number[]', description: 'Sparkline series.' },
    ],
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', width: '100%' }}>
        <AnalyticsCard label="PAGE VIEWS" value="48.2K" delta="+12.4%" trend="up" data={[31, 40, 28, 51, 42, 60, 55]} />
        <AnalyticsCard label="BOUNCE RATE" value="22%" delta="-3.1%" trend="down" data={[40, 36, 38, 31, 29, 26, 22]} />
        <AnalyticsCard label="AVG. SESSION" value="4:12" delta="+0:18" trend="up" data={[3, 4, 3.5, 4.4, 4.1, 4.6, 4.2]} />
      </div>
    ),
    block: true,
  },
  {
    id: 'empty',
    name: 'EmptyState',
    description: 'A centered hairline panel for nothing-here moments: icon in a bordered square, caps title, muted description, optional cobalt action.',
    snippet: `import { EmptyState } from 'prima-ui';

<EmptyState
  icon="ph ph-tray"
  title="No projects yet"
  description="Create your first project to see it here."
  action={{ label: 'New project', onClick: create }}
/>`,
    props: [
      { name: 'title', type: 'string', description: 'Caps title.' },
      { name: 'description', type: 'string', description: 'Muted body line.' },
      { name: 'icon', type: 'string', default: "'ph ph-tray'", description: 'Phosphor regular icon class.' },
      { name: 'action', type: '{ label, href?, onClick? }', description: 'Cobalt CTA.' },
    ],
    render: () => (
      <div style={{ width: '100%', maxWidth: 520 }}>
        <EmptyState
          title="No projects yet"
          description="Create your first project to see it here."
          action={{ label: 'New project' }}
        />
      </div>
    ),
  },
  {
    id: 'error',
    name: 'ErrorState',
    description: 'Error pages, the Prima way: a mono // ERROR eyebrow, the code in mega cobalt Clash Display, caps title, and a way back. Use fullPage for 404/500 routes.',
    snippet: `import { ErrorState } from 'prima-ui';

<ErrorState
  code="404" fullPage
  title="This page moved or never was"
  description="Check the address, or head back to the start."
  action={{ label: 'Back to home', href: '/' }}
/>`,
    props: [
      { name: 'code', type: 'string', default: "'404'", description: 'The big cobalt figure.' },
      { name: 'title', type: 'string', description: 'Caps title.' },
      { name: 'description', type: 'string', description: 'Muted body line.' },
      { name: 'action', type: '{ label, href?, onClick? }', description: 'Primary way back.' },
      { name: 'fullPage', type: 'boolean', default: 'false', description: 'min-height 60vh centered treatment.' },
    ],
    render: () => (
      <div style={{ width: '100%' }}>
        <ErrorState
          code="404"
          title="This page moved or never was"
          description="Check the address, or head back to the start."
          action={{ label: 'Back to home', href: '#/' }}
        />
      </div>
    ),
    block: true,
  },
  {
    id: 'code',
    name: 'CodeSnippet',
    description: 'The ink code panel as a shippable component — mono toolbar, copy button, monochrome on purpose (zero dependencies). This docs site layers Shiki on top of the same shell.',
    snippet: `import { CodeSnippet } from 'prima-ui';

<CodeSnippet
  label="INSTALL.SH"
  code={'pnpm add prima-ui'}
/>`,
    props: [
      { name: 'code', type: 'string', description: 'The snippet text.' },
      { name: 'label', type: 'string', default: "'CODE'", description: 'Mono toolbar label.' },
      { name: 'noCopy', type: 'boolean', default: 'false', description: 'Hide the copy button.' },
    ],
    render: () => (
      <div style={{ width: '100%', maxWidth: 560 }}>
        <CodeSnippet label="INSTALL.SH" code={`pnpm add prima-ui
# peer deps: react >= 18`} />
      </div>
    ),
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Mono numbered page buttons with prev/next arrows and an ellipsis for large ranges. Controlled: page/onChange.',
    snippet: `import { Pagination } from 'prima-ui';

const [page, setPage] = useState(1);
<Pagination page={page} totalPages={12} onChange={setPage} />`,
    props: [
      { name: 'page', type: 'number', description: 'Current page, 1-indexed.' },
      { name: 'totalPages', type: 'number', description: 'Total number of pages.' },
      { name: 'onChange', type: '(page: number) => void', description: 'Called with the next page.' },
      { name: 'siblingCount', type: 'number', default: '1', description: 'Numbered pages shown on each side of the current one.' },
    ],
    render: () => <PaginationDemo />,
  },
  {
    id: 'imagecropper',
    name: 'ImageCropper',
    description: 'A fixed-aspect (or free-form) draggable/resizable selection box over an image. Reports the selection in the image\'s natural pixel coordinates via onCropChange; does not itself produce a cropped bitmap.',
    snippet: `import { ImageCropper } from 'prima-ui';

<ImageCropper
  src="/photo.jpg"
  aspect={1}
  onCropChange={(rect) => console.log(rect)}
/>`,
    props: [
      { name: 'src', type: 'string', description: 'Image to crop.' },
      { name: 'aspect', type: 'number', description: 'Width/height ratio to lock the crop box to, e.g. 1 for square. Omit for free-form.' },
      { name: 'onCropChange', type: '(rect: CropRect) => void', description: 'Called with the selection in natural pixel coordinates whenever it changes.' },
      { name: 'maxDisplaySize', type: 'number', default: '480', description: 'Max display width/height in px.' },
    ],
    render: () => <ImageCropperDemo />,
    block: true,
  },
  {
    id: 'imagezoom',
    name: 'ImageZoom',
    description: 'A thumbnail that opens a full-screen lightbox — same scrim/Escape/scroll-lock pattern as Dialog — where the image scales up and pans to follow the cursor.',
    snippet: `import { ImageZoom } from 'prima-ui';

<ImageZoom src="/photo.jpg" alt="Case study detail" />`,
    props: [
      { name: 'src', type: 'string', description: 'Image source.' },
      { name: 'alt', type: 'string', description: 'Alt text, reused in the lightbox.' },
    ],
    render: () => (
      <div style={{ width: 240 }}>
        <ImageZoom src={PLACEHOLDER_IMG} alt="Placeholder study" />
      </div>
    ),
  },
  {
    id: 'videoplayer',
    name: 'VideoPlayer',
    description: 'A native <video> element with fully custom chrome — play/pause, seek, volume, time, fullscreen — laid over it. Controls stay visible while paused or hovered, and fade out otherwise so the content isn\'t obscured during playback.',
    snippet: `import { VideoPlayer } from 'prima-ui';

<VideoPlayer src="/clip.mp4" poster="/clip-poster.jpg" />`,
    props: [
      { name: 'src', type: 'string', description: 'Video source.' },
      { name: 'poster', type: 'string', description: 'Poster image shown before playback.' },
      { name: 'autoPlay', type: 'boolean', default: 'false', description: 'Autoplay muted on mount.' },
      { name: 'loop', type: 'boolean', default: 'false', description: 'Loop playback.' },
    ],
    render: () => <VideoPlayerDemo />,
    block: true,
  },
  {
    id: 'richtext',
    name: 'RichText',
    description: 'Long-form prose styling for articles and blog content. Wrap rendered markdown/CMS HTML — headings, links, lists, quotes, and inline code all pick up the Prima voice.',
    snippet: `import { RichText } from 'prima-ui';

<RichText>
  <h2>Engineered minimalism</h2>
  <p>One accent. Three typefaces. <strong>Visible structure.</strong></p>
  <blockquote>A warm gray is a bug.</blockquote>
  <ul><li>Ice, not white</li><li>Ink as a surface</li></ul>
</RichText>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Rendered HTML content (from markdown, a CMS, or JSX).' },
    ],
    render: () => (
      <RichText>
        <h3>Engineered minimalism</h3>
        <p>One accent. Three typefaces. <strong>Visible structure.</strong> Prima decides the small things so pages come out sharp without debate — see <a href="#/foundations">the foundations</a>.</p>
        <blockquote>A warm gray is a bug.</blockquote>
        <ul>
          <li>Ice <code>#F8FBFD</code>, never pure white</li>
          <li>The ink surface is a storytelling block, not a dark mode</li>
        </ul>
      </RichText>
    ),
    block: true,
  },
];
