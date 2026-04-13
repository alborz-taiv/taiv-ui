import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: { height: 32, ...inputFontSize['sm'], width: 200, minRows: 3, maxRows: 6 },
  md: { height: 40, ...inputFontSize['md'], width: 328, minRows: 4, maxRows: 8 },
  lg: { height: 48, ...inputFontSize['lg'], width: 420, minRows: 6, maxRows: 9 },
} as const;
