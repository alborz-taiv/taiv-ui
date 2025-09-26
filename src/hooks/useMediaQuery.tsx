import { useMediaQuery as useMantineMediaQuery } from '@mantine/hooks';
import { BREAKPOINTS } from '../constants/breakpoints';

export const useMediaQuery = useMantineMediaQuery;

export const useScreenSize = (): keyof typeof BREAKPOINTS => {
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

export const useMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE}px)`);
export const useTablet = () => useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET}px)`);
export const useLaptop = () => useMediaQuery(`(max-width: ${BREAKPOINTS.LAPTOP}px)`);
export const useDesktop = () => useMediaQuery(`(max-width: ${BREAKPOINTS.DESKTOP}px)`);
export const useWide = () => useMediaQuery(`(max-width: ${BREAKPOINTS.WIDE}px)`);
