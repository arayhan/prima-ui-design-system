import React from 'react';
import {
  Button, ContextMenu, Dialog, DialogForm, DialogStack, Drawer, Dropdown, HoverCard, Input, MenuBar,
  Popover, Tooltip, useToast,
} from 'prima-ui';
import type { DialogStackFrame } from 'prima-ui';
import type { DocMeta } from './forms-meta';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
      <Button onClick={() => toast({ title: 'Saved', description: 'Your changes are live.', variant: 'success' })}>
        Success toast
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Build failed', description: 'styles.css could not be resolved.', variant: 'error' })}>
        Error toast
      </Button>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open} onClose={() => setOpen(false)}
        eyebrow="CONFIRM" title="Delete this project?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        This action can't be undone. The project and its 14 deployments will be removed permanently.
      </Dialog>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} icon="→">Open drawer</Button>
      <Drawer
        open={open} onClose={() => setOpen(false)}
        eyebrow="SETTINGS" title="Project settings"
        actions={<Button onClick={() => setOpen(false)}>Save changes</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Input label="Project name" placeholder="Prima" />
          <Input label="Domain" placeholder="arayhan.com" />
        </div>
      </Drawer>
    </>
  );
}

function TooltipDemo() {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
      <Tooltip content="Saves your changes">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    </div>
  );
}

function ContextMenuDemo() {
  const { toast } = useToast();
  return (
    <ContextMenu
      items={[
        { label: 'Rename', icon: 'ph ph-pencil-simple', onSelect: () => toast({ title: 'Renamed', variant: 'success' }) },
        { label: 'Duplicate', icon: 'ph ph-copy', onSelect: () => toast({ title: 'Duplicated', variant: 'success' }) },
        { label: 'Share', icon: 'ph ph-share-network' },
        { label: 'Delete', icon: 'ph ph-trash', danger: true, onSelect: () => toast({ title: 'Deleted', variant: 'error' }) },
      ]}
    >
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 280, height: 120, border: 'var(--border-width) dashed var(--border)',
          borderRadius: 'var(--radius-md)', color: 'var(--on-surface-muted)',
          fontFamily: 'var(--font-body)', fontSize: 14, userSelect: 'none',
        }}
      >
        Right-click for options
      </div>
    </ContextMenu>
  );
}

function PopoverDemo() {
  return (
    <Popover trigger={<Button variant="secondary">Open popover</Button>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: 220 }}>
        <Input label="Quick rename" placeholder="New name" />
        <Button>Save</Button>
      </div>
    </Popover>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard
      trigger={
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          @arayhan
        </a>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: 220 }}>
        <strong style={{ fontFamily: 'var(--font-display)' }}>Rayhan</strong>
        <span style={{ fontSize: 13, color: 'var(--on-surface-muted)' }}>Building Prima, a design system for fast-moving teams.</span>
      </div>
    </HoverCard>
  );
}

function MenuBarDemo() {
  const { toast } = useToast();
  return (
    <MenuBar
      menus={[
        {
          label: 'File',
          items: [
            { label: 'New', icon: 'ph ph-file-plus', onSelect: () => toast({ title: 'New file' }) },
            { label: 'Open', icon: 'ph ph-folder-open' },
            { label: 'Save', icon: 'ph ph-floppy-disk' },
          ],
        },
        {
          label: 'Edit',
          items: [
            { label: 'Cut', icon: 'ph ph-scissors' },
            { label: 'Copy', icon: 'ph ph-copy' },
            { label: 'Paste', icon: 'ph ph-clipboard' },
            { label: 'Delete', icon: 'ph ph-trash', danger: true },
          ],
        },
      ]}
    />
  );
}

function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { toast } = useToast();

  return (
    <>
      <Button onClick={() => setOpen(true)}>New project</Button>
      <DialogForm
        open={open} onClose={() => setOpen(false)}
        eyebrow="CREATE" title="New project"
        submitLabel="Create"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          toast({ title: 'Project created', description: name || 'Untitled', variant: 'success' });
        }}
      >
        <Input label="Project name" placeholder="Prima" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Description" placeholder="What are you building?" value={description} onChange={(e) => setDescription(e.target.value)} />
      </DialogForm>
    </>
  );
}

