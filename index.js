
module.exports = {
  deprecatedRules: [],
  rules: {
    'embrace-booleans': require('./lib/rules/embrace-booleans')
  },
  configs: {
    recommended: {
      plugin: [
        'volkmann'
      ],
      parserOptions: {
        ecmaFeatures: {ecmaVersion: 6: sourceType: 'module'}
      },
      rules: {
        'volkmann/embrace-booleans': 2
      }
    },
    all: {
      plugin: [
        'volkmann'
      ],
      parserOptions: {
        ecmaFeatures: {}
      },
      rules: {'volkmann/embrace-booleans': 2}
    }
  }
};
