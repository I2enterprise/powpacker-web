# Strengths and Standards Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the numeric statistics strips on the home and About Us pages with responsive, bilingual cards describing POWPACKER's four working standards, and remove the separate About Us company-facts row without replacement.

**Architecture:** Keep the change static and dependency-free: both HTML pages receive the same semantic strip markup, `styles.css` owns the shared responsive presentation, and `translations.js` supplies the existing Thai-to-English text mapping. The About Us company-facts markup and its dedicated `brand.css` rules are removed together so no empty layout or dead styling remains. Static checks protect structure, language mappings, responsive rules, and the home credentials scope; the local preview remains available for external-browser inspection.

**Tech Stack:** Static HTML5, CSS Grid, vanilla JavaScript translation dictionary, Node.js static checks, local HTTP server

## Global Constraints

- Replace the `<section class="numbers">` section in `index.html` and `about.html`.
- Preserve the existing blue background, four-column rhythm, and surrounding page flow.
- Preserve the existing credentials section on the home page, including its `20M` and `60%` values.
- Remove the entire `.company-facts` row from `about.html`, including registered date, registered capital, major shareholder, and head office.
- Collapse the space occupied by `.company-facts`; do not add replacement content.
- Present exactly four principles: Quality, Precision, Safety, and Reliability.
- Use four columns on desktop, two columns on tablet, and one column on narrow mobile screens.
- Preserve reveal-on-scroll behavior and remove counter animation from the replaced markup.
- Keep Thai and English language switching working through the existing translation mechanism.

---

## File Structure

- `index.html`: replace the home-page numeric strip with the shared standards markup.
- `about.html`: replace the trailing numeric strip with the shared standards markup and remove the company-facts row.
- `styles.css`: replace numeric-strip selectors with standard-card typography, separators, and responsive layouts.
- `translations.js`: add English mappings for the new Thai titles and descriptions.
- `brand.css`: remove the orphaned company-facts rules while preserving the directors grid.

### Task 1: Replace Both Numeric Strips with the Bilingual Standards Component

**Files:**
- Modify: `index.html:59-61`
- Modify: `about.html:1`
- Modify: `styles.css:1`
- Modify: `translations.js:1-2`

**Interfaces:**
- Consumes: `window.FULL_EN`, read by `translateFullSite(lang)` in `script.js`; `.reveal`, observed by the existing `IntersectionObserver`.
- Produces: two `.standards` sections, each containing one `.standards-grid` and four `.standard-item` articles; English translations keyed by the exact Thai source strings; browser-visible four-, two-, and one-column layouts.

- [ ] **Step 1: Establish the failing component check (RED)**

Before editing production files, inspect `index.html` and `about.html` and record that `.standards-grid` is absent while the old `.numbers-grid` contains four numeric items. This is the expected RED result because the requested standards component does not exist yet.

The in-app browser was attempted through localhost, loopback IP, LAN IP, and a direct file URL, but its security policy blocked every local route. The user explicitly approved static HTML/CSS and translation verification as the fallback. Do not edit production files before the RED evidence is recorded.

- [ ] **Step 2: Replace the numeric strip markup on both pages**

In both `index.html` and `about.html`, replace only the current `<section class="numbers">...</section>` with:

```html
<section class="numbers standards" aria-label="มาตรฐานการทำงานของ POWPACKER">
  <div class="container standards-grid reveal">
    <article class="standard-item"><small>QUALITY</small><h3>คุณภาพ</h3><p>ส่งมอบงานด้วยมาตรฐานและความใส่ใจในทุกขั้นตอน</p></article>
    <article class="standard-item"><small>PRECISION</small><h3>ความแม่นยำ</h3><p>วางแผนและดำเนินงานอย่างถูกต้องตามรายละเอียด</p></article>
    <article class="standard-item"><small>SAFETY</small><h3>ความปลอดภัย</h3><p>ให้ความสำคัญกับความปลอดภัยในการทำงานและการใช้งาน</p></article>
    <article class="standard-item"><small>RELIABILITY</small><h3>ความน่าเชื่อถือ</h3><p>ดูแลโครงการอย่างรับผิดชอบและพร้อมสนับสนุนระยะยาว</p></article>
  </div>
</section>
```

Do not edit `.certs` in `index.html` or `.company-facts` in `about.html`.

This instruction applies to Task 1 only. Task 2 deliberately removes `.company-facts` after the standards component is complete.

- [ ] **Step 3: Replace numeric typography with standards-card styling**

In `styles.css`, keep `.numbers{padding:72px 0;background:var(--blue);color:#fff}` and replace the remaining `.numbers-grid`, `.numbers strong`, `.numbers span`, and `.numbers p` rules with:

```css
.standards-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.standard-item{border-right:1px solid rgba(255,255,255,.28);padding:0 35px}
.standard-item:first-child{padding-left:0}
.standard-item:last-child{border-right:0}
.standard-item small{display:block;font:700 10px var(--font-en);letter-spacing:.18em;color:#9ee4ff;margin-bottom:12px}
.standard-item h3{font:600 22px var(--font-th);margin:0 0 10px}
.standard-item p{font-size:12px;line-height:1.75;color:#d3eef9;margin:0}
```

Inside the existing `@media(max-width:980px)` block, add:

