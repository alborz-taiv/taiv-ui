import type { Meta, StoryObj } from '@storybook/react-vite';
import { Frame } from './Frame';
import { Text } from '../../Typography/Text/Text';
import { Stack } from '../Stack/Stack';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Card } from '../Card/Card';
import { Title } from '../../Typography/Title/Title';
import { TextInput } from '../../Inputs/TextInputs/TextInput/TextInput';
import { Group } from '../Group/Group';

const meta: Meta<typeof Frame> = {
  title: 'Components/Layout/Frame',
  component: Frame,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Section header title',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle below the title',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Content displayed below the header',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the frame',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'100%'" },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles override - use this sparingly',
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
    title: 'Frame Title',
    subtitle: 'Optional subtitle text',
    width: '500px',
  },
  render: (args) => (
    <Frame {...args}>
      <div
        style={{
          backgroundColor: neutral[25],
          border: `1px dashed ${neutral[50]}`,
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '150px',
        }}
      >
        <Text>Frame Content</Text>
      </div>
    </Frame>
  ),
};

export const UseCases: Story = {
  render: () => (
    <Stack gap={spacing.xxl} sx={{ width: '500px' }}>
      <Frame title="User Details" subtitle="Enter your user details">
        <Stack gap={spacing.lg}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            type="text"
            fullWidth
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            fullWidth
          />
          <Group>
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
          </Group>
        </Stack>
      </Frame>

      <Frame title="Your Items" subtitle="View your recent items">
        <Stack gap={spacing.sm}>
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <Title variant="cardHeader">Item {item}</Title>
              <Title variant="cardSubheader">Description for item {item}</Title>
            </Card>
          ))}
        </Stack>
      </Frame>

      <Frame title="Stats This Week">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: neutral[25], borderRadius: '8px', flex: 1 }}>
            <Text size="xl" weight="bold">42</Text>
            <Text size="sm" color={neutral[100]}>Ads Played</Text>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: neutral[25], borderRadius: '8px', flex: 1 }}>
            <Text size="xl" weight="bold">1.2K</Text>
            <Text size="sm" color={neutral[100]}>Impressions</Text>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: neutral[25], borderRadius: '8px', flex: 1 }}>
            <Text size="xl" weight="bold">89%</Text>
            <Text size="sm" color={neutral[100]}>Revenue Growth</Text>
          </div>
        </div>
      </Frame>
    </Stack>
  ),
};