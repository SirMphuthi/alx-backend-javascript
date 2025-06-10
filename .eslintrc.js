module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jest',
  ],
  rules: {
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO programming, use flow control statements instead.',
      },
      {
        selector: 'WithStatement',
        message: '`with` statements add properties of an object to the current scope, which makes code less readable and hard to debug.',
      },
    ],
  },
  ignorePatterns: [
    '0x00-ES6_basic/',
    '0x01-ES6_promise/',
    '0x02-ES6_classes/',
    '0x03-ES6_data_manipulation/',
    '0x04-TypeScript/',
  ],
};
