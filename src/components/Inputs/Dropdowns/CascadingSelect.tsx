import React from 'react';
import { Box, Group } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { componentSizes } from './shared/sizes';
import { Select, SelectProps } from './Select';
import { Text } from '../../Typography/Text';
import { fontBase } from '../../../constants/font';
import { SelectOption } from '../../../utils/select';

export type CascadingSelectItemProps = {
  option: SelectOption;
  icon?: React.ReactNode;
  children?: CascadingSelectItemProps[];
};

export interface NestedSelectProps extends Omit<SelectProps, 'value' | 'data'> {
  data?: CascadingSelectItemProps[];
  value?: string | null;
  width?: string | number;
  fullWidth?: boolean;
}

const NestedSelect = ({ data = [], value, placeholder = 'Select an option', size = 'md', width, fullWidth = false, styles, ...props }: NestedSelectProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.minWidth}rem`;

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
    const indentLevel = depth * 0.8;

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
        <Group spacing="0.5rem" sx={{ marginLeft: `${indentLevel}rem` }}>
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
      height: `${selectedSize.height}rem`,
      ...fontBase,
      fontSize: selectedSize.fontSize,
      padding: selectedSize.inputPadding,
    },
    item: {
      color: neutral[200],
      borderRadius: '8px',
      transition: 'background-color 200ms ease-in-out',
      padding: 0,
      fontSize: selectedSize.fontSize,
      marginBottom: '0.2rem',
      '&[data-selected]': {
        backgroundColor: neutral[50],
        color: neutral[200],
      },
      '&[data-hovered]': {
        backgroundColor: neutral[50],
      },
      '&:not(:hover):not([data-selected])': {
        backgroundColor: 'white',
      },
      '&[data-selected]:hover': {
        backgroundColor: neutral[50],
      },
      ...styles,
    },
  };

  return <Select placeholder={placeholder} width={computedWidth} value={value} size={size} styles={style} itemComponent={DropdownItem} data={flattenedData} {...props} />;
};

export { NestedSelect as CascadingSelect };
