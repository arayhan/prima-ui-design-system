import React from 'react';
import {
  Button, ButtonGroup, Calendar, Checkbox, ColorPicker, Combobox, DatePicker, Dropzone, Input,
  MultiSelect, OtpInput, PasswordInput, RadioGroup, RichTextEditor, Textarea, useToast,
} from 'prima-ui';
import type { PropMeta } from '../components/PropsTable';

export interface DocMeta {
  id: string;
  name: string;
  description: string;
  snippet: string;
  props: PropMeta[];
  render: () => React.ReactNode;
  block?: boolean;
}

const STACK_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'gsap', label: 'GSAP' },
  { value: 'three', label: 'Three.js' },
  { value: 'vite', label: 'Vite' },
];

function CheckboxDemo() {
  const [a, setA] = React.useState(true);
  const [b, setB] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <Checkbox checked={a} onChange={setA} label="Ship with source maps" />
      <Checkbox checked={b} onChange={setB} label="Enable analytics" />
      <Checkbox checked disabled label="Peer dependency (locked)" />
      <Checkbox checked={false} onChange={() => {}} label="Accept the terms" error="You must accept to continue." />
    </div>
  );
}

function RadioDemo() {
  const [value, setValue] = React.useState('ds');
  return (
    <RadioGroup
      label="Project type" value={value} onChange={setValue}
      options={[
        { value: 'web', label: 'Web application' },
        { value: 'ds', label: 'Design system' },
        { value: 'brand', label: 'Brand site' },
      ]}
    />
  );
}

function ButtonGroupDemo() {
  const [view, setView] = React.useState('grid');
  return (
    <ButtonGroup
      label="View" value={view} onChange={setView}
      options={[
        { value: 'grid', label: 'Grid', icon: 'ph ph-squares-four' },
        { value: 'list', label: 'List', icon: 'ph ph-list' },
        { value: 'board', label: 'Board', icon: 'ph ph-kanban' },
      ]}
    />
  );
}

function ComboboxDemo() {
  const [value, setValue] = React.useState<string>();
  return (
    <div style={{ width: 320, maxWidth: '100%' }}>
      <Combobox
        label="Framework" options={STACK_OPTIONS} value={value} onChange={setValue}
        helper="Type to filter, Enter to pick."
      />
    </div>
  );
}

function MultiSelectDemo() {
  const [value, setValue] = React.useState<string[]>(['react', 'ts']);
  return (
    <div style={{ width: 360, maxWidth: '100%' }}>
      <MultiSelect
        label="Tech stack" options={STACK_OPTIONS} value={value} onChange={setValue}
        helper="Pick everything that applies."
      />
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 6, 14));
  return <Calendar value={date} onChange={setDate} />;
}

function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div style={{ width: 280, maxWidth: '100%' }}>
      <DatePicker label="Launch date" value={date} onChange={setDate} helper="Opens the Calendar in a popover." />
    </div>
  );
}

function RichTextEditorDemo() {
  const [html, setHtml] = React.useState(
    '<h2>Release notes</h2><p>Shipping the <code>RichTextEditor</code> today — <strong>bold</strong>, <em>italic</em>, links, and more.</p><ul><li>Zero editor dependency</li><li>Built on execCommand</li></ul>',
  );
  return <RichTextEditor label="Post body" value={html} onChange={setHtml} helper="Formats to HTML — read it back with onChange." />;
}

function OtpInputDemo() {
  const [value, setValue] = React.useState('24');
  return <OtpInput length={6} value={value} onChange={setValue} label="Verification code" helper="Sent to your email — paste it in." autoFocus />;
}

function ColorPickerDemo() {
  const [hex, setHex] = React.useState('#1B44F0');
  return (
    <div style={{ width: 220, maxWidth: '100%' }}>
      <ColorPicker label="Accent color" value={hex} onChange={setHex} helper="Pick a preset or type a hex value." />
    </div>
  );
}

function DropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <Dropzone
      label="Drop images here"
      helper="PNG or JPG, up to 5MB."
      accept="image/*"
      multiple
      maxSize={5 * 1024 * 1024}
      files={files}
      onFilesAdded={(added) => setFiles((f) => [...f, ...added])}
      onRemove={(index) => setFiles((f) => f.filter((_, i) => i !== index))}
    />
  );
}