function DialogStackDemo() {
  const [frames, setFrames] = React.useState<DialogStackFrame[]>([]);
  const { toast } = useToast();

  const pushTeammates = () => {
    setFrames((prev) => [
      ...prev,
      {
        id: 'teammates',
        eyebrow: 'STEP 2',
        title: 'Add teammates',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input label="Invite by email" placeholder="teammate@company.com" />
          </div>
        ),
        actions: (
          <>
            <Button variant="secondary" onClick={() => setFrames((f) => f.slice(0, -1))}>Back</Button>
            <Button onClick={finish}>Finish</Button>
          </>
        ),
      },
    ]);
  };

  const finish = () => {
    setFrames([]);
    toast({ title: 'Project created', description: 'Prima is ready to go.', variant: 'success' });
  };

  const openStack = () => {
    setFrames([
      {
        id: 'details',
        eyebrow: 'STEP 1',
        title: 'Create project',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Input label="Project name" placeholder="Prima" />
            <Input label="Type" placeholder="Web app" />
          </div>
        ),
        actions: <Button onClick={pushTeammates}>Next</Button>,
      },
    ]);
  };

  return (
    <>
      <Button onClick={openStack}>Create project</Button>
      <DialogStack
        open={frames.length > 0}
        frames={frames}
        onClose={() => setFrames([])}
        onBack={() => setFrames((f) => f.slice(0, -1))}
      />
    </>
  );
}

