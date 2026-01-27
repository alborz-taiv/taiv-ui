import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnConfig, Table } from './Table';
import { Badge } from '../../Info/Badge/Badge';
import { Button } from '../../Inputs/Buttons/Button/Button';
import React from 'react';

const meta: Meta<typeof Table> = {
  title: 'Layouts/Table',
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
const UserListItem: React.FC<{ data: User; columnConfigs: ColumnConfig[] }> = ({ data, columnConfigs }) => {
  return (
    <tr>
      <td style={columnConfigs[0]}>{data.name}</td>
      <td style={columnConfigs[1]}>{data.email}</td>
      <td style={columnConfigs[2]}>{data.role}</td>
      <td style={columnConfigs[3]}>
        <Badge color={data.status === 'active' ? 'success' : 'neutral'} variant="filled" size="sm">
          {data.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </td>
      <td style={columnConfigs[4]}>{data.lastLogin}</td>
    </tr>
  );
};

const ProductListItem: React.FC<{ data: Product; columnConfigs: ColumnConfig[] }> = ({ data, columnConfigs }) => {
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
      <td style={columnConfigs[0]}>{data.name}</td>
      <td style={columnConfigs[1]}>{data.category}</td>
      <td style={columnConfigs[2]}>${data.price.toFixed(2)}</td>
      <td style={columnConfigs[3]}>{data.stock}</td>
      <td style={columnConfigs[4]}>
        <Badge color={getStatusColor(data.status)} variant="filled" size="sm">
          {getStatusLabel(data.status)}
        </Badge>
      </td>
      <td style={columnConfigs[5]}>
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

const ProjectListItem: React.FC<{ data: Project; columnConfigs: ColumnConfig[] }> = ({ data, columnConfigs }) => {
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
      <td style={columnConfigs[0]}>{data.title}</td>
      <td style={columnConfigs[1]}>{data.team.join(', ')}</td>
      <td style={columnConfigs[2]}>
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
      <td style={columnConfigs[3]}>{data.deadline}</td>
      <td style={columnConfigs[4]}>
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
      { heading: 'Name', width: '25%' },
      { heading: 'Email', width: '30%' },
      { heading: 'Role', width: '20%' },
      { heading: 'Status', width: '15%' },
      { heading: 'Last Login', width: '10%' },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown; columnConfigs: ColumnConfig[] }>,
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
      { heading: 'Product Name', width: '20%' },
      { heading: 'Category', width: '15%' },
      { heading: 'Price', width: '15%' },
      { heading: 'Stock', width: '10%', textAlign: 'center' },
      { heading: 'Status', width: '15%' },
      { heading: 'Actions', width: '25%', textAlign: 'center' },
    ],
    data: productData,
    ListItem: ProductListItem as React.ComponentType<{ data: unknown; columnConfigs: ColumnConfig[] }>,
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
      { heading: 'Project Title', width: '25%' },
      { heading: 'Team Members', width: '25%' },
      { heading: 'Progress', width: '20%' },
      { heading: 'Deadline', width: '15%' },
      { heading: 'Priority', width: '15%' },
    ],
    data: projectData,
    ListItem: ProjectListItem as React.ComponentType<{ data: unknown; columnConfigs: ColumnConfig[] }>,
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
      { heading: 'Name', width: '25%', paddingLeft: '20px', fontWeight: '600' },
      { heading: 'Email', width: '30%', textAlign: 'left' },
      { heading: 'Role', width: '20%', textAlign: 'center' },
      { heading: 'Status', width: '15%', textAlign: 'center' },
      { heading: 'Last Login', width: '10%', textAlign: 'right', paddingRight: '20px' },
    ],
    data: userData,
    ListItem: UserListItem as React.ComponentType<{ data: unknown; columnConfigs: ColumnConfig[] }>,
  },
  parameters: {
    docs: {
      description: {
        story: 'A table with custom column styling including padding, text alignment, and font weights.',
      },
    },
  },
};
