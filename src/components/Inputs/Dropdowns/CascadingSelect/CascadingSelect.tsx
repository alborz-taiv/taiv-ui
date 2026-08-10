import React from 'react';
import { Box, Group } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, primary } from '../../../../constants/colors';
import { componentSizes } from '../shared/sizes';
import { Select, SelectProps } from '../Select/Select';
import { Text } from '../../../Typography/Text/Text';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { SelectOption } from '../../../../utils/select';

export type CascadingSelectItemProps = {
  option: SelectOption;
  icon?: React.ReactNode;
  children?: CascadingSelectItemProps[];
};

export interface CascadingSelectProps extends Omit<SelectProps, 'value' | 'data'> {
  data?: CascadingSelectItemProps[];
  value?: string | null;
  width?: string | number;
  fullWidth?: boolean;
}

const CascadingSelect = ({ data = [], value, placeholder = 'Select an option', size = 'md', width, fullWidth = false, styles, ...props }: CascadingSelectProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.minWidth}px`;

  // Flatten the hierarchy into a flat array with depth information
  const flattenHierarchy = (items: CascadingSelectItemProps[], depth: number = 0): Array<SelectOption & { depth: number; icon?: React.ReactNode }> => {
    const result: Array<SelectOption & { depth: number; icon?: React.ReactNode }> = [];

    items.forEach((item) => {
      result.push({ ...item.option, depth, icon: item.icon });
      if (item.children && item.children.length > 0) {
        result.push(...flattenHierarchy(item.children, depth + 1));
      }
    });

    return result;
  };

  const flattenedData = flattenHierarchy(data);

  const DropdownItem = ({ value, label, icon, depth, ...others }: SelectOption & { depth: number; icon?: React.ReactNode }) => {
    const indentLevel = depth * 8;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: selectedSize.dropdownPadding,
          borderRadius: '8px',
          transition: 'background-color 200ms ease-in-out',
          cursor: 'pointer',
        }}
        {...others}
      >
        <Group spacing={spacing.xs} sx={{ marginLeft: `${indentLevel}px` }}>
          {icon && <Box sx={{ display: 'flex', alignItems: 'center', color: neutral[200], fontSize: selectedSize.fontSize }}>{icon}</Box>}
          <Text style={{ ...fontBase, color: neutral[200], fontSize: selectedSize.fontSize }}>{label}</Text>
        </Group>
      </Box>
    );
  };

  const style: Record<string, CSSObject> = {
    input: {
      color: neutral[300],
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      transition: 'all 200ms ease-in-out',
      height: `${selectedSize.height}px`,
      ...fontBase,
      fontSize: selectedSize.fontSize,
      padding: selectedSize.inputPadding,
      '&:focus': {
        borderColor: primary[200],
      },
    },
    item: {
      color: neutral[200],
      borderRadius: '8px',
      transition: 'background-color 200ms ease-in-out',
      padding: 0,
      fontSize: selectedSize.fontSize,
      marginBottom: spacing.xxs,
      '&[data-selected]': {
        backgroundColor: primary[25],
        color: neutral[200],
        // Nested (higher-specificity) so this wins over the plain hover rule
        // below when a selected item also picks up keyboard/mouse focus.
        '&:hover, &[data-hovered]': {
          backgroundColor: primary[25],
        },
      },
      '&:hover, &[data-hovered]': {
        backgroundColor: neutral[50],
      },
      '&:not(:hover):not([data-hovered]):not([data-selected])': {
        backgroundColor: 'white',
      },
      ...styles,
    },
  };

  return <Select placeholder={placeholder} width={computedWidth} value={value} size={size} styles={style} itemComponent={DropdownItem} data={flattenedData} {...props} />;
};

export { CascadingSelect };
