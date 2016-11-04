/**
 * @fileoverview Tests for unnecessary ternary usage
 * @author R. Mark Volkmann
 */
const RuleTester = require('eslint').RuleTester;
const ruleName = 'embrace-booleans';
const rule = require('../../../lib/rules/' + ruleName);

const ruleTester = new RuleTester();
const error = {
  message: 'Unnecessary ternary; Embrace boolean expressions',
  type: 'ConditionalExpression'
};

ruleTester.run(ruleName, rule, {
  valid: [
    'someCondition'
  ],
  invalid: [
    {
      code: 'someCondition ? true : false',
      errors: [error]
    },
    {
      code: 'someCondition ? false : true',
      errors: [error]
    }
  ]
});
