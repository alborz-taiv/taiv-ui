import React from 'react';
import { Transition as MantineTransition, TransitionProps as MantineTransitionProps } from '@mantine/core';

const Transition = (props: MantineTransitionProps) => {
  return <MantineTransition {...props} />;
};

export { Transition };
