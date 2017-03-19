const {RuleTester} = require('eslint');
const ruleName = 'embrace-booleans';
const rule = require('../../../lib/rules/' + ruleName);

const ruleTester = new RuleTester();
ruleTester.run(ruleName, rule, {
  valid: [
    {code: 'var x = y ? a : z'},
    {code: 'var x = y ? true : z'},
    {code: 'var x = y ? false : z'},
    {code: 'var x = y ? z : true'},
    {code: 'var x = y ? z : false'}
  ],
  invalid: [
    invalid({
      code: 'var x = y ? true : false',
      output: 'var x = Boolean(y)',
      usage: 'Boolean(y)'
    }),
    invalid({
      code: 'var x = y ? false : true',
      output: 'var x = !Boolean(y)',
      usage: '!Boolean(y)'
    }),
    invalid({
      code: 'var x = (y && z) ? false : true',
      output: 'var x = !Boolean(y && z)',
      usage: '!Boolean(y && z)'
    })
  ],
});

function invalid({code, output, usage}) {
  return {
    code,
    output,
    errors: [
      {
        message: `Unnecessary ternary; Use ${usage} instead`,
        type: 'ConditionalExpression',
      },
    ]
  };
}
