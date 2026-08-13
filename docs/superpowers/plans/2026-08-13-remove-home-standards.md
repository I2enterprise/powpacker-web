# Remove Home Standards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the standards strip from Home only and protect the About version.

**Architecture:** Add a focused static HTML regression test, then remove exactly one Home section. Shared CSS and About markup remain untouched.

**Tech Stack:** Static HTML, Node.js built-in test runner, Git.

## Global Constraints

- `index.html` must contain zero `section.numbers.standards` elements.
- `about.html` must contain exactly one standards section with four `.standard-item` articles.
- Do not change `about.html`, CSS, translations, or unrelated Home markup.

---

### Task 1: Remove Home standards only

**Files:**
- Create: `tests/home-standards-visibility.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing Home/About standards markup.
- Produces: Home without standards; About unchanged with four standards.

- [ ] **Step 1: Write RED**

Create a test that reads both pages, asserts Home has zero `<section class="numbers standards"` occurrences, About has exactly one, and About's standards section contains exactly four `standard-item` articles plus the exact aria-label `มาตรฐานการทำงานของ POWPACKER`. Run it and expect Home count failure.

- [ ] **Step 2: Apply minimal removal**

Remove only the complete Home standards section from `index.html`. Do not alter adjacent markup or shared CSS.

- [ ] **Step 3: Verify GREEN**

Run the focused test, full `npm.cmd test`, `git diff --check`, and verify the diff contains only the intended Home removal plus test.

- [ ] **Step 4: Browser check and commit**

Verify Home flows directly to Selected Projects and About still renders four standards at desktop/mobile widths. Commit as `fix: remove standards strip from Home`.
