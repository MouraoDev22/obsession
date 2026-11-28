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

## Branch and commit conventions

- Use Conventional Commits: `type(optional-scope): imperative description`.
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`.
- Use lowercase scopes and descriptions; keep descriptions concise and truthful.
- Split commits only when changes represent independently understandable units. Do not create artificial commits just to increase commit count.
- Stage explicit paths, inspect `git diff --cached`, and ensure every staged file belongs to the task before committing.
- Do not amend, rewrite, push, merge, or open a remote PR unless explicitly requested.

## Completion checks

After committing, report branch name, commit hashes/messages, and the final working-tree status. Verify the committed diff and confirm no unrelated or generated files were included. If a commit fails, inspect the failure and repository state; do not delete lock files or alter Git internals without diagnosing why they exist.