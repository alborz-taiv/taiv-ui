import { fontSize } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';

const componentSizes = {
  sm: { height: 30, ...fontSize['sm'], padding: `${spacing.sm} 18px`, minWidth: 68 },
  md: { height: 40, ...fontSize['md'], padding: `${spacing.sm} ${spacing.xl}`, minWidth: 112 },
  lg: { height: 48, ...fontSize['lg'], padding: `${spacing.sm} 40px`, minWidth: 152 },
};

export { componentSizes };
