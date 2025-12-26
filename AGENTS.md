# Agent Playbook

## Commands

- **Install deps**: `bun install`
- **Dev server**: `bun run dev` (Vite @3000, HMR enabled)
- **Production build**: `bun run build`; preview with `bun run preview`
- **Linting**: `bun run lint`
- **Autofix + format**: `bun run check`
- **Format only**: `bun run format` (Prettier)
- **Full test suite**: `bun run test`
- **Single test file**: `bun run test -- path/to/file.test.ts`
- **Single test case**: `bun x vitest run -t "test name"`

## Code Style

### TypeScript

- **Strict mode** enabled
- **Module resolution**: bundler
- **AllowJs**: true (for config files)
- **Path aliases**: `@/` → `./src/*` (configured in tsconfig)

### Formatting (Prettier)

- **No semicolons**
- **Single quotes**
- **Trailing commas**: always
- Run `bun run format` to apply

### Imports & Dependencies

- Use `@/` alias for internal imports, avoid deep relative paths
- Icons: `@tabler/icons-react` with `IconName` prefix (e.g., `IconArrowRight`, `IconBrandGithub`)
- UI components: shadcn/ui via local `@/components/ui/*` imports
- Avoid adding new dependencies without checking existing stack

### React Components

- **Functional components only** (no class components)
- **Hooks**: keep flat at top level, no nested hooks
- **Naming**: PascalCase for components (e.g., `Navigation`), kebab-case for files (e.g., `navigation.tsx`)
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- Use `cn()` utility from `@/lib/utils` for className merging (wraps clsx + tailwind-merge)
- Leverage component variants from class-variance-authority, avoid inline style overrides

### Naming Conventions

- Components: PascalCase (`VisitorCounter`)
- Utilities/hooks: camelCase (`getVisitorGeoData`, `cn`)
- Files: kebab-case (`visitor-counter.tsx`, `theme-toggle.tsx`)
- Types/interfaces: PascalCase with descriptive names (`VisitorGeoData`)

### Types

- **Prefer explicit types/interfaces** over `any`
- Use TanStack utility types when appropriate
- Server functions (`createServerFn`) should have typed request/response interfaces
- Null returns for graceful failure (see `src/lib/visitor.ts` pattern)

### Error Handling

- Use **narrow try/catch** blocks
- Return typed fallback values or Result objects; never swallow failures silently
- Log errors with `console.error` before returning null/defaults
- Rethrow typed Errors for critical failures

### Styling

- **Tailwind CSS 4** with shadcn/ui component library
- **Theme**: dark mode default, managed by `ThemeToggle` via `localStorage` + `html.dark` class
- **Icons**: always from `@tabler/icons-react`, follow `IconName` pattern
- Use component variants for consistent styling; don't override with arbitrary Tailwind unless necessary

### Accessibility

- Use semantic HTML elements
- Include descriptive aria-labels on interactive elements
- Follow shadcn/ui accessibility patterns for keyboard navigation

### Framework Specifics

- **Router**: TanStack Start with file-based routing in `src/routes/`
- Route components use `createFileRoute` from `@tanstack/react-router`
- Commit regenerated `routeTree.gen.ts` artifacts after route changes
- **SSR**: enabled via Nitro; server functions use `@tanstack/react-start/server`
- **Backend**: Convex for data persistence (schema in `convex/schema.ts`)

### Testing

- Test files: `*.test.ts` or `*.test.tsx`
- Testing Library: `@testing-library/react`, `@testing-library/dom`
- Environment: Vitest with jsdom
- Write tests for user behavior, not implementation details

### Assets

- Static assets in `public/` directory
- Optimize images for web, use responsive techniques
- Profile picture: `src/assets/profile-picture-afiq.jpg`

### Git & Project Rules

- **No Cursor/Copilot rule files** detected; this document is authoritative
- Follow existing commit patterns when creating new commits
- Keep components focused and single-responsibility
- Reuse existing utility functions before creating new ones

## Quick Checks

- [ ] Ran `bun run lint` and `bun run check` before committing
- [ ] Used `@/` alias instead of relative paths
- [ ] Followed Prettier formatting (no semicolons, single quotes)
- [ ] Added/updated type definitions for new props or return values
- [ ] Checked accessibility (aria-labels, keyboard navigation)
- [ ] Verified dark mode compatibility
- [ ] Tested both dev and production builds when adding features
