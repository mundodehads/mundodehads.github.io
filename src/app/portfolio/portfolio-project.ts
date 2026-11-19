export const GITHUB_REPOSITORIES_URL = 'https://api.github.com/users/mundodehads/repos?sort=pushed&per_page=100';

const PROFILE_REPOSITORY_NAME = 'mundodehads';
const MISSING_DESCRIPTION = 'No description yet.';

interface ProjectOverride {
  readonly name: string;
  readonly description: string;
}

const PROJECT_OVERRIDES = new Map<string, ProjectOverride>([
  [
    'mundodehads.github.io',
    { name: 'This Website', description: 'This page: Angular 22 with signals, prerendered and hydrated, on GitHub Pages.' },
  ],
]);

export interface GithubRepository {
  readonly name: string;
  readonly html_url: string;
  readonly description: string | null;
  readonly language: string | null;
  readonly pushed_at: string;
}

export interface PortfolioProject {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly language: string | null;
  readonly lastPushedAt: string;
}

function toPortfolioProject(repository: GithubRepository): PortfolioProject {
  const projectOverride = PROJECT_OVERRIDES.get(repository.name);
  return {
    name: projectOverride?.name ?? repository.name,
    url: repository.html_url,
    description: projectOverride?.description ?? repository.description ?? MISSING_DESCRIPTION,
    language: repository.language,
    lastPushedAt: repository.pushed_at,
  };
}

export function toPortfolioProjects(repositories: readonly GithubRepository[]): PortfolioProject[] {
  return repositories
    .filter((repository) => repository.name !== PROFILE_REPOSITORY_NAME)
    .map(toPortfolioProject);
}

export function languagesOf(projects: readonly PortfolioProject[]): string[] {
  const languages = projects.flatMap((project) => (project.language === null ? [] : [project.language]));
  return [...new Set(languages)].sort();
}

export function projectsInLanguage(projects: readonly PortfolioProject[], language: string | null): PortfolioProject[] {
  return language === null ? [...projects] : projects.filter((project) => project.language === language);
}
