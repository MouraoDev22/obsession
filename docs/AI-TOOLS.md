# AI Agent, Skills, and MCPs

This document records the AI-agent conventions and tools visible in this repository. It distinguishes files and capabilities that are available from actions that can be verified as having been used. The presence of a skill file is not, by itself, evidence that an agent invoked that skill for a particular change.

## Agent role

The coding agent assists with repository inspection, implementation, documentation, validation, and Git workflow. It should first understand the project's existing structure and conventions, make focused changes, validate the changed files, and report what it actually checked. In this repository, the local skill files are the source of truth for project-specific coding, validation, review, and Git guidance.

The agent should not claim tests, browser checks, tool usage, or historical actions without evidence. Keep user-provided requirements and the actual repository state authoritative when they conflict with generic guidance.

## Repository-local skills

The following skills are versioned under `.cline/skills/`. Their summaries describe their documented purpose, not a claim that each one was used for every contribution.

| Skill                       | Documented purpose                                                                                                          | Use for this documentation update                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `design-taste-frontend`     | Art direction, design decisions, browser-based visual inspection, and critique for frontend pages and screens.              | Not used; this change is documentation-only and does not redesign the interface.                                                                                      |
| `emil-design-eng`           | UI craft, component details, animation decisions, and interaction polish.                                                   | Not used; no UI or animation code changed.                                                                                                                            |
| `impeccable`                | Frontend design, redesign, audit, polish, accessibility, responsive behavior, and design-system work.                       | Not used; this change does not modify the frontend experience.                                                                                                        |
| `project-code-style`        | Repository coding conventions, TypeScript/React patterns, lint, formatting, and safe validation practices.                  | Consulted for repository-specific formatting and validation cautions; no application code changed.                                                                    |
| `project-git-workflow`      | Git status review, commit planning, scoped staging, Conventional Commits, and final status reporting.                       | Used to plan independent commits, stage only intended paths, and verify commit/status results. The user's explicit request to commit directly on `main` was followed. |
| `project-pr-workflow`       | Preparing an accurate pull-request proposal using the repository template; publishing remains a separate authorized action. | Consulted for the repository's documentation expectations. No PR was created or published.                                                                            |
| `project-regression-review` | Evidence-based investigation and validation of application regressions.                                                     | Not used; no regression was under investigation.                                                                                                                      |
| `project-validation`        | Safe, explicit validation commands and truthful reporting of checks and limitations.                                        | Used to select explicit Prettier checks and `git diff --check`; application build and runtime checks are unnecessary for these Markdown-only changes.                 |

These classifications refer only to this documentation task. They should not be interpreted as a historical inventory of how the skills were used in previous development sessions.

### Global skills

Global skills are installed outside this repository and are not enumerated by its tracked files. Consequently, this repository cannot establish which global skills were installed or invoked in a particular agent session. Record a global skill only when the relevant session or other reliable evidence confirms its use; otherwise mark it as unknown rather than infer it.

## MCPs and external tools

No MCP server configuration or reliable MCP usage log was found in the repository during this documentation update. An MCP's availability in an editor or agent runtime does not prove it was used. For this change, repository inspection and file edits were performed with the coding environment's project tools; no MCP invocation is claimed.

When recording MCP use in a future change, name the server or integration and briefly state what it did, but only when that invocation is observable or otherwise verified. Do not publish credentials, tokens, private connection metadata, or sensitive user data.

## Provenance and maintenance

- Skills under `.cline/skills/` are repository-local files; consult each `SKILL.md` for its instructions and any notices or attribution accompanying that skill.
- Do not describe an available skill as used unless it was actually invoked or demonstrably consulted for the work being documented.
- Do not guess the names of global skills, MCPs, agent providers, or external services from the final output alone.
- Update this file when the repository's local skills, agent configuration, or verifiable tool-use records change.
