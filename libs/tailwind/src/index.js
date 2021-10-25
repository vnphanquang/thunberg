const plugin = require('tailwindcss/plugin');
const base = require('./base');
const components = require('./components');
const utilities = require('./utilities');

module.exports = plugin(
  function ({ addBase, addComponents, addUtilities }) {
    addBase(base);

    for (const { styles, options } of utilities) {
      addUtilities(styles, options);
    }

    for (const { styles, options } of components) {
      addComponents(styles, options);
    }
  },
  {
    theme: {
      extend: {
        colors: {},
      },
    },
  }
);
