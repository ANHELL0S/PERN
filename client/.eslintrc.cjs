module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
