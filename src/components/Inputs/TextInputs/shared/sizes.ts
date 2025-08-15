import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: { height: 3.2, ...inputFontSize['sm'], width: 20, minRows: 3, maxRows: 6 },
  md: { height: 4, ...inputFontSize['md'], width: 32.8, minRows: 4, maxRows: 8 },
  lg: { height: 4.8, ...inputFontSize['lg'], width: 42, minRows: 6, maxRows: 9 },
} as const;
