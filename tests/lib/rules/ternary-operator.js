/**
 * @fileoverview Tests for ternary operator
 * @author R. Mark Volkmann
 */
const RuleTester = require('eslint').RuleTester;
const ruleName = 'ternary-operator';
const rule = require('../../../lib/rules/' + ruleName);

const ruleTester = new RuleTester();

const parserOptions = {
  ecmaFeatures: {jsx: true},
  ecmaVersion: 7,
  sourceType: 'module'
};

const case1 = `const result = x > 2
  ? 'foo'
  : y > 2
      ? 'bar'
      : 'baz';
`;

const case1Expected = `const result =
  x > 2 ? 'foo' :
  y > 2 ? 'bar' :
  'baz';
`;

const case2 = `
  <div>
  {
    hash === 'page1'
      ? <Page1 />
      : hash === 'page2'
          ? <Page2 />
          : <Home />
  }
  </div>
`;

const case2Expected = `
  <div>
  {
    hash === 'page1' ? <Page1 /> :
    hash === 'page2' ? <Page2 /> :
    <Home />
  }
  </div>
`;

ruleTester.run(ruleName, rule, {
  //TODO: Currently every use of ternaries is treated like an error
  //TODO: and reformatted even if it is already formatted correctly.
  valid: [
    {code: 'const a = b ? c : d;', parserOptions},
    {code: 'const a = b ? (c ? d : e) : f;', parserOptions},
    {code: case1Expected, parserOptions},
  ],
  invalid: [
    {
      code: 'const a = b\n  ? c\n  : d;',
      parserOptions,
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: 'const a = b ? c : d;'
    },
    {
      code: `const a = b
               ? c
               : d
                   ? e
                   : f;`,
      parserOptions,
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: 'const a =\n  b ? c :\n  d ? e :\n  f;'
    },
    {
      code: case1,
      parserOptions,
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: case1Expected
    },
    /*
    {
      code: case2,
      parserOptions,
      errors: [
        {
          message: 'bad ternary formatting',
          type: 'VariableDeclaration'
        }
      ],
      output: case2Expected
    }
    */
  ]
});
