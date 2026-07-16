import React from 'react';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  /** Autoplay muted on mount. Default false. */
  autoPlay?: boolean;
  /** Loop playback. Default false. */
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Prima video player — a native <video> element with fully custom chrome laid
 * over it (play/pause, seek, volume, time, fullscreen). All playback state is
 * read back off the real element via its native events; controls just call
 * its native methods. Controls stay visible while paused or hovered, and fade
 * out otherwise so the video content isn't obscured during playback.
 */
export function VideoPlayer({ src, poster, autoPlay = false, loop = false, style, className }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = React.useState(autoPlay);
  const [hovering, setHovering] = React.useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  };

  const handleVolumeChange = (next: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = next;
    if (next > 0 && v.muted) v.muted = false;
  };

  const handleFullscreen = () => {
    (rootRef.current as any)?.requestFullscreen?.();
  };

  const showControls = hovering || !playing;

  return (
    <div
      ref={rootRef}
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        background: 'var(--inverse-surface)', ...style,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={loop}
        playsInline
        onClick={togglePlay}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => { setVolume(e.currentTarget.volume); setMuted(e.currentTarget.muted); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{ width: '100%', display: 'block', cursor: 'pointer' }}
      />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {!playing && (
          <div
            onClick={togglePlay}
            style={{
              pointerEvents: 'auto', cursor: 'pointer', width: 56, height: 56,
              borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.9)', color: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <i className="ph ph-play" aria-hidden="true" style={{ fontSize: 28 }} />
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(12,15,22,0.85), transparent)',
          padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
          opacity: showControls ? 1 : 0, pointerEvents: showControls ? 'auto' : 'none',
          transition: 'opacity var(--duration-fast) var(--ease-spatial)',
        }}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => { if (videoRef.current) videoRef.current.currentTime = Number(e.target.value); }}
          aria-label="Seek"
          style={{ width: '100%', height: 4, cursor: 'pointer', accentColor: 'var(--primary)' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--on-inverse)', lineHeight: 1 }}
          >
            <i className={playing ? 'ph ph-pause' : 'ph ph-play'} aria-hidden="true" style={{ fontSize: 20 }} />
          </button>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', color: 'var(--on-inverse)', whiteSpace: 'nowrap',
          }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div style={{ flex: 1 }} />
          <button
            onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--on-inverse)', lineHeight: 1 }}
          >
            <i className={muted ? 'ph ph-speaker-x' : 'ph ph-speaker-high'} aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            aria-label="Volume"
            style={{ width: 80, height: 4, cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
          <button
            onClick={handleFullscreen} aria-label="Fullscreen"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--on-inverse)', lineHeight: 1 }}
          >
            <i className="ph ph-arrows-out" aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
