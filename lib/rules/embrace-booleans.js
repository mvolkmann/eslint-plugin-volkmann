/**
 * @fileoverview Embrace the use of boolean expressions
 * @author R. Mark Volkmann
 */
module.exports = {
  meta: {
    docs: {
      description: 'embrace booleans',
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: 'code',
    schema: [] // no options
  },
  create(context) {
    return {
      ConditionalExpression(node) {
        const consequent = node.consequent.raw;
        const alternate = node.alternate.raw;
        if ((consequent === 'true' && alternate === 'false') ||
          (consequent === 'false' && alternate === 'true')) {
          context.report({
            node,
            message: 'Unnecessary ternary; Embrace boolean expressions',
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const testCode = sourceCode.getText(node.test);
              // This fix is too verbose.
              // You might prefer to manually fix the code.
              return fixer.replaceText(node, `Boolean(${testCode})`);
            }
          });
        }
      }
    };
  }
};
