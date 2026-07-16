import React from 'react';
import { FieldLabel, FieldHelper, fieldWrap } from '../core/_field';

export interface RichTextEditorProps {
  label?: string;
  helper?: string;
  error?: string;
  /** Controlled HTML value */
  value?: string;
  /** Initial HTML value (uncontrolled) */
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  /** Editable area min-height in px. Default 220. */
  minHeight?: number;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

/** Strips HTML down to plain text — e.g. for search indexing, previews, or `getText()`-style reads. */
export function stripHtmlToText(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

interface CmdSpec { icon: string; label: string; command: string; value?: string; stateKey: string }

const INLINE_CMDS: CmdSpec[] = [
  { icon: 'ph ph-text-b', label: 'Bold', command: 'bold', stateKey: 'bold' },
  { icon: 'ph ph-text-italic', label: 'Italic', command: 'italic', stateKey: 'italic' },
  { icon: 'ph ph-text-underline', label: 'Underline', command: 'underline', stateKey: 'underline' },
  { icon: 'ph ph-text-strikethrough', label: 'Strikethrough', command: 'strikeThrough', stateKey: 'strikeThrough' },
];
const BLOCK_CMDS: CmdSpec[] = [
  { icon: 'ph ph-text-h-two', label: 'Heading 2', command: 'formatBlock', value: '<h2>', stateKey: 'h2' },
  { icon: 'ph ph-text-h-three', label: 'Heading 3', command: 'formatBlock', value: '<h3>', stateKey: 'h3' },
  { icon: 'ph ph-quotes', label: 'Blockquote', command: 'formatBlock', value: '<blockquote>', stateKey: 'blockquote' },
];
const LIST_CMDS: CmdSpec[] = [
  { icon: 'ph ph-list-bullets', label: 'Bullet list', command: 'insertUnorderedList', stateKey: 'insertUnorderedList' },
  { icon: 'ph ph-list-numbers', label: 'Numbered list', command: 'insertOrderedList', stateKey: 'insertOrderedList' },
];
const ALIGN_CMDS: CmdSpec[] = [
  { icon: 'ph ph-text-align-left', label: 'Align left', command: 'justifyLeft', stateKey: 'justifyLeft' },
  { icon: 'ph ph-text-align-center', label: 'Align center', command: 'justifyCenter', stateKey: 'justifyCenter' },
  { icon: 'ph ph-text-align-right', label: 'Align right', command: 'justifyRight', stateKey: 'justifyRight' },
];
const HISTORY_CMDS: CmdSpec[] = [
  { icon: 'ph ph-arrow-counter-clockwise', label: 'Undo', command: 'undo', stateKey: 'undo' },
  { icon: 'ph ph-arrow-clockwise', label: 'Redo', command: 'redo', stateKey: 'redo' },
  { icon: 'ph ph-eraser', label: 'Clear formatting', command: 'removeFormat', stateKey: 'removeFormat' },
];
const STATE_QUERIES = [
  'bold', 'italic', 'underline', 'strikeThrough',
  'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight',
];

const TABLE_HTML = '<table style="width:100%;border-collapse:collapse;margin:8px 0;"><tbody>'
  + '<tr><td style="border:1.5px solid var(--border);padding:8px;">Cell</td><td style="border:1.5px solid var(--border);padding:8px;">Cell</td></tr>'
  + '<tr><td style="border:1.5px solid var(--border);padding:8px;">Cell</td><td style="border:1.5px solid var(--border);padding:8px;">Cell</td></tr>'
  + '</tbody></table><p><br></p>';

const EDITOR_CSS = `
.prima-rte-content h2 { font-family: var(--font-display); font-size: var(--text-h3); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-heading); margin: var(--space-4) 0 var(--space-2); color: var(--on-surface); }
.prima-rte-content h3 { font-family: var(--font-display); font-size: var(--text-body-lg); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-heading); margin: var(--space-3) 0 var(--space-2); color: var(--on-surface); }
.prima-rte-content p { margin: 0 0 var(--space-3); }
.prima-rte-content blockquote { margin: var(--space-3) 0; padding: var(--space-3) var(--space-4); border-left: var(--border-width-rule) solid var(--primary); background: var(--background); color: var(--text-secondary); }
.prima-rte-content code { font-family: var(--font-mono); font-size: var(--text-code); background: var(--background); border: var(--border-width) solid var(--border); border-radius: 4px; padding: 1px 6px; color: var(--primary); }
.prima-rte-content ul, .prima-rte-content ol { padding-left: var(--space-5); margin: 0 0 var(--space-3); }
.prima-rte-content a { color: var(--primary); text-decoration: underline; }
.prima-rte-content img { max-width: 100%; border-radius: var(--radius-sm); }
.prima-rte-content td { border: var(--border-width) solid var(--border); padding: var(--space-2); }
`;

function ToolbarDivider() {
  return <span aria-hidden="true" style={{ width: 1, alignSelf: 'stretch', background: 'var(--border)', margin: '2px 4px' }} />;
}

function ToolbarButton({ icon, label, active, onClick }: {
  icon: string; label: string; active?: boolean; onClick: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  return (
    <button
      type="button" title={label} aria-label={label} aria-pressed={!!active}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 30, height: 30, background: active ? 'var(--background)' : 'transparent',
        border: `var(--border-width) solid ${lit ? 'var(--primary)' : 'transparent'}`,
        borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: lit ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial), background var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className={icon} aria-hidden="true" style={{ fontSize: 15 }} />
    </button>
  );
}

/**
 * Prima rich text editor — a contentEditable field with a full formatting
 * toolbar (bold/italic/underline/strike, H2/H3, blockquote, inline code,
 * lists, alignment, link/image/table insert, undo/redo, clear formatting)
 * built entirely on `document.execCommand` — no editor dependency. Same
 * field language (label/helper/error) as Input and Textarea. Pastes as
 * plain text to keep output predictable, and shows a live word/char count.
 */
export function RichTextEditor({
  label, helper, error, value, defaultValue, onChange,
  placeholder = 'Start writing…', minHeight = 220, id, style, className,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const savedRange = React.useRef<Range | null>(null);
  const initialized = React.useRef(false);
  const [focus, setFocus] = React.useState(false);
  const [empty, setEmpty] = React.useState(!(value ?? defaultValue));
  const [counts, setCounts] = React.useState({ words: 0, chars: 0 });
  const [popover, setPopover] = React.useState<'link' | 'image' | null>(null);
  const [urlDraft, setUrlDraft] = React.useState('');
  const [active, setActive] = React.useState<Record<string, boolean>>({});
  const inputId = id || (label ? 'rte-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const invalid = !!error;
  const isControlled = value !== undefined;

  React.useEffect(() => {
    if (initialized.current || !editorRef.current) return;
    initialized.current = true;
    const initial = (isControlled ? value : defaultValue) || '';
    editorRef.current.innerHTML = initial;
    updateCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isControlled && !focus && editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
      updateCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value, focus]);

  React.useEffect(() => {
    const update = () => {
      if (document.activeElement !== editorRef.current) return;
      const next: Record<string, boolean> = {};
      STATE_QUERIES.forEach((c) => {
        try { next[c] = document.queryCommandState(c); } catch { /* unsupported in this browser */ }
      });
      try {
        const block = document.queryCommandValue('formatBlock').toLowerCase();
        next.h2 = block === 'h2'; next.h3 = block === 'h3'; next.blockquote = block === 'blockquote';
      } catch { /* unsupported in this browser */ }
      setActive(next);
    };
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, []);

  function updateCounts() {
    const text = editorRef.current?.textContent ?? '';
    const trimmed = text.trim();
    setCounts({ words: trimmed ? trimmed.split(/\s+/).length : 0, chars: text.length });
  }

  function emitChange() {
    if (!editorRef.current) return;
    updateCounts();
    setEmpty(!editorRef.current.textContent?.trim());
    onChange && onChange(editorRef.current.innerHTML);
  }

  function focusEditor() { editorRef.current?.focus(); }

  function run(command: string, cmdValue?: string) {
    focusEditor();
    document.execCommand(command, false, cmdValue);
    emitChange();
  }

  function toggleInlineCode() {
    focusEditor();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let node: Node | null = sel.anchorNode;
    while (node && node !== editorRef.current) {
      if (node.nodeType === 1 && (node as HTMLElement).tagName === 'CODE') {
        const el = node as HTMLElement;
        const parent = el.parentNode;
        while (el.firstChild) parent?.insertBefore(el.firstChild, el);
        parent?.removeChild(el);
        emitChange();
        return;
      }
      node = node.parentNode;
    }
    const range = sel.getRangeAt(0);
    const text = range.toString();
    if (!text) return;
    const code = document.createElement('code');
    code.textContent = text;
    range.deleteContents();
    range.insertNode(code);
    emitChange();
  }

  function openPopover(kind: 'link' | 'image') {
    const sel = window.getSelection();
    savedRange.current = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null;
    setUrlDraft('');
    setPopover(kind);
  }

  function confirmPopover() {
    const url = urlDraft.trim();
    if (!url) { setPopover(null); return; }
    focusEditor();
    const sel = window.getSelection();
    if (sel && savedRange.current) { sel.removeAllRanges(); sel.addRange(savedRange.current); }
    if (popover === 'link') document.execCommand('createLink', false, url);
    else if (popover === 'image') document.execCommand('insertImage', false, url);
    setPopover(null);
    emitChange();
  }

  function insertTable() {
    focusEditor();
    document.execCommand('insertHTML', false, TABLE_HTML);
    emitChange();
  }

  function onPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
    emitChange();
  }

  return (
    <div className={className} style={{ ...fieldWrap, ...style }}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div style={{
        background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
        border: `var(--border-width) solid ${invalid ? 'var(--error)' : focus ? 'var(--primary)' : 'var(--border)'}`,
        boxShadow: focus && !invalid ? '0 0 0 3px var(--primary-ring)' : 'none',
        transition: 'border-color var(--duration-fast) var(--ease-spatial), box-shadow var(--duration-fast) var(--ease-spatial)',
      }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
          padding: 'var(--space-2)', borderBottom: 'var(--border-width) solid var(--border)',
        }}>
          {INLINE_CMDS.map((c) => (
            <ToolbarButton key={c.command} icon={c.icon} label={c.label} active={active[c.stateKey]} onClick={() => run(c.command)} />
          ))}
          <ToolbarButton icon="ph ph-code" label="Inline code" onClick={toggleInlineCode} />
          <ToolbarDivider />
          {BLOCK_CMDS.map((c) => (
            <ToolbarButton key={c.stateKey} icon={c.icon} label={c.label} active={active[c.stateKey]} onClick={() => run(c.command, c.value)} />
          ))}
          <ToolbarDivider />
          {LIST_CMDS.map((c) => (
            <ToolbarButton key={c.command} icon={c.icon} label={c.label} active={active[c.stateKey]} onClick={() => run(c.command)} />
          ))}
          {ALIGN_CMDS.map((c) => (
            <ToolbarButton key={c.command} icon={c.icon} label={c.label} active={active[c.stateKey]} onClick={() => run(c.command)} />
          ))}
          <ToolbarDivider />
          <ToolbarButton icon="ph ph-link" label="Insert link" onClick={() => openPopover('link')} />
          <ToolbarButton icon="ph ph-image" label="Insert image" onClick={() => openPopover('image')} />
          <ToolbarButton icon="ph ph-table" label="Insert table" onClick={insertTable} />
          <ToolbarDivider />
          {HISTORY_CMDS.map((c) => (
            <ToolbarButton key={c.command} icon={c.icon} label={c.label} onClick={() => run(c.command)} />
          ))}
        </div>

        {popover && (
          <div style={{
            display: 'flex', gap: 'var(--space-2)', alignItems: 'center', padding: 'var(--space-3)',
            borderBottom: 'var(--border-width) solid var(--border)', background: 'var(--background)',
          }}>
            <input
              autoFocus type="text" value={urlDraft} placeholder={popover === 'link' ? 'https://…' : 'Image URL'}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); confirmPopover(); }
                if (e.key === 'Escape') setPopover(null);
              }}
              style={{
                flex: 1, height: 32, padding: '0 10px', outline: 'none',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--on-surface)',
                background: 'var(--surface)', border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
              }}
            />
            <ToolbarButton icon="ph ph-check" label="Confirm" onClick={confirmPopover} />
            <ToolbarButton icon="ph ph-x" label="Cancel" onClick={() => setPopover(null)} />
          </div>
        )}

        <div style={{ position: 'relative' }}>
          {empty && !focus && (
            <span aria-hidden="true" style={{
              position: 'absolute', top: 'var(--space-4)', left: 'var(--space-4)', pointerEvents: 'none',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)',
            }}>{placeholder}</span>
          )}
          <div
            ref={editorRef} id={inputId} className="prima-rte-content"
            contentEditable suppressContentEditableWarning
            role="textbox" aria-multiline="true" aria-placeholder={placeholder}
            onInput={emitChange} onPaste={onPaste}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{
              minHeight, padding: 'var(--space-4)', outline: 'none',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)',
              color: 'var(--on-surface)',
            }}
          />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-4)',
          padding: 'var(--space-2) var(--space-4)', borderTop: 'var(--border-width) solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase', color: 'var(--text-secondary)',
        } as React.CSSProperties}>
          <span>{counts.words} words</span>
          <span>{counts.chars} chars</span>
        </div>
        <style>{EDITOR_CSS}</style>
      </div>
      {(error || helper) && <FieldHelper error={invalid}>{error || helper}</FieldHelper>}
    </div>
  );
}
