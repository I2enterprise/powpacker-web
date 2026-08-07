# Strengths and Standards Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the numeric statistics strips on the home and About Us pages with responsive, bilingual cards describing POWPACKER's four working standards.

**Architecture:** Keep the change static and dependency-free: both HTML pages receive the same semantic strip markup, `styles.css` owns the shared responsive presentation, and `translations.js` supplies the existing Thai-to-English text mapping. Browser-based checks exercise the rendered DOM, language switching, and responsive layout while visual inspection protects the agreed scope.

**Tech Stack:** Static HTML5, CSS Grid, vanilla JavaScript translation dictionary, local HTTP server, browser automation

## Global Constraints

- Replace only the `<section class="numbers">` section in `index.html` and `about.html`.
- Preserve the existing blue background, four-column rhythm, and surrounding page flow.
- Do not change the registered-capital or shareholder information shown elsewhere on either page.
- Do not change the existing credentials section or company-facts section.
- Present exactly four principles: Quality, Precision, Safety, and Reliability.
- Use four columns on desktop, two columns on tablet, and one column on narrow mobile screens.
- Preserve reveal-on-scroll behavior and remove counter animation from the replaced markup.
- Keep Thai and English language switching working through the existing translation mechanism.

---

## File Structure

- `index.html`: replace the home-page numeric strip with the shared standards markup.
- `about.html`: replace only the trailing numeric strip with the same standards markup.
- `styles.css`: replace numeric-strip selectors with standard-card typography, separators, and responsive layouts.
- `translations.js`: add English mappings for the new Thai titles and descriptions.

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
