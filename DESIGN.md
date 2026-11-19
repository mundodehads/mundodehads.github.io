# Design reference

Dark, neon and pixelated: an arcade terminal. Square corners, hard offset shadows, a pixel font for names and titles, a mono font for labels, and two neon accents that glow.

## Color tokens

The default Tailwind palette is removed. Only these tokens exist, in `src/theme.css`:

| Token | Value | Use |
|---|---|---|
| `black`, `white`, `transparent`, `current` | | Utilities, hard shadows |
| `void` | `#04060b` | Page background |
| `ink-900` | `#0a0f1c` | Cards, buttons, background grid lines |
| `ink-800` | `#111a2e` | Skeletons, dividers |
| `ink-700` | `#23314f` | Borders |
| `ink-400` | `#8c9ab8` | Secondary text |
| `ink-100` | `#e6ecf8` | Body text |
| `neon` | `#00f3fe` | Primary accent: name, highlights, hover, focus |
| `neon-strong` | `#00c2cc` | Pressed state of the accent |
| `pink` | `#ff3df2` | Secondary accent: section titles, prompt, cursor |
| `danger` | `#ff5d63` | Errors |
| `lang-*` | GitHub linguist colors | Language dots only |

## Typography

| Role | Font | Use |
|---|---|---|
| Body | Inter (`font-sans`) | Paragraphs |
| Pixel | Press Start 2P (`font-pixel`) | Name, section and card titles |
| Mono | JetBrains Mono (`font-mono`) | Labels, links, filters, dates, footer |

Fonts load from Google Fonts in `src/index.html`; the build inlines their CSS.

## Shapes and effects

- No rounded corners.
- Cards and buttons: `border-2 border-ink-700 bg-ink-900` with a hard shadow (`shadow-pixel` or `shadow-pixel-sm`).
- Hover: border and text turn `neon` and the element lifts by 2px; cards swap to `shadow-pixel-neon`. Active: it presses down and loses the shadow.
- Glow: `text-shadow-neon` on the name, `text-shadow-pink` on section titles. Nowhere else.
- Icons are 12×12 pixel art (`pixel-icon-grids.ts`), drawn in `currentColor` with crisp edges.
- Background: a 32px grid in `ink-900` over `void`.

## Motion

Only `transform` and `opacity`, at most 400ms, stepped where it fits the pixel look (`animate-rise`, `animate-blink`). Every animation has a `motion-reduce:` variant, and the name effect stays still with reduced motion.

## Accessibility and layout

Mobile-first; checked at 375, 768, 1280 and 1920px, with no horizontal scroll at 375px. Content in `max-w-5xl` with `px-4 sm:px-6`. Touch targets at least 44px (`min-h-11`). Focus is a 2px `neon` outline. Text contrast AA: secondary text is `ink-400` only.
