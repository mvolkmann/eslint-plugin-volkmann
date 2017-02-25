/**
 * This formats use of nested ternary operators to this:
 * const result =
 *   condition1 ? value1 :
 *   condition2 ? value2 :
 *   condition3 ? value3 :
 *   value4;
 *
 * It only works when consequent values are not ternaries
 * and all but the last alternate value is a ternary.
 *
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
    const lineLengthLimit = 80;

    // Assume indentation of two spaces.
    // ESLint can fix if the user has another preference.
    const indentSize = 2;
    const deltaIndent = ' '.repeat(indentSize);

    let declarationColumn;

    function getConditionalExpressionText(node, recursive) {
      const {test, consequent, alternate} = node;

      // Don't process ternaries whose consequent is a ternary.
      if (consequent.type === 'ConditionalExpression') return;

      const sourceCode = context.getSourceCode();
      const testCode = sourceCode.getText(test);
      const consequentCode = sourceCode.getText(consequent);

      const recurse = alternate.type === 'ConditionalExpression';
      const alternateCode = recurse ?
        getConditionalExpressionText(alternate, true) :
        sourceCode.getText(alternate);

      const indent = ' '.repeat(declarationColumn + indentSize);
      const testIndent = recursive || recurse ? indent : deltaIndent;
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
        // span multiple lines or go beyond lineLengthLimit.
        const {loc} = node;
        const {start, end} = loc;
        if (start.line === end.line &&
          end.column <= lineLengthLimit) return;

        const {kind} = node; // should be "const", "let", or "var"
        declarationColumn = node.loc.start.column;
        const {name} = decl.id;

        const startIndent = ' '.repeat(declarationColumn);
        const formattedTernary = getConditionalExpressionText(init);

        // Only process declarations whose ternary could be formatted.
        if (!formattedTernary) return;

        let text =
          `${startIndent}${kind} ${name} =\n${formattedTernary}`;

        // If there is only one ternary ...
        // Note that "[\s\S]" is an alternative to "."
        // that matches over newlines.
        // Using the "m" doesn't address this.
        const hasMultiple = /\?[\s\S]+\?/.test(text);
        if (!hasMultiple) {
          // If the entire expression would fit on one line ...
          const newText = text.trim()
            .replace(/\n/g, ' ') // changes newlines to spaces
            .replace(/ [ ]+/g, ' '); // replaces multiple spaces w/ 1
          // Use a single-line version of the ternary.
          if (newText.length < lineLengthLimit - startIndent) {
            text = newText;
          }
        }

        // Only report an error if the code was formatted
        // differently than this plugin wants.
        const sourceCode = context.getSourceCode();
        const currentCode = sourceCode.getText(node);
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
