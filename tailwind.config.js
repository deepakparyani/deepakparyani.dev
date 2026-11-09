/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that can contain class names. Rebuild after editing these:
  //   npm run build:css
  content: [
    './index.html',
    './resume.html',
    './404.html',
    // Jekyll layouts, blog pages and Markdown posts
    './_layouts/**/*.html',
    './_posts/**/*.md',
    './blog/**/*.{html,json}',
    './js/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    // Styles Markdown output inside `prose prose-invert`
    require('@tailwindcss/typography')
  ]
};
