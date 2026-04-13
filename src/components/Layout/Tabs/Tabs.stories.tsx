import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import { Stack } from '../Stack/Stack';
import { primary } from '../../../constants/colors';
import { Text } from '../../Typography/Text/Text';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Layout/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/tabs/)\n\nThe Tabs component organizes content into sections that users can switch between. It extends Mantine v6's Tabs component with custom styling and variant options.",
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Tab content — composed of Tabs.List, Tabs.Tab, and Tabs.Panel',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'pills'],
      description: 'The preset variant to use for styling',
      table: {
        type: { summary: "'default' | 'outline' | 'pills'" },
        defaultValue: { summary: "'default'" },
      },
    },
    defaultValue: {
      control: { type: 'select' },
      options: ['overview', 'details', 'settings'],
      description: 'The default tab when the component is mounted',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'The currently active tab value',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the active tab changes',
      table: {
        type: { summary: '(value: string | null) => void' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Override for styling',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: undefined,
    variant: 'default',
    defaultValue: 'overview',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel mt="1.6rem" value="overview"><Text variant="subtle">This is the tab panel for Overview</Text></Tabs.Panel>
      <Tabs.Panel mt="1.6rem" value="details"><Text variant="subtle">This is the tab panel for Details</Text></Tabs.Panel>
      <Tabs.Panel mt="1.6rem" value="settings"><Text variant="subtle">This is the tab panel for Settings</Text></Tabs.Panel>
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing="4.8rem" py="2.4rem" sx={{ width: '600px' }}>
      <Tabs defaultValue="overview" variant="default">
        <Tabs.List>
          <Tabs.Tab value="overview">Default</Tabs.Tab>
          <Tabs.Tab value="details">Tab 2</Tabs.Tab>
          <Tabs.Tab value="settings">Tab 3</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Tabs defaultValue="overview" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="overview">Outline</Tabs.Tab>
          <Tabs.Tab value="details">Tab 2</Tabs.Tab>
          <Tabs.Tab value="settings">Tab 3</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Tabs defaultValue="overview" variant="pills">
        <Tabs.List>
          <Tabs.Tab value="overview">Pills</Tabs.Tab>
          <Tabs.Tab value="details">Tab 2</Tabs.Tab>
          <Tabs.Tab value="settings">Tab 3</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Stack>
  ),
};

export const CustomStyling: Story = {
  args: {
    defaultValue: 'overview',
    styles: {
      root: {
        background: primary[200],
        padding: '2rem',
        borderRadius: '12px',
      },
      tab: {
        color: 'white',
        '&:hover': {
          color: 'white',
          backgroundColor: primary[300],
        },
        '&[data-active]': {
          color: 'white',
          backgroundColor: primary[100],
        },
      },
      panel: {
        color: 'white',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs variant="pills" {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel mt="1.6rem" value="overview">Overview</Tabs.Panel>
      <Tabs.Panel mt="1.6rem" value="details">Details</Tabs.Panel>
    </Tabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tabs
  defaultValue="overview"
  styles={{
    root: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      borderRadius: '12px',
    },
    tab: {
      color: 'rgba(255, 255, 255, 0.8)',
      '&[data-active]': {
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
    },
    panel: { color: 'white' },
  }}
>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
</Tabs>`,
      },
    },
  },
};