import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const IGNORED_DIRECTORIES_ANYWHERE = new Set(['node_modules', 'dist', '.angular', '.git']);
const IGNORED_ROOT_PATHS = new Set(['.claude', 'index.html', 'index.css', 'index.js']);

function toRelativePath(absolutePath, rootDirectory) {
  return relative(rootDirectory, absolutePath).split(sep).join('/');
}

function isIgnoredPath(entryPath, rootDirectory) {
  const relativePath = toRelativePath(entryPath, rootDirectory);
  const entryName = relativePath.split('/').at(-1);
  return IGNORED_DIRECTORIES_ANYWHERE.has(entryName) || IGNORED_ROOT_PATHS.has(relativePath);
}

function listFilePaths(directory, rootDirectory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((directoryEntry) => {
    const entryPath = join(directory, directoryEntry.name);
    if (isIgnoredPath(entryPath, rootDirectory)) {
      return [];
    }
    return directoryEntry.isDirectory() ? listFilePaths(entryPath, rootDirectory) : [entryPath];
  });
}

function toProjectFile(absolutePath, rootDirectory) {
  return {
    relativePath: toRelativePath(absolutePath, rootDirectory),
    readContent: () => readFileSync(absolutePath, 'utf8'),
  };
}

export function collectProjectFiles(rootDirectory) {
  return listFilePaths(rootDirectory, rootDirectory).map((absolutePath) => toProjectFile(absolutePath, rootDirectory));
}
