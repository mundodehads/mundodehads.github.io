import { restrictedPackagePatterns } from './shared-rules.mjs';
import { parameterLimitRestrictions } from './typescript-rules.mjs';

const forbiddenLegacyDecorators = [
  'Input',
  'Output',
  'ViewChild',
  'ViewChildren',
  'ContentChild',
  'ContentChildren',
  'HostBinding',
  'HostListener',
  'NgModule',
].join('|');

const forbiddenDecoratorMessage = 'Use input(), output(), viewChild(), host and standalone instead of legacy APIs.';
const reactiveFormsMessage = 'Use Signal Forms from @angular/forms/signals.';

const forbiddenFormImports = {
  name: '@angular/forms',
  importNames: ['ReactiveFormsModule', 'FormsModule', 'FormControl', 'FormGroup', 'FormArray', 'FormBuilder', 'NgModel'],
  message: reactiveFormsMessage,
};

export const angularComponentRules = {
  '@angular-eslint/prefer-signals': 'error',
  '@angular-eslint/prefer-standalone': 'error',
  '@angular-eslint/prefer-output-emitter-ref': 'error',
  '@angular-eslint/prefer-on-push-component-change-detection': 'error',
  'no-restricted-imports': ['error', { patterns: restrictedPackagePatterns, paths: [forbiddenFormImports] }],
  'no-restricted-syntax': [
    'error',
    ...parameterLimitRestrictions,
    {
      selector: `Decorator[expression.name=/^(${forbiddenLegacyDecorators})$/]`,
      message: forbiddenDecoratorMessage,
    },
    {
      selector: `Decorator[expression.callee.name=/^(${forbiddenLegacyDecorators})$/]`,
      message: forbiddenDecoratorMessage,
    },
    {
      selector: "Decorator[expression.callee.name='Component'] Property[key.name='template']",
      message: 'Templates live in .html files, referenced by templateUrl.',
    },
  ],
};

export const angularTemplateRules = {
  '@angular-eslint/template/prefer-control-flow': 'error',
  '@angular-eslint/template/prefer-ngsrc': 'error',
  '@angular-eslint/template/alt-text': 'error',
  '@angular-eslint/template/label-has-associated-control': 'error',
  '@angular-eslint/template/click-events-have-key-events': 'error',
  '@angular-eslint/template/interactive-supports-focus': 'error',
  '@angular-eslint/template/elements-content': 'error',
  '@angular-eslint/template/valid-aria': 'error',
};
