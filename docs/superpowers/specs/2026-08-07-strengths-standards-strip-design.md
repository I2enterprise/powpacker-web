# Strengths and Standards Strip Design

## Goal

Replace the blue numeric statistics strip on the home page and About Us page with a strengths-and-standards strip that communicates how POWPACKER works without presenting company figures.

## Scope

- Replace only the `<section class="numbers">` section in `index.html` and `about.html`.
- Preserve the existing blue background, four-column rhythm, and surrounding page flow.
- Do not change the registered-capital or shareholder information shown elsewhere on either page.
- Do not change the existing credentials section or company-facts section.

## Content

The replacement strip will present four principles:

1. **Quality / คุณภาพ** — ส่งมอบงานด้วยมาตรฐานและความใส่ใจในทุกขั้นตอน
2. **Precision / ความแม่นยำ** — วางแผนและดำเนินงานอย่างถูกต้องตามรายละเอียด
3. **Safety / ความปลอดภัย** — ให้ความสำคัญกับความปลอดภัยในการทำงานและการใช้งาน
4. **Reliability / ความน่าเชื่อถือ** — ดูแลโครงการอย่างรับผิดชอบและพร้อมสนับสนุนระยะยาว

The English principle name will act as a compact visual label. The Thai title and description will carry the primary meaning.

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
- Confirm the other occurrences of `20M`, `60%`, registered capital, and shareholder information remain unchanged.
- Check desktop, tablet, and mobile layouts for wrapping, spacing, and separators.
- Run the existing test command and inspect both affected pages for HTML/CSS regressions.
