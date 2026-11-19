export const PIXEL_ICON_GRIDS = {
  github: [
    '.#........#.',
    '.##......##.',
    '.##########.',
    '############',
    '##..####..##',
    '##..####..##',
    '############',
    '.##########.',
    '..########..',
    '...##..##...',
    '#..##..##...',
    '.##.........',
  ],
  linkedin: [
    '############',
    '############',
    '##.#########',
    '############',
    '##.##.#..###',
    '##.##..##.##',
    '##.##.###.##',
    '##.##.###.##',
    '##.##.###.##',
    '##.##.###.##',
    '############',
    '############',
  ],
  twitch: [
    '.###########',
    '############',
    '############',
    '####.##.####',
    '####.##.####',
    '####.##.####',
    '############',
    '###########.',
    '##########..',
    '#####.###...',
    '....##......',
    '....#.......',
  ],
  blogger: [
    '.##########.',
    '############',
    '##.....#####',
    '##.###.#####',
    '##.###.#####',
    '##.....#####',
    '##.####.####',
    '##.####.####',
    '##.####.####',
    '##......####',
    '############',
    '.##########.',
  ],
} as const;

export type PixelIconName = keyof typeof PIXEL_ICON_GRIDS;

const FILLED_PIXEL = '#';

function pixelPathsOfRow(rowPixels: string, rowIndex: number): string[] {
  return [...rowPixels].flatMap((pixel, columnIndex) =>
    pixel === FILLED_PIXEL ? [`M${columnIndex} ${rowIndex}h1v1h-1z`] : [],
  );
}

export function pixelIconPath(iconName: PixelIconName): string {
  return PIXEL_ICON_GRIDS[iconName].flatMap(pixelPathsOfRow).join('');
}
