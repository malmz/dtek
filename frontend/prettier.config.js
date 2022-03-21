/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('prettier-plugin-tailwindcss');

module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [tailwindcss],
};
