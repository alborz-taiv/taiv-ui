import { inputFontSize } from '../../../constants/font';

export const badgeSizes = {
  sm: {
    mantineSize: 'md' as const,
    padding: '0.4rem 0.8rem',
    height: '1.5rem',
    fontSize: inputFontSize['sm'],
    iconSize: 10,
  },
  md: {
    mantineSize: 'lg' as const,
    padding: '0.4rem 0.8rem',
    height: '2.5rem',
    fontSize: inputFontSize['md'],
    iconSize: 14,
  },
  lg: {
    mantineSize: 'xl' as const,
    padding: '0.4rem 0.8rem',
    height: '3rem',
    fontSize: inputFontSize['lg'],
    iconSize: 16,
  },
};

export type BadgeSize = keyof typeof badgeSizes;
