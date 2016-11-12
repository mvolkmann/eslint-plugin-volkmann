module.exports = {
  rules: {
    /* eslint-disable global-require */
    'embrace-booleans': require('./lib/rules/embrace-booleans'),
    'exponentiation-operator': require('./lib/rules/exponentiation-operator')
  },
  configs: {
    all: {
      parserOptions: {
        ecmaVersion: 7
      },
      rules: {
        'volkmann/embrace-booleans': 2,
        'volkmann/exponentiation-operator': 2
      }
    }
  }
};
