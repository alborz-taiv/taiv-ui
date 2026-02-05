import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { Badge } from '../../Info/Badge/Badge';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Text } from '../../Typography/Text/Text';
import React from 'react';
import { Center } from '../Center/Center';
import { IconInfoCircle } from '@tabler/icons-react';
import { neutral } from '../../../constants/colors';
import { Group } from '../Group/Group';

const meta: Meta<typeof Table> = {
  title: 'Components/Layout/Table',
  component: Table,
  argTypes: {
    columnConfigs: {
      control: { type: 'object' },
      description: 'Array of column configurations with headings and styles',
    },
    data: {
      control: { type: 'object' },
      description: 'Array of data items to display',
    },
    ListItem: {
      control: false,
      description: 'Component that renders each table row',
    },
    placeholder: {
      control: { type: 'object' },
      description: 'Placeholder to display when no data is available',
    },
    shadow: {
      control: { type: 'boolean' },
      description: 'Adds shadow to the table',
    },
    divider: {
      control: { type: 'boolean' },
      description: 'Adds divider between rows to the table',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface Project {
  id: string;
  title: string;
  team: string[];
  progress: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock data
const userData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-15',
  },
];

const productData: Product[] = [
  {
    id: '1',
    name: 'Premium Widget',
    category: 'Electronics',
    price: 99.99,
    stock: 150,
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Standard Widget',
    category: 'Electronics',
    price: 49.99,
    stock: 3,
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Basic Widget',
    category: 'Accessories',
    price: 19.99,
    stock: 0,
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Deluxe Widget',
    category: 'Electronics',
    price: 149.99,
    stock: 45,
    status: 'in-stock',
  },
];

const projectData: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    team: ['Alice', 'Bob', 'Charlie'],
    progress: 75,
    deadline: '2024-02-15',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Mobile App Update',
    team: ['David', 'Eve'],
    progress: 45,
    deadline: '2024-03-01',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'API Documentation',
    team: ['Frank', 'Grace'],
    progress: 90,
    deadline: '2024-01-20',
    priority: 'low',
  },
];

// ListItem Components
const UserListItem = ({ data }: { data: User }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.role}</td>
      <td>
        <Badge color={data.status === 'active' ? 'success' : 'neutral'} variant="filled" size="sm">
          {data.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td>{data.lastLogin}</td>
    </tr>
  );
};

const ProductListItem = ({ data }: { data: Product }) => {
  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return 'success';
      case 'low-stock':
        return 'warning';
      case 'out-of-stock':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'out-of-stock':
        return 'Out of Stock';
      default:
        return status;
    }
  };

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.category}</td>
      <td>${data.price.toFixed(2)}</td>
      <td>{data.stock}</td>
      <td>
        <Badge color={getStatusColor(data.status)} variant="filled" size="sm">
          {getStatusLabel(data.status)}
        </Badge>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="primary">
            Edit
          </Button>
          <Button size="sm" variant="secondary">
            View
          </Button>
        </div>
      </td>
    </tr>
  );
};

const ProjectListItem = ({ data }: { data: Project }) => {
  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.team.join(', ')}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${data.progress}%`,
                height: '100%',
                backgroundColor: data.progress >= 75 ? '#4caf50' : data.progress >= 50 ? '#ff9800' : '#f44336',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '12px', minWidth: '35px' }}>{data.progress}%</span>
        </div>
      </td>
      <td>{data.deadline}</td>
      <td>
        <Badge color={getPriorityColor(data.priority)} variant="outline" size="sm">
          {data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}
        </Badge>
      </td>
    </tr>
  );
};

// Stories
export const BasicTable: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '25%' } },
      { heading: 'Email', style: { width: '30%' } },
      { heading: 'Role', style: { width: '20%' } },
      { heading: 'Status', style: { width: '15%' } },
      { heading: 'Last Login', style: { width: '10%' } },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown }>,
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic table displaying user information with text fields and status badges.',
      },
    },
  },
};

export const TableWithCustomComponents: Story = {
  args: {
    columnConfigs: [
      { heading: 'Product Name', style: { width: '20%' } },
      { heading: 'Category', style: { width: '15%' } },
      { heading: 'Price', style: { width: '15%' } },
      { heading: 'Stock', style: { width: '10%', textAlign: 'center' } },
      { heading: 'Status', style: { width: '15%' } },
      { heading: 'Actions', style: { width: '25%', textAlign: 'center' } },
    ],
    data: productData,
    ListItem: ProductListItem as React.ComponentType<{ data: unknown }>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A table showcasing custom components including badges for status and action buttons. This demonstrates the versatility of the Table component.',
      },
    },
  },
};

export const TableWithProgressBars: Story = {
  args: {
    columnConfigs: [
      { heading: 'Project Title', style: { width: '25%' } },
      { heading: 'Team Members', style: { width: '25%' } },
      { heading: 'Progress', style: { width: '20%' } },
      { heading: 'Deadline', style: { width: '15%' } },
      { heading: 'Priority', style: { width: '15%' } },
    ],
    data: projectData,
    ListItem: ProjectListItem as React.ComponentType<{ data: unknown }>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A table with custom progress bars and priority badges, showing how complex UI elements can be integrated into table cells.',
      },
    },
  },
};

export const StyledColumns: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '25%', paddingLeft: '20px', fontWeight: '600' } },
      { heading: 'Email', style: { width: '30%', textAlign: 'left' } },
      { heading: 'Role', style: { width: '20%', textAlign: 'center' } },
      { heading: 'Status', style: { width: '15%', textAlign: 'center' } },
      { heading: 'Last Login', style: { width: '10%', textAlign: 'right', paddingRight: '20px' } },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown }>,
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with custom column styling including padding, text alignment, and font weights.',
      },
    },
  },
};

export const TableWithPlaceholder: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '50%' } },
      { heading: 'Email', style: { width: '50%' } },
    ],
    placeholder: (
      <Center py='5rem'>
        <Group gap='0.5rem' align='center'>
          <IconInfoCircle color={neutral[200]} size='2rem' />
          <Text>No data available at this time</Text>
        </Group>
      </Center>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with a placeholder displayed when no data is available.',
      },
    },
  },
};

export const TableWithoutPlaceholder: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '50%' } },
      { heading: 'Email', style: { width: '50%' } },
    ],
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with no placeholder displayed when no data is available.',
      },
    },
  },
};

export const TableWithShadow: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '25%', paddingLeft: '20px', fontWeight: '600' } },
      { heading: 'Email', style: { width: '30%', textAlign: 'left' } },
      { heading: 'Role', style: { width: '20%', textAlign: 'center' } },
      { heading: 'Status', style: { width: '15%', textAlign: 'center' } },
      { heading: 'Last Login', style: { width: '10%', textAlign: 'right', paddingRight: '20px' } },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown }>,
    shadow: true,
  },
};

export const TableWithoutDivider: Story = {
  args: {
    columnConfigs: [
      { heading: 'Name', style: { width: '25%', paddingLeft: '20px', fontWeight: '600' } },
      { heading: 'Email', style: { width: '30%', textAlign: 'left' } },
      { heading: 'Role', style: { width: '20%', textAlign: 'center' } },
      { heading: 'Status', style: { width: '15%', textAlign: 'center' } },
      { heading: 'Last Login', style: { width: '10%', textAlign: 'right', paddingRight: '20px' } },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown }>,
    divider: false,
  },
};
