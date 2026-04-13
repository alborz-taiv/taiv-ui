import React from 'react';
import { Notifications } from '@mantine/notifications';
import { createStyles } from '@mantine/core';
import { neutral } from '../../../../constants/colors';
import { spacing } from '../../../../constants/spacing';
import { useMobile } from '../../../../hooks/useMediaQuery';

export const NotificationProvider = () => {
  const isMobile = useMobile();

  const { classes } = createStyles(() => ({
    root: {
      zIndex: 2000,
      '& .mantine-Notification-root': {
        backgroundColor: 'white',
        padding: `${spacing.md} ${spacing.lg}`,
        minHeight: 'auto',
        borderRadius: '0 8px 8px 0',
      },
      '& .mantine-Notification-title': {
        fontSize: '15px',
        fontWeight: 500,
        fontFamily: 'Poppins, sans-serif !important',
        color: neutral[300],
      },
      '& .mantine-Notification-description': {
        fontSize: '12.5px',
        color: neutral[200],
        fontFamily: 'Poppins, sans-serif !important',
        lineHeight: 1.4,
      },
      '& .mantine-Notification-icon': {
        marginRight: spacing.lg,
        marginLeft: spacing.sm,
        fontSize: '20px',
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
