import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { languageDotClass } from './language-colors';

@Component({
  selector: 'app-language-filter',
  templateUrl: './language-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageFilter {
  readonly languages = input.required<readonly string[]>();
  readonly selectedLanguage = model<string | null>(null);

  protected readonly languageDotClass = languageDotClass;
}
