/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      'display': 'Inter',
      'body': 'Inter',
    }
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd']
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
