## Summary

Refine the cinematic dual-side layout and address interface and accessibility issues while preserving the original Anton/Space Mono typography, black/red palette, artwork, texture and parallax.

This PR includes the earlier layout commits, the subsequent interface audit, and synchronized English and Portuguese project READMEs. Existing README edits were retained and incorporated at the author's request.

## Related issue

N/A.

## Type of change

- [x] Bug fix
- [x] UI, styling, or responsiveness
- [x] Accessibility or performance
- [x] Documentation, tooling, dependencies, or local skills — documentation and evidence only; no dependencies added.

## Changes made

- Horizontal track cards and A/B panels with sticky headings and independent desktop scrolling; normal document flow on smaller screens.
- Artwork fallback and refined layout tokens, player and footer from the earlier branch commits.
- Player status announcements, an inert hidden iframe and unavailable playback controls during initialization.
- Video-error recovery when switching tracks and a distinct buffering status.
- Focus restoration when closing the player and valid markup inside track buttons.
- Document space based on the player's measured height and scroll spacing below sticky panel headings.
- Wrapping player titles and a persistently underlined recovery link.
- Footer credits that stack in narrow containers, including with enlarged text.
- Live reduced-motion handling for parallax. Decorative animations finish after 4.5 seconds and retain their static appearance.
- Hero track count derived from the catalog. Existing Lenis 1.3.26 reduced-motion support is reused.
- Updated English and Portuguese READMEs covering layout, player recovery, accessibility, validation limitations and the build script's repository-wide formatting side effect.
- English-only PR description and merge commit message, with audit evidence retained.

## How to validate

**Environment:** Windows, Node 24.19.0, Playwright with headless Microsoft Edge. Vite development server on port 5173 and production preview on port 4173.

**Steps and expected result:**

1. Run `npm run dev`. Check widths of 320, 390, 768, 1023, 1024 and 1440 CSS pixels at a height of 900 pixels: no horizontal overflow.
2. Select Obsession using the keyboard: the player opens, playback controls remain unavailable until the API is ready, and messages appear in a status region.
3. Pause, select the same track to resume, switch to Sandy, close and reopen: status and active styling follow the selection; closing restores focus and removes the iframe.
4. Block the `iframe_api` request: the recovery message and YouTube link remain usable without breaking the mobile layout.
5. On desktop, focus the sixth track: it remains below the sticky heading. Wheel scrolling over Side A does not scroll Side B or the page.
6. Change `prefers-reduced-motion` during the session: parallax resets, the background transition becomes 0s, and grain animation stops. Disabling the preference enables parallax again.
7. At 320 pixels, set the root font size to 200%: footer credits stack without horizontal overflow. This checks enlarged text, not physical browser zoom.
8. Run `npm run lint`, `npx tsc -b` and `npx vite build`; start `npm run preview` and repeat the scenarios.
9. Check the updated Markdown with `npx prettier --check README.md README.pt-BR.md docs/audit/README.md docs/audit/PR.md` and review `docs/audit/MERGE_COMMIT.txt`.

## Technical checks

| Check                             | Result / notes                                                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                    | Passed during the implementation audit.                                                                                                                                     |
| Prettier on changed files         | Passed during the audit; documentation formatting checked separately for the follow-up.                                                                                     |
| `npm run build`                   | Not run literally because it writes repository-wide Prettier changes. ESLint, `npx tsc -b` and `npx vite build` passed separately, preserving unrelated changes and skills. |
| Development server: `npm run dev` | Existing Vite server on port 5173 validated with Playwright.                                                                                                                |
| Production preview                | `vite preview` started on port 4173 after building; layout and motion checks passed again.                                                                                  |

The documentation follow-up does not change runtime code. Browser and playback results below refer to the implementation audit, not a new browser run for the text-only update.

### Playback and YouTube integration

- [x] The real API reported playing, pausing, resuming through the same track, switching, closing and reopening; no human audio listening was performed.
- [x] Pausing preserved the active card; closing removed the iframe; reopening retained only one iframe.
- [x] Loading, playing, paused, buffering, error and recovery states were exercised with a simulated API.
- [x] API loading failure was exercised by blocking the request, including in production preview.
- [ ] Natural track completion and complete URL parsing regression were not tested; the parser was not changed.

### UI, accessibility, and motion

- [x] Mobile and desktop layout checked without horizontal overflow at the documented sizes.
- [x] Dynamic player space and cleanup verified on close.
- [x] Keyboard focus, focus restoration, control names and focus below sticky headings checked.
- [x] States include text or icons; semantics reviewed.
- [x] Live parallax/reduced-motion behavior and isolated A/B scrolling checked.
- [x] Effect cleanup reviewed in code; iframe and inset cleanup verified at runtime with the project's StrictMode enabled.
- [ ] Complete contrast and screen-reader audits were not performed. Full WCAG conformance is not claimed.
- [x] No JavaScript exceptions in the exercised scenarios and no HTTP 4xx/5xx responses in the layout matrix. The intentionally blocked request is not an application resource regression.

### Data, assets, and maintenance

- [x] Existing CSS Modules, custom properties and project structure preserved.
- [x] Hero count synchronized; the catalog was not changed during the audit.
- [x] No new dependencies, lockfile changes or skill modifications.
- [x] English and Portuguese project READMEs updated, preserving the earlier local documentation additions.
- [x] Bilingual audit notes retained in `docs/audit/README.md`; PR description and merge message are in English.
- [x] Visual evidence intentionally included; no production bundles committed.
- N/A: external verification of credits, licenses and URLs; those contents were not changed during the audit.

## Evidence

Screenshots and measurements are available in `docs/audit/evidence/`:

- `obsession-before-390.png` and `obsession-before-1440.png`: initial audit reference.
- `obsession-after-390.png` and `obsession-after-1440.png`: subsequent review.
- `obsession-player-error.png`: simulated playback error on mobile.
- `obsession-validation.json`: production-preview layout measurements.

The initial full-page screenshots include artwork that had not yet lazy-loaded. Later screenshots wait for image decoding; this difference should not be interpreted as a new artwork fix. The error screenshot was taken during the audit, before the final spacing adjustments.

## Risks, limitations, and review notes

- Automated checks used Edge/Chromium. Safari, Firefox, screen readers and physical devices were not tested.
- Playwright scripts ran as temporary tools outside the repository; no committed test suite or `npm test` script was added.
- The real API reported expected states, but audio was not heard by a human. Availability and autoplay remain dependent on YouTube and browser behavior.
- Error-layout tests deliberately blocked network requests; video-error recovery used a simulated API.
- The original background image, approximately 1.34 MB, was preserved; asset optimization is outside this scope.
- This PR includes earlier branch work. The audit's initial visual reference is c8c211e, not main.
