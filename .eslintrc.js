// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'import/no-unresolved': 'off',
    'consistent-return': 0,
    'import/prefer-default-export': 'off',
    'object-curly-newline': 0,
    'max-len': 0,
    'import/extensions': 0,
    'no-debugger': 1,
    'import/no-extraneous-dependencies': 0,
    'no-nested-ternary': 0,
    'global-require': 0,
    'no-tabs': 0,
    camelcase: 0,
    'default-param-last': 0,
  },
};
