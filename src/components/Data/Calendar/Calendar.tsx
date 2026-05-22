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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
   * Fired on a single click of an empty time slot (week / day views).
   * Argument is Schedule-X's ISO datetime string (`YYYY-MM-DD HH:mm`).
   * Use this to open a "create event" modal with the slot prefilled.
   * Suppressed automatically when the click was part of a completed drag —
   * in that case `onSlotRange` fires instead.
   */
  onClickDateTime?: (iso: string) => void;
  /**
   * Fired on a single click of a month-grid day header. Argument is the
   * date in `YYYY-MM-DD` format. Mirrors `onClickDateTime` for the
   * month view (Schedule-X's time-grid click handler never fires there).
   * Suppressed when the click was part of a completed drag.
   */
  onClickDate?: (iso: string) => void;
  /**
   * Fired after a drag-to-create gesture in an empty area completes.
   * `kind: 'time'` means the drag was on the week/day time grid — the
   * ISO strings carry `YYYY-MM-DD HH:mm`. `kind: 'date'` means the
   * drag was across month cells — the ISO strings are `YYYY-MM-DD`.
   *
   * The consumer is responsible for actually creating the event (this
   * callback only signals intent — typically by opening an editor modal
   * with the range pre-filled). Drag must exceed an internal threshold
   * before this fires; smaller gestures fall through to the click
   * callbacks above so they remain interchangeable for the user.
   */
  onSlotRange?: (
    startISO: string,
    endISO: string,
    kind: 'time' | 'date',
  ) => void;
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

/* Drag-to-create overlay. Painted as an absolutely-positioned ghost over the
   grid while the user drags an empty slot. Pointer-events: none so the gesture
   keeps reading through to Schedule-X's cells (we need to keep resolving
   data-time-grid-date / data-date during the drag). */
