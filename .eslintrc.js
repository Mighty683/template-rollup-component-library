module.exports = {
  plugins: ['prettier'],
  extends: ["@react-native-community", "plugin:prettier/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "plugin:storybook/recommended"],
  root: true,
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error'
  }
};