import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Dialog, Drawer, Input } from '../src/index';

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
