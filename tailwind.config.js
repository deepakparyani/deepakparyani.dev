/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that can contain class names. Rebuild after editing these:
  //   npm run build:css
  content: [
    './index.html',
    './resume.html',
    './404.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
