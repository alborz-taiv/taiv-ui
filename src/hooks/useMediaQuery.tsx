import { useMediaQuery as useMantineMediaQuery } from '@mantine/hooks';
import { breakpoints } from '../constants/breakpoints';

export const useMediaQuery = useMantineMediaQuery;

export const useScreenSize = (): keyof typeof breakpoints => {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isLaptop = useLaptop();
  const isDesktop = useDesktop();

  if (isMobile) return 'MOBILE';
  if (isTablet) return 'TABLET';
  if (isLaptop) return 'LAPTOP';
  if (isDesktop) return 'DESKTOP';
  return 'WIDE';
};

export const useMobile = () => useMediaQuery(`(max-width: ${breakpoints.MOBILE}px)`);
export const useTablet = () => useMediaQuery(`(max-width: ${breakpoints.TABLET}px)`);
export const useLaptop = () => useMediaQuery(`(max-width: ${breakpoints.LAPTOP}px)`);
export const useDesktop = () => useMediaQuery(`(max-width: ${breakpoints.DESKTOP}px)`);
export const useWide = () => useMediaQuery(`(max-width: ${breakpoints.WIDE}px)`);
