/** @type {import('tailwindcss').Config} */

const colors = require('./utils/colors').colors;

const typographyTokens = {
  fontFamily: {
    inter: ['Inter', 'sans-serif'],
  },
  fontSize: {
    '14px': '14px',
    '16px': '16px',
    '18px': '18px',
    '20px': '20px',
    '24px': '24px',
  },
  fontWeight: {
    regular: '400',
    'semi-bold': '600',
    bold: '700',
  },
  lineHeight: {
    120: '120%',
    auto: 'normal',
  },
};

module.exports = {
  content: ['./components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      ...typographyTokens,
    },
  },
  plugins: [],
};
