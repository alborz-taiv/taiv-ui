import {
  Calendar as RBCCalendar,
  type CalendarProps,
  type Event as RBCEvent,
  type stringOrDate,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { neutral } from '../../../constants/colors';
import { fontBase, fontStyle } from '../../../constants/font';

// Re-exports so consumers can import everything react-big-calendar offers from
// `@taiv/ui` instead of the raw library — keeps the dependency graph contained
// and makes downstream code agnostic to which calendar engine we're using.
export { dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
export { default as withDragAndDrop } from 'react-big-calendar/lib/addons/dragAndDrop';
export type { CalendarProps, Event, SlotInfo, View } from 'react-big-calendar';

// `EventInteractionArgs` is the shape `onEventDrop` / `onEventResize` callbacks
// receive. The DnD addon defines it inline rather than as a named export, so we
// surface it here for consumers that want a name for the parameter type.
export type EventInteractionArgs<TEvent extends object = RBCEvent> = {
  event: TEvent;
  start: stringOrDate;
  end: stringOrDate;
  isAllDay: boolean;
};

// Convert a font token object (`{ fontSize, lineHeight, fontWeight, color }`)
// into a kebab-cased CSS declaration block, so we can drop the same tokens used
// by Text/Title into a `<style>` tag without hand-mirroring values.
const stringifyFontStyle = (style: Record<string, string | number>): string =>
  Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v};`)
    .join(' ');

// All overrides are scoped to `.taiv-bigcalendar` so they don't leak into other
// `.rbc-*` calendars on the page (e.g. the legacy CustomCalendar still rendering
// raw react-big-calendar). Font-family carries `!important` because RBC's
// inline `<style>` tag in its bundled CSS specifies the font on `.rbc-calendar`
// directly with the same specificity.
const TAIV_BIG_CALENDAR_CSS = `
  .taiv-bigcalendar,
  .taiv-bigcalendar .rbc-calendar,
  .taiv-bigcalendar .rbc-calendar * {
    font-family: ${fontBase.fontFamily} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .taiv-bigcalendar .rbc-toolbar { ${stringifyFontStyle(fontStyle.body)} }
  .taiv-bigcalendar .rbc-toolbar-label { ${stringifyFontStyle(fontStyle.cardHeader)} }
  .taiv-bigcalendar .rbc-header { ${stringifyFontStyle(fontStyle.label)} font-weight: 600; color: ${neutral[300]}; }
  .taiv-bigcalendar .rbc-time-gutter,
  .taiv-bigcalendar .rbc-time-slot { ${stringifyFontStyle(fontStyle.label)} color: ${neutral[200]}; }
  .taiv-bigcalendar .rbc-event { ${stringifyFontStyle(fontStyle.label)} }
  .taiv-bigcalendar .rbc-month-view,
  .taiv-bigcalendar .rbc-date-cell { ${stringifyFontStyle(fontStyle.body)} }
  .taiv-bigcalendar .rbc-show-more { ${stringifyFontStyle(fontStyle.caption)} font-weight: 500; }
  .taiv-bigcalendar .rbc-agenda-view table { ${stringifyFontStyle(fontStyle.body)} }
`;

/**
 * Taiv-styled wrapper around react-big-calendar's `Calendar`.
 *
 * Drop-in replacement: forwards all props to the underlying RBC component, so
 * any usage that worked with the bare library works here. The wrapper only
 * adds Poppins typography and Taiv color tokens to RBC's default chrome —
 * feature-specific overrides (event styles, business-hours shading, etc.) keep
 * working via `eventPropGetter` / `slotPropGetter` / external CSS as before.
 *
 * For drag-and-drop and resize, wrap this component with `withDragAndDrop`
 * (also re-exported from this module).
 */
export const BigCalendar = <
  TEvent extends object = RBCEvent,
  TResource extends object = object,
>(
  props: CalendarProps<TEvent, TResource>,
) => (
  <div className='taiv-bigcalendar' style={{ width: '100%', height: '100%' }}>
    <style>{TAIV_BIG_CALENDAR_CSS}</style>
    <RBCCalendar<TEvent, TResource> {...props} />
  </div>
);
