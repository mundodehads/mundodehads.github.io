import typescript from 'typescript';
import { CODE_EXTENSIONS, hasExtension, lineNumberAt } from './pattern-matching.mjs';

const RULE = 'comment in code';

function collectCommentPositions({ node, sourceFile, commentPositions }) {
  const fileContent = sourceFile.text;
  const leadingComments = typescript.getLeadingCommentRanges(fileContent, node.getFullStart()) ?? [];
  const trailingComments = typescript.getTrailingCommentRanges(fileContent, node.getEnd()) ?? [];
  [...leadingComments, ...trailingComments].forEach((commentRange) => commentPositions.add(commentRange.pos));
  node.getChildren(sourceFile).forEach((childNode) => {
    collectCommentPositions({ node: childNode, sourceFile, commentPositions });
  });
}

export const codeCommentsCheck = {
  appliesToFile: (projectFile) => hasExtension(projectFile, CODE_EXTENSIONS),
  findViolations(projectFile) {
    const fileContent = projectFile.readContent();
    const sourceFile = typescript.createSourceFile(
      projectFile.relativePath,
      fileContent,
      typescript.ScriptTarget.Latest,
      true,
    );
    const commentPositions = new Set();
    collectCommentPositions({ node: sourceFile, sourceFile, commentPositions });
    return [...commentPositions].map((commentPosition) => ({
      line: lineNumberAt(fileContent, commentPosition),
      rule: RULE,
    }));
  },
};
