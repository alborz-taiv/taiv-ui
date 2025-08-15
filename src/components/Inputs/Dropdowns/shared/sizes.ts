import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: {
    height: 3.2,
    ...inputFontSize['sm'],
    inputPadding: '0.25rem 2rem 0.25rem 1rem',
    dropdownPadding: '0.5rem 1rem',
    valuePadding: '1rem 0.8rem 1rem 1rem',
    minWidth: 18,
    maxWidth: 25,
    dropdownHeight: 260,
  },
  md: {
    height: 3.8,
    ...inputFontSize['md'],
    inputPadding: '0.5rem 2.25rem 0.5rem 1rem',
    dropdownPadding: '0.75rem 1.125rem',
    valuePadding: '1.25rem 1rem 1.25rem 1.25rem',
    minWidth: 22,
    maxWidth: 32.8,
    dropdownHeight: 330,
  },
  lg: {
    height: 4.8,
    ...inputFontSize['lg'],
    inputPadding: '0.75rem 2.5rem 0.75rem 1rem',
    dropdownPadding: '1rem 1.5rem',
    valuePadding: '1.25rem 1rem 1.25rem 1.25rem',
    minWidth: 30,
    maxWidth: 42,
    dropdownHeight: 385,
  },
};
