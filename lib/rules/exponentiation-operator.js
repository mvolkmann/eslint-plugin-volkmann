/**
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
    return {
      BinaryExpression(node) {
        if (node.operator !== '*') return;

        const {left, right} = node;
        if (left.type === 'Identifier' &&
          right.type === 'Identifier' &&
          left.name === right.name) {
          context.report({
            node,
            message: msg,
            fix(fixer) {
              return fixer.replaceText(node, left.name + '**2');
            }
          });
        }
      }
    };
  }
};
