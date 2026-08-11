# About Company Profile Download Design

## Goal

Add a direct Company Profile PDF download beneath the About page hero description.

## Design

- Copy the approved source PDF to `assets/documents/company-profile-powpacker-2026.pdf`.
- Add one anchor immediately after the existing hero paragraph in `about.html`.
- Button text: `ดาวน์โหลด Company Profile (PDF)`.
- Link target: `assets/documents/company-profile-powpacker-2026.pdf`.
- Include the Boolean `download` attribute and an accessible `aria-label`.
- Reuse the existing `button outline` visual treatment and add only a focused hero spacing rule if required.
- Preserve all existing hero image, breadcrumb, heading, description, page content, navigation, and responsive behavior.

## Verification

- Confirm the PDF is byte-identical to the approved source, is readable, unencrypted, and has 45 pages.
- Confirm the link target returns HTTP 200 with `application/pdf`.
- Confirm clicking the anchor exposes the approved filename through the `download` attribute.
- Check the About hero at desktop and mobile widths for readable spacing and no horizontal overflow.
