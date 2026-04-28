import {
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
import { useEffect, useMemo, useRef, useState } from 'react';
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

/**
 * Palette map driving default event chip colors. Each entry exposes the `[50]`
 * / `[200]` shades the default chip reads (tinted background + readable
 * foreground). Consuming projects can map their event types onto these keys
 * to category-code events without writing a custom `renderEvent`.
 */
const EVENT_COLOR_PALETTE = {
  error,
  neutral,
  primary,
  purple,
  salmon,
  success,
  warning,
} as const;

export type CalendarEventColor = keyof typeof EVENT_COLOR_PALETTE;

/**
 * Schedule-X's native color system — each event references a `calendarId` that
 * maps to a `CalendarType` with `lightColors: { main, container, onContainer }`.
 * SX drives the actual event chrome (background, border accent, text, icon
 * stroke) off CSS variables derived from those colors. We generate one SX
 * calendar per Taiv color so consumers can say `event.color = 'success'` and
 * get the idiomatic SX rendering path with Taiv tokens painted in.
 */
type TaivSxCalendar = {
  colorName: CalendarEventColor;
  lightColors: { main: string; container: string; onContainer: string };
};

const taivSxCalendars: Record<CalendarEventColor, TaivSxCalendar> = (
  Object.keys(EVENT_COLOR_PALETTE) as CalendarEventColor[]
).reduce(
  (acc, name) => {
    const palette = EVENT_COLOR_PALETTE[name] as Record<number, string>;
    // `main` drives the 4px left-border accent. `container` is the filled
    // background. `onContainer` is the text color painted on top — we use
    // the darkest shade that exists for the palette (purple/salmon max out
    // at [200]; the semantic tokens go to [300]).
    acc[name] = {
      colorName: name,
      lightColors: {
        container: palette[50],
        main: palette[200],
        onContainer: palette[300] ?? palette[200],
      },
    };
    return acc;
  },
  {} as Record<CalendarEventColor, TaivSxCalendar>,
);

const DEFAULT_EVENT_COLOR: CalendarEventColor = 'primary';

export interface CalendarEvent<TData = unknown> {
  id: string;
  title: string;
  start: Date;
  end: Date;
  /**
   * Color scheme for the event chip. Maps to a Schedule-X calendar with
   * Taiv-derived `{ main, container, onContainer }` colors. Defaults to
   * `'primary'`.
   */
  color?: CalendarEventColor;
  /** Free-form app data. Available inside `renderEvent`. */
  data?: TData;
  /**
   * When true, Schedule-X renders the event in the all-day row (week/day
   * views) or as a date-spanning bar (month view) using date-only format
   * internally. When false/omitted, the event is placed in the time grid.
   */
  allDay?: boolean;
}

export type CalendarView = 'month' | 'week' | 'day';

/**
 * Shaded time range — used for business-hours highlighting and similar slot
 * styling. Schedule-X renders these behind normal events.
 */
export interface CalendarBackgroundEvent {
  start: Date;
  end: Date;
  title?: string;
  style?: Partial<CSSStyleDeclaration>;
}

export interface CalendarProps<TData = unknown> {
  events: CalendarEvent<TData>[];
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  /** Views available in Schedule-X's built-in header. Default: all three. */
  views?: CalendarView[];
  /** Controlled current date. Uncontrolled defaults to today. */
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
  /** Custom event card. Receives the event + which view it's being rendered in. */
  renderEvent?: (
    event: CalendarEvent<TData>,
    view: CalendarView,
  ) => React.ReactNode;
  /**
   * Shaded time ranges for business hours, closed periods, etc. Schedule-X
   * draws these behind normal events. For per-slot styling, generate ranges
   * for each day in your visible window.
   */
  backgroundEvents?: CalendarBackgroundEvent[];
  onEventSelect?: (event: CalendarEvent<TData>) => void;
  onSlotSelect?: (slot: { start: Date; end: Date }) => void;
  /** Fires on drag-drop when the event's start time changes. */
  onEventDrop?: (
    newEvent: CalendarEvent<TData>,
    oldEvent: CalendarEvent<TData>,
  ) => void;
  /** Fires on resize when only the end time changes. */
  onEventResize?: (
    newEvent: CalendarEvent<TData>,
    oldEvent: CalendarEvent<TData>,
  ) => void;
  /** Disables DnD, resize, and event updates. */
  readOnly?: boolean;
  /** Granularity in minutes for DnD/resize. Default 15. */
  minuteStep?: 5 | 10 | 15 | 30 | 60;
  /**
   * Controls the toolbar rendered above the calendar grid:
   * - `undefined` (default): a Taiv-styled toolbar with Today / prev / next /
   *   date label / view switcher.
   * - `null`: no toolbar at all — use when composing navigation outside the
   *   calendar and you don't want a duplicate bar.
   * - any `ReactNode`: replaces the default toolbar with your own composition.
   *
   * Schedule-X's internal header is always hidden regardless of this prop.
   */
  toolbar?: React.ReactNode | null;
  /** First day of week: 0 = Sun, 1 = Mon. Default 0. */
  firstDayOfWeek?: 0 | 1;
  /** Override the Schedule-X default day boundaries. Format: 'HH:mm'. */
  dayBoundaries?: { start: string; end: string };
}

// ────────────────────────────────────────────────────────────────────────────
// Internal mappers
// ────────────────────────────────────────────────────────────────────────────

const DT_FMT = 'YYYY-MM-DD HH:mm';
const D_FMT = 'YYYY-MM-DD';

type SxEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  /** Native SX color-link. Maps to one of `taivSxCalendars`. */
  calendarId?: CalendarEventColor;
  /** Free-form consumer data — opaque to SX. */
  _taivData?: unknown;
};

