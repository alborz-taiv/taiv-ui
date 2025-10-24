import React from 'react';
import { primary, error, success, warning } from '../../../constants/colors';
import { Loader } from '../../Layout/Loader/Loader';

export const componentVariants = {
  success: {
    defaultTitle: 'Success!',
    color: success[200],
    icon: <i className="fas fa-check-circle" style={{ color: success[200] }} />,
    autoClose: 4000,
  },
  error: {
    defaultTitle: 'Oops!',
    color: error[100],
    icon: <i className="fas fa-exclamation-circle" style={{ color: error[100] }} />,
    autoClose: false,
  },
  warning: {
    defaultTitle: 'Warning',
    color: warning[100],
    icon: <i className="fas fa-exclamation-triangle" style={{ color: warning[100] }} />,
    autoClose: 4000,
  },
  info: {
    defaultTitle: 'Note',
    color: primary[200],
    icon: <i className="fas fa-info-circle" style={{ color: primary[200] }} />,
    autoClose: 4000,
  },
  loading: {
    defaultTitle: 'Loading...',
    color: primary[200],
    icon: <Loader size="md" color={primary[200]} />,
    autoClose: false,
  },
  copy: {
    defaultTitle: 'Copied to clipboard!',
    color: primary[300],
    icon: <i className="fas fa-copy" style={{ color: primary[300] }} />,
    autoClose: 4000,
  },
} as const;
