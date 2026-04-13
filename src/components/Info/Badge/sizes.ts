import { inputFontSize } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export const badgeSizes = {
  sm: {
    mantineSize: 'md',
    padding: `${spacing.xs} ${spacing.sm}`,
    height: '15px',
    fontSize: inputFontSize['sm'],
    iconSize: 10,
  },
  md: {
    mantineSize: 'lg',
    padding: `${spacing.xs} ${spacing.sm}`,
    height: '25px',
    fontSize: inputFontSize['md'],
    iconSize: 14,
  },
  lg: {
    mantineSize: 'xl',
    padding: `${spacing.xs} ${spacing.sm}`,
    height: '30px',
    fontSize: inputFontSize['lg'],
    iconSize: 16,
  },
};

export type BadgeSize = keyof typeof badgeSizes;
