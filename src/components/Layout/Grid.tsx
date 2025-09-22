import React from 'react';
import { Grid as MantineGrid, GridProps as MantineGridProps } from '@mantine/core';

interface GridProps extends MantineGridProps {
  children: React.ReactNode;
}

const GridComponent = ({ children, ...props }: GridProps) => {
  return <MantineGrid {...props}>{children}</MantineGrid>;
};

const Grid = Object.assign(GridComponent, {
  Col: MantineGrid.Col,
});

export { Grid };
