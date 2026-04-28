import { IconArrowsSort } from '@tabler/icons-react';
import { neutral } from '../../../../constants/colors';
import { spacing } from '../../../../constants/spacing';
import { GENERIC_SORT_OPTIONS, type SortOption } from '../../../../utils/sort';
import { Group } from '../../../Layout/Group/Group';
import { Select, type SelectProps } from '../Select/Select';

export interface SortSelectProps<V extends string = string>
  extends Omit<SelectProps, 'data' | 'value' | 'onChange' | 'icon'> {
  value: V | null;
  onChange: (value: V | null) => void;
  /**
   * Sort options. Defaults to `GENERIC_SORT_OPTIONS` from `@taiv/ui/utils` —
   * override or extend to fit the consuming project.
   */
  options?: SortOption<V>[];
}

/**
 * `<Select />` preset for sort UIs — pairs a Tabler sort-arrows icon with a
 * Taiv `Select`. Pass `options` to supply domain-specific sort keys or use
 * the default generic set (`newest`, `oldest`, `name-asc`, …) from `utils/sort`.
 */
export const SortSelect = <V extends string = string>({
  value,
  onChange,
  options,
  placeholder = 'Sort by',
  ...props
}: SortSelectProps<V>) => {
  const data = (
    options ?? (GENERIC_SORT_OPTIONS as unknown as SortOption<V>[])
  ).map((o) => ({ label: o.label, value: o.value }));
  return (
    <Group spacing={spacing.xs}>
      <IconArrowsSort color={neutral[200]} size={16} />
      <Select
        data={data}
        onChange={(v) => onChange(v as V | null)}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </Group>
  );
};
