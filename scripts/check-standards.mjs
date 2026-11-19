import { resolve } from 'node:path';
import { allStandardChecks } from './standards/all-standard-checks.mjs';
import { collectProjectFiles } from './standards/collect-project-files.mjs';

const [, , rootDirectoryArgument = process.cwd()] = process.argv;
const projectRootDirectory = resolve(rootDirectoryArgument);
const projectFiles = collectProjectFiles(projectRootDirectory);

function findViolationsInFile(projectFile) {
  return allStandardChecks
    .filter((standardCheck) => standardCheck.appliesToFile(projectFile))
    .flatMap((standardCheck) => standardCheck.findViolations(projectFile))
    .map((violation) => `${projectFile.relativePath}:${violation.line}: ${violation.rule}`);
}

const violationMessages = projectFiles.flatMap(findViolationsInFile);

violationMessages.forEach((violationMessage) => console.error(violationMessage));
process.exitCode = violationMessages.length > 0 ? 1 : 0;
