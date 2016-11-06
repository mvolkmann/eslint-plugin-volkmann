module.exports = {
  rules: {
    'embrace-booleans': require('./lib/rules/embrace-booleans')
  },
  configs: {
    all: {
      parserOptions: {
        ecmaFeatures: {ecmaVersion: 6: sourceType: 'module'}
      },
      rules: {
        'volkmann/embrace-booleans': 2
      }
    }
  }
};
