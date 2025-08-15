import { primary, neutral, error, success, warning } from '../../../../constants/colors';

export const componentVariants = {
  primary: {
    background: `linear-gradient(to right, ${primary[300]}, ${primary[200]})`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(to right, ${primary[300]}, ${primary[300]})`,
      transition: 'background 0.3s ease-in-out',
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${primary[200]}`,
      color: primary[200],
    },
    '&:disabled': {
      background: neutral[50],
      color: neutral[100],
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
    },
  },
  secondary: {
    background: 'white',
    color: neutral[200],
    border: `1px solid ${neutral[200]}`,
    '&:hover': {
      background: neutral[100],
      border: `1px solid ${neutral[100]}`,
      color: 'white',
    },
    '&:active': {
      background: neutral[100],
      border: `1px solid ${neutral[200]}`,
      color: neutral[200],
    },
    '&:disabled': {
      background: neutral[50],
      border: `1px solid ${neutral[50]}`,
      color: neutral[100],
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: neutral[200],
      },
    },
  },
  cancel: {
    background: error[200],
    color: 'white',
    '&:hover': {
      background: error[100],
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${error[200]}`,
      color: error[200],
    },
    '&:disabled': {
      background: error[50],
      border: `1px solid ${error[50]}`,
      color: 'white',
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
    },
  },
  success: {
    background: success[200],
    color: 'white',
    '&:hover': {
      background: success[100],
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${success[200]}`,
      color: success[200],
    },
    '&:disabled': {
      background: success[50],
      border: `1px solid ${success[50]}`,
      color: 'white',
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
    },
  },
  warning: {
    background: warning[200],
    color: 'white',
    '&:hover': {
      background: warning[100],
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${warning[200]}`,
      color: warning[200],
    },
    '&:disabled': {
      background: warning[50],
      border: `1px solid ${warning[50]}`,
      color: 'white',
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
    },
  },
  text: {
    background: 'transparent',
    color: neutral[200],
    border: 'none',
    padding: '0',
    height: 'auto',
    minWidth: 'unset',
    '&:hover': {
      background: 'transparent',
      color: primary[300],
    },
    '&:active': {
      background: 'transparent',
      color: primary[200],
    },
    '&:disabled': {
      background: 'transparent',
      color: neutral[100],
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: neutral[200],
      },
    },
  },
} as const;
