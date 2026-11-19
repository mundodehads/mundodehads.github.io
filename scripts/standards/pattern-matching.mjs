export const CODE_EXTENSIONS = ['.ts', '.mts', '.cts', '.tsx', '.js', '.mjs', '.cjs'];

export function lineNumberAt(fileContent, characterOffset) {
  return fileContent.slice(0, characterOffset).split('\n').length;
}

export function findPatternViolations({ fileContent, patterns, rule }) {
  return patterns.flatMap((pattern) =>
    [...fileContent.matchAll(pattern)].map((patternMatch) => ({
      line: lineNumberAt(fileContent, patternMatch.index),
      rule,
    })),
  );
}

export function hasExtension(projectFile, extensions) {
  return extensions.some((extension) => projectFile.relativePath.endsWith(extension));
}

export function isStandardsSource(projectFile) {
  return projectFile.relativePath.startsWith('scripts/standards/');
}

const FRONTEND_ROOTS = ['src/'];

export function isWebApplicationFile(projectFile) {
  return FRONTEND_ROOTS.some((frontendRoot) => projectFile.relativePath.startsWith(frontendRoot));
}
