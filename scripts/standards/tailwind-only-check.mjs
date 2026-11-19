import { findPatternViolations, hasExtension, isWebApplicationFile } from './pattern-matching.mjs';

const RULE = 'Tailwind only: custom CSS is forbidden';
const ALLOWED_STYLESHEET_PATTERN = /^src\/(styles|theme)\.css$/;
const DOCUMENT_SHELL = 'src/index.html';
const STYLESHEET_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];
const TEMPLATE_STYLE_PATTERNS = [
  /\sstyle\s*=/gi,
  /\[style[.\]]/g,
  /\[attr\.style/g,
  /\[?ngStyle\]?\s*=/g,
  /<style\b/gi,
  /<link\b[^>]*stylesheet/gi,
];
const COMPONENT_STYLE_PATTERNS = [/\bstyles\s*:/g, /\bstyleUrls?\s*:/g, /['"]\[style/g, /\bhost\s*:\s*\{[^}]*\bstyle\s*:/g];

function isComponentSource(projectFile) {
  return isWebApplicationFile(projectFile) && hasExtension(projectFile, ['.ts']);
}

function isComponentTemplate(projectFile) {
  return isWebApplicationFile(projectFile) && hasExtension(projectFile, ['.html']) && projectFile.relativePath !== DOCUMENT_SHELL;
}

function isForbiddenStylesheet(projectFile) {
  return hasExtension(projectFile, STYLESHEET_EXTENSIONS) && !ALLOWED_STYLESHEET_PATTERN.test(projectFile.relativePath);
}

function selectPatterns(projectFile) {
  return hasExtension(projectFile, ['.html']) ? TEMPLATE_STYLE_PATTERNS : COMPONENT_STYLE_PATTERNS;
}

export const tailwindOnlyCheck = {
  appliesToFile: (projectFile) =>
    isComponentTemplate(projectFile) || isComponentSource(projectFile) || isForbiddenStylesheet(projectFile),
  findViolations(projectFile) {
    if (isForbiddenStylesheet(projectFile)) {
      return [{ line: 1, rule: RULE }];
    }
    return findPatternViolations({
      fileContent: projectFile.readContent(),
      patterns: selectPatterns(projectFile),
      rule: RULE,
    });
  },
};
