import { neutral } from './colors';

// Human-readable names for font weights
const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Style for base font - used for all variants
const fontBase = {
  fontFamily: 'Poppins, sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  fontWeight: 500,
};

// Input font sizes are slightly smaller - this is for visual hierarchy
const inputFontSize = {
  sm: { fontSize: '11.5px', lineHeight: '18px' }, //~12px
  md: { fontSize: '13.5px', lineHeight: '20px' }, //~14px
  lg: { fontSize: '15px', lineHeight: '22px' }, //~16px
};

// Base font sizes
const fontSize = {
  xs: { fontSize: '10px', lineHeight: '16px' }, //10px
  sm: { fontSize: '12px', lineHeight: '20px' }, //12px
  md: { fontSize: '14px', lineHeight: '22px' }, //14px
  lg: { fontSize: '16px', lineHeight: '24px' }, //16px
  xl: { fontSize: '20px', lineHeight: '28px' }, //20px
  '2xl': { fontSize: '24px', lineHeight: '32px' }, //24px
  '3xl': { fontSize: '28px', lineHeight: '36px' }, //28px
};

// Variants for body text
const textStyle = {
  body: {
    // Default
    ...fontBase,
    ...fontSize['md'],
    fontWeight: fontWeight['medium'],
    color: neutral[200],
  },
  subtle: {
    // Empty states, etc.
    ...fontBase,
    ...fontSize['md'],
    fontWeight: fontWeight['regular'],
    color: neutral[200],
  },
  label: {
    // Labels, tooltips, smaller text, etc.
    ...fontBase,
    ...fontSize['sm'],
    fontWeight: fontWeight['medium'],
    color: neutral[200],
  },
  caption: {
    // Smallest text
    ...fontBase,
    ...fontSize['xs'],
    fontWeight: fontWeight['regular'],
    color: neutral[200],
  },
};

// Variants for titles and headers
const titleStyle = {
  header: {
    // h1
    ...fontBase,
    ...fontSize['3xl'],
    fontWeight: fontWeight['bold'],
    color: 'black',
  },
  sectionHeader: {
    // h2
    ...fontBase,
    ...fontSize['xl'],
    fontWeight: fontWeight['semibold'],
    color: 'black',
  },
  subheader: {
    // h3
    ...fontBase,
    ...fontSize['lg'],
    fontWeight: fontWeight['medium'],
    color: neutral[200],
  },
  sectionSubheader: {
    // h4
    ...fontBase,
    ...fontSize['md'],
    fontWeight: fontWeight['regular'],
    color: neutral[200],
  },
  cardHeader: {
    // h5
    ...fontBase,
    ...fontSize['lg'],
    fontWeight: fontWeight['semibold'],
    color: neutral[300],
  },
  cardSubheader: {
    // h6
    ...fontBase,
    ...fontSize['md'],
    fontWeight: fontWeight['regular'],
    color: neutral[200],
  },
};

// Combined object for all variants - for convenience
const fontStyle = {
  ...textStyle,
  ...titleStyle,
};

export { fontStyle, textStyle, titleStyle, fontBase, fontSize, inputFontSize, fontWeight };
