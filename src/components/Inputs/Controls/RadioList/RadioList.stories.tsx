import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioList } from './RadioList';

const meta: Meta<typeof RadioList> = {
  title: 'Components/Inputs/Controls/RadioList',
  component: RadioList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Array of radio options',
      table: {
        type: { summary: 'RadioListOption[]' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state for all options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the radio list',
      table: {
        type: { summary: 'React.CSSProperties["width"]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const optionsWithDescriptions = [
  { value: 'basic', label: 'Basic Plan', rightContent: <span style={{ color: '#666', fontSize: '14px' }}>$9/month</span> },
  { value: 'pro', label: 'Pro Plan', rightContent: <span style={{ color: '#666', fontSize: '14px' }}>$19/month</span> },
  { value: 'enterprise', label: 'Enterprise Plan', rightContent: <span style={{ color: '#666', fontSize: '14px' }}>$49/month</span> },
];

const optionsWithIcons = [
  {
    value: 'email',
    label: 'Email Notifications',
    rightContent: <span style={{ color: '#4CAF50', fontSize: '14px' }}>✓</span>,
  },
  {
    value: 'sms',
    label: 'SMS Notifications',
    rightContent: <span style={{ color: '#666', fontSize: '14px' }}>✗</span>,
  },
  {
    value: 'push',
    label: 'Push Notifications',
    rightContent: <span style={{ color: '#4CAF50', fontSize: '14px' }}>✓</span>,
  },
];

export const Default: Story = {
  args: {
    data: basicOptions,
    value: 'option1',
    disabled: false,
    width: '300px',
  },
  parameters: {
    docs: {
      source: {
        code: `<RadioList
  data={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
/>`,
      },
    },
  },
};

export const WithRightContent: Story = {
  render: () => <RadioList data={optionsWithDescriptions} value="pro" width="400px" />,
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => <RadioList data={optionsWithIcons} value="email" width="350px" />,
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Normal State</h4>
        <RadioList data={basicOptions} value="option2" width="300px" />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Disabled State</h4>
        <RadioList data={basicOptions} value="option1" disabled width="300px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const CustomWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Narrow Width (200px)</h4>
        <RadioList data={basicOptions} value="option1" width="200px" />
      </div>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Wide Width (500px)</h4>
        <RadioList data={optionsWithDescriptions} value="pro" width="500px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};
