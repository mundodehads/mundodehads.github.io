import { CODE_EXTENSIONS, findPatternViolations, hasExtension, isStandardsSource } from './pattern-matching.mjs';

const RULE = 'lint or type suppression';
const SUPPRESSION_PATTERNS = [/eslint-disable/g, /@ts-ignore/g, /@ts-expect-error/g, /@ts-nocheck/g];

export const suppressionsCheck = {
  appliesToFile: (projectFile) =>
    hasExtension(projectFile, [...CODE_EXTENSIONS, '.html']) && !isStandardsSource(projectFile),
  findViolations: (projectFile) =>
    findPatternViolations({ fileContent: projectFile.readContent(), patterns: SUPPRESSION_PATTERNS, rule: RULE }),
};
