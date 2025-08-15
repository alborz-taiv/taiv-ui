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
  sm: { fontSize: '1.15rem', lineHeight: '1.8rem' }, //~12px
  md: { fontSize: '1.35rem', lineHeight: '2rem' }, //~14px
  lg: { fontSize: '1.5rem', lineHeight: '2.2rem' }, //~16px
};

// Base font sizes
const fontSize = {
  xs: { fontSize: '1rem', lineHeight: '1.6rem' }, //10px
  sm: { fontSize: '1.2rem', lineHeight: '2rem' }, //12px
  md: { fontSize: '1.4rem', lineHeight: '2.2rem' }, //14px
  lg: { fontSize: '1.6rem', lineHeight: '2.4rem' }, //16px
  xl: { fontSize: '2rem', lineHeight: '2.8rem' }, //20px
  '2xl': { fontSize: '2.4rem', lineHeight: '3.2rem' }, //24px
  '3xl': { fontSize: '2.8rem', lineHeight: '3.6rem' }, //28px
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
