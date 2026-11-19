const MAXIMUM_BLOCK_DEPTH = 2;
const MAXIMUM_NESTED_CALLBACKS = 2;
const MAXIMUM_FUNCTION_LINES = 30;
const MAXIMUM_FILE_LINES = 150;
const MAXIMUM_CYCLOMATIC_COMPLEXITY = 8;
const MINIMUM_IDENTIFIER_LENGTH = 3;

const ABBREVIATED_IDENTIFIERS = [
  'idx',
  'btn',
  'req',
  'res',
  'err',
  'val',
  'tmp',
  'cfg',
  'dto',
  'obj',
  'arr',
  'str',
  'num',
  'msg',
  'ctx',
  'evt',
];

export const restrictedPackagePatterns = [
  'zone.js',
  'node:test',
  'jest',
  'vitest',
  'karma',
  'jasmine',
  'mocha',
  'chai',
  'sinon',
  'ts-jest',
  'cypress',
  'playwright',
  'supertest',
  '**/testing',
  '@testing-library/*',
  '@playwright/*',
  '@jest/*',
  '@vitest/*',
  '@cypress/*',
];

export const sharedCodeRules = {
  'max-depth': ['error', MAXIMUM_BLOCK_DEPTH],
  'max-nested-callbacks': ['error', MAXIMUM_NESTED_CALLBACKS],
  'max-lines-per-function': ['error', { max: MAXIMUM_FUNCTION_LINES, skipBlankLines: true }],
  'max-lines': ['error', { max: MAXIMUM_FILE_LINES, skipBlankLines: true }],
  complexity: ['error', MAXIMUM_CYCLOMATIC_COMPLEXITY],
  'no-else-return': ['error', { allowElseIf: false }],
  'no-console': ['error', { allow: ['error', 'debug'] }],
  'id-length': ['error', { min: MINIMUM_IDENTIFIER_LENGTH, exceptions: ['id', 'up', 'to', 'on'], properties: 'always' }],
  'id-denylist': ['error', ...ABBREVIATED_IDENTIFIERS],
  'no-restricted-imports': ['error', { patterns: restrictedPackagePatterns }],
};

export const relaxedSizeRules = {
  'max-lines': 'off',
  'max-lines-per-function': 'off',
};
