import React from 'react';
import { error, primary, success, warning } from '../../../constants/colors';
import { Loader } from '../../Layout/Loader/Loader';

export const componentVariants = {
  copy: {
    autoClose: 4000,
    color: primary[200],
    defaultTitle: 'Copied to clipboard!',
    icon: <i className='fas fa-copy' style={{ color: primary[200] }} />,
  },
  error: {
    autoClose: false,
    color: error[100],
    defaultTitle: 'Oops!',
    icon: (
      <i className='fas fa-exclamation-circle' style={{ color: error[100] }} />
    ),
  },
  info: {
    autoClose: 4000,
    color: primary[200],
    defaultTitle: 'Note',
    icon: <i className='fas fa-info-circle' style={{ color: primary[200] }} />,
  },
  loading: {
    autoClose: false,
    color: primary[200],
    defaultTitle: 'Loading...',
    icon: <Loader color={primary[200]} size='md' />,
  },
  success: {
    autoClose: 4000,
    color: success[300],
    defaultTitle: 'Success!',
    icon: <i className='fas fa-check-circle' style={{ color: success[300] }} />,
  },
  remove: {
    autoClose: 4000,
    color: error[100],
    defaultTitle: 'Removed',
    icon: <i className='fas fa-circle-minus' style={{ color: error[100] }} />,
  },
  warning: {
    autoClose: 4000,
    color: warning[100],
    defaultTitle: 'Warning',
    icon: (
      <i
        className='fas fa-exclamation-triangle'
        style={{ color: warning[100] }}
      />
    ),
  },
  lock: {
    autoClose: 4000,
    color: warning[100],
    defaultTitle: 'Locked',
    icon: <i className='fas fa-lock' style={{ color: warning[100] }} />,
  },
  unlock: {
    autoClose: 4000,
    color: success[300],
    defaultTitle: 'Unlocked',
    icon: <i className='fas fa-lock-open' style={{ color: success[300] }} />,
  },
} as const;
