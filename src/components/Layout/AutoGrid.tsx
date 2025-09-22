import React from 'react';
import { SimpleGrid, SimpleGridProps } from '@mantine/core';

interface AutoGridProps extends SimpleGridProps {
  children: React.ReactNode;
}

const AutoGrid = ({ children, ...props }: AutoGridProps) => {
  return <SimpleGrid {...props}>{children}</SimpleGrid>;
};

export { AutoGrid };
