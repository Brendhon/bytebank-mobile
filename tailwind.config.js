/** @type {import('tailwindcss').Config} */

const bytebankColors = {
  'blue': '#004D61',
  'orange': '#FF5031',
  'green': '#47A138',

  'light-green': '#E4EDE3',
  'light-gray': '#F9F9F9',
  'gray': '#888888',
  'dark': '#212121',
  'dark-gray': '#444444',

  'red': '#BF1313',
  'white': '#FFFFFF',
};

const typographyTokens = {
  fontFamily: {
    inter: ['Inter', 'sans-serif']
  },
  fontSize: {
    '14px': '14px',
    '16px': '16px',
    '18px': '18px',
    '20px': '20px',
    '24px': '24px'
  },
  fontWeight: {
    regular: '400',
    'semi-bold': '600',
    bold: '700'
  },
  lineHeight: {
    '120': '120%',
    auto: 'normal'
  }
};

module.exports = {
  content: ['./components/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: bytebankColors,
      ...typographyTokens,
    },
  },
  plugins: [],
};
