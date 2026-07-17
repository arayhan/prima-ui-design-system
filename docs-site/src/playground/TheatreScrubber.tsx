import React from 'react';
import { getProject, types, type __UNSTABLE_Project_OnDiskState } from '@theatre/core';

const SHEET_ID = 'Assemble';
const LENGTH = 1.2;

interface TilePose { x: number; rotate: number; opacity: number }
interface TileSpec { key: string; from: TilePose; to: TilePose; color: string }

const TILES: TileSpec[] = [
  { key: 'TileA', from: { x: -150, rotate: -60, opacity: 0 }, to: { x: -46, rotate: 0, opacity: 1 }, color: 'var(--primary)' },
  { key: 'TileB', from: { x: 60, rotate: 50, opacity: 0 }, to: { x: 0, rotate: 0, opacity: 1 }, color: 'var(--on-surface)' },
  { key: 'TileC', from: { x: 150, rotate: -40, opacity: 0 }, to: { x: 46, rotate: 0, opacity: 1 }, color: 'var(--primary)' },
];

/** Build a hand-authored @theatre/core project state — the schema Theatre's
 * own Studio would export, written directly since there's no Studio session
 * to export it from. Two bezier keyframes per prop (rest -> assembled). */
function buildState(): __UNSTABLE_Project_OnDiskState {
  const tracksByObject: Record<string, { trackIdByPropPath: Record<string, string>; trackData: Record<string, unknown> }> = {};

  TILES.forEach((tile) => {
    const trackIdByPropPath: Record<string, string> = {};
    const trackData: Record<string, unknown> = {};
    (Object.keys(tile.from) as (keyof TilePose)[]).forEach((prop) => {
      const trackId = `${tile.key}-${prop}`;
      trackIdByPropPath[JSON.stringify([prop])] = trackId;
      trackData[trackId] = {
        type: 'BasicKeyframedTrack',
        __debugName: `${tile.key}:${prop}`,
        keyframes: [
          { id: `${trackId}-k0`, position: 0, value: tile.from[prop], handles: [0.5, 1, 0.5, 0], connectedRight: true, type: 'bezier' },
          { id: `${trackId}-k1`, position: LENGTH, value: tile.to[prop], handles: [0.5, 1, 0.5, 0], connectedRight: false, type: 'bezier' },
        ],
      };
    });
    tracksByObject[tile.key] = { trackIdByPropPath, trackData };
  });

  return {
    sheetsById: {
      [SHEET_ID]: {
        staticOverrides: { byObject: {} },
        sequence: { type: 'PositionalSequence', length: LENGTH, subUnitsPerUnit: 30, tracksByObject },
      },
    },
    revisionHistory: [],
    definitionVersion: '0.4.0',
  } as unknown as __UNSTABLE_Project_OnDiskState;
}

// Built once at module scope: @theatre/core rejects a `sheet.object(key, config)`
// call whose config is a *different object* than the one already registered for
// that key, even when the values match — which a fresh object literal built
// inside an effect would trip on every re-mount (e.g. React StrictMode's
// dev-mode double-invoke).
const STATE = buildState();
const TILE_CONFIGS = TILES.map((tile) => ({
  x: types.number(tile.from.x),
  rotate: types.number(tile.from.rotate),
  opacity: types.number(tile.from.opacity, { range: [0, 1] as [number, number] }),
}));

export default function TheatreScrubber() {
  const [poses, setPoses] = React.useState<TilePose[]>(() => TILES.map((t) => t.from));
  const [position, setPosition] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const sequenceRef = React.useRef<{ position: number; play: (c?: { range?: [number, number] }) => Promise<boolean>; pause: () => void } | null>(null);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const project = getProject('PrimaPlayground', { state: STATE });
    const sheet = project.sheet(SHEET_ID);
    sequenceRef.current = sheet.sequence;

    const unsubs = TILES.map((tile, i) =>
      sheet.object(tile.key, TILE_CONFIGS[i]).onValuesChange((v) => {
        setPoses((prev) => { const next = [...prev]; next[i] = v as TilePose; return next; });
      }),
    );

    return () => {
      unsubs.forEach((u) => u());
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrub = (value: number) => {
    setPosition(value);
    if (sequenceRef.current) sequenceRef.current.position = value;
  };

  const play = () => {
    const sequence = sequenceRef.current;
    if (!sequence) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { scrub(LENGTH); return; }

    if (sequence.position >= LENGTH - 0.01) scrub(0);
    setPlaying(true);
    const tick = () => {
      if (sequenceRef.current) setPosition(sequenceRef.current.position);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    sequence.play({ range: [sequence.position, LENGTH] }).then(() => {
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
      setPosition(sequenceRef.current?.position ?? LENGTH);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: '100%', maxWidth: 480 }}>
      <div style={{
        position: 'relative', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', overflow: 'hidden',
      }}>
        {poses.map((pose, i) => (
          <div
            key={TILES[i].key}
            style={{
              position: 'absolute', width: 40, height: 40, borderRadius: 'var(--radius-sm)',
              background: TILES[i].color, opacity: pose.opacity,
              transform: `translateX(${pose.x}px) rotate(${pose.rotate}deg)`,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button
          onClick={play}
          disabled={playing}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-primary)',
            background: 'var(--primary)', border: 'none', borderRadius: 'var(--radius-sm)',
            padding: '10px 18px', cursor: playing ? 'default' : 'pointer', opacity: playing ? 0.6 : 1, flex: 'none',
          } as React.CSSProperties}
        >Play</button>
        <input
          type="range" min={0} max={LENGTH} step={0.01} value={position}
          onChange={(e) => scrub(Number(e.target.value))}
          aria-label="Scrub the assemble sequence"
          style={{ flex: '1 1 0', accentColor: 'var(--primary)' }}
        />
      </div>
    </div>
  );
}
