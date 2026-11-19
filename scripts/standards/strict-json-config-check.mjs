const RULE = 'tsconfig must be valid JSON without comments';
const TSCONFIG_NAME_PATTERN = /(^|\/)tsconfig[^/]*\.json$/;

function isStrictJson(fileContent) {
  try {
    JSON.parse(fileContent);
    return true;
  } catch {
    return false;
  }
}

export const strictJsonConfigCheck = {
  appliesToFile: (projectFile) => TSCONFIG_NAME_PATTERN.test(projectFile.relativePath),
  findViolations: (projectFile) => (isStrictJson(projectFile.readContent()) ? [] : [{ line: 1, rule: RULE }]),
};
