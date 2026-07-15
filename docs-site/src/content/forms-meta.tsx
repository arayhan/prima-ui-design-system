import React from 'react';
import {
  Button, ButtonGroup, Calendar, Checkbox, Combobox, DatePicker, Input,
  MultiSelect, PasswordInput, RadioGroup, Textarea, useToast,
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
