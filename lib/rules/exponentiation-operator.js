/**
 * This looks for expressions like "x * x * x"
 * and replaces them with "x**3".
 * The example above is parsed as a BinaryExpression times x.
 * The BinaryExpression is parsed as x * x.
 * So x * x * x would be parsed as (x * x) * x.
 * This also replaces expressions like "Math.pow(x, 3)"
 * with "x**3".
 * @fileoverview Prefer exponentiation operator over multiplication and Math.pow.
 * @author R. Mark Volkmann
 */
module.exports = {
  meta: {
    docs: {
      description: 'prefer ** over multiplication',
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: 'code',
    schema: [
      // Include this option for "x ** 2".  Exclude for "x**2".
      {enum: ['spaceAround']}
    ]
  },
  create(context) {
    const processedStarts = [];
    return {
      BinaryExpression(node) {
        // This rule only cares about multiplication operators.
        if (node.operator !== '*') return;

        let exponent = 2; // We know it is at least this.

        // BinaryExpressions have left and right operands.
        let {left, right} = node;

        // This rule only handles BinaryExpressions where
        // the right operand is an identifier.
        if (right.type !== 'Identifier') return;

        // Avoid processing nested BinaryExpressions multiple times.
        if (processedStarts.includes(right.start)) return;

        const {name} = right;

        // Increase exponent for each additional * BinaryExpression
        // that uses the same operand name.
        while (left.type === 'BinaryExpression') {
          // If we find an operator other than *, this rule cannot be applied.
          if (left.operator !== '*') return;

          // Switch to the nested operands.
          right = left.right;
          left = left.left;

          // All the identifier names must match.
          if (right.name !== name) return;

          // Keep track of BinaryExpressions that have already been processed.
          processedStarts.push(right.start);

          exponent++;
        }

        // This rule only handles cases where the most deeply nested
        // BinaryExpression has a left operator that is an Identifier.
        if (left.type === 'Identifier' && left.name === name) {
          // Process spaceAround option.
          const space = context.options.includes('spaceAround') ? ' ' : '';

          // Report the rule violation.
          const text = left.name + space + '**' + space + exponent;
          context.report({
            node,
            message: 'prefer ' + text + ' over multiplication',
            // If running in --fix mode, apply this fix.
            fix(fixer) {
              // When the spaceAround option is not used,
              // the fix for the built-in space-infix-ops rule
              // will add spaces back around **.

              // Only one fixer method can be called
              // and its result must be returned.
              return fixer.replaceText(node, text);
            }
          });
        }
      },

      CallExpression(node) {
        const {callee} = node;
        const {object, property} = callee;
        if (!object || object.name !== 'Math') return;
        if (!property || property.name !== 'pow') return;

        function getCode(arg) {
          const sourceCode = context.getSourceCode();
          const needParens = arg.type === 'BinaryExpression';
          const code = sourceCode.getText(arg);
          return needParens ? '(' + code + ')' : code;
        }

        const [base, exponent] = node.arguments;
        const baseCode = getCode(base);
        const exponentCode = getCode(exponent);
        const text = baseCode + '**' + exponentCode;

        context.report({
          node,
          message: 'prefer ' + text,
          fix(fixer) {
            return fixer.replaceText(node, text);
          }
        });
      }
    };
  }
};
