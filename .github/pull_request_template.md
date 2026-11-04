<!--
Describe only what this PR changes and what was actually validated.
Check applicable items and remove the rest or mark them N/A with an explanation.
Do not check validations you have not performed. UI and playback scenarios
may not apply to documentation or tooling PRs.
-->

## Summary

<!-- What problem does this PR solve? Why is this change needed? -->

## Related issue

<!-- Use "Closes #123" only if this PR fully resolves the issue.
Use "Refs #123" to reference an issue without closing it. Otherwise, enter N/A. -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] UI, styling, or responsiveness
- [ ] Accessibility or performance
- [ ] Refactoring with no intentional behavior changes
- [ ] Content: tracks, cover images, credits, or links
- [ ] Documentation, tooling, dependencies, or local skills
- [ ] Breaking change (explain in the risks section)

## Changes made

<!-- List the main changes, affected components, and relevant decisions.
Explain any new dependencies or configuration changes. -->

## How to validate

<!-- Provide reproducible steps and expected results, including the required
track, interaction, or state. For UI changes, specify browser, OS, and viewport. -->

**Environment:**

**Steps and expected result:**

## Technical checks

<!-- Record passed, failed, or not run; explain N/A entries and limitations.
There is currently no npm test script configured: describe manual testing
and any automated tests added by this PR without assuming existing coverage.
-->

| Check                                                     | Result / notes |
| --------------------------------------------------------- | -------------- |
| `npm run lint`                                            |                |
| Prettier on changed files: `npx prettier --check <files>` |                |
| `npm run build`                                           |                |
| Development server: `npm run dev`                         |                |
| Production preview: `npm run preview` after building      |                |

<!-- WARNING: npm run build runs ESLint, Prettier with --write, tsc -b, and
Vite. npm run format also formats the entire repository. Review the diff after
running these commands and exclude unrelated formatting changes, including
changes to third-party skills. To format only the intended files, use
npx prettier --write <files>. Replace <files> with actual file paths. -->

### Playback and YouTube integration

<!-- Complete when changes affect the player, playback state, or YouTube utilities. -->

- [ ] Selecting a track opens the player and plays the correct song.
- [ ] Selecting the same track toggles play/pause; the player controls also work.
- [ ] Switching tracks updates the title, audio, and active card without simultaneous playback.
- [ ] Pausing preserves the active card; reaching the end, encountering an error, or closing the player clears the highlight.
- [ ] Closing stops the audio; reopening works without duplicate players or listeners.
- [ ] Loading, playing, paused, and error states were checked, including the link to open the track on YouTube.
- [ ] Parser changes preserve supported URL formats and invalid-input handling.
- [ ] API loading changes preserve promise reuse and retry behavior after failure.

### UI, accessibility, and motion

<!-- Complete when changes affect visuals or interactions. -->

- [ ] Layout was checked on mobile and desktop, with no horizontal overflow or inaccessible content beneath the fixed player.
- [ ] Cards, long titles, sides A/B, and the footer remain readable and usable.
- [ ] Keyboard navigation, visible focus, accessible names, and control states were checked.
- [ ] States do not rely on color alone; contrast and semantics were reviewed.
- [ ] Parallax, Lenis scrolling, and animations were checked, including with `prefers-reduced-motion` enabled.
- [ ] Modified effects clean up listeners, animation frames, and instances on unmount, including in React StrictMode.
- [ ] No new console errors or broken resource requests were introduced.

### Data, assets, and maintenance

- [ ] Modified tracks have unique IDs, correct ordering, verified URLs, and existing cover images with matching filenames.
- [ ] Catalog changes keep the A/B split, track labels, and track count displayed in the header consistent.
- [ ] Credits, external links, attributions, and licenses for modified assets were checked.
- [ ] Existing typing, component, CSS Modules, and CSS custom property conventions were preserved.
- [ ] Dependency changes include the corresponding lockfile updates and a justification.
- [ ] English and Portuguese documentation was updated where affected.
- [ ] Skill changes preserve their sources/licenses and update the provenance record when needed, without global installation.
- [ ] The diff contains only changes related to this PR, with no secrets or generated artifacts.

## Evidence

<!-- For visual changes, include before/after screenshots on mobile and desktop.
For playback or animation changes, prefer a recording. For tooling changes,
include relevant command output. If not applicable, enter N/A. -->

## Risks, limitations, and review notes

<!-- Note potential regressions, checks not performed, YouTube/browser
restrictions, pre-existing issues, and areas that need closer review.
For breaking changes, explain the impact and how to revert or migrate. -->
