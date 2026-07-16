import React from 'react';
import { Dialog } from './Dialog';
import { Button } from '../core/Button';

export interface DialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Mono eyebrow above the title */
  eyebrow?: string;
  title: string;
  /** Form fields */
  children?: React.ReactNode;
  /** Default 'Save' */
  submitLabel?: string;
  /** Default 'Cancel' */
  cancelLabel?: string;
  /** Disables both actions and shows a saving state on submit. Default false. */
  loading?: boolean;
  /** Max panel width in px. Default 480. */
  width?: number;
  className?: string;
}

/**
 * Prima dialog form — Dialog wired for form submission: a <form> around the
 * body, a cancel/submit Button pair in the footer (submit uses the HTML
 * `form` attribute so it can live outside the <form> element itself).
 */
export function DialogForm({
  open, onClose, onSubmit, eyebrow, title, children,
  submitLabel = 'Save', cancelLabel = 'Cancel', loading = false, width = 480, className,
}: DialogFormProps) {
  const formId = React.useId();

  return (
    <Dialog
      open={open} onClose={onClose} eyebrow={eyebrow} title={title} width={width} className={className}
      actions={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button type="submit" form={formId} disabled={loading}>{loading ? 'Saving…' : submitLabel}</Button>
        </>
      }
    >
      <form id={formId} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {children}
      </form>
    </Dialog>
  );
}