const toSxEvent = <T,>(e: CalendarEvent<T>): SxEvent => ({
  _taivData: e.data,
  calendarId: e.color ?? DEFAULT_EVENT_COLOR,
  end: e.allDay ? dayjs(e.end).format(D_FMT) : dayjs(e.end).format(DT_FMT),
  id: e.id,
  start: e.allDay ? dayjs(e.start).format(D_FMT) : dayjs(e.start).format(DT_FMT),
  title: e.title,
});

const fromSxEvent = <T,>(
  e: SxEvent,
  fallback?: CalendarEvent<T>,
): CalendarEvent<T> => {
  const isAllDay = !e.start.includes(' ');
  return {
    allDay: isAllDay,
    color: (e.calendarId as CalendarEventColor | undefined) ?? fallback?.color,
    data: (e._taivData as T | undefined) ?? fallback?.data,
    end: isAllDay ? dayjs(e.end, D_FMT).toDate() : dayjs(e.end, DT_FMT).toDate(),
    id: String(e.id),
    start: isAllDay ? dayjs(e.start, D_FMT).toDate() : dayjs(e.start, DT_FMT).toDate(),
    title: e.title ?? '',
  };
};

// Schedule-X's internal view names
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
// Taiv theme overlay
// ────────────────────────────────────────────────────────────────────────────
// Schedule-X ships Material-Design styling: Roboto-ish typography, uppercased
// day/time labels, and a full CSS-variable palette on `:root`. This overlay
// rebrands all of it under `.taiv-calendar`:
//   1. Re-scopes every `--sx-color-*` and `--sx-font-*` variable to Taiv tokens.
//   2. Forces Poppins + Taiv type sizes/weights/colors on each grid text
//      surface SX renders (day labels, day numbers, time gutter, event chips)
//      — SX's per-selector `font-*` rules would otherwise override the
//      cascade from the root `font-family`.
//   3. Strips uppercase and wide letter-spacing — Taiv uses sentence case.
//   4. Hides SX's own header (.sx__calendar-header) — Calendar renders its own
//      Taiv-styled toolbar.
// Sizes/weights below mirror the Taiv `label` (12/500), `body` (14/500),
// `cardHeader` (16/600), and `sectionHeader` (20) variants from
// `constants/font.ts`.
const TAIV_CALENDAR_CSS = `
.taiv-calendar {
  /* Brand */
  --sx-color-primary: ${primary[200]};
  --sx-color-on-primary: ${white};
  --sx-color-primary-container: ${primary[25]};
  --sx-color-on-primary-container: ${primary[300]};
  --sx-color-surface-tint: ${primary[200]};

  /* Secondary — mapped to neutral since Taiv doesn't expose a second brand hue */
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

  /* Typography — sizes aligned to Taiv text variants (label 12 / body 14 / cardHeader 16 / sectionHeader 20) */
  --sx-font-extra-small: 12px;
  --sx-font-small: 14px;
  --sx-font-large: 16px;
  --sx-font-extra-large: 20px;

  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${neutral[300]};
}

/* Force Poppins onto every SX text surface — SX sets font-family per-selector,
   so a root-level declaration alone doesn't cover nested elements. */
.taiv-calendar,
.taiv-calendar * {
  font-family: 'Poppins', sans-serif !important;
}

/* Day-of-week labels: Taiv 'label' (12px, medium, neutral[200]), sentence case */
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

/* Week-view big date number — cardHeader-ish, medium weight */
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

/* Event chips across all views */
.taiv-calendar .sx__month-grid-event,
.taiv-calendar .sx__date-grid-event,
.taiv-calendar .sx__time-grid-event,
.taiv-calendar .sx__month-agenda-event {
  font-size: 12px;
  font-weight: 500;
}

.taiv-calendar .sx__time-grid-event-title,
.taiv-calendar .sx__date-grid-event-text,
.taiv-calendar .sx__month-agenda-event__title {
  font-size: 12px;
  font-weight: 600;
}

/* "N more" pill in cramped month cells */
.taiv-calendar .sx__month-grid-day__events-more {
  font-size: 12px;
  font-weight: 500;
  color: ${neutral[200]};
}

/* Month cells in SX use flex:1 with no min-height, so on wide containers
   cells collapse into wide short rectangles. Floor each week row so cells
   read closer to square while still growing to fill extra vertical space. */
.taiv-calendar .sx__month-grid-week {
  min-height: 120px;
}

/* Always hide Schedule-X's internal header — Calendar renders its own toolbar */
.taiv-calendar .sx__calendar-header {
  display: none !important;
}
`;

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

