import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { neutral, primary, success, warning } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { SegmentedControl } from '../../Inputs/Controls/SegmentedControl/SegmentedControl';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import {
  Calendar,
  type CalendarBackgroundEvent,
  type CalendarEvent,
  type CalendarView,
} from './Calendar';

// ── Sample data ──────────────────────────────────────────────────────────────

type AdEventData = {
  advertiser: string;
  logoUrl: string;
  backgroundUrl: string;
  impressions: number;
  status: 'live' | 'scheduled' | 'paused';
};

const today = dayjs().startOf('day');

const sampleAdEvents: CalendarEvent<AdEventData>[] = [
  {
    color: 'primary',
    data: {
      advertiser: 'Nike',
      backgroundUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      impressions: 12_400,
      logoUrl: 'https://logo.clearbit.com/nike.com',
      status: 'live',
    },
    end: today.hour(11).toDate(),
    id: 'a1',
    start: today.hour(9).toDate(),
    title: 'Nike — Summer Drop',
  },
  {
    color: 'success',
    data: {
      advertiser: 'Spotify',
      backgroundUrl:
        'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400&q=80',
      impressions: 8_100,
      logoUrl: 'https://logo.clearbit.com/spotify.com',
      status: 'scheduled',
    },
    end: today.hour(15).minute(30).toDate(),
    id: 'a2',
    start: today.hour(13).toDate(),
    title: 'Spotify — Wrapped',
  },
  {
    color: 'purple',
    data: {
      advertiser: 'Apple',
      backgroundUrl:
        'https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=400&q=80',
      impressions: 21_750,
      logoUrl: 'https://logo.clearbit.com/apple.com',
      status: 'live',
    },
    end: today.add(1, 'day').hour(12).toDate(),
    id: 'a3',
    start: today.add(1, 'day').hour(10).toDate(),
    title: 'Apple — Vision Pro',
  },
  {
    color: 'warning',
    data: {
      advertiser: 'Airbnb',
      backgroundUrl:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
      impressions: 5_300,
      logoUrl: 'https://logo.clearbit.com/airbnb.com',
      status: 'paused',
    },
    end: today.add(2, 'day').hour(16).toDate(),
    id: 'a4',
    start: today.add(2, 'day').hour(14).toDate(),
    title: 'Airbnb — City Guides',
  },
];

// Shade time ranges *outside* Mon–Fri 9-5 across `days` days starting at `anchor`.
// Mirrors the production pattern: invert the open-hours map into "closed" ranges
// (closed-morning + closed-evening per weekday, full-day for weekends) and hand
// them to the calendar as `backgroundEvents`. The rgba grey matches the legacy
// slot-shading value in ModeCalendar so the demo reads like production.
const buildBusinessHoursBackground = (
  anchor: Date,
  days: number,
): CalendarBackgroundEvent[] => {
  const closedStyle: Partial<CSSStyleDeclaration> = {
    backgroundColor: 'rgba(130, 130, 130, 0.1)',
  };
  const events: CalendarBackgroundEvent[] = [];
  for (let i = 0; i < days; i++) {
    const day = new Date(anchor);
    day.setDate(day.getDate() + i);
    const dow = day.getDay(); // 0 Sun, 6 Sat
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);
    if (dow === 0 || dow === 6) {
      events.push({ end: endOfDay, start: startOfDay, style: closedStyle });
    } else {
      const open = new Date(day);
      open.setHours(9, 0, 0, 0);
      const close = new Date(day);
      close.setHours(17, 0, 0, 0);
      events.push({ end: open, start: startOfDay, style: closedStyle });
      events.push({ end: endOfDay, start: close, style: closedStyle });
    }
  }
  return events;
};

const businessHours = buildBusinessHoursBackground(today.toDate(), 14);

// ── Decorator: fixed canvas size so stories have room to breathe ────────────

