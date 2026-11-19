import { copyFileSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BUILD_DIRECTORY = 'dist/browser';
const RENAMED_FILES = new Map([
  ['main.js', 'index.js'],
  ['styles.css', 'index.css'],
]);
const COPIED_FILES = ['favicon.svg'];
const PAGE_FILE = 'index.html';

function assertSingleBundle(buildFiles) {
  const unexpectedScripts = buildFiles.filter((fileName) => fileName.endsWith('.js') && !RENAMED_FILES.has(fileName));
  if (unexpectedScripts.length > 0) {
    throw new Error(`The build produced extra scripts (${unexpectedScripts.join(', ')}); keep the app in one bundle.`);
  }
}

function rewriteReferences(pageContent) {
  return [...RENAMED_FILES].reduce(
    (rewrittenContent, [builtName, publishedName]) => rewrittenContent.replaceAll(`"${builtName}"`, `"${publishedName}"`),
    pageContent,
  );
}

const buildFiles = readdirSync(BUILD_DIRECTORY);
assertSingleBundle(buildFiles);

RENAMED_FILES.forEach((publishedName, builtName) => copyFileSync(join(BUILD_DIRECTORY, builtName), publishedName));
COPIED_FILES.forEach((fileName) => copyFileSync(join(BUILD_DIRECTORY, fileName), fileName));
writeFileSync(PAGE_FILE, rewriteReferences(readFileSync(join(BUILD_DIRECTORY, PAGE_FILE), 'utf8')));
