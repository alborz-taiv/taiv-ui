import React from 'react';
import {
  Accordion as MantineAccordion,
  AccordionProps as MantineAccordionProps,
  CSSObject,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { colors } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface AccordionProps
  extends Omit<MantineAccordionProps, 'chevron' | 'styles' | 'multiple' | 'value' | 'defaultValue' | 'onChange'> {
  chevron?: React.ReactNode;
  styles?: Record<string, CSSObject>;
  multiple?: boolean;
  value?: string | string[] | null;
  defaultValue?: string | string[];
  onChange?: (value: string | string[] | null) => void;
}

const AccordionComponent = ({ chevron, styles, ...props }: AccordionProps) => {
  const style: Record<string, CSSObject> = {
    root: {
      width: '100%',
    },
    item: {
      border: 'none',
      borderBottom: `1px solid ${colors.neutral[100]}`,
      backgroundColor: 'transparent',
      '&:first-of-type': {
        borderTop: `1px solid ${colors.neutral[100]}`,
      },
      '&[data-active]': {
        backgroundColor: 'transparent',
      },
    },
    control: {
      padding: `${spacing.md} ${spacing.lg}`,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: colors.neutral[25],
      },
      '&:focus-visible': {
        outline: `2px solid ${colors.primary[200]}`,
        outlineOffset: '-2px',
      },
    },
    chevron: {
      color: colors.neutral[200],
      transition: 'transform 200ms ease',
      '&[data-rotate]': {
        transform: 'rotate(90deg)',
      },
    },
    label: {
      ...fontBase,
      ...fontSize['md'],
      color: colors.neutral[300],
    },
    panel: {
      padding: `0 ${spacing.lg} ${spacing.md}`,
    },
    ...styles,
  };

  return (
    <MantineAccordion
      chevron={chevron ?? <IconChevronRight size={16} />}
      chevronPosition='right'
      styles={style}
      {...props}
    />
  );
};

export const Accordion = Object.assign(AccordionComponent, {
  Item: MantineAccordion.Item,
  Control: MantineAccordion.Control,
  Panel: MantineAccordion.Panel,
});
