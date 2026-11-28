---
name: project-validation
description: Use before completing implementation work in the Obsession repository to select safe lint, formatting, type, build, browser, and diff checks without accidentally rewriting the repository or third-party skills.
---

# Project Validation

This skill is specific to the Obsession repository and must remain local to it.

## Safe baseline

1. Inspect `package.json`, the lockfile/package manager, `.prettierignore`, and changed paths before choosing commands.
2. Run checks as separate commands so each result is attributable:
   - `npm run lint`
   - `npx prettier --check <explicit changed files>` for supported text files when formatting is relevant
   - `npx tsc -b`
   - `npx vite build`
3. Inspect command exit status/output, then run `git diff --check`, `git status --short`, and review the complete diff.
4. Do not say “all tests pass” when no test suite or test command exists. State the exact checks run.

## Formatting and generated-file safety

- Do not use `npm run build` or `npm run format` as routine validation: both invoke `npx prettier . --write` and may modify the entire repository.
- The repository `.prettierignore` excludes `.cline/`. Never remove or bypass that exclusion for general formatting.
- Never run Prettier recursively on the repo or third-party skills. If formatting is needed, pass explicit intended source/document paths and review the result immediately.
- Treat `dist/`, generated bundles, caches, and lockfile changes as intentional only when required by the task. Do not commit generated output by default.
- For dependency changes, use the repository's existing package manager and update the lockfile consistently; report network or install failures rather than claiming an update succeeded.

## Runtime/UI verification

- Check whether a development server is already running before starting another. Confirm startup output and URL; do not assume a background command succeeded.
- For user-visible or runtime fixes, reproduce the relevant flow in a browser when tools are available, including initial render, interaction, unmount/cleanup, and relevant mobile/desktop breakpoint states.
- Record browser, OS, viewport and exact scenarios only if actually checked.
- Check console errors and failed application requests. Distinguish extension noise or third-party warnings from app errors based on evidence.
- If runtime checks cannot be completed, state that explicitly and do not mark manual/browser checklist items complete.

## Report format

Summarize each check as passed, failed, or not run, with the exact command or reason. Mention any warnings, limitations, and remaining manual verification. Never fabricate outputs, timings, module counts, or screenshots.