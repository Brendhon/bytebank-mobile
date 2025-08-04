/**
 * Bytebank color palette
 * Based on the design system colors defined in tailwind.config.js
 */
export const colors = {
  // Primary colors
  blue: '#004D61',
  orange: '#FF5031',
  green: '#47A138',
  
  // Background colors
  'light-green': '#E4EDE3',
  'light-gray': '#F9F9F9',
  white: '#FFFFFF',
  
  // Text colors
  gray: '#888888',
  dark: '#212121',
  'dark-gray': '#444444',
  
  // Status colors
  red: '#BF1313',
} as const;

/**
 * Gradient configurations
 */
export const gradients = {
  primary: {
    colors: [colors['light-green'], colors.white],
    locations: [0.5, 1],
  },
} as const;

export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients; 