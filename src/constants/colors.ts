export const gray = {
  25: '#F8FAFC',
  50: '#EDEDED',
  100: '#D9D9D9',
  200: '#6D6D6D',
  300: '#3F3F3F',
} as const;
export const neutral = gray;

export const blue = {
  25: '#EEFAFF',
  50: '#BDEAFF',
  100: '#74D4FF',
  200: '#00A6F4',
  300: '#0081CE',
} as const;
export const primary = blue;

export const green = {
  25: '#E6F4E7',
  50: '#E6F4E7',
  100: '#00C951',
  200: '#00A63E',
  300: '#008236',
} as const;
export const success = green;

export const yellow = {
  25: '#FFF3E0',
  50: '#FFE5B4',
  100: '#FE9A00',
  200: '#E17100',
  300: '#973C00',
} as const;
export const warning = yellow;

export const red = {
  25: '#FFE5E6',
  50: '#FFD7D9',
  100: '#FB2C36',
  200: '#C10007',
  300: '#9F0712',
} as const;
export const error = red;

// Purple Colors
export const purple = {
  50: '#EFEAFF',
  100: '#D6C8FF',
  200: '#7D63C8',
} as const;

export const salmon = {
  50: '#FFEAE6',
  100: '#FFD1C7',
  200: '#FF806F',
} as const;

// Primary semantic/functional color exports - for use in UI, actions, states, etc. anything that would be affected by theme changes down the line
export const colors = {
  neutral,
  primary,
  success,
  warning,
  error,
} as const;

// Primitive color exports - for purely aesthetic purpose, i.e. icons, backgrounds, etc. anything that we want to hardcode to a specific color
export const primitives = {
  blue,
  green,
  yellow,
  red,
  purple,
  salmon,
  gray,
} as const;
