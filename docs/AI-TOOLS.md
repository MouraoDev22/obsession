# AI Agent, Skills, and MCPs

This document describes the AI-agent guidance versioned with this repository. It separates the available local skills from session-specific tool-use records: a checked-in skill is available to an agent, but its presence alone does not prove that it was invoked for a particular change.

## Agent role

The coding agent assists with repository inspection, implementation, documentation, validation, and Git workflow. It should first understand the project's existing structure and conventions, make focused changes, validate the changed files, and report what it actually checked. The local skill files are the source of truth for project-specific coding, validation, review, and Git guidance.

The agent should not claim tests, browser checks, tool usage, or historical actions without evidence. Keep user-provided requirements and the actual repository state authoritative when they conflict with generic guidance.

## Repository-local skills

The following skills are versioned under `.cline/skills/`. Their summaries describe their documented purpose, not a claim that each one was used for every contribution.

| Skill                       | When to use it                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `design-taste-frontend`     | Creating or reviewing the visual direction of public web pages and app screens; includes browser-based critique. |
| `emil-design-eng`           | Refining UI details, component behavior, animation timing, and interaction polish.                               |
| `impeccable`                | Designing, redesigning, auditing, or polishing frontend experiences and design systems.                          |
| `project-code-style`        | Writing or reviewing application code under this repository's TypeScript, React, ESLint, and Prettier rules.     |
| `project-git-workflow`      | Planning commits, staging task-specific files, committing, and checking final Git status.                        |
| `project-pr-workflow`       | Preparing an evidence-based PR title, template body, and merge message; it does not publish the PR.              |
| `project-regression-review` | Investigating an observed application regression or runtime failure from evidence.                               |
| `project-validation`        | Choosing safe, explicit validation commands and accurately reporting results and limitations.                    |

For this final documentation audit, `project-git-workflow`, `project-validation`, and `project-code-style` were consulted. The design-focused skills and regression-review skill were not needed. Skill-use history for other sessions is not maintained here.

### Global skills

Global skills are installed outside this repository and are not enumerated by its tracked files. Therefore, the repository cannot establish which global skills were installed or invoked in a given session. If documenting a specific session, name a global skill only when the session record or other reliable evidence confirms its use; otherwise state that it is unknown.

## MCPs and external tools

No MCP server configuration or reliable MCP usage log is checked into this repository. An MCP's availability in an editor or agent runtime does not prove it was used. During the current documentation audit, no MCP invocation was made; repository inspection and edits used the coding environment's project tools.

When recording MCP use in a future change, name the server or integration and briefly state what it did, but only when that invocation is observable or otherwise verified. Do not publish credentials, tokens, private connection metadata, or sensitive user data.

## Provenance and maintenance

- Skills under `.cline/skills/` are repository-local files; consult each `SKILL.md` for instructions and read any accompanying notice or attribution before modifying or redistributing skill content.
- Do not describe an available skill as used unless it was actually invoked or demonstrably consulted for the work being documented.
- Do not guess the names of global skills, MCPs, agent providers, or external services from the final output alone.
- Keep the skill inventory aligned with the folders in `.cline/skills/`. Update session-use notes only when there is verifiable evidence, and remove or relabel them when they stop describing the current session.
