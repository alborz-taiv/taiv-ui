import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBold,
  IconItalic,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import { useState } from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';
import { ColorPickerTrigger } from '../../Inputs/ColorPickerTrigger/ColorPickerTrigger';
import { Select } from '../../Inputs/Dropdowns/Select/Select';
import { Divider } from '../../Layout/Divider/Divider';
import { FloatingToolbar } from './FloatingToolbar';

const meta: Meta<typeof FloatingToolbar> = {
  component: FloatingToolbar,
  parameters: {
    docs: {
      description: {
        component:
          "White pill used as the chrome for Canva-style floating action toolbars. Positioning is the consumer's responsibility — wrap this in a portal / absolute-positioned shell, or use it inline.",
      },
    },
    layout: 'centered',
  },
  title: 'Components/Misc/FloatingToolbar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextToolbar: Story = {
  render: () => {
    const [font, setFont] = useState<string | null>('poppins');
    const [color, setColor] = useState('#1E293B');
    const [fill, setFill] = useState<string | null>('transparent');
    return (
      <FloatingToolbar>
        <Select
          data={[
            { label: 'Poppins', value: 'poppins' },
            { label: 'Inter', value: 'inter' },
            { label: 'Georgia', value: 'georgia' },
          ]}
          onChange={setFont}
          size='sm'
          style={{ width: 140 }}
          value={font}
        />
        <Divider orientation='vertical' />
        <IconButton aria-label='Bold' variant='text'>
          <IconBold size={16} />
        </IconButton>
        <IconButton aria-label='Italic' variant='text'>
          <IconItalic size={16} />
        </IconButton>
        <IconButton aria-label='Underline' variant='text'>
          <IconUnderline size={16} />
        </IconButton>
        <Divider orientation='vertical' />
        <ColorPickerTrigger
          onChange={setColor}
          value={color}
          variant='fontColor'
        />
        <ColorPickerTrigger
          onChange={setFill}
          value={fill}
          variant='fillColor'
        />
        <Divider orientation='vertical' />
        <IconButton aria-label='Delete' variant='text'>
          <IconTrash size={16} />
        </IconButton>
      </FloatingToolbar>
    );
  },
};

export const OverflowScroll: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <FloatingToolbar>
        {Array.from({ length: 12 }, (_, i) => `tool-${i + 1}`).map((key, i) => (
          <IconButton aria-label={`Tool ${i + 1}`} key={key} variant='text'>
            <IconBold size={16} />
          </IconButton>
        ))}
      </FloatingToolbar>
    </div>
  ),
};

export const OverCanvas: Story = {
  render: () => (
    <div
      style={{
        background: neutral[25],
        border: `1px solid ${neutral[50]}`,
        borderRadius: 8,
        height: 320,
        position: 'relative',
        width: 480,
      }}
    >
      <div
        style={{
          left: '50%',
          position: 'absolute',
          top: spacing.md,
          transform: 'translateX(-50%)',
        }}
      >
        <FloatingToolbar>
          <IconButton aria-label='Bold' variant='text'>
            <IconBold size={16} />
          </IconButton>
          <IconButton aria-label='Italic' variant='text'>
            <IconItalic size={16} />
          </IconButton>
          <Divider orientation='vertical' />
          <IconButton aria-label='Delete' variant='text'>
            <IconTrash size={16} />
          </IconButton>
        </FloatingToolbar>
      </div>
    </div>
  ),
};
