module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'no-console': 0,
    'arrow-parens': 0,
    // valid-typeofが文字列リテラル型と相性が悪い
    'valid-typeof': 0,
    camelcase: 0
  }
}
