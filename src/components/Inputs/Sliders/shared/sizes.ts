import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: {
    width: 200,
    trackHeight: 4,
    thumbSize: 10,
    labelFontSize: inputFontSize['sm'],
    valueFontSize: inputFontSize['sm'],
    iconSize: 18,
  },
  md: {
    width: 300,
    trackHeight: 5,
    thumbSize: 12.5,
    labelFontSize: inputFontSize['md'],
    valueFontSize: inputFontSize['md'],
    iconSize: 22,
  },
  lg: {
    width: 400,
    trackHeight: 6,
    thumbSize: 15,
    labelFontSize: inputFontSize['lg'],
    valueFontSize: inputFontSize['lg'],
    iconSize: 26,
  },
} as const;
