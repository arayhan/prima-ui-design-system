import React from 'react';
import {
  Button, Card, Chip, Input, Textarea, Select, Switch,
  SectionHeader, TimelineItem, Marquee, SocialLinks,
  Progress, Slider, Tabs, Toggle, ToggleGroup, Rating, Spinner,
} from 'prima-ui';
import type { PropMeta } from '../components/PropsTable';

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  snippet: string;
  props: PropMeta[];
  render: () => React.ReactNode;
  inverse?: boolean;
  /** Demo canvas needs full width (no centering row) */
  block?: boolean;
}

function SwitchDemo() {
  const [on, setOn] = React.useState(true);
  const [off, setOff] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
      <Switch checked={on} onChange={setOn} label="Available for work" />
      <Switch checked={off} onChange={setOff} label="Notifications" />
      <Switch checked disabled label="Locked on" />
    </div>
  );
}

function SelectDemo() {
  const [value, setValue] = React.useState('web');
  return (
    <Select
      label="Project type" value={value} onChange={(e: any) => setValue(e.target.value)}
      helper="Pick the closest match."
      options={[
        { value: 'web', label: 'Web application' },
        { value: 'ds', label: 'Design system' },
        { value: 'brand', label: 'Brand site' },
      ]}
      style={{ minWidth: 260 }}
    />
  );
}

function SliderDemo() {
  const [volume, setVolume] = React.useState(60);
  return <Slider value={volume} onChange={setVolume} label="Volume" style={{ minWidth: 280 }} />;
}

function ToggleDemo() {
  const [bold, setBold] = React.useState(true);
  const [italic, setItalic] = React.useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      <Toggle pressed={bold} onPressedChange={setBold}><i className="ph ph-text-b" aria-hidden="true" /></Toggle>
      <Toggle pressed={italic} onPressedChange={setItalic}><i className="ph ph-text-italic" aria-hidden="true" /></Toggle>
      <Toggle pressed={false} onPressedChange={() => {}} disabled>Locked</Toggle>
    </div>
  );
}

function ToggleGroupDemo() {
  const [align, setAlign] = React.useState('left');
  const [format, setFormat] = React.useState<string[]>(['bold']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <ToggleGroup
        value={align} onChange={setAlign}
        options={[
          { value: 'left', label: 'Left', icon: 'ph ph-text-align-left' },
          { value: 'center', label: 'Center', icon: 'ph ph-text-align-center' },
          { value: 'right', label: 'Right', icon: 'ph ph-text-align-right' },
        ]}
      />
      <ToggleGroup
        type="multiple" value={format} onChange={setFormat}
        options={[
          { value: 'bold', label: 'Bold', icon: 'ph ph-text-b' },
          { value: 'italic', label: 'Italic', icon: 'ph ph-text-italic' },
          { value: 'underline', label: 'Underline', icon: 'ph ph-text-underline' },
        ]}
      />
    </div>
  );
}

function RatingDemo() {
  const [value, setValue] = React.useState(3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <Rating value={4.5} label="4.5 (312 reviews)" />
      <Rating value={value} onChange={setValue} allowHalf label={`${value} — click to rate`} />
    </div>
  );
}

function SpinnerDemo() {
  const variants: Array<{ variant: 'ring' | 'dots' | 'bars' | 'pulse' | 'orbit' }> = [
    { variant: 'ring' }, { variant: 'dots' }, { variant: 'bars' }, { variant: 'pulse' }, { variant: 'orbit' },
  ];
  return (
    <div style={{ display: 'flex', gap: 'var(--space-7)' }}>
      {variants.map(({ variant }) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Spinner variant={variant} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', color: 'var(--text-secondary)', textTransform: 'uppercase',
          } as React.CSSProperties}>{variant}</span>
        </div>
      ))}
    </div>
  );
}

