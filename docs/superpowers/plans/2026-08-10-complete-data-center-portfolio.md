# Complete Data Center Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the local portfolio with all 15 Data Center source entries and photographs while preserving the existing card design, Home feature count, and non-Data Center content.

**Architecture:** Add 11 missing optimized WebP assets beside the four approved assets, introduce focused Node structural tests, then expand the two portfolio pages with the existing static `.portfolio-card` markup. A deterministic filename/order manifest in the tests protects source-to-project mapping and prevents another incomplete subset.

**Tech Stack:** Static HTML5/CSS, Node.js built-in test runner, Python 3 with Pillow 12.2.0, local Node preview server

## Global Constraints

- Data Center must contain exactly 15 cards in the source-page order.
- All Projects must contain those 15 Data Center cards followed by the three existing non-Data Center cards, for exactly 18 cards.
- Home must retain exactly three selected-project cards and its current Osprey, OTT, and Solar mappings.
- Do not display project monetary values.
- Keep the existing card classes, navigation, filters, hero structure, and responsive layout.
- Keep Factory, Energy, and Satellite card copy and images unchanged.
- Store source photographs locally under `assets/projects/`; do not hotlink POWPACKER editor images.
- Retain the two Samut Prakan backup-center source entries as separate cards labelled `ภาพที่ 1` and `ภาพที่ 2`.
- Do not upscale or distort source images.

---

## File Structure

- `tests/complete-data-center-portfolio.test.mjs`: persistent asset, count, ordering, mapping, Home-preservation, and hotlink regression checks.
- `assets/projects/*.webp`: four existing approved photographs plus 11 missing source derivatives.
- `projects-data-center.html`: 15 source-ordered Data Center cards.
- `projects.html`: the same 15 Data Center cards followed by three preserved non-Data Center cards.
- `index.html` and `styles.css`: verification-only; no changes planned.

### Task 1: Add the Missing Eleven Source Photographs and Asset Regression Test

**Files:**
- Create: `tests/complete-data-center-portfolio.test.mjs`
- Create: `assets/projects/backup-computer-center-1.webp`
- Create: `assets/projects/backup-computer-center-2.webp`
- Create: `assets/projects/ghb-main-computer-center.webp`
- Create: `assets/projects/utapao-data-center.webp`
- Create: `assets/projects/pea-disaster-recovery-center.webp`
- Create: `assets/projects/laem-chabang-emergency-center.webp`
- Create: `assets/projects/advanced-computing-power-system.webp`
- Create: `assets/projects/pea-rack-pdu-cold-containment.webp`
- Create: `assets/projects/sriracha-1000kva-generator.webp`
- Create: `assets/projects/symphony-backup-noc.webp`
- Create: `assets/projects/osprey-data-hall-fitout.webp`

**Interfaces:**
- Consumes: exact POWPACKER source URLs and the existing four approved WebP assets.
- Produces: `DATA_CENTER_ASSETS`, an ordered 15-filename constant inside the test, plus 11 valid local RGB WebP files used by Tasks 2 and 3.

- [ ] **Step 1: Write the asset-focused failing test**

Create `tests/complete-data-center-portfolio.test.mjs` with Node built-ins `node:test`, `node:assert/strict`, `node:fs`, and `node:path`. Define this exact ordered array:

```js
const DATA_CENTER_ASSETS = [
  'true-idc.webp',
  'irpc-data-center.webp',
  'backup-computer-center-1.webp',
  'backup-computer-center-2.webp',
  'ghb-main-computer-center.webp',
  'utapao-data-center.webp',
  'pea-disaster-recovery-center.webp',
  'laem-chabang-emergency-center.webp',
  'advanced-computing-power-system.webp',
  'pea-rack-pdu-cold-containment.webp',
  'sriracha-1000kva-generator.webp',
  'symphony-backup-noc.webp',
  'osprey-data-center.webp',
  'osprey-data-hall-fitout.webp',
  'ott-data-center.webp',
];
```

Add a test named `all 15 approved Data Center WebP assets exist` that reads each file from `assets/projects`, asserts `size > 1024`, and asserts bytes 0-3 equal `RIFF` and bytes 8-11 equal `WEBP`.

- [ ] **Step 2: Run the asset test to verify RED**

Run:

```powershell
node --test --test-name-pattern="all 15 approved Data Center WebP assets exist" tests/complete-data-center-portfolio.test.mjs
```

Expected: FAIL because `backup-computer-center-1.webp` and the other missing derivatives do not exist.

- [ ] **Step 3: Download and optimize the exact missing sources**

Use the bundled Python runtime and Pillow with this exact mapping:

