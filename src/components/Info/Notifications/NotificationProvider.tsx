import React from 'react';
import { Notifications } from '@mantine/notifications';
import { createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { neutral } from '../../../constants/colors';

export const NotificationProvider = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { classes } = createStyles(() => ({
    root: {
      '& .mantine-Notification-root': {
        backgroundColor: 'white',
        padding: '1.2rem 1.6rem',
        minHeight: 'auto',
        borderRadius: '0 8px 8px 0',
      },
      '& .mantine-Notification-title': {
        fontSize: '1.5rem',
        fontWeight: 500,
        fontFamily: 'Poppins, sans-serif !important',
        color: neutral[300],
      },
      '& .mantine-Notification-description': {
        fontSize: '1.25rem',
        color: neutral[200],
        fontFamily: 'Poppins, sans-serif !important',
        lineHeight: 1.4,
      },
      '& .mantine-Notification-icon': {
        marginRight: '1.5rem',
        marginLeft: '0.75rem',
        fontSize: '2rem',
        backgroundColor: 'transparent !important',
      },
      '& .mantine-Notification-icon > div': {
        backgroundColor: 'transparent !important',
        width: 'auto !important',
        height: 'auto !important',
        borderRadius: '0 !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
      },
    },
  }))();

  return <Notifications position="top-right" className={classes.root} containerWidth={isMobile ? '100%' : 400} />;
};
