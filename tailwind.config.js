/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const typography = require('@tailwindcss/typography');
const daisyui = require('daisyui');

module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        lighttek: {
          primary: '#f97316',
          secondary: '#f59e0b',
          accent: '#10b981',
          neutral: '#44403c',
          'base-100': '#ffedd5',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',

          '--navbar-padding': '2rem',
        },
      },
    ],
  },
};
