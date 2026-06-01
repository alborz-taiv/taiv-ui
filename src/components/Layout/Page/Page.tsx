import { Container, type ContainerProps } from '@mantine/core';
import { useMobile } from '../../../hooks';

export interface PageProps extends Omit<ContainerProps, 'size'> {
  /** Max content width on desktop. Default '1300px'. */
  maxWidth?: string | number;
}

/**
 * Standard page wrapper. Caps content width on desktop and tightens
 * horizontal padding on mobile so narrow viewports don't waste real estate.
 * Pages should render `<Page><Stack>...</Stack></Page>` as their outermost
 * structural element.
 */
export const Page = ({
  children,
  maxWidth = '1300px',
  ...props
}: PageProps) => {
  const isMobile = useMobile();
  return (
    <Container
      my='24px'
      px={isMobile ? '12px' : '32px'}
      size={maxWidth}
      {...props}
    >
      {children}
    </Container>
  );
};
