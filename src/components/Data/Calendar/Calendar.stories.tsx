import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Calendar,
  type CalendarEventExternal,
  type CalendarProps,
  type CalendarType,
  type CalendarView,
  TAIV_CALENDAR_PALETTE,
} from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Data/Calendar',
  component: Calendar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Helper — produce ISO datetime strings Schedule-X expects.
const dt = (offsetDays: number, hour: number) =>
  dayjs()
    .startOf('day')
    .add(offsetDays, 'day')
    .add(hour, 'hour')
    .format('YYYY-MM-DD HH:mm');

const sampleEvents: CalendarEventExternal[] = [
  {
    id: '1',
    title: 'Daily standup',
    start: dt(0, 9),
    end: dt(0, 10),
    calendarId: 'primary',
  },
  {
    id: '2',
    title: 'Lunch with client',
    start: dt(1, 12),
    end: dt(1, 13),
    calendarId: 'success',
  },
  {
    id: '3',
    title: 'Review PR',
    start: dt(0, 14),
    end: dt(0, 15),
    calendarId: 'warning',
  },
  {
    id: '4',
    title: 'Off-site',
    start: dt(2, 10),
    end: dt(2, 16),
    calendarId: 'neutral',
  },
];

const ControlledCalendar = (
  args: Partial<CalendarProps> & { events?: CalendarEventExternal[] },
) => {
  const [view, setView] = useState<CalendarView>('week');
  const [date, setDate] = useState<Date>(new Date());
  return (
    <Calendar
      {...args}
      events={args.events ?? sampleEvents}
      view={view}
      onViewChange={setView}
      currentDate={date}
      onDateChange={setDate}
    />
  );
};

export const Default: Story = {
  render: () => <ControlledCalendar />,
};

export const ReadOnly: Story = {
  render: () => <ControlledCalendar readOnly />,
};

export const CustomPalette: Story = {
  render: () => {
    const customCalendars: Record<string, CalendarType> = {
      ...TAIV_CALENDAR_PALETTE,
      vip: {
        colorName: 'vip',
        lightColors: {
          main: '#7D63C8',
          container: '#EFEAFF',
          onContainer: '#7D63C8',
        },
      },
    };
    const events: CalendarEventExternal[] = [
      ...sampleEvents,
      {
        id: '5',
        title: 'VIP dinner',
        start: dt(3, 19),
        end: dt(3, 21),
        calendarId: 'vip',
      },
    ];
    return <ControlledCalendar calendars={customCalendars} events={events} />;
  },
};

export const ClickHandlers: Story = {
  render: () => (
    <ControlledCalendar
      onEventClick={(e) => alert(`Clicked event: ${e.title}`)}
      onClickDateTime={(iso) => alert(`Clicked slot: ${iso}`)}
      onEventUpdate={(e) =>
        console.log('Event updated:', e.id, e.start, e.end)
      }
    />
  ),
};
