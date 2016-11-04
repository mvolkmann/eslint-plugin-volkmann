const allRules = {
  'embrace-boolean': require('./lib/rules/embrace-boolean')
};

module.exports = {
  deprecatedRules: [],
  rules: allRules,
  configs: {
    recommended: {
      plugin: [],
      parserOptions: {
        ecmaFeatures: {}
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
      rules: allRules
    }
  }
};
