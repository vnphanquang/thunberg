module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  'plugins': [
    'import',
    '@typescript-eslint',
    'modules-newline'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'semi': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', {
      'prefer': 'type-imports'
    }],
    '@typescript-eslint/semi': [
      'error'
    ],
    "@typescript-eslint/no-unused-vars": ["warn", {
      'argsIgnorePattern': '^_'
    }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': true
        }
      }
    ],
    'object-curly-newline': [
      'error',
      {
        'ObjectExpression': {
          'consistent': true
        },
        'ObjectPattern': {
          'consistent': true
        },
        'ImportDeclaration': {
          'minProperties': 2,
          'multiline': true
        },
        'ExportDeclaration': {
          'minProperties': 2,
          'multiline': true
        }
      }
    ],
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-console': [
      'warn',
      {
        'allow': [
          'error'
        ]
      }
    ],
    'no-restricted-syntax': [
      'error',
      'WithStatement'
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'off',
      'never'
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'unknown'
        ],
        'pathGroups': [
          {
            'pattern': '@thunberg/**',
            'group': 'internal'
          },
          {
            'pattern': '$config',
            'group': 'internal'
          },
          {
            'pattern': '$*/**',
            'group': 'internal'
          }
        ],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': [],
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        'warnOnUnassignedImports': true
      }
    ],
    'max-len': [
      'warn',
      {
        'code': 150
      }
    ],
    'modules-newline/import-declaration-newline': 'error',
    'modules-newline/export-declaration-newline': 'error'
  },
  'globals': {},
  'env': {
    'es6': true,
    'browser': true,
    'node': true
  },
  'ignorePatterns': [
    'rollup.config.js',
    'webpack.config.ts',
    '.eslintrc.js',
  ],
  'overrides': []
};
