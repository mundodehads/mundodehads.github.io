import { CODE_EXTENSIONS, findPatternViolations, hasExtension } from './pattern-matching.mjs';

const RULE = 'console.log, console.info and console.warn are forbidden';
const FORBIDDEN_CONSOLE_PATTERNS = [/\bconsole\.(?:log|info|warn|trace|table|dir)\s*\(/g];

export const consoleUsageCheck = {
  appliesToFile: (projectFile) => hasExtension(projectFile, CODE_EXTENSIONS),
  findViolations: (projectFile) =>
    findPatternViolations({
      fileContent: projectFile.readContent(),
      patterns: FORBIDDEN_CONSOLE_PATTERNS,
      rule: RULE,
    }),
};
