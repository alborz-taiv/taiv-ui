import {
  type CalendarEventExternal,
  type CalendarType,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
  type PluginBase,
} from '@schedule-x/calendar';
import { createCurrentTimePlugin } from '@schedule-x/current-time';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import { createResizePlugin } from '@schedule-x/resize';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  error,
  neutral,
  primary,
  purple,
  salmon,
  success,
  warning,
  white,
} from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';
import { SegmentedControl } from '../../Inputs/Controls/SegmentedControl/SegmentedControl';
import { Group } from '../../Layout/Group/Group';
import { Title } from '../../Typography/Title/Title';
import '@schedule-x/theme-default/dist/index.css';

// ────────────────────────────────────────────────────────────────────────────
// Public types
// ────────────────────────────────────────────────────────────────────────────

export type CalendarView = 'month' | 'week' | 'day';

export type { CalendarEventExternal, CalendarType } from '@schedule-x/calendar';

/**
 * Default Schedule-X `calendars` map, keyed by Taiv semantic color names.
 * Consumers using `calendarId: 'primary' | 'success' | …` get Taiv-tokenized
 * chips out of the box. To category-code events with custom keys (e.g.
 * `'one-time' | 'weekly'`), pass your own map via the `calendars` prop —
 * it replaces this default rather than merging.
 *
 * Schedule-X paints the chip from `lightColors`:
 * - `main` drives the 4px left-border accent and the icon stroke
 * - `container` is the filled background
 * - `onContainer` is the text painted on top of `container`
 */
export const TAIV_CALENDAR_PALETTE: Record<string, CalendarType> = {
  error: {
    colorName: 'error',
    lightColors: {
      container: error[25],
      main: error[200],
      onContainer: error[300],
    },
  },
  neutral: {
    colorName: 'neutral',
    lightColors: {
      container: neutral[25],
      main: neutral[200],
      onContainer: neutral[300],
    },
  },
  primary: {
    colorName: 'primary',
    lightColors: {
      container: primary[25],
      main: primary[200],
      onContainer: primary[200],
    },
  },
  purple: {
    colorName: 'purple',
    lightColors: {
      container: purple[50],
      main: purple[200],
      onContainer: purple[200],
    },
  },
  salmon: {
    colorName: 'salmon',
    lightColors: {
      container: salmon[50],
      main: salmon[200],
      onContainer: salmon[200],
    },
  },
  success: {
    colorName: 'success',
    lightColors: {
      container: success[25],
      main: success[200],
      onContainer: success[300],
    },
  },
  warning: {
    colorName: 'warning',
    lightColors: {
      container: warning[25],
      main: warning[200],
      onContainer: warning[300],
    },
  },
};

export interface CalendarProps {
  /**
   * Schedule-X native event shape. ISO date strings:
   * `YYYY-MM-DD` for all-day, `YYYY-MM-DD HH:mm` for timed.
   * `calendarId` references a key in the `calendars` map (default
   * `TAIV_CALENDAR_PALETTE`) and drives the chip color scheme.
   *
   * To opt out of DnD or resize per-event, set `_options.disableDND` /
   * `_options.disableResize` on the event itself.
   */
  events: CalendarEventExternal[];
  /** Color palette map. Keys can be referenced as event `calendarId`. */
  calendars?: Record<string, CalendarType>;

  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  /** Views available in the toolbar's view switcher. Default: all three. */
  views?: CalendarView[];
  /** Controlled current date. Uncontrolled defaults to today. */
  currentDate?: Date;
  onDateChange?: (date: Date) => void;

  /** Fired when a user clicks an event chip. */
  onEventClick?: (event: CalendarEventExternal) => void;
  /**
   * Fired when a user clicks an empty time slot (week / day views) or a
   * date header (month view). The argument is Schedule-X's ISO datetime
   * string (`YYYY-MM-DD HH:mm`). Use this to open a "create event" modal
   * with the slot prefilled.
   */
  onClickDateTime?: (iso: string) => void;
  /**
   * Fired after a user finishes a drag-to-move or drag-to-resize gesture.
   * The event passed has already been updated with the new times.
   * Use this to dispatch a `saveEvent` (or equivalent). Only fires when
   * not `readOnly`.
   */
  onEventUpdate?: (event: CalendarEventExternal) => void;

