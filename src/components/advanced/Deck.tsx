import React from 'react';
import { EmptyState } from './EmptyState';

export interface DeckProps {
  /** Each child is one card's content — rendered in array order, first = frontmost */
  children: React.ReactNode[];
  /** Called when the front card is swiped off, with the direction and the index that was swiped */
  onSwipe?: (direction: 'left' | 'right', index: number) => void;
  /** Called once the deck is empty (all cards swiped) */
  onEmpty?: () => void;
  /** Controlled front-card index */
  index?: number;
  /** Uncontrolled initial index. Default 0. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Horizontal drag distance in px past which a release counts as a swipe. Default 120. */
  threshold?: number;
  /** How many cards behind the front one are visible in the stack. Default 3. */
  stackSize?: number;
  /** Card width/height — the deck container is sized to this. Default { width: 320, height: 420 }. */
  size?: { width: number; height: number };
  style?: React.CSSProperties;
  className?: string;
}

const SWIPE_MS = 300;
const SNAP_BACK_MS = 250;

/**
 * Prima deck — a Tinder-like swipeable card stack. Drag the front card
 * horizontally with pointer/touch; release past the threshold to send it
 * flying off, or let go early to snap it back to center. Pure pointer
 * events + CSS transforms, no external animation library.
 */
export function Deck({
  children,
  onSwipe,
  onEmpty,
  index,
  defaultIndex = 0,
  onIndexChange,
  threshold = 120,
  stackSize = 3,
  size = { width: 320, height: 420 },
  style,
  className,
}: DeckProps) {
  const isControlled = index !== undefined;
  const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
  const currentIndex = isControlled ? index : internalIndex;

  const [drag, setDrag] = React.useState<{ x: number; y: number } | null>(null);
  const [exiting, setExiting] = React.useState<'left' | 'right' | null>(null);
  const [snapping, setSnapping] = React.useState(false);
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const dragCurrentRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const emptiedRef = React.useRef(false);

  const cards = children.slice(currentIndex, currentIndex + stackSize);
  const isEmpty = currentIndex >= children.length;

  React.useEffect(() => {
    if (isEmpty) {
      if (!emptiedRef.current) {
        emptiedRef.current = true;
        onEmpty?.();
      }
    } else {
      emptiedRef.current = false;
    }
  }, [isEmpty, onEmpty]);

  function advance(direction: 'left' | 'right') {
    const swipedIndex = currentIndex;
    onSwipe?.(direction, swipedIndex);
    const next = swipedIndex + 1;
    if (!isControlled) setInternalIndex(next);
    onIndexChange?.(next);
    setExiting(null);
    setDrag(null);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragCurrentRef.current = { x: 0, y: 0 };
    setSnapping(false);
    setDrag({ x: 0, y: 0 });
  }

  React.useEffect(() => {
    if (!drag) return;

    function handlePointerMove(e: PointerEvent) {
      const start = dragStartRef.current;
      if (!start) return;
      const next = { x: e.clientX - start.x, y: e.clientY - start.y };
      dragCurrentRef.current = next;
      setDrag(next);
    }

    function handlePointerUp() {
      const start = dragStartRef.current;
      dragStartRef.current = null;
      if (!start) return;
      const dx = dragCurrentRef.current.x;
      if (Math.abs(dx) > threshold) {
        const direction: 'left' | 'right' = dx > 0 ? 'right' : 'left';
        setExiting(direction);
        window.setTimeout(() => advance(direction), SWIPE_MS);
        return;
      }
      setSnapping(true);
      setDrag({ x: 0, y: 0 });
      window.setTimeout(() => setSnapping(false), SNAP_BACK_MS);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag !== null, threshold]);

  if (isEmpty) {
    return (
      <div
        className={className}
        style={{
          position: 'relative', width: size.width, height: size.height,
          display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
        }}
      >
        <EmptyState icon="ph ph-cards" title="No more cards" description="You've reached the end of the deck." />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size.width, height: size.height, ...style }}
    >
      {cards.map((card, sliceIndex) => {
        const isFront = sliceIndex === 0;
        const dx = isFront ? drag?.x ?? 0 : 0;
        const dy = isFront ? drag?.y ?? 0 : 0;

        let transform = `translateY(${sliceIndex * 10}px) scale(${1 - sliceIndex * 0.05})`;
        let transition: string | undefined;
        let opacity = Math.max(0.6, 1 - sliceIndex * 0.08);

        if (isFront) {
          if (exiting) {
            const flungX = exiting === 'right' ? 600 : -600;
            const flungRotate = exiting === 'right' ? 30 : -30;
            transform = `translateX(${flungX}px) rotate(${flungRotate}deg)`;
            transition = 'transform 300ms ease-out, opacity 300ms ease-out';
            opacity = 0;
          } else if (drag) {
            transform = `translate(${dx}px, ${dy * 0.15}px) rotate(${dx / 18}deg)`;
            transition = snapping ? 'transform 250ms var(--ease-spatial, cubic-bezier(0.16,1,0.3,1))' : 'none';
          } else {
            transform = 'translate(0, 0) rotate(0)';
          }
        }

        return (
          <div
            key={currentIndex + sliceIndex}
            onPointerDown={isFront ? onPointerDown : undefined}
            style={{
              position: 'absolute', inset: 0,
              background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
              borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-floating)', overflow: 'hidden',
              zIndex: stackSize - sliceIndex,
              opacity,
              transform,
              transition,
              touchAction: isFront ? 'none' : undefined,
              cursor: isFront ? 'grab' : undefined,
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
