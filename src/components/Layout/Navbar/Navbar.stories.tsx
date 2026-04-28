import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import { Divider } from '../Divider/Divider';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { UnstyledButton } from '../../Inputs/Buttons/UnstyledButton/UnstyledButton';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '[View Mantine Docs](https://v6.mantine.dev/core/navbar/)\n\nNavbar is a left-aligned vertical navigation sidebar. It extends Mantine v6\'s `Navbar` (from AppShell) with Taiv styling: Poppins font, `neutral[100]` right-border, and `spacing.lg` padding.\n\nUse `Navbar.Section` to group content. Add `grow` to a section to have it fill remaining vertical space, pushing subsequent sections to the bottom.',
      },
    },
  },
  argTypes: {
    width: {
      control: false,
      description: 'Navbar width with optional responsive breakpoints',
      table: { type: { summary: '{ base: number; sm?: number; md?: number; ... }' } },
    },
    height: {
      control: { type: 'text' },
      description: 'Navbar height',
      table: { type: { summary: 'string | number' } },
    },
    fixed: {
      control: { type: 'boolean' },
      description: 'Use fixed positioning',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    withBorder: {
      control: { type: 'boolean' },
      description: 'Show the right-hand border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    hidden: {
      control: { type: 'boolean' },
      description: 'Hide the navbar below `hiddenBreakpoint`',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Style overrides via Mantine styles API',
      table: { type: { summary: 'Record<string, CSSObject>' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const NavItem = ({ label, active }: { label: string; active?: boolean }) => (
  <UnstyledButton
    style={{
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: '6px',
      backgroundColor: active ? neutral[25] : 'transparent',
      width: '100%',
      textAlign: 'left',
    }}
  >
    <Text variant={active ? 'body' : 'subtle'}>{label}</Text>
  </UnstyledButton>
);

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    width: { base: 240 },
    height: 600,
  },
  render: (args) => (
    <Navbar {...args}>
      <Stack spacing={spacing.xs}>
        <NavItem label='Dashboard' active />
        <NavItem label='Campaigns' />
        <NavItem label='Devices' />
        <NavItem label='Ad Preferences' />
        <NavItem label='Reports' />
      </Stack>
    </Navbar>
  ),
};

// ─── Sections with grow (pushes footer to bottom) ────────────────────────────

export const WithSections: Story = {
  render: () => (
    <Navbar width={{ base: 240 }} height={600}>
      <Navbar.Section>
        <Title variant='cardHeader' mb={spacing.md}>
          Taiv
        </Title>
      </Navbar.Section>

      <Divider my={spacing.md} />

      <Navbar.Section grow>
        <Stack spacing={spacing.xs}>
          <NavItem label='Dashboard' active />
          <NavItem label='Campaigns' />
          <NavItem label='Devices' />
          <NavItem label='Ad Preferences' />
          <NavItem label='Reports' />
        </Stack>
      </Navbar.Section>

      <Divider my={spacing.md} />

      <Navbar.Section>
        <Stack spacing={spacing.xs}>
          <NavItem label='Settings' />
          <NavItem label='Log out' />
        </Stack>
      </Navbar.Section>
    </Navbar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Apply `grow` to the middle `Navbar.Section` so sibling sections pin to the top and bottom of the sidebar.',
      },
    },
  },
};

// ─── Without border ──────────────────────────────────────────────────────────

export const WithoutBorder: Story = {
  args: {
    width: { base: 240 },
    height: 600,
    withBorder: false,
  },
  render: (args) => (
    <Navbar {...args}>
      <Stack spacing={spacing.xs}>
        <NavItem label='Dashboard' active />
        <NavItem label='Campaigns' />
        <NavItem label='Devices' />
      </Stack>
    </Navbar>
  ),
};
