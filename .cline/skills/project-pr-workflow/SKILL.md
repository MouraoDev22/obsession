---
name: project-pr-workflow
description: Use at the end of every Obsession implementation to prepare a complete, ready-to-submit pull request, including the exact title, repository-template body, and merge commit message. Do not claim to create a remote PR unless that action was actually performed.
---

# Project Pull Request Workflow

This skill is local to the Obsession repository. Use `.github/pull_request_template.md` as the source of truth; do not substitute a generic PR outline.

## Required end-of-implementation deliverable

- Every completed implementation must end with a PR ready for submission: exact title, complete template body, accurate validation evidence, and merge commit message.
- Coordinate with `project-git-workflow`: implementation work should be committed incrementally in coherent, validated units, and the final PR must describe the full branch diff rather than only the last commit.
- Do not leave the PR proposal for the user to assemble from a summary. Include the entire copy-ready body in the final response.
- Preparing a PR proposal does not authorize push or remote PR creation. Ask for/require explicit authorization before publishing or opening it, and never describe a draft proposal as an opened PR.

## Plan and replacement PRs

- At the beginning of each implementation, coordinate with `project-git-workflow` to present the change plan and intended commit sequence before editing. Keep the eventual PR summary aligned with that plan while describing the complete final branch diff.
- If the user asks to redo work already represented by a PR, inspect its state and branch first. Preserve its history; do not reset, amend, or force-push. When the request explicitly says to redo and open a PR again, close the superseded open PR, create a new branch from the intended base, and open a replacement PR after the new commits are pushed and validated.
- Clearly distinguish the superseded PR from the replacement PR in the final status. Never claim that a PR was replaced until the new PR has actually been created.

## Gather evidence first

1. Inspect the current branch, its diff against the intended base, commit history, and status.
2. Read the current `.github/pull_request_template.md` in full.
3. Identify the actual behavior changed, affected files, commands actually run, and manual checks actually performed.
4. Do not infer successful playback, responsive, accessibility, visual, browser, or production checks from a successful build. Mark unperformed checks as not run and explain applicable limitations.
5. Do not include unrelated commits in the PR summary. If branch ancestry makes the PR contain unrelated work, state the issue and propose correction rather than hiding it.

## Title

- Write the PR title in English only.
- Use a concise Conventional Commit-style title: `type(scope): imperative summary`.
- Use a stable lowercase scope such as `audio-player`, `ost-song-list`, `deps`, or `project-skills`.
- If multiple scopes make the title awkward, choose a higher-level accurate scope rather than a comma-separated scope list.
- The title must describe the total PR diff, not merely its latest commit.

## Body

- Write the entire PR body in English only, including summaries, checklist notes, validation results, limitations, and review comments. Keep the repository template headings and section order; translate any explanatory notes you add rather than mixing languages.
Return the complete template body, retaining its section order and headings:

1. Summary
2. Related issue
3. Type of change
4. Changes made
5. How to validate
6. Technical checks
7. Playback and YouTube integration
8. UI, accessibility, and motion
9. Data, assets, and maintenance
10. Evidence
11. Risks, limitations, and review notes

Fill only applicable sections. Mark non-applicable sections `N/A` with a short reason rather than checking irrelevant boxes. Check a checklist item only when there is evidence it was completed. Include the environment and reproducible steps when tested. In the technical-check table, report exact commands/results. Never claim `npm run build` passed unless it was run; it invokes repository-wide Prettier write.

## Repository-specific cautions

- `npm run build` executes ESLint, `npx prettier . --write`, TypeScript build, and Vite build. Prefer safe individual checks described by `project-validation` and record them precisely.
- `.prettierignore` excludes `.cline/`. Do not run global Prettier on third-party or local skills; format only intended files when needed.
- Do not invent issue references, screenshots, recordings, test counts, track behavior, or build output.
- Explain whether the local development server/browser was actually used. A failed or unavailable server is not a successful manual check.

## Merge commit

Write the Conventional Commit merge message in English only and match it to the PR title. Add a short English body describing the meaningful changes and only validations that actually passed. Do not add fabricated issue-closing references or unrelated commit bullets. Clearly label title, full PR body, and merge commit message in the final response. The surrounding assistant explanation may use the user's preferred language; the PR deliverables themselves must remain entirely in English.

This skill drafts PR content only. Do not push branches, create PRs, or merge unless the user explicitly requests those actions and the relevant integration is available.