export const COMPONENTS: ComponentMeta[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'Mono uppercase label, 52px tall, radius sm. Primary is the cobalt fill; secondary is a 2px ink border that inverts on hover.',
    snippet: `import { Button } from 'prima-ui';

<Button icon="→">Start a project</Button>
<Button variant="secondary">View work</Button>
<Button disabled>Unavailable</Button>`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Visual style — cobalt fill or ink outline.' },
      { name: 'href', type: 'string', description: 'Renders an <a> instead of <button>.' },
      { name: 'icon', type: 'ReactNode', description: 'Optional trailing icon/arrow node.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims to 40% and blocks the hover lift.' },
      { name: 'onClick', type: '() => void', description: 'Click handler.' },
    ],
    render: () => (
      <>
        <Button icon="→">Start a project</Button>
        <Button variant="secondary">View work</Button>
        <Button disabled>Unavailable</Button>
      </>
    ),
  },
  {
    id: 'card',
    name: 'Card',
    description: 'White surface, 1.5px hairline border, radius md. Flat — no shadow. Interactive cards shift to the ice tone and nudge a cobalt arrow on hover.',
    snippet: `import { Card, Chip } from 'prima-ui';

<Card interactive arrow href="#">
  <Chip>React</Chip>
  <h3>Realtime game infrastructure</h3>
</Card>`,
    props: [
      { name: 'interactive', type: 'boolean', default: 'false', description: 'Enables the hover response (ice background + arrow nudge).' },
      { name: 'arrow', type: 'boolean', default: 'false', description: 'Shows a cobalt arrow that nudges right on hover.' },
      { name: 'href', type: 'string', description: 'Renders as <a>.' },
      { name: 'onClick', type: '() => void', description: 'Click handler.' },
    ],
    render: () => (
      <Card interactive arrow style={{ maxWidth: 360 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}><Chip>React</Chip><Chip>WebGL</Chip></div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', textTransform: 'uppercase', margin: 0 }}>
          Realtime game infrastructure
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)', margin: '8px 0 0' }}>
          Hover to see the ice shift and the arrow nudge.
        </p>
      </Card>
    ),
  },
  {
    id: 'chip',
    name: 'Chip',
    description: 'A mono uppercase cobalt tag on an ice fill with a hairline border. For tech tags and compact metadata.',
    snippet: `import { Chip } from 'prima-ui';

<Chip>TypeScript</Chip>
<Chip>Three.js</Chip>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Tag content.' },
      { name: 'style', type: 'CSSProperties', description: 'Style override.' },
    ],
    render: () => (
      <>
        <Chip>TypeScript</Chip><Chip>React</Chip><Chip>GSAP</Chip><Chip>Three.js</Chip>
      </>
    ),
  },
  {
    id: 'input',
    name: 'Input',
    description: 'White field, 1.5px border, mono label above, cobalt focus ring. Error text replaces the helper and turns the border red.',
    snippet: `import { Input } from 'prima-ui';

<Input label="Name" placeholder="Ada Lovelace" />
<Input label="Email" error="This email looks wrong." />`,
    props: [
      { name: 'label', type: 'string', description: 'Mono uppercase label above the field.' },
      { name: 'helper', type: 'string', description: 'Helper text below the field.' },
      { name: 'error', type: 'string', description: 'Error text — replaces helper, turns the border red.' },
      { name: 'placeholder', type: 'string', description: 'Native placeholder.' },
      { name: 'value / onChange', type: 'string / (e) => void', description: 'Controlled usage.' },
    ],
    render: () => (
      <>
        <Input label="Name" placeholder="Ada Lovelace" helper="Click in to see the cobalt ring." style={{ minWidth: 240 }} />
        <Input label="Email" placeholder="ada@example.com" error="This email looks wrong." style={{ minWidth: 240 }} />
      </>
    ),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    description: "Input's field language with a 120px minimum height and vertical resize.",
    snippet: `import { Textarea } from 'prima-ui';

<Textarea label="Message" placeholder="Tell me about the project…" />`,
    props: [
      { name: 'label', type: 'string', description: 'Mono uppercase label above the field.' },
      { name: 'helper', type: 'string', description: 'Helper text below the field.' },
      { name: 'error', type: 'string', description: 'Error text — replaces helper, turns the border red.' },
      { name: 'value / onChange', type: 'string / (e) => void', description: 'Controlled usage.' },
    ],
    render: () => (
      <Textarea label="Message" placeholder="Tell me about the project…" style={{ minWidth: 320 }} />
    ),
  },
  {
    id: 'select',
    name: 'Select',
    description: "Input's field language plus a 1.5px ink chevron — the native outline is replaced by the cobalt ring.",
    snippet: `import { Select } from 'prima-ui';

<Select
  label="Project type"
  options={[
    { value: 'web', label: 'Web application' },
    { value: 'ds', label: 'Design system' },
  ]}
/>`,
    props: [
      { name: 'options', type: 'SelectOption[]', description: '{ value, label } pairs.' },
      { name: 'label', type: 'string', description: 'Mono uppercase label above the field.' },
      { name: 'helper / error', type: 'string', description: 'Text below the field; error turns the border red.' },
      { name: 'value / onChange', type: 'string / (e) => void', description: 'Controlled usage.' },
    ],
    render: () => <SelectDemo />,
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'A 50×28 pill. Cobalt track when on, hairline track when off; the white knob slides in 150ms.',
    snippet: `import { Switch } from 'prima-ui';

<Switch checked={on} onChange={setOn} label="Available for work" />`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state.' },
      { name: 'onChange', type: '(checked) => void', description: 'Toggle handler.' },
      { name: 'label', type: 'string', description: 'Optional trailing label text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims and blocks toggling.' },
    ],
    render: () => <SwitchDemo />,
  },
  {
    id: 'sectionheader',
    name: 'SectionHeader',
    description: 'The Prima section opener: mono `//` cobalt eyebrow and running number above a 3px ink rule, then an ALL-CAPS Clash Display title and optional lede.',
    snippet: `import { SectionHeader } from 'prima-ui';

<SectionHeader
  eyebrow="SELECTED WORK"
  number="002"
  title="Things I've shipped"
  description="Case studies from the last few years."
/>`,
    props: [
      { name: 'title', type: 'string', description: 'ALL-CAPS Clash Display title.' },
      { name: 'eyebrow', type: 'string', description: 'Mono eyebrow, rendered with a // prefix.' },
      { name: 'number', type: 'string', description: 'Running number at the right of the rule — e.g. "001".' },
      { name: 'description', type: 'string', description: 'Optional lede paragraph.' },
    ],
    block: true,
    render: () => (
      <SectionHeader
        eyebrow="SELECTED WORK" number="002" title="Things I've shipped"
        description="Case studies from the last few years — realtime systems, brand sites, and tooling."
        style={{ width: '100%' }}
      />
    ),
  },
  {
    id: 'timelineitem',
    name: 'TimelineItem',
    description: 'A vertical timeline row: mono year column, 2px connector with a cobalt node, ALL-CAPS title with optional org, description, and chips.',
    snippet: `import { TimelineItem } from 'prima-ui';

<TimelineItem
  period="2023 — NOW" title="Design Engineer" org="Freelance"
  description="Design systems and interactive sites."
  tags={['React', 'GSAP']}
/>
<TimelineItem period="2021" title="Frontend Engineer" last />`,
    props: [
      { name: 'period', type: 'string', description: 'Mono year/period column — e.g. "2023 — NOW".' },
      { name: 'title', type: 'string', description: 'Row title.' },
      { name: 'org', type: 'string', description: 'Company/event, shown after the title.' },
      { name: 'description', type: 'string', description: 'Body copy under the title.' },
      { name: 'tags', type: 'string[]', description: 'Tech tags rendered as Chips.' },
      { name: 'last', type: 'boolean', default: 'false', description: 'Hides the connector below (last row).' },
    ],
    block: true,
    render: () => (
      <div style={{ width: '100%' }}>
        <TimelineItem
          period="2023 — NOW" title="Design Engineer" org="Freelance"
          description="Design systems and interactive sites for startups." tags={['React', 'GSAP']}
        />
        <TimelineItem period="2021" title="Frontend Engineer" org="Studio" last />
      </div>
    ),
  },
  {
    id: 'marquee',
    name: 'Marquee',
    description: 'A mono uppercase text strip that divides major sections. Decorative only — one per page. Loops right-to-left and respects reduced motion.',
    snippet: `import { Marquee } from 'prima-ui';

<Marquee items={['ENGINEERED MINIMALISM', 'COBALT ON ICE']} />
<Marquee inverse items={['PRIMA']} separator="→" />`,
    props: [
      { name: 'items', type: 'string[]', description: 'Phrases to loop across the strip.' },
      { name: 'speed', type: 'number', default: '30', description: 'Seconds per loop — lower is faster.' },
      { name: 'inverse', type: 'boolean', default: 'false', description: 'Ink-surface variant.' },
      { name: 'separator', type: 'string', default: "'//'", description: 'Cobalt separator between items.' },
    ],
    block: true,
    render: () => (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Marquee items={['ENGINEERED MINIMALISM', 'COBALT ON ICE', 'VISIBLE STRUCTURE']} speed={18} />
        <Marquee inverse items={['PRIMA UI', 'ENGINEERED MINIMALISM']} speed={22} separator="→" />
      </div>
    ),
  },
  {
    id: 'sociallinks',
    name: 'SocialLinks',
    description: 'Bordered square icon links (Phosphor regular). Border and glyph go cobalt on hover. Ships sensible defaults; pass links to override.',
    snippet: `import { SocialLinks } from 'prima-ui';

<SocialLinks />
<SocialLinks size={56} links={[
  { name: 'github', label: 'GitHub', href: 'https://github.com/arayhan' },
]} />`,
    props: [
      { name: 'links', type: 'SocialLink[]', default: 'built-in', description: '{ name, label, href } — name keys the Phosphor glyph (github, linkedin, instagram, medium, x).' },
      { name: 'size', type: 'number', default: '44', description: 'Square size in px.' },
    ],
    render: () => <SocialLinks />,
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'A cobalt-filled track, 8px tall by default, with an optional mono label and a right-aligned percentage above it.',
    snippet: `import { Progress } from 'prima-ui';

<Progress value={68} label="Uploading" />
<Progress value={42} showPercentage={false} />`,
    props: [
      { name: 'value', type: 'number', description: 'Percentage filled — clamped to 0–100.' },
      { name: 'label', type: 'string', description: 'Mono label shown above the bar.' },
      { name: 'showPercentage', type: 'boolean', default: 'true', description: 'Shows the rounded "N%" value next to the label.' },
      { name: 'height', type: 'number', default: '8', description: 'Bar height in pixels.' },
    ],
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', minWidth: 280 }}>
        <Progress value={68} label="Uploading" />
        <Progress value={42} showPercentage={false} />
      </div>
    ),
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'A native range input under a 6px cobalt-filled track and an 18px ink-ringed thumb that lifts with a floating shadow while dragging.',
    snippet: `import { Slider } from 'prima-ui';

<Slider value={volume} onChange={setVolume} label="Volume" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current value (controlled).' },
      { name: 'onChange', type: '(value: number) => void', description: 'Fires on drag, keyboard, or click.' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'step', type: 'number', default: '1', description: 'Increment step.' },
      { name: 'label', type: 'string', description: 'Mono label above the track.' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Shows the current value next to the label.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims the track and blocks interaction.' },
    ],
    render: () => <SliderDemo />,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'A mono-caps tab list with a 2px cobalt underline on the active tab, rendering a single panel below.',
    snippet: `import { Tabs } from 'prima-ui';

