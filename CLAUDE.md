# mundodehads.github.io

Personal site of Henrique Silva (mundodehads), served by GitHub Pages from the repository root. One page: a header with the name effect and profile links, and a portfolio that lists the public GitHub repositories.

Stack: Angular 22 (zoneless, signals, prerender with hydration) and Tailwind CSS 4. Visual identity in [DESIGN.md](DESIGN.md).

## How publishing works

`npm run build` prerenders the app into `dist/` and `scripts/publish.mjs` copies it to the root as `index.html`, `index.css`, `index.js` and `favicon.svg`. Those four files are what GitHub Pages serves. They are generated: never edit them by hand, and commit them together with the source change that produced them.

The app must stay a single bundle. `publish.mjs` fails if the build emits extra scripts, so no lazy routes and no `@defer` blocks that split code.

The repository list is fetched from the GitHub API during prerender and reaches the browser through the HTTP transfer cache. A new repository only shows after the next build.

## Absolute rules

1. **No tests of any kind.** Verification is lint, `check:standards`, build and using the page.
2. **No comments anywhere**: code, templates, CSS and config. That includes `eslint-disable` and `@ts-ignore`.
3. **No `console.log`, `console.info` or `console.warn`.** Only `console.error` for errors.
4. **Tailwind only.** No `styles`/`styleUrl`, no `style` attribute, no extra CSS files. The only stylesheets are `src/theme.css` (tokens, `@layer base`, `@keyframes`) and `src/styles.css` (imports only).
5. **Colors only from the theme tokens** listed in DESIGN.md. No arbitrary values such as `bg-[#...]`.
6. **Never use `--force` or `--legacy-peer-deps`.** On a dependency conflict, stop and report.

## Code standards

- **Language:** code in English; visible text in English.
- **Descriptive names:** `const sumOfTwoNumbers = firstNumber + secondNumber`, never `const sum = a + b`. No abbreviations (`index`, not `i`; `event`, not `e`; `error`, not `err`). Minimum 3 characters, except `id`.
- **Maximum depth 2:** at most two nested blocks in a function and two nested `@if`/`@for`/`@switch` in a template. The third level becomes a function or a component.
- **Limits:** functions up to 30 lines and 3 parameters (use a typed object), cyclomatic complexity up to 8, files up to 150 lines, no magic numbers.
- **Clean Code:** early return instead of `else`, one responsibility per function and component, values with rules as named constants or types.
- **TypeScript:** `strict`, no `any`, no unnecessary `as`, explicit return types on public functions, `readonly` where it applies.

## Angular

Standalone components with `ChangeDetectionStrategy.OnPush`, `input()`, `output()`, `model()`, `computed()`, `inject()` and `httpResource`. Control flow `@if`/`@for`/`@switch` and `@let`. Zoneless, without `zone.js`. Forbidden: `@Input`, `@Output`, `@ViewChild`, `@HostBinding`, `@HostListener`, `*ngIf`, `*ngFor` and `NgModule`. Templates always in `.html` files. Browser APIs only inside `afterNextRender`, because the page is prerendered.

File names follow the CLI 22 style without the `.component` suffix (`PortfolioSection` in `portfolio-section.ts`).

## Commands

| Command | Effect |
|---|---|
| `npm start` | Dev server on port 4200 |
| `npm run build` | Prerender and publish to the root files |
| `npm run lint` | ESLint |
| `npm run check:standards` | Project rules ESLint does not cover |

## Workflow for agents

1. Read this file and DESIGN.md.
2. Before using a library API you are unsure of, check the types in `node_modules` or the official docs.
3. Run `npm run lint`, `npm run check:standards` and `npm run build`, and fix everything.
4. Check the change in the browser (`.claude/launch.json`): `site` for the dev server, `published` for the root files exactly as GitHub Pages serves them.
5. Call the reviewers in `.claude/agents/` that match the change and fix the confirmed findings.
6. Stop. Do not commit unless the user asks.
