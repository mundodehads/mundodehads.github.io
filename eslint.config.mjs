import angular from 'angular-eslint';
import typescriptEslint from 'typescript-eslint';
import { angularComponentRules, angularTemplateRules } from './scripts/eslint/angular-rules.mjs';
import { sharedCodeRules } from './scripts/eslint/shared-rules.mjs';
import { javaScriptCodeRules, typeScriptCodeRules } from './scripts/eslint/typescript-rules.mjs';

const typeScriptFiles = ['**/*.ts'];

const typeScriptRecommendedConfigs = typescriptEslint.configs.recommended.map((recommendedConfig) => ({
  ...recommendedConfig,
  files: typeScriptFiles,
}));

export default [
  { ignores: ['node_modules/**', 'dist/**', '.angular/**', '.claude/**', 'index.js'] },
  ...typeScriptRecommendedConfigs,
  {
    files: typeScriptFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: { ...sharedCodeRules, ...typeScriptCodeRules },
  },
  {
    files: ['**/*.mjs'],
    rules: { ...sharedCodeRules, ...javaScriptCodeRules },
  },
  {
    files: ['src/**/*.ts'],
    plugins: { '@angular-eslint': angular.tsPlugin },
    rules: angularComponentRules,
  },
  {
    files: ['src/**/*.html'],
    languageOptions: { parser: angular.templateParser },
    plugins: { '@angular-eslint/template': angular.templatePlugin },
    rules: angularTemplateRules,
  },
];
