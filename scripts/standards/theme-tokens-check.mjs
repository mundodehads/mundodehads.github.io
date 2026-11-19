import { lineNumberAt } from './pattern-matching.mjs';

const THEME_STYLESHEET = 'src/theme.css';
const MISSING_RESET_RULE = 'the theme must remove the default palette with --color-*: initial';
const FORBIDDEN_TOKEN_RULE = 'color token not listed in DESIGN.md';
const PALETTE_RESET_PATTERN = /--color-\*\s*:\s*initial/;
const COLOR_TOKEN_PATTERN = /--color-([a-z0-9-]+)\s*:/g;
const ALLOWED_COLOR_TOKENS = new Set([
  'black',
  'white',
  'transparent',
  'current',
  'void',
  'ink-900',
  'ink-800',
  'ink-700',
  'ink-400',
  'ink-100',
  'neon',
  'neon-strong',
  'pink',
  'danger',
  'lang-typescript',
  'lang-javascript',
  'lang-html',
  'lang-css',
  'lang-cpp',
  'lang-c',
  'lang-java',
  'lang-python',
  'lang-php',
  'lang-kotlin',
  'lang-csharp',
  'lang-shell',
]);

export const themeTokensCheck = {
  appliesToFile: (projectFile) => projectFile.relativePath === THEME_STYLESHEET,
  findViolations(projectFile) {
    const fileContent = projectFile.readContent();
    const resetViolations = PALETTE_RESET_PATTERN.test(fileContent) ? [] : [{ line: 1, rule: MISSING_RESET_RULE }];
    const tokenViolations = [...fileContent.matchAll(COLOR_TOKEN_PATTERN)]
      .filter((tokenMatch) => !ALLOWED_COLOR_TOKENS.has(tokenMatch[1]))
      .map((tokenMatch) => ({ line: lineNumberAt(fileContent, tokenMatch.index), rule: FORBIDDEN_TOKEN_RULE }));
    return [...resetViolations, ...tokenViolations];
  },
};