<Tabs
  defaultValue="overview"
  items={[
    { value: 'overview', label: 'Overview', content: <p>...</p> },
    { value: 'activity', label: 'Activity', content: <p>...</p> },
  ]}
/>`,
    props: [
      { name: 'items', type: 'TabItem[]', description: '{ value, label, icon?, content, disabled? } tab definitions.' },
      { name: 'value / onChange', type: 'string / (value) => void', description: 'Controlled active tab.' },
      { name: 'defaultValue', type: 'string', description: 'Uncontrolled initial tab — defaults to the first item.' },
    ],
    block: true,
    render: () => (
      <Tabs
        defaultValue="overview"
        style={{ width: '100%' }}
        items={[
          {
            value: 'overview', label: 'Overview', content: (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)', margin: 0 }}>
                A quick summary of the project — status, owner, and the last update.
              </p>
            ),
          },
          {
            value: 'activity', label: 'Activity', content: (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)', margin: 0 }}>
                A running log of recent changes and comments.
              </p>
            ),
          },
          {
            value: 'settings', label: 'Settings', content: (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)', margin: 0 }}>
                Permissions, notifications, and danger-zone actions.
              </p>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: 'toggle',
    name: 'Toggle',
    description: 'A single pressable button that fills cobalt and stays "on" once pressed — the toolbar bold/italic pattern, distinct from the Switch settings pill.',
    snippet: `import { Toggle } from 'prima-ui';

