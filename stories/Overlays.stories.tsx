import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button, ContextMenu, Dialog, DialogForm, Drawer, HoverCard, Input, MenuBar, Popover, Tooltip,
} from '../src/index';

const meta: Meta = { title: 'Advanced/Overlays' };
export default meta;

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
export const DialogStory: StoryObj = { name: 'Dialog', render: () => <DialogDemo /> };

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Input label="Project name" placeholder="Prima" />
          <Input label="Domain" placeholder="arayhan.com" />
        </div>
      </Drawer>
    </>
  );
}
export const DrawerStory: StoryObj = { name: 'Drawer', render: () => <DrawerDemo /> };

function TooltipDemo() {
  return (
    <Tooltip content="Saves your changes">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  );
}
export const TooltipStory: StoryObj = { name: 'Tooltip', render: () => <TooltipDemo /> };

function ContextMenuDemo() {
  return (
    <ContextMenu
      items={[
        { label: 'Rename', icon: 'ph ph-pencil-simple' },
        { label: 'Duplicate', icon: 'ph ph-copy' },
        { label: 'Delete', icon: 'ph ph-trash', danger: true },
      ]}
    >
      <div style={{ width: 240, height: 100, border: '1px dashed var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Right-click me
      </div>
    </ContextMenu>
  );
}
export const ContextMenuStory: StoryObj = { name: 'ContextMenu', render: () => <ContextMenuDemo /> };

function PopoverDemo() {
  return (
    <Popover trigger={<Button variant="secondary">Open popover</Button>}>
      <Input label="Quick rename" placeholder="New name" />
    </Popover>
  );
}
export const PopoverStory: StoryObj = { name: 'Popover', render: () => <PopoverDemo /> };

function HoverCardDemo() {
  return (
    <HoverCard trigger={<a href="#" onClick={(e) => e.preventDefault()}>@arayhan</a>}>
      <div>
        <strong>Rayhan</strong>
        <p style={{ margin: 0 }}>Building Prima.</p>
      </div>
    </HoverCard>
  );
}
export const HoverCardStory: StoryObj = { name: 'HoverCard', render: () => <HoverCardDemo /> };

function MenuBarDemo() {
  return (
    <MenuBar
      menus={[
        { label: 'File', items: [{ label: 'New' }, { label: 'Open' }, { label: 'Save' }] },
        { label: 'Edit', items: [{ label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }] },
      ]}
    />
  );
}
export const MenuBarStory: StoryObj = { name: 'MenuBar', render: () => <MenuBarDemo /> };

function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>New project</Button>
      <DialogForm
        open={open} onClose={() => setOpen(false)}
        eyebrow="CREATE" title="New project"
        submitLabel="Create"
        onSubmit={(e) => { e.preventDefault(); setOpen(false); }}
      >
        <Input label="Project name" placeholder="Prima" />
      </DialogForm>
    </>
  );
}
export const DialogFormStory: StoryObj = { name: 'DialogForm', render: () => <DialogFormDemo /> };
