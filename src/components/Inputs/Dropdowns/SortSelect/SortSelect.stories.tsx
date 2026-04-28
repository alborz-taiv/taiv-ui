import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  compareByGenericSort,
  GENERIC_SORT_OPTIONS,
  type GenericSortValue,
} from '../../../../utils/sort';
import { Stack } from '../../../Layout/Stack/Stack';
import { Text } from '../../../Typography/Text/Text';
import { SortSelect } from './SortSelect';

const meta: Meta<typeof SortSelect> = {
  component: SortSelect,
  parameters: {
    docs: {
      description: {
        component:
          '`Select` preset for sort UIs — icon + dropdown. Pair with helpers in `@taiv/ui/utils` (`GENERIC_SORT_OPTIONS`, `compareByGenericSort`) for consistent sort behavior across Library, Playlists, and Slides.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Inputs/Dropdowns/SortSelect',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GenericOptions: Story = {
  render: () => {
    const [value, setValue] = useState<GenericSortValue | null>('newest');
    return (
      <SortSelect<GenericSortValue>
        onChange={setValue}
        options={GENERIC_SORT_OPTIONS}
        value={value}
      />
    );
  },
};

type Custom = 'duration-asc' | 'duration-desc' | 'plays-desc';

export const CustomOptions: Story = {
  render: () => {
    const [value, setValue] = useState<Custom | null>('plays-desc');
    return (
      <SortSelect<Custom>
        onChange={setValue}
        options={[
          { label: 'Most plays', value: 'plays-desc' },
          { label: 'Shortest first', value: 'duration-asc' },
          { label: 'Longest first', value: 'duration-desc' },
        ]}
        value={value}
      />
    );
  },
};

export const WithHelperComparator: Story = {
  render: () => {
    const [value, setValue] = useState<GenericSortValue | null>('name-asc');
    const items = [
      { createdAt: '2026-04-10', name: 'Apple ad', updatedAt: '2026-04-20' },
      { createdAt: '2026-03-22', name: 'Nike ad', updatedAt: '2026-04-15' },
      { createdAt: '2026-04-19', name: 'Spotify ad', updatedAt: '2026-04-19' },
    ];
    const sorted = [...items].sort(
      compareByGenericSort<(typeof items)[number]>(value ?? 'newest'),
    );
    return (
      <Stack>
        <SortSelect<GenericSortValue>
          onChange={setValue}
          options={GENERIC_SORT_OPTIONS}
          value={value}
        />
        {sorted.map((item) => (
          <Text key={item.name} variant='body'>
            {item.name}
          </Text>
        ))}
      </Stack>
    );
  },
};
