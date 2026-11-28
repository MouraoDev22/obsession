---
name: project-code-style
description: Use when writing, refactoring, reviewing, or formatting code in the Obsession Vite and React project. Enforces the repository ESLint rules, Prettier conventions, strict TypeScript typing, and existing interfaces/types folder structure.
---

# Project Code Style

This skill is local to the Obsession repository. Follow the actual `eslint.config.ts`, `tsconfig*.json`, and `.prettierrc` as authoritative rules. Read [`docs/examples.md`](docs/examples.md) for concrete strict-typing examples.

## TypeScript requirements

- Keep TypeScript strict; do not weaken compiler options to silence an error.
- Explicitly annotate function parameters, return types, module boundaries, mutable variables, destructured values, and class properties as required by ESLint.
- Prefer `unknown` over `any`; narrow unknown values before use. Do not add non-null assertions (`!`). Handle nullable refs and absent array values explicitly.
- Add explicit `return;` at the end of every function declared to return `void` or `Promise<void>`.
- Use type-only imports with `import type` when the imported symbol is only a type.
- Keep names in the configured conventions: variables camelCase/PascalCase/UPPER_CASE, functions camelCase or PascalCase, and type-like declarations PascalCase.
- Extract interfaces into `src/interfaces/` and type aliases into `src/types/`, one declaration per file. Enums, if needed, belong in `src/enums/`, exported one per file. Do not create inline object type literals or local interface/type declarations.
- Use the existing PascalCase filenames and project structure for interface/type files; do not impose a new architecture or move existing files just to match another template.

## React and project patterns

- Call Hooks unconditionally and in the same order on every render. Keep Hooks at component/custom-hook top level; do not put them in branches, loops, callbacks, or after early returns.
- Effects must return cleanup for listeners, Lenis instances, animation frames, and external resources they create. Verify setup/cleanup under React StrictMode.
- Preserve React Compiler compatibility and the existing `React.JSX.Element` component return convention.
- Follow the established import grouping/order and CSS Modules conventions; avoid adding a UI framework or dependency unless requested and justified.
- Keep project data in the existing typed JSON/data pattern when the change concerns catalog or footer content.

## Formatting and lint workflow

- Prettier is the formatting source of truth; ESLint disables conflicting formatting rules. Use the project `.prettierrc` for import ordering, semicolons, quotes, trailing commas, and CSS ordering.
- Do not run `npm run build` or `npm run format` casually: both execute repository-wide `npx prettier . --write`. `.prettierignore` excludes `.cline/` intentionally.
- For broad formatting explicitly requested by the user, format only tracked/intended source files and the intended new skill files, excluding third-party skills, generated output, `node_modules`, and unrelated docs/assets. Inspect the complete diff after formatting.
- Use explicit paths with `npx prettier --write <paths>`; do not remove `.cline/` from `.prettierignore` to format skills.
- Validate with `npm run lint`, `npx tsc -b`, and `npx vite build` separately. Run `npx prettier --check <changed paths>` for relevant files. See the local `project-validation` skill for safe checks and truthful reporting.

## Review checklist

Before finishing, confirm Hook order, explicit types, null/error handling, cleanup behavior, import grouping, file naming, lint/type/build results, and that the diff contains no unrelated formatting or generated files. Do not claim unrun manual/browser checks.