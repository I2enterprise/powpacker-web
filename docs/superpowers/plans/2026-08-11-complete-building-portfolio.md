# Complete Building Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add all 12 source Building projects with real local photographs and integrate them into a 58-card complete portfolio without duplicating National Sports Training Center.

**Architecture:** Treat the source order and asset mapping as a fixed manifest. Add and validate assets first, build the dedicated Building page second, then splice the exact Building card payloads into All Projects while preserving all existing Data Center, Factory, Home, and Solar payloads.

**Tech Stack:** Static HTML/CSS, Node.js built-in test runner, PowerShell downloads, Python/Pillow image conversion, Git.

## Global Constraints

- Source page: `https://www.powpacker.com/building`.
- Source image URLs are `http://www.pacdd.com/images/pulldown_1658723202/buil%20001.jpg` through `buil%20012.jpg` in numeric order.
- Building page must contain exactly 12 cards in source order.
- All Projects must contain exactly 58 cards ordered as 15 Data Center, 30 Factory, 12 Building, then Solar.
- Remove the old generic Sports card by replacing it with the real National Sports Training Center card inside the Building segment; do not duplicate it.
- Preserve the current Building hero URL exactly: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85`.
- Preserve the 15 Data Center cards, 30 Factory cards, Solar card, and three Home cards byte-for-byte.
- Do not display monetary values or production hotlinks to `powpacker.com` or `pacdd.com`.
- Reuse the existing portfolio card markup and responsive CSS; do not change CSS.

## Building Manifest

| # | Asset | Location | Heading | Description |
|---|---|---|---|---|
| 1 | `01-cholasa-place.webp` | `SAMET · CHONBURI` | `ชลษาเพลส / Cholasa Place` | `Electrical System & Sanitary System` |
| 2 | `02-revenue-department.webp` | `NONTHABURI` | `สำนักงานสรรพากร / Revenue Department` | `Electrical System` |
| 3 | `03-baac-khok-samrong.webp` | `KHOK SAMRONG · LOPBURI` | `ธกส. สาขาโคกสำโรง` | `Civil, Mechanical & Electrical System` |
| 4 | `04-baac-pho-thale.webp` | `PHO THALE · PHICHIT` | `ธกส. สาขาโพทะเล` | `Civil, Mechanical & Electrical System` |
| 5 | `05-baac-nong-chang.webp` | `NONG CHANG · UTHAI THANI` | `ธกส. สาขาหนองฉาง` | `Civil, Mechanical & Electrical System` |
| 6 | `06-nakhon-sawan-product-design-building.webp` | `NAKHON SAWAN` | `อาคารเรียนและปฏิบัติการออกแบบผลิตภัณฑ์ มหาวิทยาลัยราชภัฏนครสวรรค์` | `Civil, Mechanical & Electrical System` |
| 7 | `07-nakhon-sawan-innovation-center.webp` | `NAKHON SAWAN` | `ศูนย์ถ่ายทอดเทคโนโลยีและนวัตกรรม มหาวิทยาลัยราชภัฏนครสวรรค์` | `Civil, Mechanical & Electrical System` |
| 8 | `08-new-canteen-building.webp` | `SIAM EASTERN INDUSTRIAL PARK · RAYONG` | `New Canteen Building Project` | `Civil, Mechanical & Electrical System` |
| 9 | `09-national-sports-training-center.webp` | `MUAK LEK · SARABURI` | `ศูนย์ฝึกกีฬาแห่งชาติ / National Sports Training Center` | `Civil, Mechanical & Electrical System` |
| 10 | `10-tcg-headquarters-renovation.webp` | `CHARN ISSARA TOWER 2 · BANGKOK` | `ปรับปรุงสำนักงานใหญ่ บสย. / TCG Headquarters Renovation` | `Structure & Architecture Work, M&E Work, Access Control & CCTV` |
| 11 | `11-state-audit-office-buriram.webp` | `BURIRAM` | `อาคารที่ทำการและอาคารชุดพักอาศัย สตง.บุรีรัมย์` | `Structure & Architecture Work & M&E Work` |
| 12 | `12-state-audit-office-bueng-kan.webp` | `BUENG KAN` | `อาคารที่ทำการและอาคารชุดพักอาศัย สตง.บึงกาฬ` | `Structure & Architecture Work & M&E Work` |

---

### Task 1: Add and validate 12 real Building assets

**Files:**
- Create: `assets/projects/building/01-cholasa-place.webp` through `assets/projects/building/12-state-audit-office-bueng-kan.webp`
- Create: `tests/complete-building-portfolio.test.mjs`

**Interfaces:**
- Consumes: the 12 source image URLs and exact asset names in the manifest.
- Produces: 12 unique RGB WebPs at 650 × 371 for Tasks 2 and 3.

- [ ] **Step 1: Write the failing asset test**

Create `tests/complete-building-portfolio.test.mjs` with a literal `BUILDING_PROJECTS` manifest matching the table above and a test that reads every asset, verifies `RIFF`/`WEBP`, asserts file size `> 1024` and `< 1_500_000`, parses VP8 dimensions as 650 × 371, hashes each file with SHA-256, and asserts 12 unique hashes.

- [ ] **Step 2: Run RED**

Run: `node --test tests/complete-building-portfolio.test.mjs`

Expected: FAIL with `ENOENT` for `assets/projects/building/01-cholasa-place.webp`.

- [ ] **Step 3: Download and convert exact source assets**

Download source images 001–012 in order. Use Pillow to open each downloaded JPEG, convert to RGB, crop/resize with `ImageOps.fit(image, (650, 371), Image.Resampling.LANCZOS)`, strip metadata, and save to the matching manifest filename as optimized WebP. Do not retain source JPEGs in the repository.

- [ ] **Step 4: Visually verify mapping**

Create a temporary labelled contact sheet outside tracked production paths and inspect all 12 images in numeric order. Confirm no duplicate, blank, shifted, or non-project image.

- [ ] **Step 5: Run GREEN and commit**

Run `node --test tests/complete-building-portfolio.test.mjs`, `npm.cmd test`, and `git diff --check`. Commit only the 12 assets and focused test as `assets: add complete Building project photos`.

---

### Task 2: Build the 12-card Building page

**Files:**
- Modify: `projects-building.html`
- Modify: `tests/complete-building-portfolio.test.mjs`

**Interfaces:**
- Consumes: `BUILDING_PROJECTS` and the 12 local WebPs from Task 1.
- Produces: the canonical 12 Building `<article class="portfolio-card reveal">` payloads reused by Task 3.

- [ ] **Step 1: Extend the test and run RED**

Add a test asserting the page hero retains the exact approved Unsplash URL; exactly 12 articles exist; their asset, location, heading, and description arrays exactly match `BUILDING_PROJECTS`; no monetary values, `pacdd.com`, or `powpacker.com` production hotlinks exist. Run the focused test and expect failure because the page currently has two placeholder cards.

- [ ] **Step 2: Replace only the grid payload**

Keep the hero, filter bar, wrappers, footer, and scripts unchanged. Replace the two placeholder articles with 12 articles of this exact shape, populated from each literal manifest row:

```html
<article class="portfolio-card reveal"><div class="thumb" style="--thumb:url('assets/projects/building/01-cholasa-place.webp')"></div><div class="body"><small>SAMET · CHONBURI</small><h3>ชลษาเพลส / Cholasa Place</h3><p>Electrical System &amp; Sanitary System</p></div></article>
```

Escape every ampersand as `&amp;` in HTML text. Do not add values.

- [ ] **Step 3: Run GREEN and commit**

Run the focused test, full `npm.cmd test`, `git diff --check`, and HTTP 200 probes for the page plus first/last Building asset. Commit only the page and focused test as `feat: complete Building portfolio`.

---

### Task 3: Integrate Building into the 58-card All Projects page

**Files:**
- Modify: `projects.html`
- Modify: `tests/complete-building-portfolio.test.mjs`
- Modify only if its existing count assertion becomes stale: `tests/complete-data-center-portfolio.test.mjs`, `tests/complete-factory-portfolio.test.mjs`

**Interfaces:**
- Consumes: the exact 12 canonical article strings from `projects-building.html`.
- Produces: 58 ordered cards: DC 0–14, Factory 15–44, Building 45–56, Solar 57.

- [ ] **Step 1: Snapshot preserved payloads and write RED**

Record byte snapshots of the first 45 articles, the existing Solar article, and all three Home feature articles. Add tests asserting 58 cards; the first 45 articles are unchanged; articles 45–56 equal the 12 Building articles byte-for-byte; article 57 equals the pre-edit Solar article; only one card contains `National Sports Training Center`; Home remains three cards. Run focused/full tests and expect RED at the old 47-card count.

- [ ] **Step 2: Perform the minimal splice**

In `projects.html`, preserve articles 0–44. Replace the old Solar/Sports tail with the exact 12 Building article strings from `projects-building.html`, followed by the unchanged Solar article. Do not edit CSS or other markup.

- [ ] **Step 3: Correct stale count-only tests if required**

If existing Data Center or Factory tests still assert the former 47-card contract, update only those literal count/order expectations to the new 58-card contract without weakening their existing preservation guards.

- [ ] **Step 4: Run GREEN, responsive checks, and commit**

Run focused Building tests, full `npm.cmd test`, `git diff --check`, byte-preservation checks, and HTTP 200 probes. Inspect `projects-building.html` and `projects.html` at 1440, 768, and 390 pixels; verify 12/58 visible cards, no blank images, no horizontal overflow, and no console warnings/errors. Commit the integration and necessary test updates as `feat: add Building projects to complete portfolio`.

