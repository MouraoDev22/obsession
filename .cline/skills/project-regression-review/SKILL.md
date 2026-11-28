---
name: project-regression-review
description: Use when investigating a regression or runtime failure in the Obsession React application, especially Hook-order, lifecycle, Lenis, player, and production-versus-development discrepancies. Establish a cause from current code/evidence before proposing or applying a fix.
---

# Project Regression Review

Use only for this repository. Treat console reports as evidence to investigate, not proof of a specific cause.

## Investigation sequence

1. Confirm mode and scope. In Plan mode, inspect and propose; do not edit or run state-changing commands.
2. Inspect current branch/status and compare the relevant branch with its actual base. Read the affected component, its callers, related utilities, CSS/breakpoints, project scripts, and recent commits.
3. Map the user action through state updates, component renders, effects, callbacks, and cleanup. Trace the reported error to code instead of guessing from minified stack names.
4. For React components, verify all Hooks are called unconditionally in the same order on every render. Check early returns, conditional branches, loops, nested callbacks, compiler/lint signals, and StrictMode's mount-cleanup-remount behavior.
5. For effects, verify setup/cleanup symmetry, stale closures, duplicate listeners/instances, null refs, resize or media-query transitions, and cleanup idempotence.
6. For nested Lenis panels, inspect wrapper/content configuration, `data-track-scroll` exclusion from the global instance, the `64rem` CSS/media-query alignment, desktop/mobile transitions, overscroll behavior, and cleanup. Do not assume a dedicated instance alone proves scrolling works.
7. Separate application failures from browser/extension warnings. Explain which messages are causal, unrelated, or not yet established.
8. Compare development and production conditions: exact deployed commit, lockfile/dependency version, build output, asset/cache state, runtime configuration, and browser behavior. Do not attribute a discrepancy to stale cache or deployment without evidence.

## Fix and verification

- Make the smallest root-cause fix; avoid unrelated defensive code or removing useful architecture without evidence.
- Add/update tests if the repository has a suitable test setup; do not invent an npm test script.
- Run the safe validation workflow in `project-validation` and inspect the final diff.
- If browser automation or a dev server is unavailable, report that limitation plainly. Never claim manual reproduction or resolution without doing it.
- Review that error fallbacks do not mask the underlying issue and that any removed component has no remaining references.
- Report diagnosis, evidence, code changes, checks and gaps separately. A passing typecheck/build does not prove the runtime regression is fixed.