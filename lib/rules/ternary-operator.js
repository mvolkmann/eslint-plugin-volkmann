/**
 * This formats use of nested ternary operators to this:
 * const result =
 *   condition1 ? value1 :
 *   condition2 ? value2 :
 *   condition3 ? value3 :
 *   value4;
 * @fileoverview formats nested ternary operators
 * @author R. Mark Volkmann
 */
module.exports = {
  meta: {
    docs: {
      description: 'formats nested ternary operators',
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: 'code'
  },
  create(context) {
    // Assume indentation of two spaces.
    // ESLint can fix if the user has another preference.
    const indentSize = 2;

    let declarationColumn;

    function getConditionalExpressionText(node, recursive) {
      const {test, consequent, alternate} = node;

      const sourceCode = context.getSourceCode();
      const testCode = sourceCode.getText(test);
      const consequentCode = sourceCode.getText(consequent);

      const recurse = alternate.type === 'ConditionalExpression';
      const alternateCode = recurse ?
        getConditionalExpressionText(alternate, true) :
        sourceCode.getText(alternate);

      const indent = ' '.repeat(declarationColumn + indentSize);
      const testIndent = recursive || recurse ? indent : '';
      const alternateIndent = recurse ? '' : indent;
      const semicolon = recurse ? '' : ';';
      const text =
        `${testIndent}${testCode} ? ${consequentCode} :\n` +
        `${alternateIndent}${alternateCode}${semicolon}`;
      return text;
    }

    return {
      VariableDeclaration(node) {
        // Only process declarations of a single variable.
        if (node.declarations.length !== 1) return;

        // Only process declarations where variable
        // is being initialized to a ternary.
        const decl = node.declarations[0];
        const {init} = decl;
        if (init.type !== 'ConditionalExpression') return;

        // Only process declarations that
        // span multiple lines or go beyond column 80.
        const {loc} = node;
        const {start, end} = loc;
        if (start.line === end.line && end.column <= 80) return;

        const {kind} = node; // should be "const", "let", or "var"
        declarationColumn = node.loc.start.column;
        const {name} = decl.id;

        const startIndent = ' '.repeat(declarationColumn);
        const text =
          `${startIndent}${kind} ${name} =\n` +
          getConditionalExpressionText(init);

        const sourceCode = context.getSourceCode();
        const currentCode = sourceCode.getText(node);

        // Only report an error if the code was formatted
        // differently than this plugin wants.
        if (currentCode === text) return;

        context.report({
          node,
          message: 'bad ternary formatting',
          fix(fixer) {
            return fixer.replaceText(node, text);
          }
        });
      }
    };
  }
};
