import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconLayoutGrid,
  IconMovie,
  IconPhoto,
  IconSparkles,
  IconTypography,
} from '@tabler/icons-react';
import { useState } from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Text } from '../../Typography/Text/Text';
import { BottomActionBar } from './BottomActionBar';

const meta: Meta<typeof BottomActionBar> = {
  component: BottomActionBar,
  parameters: {
    docs: {
      description: {
        component:
          'Bottom-pinned launcher of icon+label cells. Columns are evenly distributed (`1fr` per item). Acts as the shell for slide-editor tool sheets; pair with `MobileDrawer` + `bottomOffset={height}` so sheets stack on top rather than overlap.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Layout/BottomActionBar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeUp: Story = {
  render: () => {
    const [active, setActive] = useState('layout');
    return (
      <BottomActionBar
        items={[
          {
            active: active === 'layout',
            icon: <IconLayoutGrid size={20} />,
            id: 'layout',
            label: 'Layout',
            onClick: () => setActive('layout'),
          },
          {
            active: active === 'text',
            icon: <IconTypography size={20} />,
            id: 'text',
            label: 'Text',
            onClick: () => setActive('text'),
          },
          {
            active: active === 'media',
            icon: <IconPhoto size={20} />,
            id: 'media',
            label: 'Media',
            onClick: () => setActive('media'),
          },
        ]}
      />
    );
  },
};

export const FourUp: Story = {
  render: () => {
    const [active, setActive] = useState('text');
    return (
      <BottomActionBar
        items={[
          {
            active: active === 'layout',
            icon: <IconLayoutGrid size={20} />,
            id: 'layout',
            label: 'Layout',
            onClick: () => setActive('layout'),
          },
          {
            active: active === 'text',
            icon: <IconTypography size={20} />,
            id: 'text',
            label: 'Text',
            onClick: () => setActive('text'),
          },
          {
            active: active === 'media',
            icon: <IconMovie size={20} />,
            id: 'media',
            label: 'Media',
            onClick: () => setActive('media'),
          },
          {
            active: active === 'animate',
            icon: <IconSparkles size={20} />,
            id: 'animate',
            label: 'Animate',
            onClick: () => setActive('animate'),
          },
        ]}
      />
    );
  },
};

export const WithContentAbove: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ padding: spacing.lg }}>
        <Text>
          Scroll content sits above the bar. Use `paddingBottom` on the page
          wrapper so nothing is occluded by the fixed bar.
        </Text>
        {Array.from({ length: 30 }, (_, i) => `row-${i + 1}`).map((key, i) => (
          <Text
            key={key}
            style={{ color: neutral[200], padding: `${spacing.xs} 0` }}
            variant='subtle'
          >
            Row {i + 1}
          </Text>
        ))}
      </div>
      <BottomActionBar
        items={[
          { icon: <IconLayoutGrid size={20} />, id: 'layout', label: 'Layout' },
          { icon: <IconTypography size={20} />, id: 'text', label: 'Text' },
          { icon: <IconPhoto size={20} />, id: 'media', label: 'Media' },
        ]}
      />
    </div>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <BottomActionBar
      items={[
        { icon: <IconLayoutGrid size={20} />, id: 'layout', label: 'Layout' },
        { icon: <IconTypography size={20} />, id: 'text', label: 'Text' },
        {
          disabled: true,
          icon: <IconSparkles size={20} />,
          id: 'animate',
          label: 'Animate',
        },
      ]}
    />
  ),
};
