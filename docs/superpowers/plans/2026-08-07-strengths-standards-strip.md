# Strengths and Standards Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the numeric statistics strips on the home and About Us pages with responsive, bilingual cards describing POWPACKER's four working standards.

**Architecture:** Keep the change static and dependency-free: both HTML pages receive the same semantic strip markup, `styles.css` owns the shared responsive presentation, and `translations.js` supplies the existing Thai-to-English text mapping. A Node test reads the generated source files to protect the agreed scope, including preservation of the capital and shareholder content outside the strips.

**Tech Stack:** Static HTML5, CSS Grid, vanilla JavaScript translation dictionary, Node.js built-in test runner

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
- `tests/strengths-standards.test.mjs`: verify strip content, semantics, translation coverage, responsive CSS, and preservation of out-of-scope company figures.

### Task 1: Replace Both Numeric Strips with the Bilingual Standards Component

**Files:**
- Create: `tests/strengths-standards.test.mjs`
- Modify: `index.html:59-61`
- Modify: `about.html:1`
- Modify: `styles.css:1`
- Modify: `translations.js:1-2`

**Interfaces:**
- Consumes: `window.FULL_EN`, read by `translateFullSite(lang)` in `script.js`; `.reveal`, observed by the existing `IntersectionObserver`.
- Produces: two `.standards` sections, each containing one `.standards-grid` and four `.standard-item` articles; English translations keyed by the exact Thai source strings.

- [ ] **Step 1: Write the failing source-contract test**

Create `tests/strengths-standards.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const principles = [
  ['QUALITY', 'คุณภาพ', 'ส่งมอบงานด้วยมาตรฐานและความใส่ใจในทุกขั้นตอน'],
  ['PRECISION', 'ความแม่นยำ', 'วางแผนและดำเนินงานอย่างถูกต้องตามรายละเอียด'],
  ['SAFETY', 'ความปลอดภัย', 'ให้ความสำคัญกับความปลอดภัยในการทำงานและการใช้งาน'],
  ['RELIABILITY', 'ความน่าเชื่อถือ', 'ดูแลโครงการอย่างรับผิดชอบและพร้อมสนับสนุนระยะยาว']
];

function standardsSection(html) {
  const match = html.match(/<section class="numbers standards">[\s\S]*?<\/section>/);
  assert.ok(match, 'standards section should exist');
  return match[0];
}

test('home and About Us pages render the four standards without counters', async () => {
  for (const page of ['index.html', 'about.html']) {
    const section = standardsSection(await read(page));
    assert.equal((section.match(/class="standard-item"/g) || []).length, 4);
    assert.doesNotMatch(section, /data-count|Registered Capital|I2 Enterprise Holding/);
    for (const [label, title, description] of principles) {
      assert.match(section, new RegExp(label));
      assert.match(section, new RegExp(title));
      assert.match(section, new RegExp(description));
    }
  }
});

test('company figures outside the replaced strips remain unchanged', async () => {
  const home = await read('index.html');
  const about = await read('about.html');
  assert.match(home, /<strong>20M<\/strong><span>THB<\/span>/);
  assert.match(home, /<strong>60%<\/strong><span>I2<\/span>/);
  assert.match(about, /THB 20,000,000/);
  assert.match(about, /I2 Enterprise PCL · 60%/);
});

test('new Thai copy has English translation entries', async () => {
  const translations = await read('translations.js');
  for (const [, title, description] of principles) {
    assert.match(translations, new RegExp(`'${title}':'[^']+'`));
    assert.match(translations, new RegExp(`'${description}':'[^']+'`));
  }
});

test('standards grid declares desktop, tablet, and mobile layouts', async () => {
  const css = await read('styles.css');
  assert.match(css, /\.standards-grid\{[^}]*grid-template-columns:repeat\(4,1fr\)/);
  assert.match(css, /@media\(max-width:980px\)[\s\S]*\.standards-grid\{[^}]*grid-template-columns:repeat\(2,1fr\)/);
  assert.match(css, /@media\(max-width:700px\)[\s\S]*\.standards-grid\{[^}]*grid-template-columns:1fr/);
});
```

- [ ] **Step 2: Run the test and confirm the new contract fails**

Run: `npm test`

Expected: FAIL because neither page contains `<section class="numbers standards">` yet.

- [ ] **Step 3: Replace the numeric strip markup on both pages**

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

- [ ] **Step 4: Replace numeric typography with standards-card styling**

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

- [ ] **Step 5: Add exact English translations for the new Thai copy**

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

- [ ] **Step 6: Run automated verification**

Run: `npm test`

Expected: all four source-contract tests PASS, along with any existing tests.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 7: Inspect the rendered pages at responsive widths**

Serve the project locally and inspect `index.html` and `about.html` at approximately 1440 px, 768 px, and 390 px viewport widths. Confirm four columns, two columns, and one column respectively; separators must terminate cleanly and surrounding sections must not gain unintended gaps.

- [ ] **Step 8: Commit the implementation**

```bash
git add index.html about.html styles.css translations.js tests/strengths-standards.test.mjs
git commit -m "feat: replace company stats with working standards"
```
