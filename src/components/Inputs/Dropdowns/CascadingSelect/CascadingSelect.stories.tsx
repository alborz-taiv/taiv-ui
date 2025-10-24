import type { Meta, StoryObj } from '@storybook/react-vite';
import { CascadingSelect } from './CascadingSelect';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof CascadingSelect> = {
  title: 'Components/Inputs/Dropdowns/CascadingSelect',
  component: CascadingSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the cascading select size',
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
        defaultValue: { summary: "'Select an option'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Select label',
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
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Allow clearing selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Allow searching options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        type: { summary: '(value: string | null) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample hierarchical data
const categoryData = [
  {
    option: { value: 'electronics', label: 'Electronics' },
    icon: '📱',
    children: [
      {
        option: { value: 'phones', label: 'Smartphones' },
        icon: '📱',
        children: [
          { option: { value: 'iphone', label: 'iPhone' }, icon: '🍎' },
          { option: { value: 'samsung', label: 'Samsung Galaxy' }, icon: '📱' },
          { option: { value: 'google', label: 'Google Pixel' }, icon: '🔍' },
        ],
      },
      {
        option: { value: 'laptops', label: 'Laptops' },
        icon: '💻',
        children: [
          { option: { value: 'macbook', label: 'MacBook' }, icon: '🍎' },
          { option: { value: 'thinkpad', label: 'ThinkPad' }, icon: '💻' },
          { option: { value: 'surface', label: 'Surface' }, icon: '🖥️' },
        ],
      },
    ],
  },
  {
    option: { value: 'clothing', label: 'Clothing' },
    icon: '👕',
    children: [
      {
        option: { value: 'mens', label: "Men's Clothing" },
        icon: '👔',
        children: [
          { option: { value: 'shirts', label: 'Shirts' }, icon: '👕' },
          { option: { value: 'pants', label: 'Pants' }, icon: '👖' },
          { option: { value: 'shoes', label: 'Shoes' }, icon: '👟' },
        ],
      },
      {
        option: { value: 'womens', label: "Women's Clothing" },
        icon: '👗',
        children: [
          { option: { value: 'dresses', label: 'Dresses' }, icon: '👗' },
          { option: { value: 'tops', label: 'Tops' }, icon: '👚' },
          { option: { value: 'accessories', label: 'Accessories' }, icon: '👜' },
        ],
      },
    ],
  },
  {
    option: { value: 'home', label: 'Home & Garden' },
    icon: '🏠',
    children: [
      {
        option: { value: 'furniture', label: 'Furniture' },
        icon: '🪑',
        children: [
          { option: { value: 'sofas', label: 'Sofas' }, icon: '🛋️' },
          { option: { value: 'tables', label: 'Tables' }, icon: '🪑' },
          { option: { value: 'chairs', label: 'Chairs' }, icon: '🪑' },
        ],
      },
    ],
  },
];

const simpleHierarchyData = [
  {
    option: { value: 'level1', label: 'Level 1 Item' },
    children: [{ option: { value: 'level2a', label: 'Level 2 Item A' } }, { option: { value: 'level2b', label: 'Level 2 Item B' } }],
  },
  {
    option: { value: 'another-level1', label: 'Another Level 1 Item' },
    children: [{ option: { value: 'another-level2', label: 'Another Level 2 Item' } }],
  },
];

export const Default: Story = {
  args: {
    data: categoryData,
    placeholder: 'Select a category',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    clearable: false,
    searchable: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '220px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<CascadingSelect
  data={[
    {
      option: { value: 'electronics', label: 'Electronics' },
      icon: '📱',
      children: [
        {
          option: { value: 'phones', label: 'Smartphones' },
          children: [
            { option: { value: 'iphone', label: 'iPhone' } },
            { option: { value: 'samsung', label: 'Samsung Galaxy' } },
          ],
        },
      ],
    },
  ]}
  placeholder="Select a category"
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <CascadingSelect size="sm" data={simpleHierarchyData} placeholder="Small Cascading Select" />
      <CascadingSelect size="md" data={simpleHierarchyData} placeholder="Medium Cascading Select (Default)" />
      <CascadingSelect size="lg" data={simpleHierarchyData} placeholder="Large Cascading Select" />
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

export const WithIcons: Story = {
  render: () => (
    <Group gap="2rem">
      <CascadingSelect label="Categories with Icons" data={categoryData} placeholder="Select with icons" />
      <CascadingSelect label="Simple Hierarchy" data={simpleHierarchyData} placeholder="Select without icons" />
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

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <CascadingSelect label="Normal Cascading Select" data={simpleHierarchyData} placeholder="Select option" />
      <CascadingSelect label="Disabled Cascading Select" data={simpleHierarchyData} placeholder="Select option" disabled />
      <CascadingSelect label="Required Cascading Select" data={simpleHierarchyData} placeholder="Select option" required />
      <CascadingSelect label="Cascading Select with Description" description="Please choose an option from the hierarchy" data={simpleHierarchyData} placeholder="Select option" />
      <CascadingSelect label="Cascading Select with Error" error="This field is required" data={simpleHierarchyData} placeholder="Select option" />
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

export const WithFeatures: Story = {
  render: () => (
    <Group gap="2rem">
      <CascadingSelect label="Clearable Cascading Select" data={simpleHierarchyData} placeholder="Select option" clearable value="level2a" />
      <CascadingSelect label="Searchable Cascading Select" data={categoryData} placeholder="Search categories" searchable />
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

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <CascadingSelect label="Full Width Cascading Select" data={simpleHierarchyData} placeholder="Select option" fullWidth />
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

export const DeepHierarchy: Story = {
  render: () => {
    const deepData = [
      {
        option: { value: 'company', label: 'Company' },
        icon: '🏢',
        children: [
          {
            option: { value: 'departments', label: 'Departments' },
            icon: '🏛️',
            children: [
              {
                option: { value: 'engineering', label: 'Engineering' },
                icon: '⚙️',
                children: [
                  {
                    option: { value: 'frontend', label: 'Frontend' },
                    icon: '💻',
                    children: [
                      { option: { value: 'react', label: 'React Team' }, icon: '⚛️' },
                      { option: { value: 'vue', label: 'Vue Team' }, icon: '💚' },
                    ],
                  },
                  {
                    option: { value: 'backend', label: 'Backend' },
                    icon: '🔧',
                    children: [
                      { option: { value: 'node', label: 'Node.js Team' }, icon: '🟢' },
                      { option: { value: 'python', label: 'Python Team' }, icon: '🐍' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return <CascadingSelect label="Deep Hierarchy Example" data={deepData} placeholder="Navigate through company structure" searchable />;
  },
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const CustomStyles: Story = {
  render: () => (
    <Group gap="2rem">
      <CascadingSelect
        label="Custom Styled Cascading Select"
        data={simpleHierarchyData}
        placeholder="Select option"
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
      <CascadingSelect
        label="Another Custom Style"
        data={simpleHierarchyData}
        placeholder="Select option"
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
