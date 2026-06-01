import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  BigCalendar,
  dateFnsLocalizer,
  type Event,
  type View,
  withDragAndDrop,
} from './BigCalendar';

// dayjs is the toolkit's stock date library; date-fns isn't a dep, so we feed
// dayjs through react-big-calendar's `dateFnsLocalizer` shape by adapting the
// few format/parse functions it needs. Keeps the story dependency-light.
const localizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string) => dayjs(date).format(formatStr),
  parse: (value: string, formatStr: string) =>
    dayjs(value, formatStr).toDate(),
  startOfWeek: () => dayjs().startOf('week').toDate(),
  getDay: (date: Date) => dayjs(date).day(),
  locales: {},
});

const today = dayjs().startOf('day');

const sampleEvents: Event[] = [
  {
    title: 'Game Day — UFC 285',
    start: today.clone().hour(18).toDate(),
    end: today.clone().hour(22).toDate(),
  },
  {
    title: 'Trivia Night',
    start: today.clone().add(1, 'day').hour(19).toDate(),
    end: today.clone().add(1, 'day').hour(21).toDate(),
  },
  {
    title: 'Karaoke',
    start: today.clone().add(2, 'day').hour(20).toDate(),
    end: today.clone().add(2, 'day').hour(23).toDate(),
  },
  {
    title: 'Comedy Night',
    start: today.clone().add(3, 'day').hour(20).toDate(),
    end: today.clone().add(3, 'day').hour(22).toDate(),
  },
  {
    title: 'Weekly Food Specials',
    start: today.clone().toDate(),
    end: today.clone().add(1, 'day').toDate(),
    allDay: true,
  },
];

const meta: Meta<typeof BigCalendar> = {
  title: 'Data/BigCalendar',
  component: BigCalendar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Taiv-styled wrapper around `react-big-calendar`. Forwards all props to the underlying library — only the typography is overridden (Poppins + Taiv tokens). Use `withDragAndDrop` (re-exported) for drag/drop + resize. Use `momentLocalizer` (also re-exported) to bind a date library.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BigCalendar>;

export const Default: Story = {
  render: () => {
    const [view, setView] = useState<View>('week');
    const [date, setDate] = useState<Date>(new Date());
    return (
      <div style={{ height: '90vh', padding: 16 }}>
        <BigCalendar
          localizer={localizer}
          events={sampleEvents}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          views={['month', 'week', 'day']}
          step={15}
          timeslots={4}
          showMultiDayTimes
          selectable
        />
      </div>
    );
  },
};

const DnDCalendar = withDragAndDrop(BigCalendar);

export const WithDragAndDrop: Story = {
  render: () => {
    const [events, setEvents] = useState<Event[]>(sampleEvents);
    const [view, setView] = useState<View>('week');
    const [date, setDate] = useState<Date>(new Date());

    const moveEvent = ({
      event,
      start,
      end,
    }: {
      event: Event;
      start: Date | string;
      end: Date | string;
    }) => {
      setEvents((prev) =>
        prev.map((e) =>
          e === event
            ? { ...e, start: new Date(start), end: new Date(end) }
            : e,
        ),
      );
    };

    return (
      <div style={{ height: '90vh', padding: 16 }}>
        <DnDCalendar
          localizer={localizer}
          events={events}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          views={['month', 'week', 'day']}
          step={15}
          timeslots={4}
          showMultiDayTimes
          selectable
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
        />
      </div>
    );
  },
};
