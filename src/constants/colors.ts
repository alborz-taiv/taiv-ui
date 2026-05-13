export const black = "#000000";
export const white = "#FFFFFF";

export const gray = {
  25: "#F8FAFC",
  50: "#EDEDED",
  100: "#D9D9D9",
  200: "#6D6D6D",
  300: "#3F3F3F",
} as const;

export const blue = {
  25: "#EEFAFF",
  50: "#BDEAFF",
  100: "#74D4FF",
  200: "#00A6F4",
  300: "#0081CE",
} as const;

export const green = {
  25: "#E6FFF3",
  50: "#BFFCE0",
  100: "#6FFCC0",
  200: "#00DE6F",
  300: "#00A84F",
} as const;

// Orange
export const yellow = {
  25: "#FFF4E6",
  50: "#FFCB7C",
  100: "#FE9A00",
  200: "#E17100",
  300: "#973C00",
} as const;

export const red = {
  25: "#FFEBEA",
  50: "#FFD7D9",
  100: "#FF3B30",
  200: "#C10007",
  300: "#9F0712",
} as const;

// Purple Colors
export const purple = {
  25: "#F3EEFF",
  50: "#C4A8FF",
  100: "#9B6EFF",
  200: "#6F3FEE",
  300: "#3F2488",
} as const;

export const salmon = {
  25: "#FFEAE6",
  50: "#FFEAE6",
  100: "#FFD1C7",
  200: "#FF806F",
} as const;

export const teal = {
  25: "#E0F2F1",
  50: "#E0F2F1",
  100: "#A7E3DE",
  200: "#2BA8A0",
} as const;

export const primary = purple;
export const error = red;
export const success = green;
export const warning = yellow;
export const neutral = gray;
// Primary semantic/functional color exports - for use in UI, actions, states, etc. anything that would be affected by theme changes down the line
export const colors = {
  blue,
  error,
  neutral,
  primary,
  success,
  warning,
  white,
} as const;

// Primitive color exports - for purely aesthetic purpose, i.e. icons, backgrounds, etc. anything that we want to hardcode to a specific color
export const primitives = {
  blue,
  gray,
  green,
  purple,
  red,
  salmon,
  teal,
  yellow,
} as const;