const meta: Meta<typeof Calendar> = {
  argTypes: {
    backgroundEvents: {
      control: false,
      description: 'Shaded time ranges (business hours, closed periods, etc.).',
      table: { type: { summary: 'CalendarBackgroundEvent[]' } },
    },
    events: {
      control: false,
      description:
        'Calendar events. `start` and `end` are native `Date` objects.',
      table: { type: { summary: 'CalendarEvent<TData>[]' } },
    },
    firstDayOfWeek: {
      control: { type: 'inline-radio' },
      description: '0 = Sunday, 1 = Monday.',
      options: [0, 1],
      table: { defaultValue: { summary: '0' }, type: { summary: '0 | 1' } },
    },
    minuteStep: {
      control: { type: 'inline-radio' },
      description: 'Granularity for DnD and resize.',
      options: [5, 10, 15, 30, 60],
      table: {
        defaultValue: { summary: '15' },
        type: { summary: '5 | 10 | 15 | 30 | 60' },
      },
    },
    onEventDrop: {
      action: 'eventDrop',
      description: 'Fires when an event is dragged to a new start time.',
      table: { type: { summary: '(newEvent, oldEvent) => void' } },
    },
    onEventResize: {
      action: 'eventResize',
      description:
        'Fires when an event is resized (end time changes, start held).',
      table: { type: { summary: '(newEvent, oldEvent) => void' } },
    },
    onEventSelect: {
      action: 'eventSelect',
      description: 'Fires when the user clicks an event.',
      table: { type: { summary: '(event: CalendarEvent<TData>) => void' } },
    },
    onSlotSelect: {
      action: 'slotSelect',
      description:
        'Fires when the user clicks empty time — useful for click-to-create.',
      table: {
        type: { summary: '(slot: { start: Date; end: Date }) => void' },
      },
    },
    onViewChange: {
      action: 'viewChange',
      description: 'Fires when the user changes view via the built-in header.',
      table: { type: { summary: '(view: CalendarView) => void' } },
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Disable DnD, resize, and event updates.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    renderEvent: {
      control: false,
      description:
        'Custom event card — receives the event and the current view.',
      table: { type: { summary: '(event, view) => ReactNode' } },
    },
    toolbar: {
      control: false,
      description: 'Replaces the default header. Pass `null` to hide it.',
      table: { type: { summary: 'ReactNode | null' } },
    },
    view: {
      control: { type: 'inline-radio' },
      description: 'Active view.',
      options: ['month', 'week', 'day'],
      table: { type: { summary: "'month' | 'week' | 'day'" } },
    },
  },
  component: Calendar,
  decorators: [
    (Story) => (
      <div style={{ height: 640, width: 1000 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Calendar for scheduling and visualizing time-bound items (e.g. ad campaigns, bookings). Wraps [Schedule-X v2](https://schedule-x.dev/) with Taiv typography, a `Date`-based public API, and first-class support for image-rich custom event rendering via `renderEvent`.\n\nSupports day/week/month views, drag-and-drop, resize, background-event shading for business hours, and a slot-less API (`onSlotSelect`) for click-to-create flows.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Data/Calendar',
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default — controlled, week view ──────────────────────────────────────────

export const Default: Story = {
  args: {
    events: sampleAdEvents,
    view: 'week',
  },
  render: (args) => {
    const [view, setView] = useState<CalendarView>(args.view ?? 'week');
    const [events, setEvents] = useState(args.events ?? sampleAdEvents);
    return (
      <Calendar
        {...args}
        events={events}
        onEventDrop={(n, o) => {
          setEvents((prev) =>
            prev.map((e) => (e.id === n.id ? (n as typeof e) : e)),
          );
          args.onEventDrop?.(n, o);
        }}
        onEventResize={(n, o) => {
          setEvents((prev) =>
            prev.map((e) => (e.id === n.id ? (n as typeof e) : e)),
          );
          args.onEventResize?.(n, o);
        }}
        onViewChange={(v) => {
          setView(v);
          args.onViewChange?.(v);
        }}
        view={view}
      />
    );
  },
};

// ── Image-rich custom event rendering ────────────────────────────────────────

export const WithCustomEventRendering: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`renderEvent` receives the full event (including `data`) and the current view. Use it to render cards with background images, logos, status badges — whatever the domain calls for. The second argument lets you compact the layout in month view, where cells are much smaller.',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('week');
    return (
      <Calendar<AdEventData>
        events={sampleAdEvents}
        onViewChange={setView}
        renderEvent={(event, v) => {
          if (!event.data) return null;
          const { backgroundUrl, logoUrl, advertiser, impressions, status } =
            event.data;
          const statusColor =
            status === 'live'
              ? success[200]
              : status === 'paused'
                ? warning[200]
                : primary[200];
          return (
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${backgroundUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: 6,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                overflow: 'hidden',
                padding: v === 'month' ? '4px 6px' : spacing.xs,
              }}
            >
              <Group
                position='apart'
                spacing={spacing.xxs}
                style={{ flexWrap: 'nowrap' }}
              >
                <Group spacing={spacing.xxs} style={{ flexWrap: 'nowrap' }}>
                  <img
                    alt={advertiser}
                    src={logoUrl}
                    style={{
                      background: 'white',
                      borderRadius: 3,
                      height: 16,
                      width: 16,
                    }}
                  />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>
                    {advertiser}
                  </span>
                </Group>
                <span
                  style={{
                    background: statusColor,
                    borderRadius: 3,
                    fontSize: 9,
                    padding: '1px 4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {status}
                </span>
              </Group>
              {v !== 'month' && (
                <span style={{ fontSize: 11, opacity: 0.9 }}>
                  {impressions.toLocaleString()} impressions
                </span>
              )}
            </div>
          );
        }}
        view={view}
      />
    );
  },
};

// ── Day view ────────────────────────────────────────────────────────────────

export const DayView: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single-day timeline. Same API — just pass `view="day"`.',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('day');
    return (
      <Calendar events={sampleAdEvents} onViewChange={setView} view={view} />
    );
  },
};

// ── Month view ──────────────────────────────────────────────────────────────

export const MonthView: Story = {
  render: () => {
    const [view, setView] = useState<CalendarView>('month');
    return (
      <Calendar events={sampleAdEvents} onViewChange={setView} view={view} />
    );
  },
};

// ── Business-hours shading via background events ────────────────────────────

export const WithBusinessHours: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shade everything *outside* Mon–Fri 9–5 to convey business hours — weekdays get closed-morning and closed-evening ranges, weekends are shaded in full. Mirrors the production pattern: invert your open-hours map into "closed" ranges and pass them as `backgroundEvents`. The `rgba(130, 130, 130, 0.1)` grey matches what operators see in the legacy app.',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('week');
    return (
      <Calendar
        backgroundEvents={businessHours}
        events={sampleAdEvents}
        onViewChange={setView}
        view={view}
      />
    );
  },
};

// ── Read-only (no DnD / resize) ─────────────────────────────────────────────

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`readOnly` disables drag-and-drop, resize, and all event mutations.',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('week');
    return (
      <Calendar
        events={sampleAdEvents}
        onViewChange={setView}
        readOnly
        view={view}
      />
    );
  },
};

