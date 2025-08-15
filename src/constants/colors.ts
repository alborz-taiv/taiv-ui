// Neutral Colors - Grays
export const neutral = {
  25: '#F8FAFC',
  50: '#EDEDED',
  100: '#D9D9D9',
  200: '#6D6D6D',
  300: '#3F3F3F',
} as const;

// Primary Colors - Blues
export const primary = {
  25: '#EEFAFF',
  50: '#BDEAFF',
  100: '#74D4FF',
  200: '#00A6F4',
  300: '#0081CE',
} as const;

// Secondary Colors - Blues (temp)
export const secondary = {
  50: '#E8F5E9',
  100: '#C8E6C9',
  200: '#81C784',
  300: '#4CAF50',
} as const;

// Success Colors - Greens
export const success = {
  50: '#E6F4E7',
  100: '#00C951',
  200: '#00A63E',
  300: '#008236',
} as const;

// Warning Colors - Oranges
export const warning = {
  50: '#FFE5B4',
  100: '#FE9A00',
  200: '#E17100',
  300: '#973C00',
} as const;

// Error Colors - Reds
export const error = {
  50: '#FFD7D9',
  100: '#FB2C36',
  200: '#C10007',
  300: '#9F0712',
} as const;

// Export for all colors
export const colors = {
  neutral,
  primary,
  secondary,
  success,
  warning,
  error,
} as const;
