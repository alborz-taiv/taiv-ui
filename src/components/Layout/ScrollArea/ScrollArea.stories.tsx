import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content inside the scroll viewport',
      table: { type: { summary: 'ReactNode' } },
    },
    h: {
      control: { type: 'text' },
      description: 'Viewport height',
      table: { type: { summary: 'string | number' } },
    },
    type: {
      control: { type: 'select' },
      options: ['auto', 'always', 'scroll', 'hover', 'never'],
      description: 'When scrollbars are shown',
      table: {
        type: { summary: "'auto' | 'always' | 'scroll' | 'hover' | 'never'" },
        defaultValue: { summary: "'hover'" },
      },
    },
    scrollbarSize: {
      control: { type: 'number' },
      description: 'Scrollbar thickness',
      table: { type: { summary: 'number | string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const longContent = Array.from({ length: 24 }, (_, i) => {
  const lineNumber = i + 1;
  return (
    <Text key={`scroll-area-demo-line-${lineNumber}`} size="sm" color="dimmed">
      Line {lineNumber} — scroll the viewport to see more content.
    </Text>
  );
});

export const Default: Story = {
  args: {
    h: 200,
    w: 320,
    type: 'auto',
    children: (
      <Stack spacing={spacing.sm} p={spacing.md}>
        {longContent}
      </Stack>
    ),
    sx: {
      border: `1px solid ${neutral[100]}`,
      borderRadius: 8,
    },
  },
};

export const Autosize: Story = {
  render: () => (
    <ScrollArea.Autosize mah={200} maw={360} type="hover" sx={{ border: `1px solid ${neutral[100]}`, borderRadius: 8 }}>
      <Stack spacing={spacing.sm} p={spacing.md}>
        {longContent}
      </Stack>
    </ScrollArea.Autosize>
  ),
  parameters: {
    docs: { source: { code: false } },
  },
};
