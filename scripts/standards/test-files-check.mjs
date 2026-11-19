const RULE = 'test file or folder is forbidden';
const TEST_PATH_PATTERNS = [
  /\.(spec|test|e2e-spec)\.[^/]+$/,
  /(^|\/)(e2e|test|tests|__tests__|__mocks__|cypress|playwright)\//,
  /(^|\/)(jest|vitest|karma|cypress|playwright|protractor)\.(config|conf|workspace)\.[^/]+$/,
  /(^|\/)jest[^/]*\.json$/,
  /(^|\/)tsconfig\.spec\.json$/,
];

export const testFilesCheck = {
  appliesToFile: (projectFile) => TEST_PATH_PATTERNS.some((pattern) => pattern.test(projectFile.relativePath)),
  findViolations: () => [{ line: 1, rule: RULE }],
};
