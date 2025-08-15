import { inputFontSize } from '../../../../constants/font';

export const componentSizes = {
  sm: {
    width: 20,
    trackHeight: 0.4,
    thumbSize: 1,
    labelFontSize: inputFontSize['sm'],
    valueFontSize: inputFontSize['sm'],
    iconSize: 18,
  },
  md: {
    width: 30,
    trackHeight: 0.5,
    thumbSize: 1.25,
    labelFontSize: inputFontSize['md'],
    valueFontSize: inputFontSize['md'],
    iconSize: 22,
  },
  lg: {
    width: 40,
    trackHeight: 0.6,
    thumbSize: 1.5,
    labelFontSize: inputFontSize['lg'],
    valueFontSize: inputFontSize['lg'],
    iconSize: 26,
  },
} as const;
