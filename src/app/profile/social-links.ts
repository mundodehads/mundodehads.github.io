import type { PixelIconName } from './pixel-icon-grids';

export interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: PixelIconName;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/mundodehads', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/henriquedsilva/', icon: 'linkedin' },
  { label: 'Twitch', url: 'https://www.twitch.tv/mundodehads', icon: 'twitch' },
  { label: 'Blogger', url: 'https://worldofhads.blogspot.com/', icon: 'blogger' },
];
