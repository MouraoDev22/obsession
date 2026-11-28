---
name: project-git-workflow
description: Use for branch creation, commit planning, staging, committing, or final Git status review in the Obsession repository. Keeps work isolated, uses Conventional Commits, and avoids including unrelated changes.
---

# Project Git Workflow

Use this skill only in the Obsession repository. Do not install or copy it to a global skills directory.

## Before changing Git state

1. Confirm the repository root, current branch, working-tree status, and recent history.
2. Inspect the base branch and existing remotes when relevant. Do not assume the target branch is `main` if repository context says otherwise.
3. Preserve pre-existing user changes. Never use destructive reset, checkout, clean, or restore commands on changes that are not part of the requested task.
4. For an unrelated or already occupied branch, create a dedicated branch using `<type>/<short-kebab-case-scope>` (for example `fix/player-focus` or `chore/project-skills`).
5. If the requested base is ambiguous or the working tree contains changes that cannot safely be separated, stop and ask one focused question.

## Plan before implementation

- At the start of every implementation request, before editing files or changing Git state, present the intended changes and an ordered commit plan to the user.
- Inspect the repository and identify the base branch, existing work, and relevant validation commands before finalizing that plan.
- Make the proposed commit sequence concrete: each commit must describe one independently understandable, coherent unit, with its Conventional Commit message and the files or behavior it is expected to contain.
- Adjust the plan when inspection reveals different dependencies or validation needs; tell the user before deviating materially. Do not make artificial commits just to increase commit count.
- Create a fresh dedicated branch from the intended base for new implementation work. Do not reuse or rewrite a branch/commit series that the user asked to replace; preserve prior history and close or supersede its PR when explicitly requested.
- Include skill/workflow updates in the plan and give them their own commit when independently reviewable from application changes.

## Branch and commit conventions

- Use Conventional Commits: `type(optional-scope): imperative description`.
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.
- Use lowercase scopes and descriptions; keep descriptions concise and truthful.
- Commit incrementally throughout implementation whenever a coherent, independently understandable unit is complete and validated; do not wait until the end to create one oversized commit.
- Follow the commit plan in order. Before each commit, validate that unit as far as practical, stage only its explicit paths, inspect the staged diff, and report the resulting commit before starting the next unit.
- Split commits only when changes represent independently understandable units. Do not create artificial commits just to increase commit count.
- Stage explicit paths, inspect `git diff --cached`, and ensure every staged file belongs to the task before committing.
- Do not amend or rewrite commits. Push, merge, and remote PR creation require explicit user authorization.

## Completion checks

At implementation completion, make and verify the final coherent commit(s), then prepare a complete PR proposal using `project-pr-workflow`: title, full repository-template body, validation evidence, and merge commit message. Leave the branch ready for publication. Do not claim the remote PR exists unless it was actually opened with explicit authorization.

After committing, report branch name, commit hashes/messages, and the final working-tree status. Verify the committed diff and confirm no unrelated or generated files were included. If a commit fails, inspect the failure and repository state; do not delete lock files or alter Git internals without diagnosing why they exist.