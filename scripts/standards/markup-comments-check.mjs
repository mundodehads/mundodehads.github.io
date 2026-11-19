import { findPatternViolations, hasExtension } from './pattern-matching.mjs';

const RULE = 'comment in HTML or CSS';
const QUOTED_TEXT_PATTERN = /"[^"\n]*"|'[^'\n]*'/g;
const HTML_COMMENT_PATTERN = /<!--/g;
const CSS_COMMENT_PATTERN = /\/\*/g;

function blankQuotedText(fileContent) {
  return fileContent.replace(QUOTED_TEXT_PATTERN, (quotedText) => ' '.repeat(quotedText.length));
}

export const markupCommentsCheck = {
  appliesToFile: (projectFile) => hasExtension(projectFile, ['.html', '.css']),
  findViolations: (projectFile) =>
    findPatternViolations({
      fileContent: blankQuotedText(projectFile.readContent()),
      patterns: [hasExtension(projectFile, ['.html']) ? HTML_COMMENT_PATTERN : CSS_COMMENT_PATTERN],
      rule: RULE,
    }),
};
