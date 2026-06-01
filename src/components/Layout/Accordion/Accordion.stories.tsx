import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { Badge } from '../../Info/Badge/Badge';
import { Group } from '../Group/Group';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Toggle } from '../../Inputs/Controls/Toggle/Toggle';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '[View Mantine Docs](https://v6.mantine.dev/core/accordion/)\n\nAccordion renders a list of expandable items. It extends Mantine v6\'s Accordion with Taiv styling: Poppins font, neutral dividers, `neutral[25]` hover, and a right-chevron that rotates 90° on expand.\n\nSupports controlled and uncontrolled modes, multi-expand via the `multiple` prop, and fully custom control content via `Accordion.Control`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '560px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple items to be open simultaneously',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Uncontrolled default open item value',
      table: { type: { summary: 'string | string[]' } },
    },
    value: {
      control: false,
      description: 'Controlled open item value',
      table: { type: { summary: 'string | string[] | null' } },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the open item changes',
      table: { type: { summary: '(value: string | string[] | null) => void' } },
    },
    chevron: {
      control: false,
      description: 'Override the default right-chevron icon',
      table: { type: { summary: 'ReactNode' } },
    },
    styles: {
      control: { type: 'object' },
      description: 'Style overrides using Mantine styles API',
      table: { type: { summary: 'Record<string, CSSObject>' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Single-expand (default) ────────────────────────────────────────────────

export const Default: Story = {
  args: { defaultValue: 'item-1' },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item value='item-1'>
        <Accordion.Control>Section one</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>Content for section one. Click the header to collapse.</Text>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='item-2'>
        <Accordion.Control>Section two</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>Content for section two.</Text>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='item-3'>
        <Accordion.Control>Section three</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>Content for section three.</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Accordion defaultValue="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Control>Section one</Accordion.Control>
    <Accordion.Panel>Content for section one.</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Control>Section two</Accordion.Control>
    <Accordion.Panel>Content for section two.</Accordion.Panel>
  </Accordion.Item>
</Accordion>`,
      },
    },
  },
};

// ─── Multi-expand ────────────────────────────────────────────────────────────

export const MultiExpand: Story = {
  render: () => (
    <Accordion multiple>
      <Accordion.Item value='item-1'>
        <Accordion.Control>Open simultaneously</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>Both panels can be open at once when `multiple` is set.</Text>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='item-2'>
        <Accordion.Control>Also open</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>This one is open too.</Text>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='item-3'>
        <Accordion.Control>Collapsed</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>This panel starts collapsed.</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Pass `multiple` to allow any number of items to be open at once.' },
      source: { code: `<Accordion multiple defaultValue={['item-1', 'item-2']}>...</Accordion>` },
    },
  },
};

// ─── Custom header content (Ad Preferences-style row) ───────────────────────

const categories = [
  { value: 'adult', emoji: '🔞', label: 'Adult Content', badge: null },
  { value: 'gambling', emoji: '🎰', label: 'Gambling', badge: null },
  { value: 'food', emoji: '🍽️', label: 'Food & Drink', badge: '1 of 9 blocked' },
  { value: 'health', emoji: '💪', label: 'Health & Fitness', badge: '1 of 14 blocked' },
];

export const CustomHeader: Story = {
  render: () => {
    const [blocked, setBlocked] = useState<Record<string, boolean>>({});

    const toggle = (value: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setBlocked((prev) => ({ ...prev, [value]: !prev[value] }));
    };

    return (
      <Accordion>
        {categories.map(({ value, emoji, label, badge }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Control>
              <Group position='apart' noWrap>
                <Group spacing={spacing.sm} noWrap>
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{emoji}</span>
                  <Text variant='body'>{label}</Text>
                </Group>
                <Group spacing={spacing.sm} noWrap onClick={(e) => e.stopPropagation()}>
                  {badge ? (
                    <Badge variant='filled' color='warning' size='sm'>
                      {badge}
                    </Badge>
                  ) : (
                    <Text variant='label' color={neutral[200]}>
                      Not blocked
                    </Text>
                  )}
                  <Toggle
                    size='sm'
                    checked={!!blocked[value]}
                    variant='error'
                    onChange={(e) => {
                      e.stopPropagation();
                      setBlocked((prev) => ({ ...prev, [value]: e.currentTarget.checked }));
                    }}
                  />
                </Group>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack spacing={spacing.sm}>
                <Text variant='subtle'>Subcategories for {label} would appear here.</Text>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compose any content inside `Accordion.Control`. Wrap interactive elements (toggles, buttons) in a click-stopping container so they don\'t trigger expand/collapse.',
      },
      source: { code: false },
    },
  },
};

// ─── Disabled item ───────────────────────────────────────────────────────────

export const DisabledItem: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item value='active'>
        <Accordion.Control>Available category</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>This item can be expanded.</Text>
        </Accordion.Panel>
      </Accordion.Item>
      {/* @ts-expect-error Mantine v6 types omit disabled but the prop is supported at runtime */}
      <Accordion.Item value='disabled' disabled>
        <Accordion.Control>Disabled category</Accordion.Control>
        <Accordion.Panel>
          <Text variant='subtle'>This content is inaccessible.</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: { story: 'Pass `disabled` on an `Accordion.Item` to prevent it from being opened.' },
      source: {
        code: `<Accordion.Item value="disabled" disabled>
  <Accordion.Control>Disabled</Accordion.Control>
  <Accordion.Panel>...</Accordion.Panel>
</Accordion.Item>`,
      },
    },
  },
};

// ─── Controlled ──────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('item-1');
    return (
      <Stack spacing={spacing.md}>
        <Text variant='label'>Open item: {value ?? 'none'}</Text>
        <Accordion value={value} onChange={(v) => setValue(v as string | null)}>
          <Accordion.Item value='item-1'>
            <Accordion.Control>Controlled item 1</Accordion.Control>
            <Accordion.Panel>
              <Text variant='subtle'>Controlled via external state.</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value='item-2'>
            <Accordion.Control>Controlled item 2</Accordion.Control>
            <Accordion.Panel>
              <Text variant='subtle'>Only one open at a time.</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Pass `value` and `onChange` for full controlled behaviour.' },
      source: { code: false },
    },
  },
};