```python
sources = {
    "backup-computer-center-1.webp": "https://www.powpacker.com/images/editor/d%20004.jpg",
    "backup-computer-center-2.webp": "https://www.powpacker.com/images/editor/d%20005.jpg",
    "ghb-main-computer-center.webp": "https://www.powpacker.com/images/editor/d%20006.jpg",
    "utapao-data-center.webp": "https://www.powpacker.com/images/editor/d%20007.jpg",
    "pea-disaster-recovery-center.webp": "https://www.powpacker.com/images/editor/d%20008.jpg",
    "laem-chabang-emergency-center.webp": "https://www.powpacker.com/images/editor/d%20009.jpg",
    "advanced-computing-power-system.webp": "https://www.powpacker.com/images/editor/d%20010.jpg",
    "pea-rack-pdu-cold-containment.webp": "https://www.powpacker.com/images/editor/d%20011.jpg",
    "sriracha-1000kva-generator.webp": "https://www.powpacker.com/images/editor/d%20012.jpg",
    "symphony-backup-noc.webp": "https://www.powpacker.com/images/editor/d%20013.jpg",
    "osprey-data-hall-fitout.webp": "https://www.powpacker.com/images/editor/ODC_2.jpg",
}
```

For each URL, use a normal browser user-agent and 30-second timeout; reject empty or undecodable responses; apply `ImageOps.exif_transpose`; convert to `RGB`; call `thumbnail((1600, 1200), Image.Resampling.LANCZOS)`; save metadata-free WebP with `quality=84` and `method=6`. Do not replace the four existing assets.

- [ ] **Step 4: Run asset GREEN checks**

Run the focused Node test again. Then run a Pillow check asserting all 15 files decode as `WEBP`, mode `RGB`, positive dimensions no larger than 1600 x 1200, size between 1 KB and 1.5 MB, and all 15 SHA-256 hashes are unique. Visually inspect the 11 new files against the embedded/source project labels.

Expected: PASS with 15 valid, unique assets and no shifted mapping.

- [ ] **Step 5: Commit the assets and test foundation**

```bash
git add tests/complete-data-center-portfolio.test.mjs assets/projects
git commit -m "assets: complete data center project photos"
```

### Task 2: Expand the Data Center Page to Fifteen Cards

**Files:**
- Modify: `tests/complete-data-center-portfolio.test.mjs`
- Modify: `projects-data-center.html`

**Interfaces:**
- Consumes: ordered `DATA_CENTER_ASSETS` from Task 1.
- Produces: a 15-card Data Center page in the exact source order.

- [ ] **Step 1: Add the Data Center page failing test**

Add the ordered headings array:

```js
const DATA_CENTER_HEADINGS = [
  'True IDC (Internet Data Center)',
  'IRPC Data Center',
  'อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 1',
  'อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 2',
  'อาคารศูนย์คอมพิวเตอร์หลัก ธนาคารอาคารสงเคราะห์',
  'อาคารศูนย์ข้อมูล การท่าอากาศยานอู่ตะเภา',
  'PEA Disaster Recovery Center (DRC)',
  'ศูนย์ป้องกันและบรรเทาสาธารณภัย ท่าเรือแหลมฉบัง',
  'ระบบไฟฟ้า ศูนย์ทรัพยากรคอมพิวเตอร์เพื่อการคำนวณขั้นสูง',
  'PEA Rack, PDU & Cold Containment',
  'เครื่องกำเนิดไฟฟ้า 1,000 KVA ศูนย์โทรคมนาคมศรีราชา',
  'Symphony Backup Network Operations Center',
  'Osprey Data Center — MEP Infrastructure',
  'Osprey Data Center — Data Hall Fit Out',
  'OTT Data Center — Package 2',
];
```

Add a test named `Data Center page contains 15 source-ordered cards` that reads `projects-data-center.html`, asserts exactly 15 `<article class="portfolio-card reveal">` occurrences, extracts `<h3>` text in order and deep-equals `DATA_CENTER_HEADINGS`, and confirms each `DATA_CENTER_ASSETS` path appears once except `osprey-data-center.webp`, which appears twice because the hero reuses it.

- [ ] **Step 2: Run the page test to verify RED**

Run:

```powershell
node --test --test-name-pattern="Data Center page contains 15 source-ordered cards" tests/complete-data-center-portfolio.test.mjs
```

Expected: FAIL because the page contains only three cards.

- [ ] **Step 3: Replace only the portfolio grid contents**

