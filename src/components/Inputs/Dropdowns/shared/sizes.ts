import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: {
    height: 32,
    ...inputFontSize['sm'],
    inputPadding: '2.5px 20px 2.5px 10px',
    dropdownPadding: '5px 10px',
    valuePadding: '10px 8px 10px 10px',
    minWidth: 180,
    maxWidth: 250,
    dropdownHeight: 260,
  },
  md: {
    height: 38,
    ...inputFontSize['md'],
    inputPadding: '5px 22.5px 5px 10px',
    dropdownPadding: '7.5px 11.25px',
    valuePadding: '12.5px 10px 12.5px 12.5px',
    minWidth: 220,
    maxWidth: 328,
    dropdownHeight: 330,
  },
  lg: {
    height: 48,
    ...inputFontSize['lg'],
    inputPadding: '7.5px 25px 7.5px 10px',
    dropdownPadding: '10px 15px',
    valuePadding: '12.5px 10px 12.5px 12.5px',
    minWidth: 300,
    maxWidth: 420,
    dropdownHeight: 385,
  },
};