<Toggle pressed={bold} onPressedChange={setBold}>
  <i className="ph ph-text-b" />
</Toggle>`,
    props: [
      { name: 'pressed', type: 'boolean', description: 'On/off state.' },
      { name: 'onPressedChange', type: '(pressed: boolean) => void', description: 'Toggle handler.' },
      { name: 'children', type: 'ReactNode', description: 'Label and/or icon content.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims to 40% and blocks toggling.' },
    ],
    render: () => <ToggleDemo />,
  },
  {
    id: 'togglegroup',
    name: 'ToggleGroup',
    description: 'ButtonGroup\'s joined-segment language repurposed for toggling — type="single" keeps exactly one segment active, type="multiple" lets any number stay pressed.',
    snippet: `import { ToggleGroup } from 'prima-ui';

<ToggleGroup
  value={align} onChange={setAlign}
  options={[
    { value: 'left', label: 'Left', icon: 'ph ph-text-align-left' },
    { value: 'center', label: 'Center', icon: 'ph ph-text-align-center' },
  ]}
/>

<ToggleGroup
  type="multiple" value={format} onChange={setFormat}
  options={[
    { value: 'bold', label: 'Bold', icon: 'ph ph-text-b' },
    { value: 'italic', label: 'Italic', icon: 'ph ph-text-italic' },
  ]}
