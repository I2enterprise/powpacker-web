# About Company Profile Download Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a verified local Company Profile PDF and a direct download button beneath the About hero description.

**Architecture:** Treat the supplied PDF as an immutable binary asset and protect it with an exact SHA-256 regression assertion. Add one semantic anchor using the existing button component, with only scoped spacing CSS if visually necessary.

**Tech Stack:** Static HTML/CSS, PDF, Node.js built-in test runner, Git.

## Global Constraints

- Source: `C:\Users\TeerawatSakronram\Downloads\Company_Profile__Powpacker_2026.pdf`.
- Destination: `assets/documents/company-profile-powpacker-2026.pdf`.
- Button text: `ดาวน์โหลด Company Profile (PDF)`.
- The anchor must be immediately after the About hero paragraph and include `download`.
- Preserve all other About content and behavior.

---

### Task 1: Add and wire the Company Profile download

**Files:**
- Create: `assets/documents/company-profile-powpacker-2026.pdf`
- Create: `tests/about-company-profile-download.test.mjs`
- Modify: `about.html`
- Modify only if required: `inner.css`

**Interfaces:**
- Consumes: approved local PDF and existing `.button.outline` component.
- Produces: a direct local PDF download from the About hero.

- [ ] **Step 1: Record the source SHA-256 and write RED**

Create a focused test that asserts the destination exists, matches the recorded source SHA-256, opens as an unencrypted 45-page PDF, and that `about.html` contains exactly one anchor immediately after the hero paragraph with the exact href, text, `download`, and aria-label. Run it and expect ENOENT/missing anchor.

- [ ] **Step 2: Copy the immutable binary**

Create `assets/documents/` and copy the source PDF byte-for-byte to the exact destination filename.

- [ ] **Step 3: Add the semantic button**

Immediately after the existing hero `<p>`, add:

```html
<a class="button outline profile-download" href="assets/documents/company-profile-powpacker-2026.pdf" download aria-label="ดาวน์โหลด Company Profile POWPACKER 2026 รูปแบบ PDF">ดาวน์โหลด Company Profile (PDF)<span aria-hidden="true">↓</span></a>
```

Add only a focused `.page-hero .profile-download` spacing rule in `inner.css` if the existing button style needs separation.

- [ ] **Step 4: Verify GREEN**

Run the focused test, full `npm.cmd test`, `git diff --check`, HTTP probes for About and PDF, and responsive browser checks at desktop/mobile.

- [ ] **Step 5: Commit**

Commit only the PDF, focused test, About HTML, and optional focused CSS as `feat: add Company Profile download`.
