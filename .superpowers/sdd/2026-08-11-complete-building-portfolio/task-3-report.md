# Task 3 report

## RED

`node --test tests/complete-building-portfolio.test.mjs` failed as expected on the former `47 !== 58` card count.

## GREEN

The focused Building suite passes: 3 tests, 0 failures. The test snapshots verify the first 45 cards, canonical 12 Building cards, trailing Solar card, one National Sports Training Center, and three unchanged Home feature cards.

## Scope

Changed `projects.html`, `tests/complete-building-portfolio.test.mjs`, `tests/complete-data-center-portfolio.test.mjs`, and `tests/complete-factory-portfolio.test.mjs`. The 12 Building articles are inserted at indices 45–56, Solar is index 57, and the old generic Sports article is removed.

## Verification

Updated only the stale 47-card order/count contracts in the Data Center and Factory suites, retaining source-card asset checks and adding one-card guards for National Sports Training Center. `npm.cmd test` passes: 12 tests, 0 failures. `git diff --check` was run. `http://127.0.0.1:4173/projects.html` returns HTTP 200. Browser checks remain controller-owned.

## Commit

Initial implementation commit: `273f8402c92d3bd370cdfbb412e16785e5aa35c1`.

## Takeover audit and correction

The takeover audit found that the initial splice had re-encoded Thai text in `projects.html`; the then-current preservation hashes had been captured from that corrupted payload, so the suite passed without protecting the pre-Task 3 bytes. A corrected RED run failed at preserved article index 0. The page was rebuilt from the pre-Task 3 first 45 articles, the exact 12 canonical Building articles, the unchanged Solar article, and the original suffix. The corrected GREEN run passed 3/3 focused tests; raw SHA-256 comparison reports `first45Same: true`, `solarSame: true`, and zero mojibake markers.

Responsive browser checks passed for both `projects-building.html` (12 rendered cards) and `projects.html` (58 rendered cards) at 1440, 768, and 390 pixels. All six cases had zero blank computed card backgrounds, no horizontal overflow, no mojibake in rendered text, and no console warnings or errors. HTTP probes returned 200 for both pages.

## Preservation-guard review fix

A follow-up review found that the initial stale-contract update had weakened pre-existing semantic guards. The Data Center All Projects assertion now again checks headings, assets, locations, and descriptions for cards 0–14. The Factory All Projects assertion now again compares complete card objects for both Data Center cards 0–14 and Factory cards 15–44. Only the 58-card count, Building insertion range, Solar tail index, and single National Sports Training Center guard differ from the pre-Task 3 contract.
