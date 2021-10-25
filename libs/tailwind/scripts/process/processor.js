const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const CleanCSS = require('clean-css');

const inputPath = path.resolve(__dirname, '../../src/index.js');
const outputPath = path.resolve(__dirname, '../../dist');

module.exports = function buildDistFile(filename) {
  return postcss([
    tailwind({
      mode: 'jit',
      purge: ['./src/**/*.{html,js,ts}'],
      corePlugins: true,
      plugins: [require(inputPath)],
    }),
    require('autoprefixer'),
  ])
    .process('@tailwind base; @tailwind components; @tailwind utilities', {
      from: null,
      to: path.resolve(__dirname, `../../dist/${filename}.css`),
      map: false,
    })
    .then((result) => {
      if (filename) {
        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
        fs.writeFileSync(path.join(outputPath, `${filename}.css`), result.css);
      }
      return result;
    })
    .then((result) => {
      const minified = new CleanCSS().minify(result.css);
      if (filename) {
        !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
        fs.writeFileSync(path.join(outputPath, `${filename}.min.css`), minified.styles);
      }
      return [result, minified];
    })
    .catch((error) => {
      console.log(error);
    });
};
