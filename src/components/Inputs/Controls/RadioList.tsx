import React from 'react';
import { Stack } from '../../Layout/Stack';
import { Radio } from './Radio';
import { neutral } from '../../../constants/colors';
import { Group } from '../../Layout/Group';

interface RadioListOption {
  value: string;
  label: string;
  rightContent?: React.ReactNode;
}

interface RadioListProps {
  data: RadioListOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  width?: React.CSSProperties['width'];
}

const RadioList = ({ data, value, onChange, disabled = false, width }: RadioListProps) => {
  const handleChange = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <Stack
      gap="0"
      style={{
        border: `1px solid ${neutral[100]}`,
        borderRadius: '16px',
        overflow: 'hidden',
        padding: '0.2rem 0 0.2rem 0',
        width,
      }}
    >
      {data.map((option, index) => (
        <Group
          key={option.value}
          position="apart"
          style={{
            padding: '1rem 1.2rem 0.8rem 1.2rem',
            borderBottom: index < data.length - 1 ? `1px solid ${neutral[100]}` : 'none',
            backgroundColor: 'white',
          }}
        >
          <Radio value={option.value} label={option.label} checked={value === option.value} onChange={() => handleChange(option.value)} disabled={disabled} />
          {option.rightContent && option.rightContent}
        </Group>
      ))}
    </Stack>
  );
};

export { RadioList };
