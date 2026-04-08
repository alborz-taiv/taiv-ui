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
  
  export const icons = [...actions, ...controls, ...feedback, ...navigation];