interface FormState { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

function FormValidationDemo() {
  const { toast } = useToast();
  const [values, setValues] = React.useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const set = (key: keyof FormState) => (e: any) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      toast({ title: 'Message sent', description: 'Thanks — I will get back to you shortly.', variant: 'success' });
      setValues({ name: '', email: '', message: '' });
    } else {
      toast({ title: 'Check the form', description: 'Some fields need attention.', variant: 'error' });
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: 480, maxWidth: '100%',
    }}>
      <Input label="Name" placeholder="Ada Lovelace" value={values.name} onChange={set('name')} error={errors.name} />
      <Input label="Email" placeholder="ada@example.com" type="email" value={values.email} onChange={set('email')} error={errors.email} />
      <Textarea label="Message" placeholder="Tell me about the project…" value={values.message} onChange={set('message')} error={errors.message} helper={errors.message ? undefined : 'At least 10 characters.'} />
      <Button icon="→" style={{ alignSelf: 'flex-start' }}>Send message</Button>
    </form>
  );
}

export const FORMS: DocMeta[] = [
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'An 18px square that fills cobalt with a check glyph — the same control language as MultiSelect rows. Supports label, disabled, and error.',
    snippet: `import { Checkbox } from 'prima-ui';

<Checkbox checked={on} onChange={setOn} label="Ship with source maps" />
<Checkbox checked disabled label="Peer dependency (locked)" />
<Checkbox checked={agreed} onChange={setAgreed}
  label="Accept the terms" error="You must accept to continue." />`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'On/off state.' },
      { name: 'onChange', type: '(checked) => void', description: 'Toggle handler.' },
      { name: 'label', type: 'string', description: 'Trailing label text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims and blocks toggling.' },
      { name: 'error', type: 'string', description: 'Error text below; turns the box border red.' },
    ],
    render: () => <CheckboxDemo />,
  },
  {
    id: 'radio',
    name: 'RadioGroup',
    description: '18px circles with a cobalt dot that scales in. One value per group, laid out in a column or row.',
    snippet: `import { RadioGroup } from 'prima-ui';

<RadioGroup
  label="Project type"
  value={type} onChange={setType}
  options={[
    { value: 'web', label: 'Web application' },
    { value: 'ds', label: 'Design system' },
  ]}
/>`,
    props: [
      { name: 'options', type: 'SelectOption[]', description: '{ value, label } pairs.' },
      { name: 'value / onChange', type: 'string / (v) => void', description: 'Controlled selection.' },
      { name: 'label', type: 'string', description: 'Mono uppercase group label.' },
      { name: 'direction', type: "'row' | 'column'", default: "'column'", description: 'Option layout.' },
      { name: 'helper / error', type: 'string', description: 'Text below the group.' },
    ],
    render: () => <RadioDemo />,
  },
  {
    id: 'buttongroup',
    name: 'ButtonGroup',
    description: 'A segmented control — joined mono uppercase segments inside one 2px ink border; the active segment fills cobalt.',
    snippet: `import { ButtonGroup } from 'prima-ui';

<ButtonGroup
  value={view} onChange={setView}
  options={[
    { value: 'grid', label: 'Grid', icon: 'ph ph-squares-four' },
    { value: 'list', label: 'List', icon: 'ph ph-list' },
  ]}
/>`,
    props: [
      { name: 'options', type: 'ButtonGroupOption[]', description: '{ value, label, icon? } segments.' },
      { name: 'value / onChange', type: 'string / (v) => void', description: 'Controlled selection.' },
      { name: 'label', type: 'string', description: 'Accessible group name.' },
    ],
    render: () => <ButtonGroupDemo />,
  },
  {
    id: 'password',
    name: 'PasswordInput',
    description: "Input's field language plus an eye toggle that reveals the value — the toggle goes cobalt while the value is visible.",
    snippet: `import { PasswordInput } from 'prima-ui';

<PasswordInput label="Password" placeholder="••••••••"
  helper="At least 12 characters." />`,
    props: [
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
      { name: 'value / onChange', type: 'string / (e) => void', description: 'Controlled usage.' },
      { name: 'placeholder', type: 'string', description: 'Native placeholder.' },
    ],
    render: () => (
      <div style={{ width: 280, maxWidth: '100%' }}>
        <PasswordInput label="Password" placeholder="••••••••" helper="At least 12 characters." />
      </div>
    ),
  },
  {
    id: 'combobox',
    name: 'Combobox',
    description: 'A searchable single select. Type to filter the floating list; pick with the pointer or arrow keys + Enter.',
    snippet: `import { Combobox } from 'prima-ui';

<Combobox
  label="Framework"
  options={frameworks}
  value={value} onChange={setValue}
/>`,
    props: [
      { name: 'options', type: 'SelectOption[]', description: '{ value, label } pairs.' },
      { name: 'value / onChange', type: 'string / (v) => void', description: 'Controlled selection.' },
      { name: 'placeholder', type: 'string', default: "'Search…'", description: 'Shown when empty.' },
      { name: 'emptyText', type: 'string', default: "'No matches.'", description: 'Shown when the filter matches nothing.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <ComboboxDemo />,
  },
  {
    id: 'multiselect',
    name: 'MultiSelect',
    description: 'A field-language trigger that fills with removable cobalt chips, opening a floating checklist. Controlled via value / onChange.',
    snippet: `import { MultiSelect } from 'prima-ui';

const [stack, setStack] = useState<string[]>(['react']);

<MultiSelect
  label="Tech stack"
  options={options}
  value={stack} onChange={setStack}
/>`,
    props: [
      { name: 'options', type: 'SelectOption[]', description: '{ value, label } pairs.' },
      { name: 'value', type: 'string[]', description: 'Selected values (controlled).' },
      { name: 'onChange', type: '(v: string[]) => void', description: 'Selection handler.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
      { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Shown when nothing is selected.' },
    ],
    render: () => <MultiSelectDemo />,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'A month grid on the white surface — mono weekday initials, cobalt fill for the selection, cobalt outline for today.',
    snippet: `import { Calendar } from 'prima-ui';

const [date, setDate] = useState<Date>();
<Calendar value={date} onChange={setDate} />`,
    props: [
      { name: 'value', type: 'Date', description: 'Selected date (controlled).' },
      { name: 'onChange', type: '(date: Date) => void', description: 'Selection handler.' },
    ],
    render: () => <CalendarDemo />,
  },
  {
    id: 'datepicker',
    name: 'DatePicker',
    description: 'A field-language trigger opening the Calendar in a floating panel. Selecting a day closes it; Escape and outside click too.',
    snippet: `import { DatePicker } from 'prima-ui';

const [date, setDate] = useState<Date>();
<DatePicker label="Launch date" value={date} onChange={setDate} />`,
    props: [
      { name: 'value / onChange', type: 'Date / (d: Date) => void', description: 'Controlled selection.' },
      { name: 'placeholder', type: 'string', default: "'Pick a date'", description: 'Shown when empty.' },
      { name: 'format', type: '(d: Date) => string', default: 'locale date', description: 'Formats the field text.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <DatePickerDemo />,
  },
  {
    id: 'richtexteditor',
    name: 'RichTextEditor',
    description: 'A full WYSIWYG field — bold/italic/underline/strike, H2/H3, blockquote, inline code, lists, alignment, link/image/table insert, undo/redo, and a live word/char count. Built on execCommand — zero editor dependency.',
    snippet: `import { RichTextEditor, stripHtmlToText } from 'prima-ui';

const [html, setHtml] = useState('<p>Hello world</p>');

<RichTextEditor label="Post body" value={html} onChange={setHtml} />
stripHtmlToText(html); // "Hello world" — plain-text utility`,
    props: [
      { name: 'value / onChange', type: 'string / (html) => void', description: 'Controlled HTML content.' },
      { name: 'defaultValue', type: 'string', description: 'Initial HTML (uncontrolled).' },
      { name: 'placeholder', type: 'string', description: 'Shown when the editor is empty.' },
      { name: 'minHeight', type: 'number', default: '220', description: 'Editable area height in px.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <RichTextEditorDemo />,
    block: true,
  },
  {
    id: 'otpinput',
    name: 'OtpInput',
    description: 'N mono single-character boxes for OTP/PIN entry — auto-advances on type, walks backward clearing on Backspace, arrow keys move between boxes, and pasting a full code distributes across all boxes at once.',
    snippet: `import { OtpInput } from 'prima-ui';

const [code, setCode] = useState('');

<OtpInput
  length={6} value={code} onChange={setCode}
  label="Verification code"
  helper="Sent to your email — paste it in."
  autoFocus
/>`,
    props: [
      { name: 'length', type: 'number', default: '6', description: 'Number of boxes.' },
      { name: 'value / onChange', type: 'string / (v) => void', description: 'Controlled code, e.g. "123456".' },
      { name: 'numeric', type: 'boolean', default: 'true', description: 'Restrict input to digits only.' },
      { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Focus the first empty box on mount.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <OtpInputDemo />,
  },
  {
    id: 'colorpicker',
    name: 'ColorPicker',
    description: 'A swatch trigger that opens a Popover with a preset grid plus a hex text input for custom values. The hex input only commits once its content is a syntactically valid hex color.',
    snippet: `import { ColorPicker } from 'prima-ui';

const [hex, setHex] = useState('#1B44F0');

<ColorPicker label="Accent color" value={hex} onChange={setHex} />`,
    props: [
      { name: 'value', type: 'string', description: 'Hex color, e.g. "#1B44F0".' },
      { name: 'onChange', type: '(hex: string) => void', description: 'Called with a valid hex color.' },
      { name: 'presets', type: 'string[]', description: 'Swatch grid values. A sensible default set is provided.' },
      { name: 'label / helper / error', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <ColorPickerDemo />,
  },
  {
    id: 'dropzone',
    name: 'Dropzone',
    description: 'A dashed hairline panel that accepts drag-and-drop or click-to-browse file selection, with a controlled file list below showing image previews, names, sizes and remove buttons.',
    snippet: `import { Dropzone } from 'prima-ui';

const [files, setFiles] = useState<File[]>([]);

<Dropzone
  label="Drop images here"
  accept="image/*" multiple maxSize={5 * 1024 * 1024}
  files={files}
  onFilesAdded={(added) => setFiles((f) => [...f, ...added])}
  onRemove={(i) => setFiles((f) => f.filter((_, idx) => idx !== i))}
/>`,
    props: [
      { name: 'onFilesAdded', type: '(files: File[]) => void', description: 'Called with newly accepted files.' },
      { name: 'files', type: 'File[]', description: 'Controlled list shown below the drop target.' },
      { name: 'onRemove', type: '(index: number) => void', description: 'Called when a file row\'s remove button is clicked.' },
      { name: 'accept', type: 'string', description: 'e.g. "image/*" or ".pdf,.docx". Default accepts anything.' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting/dropping more than one file.' },
      { name: 'maxSize', type: 'number', description: 'Max file size in bytes — larger files are rejected.' },
      { name: 'onReject', type: "(file, reason: 'size' | 'type') => void", description: 'Called for files that fail accept/maxSize checks.' },
      { name: 'label / helper', type: 'string', description: 'Prima field language.' },
    ],
    render: () => <DropzoneDemo />,
    block: true,
  },
  {
    id: 'form-validation',
    name: 'Form validation',
    description: 'Not a component — a pattern. Every Prima field takes an error prop that replaces the helper and turns the border red. Validate on submit, clear per-field on edit, confirm with a toast.',
    snippet: `const [errors, setErrors] = useState<FormErrors>({});
const { toast } = useToast();

function onSubmit(e) {
  e.preventDefault();
  const next = validate(values); // plain function returning { field: message }
  setErrors(next);
  if (Object.keys(next).length === 0) {
    toast({ title: 'Message sent', variant: 'success' });
  }
}

<Input label="Email" value={values.email}
  onChange={set('email')} error={errors.email} />
<Textarea label="Message" value={values.message}
  onChange={set('message')} error={errors.message} />
<Button>Send message</Button>`,
    props: [
      { name: 'error', type: 'string', description: 'On every Prima field — replaces helper, turns the border red.' },
      { name: 'helper', type: 'string', description: 'Neutral hint below the field when there is no error.' },
    ],
    render: () => <FormValidationDemo />,
  },
];
