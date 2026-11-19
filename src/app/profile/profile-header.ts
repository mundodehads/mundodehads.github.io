import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NameTypewriter } from './name-typewriter';
import { PixelIcon } from './pixel-icon';
import { SOCIAL_LINKS } from './social-links';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NameTypewriter, PixelIcon],
})
export class ProfileHeader {
  protected readonly socialLinks = SOCIAL_LINKS;
}