.taiv-calendar .taiv-cal-drag-ghost {
  background: ${primary[25]};
  border: 1px dashed ${primary[200]};
  border-radius: 6px;
  pointer-events: none;
  position: fixed;
  z-index: 5;
}
`;

// ────────────────────────────────────────────────────────────────────────────
// Drag-to-create helpers
// ────────────────────────────────────────────────────────────────────────────

// Movement past this distance in pixels turns a click into a drag. Anything
// shorter falls through to `onClickDateTime` / `onClickDate` so a click and
// a drag stay UX-interchangeable for the same gesture.
const DRAG_THRESHOLD_PX = 6;

// Parse `'HH:mm'` to minutes since midnight. Used to translate the
// `dayBoundaries` prop into the pixel-to-minute math for time-grid drags.
const minutesOfHHmm = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map((n) => Number(n) || 0);
  return h * 60 + m;
};

// Format a YYYY-MM-DD date + minutes-since-midnight into Schedule-X's
// `YYYY-MM-DD HH:mm` datetime string, snapped to `step` minutes.
const formatDateTime = (date: string, minutes: number, step: number): string => {
  const snapped = Math.max(0, Math.round(minutes / step) * step);
  const clamped = Math.min(snapped, 23 * 60 + 59);
  const hh = String(Math.floor(clamped / 60)).padStart(2, '0');
  const mm = String(clamped % 60).padStart(2, '0');
  return `${date} ${hh}:${mm}`;
};

// Snap a `YYYY-MM-DD HH:mm` ISO (Schedule-X format) to `step` minutes.
// Date-only ISOs (`YYYY-MM-DD` from `onClickDate`) pass through untouched
// — there's no time component to round. Used to align the click ISO and
// the drag-start ISO that Schedule-X hands us to the same grid as our own
// drag-end math, so a single-click create + a drag both produce
// minuteStep-aligned times in the editor.
const snapISO = (iso: string, step: number): string => {
  const space = iso.indexOf(' ');
  if (space < 0) return iso;
  const date = iso.slice(0, space);
  const time = iso.slice(space + 1);
  const [hStr, mStr] = time.split(':');
  const minutes = (Number(hStr) || 0) * 60 + (Number(mStr) || 0);
  return formatDateTime(date, minutes, step);
};

// Fraction (0..1) of where `x` sits inside `rect` along the horizontal axis.
// Used by the "mostly covered" snap to decide whether the user's pointer was
// on the include-this-day side of a cell boundary (left half) or the
// skip-this-day side (right half). Returns 0.5 for missing rects so the
// caller's threshold logic stays well-defined.
const xPctInCell = (rect: DOMRect | undefined, x: number): number => {
  if (!rect || rect.width === 0) return 0.5;
  return Math.max(0, Math.min(1, (x - rect.left) / rect.width));
};

// Add/subtract whole days from a `YYYY-MM-DD` date string. Used to walk one
// day forward (snap start past a barely-touched left day) or backward (snap
// end past a barely-touched right day).
const addDaysToDateISO = (dateStr: string, delta: number): string =>
  dayjs(dateStr, 'YYYY-MM-DD').add(delta, 'day').format('YYYY-MM-DD');

// Resolve a pointer event to a `YYYY-MM-DD HH:mm` datetime by reading the
// `.sx__time-grid-day` cell under the cursor and using the same Y-percent
// math Schedule-X uses internally for click → time. Returns null when the
// cursor is outside the time-grid (e.g. dragged into the all-day row or
// header).
const dateTimeFromPointer = (
  e: PointerEvent | MouseEvent,
  dayStart: number,
  dayEnd: number,
  minuteStep: number,
): string | null => {
  const node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
  const cell = node?.closest('.sx__time-grid-day') as HTMLElement | null;
  if (!cell) return null;
  const date = cell.getAttribute('data-time-grid-date');
  if (!date) return null;
  const rect = cell.getBoundingClientRect();
  const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
  const pct = rect.height === 0 ? 0 : y / rect.height;
  const minutesIntoDay = dayStart + pct * (dayEnd - dayStart);
  return formatDateTime(date, minutesIntoDay, minuteStep);
};

// Resolve a pointer event to a `YYYY-MM-DD` date by reading the
// `[data-date]` attribute Schedule-X stamps on month-grid day cells.
const dateFromPointer = (e: PointerEvent | MouseEvent): string | null => {
  const node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
  const cell = node?.closest('[data-date]') as HTMLElement | null;
  return cell?.getAttribute('data-date') ?? null;
};

// State the drag machinery carries between mousedown and pointerup. Kept in
// a ref (not state) because per-frame pointermove updates would re-render the
// whole calendar for no visual reason — the ghost overlay is the only thing
// that needs to re-render and that lives in its own useState.
type DragKind = 'time' | 'date';
type DragRecord = {
  kind: DragKind;
  // Schedule-X's ISO at the point of mousedown — `YYYY-MM-DD HH:mm` for time,
  // `YYYY-MM-DD` for date. We treat this as authoritative for the "start" of
  // the eventual range so consumers get the snap-aligned value Schedule-X
  // chose, not whatever our re-derivation comes up with.
  startISO: string;
  startX: number;
  startY: number;
  // Bounding rect of the day cell the mousedown landed on. Used at pointerup
  // to compute `xPctInCell` for the "mostly covered" snap. The cell's layout
  // doesn't shift while the user drags, so a snapshot at mousedown stays
  // valid even if `elementFromPoint` later returns a different node.
  startCellRect?: DOMRect;
  // Flipped to true once movement exceeds `DRAG_THRESHOLD_PX`. Anything below
  // that stays a click.
  isDragging: boolean;
};

// CSS selectors for the cell types Schedule-X renders day-column data on.
// Time-grid cells expose the date via `data-time-grid-date`; month-grid
// cells via `data-date`. The horizontal snap math uses these to find the
// cell under a given pointer position (start at mousedown, end at pointerup).
const CELL_SELECTOR: Record<DragKind, string> = {
  time: '.sx__time-grid-day',
  date: '[data-date]',
};

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
  onClickDate,
  onSlotRange,
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

  // ── Drag-to-create plumbing ──────────────────────────────────────────────
  // `dragRef` holds the in-flight gesture. Lives in a ref so per-frame
  // pointermove updates don't re-render the whole calendar — only the ghost
  // overlay (driven by `ghost` useState below) does.
  const dragRef = useRef<DragRecord | null>(null);
  // After a drag, Schedule-X fires a `click` event because the pointerdown
  // and pointerup landed on the same element. We suppress one such click
  // so the consumer doesn't get both `onSlotRange` and a stale
  // `onClickDateTime` / `onClickDate` for the same gesture.
  const suppressNextClickRef = useRef(false);
  // Ghost overlay position. `null` while idle. `kind` carries through so the
  // overlay can theme itself differently per drag type later if we want.
  const [ghost, setGhost] = useState<{
    kind: DragKind;
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Day-boundary minute window. Used by the time-grid pointer→datetime math.
  const dayStartMin = useMemo(
    () => minutesOfHHmm(dayBoundaries?.start ?? '00:00'),
    [dayBoundaries?.start],
  );
  const dayEndMin = useMemo(() => {
    // Schedule-X accepts `'24:00'` to mean end-of-day; treat it as 1440.
    const raw = dayBoundaries?.end ?? '24:00';
    return raw === '24:00' ? 1440 : minutesOfHHmm(raw);
  }, [dayBoundaries?.end]);

  // Update the ghost overlay bounding box to bridge from the gesture's start
  // pointer position to its current pointer position. Stored in viewport
  // coordinates (the overlay is `position: fixed`).
  const updateGhost = useCallback(
    (e: PointerEvent | MouseEvent, kind: DragKind, startX: number, startY: number) => {
      const left = Math.min(startX, e.clientX);
      const top = Math.min(startY, e.clientY);
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);
      setGhost({ kind, left, top, width, height });
    },
    [],
  );

  // Pointermove during a drag. Promotes the gesture from "click" to "drag"
  // once movement exceeds threshold, then updates the ghost on every frame.
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (!drag.isDragging && Math.hypot(dx, dy) >= DRAG_THRESHOLD_PX) {
        drag.isDragging = true;
      }
      if (drag.isDragging) {
        updateGhost(e, drag.kind, drag.startX, drag.startY);
      }
    },
    [updateGhost],
  );

  // Pointerup ends the gesture. If the drag never crossed threshold, we let
  // Schedule-X's click handlers run as-is. If it did, we compute the end ISO
  // from the cell under the cursor, apply the half-column "mostly covered"
  // snap on the horizontal axis, fire `onSlotRange`, and suppress the
  // imminent click event.
  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current;
      dragRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      setGhost(null);
      if (!drag) return;
      if (!drag.isDragging) return; // tap → onClick* fires normally

      let endISO: string | null = null;
      if (drag.kind === 'time') {
        endISO = dateTimeFromPointer(e, dayStartMin, dayEndMin, minuteStep);
      } else {
        endISO = dateFromPointer(e);
      }
      if (!endISO) return;

      // Normalize: callbacks should always receive start <= end. Easier for
      // consumers than checking which way the user dragged.
      let [startISO, finalEndISO] =
        endISO < drag.startISO
          ? [endISO, drag.startISO]
          : [drag.startISO, endISO];

      // ── Horizontal "mostly covered" day snap ──────────────────────────
      // Round each side of the range to the nearest day boundary so a drag
      // that barely touches a day on its way in/out doesn't drag that day
      // into the range. Skipped when start and end are in the same day
      // cell — there a horizontal snap would always turn a one-day drag
      // into the wrong shape. Skipped if the snap would invert the range
      // (e.g. tiny gesture across one boundary with both sides in the
      // "exclude" half).
      const startDatePart = startISO.split(' ')[0];
      const endDatePart = finalEndISO.split(' ')[0];
      if (startDatePart !== endDatePart) {
        // Identify which pointer (mousedown vs pointerup) became the LEFT
        // (earlier) side after normalization. The unflipped case is the
        // common one; we only swap when the user dragged right-to-left.
        const mousedownIsLeft = startISO === drag.startISO;
        const leftRect = mousedownIsLeft ? drag.startCellRect : undefined;
        const leftX = mousedownIsLeft ? drag.startX : e.clientX;
        const rightRect = mousedownIsLeft ? undefined : drag.startCellRect;
        const rightX = mousedownIsLeft ? e.clientX : drag.startX;
        // If we lost a rect (e.g. mousedown target wasn't inside a known
        // cell, or pointerup landed outside the grid), look it up via
        // `elementFromPoint` at the relevant pointer position.
        const resolveRect = (
          rect: DOMRect | undefined,
          x: number,
          y: number,
        ): DOMRect | undefined => {
          if (rect) return rect;
          const cell = (
            document.elementFromPoint(x, y) as HTMLElement | null
          )?.closest(CELL_SELECTOR[drag.kind]) as HTMLElement | null;
          return cell?.getBoundingClientRect();
        };
        const resolvedLeftRect = resolveRect(
          leftRect,
          leftX,
          mousedownIsLeft ? drag.startY : e.clientY,
        );
        const resolvedRightRect = resolveRect(
          rightRect,
          rightX,
          mousedownIsLeft ? e.clientY : drag.startY,
        );
        const leftXPct = xPctInCell(resolvedLeftRect, leftX);
        const rightXPct = xPctInCell(resolvedRightRect, rightX);

        let snappedLeftDate = startDatePart;
        let snappedRightDate = endDatePart;
        // Left side: pointer in right half → user mostly skipped this day
        //            → bump start forward one day.
        if (leftXPct >= 0.5) {
          snappedLeftDate = addDaysToDateISO(startDatePart, 1);
        }
        // Right side: pointer in left half → user barely entered this day
        //             → bump end back one day.
        if (rightXPct < 0.5) {
          snappedRightDate = addDaysToDateISO(endDatePart, -1);
        }

        // If both snaps pulled the range past itself, fall back to the
        // raw dates — the original swept range is what the user touched.
        if (snappedLeftDate > snappedRightDate) {
          snappedLeftDate = startDatePart;
          snappedRightDate = endDatePart;
        }

        // Stitch snapped dates back to their time-of-day component (the
        // snap is date-axis-only — time stayed wherever the pointer was).
        if (drag.kind === 'time') {
          const startTimePart = startISO.slice(11); // 'HH:mm'
          const endTimePart = finalEndISO.slice(11);
          startISO = `${snappedLeftDate} ${startTimePart}`;
          finalEndISO = `${snappedRightDate} ${endTimePart}`;
        } else {
          startISO = snappedLeftDate;
          finalEndISO = snappedRightDate;
        }
      }

      suppressNextClickRef.current = true;
      onSlotRange?.(startISO, finalEndISO, drag.kind);
    },
    [handlePointerMove, dayStartMin, dayEndMin, minuteStep, onSlotRange],
  );

  // Schedule-X's mousedown callbacks are our drag-start signal. They fire
  // with the precise snap-aligned ISO Schedule-X derives from the click Y
  // position (time-grid) or the cell `data-date` (month-grid), so we can
  // trust whatever they hand us as the canonical start of the range.
  const handleMouseDownDateTime = useCallback(
    (iso: string, e: MouseEvent) => {
      if (readOnly) return;
      // Snapshot the start cell's rect so we can compute the pointer's
      // horizontal position within it at pointerup — used by the half-column
      // "mostly covered" snap.
      const startCell = (e.target as HTMLElement | null)?.closest(
        CELL_SELECTOR.time,
      ) as HTMLElement | null;
      dragRef.current = {
        kind: 'time',
        // Schedule-X's mousedown ISO is at 1-minute resolution — snap to
        // `minuteStep` so a drag's start aligns to the same grid as its
        // end (which `formatDateTime` already snaps in `dateTimeFromPointer`).
        startISO: snapISO(iso, minuteStep),
        startX: e.clientX,
        startY: e.clientY,
        startCellRect: startCell?.getBoundingClientRect(),
        isDragging: false,
      };
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [readOnly, minuteStep, handlePointerMove, handlePointerUp],
  );

  const handleMouseDownMonthGridDate = useCallback(
    (iso: string, e: MouseEvent) => {
      if (readOnly) return;
      const startCell = (e.target as HTMLElement | null)?.closest(
        CELL_SELECTOR.date,
      ) as HTMLElement | null;
      dragRef.current = {
        kind: 'date',
        startISO: iso,
        startX: e.clientX,
        startY: e.clientY,
        startCellRect: startCell?.getBoundingClientRect(),
        isDragging: false,
      };
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [readOnly, handlePointerMove, handlePointerUp],
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
          // Suppress when the click trails a real drag — `onSlotRange`
          // already fired with the dragged range, we don't want a stale
          // single-slot create on top of it.
          if (suppressNextClickRef.current) {
            suppressNextClickRef.current = false;
            return;
          }
          // Snap to `minuteStep` so single-click creates align to the same
          // grid as drag-creates. Schedule-X gives us the click time at
          // 1-minute resolution.
          onClickDateTime?.(snapISO(iso, minuteStep));
        },
        onClickDate: (iso) => {
          if (suppressNextClickRef.current) {
            suppressNextClickRef.current = false;
            return;
          }
          onClickDate?.(iso);
        },
        onMouseDownDateTime: handleMouseDownDateTime,
        onMouseDownMonthGridDate: handleMouseDownMonthGridDate,
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
      {ghost && (
        <div
          aria-hidden
          className='taiv-cal-drag-ghost'
          style={{
            left: ghost.left,
            top: ghost.top,
            width: ghost.width,
            height: ghost.height,
          }}
        />
      )}
    </div>
  );
};

export { Calendar };
