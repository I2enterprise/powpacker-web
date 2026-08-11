# Task 3 report

## RED

`node --test tests/complete-building-portfolio.test.mjs` failed as expected on the former `47 !== 58` card count.

## GREEN

The focused Building suite passes: 3 tests, 0 failures. The test snapshots verify the first 45 cards, canonical 12 Building cards, trailing Solar card, one National Sports Training Center, and three unchanged Home feature cards.

## Scope

Changed `projects.html` and `tests/complete-building-portfolio.test.mjs` only. The 12 Building articles are inserted at indices 45–56, Solar is index 57, and the old generic Sports article is removed.

## Verification

Updated only the stale 47-card order/count contracts in the Data Center and Factory suites, retaining source-card asset checks and adding one-card guards for National Sports Training Center. `npm.cmd test` passes: 12 tests, 0 failures. `git diff --check` was run. `http://127.0.0.1:4173/projects.html` returns HTTP 200. Browser checks remain controller-owned.

## Commit

Pending commit at report-update time.