// ── Custom toolbar ──────────────────────────────────────────────────────────

export const WithCustomToolbar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'By default the calendar renders a Taiv-styled toolbar. Pass any ReactNode as `toolbar` to replace it with your own composition, or `toolbar={null}` to render no toolbar at all (useful when navigation lives outside the calendar card).',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('week');
    const [date, setDate] = useState<Date>(today.toDate());
    const label = useMemo(() => dayjs(date).format('MMMM YYYY'), [date]);
    const shift = (amount: number) => {
      const unit = view === 'day' ? 'day' : view === 'week' ? 'week' : 'month';
      setDate(dayjs(date).add(amount, unit).toDate());
    };
    const toolbar = (
      <Group
        position='apart'
        style={{
          borderBottom: `1px solid ${neutral[50]}`,
          padding: spacing.sm,
        }}
      >
        <Group spacing={spacing.xs}>
          <Button onClick={() => shift(-1)} size='sm' variant='secondary'>
            Prev
          </Button>
          <Button
            onClick={() => setDate(today.toDate())}
            size='sm'
            variant='secondary'
          >
            Today
          </Button>
          <Button onClick={() => shift(1)} size='sm' variant='secondary'>
            Next
          </Button>
          <Title variant='cardHeader'>{label}</Title>
        </Group>
        <SegmentedControl
          data={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]}
          onChange={(v) => setView(v as CalendarView)}
          value={view}
        />
      </Group>
    );
    return (
      <Calendar
        currentDate={date}
        events={sampleAdEvents}
        onDateChange={setDate}
        onViewChange={setView}
        toolbar={toolbar}
        view={view}
      />
    );
  },
};

// ── Click-to-create slot selection ──────────────────────────────────────────

export const ClickToCreate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`onSlotSelect` fires when the user clicks empty time. The slot width is controlled by `minuteStep` (default 15) — this story extends it to a full hour before committing.',
      },
    },
  },
  render: () => {
    const [view, setView] = useState<CalendarView>('week');
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [lastSlot, setLastSlot] = useState<string | null>(null);
    return (
      <Stack spacing={spacing.sm}>
        <Text variant='subtle'>
          Click an empty time slot to create a 1-hour placeholder event.
          {lastSlot && ` Last clicked: ${lastSlot}`}
        </Text>
        <Calendar
          events={events}
          onSlotSelect={({ start }) => {
            const end = dayjs(start).add(1, 'hour').toDate();
            setLastSlot(dayjs(start).format('MMM D, h:mm A'));
            setEvents((prev) => [
              ...prev,
              {
                end,
                id: `new-${Date.now()}`,
                start,
                title: 'New event',
              },
            ]);
          }}
          onViewChange={setView}
          view={view}
        />
      </Stack>
    );
  },
};
