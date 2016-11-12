/**
 * This looks for expressions like "x * x * x"
 * and replaces them with "Math.pow(x, 3)".
 * The example above is parsed as a BinaryExpression times x.
 * The BinaryExpression is parsed as x * x.
 * So x * x * x would be parsed as (x * x) * x).
 * @fileoverview Prefer exponentiation operator over multiplication
 * @author R. Mark Volkmann
 */
const msg = 'prefer Math.pow over multiplication';
module.exports = {
  meta: {
    docs: {
      description: msg,
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: 'code',
    schema: [] // no options
  },
  create(context) {
    const processedNodes = [];
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
        if (processedNodes.includes(right)) return;

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
          processedNodes.push(right);

          exponent++;
        }

        // This rule only handles cases where the most deeply nested
        // BinaryExpression has a left operator that is an Identifier.
        if (left.type === 'Identifier' && left.name === name) {
          // Report the rule violation.
          const text = left.name + ' ** ' + exponent;
          //const text = `Math.pow(${left.name}, ${exponent})`;
          context.report({
            node,
            message: 'prefer ' + text + ' over multiplication',
            // If running in --fix mode, apply this fix.
            fix(fixer) {
              // Only one fixer method can be called
              // and its result must be returned.
              return fixer.replaceText(node, text);
            }
          });
        }
      }
    };
  }
};
