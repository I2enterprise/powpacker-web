# Restore Data Center Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the Data Center page hero to its original Unsplash background without changing any of the 15 project cards.

**Architecture:** Extend the existing Data Center portfolio regression test with an exact hero URL assertion, then make the smallest possible one-token HTML change. Preserve the complete article payload byte-for-byte.

**Tech Stack:** Static HTML, Node.js built-in test runner, Git.

## Global Constraints

- The Data Center hero must use exactly `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85`.
- All 15 `.portfolio-card.reveal` article payloads in `projects-data-center.html` must remain byte-for-byte unchanged.
- Do not change project images, copy, ordering, navigation, scripts, CSS, or responsive behavior.
- Modify only `projects-data-center.html` and `tests/complete-data-center-portfolio.test.mjs`.

---

### Task 1: Restore and guard the Data Center hero

**Files:**
- Modify: `tests/complete-data-center-portfolio.test.mjs`
- Modify: `projects-data-center.html`

**Interfaces:**
- Consumes: the existing `.page-hero` inline `--page-image` declaration and 15-card portfolio markup.
- Produces: an exact regression assertion for the original hero URL while preserving all article payloads.

- [ ] **Step 1: Record the existing card payloads**

Run a read-only Node or PowerShell extraction of all 15 `<article class="portfolio-card reveal">...</article>` strings and retain the result for the post-edit byte comparison.

- [ ] **Step 2: Write the failing test**

Add this assertion inside the existing `Data Center page contains 15 source-ordered cards` test immediately after reading `page`:

```js
assert.match(
  page,
  /<section class="page-hero" style="--page-image:url\('https:\/\/images\.unsplash\.com\/photo-1558494949-ef010cbdcc31\?auto=format&fit=crop&w=1800&q=85'\)">/,
);
```

- [ ] **Step 3: Run the focused test to verify RED**

Run: `node --test tests/complete-data-center-portfolio.test.mjs`

Expected: FAIL because the current hero uses `assets/projects/osprey-data-center.webp`.

- [ ] **Step 4: Restore the exact original hero URL**

In `projects-data-center.html`, replace only:

```html
--page-image:url('assets/projects/osprey-data-center.webp')
```

with:

```html
--page-image:url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85')
```

- [ ] **Step 5: Verify GREEN and preservation**

Run:

```powershell
node --test tests/complete-data-center-portfolio.test.mjs
npm.cmd test
git diff --check
```

Expected: all tests PASS and diff check is clean. Re-extract all 15 article strings and assert byte equality with the Step 1 snapshot.

- [ ] **Step 6: Commit**

```powershell
git add projects-data-center.html tests/complete-data-center-portfolio.test.mjs
git commit -m "fix: restore original Data Center hero"
```

