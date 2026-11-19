import { lineNumberAt } from './pattern-matching.mjs';

const RULE = 'test dependency is forbidden';
const INVALID_MANIFEST_RULE = 'invalid package.json';
const DEPENDENCY_SECTIONS = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
const TEST_PACKAGE_PATTERNS = [
  /^(jest|vitest|karma|jasmine|mocha|ava|cypress|playwright|supertest|chai|sinon|nyc|ts-jest)(-.*)?$/,
  /^(protractor|puppeteer|webdriverio|nightwatch|testcafe)$/,
  /^@types\/(jest|mocha|jasmine|chai|sinon|supertest|karma|cypress)$/,
  /^@(testing-library|playwright|vitest|jest|cypress)\//,
  /^@[^/]+\/(jest|vitest|karma|mocha)(-.*)?$/,
  /^@nestjs\/testing$/,
];

function parseManifest(fileContent) {
  try {
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
}

function listDependencyNames(packageManifest) {
  return DEPENDENCY_SECTIONS.flatMap((section) => Object.keys(packageManifest[section] ?? {}));
}

function isTestPackage(packageName) {
  return TEST_PACKAGE_PATTERNS.some((pattern) => pattern.test(packageName));
}

export const testDependenciesCheck = {
  appliesToFile: (projectFile) => /(^|\/)package\.json$/.test(projectFile.relativePath),
  findViolations(projectFile) {
    const fileContent = projectFile.readContent();
    const packageManifest = parseManifest(fileContent);
    if (packageManifest === null) {
      return [{ line: 1, rule: INVALID_MANIFEST_RULE }];
    }
    return listDependencyNames(packageManifest)
      .filter(isTestPackage)
      .map((packageName) => ({
        line: lineNumberAt(fileContent, fileContent.indexOf(`"${packageName}"`)),
        rule: `${RULE}: ${packageName}`,
      }));
  },
};
