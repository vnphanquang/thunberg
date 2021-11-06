module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@vnphanquang/eslint-config',
    'prettier',
  ],
  plugins: ['svelte3', 'import', '@typescript-eslint', 'modules-newline'],
  ignorePatterns: ['*.cjs'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  'parserOptions': {
    'tsconfigRootDir': __dirname,
    'project': 'tsconfig.json',
    'sourceType': 'module',
    'ecmaVersion': 2019,
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
};
