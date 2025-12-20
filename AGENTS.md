# Agent Playbook

1. Install deps with `bun install`; prefer Bun for all scripts.
2. Dev server: `bun run dev` (Vite @3000, HMR on).
3. Production build: `bun run build`; preview with `bun run preview`.
4. Linting: `bun run lint`; autofix + format: `bun run check`.
5. Formatting only: `bun run format` (Prettier, no semicolons, single quotes, trailing commas).
6. Tests: full suite `bun run test`; single file `bun run test -- path/to/file.test.ts`.
7. Single test case: `bun x vitest run -t "test name"`.
8. TypeScript strict mode with bundler module resolution and allowJs for config files.
9. Use `@/` aliases for imports; avoid deep relative paths when an alias exists.
10. React components must be functional; keep hooks flat at top level.
11. Styling via Tailwind CSS 4 + shadcn/ui; reuse component variants, avoid inline overrides.
12. UI icons come from `lucide-react`; watch for deprecated glyph names during upgrades.
13. Maintain accessibility with descriptive aria labels and semantic markup.
14. Naming: PascalCase components, camelCase utilities/hooks, kebab-case files.
15. Prefer explicit types/interfaces; lean on TanStack utility types; avoid `any`.
16. Error handling: narrow try/catch, rethrow typed Errors or Result objects, never swallow failures.
17. Theme defaults to dark; `ThemeToggle` manages `localStorage` + `html.dark`.
18. Router uses TanStack Start file routes; commit regenerated `routeTree.gen.ts` artifacts.
19. Assets live under `public/`; optimize media and respect responsiveness.
20. No Cursor or Copilot rule files detected; this document is authoritative.
