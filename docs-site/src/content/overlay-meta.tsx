import React from 'react';
import { Button, Dialog, Drawer, Dropdown, Input, useToast } from 'arayhan-design-system';
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

export const OVERLAYS: DocMeta[] = [
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'A secondary-button trigger opening a floating white menu — the one sanctioned shadow. Escape, outside click, and arrow keys are handled; danger items render in the error color.',
    snippet: `import { Dropdown } from 'arayhan-design-system';

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
    snippet: `import { Dialog, Button } from 'arayhan-design-system';

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
    snippet: `import { Drawer, Button, Input } from 'arayhan-design-system';

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
    snippet: `import { ToastProvider, useToast, Button } from 'arayhan-design-system';

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
];
