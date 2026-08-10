# Real Data Center Project Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace stock images for the existing Osprey, OTT, True IDC, and IRPC Data Center projects with optimized local photographs from POWPACKER's existing website while preserving all layouts and project content.

**Architecture:** Download four explicitly mapped source photographs, decode and normalize them with Pillow, and store WebP derivatives under `assets/projects/`. Repoint only the matching CSS background variables and inline `--thumb`/`--page-image` values. Use source mapping checks, image-decode checks, and rendered browser inspection to verify authenticity, availability, cropping, and responsive behavior.

**Tech Stack:** Static HTML5, CSS custom properties/background images, Python 3 with Pillow 12.2.0, local Node preview server

## Global Constraints

- Keep the existing website structure, project count, order, names, descriptions, navigation, filters, and responsive layouts.
- Use the exact source-to-project mapping in the approved design.
- Download and serve optimized local assets; do not hotlink production images.
- Store every new file under `assets/projects/` as WebP.
- Do not change Factory, Building, Energy, Satellite, or other non-Data Center imagery.
- Do not upscale source images or distort their aspect ratios.
- Use the user-approved local/static verification fallback if agent browser policy blocks local routes.

---

## File Structure

- `assets/projects/osprey-data-center.webp`: optimized `ODC_1.jpg` photograph.
- `assets/projects/ott-data-center.webp`: optimized `ODC_3.jpg` photograph.
- `assets/projects/true-idc.webp`: optimized `d 001.jpg` photograph.
- `assets/projects/irpc-data-center.webp`: optimized `d 003.jpg` photograph.
- `styles.css`: use Osprey and OTT assets for Home selected-project classes `.p1` and `.p2`.
- `projects.html`: use local Osprey, OTT, and True IDC assets on matching cards.
- `projects-data-center.html`: use local Osprey hero/card plus matching True IDC and IRPC assets.

### Task 1: Acquire and Optimize the Four Real Project Photographs

**Files:**
- Create: `assets/projects/osprey-data-center.webp`
- Create: `assets/projects/ott-data-center.webp`
- Create: `assets/projects/true-idc.webp`
- Create: `assets/projects/irpc-data-center.webp`

**Interfaces:**
- Consumes: four exact source URLs from the existing POWPACKER Data Center page.
- Produces: four decodable RGB WebP files, each preserving source aspect ratio and constrained to a maximum 1600 x 1200 bounding box without upscaling.

- [ ] **Step 1: Establish the missing-assets check (RED)**

Before downloading anything, run a focused check asserting that all four approved paths exist and decode as WebP. Record the expected failure because the files are absent.

- [ ] **Step 2: Download, normalize, and encode the mapped photographs**

Use the bundled Python runtime:

```text
C:\Users\TeerawatSakronram\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe
```

Run a Python script from the isolated worktree using this exact mapping:

```python
sources = {
    "osprey-data-center.webp": "https://www.powpacker.com/images/editor/ODC_1.jpg",
    "ott-data-center.webp": "https://www.powpacker.com/images/editor/ODC_3.jpg",
    "true-idc.webp": "https://www.powpacker.com/images/editor/d%20001.jpg",
    "irpc-data-center.webp": "https://www.powpacker.com/images/editor/d%20003.jpg",
}
```

For each source:

1. Request it with a normal browser user-agent and a 30-second timeout.
2. Reject an empty response or an image Pillow cannot decode.
3. Apply `ImageOps.exif_transpose`.
4. Convert to `RGB`.
5. Apply `thumbnail((1600, 1200), Image.Resampling.LANCZOS)` so smaller sources are not enlarged.
6. Save WebP with `quality=84`, `method=6`, and metadata omitted.

Create `assets/projects/` if it does not exist. If sandboxed network access fails, retry the same bounded download with network approval; do not substitute unrelated images.

- [ ] **Step 3: Verify image integrity and web suitability (GREEN)**

Open every generated file with Pillow and assert:

- `format == "WEBP"`;
- width and height are both greater than zero;
- width is at most 1600 and height is at most 1200;
- mode is `RGB`;
- file size is greater than 1 KB and less than 1.5 MB;
- all four files have different SHA-256 hashes.

Record dimensions, byte sizes, and hashes in the task report. Visually inspect the four files to confirm each image depicts a real project photograph and the mapping is not shifted.

- [ ] **Step 4: Commit the local assets**

```bash
git add assets/projects/osprey-data-center.webp assets/projects/ott-data-center.webp assets/projects/true-idc.webp assets/projects/irpc-data-center.webp
git commit -m "assets: add real data center project photos"
```

### Task 2: Wire Matching Pages to the Local Project Assets

**Files:**
- Modify: `styles.css:1`
- Modify: `projects.html:1`
- Modify: `projects-data-center.html:1`

**Interfaces:**
- Consumes: the four WebP paths produced by Task 1.
- Produces: matching local background-image references on Home, All Projects, and Data Center Projects; all unrelated images remain byte-for-byte unchanged.

- [ ] **Step 1: Establish the stock-image mapping check (RED)**

Before editing page references, inspect the rendered/computed background images or source mappings and record that the mapped Osprey, OTT, True IDC, and IRPC locations still use Unsplash while the approved local paths are absent. The approved final-state assertion must fail before production edits.

- [ ] **Step 2: Update Home selected-project backgrounds**

In `styles.css`, change only:

```css
.p1{height:510px;background-image:url('assets/projects/osprey-data-center.webp')}
.p2{background-image:url('assets/projects/ott-data-center.webp')}
```

Keep `.p3` and every other background unchanged.

- [ ] **Step 3: Update All Projects card backgrounds**

In `projects.html`, change only the matching card `--thumb` values:

- Osprey Data Center -> `assets/projects/osprey-data-center.webp`
- OTT Data Center -> `assets/projects/ott-data-center.webp`
- True IDC -> `assets/projects/true-idc.webp`

Leave Factory, PTT Khao Tao Solar, and National Sports Training Center images unchanged.

- [ ] **Step 4: Update Data Center hero and cards**

In `projects-data-center.html`, change only:

- `.page-hero --page-image` -> `assets/projects/osprey-data-center.webp`
- Osprey card `--thumb` -> `assets/projects/osprey-data-center.webp`
- True IDC card `--thumb` -> `assets/projects/true-idc.webp`
- IRPC Data Center card `--thumb` -> `assets/projects/irpc-data-center.webp`

Do not change any project text or structure.

- [ ] **Step 5: Verify exact mapping and preserved scope (GREEN)**

Run a focused check confirming:

- Home `.p1` and `.p2` use Osprey and OTT local assets; `.p3` remains unchanged.
- All Projects uses the exact local assets on Osprey, OTT, and True IDC only.
- Data Center Projects uses the exact local asset for its hero and each of its three cards.
- No mapped location references Unsplash or `www.powpacker.com`.
- All expected local asset references resolve to HTTP 200 in the preview.
- Project titles, descriptions, counts, and order are unchanged from the task base.

Run: `npm.cmd test`

Expected: all existing tests PASS with zero failures.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 6: Inspect rendered layouts**

Inspect Home, All Projects, and Data Center Projects at approximately 1440px, 768px, and 390px widths. Confirm:

- images decode without console errors;
- no stretching or broken backgrounds;
- the main project subject remains recognizable under `background-size: cover`;
- card text and overlays remain readable;
- unrelated cards retain their original imagery;
- no horizontal overflow or layout shift is introduced.

- [ ] **Step 7: Commit page wiring**

```bash
git add styles.css projects.html projects-data-center.html
git commit -m "feat: use real data center project images"
```
