import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from './SearchBar';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Inputs/TextInputs/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the search bar size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Search'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Search bar label',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description text',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width of container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Custom width in pixels',
      table: {
        type: { summary: 'number' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(event: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<SearchBar
  value={searchQuery}
  onChange={(event) => setSearchQuery(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <SearchBar label="Find Users" description="Search by name, email, or username" />
      <SearchBar placeholder="Search products..." />
      <SearchBar label="Product Search" error="Search query is too short" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <SearchBar size="sm" />
      <SearchBar size="md" />
      <SearchBar size="lg" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SearchBar size="sm" value={query} onChange={handleSearch} />
<SearchBar size="lg" value={query} onChange={handleSearch} />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <SearchBar label="Normal Search Bar" />
      <SearchBar label="Disabled Search Bar" disabled />
      <SearchBar label="Required Search Bar" required />
      <SearchBar label="Search Bar with Description" description="Enter your search terms" />
      <SearchBar label="Search Bar with Error" error="Please enter a valid search term" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const AdditionalFunctionality: Story = {
  render: () => (
    <Group gap="2rem">
      <SearchBar width={400} placeholder="Search products..." />
      <SearchBar label="Find Users" description="Search by name, email, or username" />
      <SearchBar label="Product Search" error="Search query is too short" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SearchBar
  width={400}
  value={searchTerm}
  onChange={handleSearchChange}
  placeholder="Search products..."
/>

<SearchBar
  label="Find Users"
  description="Search by name, email, or username"
  value={userSearch}
  onChange={handleUserSearch}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <SearchBar
        label="Custom Styled Search Bar"
        styles={{
          input: {
            borderColor: '#ff6b6b',
            '&:focus': {
              borderColor: '#ff6b6b',
              boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.2)',
            },
          },
          label: {
            color: '#ff6b6b',
            fontWeight: 600,
          },
        }}
      />
      <SearchBar
        label="Another Custom Style"
        styles={{
          input: {
            backgroundColor: '#f8f9fa',
            borderColor: '#4CAF50',
            '&:focus': {
              borderColor: '#4CAF50',
              boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
            },
          },
          label: {
            color: '#4CAF50',
            fontSize: '16px',
          },
        }}
      />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};
