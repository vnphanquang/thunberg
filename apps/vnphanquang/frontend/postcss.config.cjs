//@ts-check
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;

const envPlugins = {
  production: [
    cssnano({
      preset: 'default',
    }),
  ],
};

module.exports = {
  plugins: [
    postcssImport,
    postcssPresetEnv({
      features: {
        'nesting-rules': true,
        'custom-properties': true,
      },
    }),
    // Some plugins, like postcss-nested, need to run before Tailwind
    tailwindcss,
    // But others, like autoprefixer, need to run after
    autoprefixer,
    ...(envPlugins[mode] ?? []),
  ],
};
