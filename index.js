/* global module */

module.exports = {
  rules: {
    /* eslint-disable global-require */
    'embrace-booleans': require('./lib/rules/embrace-booleans'),
    'exponentiation-operator': require('./lib/rules/exponentiation-operator'),
    'ternary-operator': require('./lib/rules/ternary-operator')
  },
  configs: {
    all: {
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        'volkmann/embrace-booleans': 'error',
        'volkmann/exponentiation-operator': 'error',
        'volkmann/ternary-operator': 'warning'
      }
    }
  }
};
