import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { pixelIconPath, type PixelIconName } from './pixel-icon-grids';

const DEFAULT_ICON_SIZE = 24;

@Component({
  selector: 'app-pixel-icon',
  templateUrl: './pixel-icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
})
export class PixelIcon {
  readonly name = input.required<PixelIconName>();
  readonly size = input(DEFAULT_ICON_SIZE);

  protected readonly path = computed(() => pixelIconPath(this.name()));
}
