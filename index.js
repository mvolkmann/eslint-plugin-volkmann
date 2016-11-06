module.exports = {
  rules: {
    'embrace-booleans': require('./lib/rules/embrace-booleans'),
    'exponentiation-operator': require('./lib/rules/exponentiation-operator')
  },
  configs: {
    all: {
      parserOptions: {
        ecmaVersion: 6
      },
      rules: {
        'volkmann/embrace-booleans': 2,
        'volkmann/exponentiation-operator': 2
      }
    }
  }
};
