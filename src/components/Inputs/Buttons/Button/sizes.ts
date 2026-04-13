import { fontSize } from '../../../../constants/font';

const componentSizes = {
  sm: { height: 30, ...fontSize['sm'], padding: '8px 18px', minWidth: 68 },
  md: { height: 40, ...fontSize['md'], padding: '8px 24px', minWidth: 112 },
  lg: { height: 48, ...fontSize['lg'], padding: '8px 40px', minWidth: 152 },
};

export { componentSizes };
