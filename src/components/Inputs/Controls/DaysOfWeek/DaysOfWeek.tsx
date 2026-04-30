import React from 'react';
import { UnstyledButton } from '@mantine/core';
import { neutral, primary, white } from '../../../../constants/colors';
import { fontBase, fontWeight } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const ALL_DAYS_MON_FIRST: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const ALL_DAYS_SUN_FIRST: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const SHORT_LABELS: Record<DayKey, string> = {
  mon: 'M',
  tue: 'T',
  wed: 'W',
  thu: 'T',
  fri: 'F',
  sat: 'S',
  sun: 'S',
};

const sizes = {
  sm: { dim: 24, fontSize: 11, gap: 4 },
  md: { dim: 36, fontSize: 14, gap: 6 },
} as const;

export interface DaysOfWeekProps {
  /** Days currently active. Order in this array doesn't matter — the component renders week order. */
  value: DayKey[];
  /** Omit to render as read-only display chips (used in EventCard meta). */
  onChange?: (next: DayKey[]) => void;
  size?: keyof typeof sizes;
  /** Days that cannot be toggled — rendered grayed out with not-allowed cursor. */
  disabledDays?: DayKey[];
  startOfWeek?: 'mon' | 'sun';
  className?: string;
}

const DaysOfWeek = ({
  value,
  onChange,
  size = 'md',
  disabledDays,
  startOfWeek = 'mon',
  className,
}: DaysOfWeekProps) => {
  const order = startOfWeek === 'mon' ? ALL_DAYS_MON_FIRST : ALL_DAYS_SUN_FIRST;
  const selected = new Set(value);
  const disabled = new Set(disabledDays ?? []);
  const { dim, fontSize, gap } = sizes[size];
  const readOnly = !onChange;

  const toggle = (day: DayKey) => {
    if (!onChange || disabled.has(day)) return;
    if (selected.has(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <div
      className={className}
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        gap: `${gap}px`,
      }}
    >
      {order.map((day) => {
        const isActive = selected.has(day);
        const isDisabled = disabled.has(day);
        // Only render hover affordance when interactive AND not disabled.
        const interactive = !readOnly && !isDisabled;
        return (
          <UnstyledButton
            aria-label={day}
            aria-pressed={isActive}
            component={readOnly ? 'span' : 'button'}
            data-active={isActive || undefined}
            data-disabled={isDisabled || undefined}
            disabled={isDisabled || readOnly}
            key={day}
            onClick={interactive ? () => toggle(day) : undefined}
            sx={{
              ...fontBase,
              alignItems: 'center',
              backgroundColor: isActive ? primary[200] : neutral[25],
              borderRadius: `${spacing.xs}`,
              color: isActive ? white : isDisabled ? neutral[100] : neutral[300],
              cursor: interactive ? 'pointer' : isDisabled ? 'not-allowed' : 'default',
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
    </div>
  );
};

export { DaysOfWeek };