In `projects-data-center.html`, preserve the hero, filters, wrappers, scripts, and footer placeholders. Replace the three existing card articles with 15 `.portfolio-card reveal` articles in `DATA_CENTER_HEADINGS` order. Each card must use its matching asset, the source location in `<small>`, and these work-type descriptions in order:

```text
Electrical System
Civil, Mechanical & Electrical System
Civil, Mechanical & Electrical System
Civil, Mechanical & Electrical System
Structure Work & M&E Work
Structure, Architecture Work & M&E Work
Structure, Architecture Work & M&E Work
Structure, Architecture, SCADA Fire System & CCTV
Electrical Work
Electrical Work
Electrical Work
Structure & Architecture Work
M&E Work
M&E Work
M&E Work
```

Use location labels in order: `MUANG THONG THANI · NONTHABURI`, `RAYONG`, `SAMUT PRAKAN`, `SAMUT PRAKAN`, `RAMA 9 · BANGKOK`, `U-TAPAO · RAYONG`, `RANGSIT · PATHUM THANI`, `LAEM CHABANG · CHONBURI`, `KHLONG LUANG · PATHUM THANI`, `RANGSIT · PATHUM THANI`, `SRIRACHA · CHONBURI`, `AMATA NAKORN · CHONBURI`, `NAVA NAKORN · PATHUM THANI`, `NAVA NAKORN · PATHUM THANI`, `SRINAKARIN 8 · BANGKOK`.

- [ ] **Step 4: Run Data Center GREEN checks**

Run the focused test, then `npm.cmd test` and `git diff --check`. Confirm the page contains no monetary values and no POWPACKER editor hotlinks. Preview the page and confirm all 15 asset requests return HTTP 200.

- [ ] **Step 5: Inspect responsive Data Center layout**

At approximately 1440 px, 768 px, and 390 px widths, confirm all 15 cards appear in order, photos and headings match, text remains readable, and `document.documentElement.scrollWidth <= innerWidth`.

- [ ] **Step 6: Commit the completed Data Center page**

```bash
git add tests/complete-data-center-portfolio.test.mjs projects-data-center.html
git commit -m "feat: complete data center portfolio"
```

### Task 3: Expand All Projects While Preserving Home and Other Categories

**Files:**
- Modify: `tests/complete-data-center-portfolio.test.mjs`
- Modify: `projects.html`

**Interfaces:**
- Consumes: the same 15 headings/assets and card payloads approved in Task 2.
- Produces: an 18-card All Projects page with preserved Home and non-Data Center behavior.

- [ ] **Step 1: Add All Projects and preservation failing tests**

Add a test named `All Projects contains 15 Data Center cards followed by three preserved cards` that asserts 18 articles, asserts the first 15 headings deep-equal `DATA_CENTER_HEADINGS`, and asserts the final three headings are exactly:

```js
[
  'TGI BP5 New Factory',
  'PTT Khao Tao Solar',
  'National Sports Training Center',
]
```

Assert each ordered local asset occurs once in `projects.html`. Add a test named `Home remains three featured projects` that reads `index.html`/`styles.css`, asserts exactly three `.project` articles on Home, and asserts `.p1` uses Osprey, `.p2` uses OTT, and `.p3` retains its existing Solar Unsplash URL. Add a test asserting neither portfolio page contains `www.powpacker.com/images/editor/` or monetary-value labels.

- [ ] **Step 2: Run All Projects test to verify RED**

Run:

```powershell
node --test --test-name-pattern="All Projects contains 15 Data Center cards followed by three preserved cards" tests/complete-data-center-portfolio.test.mjs
```

Expected: FAIL because All Projects contains six cards.

- [ ] **Step 3: Expand All Projects with the approved card payloads**

In `projects.html`, preserve the hero, heading, filters, wrappers, scripts, and the final three non-Data Center articles byte-for-byte. Replace the first three Data Center articles with the exact 15 articles implemented in Task 2. Do not change the All Projects hero image.

- [ ] **Step 4: Run full GREEN verification**

Run:

```powershell
npm.cmd test
git diff --check
```

Expected: all tests pass with zero failures and no whitespace errors. Confirm exact counts/order/mappings, Home preservation, absence of source hotlinks/values, and HTTP 200 for all three pages and 15 assets.

- [ ] **Step 5: Inspect all rendered pages**

Inspect Home, All Projects, and Data Center at approximately 1440 px, 768 px, and 390 px. Confirm no broken images, mismatched titles, clipped text, layout shift, or horizontal overflow; confirm the three unrelated All Projects cards retain their original images.

- [ ] **Step 6: Commit All Projects completion**

```bash
git add tests/complete-data-center-portfolio.test.mjs projects.html
git commit -m "feat: complete all projects portfolio"
```
