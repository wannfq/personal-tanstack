# Repository Guidelines

## Project Overview

Personal portfolio and analytics dashboard built with **TanStack Start** (SSR framework), **React 19**, **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, and a **Convex** real-time backend. Features visitor tracking with IP geolocation, device detection, referrer parsing, and an interactive analytics dashboard with a geographic heatmap. Deployed to **Netlify** via Nitro.

## Architecture & Data Flow

```
Client (React 19 + TanStack Router)
  ├── Routes (file-based, src/routes/)
  │   ├── index.tsx — Static home page (hero, about, experience, contact)
  │   ├── analytics.tsx — Real-time dashboard (Convex queries → charts/map)
  │   └── $.tsx — Catch-all 404
  ├── Components (src/components/)
  │   ├── visitor-counter.tsx — Records visits via Convex mutation, displays count
  │   ├── visitor-map.tsx — react-simple-maps geographic heatmap
  │   ├── navigation.tsx / footer.tsx — Layout shell
  │   └── theme-toggle.tsx — Dark/light mode via html.dark class
  └── Root layout (__root.tsx)
        └── Lazy-initializes Convex client (useEffect + useState → ConvexProvider)

Server (Nitro SSR + TanStack Start server functions)
  └── src/lib/visitor.ts — createServerFn: resolves IP → geolocation + device info

Backend (Convex — real-time serverless)
  ├── convex/schema.ts — visitors table (visitorId, city, country, lat, lng, deviceType, referrer, timestamp)
  └── convex/visitors.ts — Queries (count, locations, devices, referrals) + mutation (recordVisit with dedup)
```

**Visitor tracking flow:** Client mounts → `visitor-counter.tsx` calls `createServerFn` to resolve geo/device from request headers → calls Convex `recordVisit` mutation (deduplicates by visitorId within session) → analytics page queries Convex in real time for aggregated data.

## Key Directories

| Directory | Purpose |
|---|---|
| `src/routes/` | File-based routes (TanStack Router codegen → `routeTree.gen.ts`) |
| `src/components/` | Shared UI components + `ui/` (shadcn/ui primitives) |
| `src/lib/` | Server functions, utilities, Convex client singleton, parsers |
| `src/styles.css` | Tailwind CSS 4 entry — CSS custom properties (oklch), dark/light theme tokens |
| `convex/` | Convex backend — schema, queries, mutations (`_generated/` is auto-generated) |
| `public/` | Static assets |
| `src/assets/` | Bundled assets (profile picture) |

## Development Commands

```bash
bun install                     # Install dependencies
bun run dev                     # Vite dev server at :3000 (HMR)
bun run build                   # Production build (Vite → .output/ via Nitro)
bun run start                   # Run production server (.output/server/index.mjs)
bun run preview                 # Preview production build
bun run test                    # Vitest (single run)
bun run test -- path/to.test.ts # Single test file
bun run lint                    # ESLint
bun run format                  # Prettier
bun run check                   # Prettier + ESLint autofix combined
npx convex dev                  # Convex dev server (required alongside vite for data features)
```

## Code Conventions & Common Patterns

### TypeScript

- **Strict mode** — `noUnusedLocals`, `noUnusedParameters` enabled
- **Module resolution**: bundler mode
- **Path alias**: `@/` → `./src/*` (tsconfig paths)

### Formatting (Prettier)

- **No semicolons**
- **Single quotes**
- **Trailing commas**: `all`
- Run `bun run format` to apply, or `bun run check` for format + lint autofix

### Naming Conventions

| Kind | Convention | Example |
|---|---|---|
| Components | PascalCase | `VisitorCounter`, `ThemeToggle` |
| Component files | kebab-case | `visitor-counter.tsx`, `theme-toggle.tsx` |
| Utilities/hooks | camelCase | `getVisitorGeoData`, `cn` |
| Types/interfaces | PascalCase | `VisitorGeoData` |

### Components

