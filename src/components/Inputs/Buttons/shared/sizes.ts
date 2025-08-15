import { fontSize } from '../../../../constants/font';

const componentSizes = {
  sm: { height: 3, ...fontSize['sm'], padding: '0.8rem 1.8rem', minWidth: 6.8 },
  md: { height: 4, ...fontSize['md'], padding: '0.8rem 2.4rem', minWidth: 11.2 },
  lg: { height: 4.8, ...fontSize['lg'], padding: '0.8rem 4rem', minWidth: 15.2 },
};

export { componentSizes };
