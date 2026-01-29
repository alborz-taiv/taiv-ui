import { primary, neutral, error, success, warning } from '../../../../constants/colors';

// Overrides mantine due to rem difference
const loading = {
  top: '-0.1rem',
  right: '-0.1rem',
  left: '-0.1rem',
  bottom: '-0.1rem',
  borderRadius: '8px',
} as const;

const disabled = {
  background: neutral[50],
  border: `1px solid ${neutral[50]}`,
  color: neutral[100],
} as const;

export const buttonVariants = {
  primary: {
    background: `linear-gradient(to right, ${primary[300]}, ${primary[200]})`,
    border: `1px solid ${primary[200]}`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(to right, ${primary[300]}, ${primary[300]})`,
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${primary[300]}`,
      color: primary[300],
    },
    '&:toggled': {
      background: `${primary[300]}`,
      color: 'white',
    },
    '&:disabled': {
      ...disabled,
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
      '&:before': loading,
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
    '&:toggled': {
      background: neutral[100],
      color: 'neutral[200]',
    },
    '&:disabled': disabled,
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: neutral[200],
      },
      '&:before': loading,
    },
  },
  cancel: {
    background: error[200],
    color: 'white',
    border: `1px solid ${error[200]}`,
    '&:hover': {
      background: error[100],
      border: `1px solid ${error[100]}`,
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${error[100]}`,
      color: error[100],
    },
    '&:toggled': {
      background: error[100],
      color: 'white',
    },
    '&:disabled': disabled,
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
      '&:before': loading,
    },
  },
  success: {
    background: success[200],
    color: 'white',
    border: `1px solid ${success[200]}`,
    '&:hover': {
      background: success[100],
      border: `1px solid ${success[100]}`,
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${success[100]}`,
      color: success[100],
    },
    '&:toggled': {
      background: success[100],
    },
    '&:disabled': disabled,
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
      '&:before': loading,
    },
  },
  warning: {
    background: warning[200],
    color: 'white',
    border: `1px solid ${warning[200]}`,
    '&:hover': {
      background: warning[100],
      border: `1px solid ${warning[100]}`,
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${warning[100]}`,
      color: warning[100],
    },
    '&:toggled': {
      background: warning[100],
    },
    '&:disabled': disabled,
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: 'white',
      },
      '&:before': loading,
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
    '&:toggled': {
      background: 'transparent',
      color: primary[300],
    },
    '&:disabled': {
      background: 'transparent',
      color: neutral[100],
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: neutral[200],
      },
      '&:before': loading,
    },
  },
  nav: {
    background: 'white',
    paddingLeft: '0.8rem',
    color: neutral[200],
    '& .mantine-Button-inner': {
      justifyContent: 'flex-start',
    },
    '&:hover': {
      background: neutral[50],
    },
    '&:active': {
      background: neutral[100],
      color: neutral[200],
    },
    '&:toggled': {
      background: neutral[50],
      color: neutral[200],
    },
    '&:disabled': {
      background: neutral[50],
      color: neutral[100],
    },
    '&[data-loading]': {
      '& .mantine-Button-icon svg': {
        stroke: neutral[200],
      },
      '&:before': loading,
    },
  },
} as const;

export const subtleVariants = {
  primary: {
    ...buttonVariants.primary,
    background: 'white',
    color: primary[200],
    '&:hover': {
      background: primary[100],
      transition: 'background 0.3s ease-in-out',
    },
    '&:active': {
      background: 'white',
      border: `1px solid ${primary[200]}`,
      color: primary[200],
    },
    '&:toggled': {
      background: primary[300],
      color: 'white',
    },
  },
  secondary: {
    ...buttonVariants.secondary,
    background: 'white',
    color: neutral[200],
    border: `1px solid ${neutral[50]}`,
  },
  cancel: {
    ...buttonVariants.cancel,
    background: 'white',
    color: error[200],
  },
  success: {
    ...buttonVariants.success,
    background: 'white',
    color: success[200],
  },
  warning: {
    ...buttonVariants.warning,
    background: 'white',
    color: warning[200],
  },
  text: {
    ...buttonVariants.text,
    background: 'transparent',
    color: neutral[200],
    border: 'none',
    padding: '0',
    height: 'auto',
    minWidth: 'unset',
  },
  nav: {
    ...buttonVariants.nav,
    background: 'white',
    paddingLeft: '0.8rem',
    color: neutral[200],
    border: 'none',
  },
} as const;