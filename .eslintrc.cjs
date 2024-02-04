module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: ['@nuxtjs/eslint-config-typescript'],

  plugins: [],

  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
  },
}
