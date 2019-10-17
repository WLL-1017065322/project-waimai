module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'ne-new': 0,
    'max-len': ['error', { code: 300 }],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'no-new': 0,
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: false, optionalDependencies: false, peerDependencies: false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
