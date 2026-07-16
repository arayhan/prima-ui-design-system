import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ButtonGroup, Calendar, Checkbox, ColorPicker, Combobox, DatePicker, Dropzone, OtpInput, PasswordInput, RadioGroup,
} from '../src/index';

const meta: Meta = { title: 'Advanced/Form Controls' };
export default meta;

const OPTIONS = [
  { value: 'web', label: 'Web application' },
  { value: 'ds', label: 'Design system' },
  { value: 'brand', label: 'Brand site' },
];

function CheckboxDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox checked={on} onChange={setOn} label="Ship with source maps" />
      <Checkbox checked disabled label="Peer dependency (locked)" />
      <Checkbox checked={false} onChange={() => {}} label="Accept the terms" error="You must accept to continue." />
    </div>
  );
}
export const CheckboxStory: StoryObj = { name: 'Checkbox', render: () => <CheckboxDemo /> };

function RadioDemo() {
  const [v, setV] = React.useState('ds');
  return <RadioGroup label="Project type" options={OPTIONS} value={v} onChange={setV} />;
}
export const RadioStory: StoryObj = { name: 'RadioGroup', render: () => <RadioDemo /> };

function ButtonGroupDemo() {
  const [v, setV] = React.useState('grid');
  return (
    <ButtonGroup
      label="View" value={v} onChange={setV}
      options={[
        { value: 'grid', label: 'Grid', icon: 'ph ph-squares-four' },
        { value: 'list', label: 'List', icon: 'ph ph-list' },
        { value: 'board', label: 'Board', icon: 'ph ph-kanban' },
      ]}
    />
  );
}
export const ButtonGroupStory: StoryObj = { name: 'ButtonGroup', render: () => <ButtonGroupDemo /> };

export const PasswordStory: StoryObj = {
  name: 'PasswordInput',
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <PasswordInput label="Password" placeholder="••••••••" helper="At least 12 characters." />
    </div>
  ),
};

function ComboboxDemo() {
  const [v, setV] = React.useState<string>();
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox label="Project type" options={OPTIONS} value={v} onChange={setV} helper="Type to filter." />
    </div>
  );
}
export const ComboboxStory: StoryObj = { name: 'Combobox', render: () => <ComboboxDemo /> };

function CalendarDemo() {
  const [d, setD] = React.useState<Date | undefined>(new Date(2026, 6, 14));
  return <Calendar value={d} onChange={setD} />;
}
export const CalendarStory: StoryObj = { name: 'Calendar', render: () => <CalendarDemo /> };

function DatePickerDemo() {
  const [d, setD] = React.useState<Date>();
  return (
    <div style={{ maxWidth: 280, minHeight: 420 }}>
      <DatePicker label="Launch date" value={d} onChange={setD} />
    </div>
  );
}
export const DatePickerStory: StoryObj = { name: 'DatePicker', render: () => <DatePickerDemo /> };

function OtpInputDemo() {
  const [v, setV] = React.useState('');
  return <OtpInput length={6} value={v} onChange={setV} label="Verification code" autoFocus />;
}
export const OtpInputStory: StoryObj = { name: 'OtpInput', render: () => <OtpInputDemo /> };

function ColorPickerDemo() {
  const [hex, setHex] = React.useState('#1B44F0');
  return (
    <div style={{ maxWidth: 220 }}>
      <ColorPicker label="Accent color" value={hex} onChange={setHex} />
    </div>
  );
}
export const ColorPickerStory: StoryObj = { name: 'ColorPicker', render: () => <ColorPickerDemo /> };

function DropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <Dropzone
      label="Drop images here" accept="image/*" multiple
      files={files}
      onFilesAdded={(added) => setFiles((f) => [...f, ...added])}
      onRemove={(i) => setFiles((f) => f.filter((_, idx) => idx !== i))}
    />
  );
}
export const DropzoneStory: StoryObj = { name: 'Dropzone', render: () => <DropzoneDemo /> };
