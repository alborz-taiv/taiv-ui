import { inputFontSize } from '../../../constants/font';

export const badgeSizes = {
  sm: {
    mantineSize: 'md',
    padding: '4px 8px',
    height: '15px',
    fontSize: inputFontSize['sm'],
    iconSize: 10,
  },
  md: {
    mantineSize: 'lg',
    padding: '4px 8px',
    height: '25px',
    fontSize: inputFontSize['md'],
    iconSize: 14,
  },
  lg: {
    mantineSize: 'xl',
    padding: '4px 8px',
    height: '30px',
    fontSize: inputFontSize['lg'],
    iconSize: 16,
  },
};

export type BadgeSize = keyof typeof badgeSizes;