```css
.standards-grid{grid-template-columns:repeat(2,1fr);gap:34px 0}
.standard-item:nth-child(2){border-right:0}
.standard-item:nth-child(3){padding-left:0}
```

Inside the existing `@media(max-width:700px)` block, replace the obsolete `.numbers-grid` and `.numbers strong` declarations with:

```css
.standards-grid{grid-template-columns:1fr;gap:0}
.standard-item{border-right:0;border-bottom:1px solid rgba(255,255,255,.28);padding:24px 0}
.standard-item:first-child{padding-top:0}
.standard-item:last-child{border-bottom:0;padding-bottom:0}
```

- [ ] **Step 4: Add exact English translations for the new Thai copy**

Add these entries to `window.FULL_EN` in `translations.js`:

```js
'คุณภาพ':'Quality',
'ส่งมอบงานด้วยมาตรฐานและความใส่ใจในทุกขั้นตอน':'Delivering every project with high standards and attention at every stage.',
'ความแม่นยำ':'Precision',
'วางแผนและดำเนินงานอย่างถูกต้องตามรายละเอียด':'Planning and executing every detail with accuracy.',
'ความปลอดภัย':'Safety',
'ให้ความสำคัญกับความปลอดภัยในการทำงานและการใช้งาน':'Prioritizing safety throughout delivery and operation.',
'ความน่าเชื่อถือ':'Reliability',
'ดูแลโครงการอย่างรับผิดชอบและพร้อมสนับสนุนระยะยาว':'Taking responsible ownership with dependable long-term support.',
'มาตรฐานการทำงานของ POWPACKER':'POWPACKER working standards',
```

- [ ] **Step 5: Run automated verification**

Run: `npm test`

Expected: all existing tests PASS with pristine output.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 6: Verify component structure and responsive behavior (GREEN)**

Inspect `index.html` and `about.html`. On both pages, confirm that `.standards-grid` exists, contains exactly four `.standard-item` elements, and contains no `[data-count]`. Inspect the CSS rules and confirm four, two, and one grid columns at the desktop, `max-width:980px`, and `max-width:700px` breakpoints respectively, including appropriate separator resets when items wrap.

Confirm each exact Thai title and description has its specified English mapping in `translations.js`, while `QUALITY`, `PRECISION`, `SAFETY`, and `RELIABILITY` remain literal labels in both pages. Confirm the existing `20M` and `60%` content remains present in the home credentials section and the corresponding company facts remain present on the About Us page.

- [ ] **Step 7: Commit the implementation**

```bash
git add index.html about.html styles.css translations.js
git commit -m "feat: replace company stats with working standards"
```

### Task 2: Remove the About Us Company-Facts Row

**Files:**
- Modify: `about.html:1`
- Modify: `brand.css:5-6`

**Interfaces:**
- Consumes: the existing `.mission-grid`, `#board` heading, `.directors` grid, and the home-page `.certs` section.
- Produces: an About Us content flow where `.mission-grid` is followed directly by `#board`, with no `.company-facts` markup or CSS; the home credentials remain unchanged.

- [ ] **Step 1: Establish the failing removal check (RED)**

Before editing production files, run a focused static check that asserts `about.html` contains no `.company-facts` element and `brand.css` contains no `.company-facts` selector. Record the expected failure because both the row and its styling still exist. Also record that the current row has exactly four items so the removal scope is explicit.

- [ ] **Step 2: Remove the entire company-facts row from About Us**

In `about.html`, remove this complete element and leave no empty wrapper:

```html
<div class="company-facts reveal"><div><small>REGISTERED</small><strong>7 February 2025</strong></div><div><small>REGISTERED CAPITAL</small><strong>THB 20,000,000</strong></div><div><small>MAJOR SHAREHOLDER</small><strong>I2 Enterprise PCL · 60%</strong></div><div><small>HEAD OFFICE</small><strong>Latphrao, Bangkok</strong></div></div>
```

Do not add a replacement section. The existing `<div class="content-heading reveal" id="board" ...>` must follow the closing `.mission-grid` directly.

- [ ] **Step 3: Remove orphaned company-facts CSS**

In `brand.css`, remove these now-unused selectors and their declarations:

```css
.company-facts
.company-facts div
.company-facts small
.company-facts strong
```

Inside `@media(max-width:700px)`, change the combined selector:

```css
.company-facts,.directors{grid-template-columns:1fr 1fr}
```

to:

```css
.directors{grid-template-columns:1fr 1fr}
```

Do not change any `.directors` declarations or other responsive behavior.

- [ ] **Step 4: Verify the removal and preserved scope (GREEN)**

Run a focused static check confirming:

- `about.html` has no `.company-facts` class, no four removed labels, and no four removed values.
- `brand.css` has no `.company-facts` selector.
- `.mission-grid` is followed directly by the existing `#board` content heading.
- The About Us standards strip still has four `.standard-item` articles.
- The home credentials section still contains `<strong>20M</strong>` and `<strong>60%</strong>`.

Run: `npm.cmd test`

Expected: all existing tests PASS with zero failures.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Confirm the local preview updates**

Request `http://127.0.0.1:4173/about.html` from the existing preview server and confirm HTTP 200. The browser-access fallback remains static verification because the in-app browser blocks local routes; the user can inspect the same URL in Chrome or Edge.

- [ ] **Step 6: Commit the removal**

```bash
git add about.html brand.css
git commit -m "feat: remove about company facts"
```
