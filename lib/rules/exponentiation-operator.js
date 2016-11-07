/**
 * This looks for expressions like "x * x * x"
 * and replaces them with "Math.pow(x, 3)".
 * The example above is parsed as a BinaryExpression times x.
 * The BinaryExpression is parsed as x * x.
 * So x * x * x * x would be parsed as ((x * x) * x) * x.
 * @fileoverview Prefer exponentiation operator over multiplication
 * @author R. Mark Volkmann
 */
const msg = 'prefer exponentiation operator over multiplication';
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
        if (node.operator !== '*') return;

        let exponent = 2;
        let {left, right} = node;
        if (right.type !== 'Identifier') return;

        // Avoid processing nested BinaryExpressions multiple times.
        if (processedNodes.includes(right)) return;

        const {name} = right;

        while (left.type === 'BinaryExpression') {
          if (left.operator !== '*') return;
          right = left.right;

          left = left.left;

          // All the identifier names must match.
          if (right.name !== name) return;

          // Keep track of BinaryExpressions that have already been processed.
          processedNodes.push(right);

          exponent++;
        }

        if (left.type === 'Identifier' && left.name === name) {
          //const text = left.name + '**' + exponent;
          const text = `Math.pow(${left.name}, ${exponent})`;
          context.report({
            node,
            message: 'prefer ' + text + ' over multiplication',
            fix(fixer) {
              return fixer.replaceText(node, text);
            }
          });
        }
      }
    };
  }
};
