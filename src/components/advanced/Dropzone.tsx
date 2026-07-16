import React from 'react';
import { FieldHelper } from '../core/_field';

export interface DropzoneFile {
  file: File;
  /** Object URL preview — only set for image files */
  previewUrl?: string;
}

export interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  /** Currently accepted/shown files (controlled) — omit to manage no visible list */
  files?: File[];
  onRemove?: (index: number) => void;
  /** e.g. "image/*" or ".pdf,.docx". Default accepts anything. */
  accept?: string;
  /** Allow selecting/dropping more than one file. Default false. */
  multiple?: boolean;
  /** Max file size in bytes — files over this are rejected (call onReject if given) */
  maxSize?: number;
  onReject?: (file: File, reason: 'size' | 'type') => void;
  label?: string;
  helper?: string;
  style?: React.CSSProperties;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${exponent === 0 ? value : value.toFixed(value >= 10 ? 0 : 1)} ${units[exponent]}`;
}

function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;
  const patterns = accept.split(',').map((p) => p.trim()).filter(Boolean);
  if (patterns.length === 0) return true;
  const name = file.name.toLowerCase();
  return patterns.some((pattern) => {
    const p = pattern.toLowerCase();
    if (p.startsWith('.')) return name.endsWith(p);
    if (p.endsWith('/*')) return file.type.startsWith(p.slice(0, -1));
    return file.type === p;
  });
}

/**
 * Prima dropzone — a dashed hairline panel (à la EmptyState) that accepts
 * drag-and-drop or click-to-browse file selection, with an optional
 * controlled file list below showing previews, names, sizes and remove
 * buttons.
 */
export function Dropzone({
  onFilesAdded, files, onRemove, accept, multiple = false, maxSize, onReject,
  label, helper, style, className,
}: DropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = React.useState<Record<number, string>>({});

  React.useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews({});
      return;
    }
    const next: Record<number, string> = {};
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        next[index] = URL.createObjectURL(file);
      }
    });
    setPreviews(next);
    return () => {
      Object.values(next).forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  function processFileList(fileList: FileList | File[]) {
    const accepted: File[] = [];
    Array.from(fileList).forEach((file) => {
      if (maxSize != null && file.size > maxSize) {
        onReject?.(file, 'size');
        return;
      }
      if (!matchesAccept(file, accept)) {
        onReject?.(file, 'type');
        return;
      }
      accepted.push(file);
    });
    if (accepted.length > 0) onFilesAdded(multiple ? accepted : accepted.slice(0, 1));
  }

  function openBrowser() {
    inputRef.current?.click();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFileList(e.dataTransfer.files);
    }
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }}>
      <div
        role="button"
        tabIndex={0}
        onClick={openBrowser}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBrowser(); } }}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 'var(--space-2)', textAlign: 'center', cursor: 'pointer',
          padding: 'var(--space-8)', borderRadius: 'var(--radius-md)',
          border: isDragging ? '2px dashed var(--primary)' : '2px dashed var(--border)',
          background: isDragging ? 'var(--background)' : 'var(--surface)',
          transition: 'border-color var(--duration-fast) var(--ease-spatial), background var(--duration-fast) var(--ease-spatial)',
        }}
      >
        <i className="ph ph-upload-simple" aria-hidden="true" style={{ fontSize: 32, color: 'var(--primary)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
        } as React.CSSProperties}>{label || 'Drop files here'}</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--text-secondary)',
        }}>or click to browse</span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) processFileList(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {files && files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {files.map((file, index) => {
            const previewUrl = previews[index];
            return (
              <div key={index} style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3)', border: 'var(--border-width) solid var(--border)',
                borderRadius: 'var(--radius-sm)', background: 'var(--surface)',
              }}>
                {previewUrl ? (
                  <img src={previewUrl} alt={file.name} style={{
                    width: 36, height: 36, objectFit: 'cover', borderRadius: 'var(--radius-sm)',
                    border: 'var(--border-width) solid var(--border)', flex: 'none',
                  }} />
                ) : (
                  <span style={{
                    width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-sm)',
                    background: 'var(--background)', color: 'var(--primary)', flex: 'none',
                  }}>
                    <i className="ph ph-file" aria-hidden="true" style={{ fontSize: 18 }} />
                  </span>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--on-surface)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{file.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)',
                  }}>{formatBytes(file.size)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove?.(index)}
                  aria-label={`Remove ${file.name}`}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    color: 'var(--text-secondary)', lineHeight: 1, flex: 'none',
                  }}
                >
                  <i className="ph ph-x" aria-hidden="true" style={{ fontSize: 16 }} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {helper && <FieldHelper>{helper}</FieldHelper>}
    </div>
  );
}
