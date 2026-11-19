const LANGUAGE_DOT_CLASSES = new Map([
  ['TypeScript', 'bg-lang-typescript'],
  ['JavaScript', 'bg-lang-javascript'],
  ['HTML', 'bg-lang-html'],
  ['CSS', 'bg-lang-css'],
  ['C++', 'bg-lang-cpp'],
  ['C', 'bg-lang-c'],
  ['Java', 'bg-lang-java'],
  ['Python', 'bg-lang-python'],
  ['PHP', 'bg-lang-php'],
  ['Kotlin', 'bg-lang-kotlin'],
  ['C#', 'bg-lang-csharp'],
  ['Shell', 'bg-lang-shell'],
]);

const DEFAULT_LANGUAGE_DOT_CLASS = 'bg-neon';

export function languageDotClass(language: string): string {
  return LANGUAGE_DOT_CLASSES.get(language) ?? DEFAULT_LANGUAGE_DOT_CLASS;
}
