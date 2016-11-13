/**
 * @fileoverview Tests for exponentiation operator
 * @author R. Mark Volkmann
 */
const RuleTester = require('eslint').RuleTester;
const ruleName = 'exponentiation-operator';
const rule = require('../../../lib/rules/' + ruleName);

const ruleTester = new RuleTester();

ruleTester.run(ruleName, rule, {
  valid: [
    {code: 'x**2', parserOptions: {ecmaVersion: 7}},
    {code: 'x**3', parserOptions: {ecmaVersion: 7}}
  ],
  invalid: [
    {
      code: 'x * x',
      errors: [
        {
          message: 'prefer x**2 over multiplication',
          type: 'BinaryExpression'
        }
      ]
    },
    {
      code: 'x * x * x',
      options: ['spaceAround'],
      errors: [
        {
          message: 'prefer x ** 3 over multiplication',
          type: 'BinaryExpression'
        }
      ]
    },
    {
      code: 'x * x * x * x',
      errors: [
        {
          message: 'prefer x**4 over multiplication',
          type: 'BinaryExpression'
        }
      ]
    },
    {
      code: 'x * x * y',
      errors: [
        {
          message: 'prefer x**2 over multiplication',
          type: 'BinaryExpression'
        }
      ]
    },
    {
      code: 'Math.pow(x, 2)',
      errors: [
        {
          message: 'prefer x**2',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'Math.pow(x * y, a + b)',
      errors: [
        {
          message: 'prefer (x * y)**(a + b)',
          type: 'CallExpression'
        }
      ]
    },
    /*
    {
      // This doesn't work because the BinaryExpression y * x
      // doesn't get processed because y and x are different names.
      code: 'y * x * x',
      errors: [
        {
          message: 'prefer x**2 over multiplication',
          type: 'BinaryExpression'
        }
      ]
    }
    */
  ]
});
