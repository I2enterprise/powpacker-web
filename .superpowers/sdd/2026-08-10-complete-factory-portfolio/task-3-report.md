### Task 3 Report: Expand All Projects to Forty-Seven Cards

#### Implementation

- Replaced the single legacy Factory card in `projects.html` with the exact 30 source-ordered Factory cards from `projects-factory.html`.
- Preserved the existing 15 Data Center cards and final Solar/Sports cards byte-for-byte; a raw article-string comparison against the pre-change file passed.
- Added the required All Projects ordering test plus Home, category-count, source-hotlink, and monetary-value guards in `tests/complete-factory-portfolio.test.mjs`.

#### TDD evidence

- RED: `node --test tests/complete-factory-portfolio.test.mjs` failed as expected with `18 !== 47` before the card expansion.
- GREEN: the same focused suite passes with 4 tests and 0 failures after the expansion.

#### Verification

- `node --test tests/complete-factory-portfolio.test.mjs` — 4 passed, 0 failed.
- HTTP smoke test — `projects.html`, `projects-data-center.html`, `projects-factory.html`, and the first/last Factory assets each returned HTTP 200.
- `git diff --check` — no whitespace errors.
- User-authorized scope exception: updated the obsolete All Projects assertion in `tests/complete-data-center-portfolio.test.mjs` to the 47-card contract while retaining its Data Center prefix, Home, source-hotlink, and monetary-value guards.
- `npm.cmd test` — 9 passed, 0 failed.

#### Visual review

Browser viewport review was not run because the controller owns browser access. The HTTP smoke test and automated markup/content checks above passed.
