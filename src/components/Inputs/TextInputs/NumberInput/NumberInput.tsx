import {
  NumberInput as MantineNumberInput,
  type NumberInputProps as MantineNumberInputProps,
  type NumberInputHandlers,
} from '@mantine/core';
import type { CSSObject } from '@mantine/styles';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { Group } from '../../../Layout/Group/Group';
import { Button } from '../../Buttons/Button/Button';
import { componentSizes } from '../shared/sizes';

interface NumberInputProps extends MantineNumberInputProps {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
  exposed?: boolean;
}

const NumberInput = ({
  size = 'md',
  width,
  fullWidth = false,
  styles,
  step = 1,
  exposed = false,
  ...props
}: NumberInputProps) => {
  const selectedSize = componentSizes[size as keyof typeof componentSizes];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}px`;
  const hasError = !!props.error;

  const handlers = useRef<NumberInputHandlers>();

  const style: Record<string, CSSObject> = {
    control: {
      '& svg': {
        height: '12px',
        width: '20px',
      },
      '&:hover': {
        cursor: 'pointer',
      },
      background: 'transparent',
      border: 'none',
      color: hasError ? red[200] : neutral[200],
      flex: '0 0 auto',
      height: '12px',
      width: '20px',
    },
    error: {
      ...fontBase,
      color: red[200],
      fontSize: `calc(${selectedSize.fontSize} - 0.5px)`,
    },
    input: {
      fontSize: selectedSize.fontSize,
      height: `${selectedSize.height}px`,
      padding: '0 10px',
      ...fontBase,
      '&[data-invalid]': {
        '&::placeholder': {
          color: red[200],
        },
        borderColor: red[200],
        color: neutral[200],
      },
      borderRadius: '8px',
      color: neutral[200],
      transition: 'all 200ms ease-in-out',
    },
    label: {
      ...fontBase,
      color: neutral[200],
      fontSize: `calc(${selectedSize.fontSize} - 0.5px)`,
    },
    rightSection: {
      alignItems: 'center',
      gap: 0,
      height: 'auto',
      margin: 'auto 0',
      width: '48px',
    },
    ...styles,
  };

  return exposed ? (
    <Group align='flex-end'>
      <Button
        onClick={() => handlers.current?.decrement()}
        size={size}
        sx={{
          minWidth: `${selectedSize.height}px`,
          padding: 0,
          width: `${selectedSize.height}px`,
        }}
        variant='secondary'
      >
        <IconMinus />
      </Button>
      <MantineNumberInput
        handlersRef={handlers}
        hideControls={true}
        size={size}
        step={step}
        styles={style}
        type='number'
        w={computedWidth}
        {...props}
      />
      <Button
        onClick={() => handlers.current?.increment()}
        size={size}
        sx={{
          minWidth: `${selectedSize.height}px`,
          padding: 0,
          width: `${selectedSize.height}px`,
        }}
        variant='secondary'
      >
        <IconPlus />
      </Button>
    </Group>
  ) : (
    <MantineNumberInput
      hideControls={false}
      size={size}
      step={step}
      styles={style}
      type='number'
      w={computedWidth}
      {...props}
    />
  );
};

export { NumberInput };