  /** Disables DnD + resize plugins entirely (also blocks slot-click create
   *  if you respect that on the consumer side). */
  readOnly?: boolean;
  /** Granularity in minutes for DnD/resize. Default 15. */
  minuteStep?: 5 | 10 | 15 | 30 | 60;
  /** Override the calendar's day boundaries. Format: `'HH:mm'`. */
  dayBoundaries?: { start: string; end: string };
  /** First day of week: 0 = Sun, 1 = Mon. Default 0. */
  firstDayOfWeek?: 0 | 1;

  /**
   * Toolbar rendered above the calendar grid:
   * - `undefined` (default): a Taiv-styled toolbar with Today / prev / next /
   *   date label / view switcher.
   * - `null`: no toolbar — use when composing navigation outside the
   *   calendar.
   * - any `ReactNode`: replaces the default toolbar with your own composition.
   *
   * Schedule-X's internal header is always hidden regardless of this prop.
   */
  toolbar?: React.ReactNode | null;
}

// ────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ────────────────────────────────────────────────────────────────────────────

const D_FMT = 'YYYY-MM-DD';

// Schedule-X uses 'month-grid' / 'week' / 'day' internally.
const toSxView = (v: CalendarView): string =>
  v === 'month' ? 'month-grid' : v;
const fromSxView = (n: string): CalendarView | null => {
  if (n === 'day' || n === 'week') return n;
  if (n === 'month-grid') return 'month';
  return null;
};

const viewFactories: Record<
  CalendarView,
  () => ReturnType<typeof createViewDay>
> = {
  day: createViewDay,
  month: createViewMonthGrid,
  week: createViewWeek,
};

// ────────────────────────────────────────────────────────────────────────────
// Taiv theme overlay — frame only
// ────────────────────────────────────────────────────────────────────────────
// Schedule-X ships Material-Design typography and palette. This overlay
// rebrands the *frame* (header chrome, day-of-week labels, date numbers,
// time gutter, today bubble) under `.taiv-calendar`. Event chips intentionally
// fall through to Schedule-X's native rendering driven by `calendarId` — that
// path is robust and avoids the layout pitfalls that custom event renderers
// historically introduced.
const TAIV_CALENDAR_CSS = `
.taiv-calendar {
  /* Brand */
  --sx-color-primary: ${primary[200]};
  --sx-color-on-primary: ${white};
  --sx-color-primary-container: ${primary[25]};
  --sx-color-on-primary-container: ${primary[200]};
  --sx-color-surface-tint: ${primary[200]};

  /* Secondary — neutral, since Taiv has no second brand hue */
  --sx-color-secondary: ${neutral[200]};
  --sx-color-on-secondary: ${white};
  --sx-color-secondary-container: ${neutral[25]};
  --sx-color-on-secondary-container: ${neutral[300]};

  /* Surfaces */
  --sx-color-background: ${white};
  --sx-color-on-background: ${neutral[300]};
  --sx-color-surface: ${white};
  --sx-color-surface-bright: ${white};
  --sx-color-surface-dim: ${neutral[25]};
  --sx-color-on-surface: ${neutral[300]};
  --sx-color-surface-container: ${neutral[25]};
  --sx-color-surface-container-low: ${white};
  --sx-color-surface-container-high: ${neutral[25]};

  /* Borders & outlines */
  --sx-color-outline: ${neutral[100]};
  --sx-color-outline-variant: ${neutral[50]};
  --sx-color-neutral: ${neutral[200]};
  --sx-color-neutral-variant: ${neutral[100]};
  --sx-internal-color-light-gray: ${neutral[25]};
  --sx-internal-color-text: ${neutral[300]};
  --sx-internal-color-gray-ripple-background: ${neutral[50]};

  --sx-border: 1px solid ${neutral[50]};

  /* Typography — sizes aligned to Taiv text variants */
  --sx-font-extra-small: 12px;
  --sx-font-small: 14px;
  --sx-font-large: 16px;
  --sx-font-extra-large: 20px;

  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${neutral[300]};
}

/* Force Poppins on every SX text surface — SX sets font-family per-selector. */
.taiv-calendar,
.taiv-calendar * {
  font-family: 'Poppins', sans-serif !important;
}

/* Day-of-week labels: Taiv 'label' (12 / medium / neutral[200]), sentence case */
.taiv-calendar .sx__week-grid__day-name,
.taiv-calendar .sx__month-grid-day__header-day-name,
.taiv-calendar .sx__month-agenda-day-name,
.taiv-calendar .sx__date-picker__day-name {
  font-size: 12px;
  font-weight: 500;
  color: ${neutral[200]};
  text-transform: none;
  letter-spacing: 0;
}

/* Today's day-of-week label picks up primary */
.taiv-calendar .sx__week-grid__date--is-today .sx__week-grid__day-name {
  color: ${primary[200]};
  font-weight: 600;
}

/* Month-grid day number ("29", "30") — Taiv 'body' size, medium weight */
.taiv-calendar .sx__month-grid-day__header-date {
  font-size: 14px;
  font-weight: 500;
  color: ${neutral[300]};
}

/* Week-view big date number — cardHeader-ish */
.taiv-calendar .sx__week-grid__date-number {
  font-size: 20px;
  font-weight: 500;
  color: ${neutral[300]};
}

/* Today bubble: primary fill, white text */
.taiv-calendar .sx__month-grid-day__header-date.sx__is-today,
.taiv-calendar .sx__week-grid__date--is-today .sx__week-grid__date-number {
  background-color: ${primary[200]};
  color: ${white};
}

/* Time-gutter hour labels — Taiv 'label' */
.taiv-calendar .sx__week-grid__hour,
.taiv-calendar .sx__week-grid__hour-text,
.taiv-calendar .sx__time-grid-hour,
.taiv-calendar .sx__time-grid__hour-text {
  font-size: 12px;
  font-weight: 500;
  color: ${neutral[200]};
  text-transform: none;
  letter-spacing: 0;
}

/* "N more" pill in cramped month cells */
.taiv-calendar .sx__month-grid-day__events-more {
  font-size: 12px;
  font-weight: 500;
  color: ${neutral[200]};
}

/* Floor month-grid week-row height so cells read closer to square. */
.taiv-calendar .sx__month-grid-week {
  min-height: 120px;
}

/* Always hide Schedule-X's internal header — we own the toolbar surface. */
.taiv-calendar .sx__calendar-header {
  display: none !important;
}
`;

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

