/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const typography = require('@tailwindcss/typography');
const daisyui = require('daisyui');
const lineclamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  plugins: [typography, lineclamp, daisyui],
  daisyui: {
    themes: [
      'light',
      'dark',
      'retro',
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
