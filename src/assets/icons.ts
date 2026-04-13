import React from 'react';
  import {
    IconArrowDown,
    IconArrowUp,
    IconCodeVariablePlus,
    IconCaretDownFilled,
    IconCaretUpFilled,
    IconCircleFilled,
    IconDeviceTv,
    IconEdit,
    IconHistory,
    IconPlus,
    IconRefresh,
    IconReload,
    IconSwitchHorizontal,
    IconTerminal2,
    IconTransfer,
    IconTrash,
    IconVolume,
    IconVolume2,
    IconVolume3,
  } from '@tabler/icons-react';
  import { colors } from '../constants/colors';

  export const GoogleIcon = ({ size = 18 }: { size?: number }) =>
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', width: size, height: size },
      React.createElement('path', { fill: '#4285F4', d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' }),
      React.createElement('path', { fill: '#34A853', d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' }),
      React.createElement('path', { fill: '#FBBC05', d: 'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' }),
      React.createElement('path', { fill: '#EA4335', d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' }),
    );

  export const actions = [
    [ IconPlus, 'Add' ],
    [ IconTrash, 'Delete' ],
    [ IconEdit, 'Edit' ],
    [ IconRefresh, 'Refresh' ],
    [ IconReload, 'Reboot Device' ],
    [ IconHistory, 'Reset Factory Settings' ],
    [ IconTerminal2, 'Dashboard Shell' ],
    [ IconSwitchHorizontal, 'Swap Device' ],
    [ IconTransfer, 'Swap Device' ],
    [ IconDeviceTv, 'Device Peripherals' ],
    [ 'fas fa-plus', 'Add' ],
    [ 'fas fa-trash-alt', 'Delete' ],
    [ 'fas fa-upload', 'Upload' ],
    [ 'fas fa-power-off', 'Power On/Off' ],
];

export const controls = [
    [IconArrowDown, 'Sort Ascending'],
    [IconArrowUp, 'Sort Descending'],
    [IconCaretDownFilled, 'Expand'],
    [IconCaretUpFilled, 'Collapse'],
    [ IconVolume3, 'Volume Muted' ],
    [ IconVolume2, 'Volume Low' ],
    [ IconVolume, 'Volume High' ],
    [ 'fas fa-search', 'Search' ],
    [ 'fas fa-chevron-right', 'Next' ],
    [ 'fas fa-chevron-left', 'Previous' ],
    [ 'fa fa-times', 'Close' ],
];
  
  export const feedback = [
    [ IconCircleFilled, colors.success[200], 'Status Online' ],
    [ IconCircleFilled, colors.error[200], 'Status Offline' ],
    [ 'fas fa-info-circle', colors.primary[300], 'Info' ],
    [ 'fas fa-circle-question', colors.primary[300], 'Help' ],
    [ 'fas fa-check-circle', colors.success[200], 'Success' ],
    [ 'fas fa-exclamation-triangle', colors.warning[200], 'Warning' ],
    [ 'fas fa-exclamation-circle', colors.error[200], 'Error' ],
    [ 'fas fa-trash-can', colors.error[200], 'Delete' ],
    [ 'fas fa-copy', colors.primary[300], 'Copy to Clipboard' ],
    [ IconCodeVariablePlus, 'Add Device' ],
  ];
  
  export const navigation = [
    [ 'fas fa-desktop', 'TV Control/Devices' ],
    [ 'fas fa-cog', 'Settings' ],
    [ 'fas fa-image', 'Content' ],
    [ 'fas fa-random', 'Playlists' ],
    [ 'fas fa-calendar', 'Schedule' ],
    [ 'fas fa-dollar-sign', 'Payouts' ],
    [ 'fa fa-ban', 'Ad Preferences' ],
    [ 'fas fa-object-group', 'Device Groups' ],
    [ 'fas fa-lock', 'Super Admin' ],
    [ 'fas fa-external-link-square-alt', 'Open External Link' ],
    [ 'fas fa-sign-out-alt', 'Sign Out' ],
  ];
  
  export const ssoProviders = [
    [ GoogleIcon, 'Google' ],
  ];

  export const icons = [...actions, ...controls, ...feedback, ...navigation, ...ssoProviders];