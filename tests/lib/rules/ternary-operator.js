/**
 * @fileoverview Tests for ternary operator
 * @author R. Mark Volkmann
 */
const RuleTester = require('eslint').RuleTester;
const ruleName = 'ternary-operator';
const rule = require('../../../lib/rules/' + ruleName);

const ruleTester = new RuleTester();

const badCode = `const result = x > 2
  ? 'foo'
  : y > 2
      ? 'bar'
      : 'baz';
`;

const goodCode = `const result =
  x > 2 ? 'foo' :
  y > 2 ? 'bar' :
  'baz';
`;

ruleTester.run(ruleName, rule, {
  //TODO: Currently every use of ternaries is treated like an error
  //TODO: and reformatted even if it is already formatted correctly.
  valid: [
    {code: 'const a = b ? c : d;', parserOptions: {ecmaVersion: 7}},
    {code: goodCode, parserOptions: {ecmaVersion: 7}},
  ],
  invalid: [
    {
      code: 'const a = b\n  ? c\n  : d;',
      parserOptions: {ecmaVersion: 7},
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: 'const a =\n  b ? c :\n  d;'
    },
    {
      code: badCode,
      parserOptions: {ecmaVersion: 7},
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: goodCode
    }
  ]
});