const Calendar = ({
  events,
  calendars = TAIV_CALENDAR_PALETTE,
  view,
  onViewChange,
  views = ['month', 'week', 'day'],
  currentDate,
  onDateChange,
  onEventClick,
  onClickDateTime,
  onEventUpdate,
  readOnly = false,
  minuteStep = 15,
  toolbar,
  firstDayOfWeek = 0,
  dayBoundaries,
}: CalendarProps) => {
  // Single source of truth for the focused date. Synced both ways with
  // the `currentDate` prop and Schedule-X's internal datePickerState.
  const [internalDate, setInternalDate] = useState<Date>(
    currentDate ?? new Date(),
  );
  useEffect(() => {
    if (currentDate) setInternalDate(currentDate);
  }, [currentDate]);

  const sxViews = useMemo(
    () =>
      views.map((v) => viewFactories[v]()) as [
        ReturnType<typeof createViewDay>,
        ...ReturnType<typeof createViewDay>[],
      ],
    [views],
  );

  const plugins = useMemo(() => {
    const list: PluginBase<string>[] = [
      createEventsServicePlugin() as unknown as PluginBase<string>,
      createCurrentTimePlugin() as unknown as PluginBase<string>,
    ];
    if (!readOnly) {
      list.push(
        createDragAndDropPlugin(minuteStep) as unknown as PluginBase<string>,
      );
      list.push(
        createResizePlugin(minuteStep) as unknown as PluginBase<string>,
      );
    }
    return list;
  }, [readOnly, minuteStep]);

  const calendarApp = useNextCalendarApp(
    {
      calendars,
      callbacks: {
        // DnD + resize merge into one callback. Schedule-X already mutates
        // the event's start/end before this fires, so we just forward.
        onBeforeEventUpdate: (_old, next) => {
          if (readOnly) return false;
          onEventUpdate?.(next as CalendarEventExternal);
          return true;
        },
        onClickDateTime: (iso) => {
          onClickDateTime?.(iso);
        },
        onEventClick: (e) => {
          onEventClick?.(e as CalendarEventExternal);
        },
        onSelectedDateUpdate: (d) => {
          const next = dayjs(d, D_FMT).toDate();
          setInternalDate(next);
          onDateChange?.(next);
        },
      },
      dayBoundaries,
      defaultView: toSxView(view),
      events,
      firstDayOfWeek: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      selectedDate: dayjs(internalDate).format(D_FMT),
      views: sxViews,
    },
    plugins,
  );

  // ── External → Schedule-X sync ──────────────────────────────────────────

  // Re-sync events when the consumer-supplied array identity changes.
  useEffect(() => {
    if (!calendarApp) return;
    calendarApp.events.set(events);
  }, [events, calendarApp]);

  // Push view changes from props down into Schedule-X.
  useEffect(() => {
    if (!calendarApp) return;
    const target = toSxView(view);
    // biome-ignore lint/suspicious/noExplicitAny: $app is private in TS but stable
    const state = (calendarApp as any).$app?.calendarState;
    if (state?.view?.value !== target) {
      state?.setView?.(target, dayjs(internalDate).format(D_FMT));
    }
  }, [view, internalDate, calendarApp]);

  // Push internalDate into SX's selectedDate signal so the toolbar's
  // prev/next/today buttons drive the calendar grid.
  useEffect(() => {
    if (!calendarApp) return;
    const target = dayjs(internalDate).format(D_FMT);
    // biome-ignore lint/suspicious/noExplicitAny: writing into a preact Signal
    const sig = (calendarApp as any).$app?.datePickerState?.selectedDate;
    if (sig && sig.value !== target) sig.value = target;
  }, [internalDate, calendarApp]);

  // ── Schedule-X → External sync ──────────────────────────────────────────

  // Subscribe to view changes Schedule-X drives internally.
  useEffect(() => {
    if (!calendarApp) return;
    // biome-ignore lint/suspicious/noExplicitAny: preact signal has .subscribe
    const signal = (calendarApp as any).$app?.calendarState?.view;
    if (typeof signal?.subscribe !== 'function') return;
    const unsub = signal.subscribe((v: string) => {
      const mapped = fromSxView(v);
      if (mapped && mapped !== view) onViewChange(mapped);
    });
    return typeof unsub === 'function' ? unsub : undefined;
  }, [calendarApp, onViewChange, view]);

  // ── Default toolbar ─────────────────────────────────────────────────────

  const shiftDate = (amount: number) => {
    const unit = view === 'day' ? 'day' : view === 'week' ? 'week' : 'month';
    const next = dayjs(internalDate).add(amount, unit).toDate();
    setInternalDate(next);
    onDateChange?.(next);
  };
  const goToday = () => {
    const next = new Date();
    setInternalDate(next);
    onDateChange?.(next);
  };
  const dateLabel = useMemo(
    () =>
      dayjs(internalDate).format(view === 'day' ? 'MMMM D, YYYY' : 'MMMM YYYY'),
    [internalDate, view],
  );

  const defaultToolbar = (
    <Group
      position='apart'
      style={{
        borderBottom: `1px solid ${neutral[50]}`,
        padding: spacing.sm,
      }}
    >
      <Group spacing={spacing.xs}>
        <Button onClick={goToday} size='sm' variant='secondary'>
          Today
        </Button>
        <IconButton onClick={() => shiftDate(-1)} size='sm' variant='secondary'>
          <IconChevronLeft />
        </IconButton>
        <IconButton onClick={() => shiftDate(1)} size='sm' variant='secondary'>
          <IconChevronRight />
        </IconButton>
        <Title variant='cardHeader'>{dateLabel}</Title>
      </Group>
      {views.length > 1 && (
        <SegmentedControl
          data={views.map((v) => ({
            label: v.charAt(0).toUpperCase() + v.slice(1),
            value: v,
          }))}
          onChange={(v) => onViewChange(v as CalendarView)}
          size='sm'
          value={view}
        />
      )}
    </Group>
  );

  const resolvedToolbar =
    toolbar === null ? null : toolbar === undefined ? defaultToolbar : toolbar;

  return (
    <div className='taiv-calendar'>
      <style>{TAIV_CALENDAR_CSS}</style>
      {resolvedToolbar}
      <ScheduleXCalendar calendarApp={calendarApp} />
    </div>
  );
};

export { Calendar };