- **Functional only** — no class components
- **Hooks flat at top level** — no nesting
- **Styling**: Tailwind CSS 4 utility classes + `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`)
- **Variants**: class-variance-authority (CVA) — avoid inline style overrides
- **Icons**: `@tabler/icons-react` exclusively, `IconName` prefix (e.g., `IconArrowRight`, `IconBrandGithub`)
- **UI primitives**: shadcn/ui in `@/components/ui/`, built on `@base-ui/react` with CVA

### Error Handling

- Narrow `try/catch` blocks — never swallow silently
- Return typed fallbacks or `null` for graceful degradation
- `console.error` before returning defaults
- Rethrow typed `Error` for critical failures

### Imports

- Use `@/` alias for all internal imports
- Avoid deep relative paths (`../../../`)

### Server Functions

- Use `createServerFn` from TanStack Start (`@tanstack/react-start`)
- Typed request/response interfaces
- Return `null` for graceful failure (see `src/lib/visitor.ts` pattern)

### Theming

- Dark mode default, toggled via `ThemeToggle` (localStorage + `html.dark` class)
- CSS custom properties in oklch color space (defined in `src/styles.css`)
- JetBrains Mono as the sole font family

## Important Files

| File | Role |
|---|---|
| `src/router.tsx` | Router instantiation (`getRouter()`) |
| `src/routeTree.gen.ts` | Auto-generated route tree (commit after route changes) |
| `src/routes/__root.tsx` | Root layout — Convex client init, nav, footer shell |
| `src/lib/visitor.ts` | Server function — IP geolocation + device detection |
| `src/lib/convex.ts` | Convex client singleton (lazy, env-driven) |
| `src/lib/referrer-parser.ts` | Referrer URL → brand name matching |
| `src/lib/utils.ts` | `cn()` className merge utility |
| `convex/schema.ts` | Convex data model (visitors table + indexes) |
| `convex/visitors.ts` | Convex queries + recordVisit mutation (dedup + geo-patch) |
| `src/styles.css` | Tailwind CSS 4 entry + theme tokens + font imports |
| `vite.config.ts` | Vite 7 + all plugins (TanStack, Nitro, Tailwind, Netlify, tsconfig-paths) |
| `components.json` | shadcn/ui CLI config (base-lyra style, tabler icons) |

## Runtime & Tooling Preferences

- **Runtime**: Bun (package manager + scripts). Netlify deploys with Bun 1.3.8
- **Framework**: TanStack Start v1.132 + React 19 + Vite 7
- **SSR**: Nitro (latest) — generates `.output/server/index.mjs`
- **Backend**: Convex v1.31 (real-time serverless DB). Requires `VITE_CONVEX_URL` env var and `npx convex dev` for local development
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` plugin (not PostCSS)
- **Component library**: shadcn/ui (base-lyra), installed via `npx shadcn@latest add <component>`
- **Icons**: `@tabler/icons-react` — never substitute with other icon libraries
- **Font**: `@fontsource-variable/jetbrains-mono` — single font, no font switching
- **Deployment**: Netlify (`@netlify/vite-plugin-tanstack-start`). Build output in `dist/`, server in `.output/`
- **ESM only**: `"type": "module"` in package.json

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_CONVEX_URL` | Convex cloud endpoint (required for visitor features) |
| `CONVEX_DEPLOYMENT` | Convex deployment identifier |
| `VITE_IGNORE_VISITOR_IP` | Toggle to disable IP geolocation lookups |

## Testing & QA

- **Framework**: Vitest 3.x with jsdom environment
- **Libraries**: `@testing-library/react` 16.x, `@testing-library/dom` 10.x
- **Test files**: `*.test.ts` or `*.test.tsx`
- **Run**: `bun run test` (single run), `bun run test -- path/to/file.test.ts` (specific file), `bun x vitest run -t "test name"` (specific case)
- **Philosophy**: Test user behavior, not implementation details
- **Coverage**: No thresholds configured (add `@vitest/coverage-*` if needed)
- **No test setup files**: Vitest uses defaults — no `setupFiles`, no global mocks, no custom render wrappers yet
- **Convex testing**: No test utilities installed — consider `convex-test` for query/mutation unit tests
