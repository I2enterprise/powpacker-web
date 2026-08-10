# Strengths and Standards Strip Design

## Goal

Replace the blue numeric statistics strip on the home page and About Us page with a strengths-and-standards strip that communicates how POWPACKER works without presenting company figures. Remove the separate four-item company-facts row from the About Us page without adding replacement content. Align every card in the home credentials section with work certification by replacing the capital and shareholder cards with evidence-focused messages.

## Scope

- Replace the `<section class="numbers">` section in `index.html` and `about.html`.
- Preserve the existing blue background, four-column rhythm, and surrounding page flow.
- Preserve the existing three-card credentials layout and the `11 Documents / Work Certificates` card on the home page.
- Replace the `20M / THB / Registered Capital` card with `VERIFIED / By Organizations / Official Work Confirmation`.
- Replace the `60% / I2 / Major Shareholder` card with `PROVEN / Delivery Quality / Project References`.
- Remove the entire `.company-facts` row from `about.html`, including registered date, registered capital, major shareholder, and head office.
- Collapse the space occupied by `.company-facts`; do not add replacement content.

## Content

The replacement strip will present four principles:

1. **Quality / คุณภาพ** — ส่งมอบงานด้วยมาตรฐานและความใส่ใจในทุกขั้นตอน
2. **Precision / ความแม่นยำ** — วางแผนและดำเนินงานอย่างถูกต้องตามรายละเอียด
3. **Safety / ความปลอดภัย** — ให้ความสำคัญกับความปลอดภัยในการทำงานและการใช้งาน
4. **Reliability / ความน่าเชื่อถือ** — ดูแลโครงการอย่างรับผิดชอบและพร้อมสนับสนุนระยะยาว

The English principle name will act as a compact visual label. The Thai title and description will carry the primary meaning.

### Credentials cards

The three home-page credentials cards will tell one evidence sequence:

1. **11 / Documents / Work Certificates** — retained as the factual document count represented on `awards.html`.
2. **VERIFIED / By Organizations / Official Work Confirmation** — communicates that the displayed work evidence comes from external organizations.
3. **PROVEN / Delivery Quality / Project References** — connects those confirmations to demonstrated delivery quality.

The two replacement cards use qualitative labels rather than unsupported numeric claims. Their existing card structure and link to the full certificates page remain unchanged.

## Layout and Styling

- Reuse the existing `.numbers` section as the visual foundation to avoid changing the overall page composition.
- Replace animated number markup with semantic principle-card markup and a dedicated class name.
- Display four equal columns on desktop, two columns on tablet, and one column on narrow mobile screens.
- Retain subtle separators between items where space allows; remove or reposition separators when items wrap.
- Keep typography and colors aligned with the current POWPACKER blue-and-white design system.
- Preserve the existing reveal-on-scroll behavior without counter animation.

## Behavior and Accessibility

- The new content is static and requires no user interaction.
- Use headings and paragraphs rather than decorative numeric elements.
- Ensure readable contrast and avoid relying on icons or color alone to communicate meaning.
- Thai and English language switching must continue to work through the existing translation mechanism.

## Verification

- Confirm both pages show the four principles and no numeric statistics inside the replaced strips.
- Confirm the credentials section retains exactly three cards and keeps the `11 Documents` card unchanged.
- Confirm `20M`, `THB`, `Registered Capital`, `60%`, `I2`, and `Major Shareholder` are absent from the credentials section.
- Confirm the replacement cards use the exact approved `VERIFIED` and `PROVEN` copy.
- Confirm `.company-facts` and all four of its items are absent from the About Us page, with no empty wrapper or replacement section left behind.
- Check desktop, tablet, and mobile layouts for wrapping, spacing, and separators.
- Run the existing test command and inspect both affected pages for HTML/CSS regressions.
