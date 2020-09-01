/* eslint-disable @typescript-eslint/no-var-requires */

const cssImports = require('postcss-import')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [cssImports, tailwindcss, autoprefixer]
}
