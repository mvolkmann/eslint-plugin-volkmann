module.exports = {
  rules: {
    'embrace-booleans': require('./lib/rules/embrace-booleans')
  },
  configs: {
    all: {
      parserOptions: {
        ecmaVersion: 6
      },
      rules: {
        'volkmann/embrace-booleans': 2
      }
    }
  }
};
