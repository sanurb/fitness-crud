const {createGlobPatternsForDependencies} = require('@nx/angular/tailwind');
const {join} = require('path');

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js", // add this line
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '60': 60,
        '70': 70
      }
    },
  },
  plugins: [
    require('autoprefixer'),
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
};
