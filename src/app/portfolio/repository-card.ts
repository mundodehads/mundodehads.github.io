import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { languageDotClass } from './language-colors';
import type { PortfolioProject } from './portfolio-project';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  host: { class: 'block h-full' },
})
export class RepositoryCard {
  readonly project = input.required<PortfolioProject>();

  protected readonly languageDotClass = languageDotClass;
}
