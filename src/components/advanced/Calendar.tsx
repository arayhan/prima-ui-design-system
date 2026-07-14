import React from 'react';

export interface CalendarProps {
  /** Selected date (controlled) */
  value?: Date;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

function sameDay(a: Date | undefined, b: Date): boolean {
  return !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function NavButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button" aria-label={label} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface)', cursor: 'pointer', borderRadius: 'var(--radius-sm)',
        border: `var(--border-width) solid ${hover ? 'var(--primary)' : 'var(--border)'}`,
        color: hover ? 'var(--primary)' : 'var(--on-surface)',
        transition: 'color var(--duration-fast) var(--ease-spatial), border-color var(--duration-fast) var(--ease-spatial)',
      }}
    >
      <i className={icon} aria-hidden="true" style={{ fontSize: 14 }} />
    </button>
  );
}

function DayCell({ day, selected, today, onSelect }: { day: number; selected: boolean; today: boolean; onSelect: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button" onClick={onSelect} aria-pressed={selected}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-code)',
        background: selected ? 'var(--primary)' : hover ? 'var(--background)' : 'transparent',
        color: selected ? 'var(--on-primary)' : 'var(--on-surface)',
        border: today && !selected ? 'var(--border-width) solid var(--primary)' : 'var(--border-width) solid transparent',
        borderRadius: 'var(--radius-sm)', cursor: 'pointer',
        transition: 'background var(--duration-fast) var(--ease-spatial), color var(--duration-fast) var(--ease-spatial)',
      }}
    >{day}</button>
  );
}

/**
 * Prima calendar — a month grid on the white surface. Mono weekday initials,
 * cobalt fill for the selection, cobalt outline for today.
 */
export function Calendar({ value, onChange, style }: CalendarProps) {
  const today = new Date();
  const [view, setView] = React.useState(() => {
    const base = value ?? today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const first = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const leadingBlanks = (first.getDay() + 6) % 7; // Monday-first
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const move = (delta: number) => {
    setView(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div style={{
      display: 'inline-block', padding: 'var(--space-5)',
      background: 'var(--surface)', border: 'var(--border-width) solid var(--border)',
      borderRadius: 'var(--radius-md)', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--on-surface)',
        } as React.CSSProperties}>
          {MONTHS[view.month]} <span style={{ color: 'var(--text-secondary)' }}>{view.year}</span>
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <NavButton icon="ph ph-caret-left" label="Previous month" onClick={() => move(-1)} />
          <NavButton icon="ph ph-caret-right" label="Next month" onClick={() => move(1)} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 2 }}>
        {WEEKDAYS.map((d) => (
          <span key={d} style={{
            width: 36, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 'var(--tracking-label)',
            color: 'var(--text-secondary)',
          } as React.CSSProperties}>{d}</span>
        ))}
        {cells.map((day, i) => day === null ? <span key={`b${i}`} /> : (
          <DayCell
            key={day} day={day}
            selected={sameDay(value, new Date(view.year, view.month, day))}
            today={sameDay(today, new Date(view.year, view.month, day))}
            onSelect={() => onChange && onChange(new Date(view.year, view.month, day))}
          />
        ))}
      </div>
    </div>
  );
}