const Calendar = <TData,>({
  events,
  view,
  onViewChange,
  views = ['month', 'week', 'day'],
  currentDate,
  onDateChange,
  renderEvent,
  backgroundEvents,
  onEventSelect,
  onSlotSelect,
  onEventDrop,
  onEventResize,
  readOnly = false,
  minuteStep = 15,
  toolbar,
  firstDayOfWeek = 0,
  dayBoundaries,
}: CalendarProps<TData>) => {
  // Keep a live map of original events so renderEvent / callbacks can return
  // the untouched `data` payload without stringify round-tripping.
  const originalsRef = useRef<Map<string, CalendarEvent<TData>>>(new Map());
  useEffect(() => {
    originalsRef.current = new Map(events.map((e) => [e.id, e]));
  }, [events]);

  // Single source of truth for the "currently focused" date. Seeded from
  // `currentDate`, synced both ways — mirrors the prop when controlled and
  // drives SX + the built-in toolbar regardless.
  const [internalDate, setInternalDate] = useState<Date>(
    currentDate ?? new Date(),
  );
  useEffect(() => {
    if (currentDate) setInternalDate(currentDate);
  }, [currentDate]);

  const sxEvents = useMemo(() => events.map(toSxEvent), [events]);

  const sxBackgroundEvents = useMemo(
    () =>
      backgroundEvents?.map((b, i) => ({
        _id: `__bg_${i}`,
        end: dayjs(b.end).format(DT_FMT),
        start: dayjs(b.start).format(DT_FMT),
        style: b.style as Partial<CSSStyleDeclaration>,
        title: b.title,
      })),
    [backgroundEvents],
  );

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
      // biome-ignore lint/suspicious/noExplicitAny: Schedule-X background-event type uses CSSStyleDeclaration
      backgroundEvents: sxBackgroundEvents as any,
      // Taiv color palette → SX native `calendars` map. Events reference these
      // via `calendarId` (set in `toSxEvent` from `event.color`), and SX paints
      // container / border / text off `lightColors`.
      calendars: taivSxCalendars,
      callbacks: {
        onBeforeEventUpdate: (oldE, newE) => {
          if (readOnly) return false;
          const orig = originalsRef.current.get(String(oldE.id));
          const mappedOld = orig ?? fromSxEvent(oldE as SxEvent);
          const mappedNew = fromSxEvent(newE as SxEvent, orig);
          // Heuristic: DnD moves start; resize holds start and shifts end.
          const startMoved = +mappedOld.start !== +mappedNew.start;
          if (startMoved) onEventDrop?.(mappedNew, mappedOld);
          else onEventResize?.(mappedNew, mappedOld);
          return true;
        },
        onClickDateTime: (dt) => {
          if (!onSlotSelect) return;
          const start = dayjs(dt, DT_FMT).toDate();
          const end = dayjs(dt, DT_FMT).add(minuteStep, 'minute').toDate();
          onSlotSelect({ end, start });
        },
        onEventClick: (e) => {
          const orig = originalsRef.current.get(String(e.id));
          onEventSelect?.(fromSxEvent(e as SxEvent, orig));
        },
        onSelectedDateUpdate: (d) => {
          const next = dayjs(d, D_FMT).toDate();
          setInternalDate(next);
          onDateChange?.(next);
        },
      },
      dayBoundaries,
      defaultView: toSxView(view),
      events: sxEvents,
      firstDayOfWeek: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      selectedDate: dayjs(internalDate).format(D_FMT),
      views: sxViews,
    },
    plugins,
  );

  // ── External → Schedule-X sync ────────────────────────────────────────────

  // Events: re-sync when the incoming events array identity changes.
  useEffect(() => {
    if (!calendarApp) return;
    calendarApp.events.set(sxEvents);
  }, [sxEvents, calendarApp]);

  // View: push external view changes down. Uses internalDate so the view
  // switch lands on the toolbar's currently-focused day.
  useEffect(() => {
    if (!calendarApp) return;
    const target = toSxView(view);
    // biome-ignore lint/suspicious/noExplicitAny: $app is private in TS but stable at runtime
    const state = (calendarApp as any).$app?.calendarState;
    if (state?.view?.value !== target) {
      state?.setView?.(target, dayjs(internalDate).format(D_FMT));
    }
  }, [view, internalDate, calendarApp]);

  // Date: push internalDate into SX's selectedDate signal so prev/next/today
  // from the built-in toolbar (and `currentDate` prop changes) both drive SX.
  useEffect(() => {
    if (!calendarApp) return;
    const target = dayjs(internalDate).format(D_FMT);
    // biome-ignore lint/suspicious/noExplicitAny: writing into a preact Signal
    const selectedDateSignal = (calendarApp as any).$app?.datePickerState
      ?.selectedDate;
    if (selectedDateSignal && selectedDateSignal.value !== target) {
      selectedDateSignal.value = target;
    }
  }, [internalDate, calendarApp]);

  // ── Schedule-X → External sync ────────────────────────────────────────────

  // Subscribe to view changes Schedule-X drives (e.g. via its default toolbar).
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

  // ── Default toolbar helpers ───────────────────────────────────────────────

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

  // ── Custom event rendering ────────────────────────────────────────────────
  // Only register `customComponents` when the consumer provides `renderEvent`.
  // Schedule-X's native chip rendering already honors `calendarId` → Taiv
  // palette colors via `taivSxCalendars`, and forcing a custom component for
  // every event type (even a passthrough) breaks SX's internal layout paths.

  const customComponents = useMemo(() => {
    if (!renderEvent) return undefined;
    const make = (v: CalendarView) => {
      const Comp = ({ calendarEvent }: { calendarEvent: SxEvent }) => {
        const orig = originalsRef.current.get(String(calendarEvent.id));
        const mapped = orig ?? fromSxEvent<TData>(calendarEvent);
        return <>{renderEvent(mapped, v)}</>;
      };
      Comp.displayName = `TaivCalendarEvent(${v})`;
      return Comp;
    };
    return {
      dateGridEvent: make(view === 'day' ? 'day' : 'week'),
      monthAgendaEvent: make('month'),
      monthGridEvent: make('month'),
      timeGridEvent: make(view === 'day' ? 'day' : 'week'),
    };
  }, [renderEvent, view]);

  // ── Render ────────────────────────────────────────────────────────────────

  // Schedule-X's internal header is always hidden — we own the toolbar
  // surface. Consumers opt in to the default Taiv toolbar, compose their own,
  // or pass `toolbar={null}` to render nothing.
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
      <ScheduleXCalendar
        calendarApp={calendarApp}
        customComponents={customComponents}
      />
    </div>
  );
};

export { Calendar };
