/* global module */

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-var': 'error',
    'no-trailing-spaces': 'error',
    'spaced-comment': ['error', 'always'],
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'space-infix-ops': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    // 'space-before-function-paren': ['error', 'always'],
  },
};
