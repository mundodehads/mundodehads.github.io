import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LanguageFilter } from './language-filter';
import {
  GITHUB_REPOSITORIES_URL,
  type GithubRepository,
  languagesOf,
  projectsInLanguage,
  toPortfolioProjects,
} from './portfolio-project';
import { RepositoryCard } from './repository-card';

const SKELETON_CARD_COUNT = 3;

@Component({
  selector: 'app-portfolio-section',
  templateUrl: './portfolio-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageFilter, RepositoryCard],
})
export class PortfolioSection {
  private readonly repositories = httpResource<GithubRepository[]>(() => GITHUB_REPOSITORIES_URL, {
    defaultValue: [],
  });

  protected readonly projects = computed(() => toPortfolioProjects(this.repositories.value()));
  protected readonly languages = computed(() => languagesOf(this.projects()));
  protected readonly selectedLanguage = signal<string | null>(null);
  protected readonly visibleProjects = computed(() => projectsInLanguage(this.projects(), this.selectedLanguage()));
  protected readonly isLoading = this.repositories.isLoading;
  protected readonly hasError = computed(() => this.repositories.error() !== undefined);
  protected readonly skeletonSlots = [...Array(SKELETON_CARD_COUNT).keys()];
}
