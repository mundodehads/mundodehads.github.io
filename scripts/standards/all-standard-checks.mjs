import { codeCommentsCheck } from './code-comments-check.mjs';
import { consoleUsageCheck } from './console-usage-check.mjs';
import { markupCommentsCheck } from './markup-comments-check.mjs';
import { paletteCheck } from './palette-check.mjs';
import { strictJsonConfigCheck } from './strict-json-config-check.mjs';
import { suppressionsCheck } from './suppressions-check.mjs';
import { tailwindOnlyCheck } from './tailwind-only-check.mjs';
import { templateDepthCheck } from './template-depth-check.mjs';
import { testDependenciesCheck } from './test-dependencies-check.mjs';
import { testFilesCheck } from './test-files-check.mjs';
import { themeTokensCheck } from './theme-tokens-check.mjs';

export const allStandardChecks = [
  codeCommentsCheck,
  consoleUsageCheck,
  markupCommentsCheck,
  strictJsonConfigCheck,
  suppressionsCheck,
  testFilesCheck,
  testDependenciesCheck,
  templateDepthCheck,
  tailwindOnlyCheck,
  paletteCheck,
  themeTokensCheck,
];
