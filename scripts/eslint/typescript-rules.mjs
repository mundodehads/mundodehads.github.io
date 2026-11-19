const MAXIMUM_FUNCTION_PARAMETERS = 3;
const ALLOWED_MAGIC_NUMBERS = [-1, 0, 1];
const BOOLEAN_PREFIXES = ['is', 'has', 'can', 'should', 'accepts', 'was', 'IS_', 'HAS_', 'CAN_', 'SHOULD_', 'ACCEPTS_', 'WAS_'];
const SHORT_NAME_RULE = { regex: '^(?!id$|up$|to$|on$).{1,2}$', match: false };

const namingSelectors = [
  { selector: 'default', format: ['camelCase'] },
  { selector: 'import', format: ['camelCase', 'PascalCase'] },
  { selector: 'variable', format: ['camelCase', 'PascalCase'] },
  { selector: 'variable', modifiers: ['const'], format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
  { selector: 'function', format: ['camelCase', 'PascalCase'] },
  { selector: 'typeLike', format: ['PascalCase'] },
  { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
  { selector: 'objectLiteralProperty', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
  { selector: 'typeProperty', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
  { selector: 'classProperty', modifiers: ['static', 'readonly'], format: ['camelCase', 'UPPER_CASE'] },
  {
    selector: ['variable', 'parameter', 'parameterProperty', 'classProperty', 'typeProperty'],
    types: ['boolean'],
    format: ['PascalCase', 'UPPER_CASE'],
    prefix: BOOLEAN_PREFIXES,
  },
];

const quotedPropertySelector = {
  selector: ['objectLiteralProperty', 'typeProperty', 'objectLiteralMethod', 'typeMethod'],
  modifiers: ['requiresQuotes'],
  format: null,
};

const githubFieldSelector = {
  selector: ['objectLiteralProperty', 'typeProperty'],
  filter: { regex: '^(html_url|pushed_at)$', match: true },
  format: null,
};

const namingConventionSelectors = [
  ...namingSelectors.map((namingSelector) => ({ ...namingSelector, custom: SHORT_NAME_RULE })),
  quotedPropertySelector,
  githubFieldSelector,
];

const PARAMETER_LIMIT_MESSAGE =
  'Use at most 3 parameters; group them in a typed object. Only dependency injection constructors are exempt.';

export const parameterLimitRestrictions = [
  `FunctionDeclaration[params.length>${MAXIMUM_FUNCTION_PARAMETERS}]`,
  `ArrowFunctionExpression[params.length>${MAXIMUM_FUNCTION_PARAMETERS}]`,
  `:not(MethodDefinition[kind='constructor']) > FunctionExpression[params.length>${MAXIMUM_FUNCTION_PARAMETERS}]`,
].map((selector) => ({ selector, message: PARAMETER_LIMIT_MESSAGE }));

export const typeScriptCodeRules = {
  'no-restricted-syntax': ['error', ...parameterLimitRestrictions],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'after-used' }],
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/naming-convention': ['error', ...namingConventionSelectors],
  'no-magic-numbers': 'off',
  '@typescript-eslint/no-magic-numbers': [
    'error',
    {
      ignore: ALLOWED_MAGIC_NUMBERS,
      enforceConst: true,
      ignoreEnums: true,
      ignoreReadonlyClassProperties: true,
      ignoreNumericLiteralTypes: true,
      ignoreTypeIndexes: true,
    },
  ],
};

export const javaScriptCodeRules = {
  'max-params': ['error', { max: MAXIMUM_FUNCTION_PARAMETERS }],
  'no-magic-numbers': ['error', { ignore: ALLOWED_MAGIC_NUMBERS, enforceConst: true }],
};
