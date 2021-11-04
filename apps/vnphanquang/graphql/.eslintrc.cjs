module.exports = {
  'root': true,
  'extends': '@vnphanquang/eslint-config',
  'parserOptions': {
    'tsconfigRootDir': __dirname,
    'project': 'tsconfig.json',
  },
  'ignorePatterns': [
    'scripts/**/*.js',
    'types.generated.ts',
    'introspection.generated.json'
  ],
  'rules': {
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2]
  },
  'overrides': []
};
