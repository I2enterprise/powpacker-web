# Complete Factory Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add all 30 real Factory projects and local photographs to the Factory and All Projects pages while preserving the completed Data Center portfolio, Home, Solar, and Sports content.

**Architecture:** Download and optimize the 30 exact source images into an isolated Factory asset directory, extend the existing Node structural regression suite with a literal ordered Factory manifest, then render the same static card payloads on both portfolio pages. Existing card classes and responsive CSS remain unchanged.

**Tech Stack:** Static HTML5/CSS, Node.js built-in test runner, Python 3 with Pillow 12.2.0, local Node preview server

## Global Constraints

- Factory must contain exactly 30 cards in `fac001` through `fac030` source order.
- All Projects must contain exactly 47 cards: 15 unchanged Data Center cards, 30 Factory cards, unchanged Solar, then unchanged Sports.
- Home must remain exactly three selected-project cards with current Osprey, OTT, and Solar mappings.
- Factory hero must use the local `fac001` derivative with its existing overlay/layout.
- Do not display project monetary values.
- Do not hotlink `pacdd.com` or POWPACKER editor images in production.
- Keep existing card classes, navigation, filters, wrappers, scripts, and responsive rules.
- Keep Data Center, Solar, Sports, Building, and unrelated imagery/content unchanged.
- Store all 30 local assets under `assets/projects/factory/` as WebP without upscaling or distortion.

---

## File Structure

- `assets/projects/factory/*.webp`: 30 optimized Factory source photographs.
- `tests/complete-factory-portfolio.test.mjs`: ordered asset/project manifest plus asset, page-count, mapping, preservation, and hotlink/value guards.
- `projects-factory.html`: Factory hero plus 30 source-ordered cards.
- `projects.html`: 15 Data Center + 30 Factory + Solar + Sports.
- `index.html`, `styles.css`, `projects-data-center.html`: verification-only; no planned changes.

### Task 1: Acquire the Thirty Factory Assets and Add the Test Foundation

**Files:**
- Create: `tests/complete-factory-portfolio.test.mjs`
- Create: `assets/projects/factory/01-tgi-bp5-new-factory.webp`
- Create: `assets/projects/factory/02-tgi-bp3-cold-repair.webp`
- Create: `assets/projects/factory/03-tgi-bp2-cold-repair.webp`
- Create: `assets/projects/factory/04-thai-malaya-glass.webp`
- Create: `assets/projects/factory/05-oishi-new-uht-plant.webp`
- Create: `assets/projects/factory/06-oishi-central-catering.webp`
- Create: `assets/projects/factory/07-nan-yang-garment.webp`
- Create: `assets/projects/factory/08-tmg-tm2.webp`
- Create: `assets/projects/factory/09-tmg-tm3.webp`
- Create: `assets/projects/factory/10-toa-production.webp`
- Create: `assets/projects/factory/11-nippon-paint.webp`
- Create: `assets/projects/factory/12-magotteaux.webp`
- Create: `assets/projects/factory/13-troy-siam-electrical.webp`
- Create: `assets/projects/factory/14-troy-siam-mechanical.webp`
- Create: `assets/projects/factory/15-tcp-fire-protection.webp`
- Create: `assets/projects/factory/16-apg-utility-pipes.webp`
- Create: `assets/projects/factory/17-apg-glass-furnace-2.webp`
- Create: `assets/projects/factory/18-new-cpp-plant.webp`
- Create: `assets/projects/factory/19-nan-yang-textile.webp`
- Create: `assets/projects/factory/20-fn-new-factory.webp`
- Create: `assets/projects/factory/21-sukhothai-sugar-lighting.webp`
- Create: `assets/projects/factory/22-merry-electronics.webp`
- Create: `assets/projects/factory/23-merry-fire-protection.webp`
- Create: `assets/projects/factory/24-pineapple-utility-building.webp`
- Create: `assets/projects/factory/25-gir-furnace.webp`
- Create: `assets/projects/factory/26-swan-project.webp`
- Create: `assets/projects/factory/27-mitsubishi-elevator.webp`
- Create: `assets/projects/factory/28-sga-furnace-301.webp`
- Create: `assets/projects/factory/29-bjc-cellox-paper-me.webp`
- Create: `assets/projects/factory/30-bjc-cellox-pm5.webp`

**Interfaces:**
- Consumes: exact source URLs `https://www.pacdd.com/images/pulldown_1658723006/fac001.jpg` through `fac030.jpg`.
- Produces: `FACTORY_PROJECTS`, a literal 30-object ordered manifest in the test file, and 30 valid local WebP files consumed by Tasks 2 and 3.

- [ ] **Step 1: Write the asset-focused failing test**

Create `tests/complete-factory-portfolio.test.mjs` using `node:test`, `node:assert/strict`, `node:fs`, `node:path`, and `node:crypto`. Define `FACTORY_PROJECTS` with the exact 30 rows from `docs/superpowers/specs/2026-08-10-complete-factory-portfolio-design.md`, each object containing literal `asset`, `heading`, `location`, and `description` strings. Asset paths must use the filenames listed above.

Add test `all 30 approved Factory WebP assets exist and are unique` that reads every file from `assets/projects/factory`, asserts size between 1 KB and 1.5 MB, RIFF/WEBP magic bytes, and 30 unique SHA-256 hashes.

- [ ] **Step 2: Run the asset test to verify RED**

```powershell
node --test --test-name-pattern="all 30 approved Factory WebP assets exist and are unique" tests/complete-factory-portfolio.test.mjs
```

Expected: FAIL because the Factory asset directory/files do not exist.

- [ ] **Step 3: Download and optimize the exact source sequence**

Build the source map deterministically from 1 through 30:

