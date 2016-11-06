/**
 * @fileoverview Embrace the use of boolean expressions
 * @author R. Mark Volkmann
 */
module.exports = {
  meta: {
    docs: {
      description: 'prefer exponentiation operator over multiplication',
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
            message: 'prefer exponentiation operator over multiplication',
            fix(fixer) {
              return fixer.replaceText(node, left.name + '**2');
            }
          });
        }
      }
    };
  }
};
