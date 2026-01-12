import React from 'react';
import { primary } from '../../../constants';

import { LoadingOverlay as MantineLoadingOverlay, LoadingOverlayProps as MantineLoadingOverlayProps } from '@mantine/core';

export interface LoadingOverlayProps extends MantineLoadingOverlayProps {
}


export const LoadingOverlay = ({  ...props }: LoadingOverlayProps) => {
    
    return <MantineLoadingOverlay
      {...props}
      overlayBlur={3}
      overlayOpacity={0.5}
      loaderProps={{
        size: 'xl',          
        color: `${primary[200]}`,
      }}
    />
}
