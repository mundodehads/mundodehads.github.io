import { findPatternViolations, hasExtension, isWebApplicationFile } from './pattern-matching.mjs';

const RULE = 'color outside the theme tokens';
const PALETTE_VIOLATION_PATTERNS = [
  /\b(?:text|bg|border|outline|ring|fill|stroke|from|via|to|shadow|accent|caret|decoration|divide|placeholder)-(?:\[(?:#|rgb|hsl|oklch|oklab|lab|lch|hwb|color|var\(|--)|\(--)/gi,
  /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb|color-mix)\(/gi,
  /['"`]#[0-9a-fA-F]{3,8}\b/g,
];

const DOCUMENT_SHELL = 'src/index.html';

export const paletteCheck = {
  appliesToFile: (projectFile) =>
    isWebApplicationFile(projectFile) &&
    hasExtension(projectFile, ['.html', '.ts']) &&
    projectFile.relativePath !== DOCUMENT_SHELL,
  findViolations: (projectFile) =>
    findPatternViolations({
      fileContent: projectFile.readContent(),
      patterns: PALETTE_VIOLATION_PATTERNS,
      rule: RULE,
    }),
};
