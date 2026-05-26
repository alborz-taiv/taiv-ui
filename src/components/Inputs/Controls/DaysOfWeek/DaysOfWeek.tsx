import { UnstyledButton } from '@mantine/core';
import { neutral, primary, white } from '../../../../constants/colors';
import { fontBase, fontWeight } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const ALL_DAYS: DayKey[] = [
  'sun', 
  'mon', 
  'tue', 
  'wed', 
  'thu', 
  'fri', 
  'sat',
];

const SHORT_LABELS: Record<DayKey, string> = {
  fri: 'F',
  mon: 'M',
  sat: 'S',
  sun: 'S',
  thu: 'T',
  tue: 'T',
  wed: 'W',
};

const sizes = {
  md: { dim: 36, fontSize: 14, gap: 6 },
  sm: { dim: 24, fontSize: 11, gap: 4 },
} as const;

export interface DaysOfWeekProps {
  /** Days currently active. Order in this array doesn't matter — the component renders week order. */
  value: DayKey[];
  /** Omit to render as read-only display chips (used in EventCard meta). */
  onChange?: (next: DayKey[]) => void;
  /**
   * When true, the strip is non-interactive and styled as disabled (dimmed, no hover).
   * `onChange` is ignored — callers do not need to unset it.
   * Per-day {@link disabledDays} styling still applies.
   */
  disabled?: boolean;
  size?: keyof typeof sizes;
  /** Days that cannot be toggled — rendered grayed out with not-allowed cursor. */
  disabledDays?: DayKey[];
  className?: string;
}

const DaysOfWeek = ({
  value,
  onChange,
  disabled: stripDisabled = false,
  size = 'md',
  disabledDays,
  className,
}: DaysOfWeekProps) => {
  const order = ALL_DAYS;
  const selected = new Set(value);
  const disabledDaySet = new Set(disabledDays ?? []);
  const { dim, fontSize, gap } = sizes[size];
  const allowChange = Boolean(onChange) && !stripDisabled;

  const toggle = (day: DayKey) => {
    if (!onChange || stripDisabled || disabledDaySet.has(day)) return;
    if (selected.has(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <fieldset
      className={className}
      disabled={stripDisabled}
      style={{
        alignItems: 'center',
        border: 'none',
        display: 'inline-flex',
        gap: `${gap}px`,
        margin: 0,
        minWidth: 0,
        padding: 0,
        ...(stripDisabled ? { opacity: 0.5 } : {}),
      }}
    >
      {order.map((day) => {
        const isActive = selected.has(day);
        const isDayDisabled = disabledDaySet.has(day);
        // Hover / click only when the strip allows changes and this day isn't disabled.
        const interactive = allowChange && !isDayDisabled;
        const nonInteractive = !interactive;
        return (
          <UnstyledButton
            aria-label={day}
            aria-pressed={isActive}
            component={interactive ? 'button' : 'span'}
            data-active={isActive || undefined}
            data-disabled={isDayDisabled || undefined}
            disabled={nonInteractive}
            key={day}
            onClick={interactive ? () => toggle(day) : undefined}
            sx={{
              ...fontBase,
              alignItems: 'center',
              backgroundColor: isActive ? primary[200] : neutral[25],
              borderRadius: `${spacing.xs}`,
              color: isActive
                ? white
                : isDayDisabled
                  ? neutral[100]
                  : neutral[300],
              cursor: interactive
                ? 'pointer'
                : isDayDisabled
                  ? 'not-allowed'
                  : 'default',
              display: 'inline-flex',
              flexShrink: 0,
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight.semibold,
              height: `${dim}px`,
              justifyContent: 'center',
              lineHeight: 1,
              transition: 'background-color 120ms ease, color 120ms ease',
              userSelect: 'none',
              width: `${dim}px`,
              ...(interactive && {
                '&:hover': {
                  backgroundColor: isActive ? primary[200] : neutral[50],
                },
              }),
            }}
          >
            {SHORT_LABELS[day]}
          </UnstyledButton>
        );
      })}
    </fieldset>
  );
};

export { DaysOfWeek };
