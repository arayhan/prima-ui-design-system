import React from 'react';

export interface CropRect { x: number; y: number; width: number; height: number } // in the image's natural pixel coordinates

export interface ImageCropperProps {
  src: string;
  /** Width/height ratio to lock the crop box to, e.g. 1 for square, 16/9 for widescreen. Omit for free-form. */
  aspect?: number;
  /** Called whenever the crop selection changes, with the rect in the image's natural pixel coordinates */
  onCropChange?: (rect: CropRect) => void;
  /** Max display width/height in px — the image is scaled to fit within this, crop math still operates in natural pixels. Default 480. */
  maxDisplaySize?: number;
  style?: React.CSSProperties;
  className?: string;
}

interface DisplayRect { x: number; y: number; width: number; height: number }

const MIN_DISPLAY_SIZE = 24;

/**
 * Prima image cropper — a fixed-aspect (or free-form) draggable/resizable
 * selection box over an image. Overlays four dark bands around the crop
 * rect to fake a "hole" without SVG masks. Reports the selection in the
 * image's natural pixel coordinates via onCropChange; does not itself
 * produce a cropped bitmap.
 */
export function ImageCropper({ src, aspect, onCropChange, maxDisplaySize = 480, style, className }: ImageCropperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [natural, setNatural] = React.useState<{ width: number; height: number } | null>(null);
  const [display, setDisplay] = React.useState<{ width: number; height: number } | null>(null);
  const [rect, setRect] = React.useState<DisplayRect | null>(null);
  const [dragMode, setDragMode] = React.useState<'move' | 'resize' | null>(null);
  const dragStartRef = React.useRef<{ startX: number; startY: number; startRect: DisplayRect } | null>(null);

  // Load the image to read its natural dimensions and compute display size + initial crop rect.
  React.useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const scale = Math.min(1, maxDisplaySize / nw, maxDisplaySize / nh);
      const dw = Math.round(nw * scale);
      const dh = Math.round(nh * scale);
      setNatural({ width: nw, height: nh });
      setDisplay({ width: dw, height: dh });

      let cw = dw * 0.6;
      let ch = aspect ? cw / aspect : dh * 0.6;
      if (ch > dh) { ch = dh * 0.6; cw = aspect ? ch * aspect : cw; }
      const initial: DisplayRect = {
        x: (dw - cw) / 2, y: (dh - ch) / 2, width: cw, height: ch,
      };
      setRect(initial);
    };
    img.src = src;
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, maxDisplaySize, aspect]);

  const emitChange = React.useCallback((r: DisplayRect) => {
    if (!onCropChange || !natural || !display) return;
    const scaleX = natural.width / display.width;
    const scaleY = natural.height / display.height;
    onCropChange({
      x: Math.round(r.x * scaleX),
      y: Math.round(r.y * scaleY),
      width: Math.round(r.width * scaleX),
      height: Math.round(r.height * scaleY),
    });
  }, [onCropChange, natural, display]);

  // Report the initial rect once it's computed.
  React.useEffect(() => {
    if (rect) emitChange(rect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [natural, display]);

  function clampRect(r: DisplayRect): DisplayRect {
    if (!display) return r;
    const width = Math.min(r.width, display.width);
    const height = Math.min(r.height, display.height);
    const x = Math.max(0, Math.min(r.x, display.width - width));
    const y = Math.max(0, Math.min(r.y, display.height - height));
    return { x, y, width, height };
  }

  function onMovePointerDown(e: React.PointerEvent) {
    if (!rect) return;
    e.preventDefault();
    dragStartRef.current = { startX: e.clientX, startY: e.clientY, startRect: rect };
    setDragMode('move');
  }

  function onResizePointerDown(e: React.PointerEvent) {
    if (!rect) return;
    e.preventDefault();
    e.stopPropagation();
    dragStartRef.current = { startX: e.clientX, startY: e.clientY, startRect: rect };
    setDragMode('resize');
  }

  // Attach window-level listeners only while a drag is in progress (standard
  // add-on-start / remove-on-end pattern), so cleanup is always symmetric —
  // including on unmount mid-drag.
  React.useEffect(() => {
    if (!dragMode || !display) return;

    function handlePointerMove(e: PointerEvent) {
      const drag = dragStartRef.current;
      if (!drag || !display) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (dragMode === 'move') {
        const next = clampRect({
          x: drag.startRect.x + dx, y: drag.startRect.y + dy,
          width: drag.startRect.width, height: drag.startRect.height,
        });
        setRect(next);
        emitChange(next);
      } else {
        let width = Math.max(MIN_DISPLAY_SIZE, drag.startRect.width + dx);
        let height = aspect ? width / aspect : Math.max(MIN_DISPLAY_SIZE, drag.startRect.height + dy);
        if (aspect && height < MIN_DISPLAY_SIZE) { height = MIN_DISPLAY_SIZE; width = height * aspect; }

        // Clamp to stay within image bounds from the fixed top-left corner.
        const maxWidth = display.width - drag.startRect.x;
        const maxHeight = display.height - drag.startRect.y;
        if (width > maxWidth) { width = maxWidth; if (aspect) height = width / aspect; }
        if (height > maxHeight) { height = maxHeight; if (aspect) width = height * aspect; }

        const next = clampRect({ x: drag.startRect.x, y: drag.startRect.y, width, height });
        setRect(next);
        emitChange(next);
      }
    }

    function handlePointerUp() {
      dragStartRef.current = null;
      setDragMode(null);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragMode, display, aspect, emitChange]);

  if (!display || !rect) {
    return (
      <div className={className} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 120, color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', ...style,
      }}>
        Loading image…
      </div>
    );
  }

  const bandStyle: React.CSSProperties = { position: 'absolute', background: 'rgba(0,0,0,0.5)' };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: display.width, height: display.height, ...style }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ display: 'block', width: '100%', height: '100%', userSelect: 'none', pointerEvents: 'none' }}
      />

      {/* Top band */}
      <div style={{ ...bandStyle, top: 0, left: 0, width: '100%', height: rect.y }} />
      {/* Bottom band */}
      <div style={{ ...bandStyle, top: rect.y + rect.height, left: 0, width: '100%', height: display.height - (rect.y + rect.height) }} />
      {/* Left band */}
      <div style={{ ...bandStyle, top: rect.y, left: 0, width: rect.x, height: rect.height }} />
      {/* Right band */}
      <div style={{ ...bandStyle, top: rect.y, left: rect.x + rect.width, width: display.width - (rect.x + rect.width), height: rect.height }} />

      {/* Crop box */}
      <div
        onPointerDown={onMovePointerDown}
        style={{
          position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height,
          border: '2px solid var(--primary)', boxSizing: 'border-box', cursor: 'move', touchAction: 'none',
        }}
      >
        <div
          onPointerDown={onResizePointerDown}
          style={{
            position: 'absolute', right: -6, bottom: -6, width: 12, height: 12,
            background: 'var(--primary)', cursor: 'nwse-resize', touchAction: 'none',
          }}
        />
      </div>
    </div>
  );
}
