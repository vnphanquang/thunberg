//@ts-check
const path = require('path');

const env = process.env.NODE_ENV;

const alias = {
  $static: path.resolve(__dirname, '../static'),
  $assets: path.resolve(__dirname, '../src/assets'),
  $config: path.resolve(__dirname, `../src/config/config.${env}.ts`),
};

module.exports = alias;