/>`,
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Selection mode — one active segment, or any number independently toggled.' },
      { name: 'value', type: 'string | string[]', description: 'Controlled selection — a string in single mode, an array in multiple mode.' },
      { name: 'onChange', type: '(value) => void', description: 'Change handler — receives the new string or string[].' },
      { name: 'options', type: 'ToggleGroupOption[]', description: '{ value, label, icon? } segments.' },
    ],
    render: () => <ToggleGroupDemo />,
  },
  {
    id: 'rating',
    name: 'Rating',
    description: 'A row of stars, gray with a clipped cobalt fill so fractional values render cleanly read-only. Interactive when `onChange` is passed — click to rate, with a hover preview.',
    snippet: `import { Rating } from 'prima-ui';

<Rating value={4.5} label="4.5 (312 reviews)" />
<Rating value={rating} onChange={setRating} allowHalf label="Click to rate" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current rating, e.g. 3.5 out of max.' },
      { name: 'onChange', type: '(value: number) => void', description: 'Provide to make it interactive (click to rate).' },
      { name: 'max', type: 'number', default: '5', description: 'Total stars.' },
      { name: 'allowHalf', type: 'boolean', default: 'false', description: 'Allow clicking half-stars.' },
      { name: 'size', type: 'number', default: '22', description: 'Star size in px.' },
      { name: 'label', type: 'string', description: 'Mono label to the left — e.g. "4.2 (128)".' },
    ],
    render: () => <RatingDemo />,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'Five cobalt loading indicators — ring, dots, bars, pulse, orbit — in one component. Keeps animating regardless of reduced motion; it is a live status indicator, not decoration.',
    snippet: `import { Spinner } from 'prima-ui';

<Spinner variant="ring" />
<Spinner variant="dots" size={32} label="Loading results" />`,
    props: [
      { name: 'variant', type: "'ring' | 'dots' | 'bars' | 'pulse' | 'orbit'", default: "'ring'", description: 'Visual style.' },
      { name: 'size', type: 'number', default: '24', description: 'Size in px.' },
      { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible label (role="status").' },
    ],
    render: () => <SpinnerDemo />,
  },
];