```python
for number, output_name in enumerate(output_names, start=1):
    source_url = f"https://www.pacdd.com/images/pulldown_1658723006/fac{number:03d}.jpg"
```

Request each source with a normal browser user-agent and 30-second timeout. Reject empty/undecodable responses; apply `ImageOps.exif_transpose`; convert to RGB; `thumbnail((1600, 1200), Image.Resampling.LANCZOS)` without upscaling; save metadata-free WebP with quality 84 and method 6. Do not modify existing Data Center assets.

- [ ] **Step 4: Verify asset GREEN**

Run the focused Node test. Then use Pillow to assert all 30 decode as WEBP/RGB, have positive dimensions <=1600 x 1200, sizes within limits, and unique hashes. Visually inspect all 30 in source order to confirm the embedded project labels/content match `FACTORY_PROJECTS` without a shifted mapping.

- [ ] **Step 5: Commit asset foundation**

```bash
git add tests/complete-factory-portfolio.test.mjs assets/projects/factory
git commit -m "assets: add complete factory project photos"
```

### Task 2: Expand the Factory Page to Thirty Cards

**Files:**
- Modify: `tests/complete-factory-portfolio.test.mjs`
- Modify: `projects-factory.html`

**Interfaces:**
- Consumes: ordered `FACTORY_PROJECTS` and 30 local assets from Task 1.
- Produces: Factory hero using asset 01 and exactly 30 cards matching the manifest.

- [ ] **Step 1: Add the Factory page failing test**

Add test `Factory page contains 30 source-ordered cards and a real hero`. Read `projects-factory.html`, extract each `.portfolio-card` payload (`--thumb`, `<small>`, `<h3>`, `<p>`) and deep-equal the literal `FACTORY_PROJECTS` values. Assert exactly 30 cards and assert the hero `--page-image` is `assets/projects/factory/01-tgi-bp5-new-factory.webp`.

- [ ] **Step 2: Run Factory page test to verify RED**

```powershell
node --test --test-name-pattern="Factory page contains 30 source-ordered cards and a real hero" tests/complete-factory-portfolio.test.mjs
```

Expected: FAIL because the current Factory page contains only two stock-image cards and a stock hero.

- [ ] **Step 3: Replace Factory hero URL and grid contents**

Preserve the minified source style. Change only the hero `--page-image` value to asset 01 and replace the existing portfolio-grid articles with 30 existing `.portfolio-card reveal` articles generated from the literal manifest. Show location, heading, and work type only; no monetary values. Preserve hero copy, breadcrumb, filters, wrappers, scripts, and component placeholders.

- [ ] **Step 4: Run Factory GREEN checks**

Run the focused test, `npm.cmd test`, and `git diff --check`. Assert no `pacdd.com`, POWPACKER editor URLs, currency labels, or source values appear. Confirm Factory page and all 30 assets return HTTP 200.

- [ ] **Step 5: Inspect Factory responsiveness**

At approximately 1440 px, 768 px, and 390 px, verify 30 visible cards, correct image/title mapping, readable copy, no blank backgrounds, and no horizontal overflow or console errors.

- [ ] **Step 6: Commit Factory page**

```bash
git add tests/complete-factory-portfolio.test.mjs projects-factory.html
git commit -m "feat: complete factory portfolio"
```

### Task 3: Expand All Projects to Forty-Seven Cards

**Files:**
- Modify: `tests/complete-factory-portfolio.test.mjs`
- Modify: `projects.html`

**Interfaces:**
- Consumes: the exact 30 Factory card payloads from Task 2 and the existing 15 Data Center cards.
- Produces: 47-card All Projects page while preserving Home, Data Center, Solar, and Sports.

- [ ] **Step 1: Add All Projects and preservation failing tests**

Add test `All Projects contains 15 Data Center, 30 Factory, Solar, then Sports`. Assert exactly 47 cards; first 15 payloads deep-equal the current `projects-data-center.html` cards; next 30 deep-equal `FACTORY_PROJECTS`; final two full literal payloads equal the existing PTT Khao Tao Solar and National Sports Training Center cards (asset URL, small/location, heading, description).

Add/retain tests asserting Home has exactly three selected projects with Osprey/OTT/Solar mappings; Data Center remains exactly 15 cards; both portfolio pages contain no source hotlinks or monetary values.

- [ ] **Step 2: Run All Projects test to verify RED**

```powershell
node --test --test-name-pattern="All Projects contains 15 Data Center, 30 Factory, Solar, then Sports" tests/complete-factory-portfolio.test.mjs
```

Expected: FAIL because All Projects contains 18 cards rather than 47.

- [ ] **Step 3: Replace the single Factory card with all thirty cards**

Preserve the first 15 Data Center articles byte-for-byte. Replace the existing single TGI Factory article with the 30 Factory articles from Task 2. Preserve the final Solar and Sports articles byte-for-byte. Keep the hero, headings, filters, wrappers, scripts, and minified source style unchanged.

- [ ] **Step 4: Run full GREEN verification**

Run `npm.cmd test` and `git diff --check`. Confirm exact counts/order/payloads; no source hotlinks/values; HTTP 200 for Home, All Projects, Data Center, Factory, and all 45 local Data Center/Factory assets.

- [ ] **Step 5: Inspect all rendered pages**

At approximately 1440 px, 768 px, and 390 px, inspect Home, All Projects, Data Center, and Factory. Confirm counts 3/47/15/30, all images visible, no mapping mismatch/clipped text/overflow/console errors, and preserved Solar/Sports imagery.

- [ ] **Step 6: Commit All Projects completion**

```bash
git add tests/complete-factory-portfolio.test.mjs projects.html
git commit -m "feat: complete factory projects listing"
```