export const OVERLAYS: DocMeta[] = [
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'A secondary-button trigger opening a floating white menu — the one sanctioned shadow. Escape, outside click, and arrow keys are handled; danger items render in the error color.',
    snippet: `import { Dropdown } from 'prima-ui';

<Dropdown
  label="Actions"
  items={[
    { label: 'Edit', icon: 'ph ph-pencil-simple', onSelect: edit },
    { label: 'Delete', icon: 'ph ph-trash', danger: true, onSelect: remove },
  ]}
/>`,
    props: [
      { name: 'label', type: 'string', description: 'Trigger label (mono uppercase).' },
      { name: 'items', type: 'DropdownItem[]', description: '{ label, icon?, onSelect?, danger? }.' },
      { name: 'align', type: "'left' | 'right'", default: "'left'", description: 'Edge the menu aligns to.' },
    ],
    render: () => (
      <Dropdown
        label="Actions"
        items={[
          { label: 'Edit', icon: 'ph ph-pencil-simple' },
          { label: 'Duplicate', icon: 'ph ph-copy' },
          { label: 'Share', icon: 'ph ph-share-network' },
          { label: 'Delete', icon: 'ph ph-trash', danger: true },
        ]}
      />
    ),
  },
  {
    id: 'dialog',
    name: 'Dialog',
    description: 'A centered white panel over the scrim, rendered in a portal. Escape and scrim click close; body scroll locks while open; actions sit under a hairline.',
    snippet: `import { Dialog, Button } from 'prima-ui';

<Dialog
  open={open} onClose={close}
  eyebrow="CONFIRM" title="Delete this project?"
  actions={<>
    <Button variant="secondary" onClick={close}>Cancel</Button>
    <Button onClick={confirm}>Delete</Button>
  </>}
>
  This action can't be undone.
</Dialog>`,
    props: [
      { name: 'open / onClose', type: 'boolean / () => void', description: 'Controlled visibility.' },
      { name: 'title', type: 'string', description: 'Caps Clash Display title.' },
      { name: 'eyebrow', type: 'string', description: 'Mono eyebrow with // prefix.' },
      { name: 'children', type: 'ReactNode', description: 'Body content.' },
      { name: 'actions', type: 'ReactNode', description: 'Footer slot — typically a Button pair.' },
      { name: 'width', type: 'number', default: '480', description: 'Max panel width in px.' },
    ],
    render: () => <DialogDemo />,
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'A full-height side panel that slides over the scrim — for settings, filters, and detail views. Portal-rendered with Escape/scrim close and scroll lock.',
    snippet: `import { Drawer, Button, Input } from 'prima-ui';

<Drawer
  open={open} onClose={close}
  eyebrow="SETTINGS" title="Project settings"
  actions={<Button onClick={save}>Save changes</Button>}
>
  <Input label="Project name" />
</Drawer>`,
    props: [
      { name: 'open / onClose', type: 'boolean / () => void', description: 'Controlled visibility.' },
      { name: 'title / eyebrow', type: 'string', description: 'Header text.' },
      { name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Edge the panel slides from.' },
      { name: 'width', type: 'number', default: '400', description: 'Panel width in px.' },
      { name: 'actions', type: 'ReactNode', description: 'Footer pinned to the bottom.' },
    ],
    render: () => <DrawerDemo />,
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'Ink-surface notifications that stack bottom-right with a semantic rule and auto-dismiss. Wrap the app in ToastProvider once, then dispatch from anywhere with useToast().',
    snippet: `import { ToastProvider, useToast, Button } from 'prima-ui';

// main.tsx — once, at the root
<ToastProvider><App /></ToastProvider>

// anywhere below it
const { toast } = useToast();
<Button onClick={() => toast({
  title: 'Saved',
  description: 'Your changes are live.',
  variant: 'success',
})}>Save</Button>`,
    props: [
      { name: 'toast(options)', type: '(o: ToastOptions) => void', description: 'Dispatcher returned by useToast().' },
      { name: 'options.title', type: 'string', description: 'Bold first line.' },
      { name: 'options.description', type: 'string', description: 'Muted second line.' },
      { name: 'options.variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Semantic rule + icon color.' },
      { name: 'options.duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms.' },
    ],
    render: () => <ToastDemo />,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'A short plain-text hint on hover or focus. Distinct from HoverCard — shorter delay, simpler positioning, and role="tooltip" since content is a single label, not a rich panel.',
    snippet: `import { Tooltip, Button } from 'prima-ui';

<Tooltip content="Saves your changes">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`,
    props: [
      { name: 'content', type: 'string', description: 'Short plain-text hint.' },
      { name: 'children', type: 'ReactElement', description: 'The single element that triggers the tooltip.' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Which side the tooltip opens on.' },
      { name: 'delay', type: 'number', default: '200', description: 'Delay before showing, in ms.' },
    ],
    render: () => <TooltipDemo />,
  },
  {
    id: 'context-menu',
    name: 'ContextMenu',
    description: 'Right-click anywhere inside the wrapped content to open a menu at the cursor. Closes on selection, outside click, and Escape; danger items render in the error color.',
    snippet: `import { ContextMenu } from 'prima-ui';

<ContextMenu
  items={[
    { label: 'Rename', icon: 'ph ph-pencil-simple', onSelect: rename },
    { label: 'Duplicate', icon: 'ph ph-copy', onSelect: duplicate },
    { label: 'Delete', icon: 'ph ph-trash', danger: true, onSelect: remove },
  ]}
>
  <div>Right-click for options</div>
</ContextMenu>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'The content that reveals the menu on right-click.' },
      { name: 'items', type: 'ContextMenuItem[]', description: '{ label, icon?, onSelect?, danger? }.' },
    ],
    render: () => <ContextMenuDemo />,
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'A generic floating content panel anchored to a trigger. Unlike Dropdown (a fixed list of menu items), Popover content is arbitrary — forms, previews, anything. Closes on Escape and outside click.',
    snippet: `import { Popover, Button, Input } from 'prima-ui';

<Popover trigger={<Button variant="secondary">Open popover</Button>}>
  <Input label="Quick rename" placeholder="New name" />
</Popover>`,
    props: [
      { name: 'trigger', type: 'ReactNode', description: 'The element that opens the popover on click.' },
      { name: 'children', type: 'ReactNode', description: 'Arbitrary floating content.' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Which side the panel opens on.' },
      { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Edge alignment along the trigger (top/bottom sides only).' },
    ],
    render: () => <PopoverDemo />,
  },
  {
    id: 'hover-card',
    name: 'HoverCard',
    description: 'Hovering or focusing the trigger reveals a floating preview after a short delay; leaving both the trigger and the card closes it after a shorter delay, so crossing the gap between them doesn\'t flicker.',
    snippet: `import { HoverCard } from 'prima-ui';

<HoverCard trigger={<a href="/u/arayhan">@arayhan</a>}>
  <div>
    <strong>Rayhan</strong>
    <p>Building Prima, a design system for fast-moving teams.</p>
  </div>
</HoverCard>`,
    props: [
      { name: 'trigger', type: 'ReactNode', description: 'The element that triggers the card on hover/focus.' },
      { name: 'children', type: 'ReactNode', description: 'Floating preview content.' },
      { name: 'openDelay', type: 'number', default: '400', description: 'Delay before opening, in ms.' },
      { name: 'closeDelay', type: 'number', default: '150', description: 'Delay before closing after the pointer leaves, in ms.' },
      { name: 'side', type: "'top' | 'bottom'", default: "'bottom'", description: 'Which side the panel opens on.' },
    ],
    render: () => <HoverCardDemo />,
  },
  {
    id: 'menu-bar',
    name: 'MenuBar',
    description: 'A row of top-level triggers, each opening a dropdown of items — like a native app menu bar. Only one menu is open at a time; hovering a sibling trigger switches to it. Arrow keys move between triggers and items.',
    snippet: `import { MenuBar } from 'prima-ui';

<MenuBar
  menus={[
    { label: 'File', items: [
      { label: 'New', icon: 'ph ph-file-plus', onSelect: newFile },
      { label: 'Open', icon: 'ph ph-folder-open' },
      { label: 'Save', icon: 'ph ph-floppy-disk' },
    ] },
    { label: 'Edit', items: [
      { label: 'Cut', icon: 'ph ph-scissors' },
      { label: 'Copy', icon: 'ph ph-copy' },
      { label: 'Paste', icon: 'ph ph-clipboard' },
    ] },
  ]}
/>`,
    props: [
      { name: 'menus', type: 'MenuBarMenu[]', description: '{ label, items: MenuBarItem[] }[] — top-level menus in order.' },
    ],
    render: () => <MenuBarDemo />,
  },
  {
    id: 'dialog-form',
    name: 'DialogForm',
    description: 'Dialog wired for form submission — a <form> around the body, with a cancel/submit Button pair in the footer. Submit uses the HTML form attribute so it can live outside the <form> element itself.',
    snippet: `import { DialogForm, Input } from 'prima-ui';

<DialogForm
  open={open} onClose={close}
  eyebrow="CREATE" title="New project"
  submitLabel="Create"
  onSubmit={(e) => { e.preventDefault(); createProject(); }}
>
  <Input label="Project name" placeholder="Prima" />
  <Input label="Description" placeholder="What are you building?" />
</DialogForm>`,
    props: [
      { name: 'open / onClose', type: 'boolean / () => void', description: 'Controlled visibility.' },
      { name: 'onSubmit', type: '(e: FormEvent<HTMLFormElement>) => void', description: 'Form submit handler.' },
      { name: 'title / eyebrow', type: 'string', description: 'Header text.' },
      { name: 'submitLabel / cancelLabel', type: 'string', default: "'Save' / 'Cancel'", description: 'Footer button labels.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Disables both actions and shows a saving state on submit.' },
      { name: 'width', type: 'number', default: '480', description: 'Max panel width in px.' },
    ],
    render: () => <DialogFormDemo />,
  },
  {
    id: 'dialog-stack',
    name: 'DialogStack',
    description: 'A multi-frame Dialog — pushing a new frame stacks it visually on top of the previous one, which recedes slightly (translated up, scaled down, faded) behind it. Escape/scrim close the whole stack; a back button pops just the top frame.',
    snippet: `import { DialogStack } from 'prima-ui';

const [frames, setFrames] = useState<DialogStackFrame[]>([]);

<DialogStack
  open={frames.length > 0}
  frames={frames}
  onClose={() => setFrames([])}
  onBack={() => setFrames((f) => f.slice(0, -1))}
/>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled visibility.' },
      { name: 'frames', type: 'DialogStackFrame[]', description: '{ id, eyebrow?, title, content, actions? } — ordered stack, last item is the active/topmost frame.' },
      { name: 'onClose', type: '() => void', description: 'Closes the entire stack (Escape, scrim click, or an explicit close).' },
      { name: 'onBack', type: '() => void', description: 'Pops just the top frame — shows a back button in the header when frames.length > 1.' },
      { name: 'width', type: 'number', default: '480', description: 'Max panel width in px.' },
    ],
    render: () => <DialogStackDemo />,
  },
];
