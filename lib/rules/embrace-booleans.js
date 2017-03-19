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
        const boolTrue = consequent === 'true' && alternate === 'false';
        const boolFalse = consequent === 'false' && alternate === 'true';

        if (boolTrue || boolFalse) {
          const sourceCode = context.getSourceCode();
          const testCode = sourceCode.getText(node.test);
          let text = `Boolean(${testCode})`;
          if (boolFalse) text = '!' + text;

          context.report({
            node,
            message: `Unnecessary ternary; Use ${text} instead`,
            fix(fixer) {
              // This fix is too verbose.
              // You might prefer to manually fix the code.
              return fixer.replaceText(node, text);
            }
          });
        }
      }
    };
  }
};
