import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioSection } from './portfolio/portfolio-section';
import { ProfileHeader } from './profile/profile-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProfileHeader, PortfolioSection],
})
export class App {
  protected readonly currentYear = new Date().getFullYear();
}
