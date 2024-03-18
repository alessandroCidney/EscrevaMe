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
    'tvue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'import/no-named-as-default': 'off',
  },
}
