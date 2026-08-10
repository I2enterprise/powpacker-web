# Real Data Center Project Images Design

## Goal

Keep the existing POWPACKER website structure, project count, card copy, and responsive layouts while replacing stock imagery for matching Data Center projects with real project photographs from the existing POWPACKER website.

## Source

Use the images associated with the matching project entries on:

`https://www.powpacker.com/data-center-%E0%B9%83%E0%B8%95%E0%B9%89%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B8`

The source-to-project mapping is:

1. **Osprey Data Center** — use the image from the `ODC - MEP Infrastructure to Osprey Data Center` entry. This project card represents both MEP Infrastructure and Data Hall Fit-out, so the MEP entry is the primary visual source.
2. **OTT Data Center** — use the image from the `OTT DC (PACKAGE 2)` construction and building-systems entry.
3. **True IDC** — use the image from the `True IDC (Internet Data Center)` entry.
4. **IRPC Data Center** — use the image from the `IRPC-Data Center` entry.

## Local Assets

Download the source images rather than hotlinking them. Store optimized copies in:

- `assets/projects/osprey-data-center.webp`
- `assets/projects/ott-data-center.webp`
- `assets/projects/true-idc.webp`
- `assets/projects/irpc-data-center.webp`

Preserve each photograph's aspect ratio. Apply only web-oriented resizing, compression, and color-profile normalization; do not crop people or meaningful project equipment out of the source asset. CSS `background-size: cover` may crop responsively as the existing layouts already do.

## Page Mapping

### Home page

- Replace `.project-image.p1` with the local Osprey image.
- Replace `.project-image.p2` with the local OTT image.
- Leave the PTT Khao Tao Solar image unchanged because the provided source page covers Data Center work only.

### All Projects page

- Replace the Osprey card image with the local Osprey image.
- Replace the OTT card image with the local OTT image.
- Replace the True IDC card image with the local True IDC image.
- Leave Factory, Energy, and Satellite card images unchanged.

### Data Center Projects page

- Replace the page hero stock image with the local Osprey image.
- Replace the Osprey, True IDC, and IRPC card images with their matching local assets.

## Constraints

- Do not add, remove, reorder, or rename projects.
- Do not change project descriptions, locations, navigation, filters, card structure, or responsive layout.
- Do not modify Factory or Building project pages.
- Do not modify non-Data Center imagery.
- Do not leave production references to the source site's image URLs; every replacement must use `assets/projects/`.
- Add descriptive alternative text only where an actual `<img>` element is used. Existing CSS background-image containers remain decorative under the current markup.

## Verification

- Confirm all four local WebP assets exist, are decodable, have non-zero dimensions, and are reasonably sized for web delivery.
- Confirm every mapped Osprey, OTT, True IDC, and IRPC location uses the correct local file.
- Confirm no mapped location still references Unsplash or the source POWPACKER domain.
- Confirm unrelated project imagery and all project text remain unchanged.
- Confirm Home, All Projects, and Data Center Projects load successfully in the local preview.
- Inspect desktop, tablet, and mobile layouts for subject visibility, cropping, stretching, missing images, and console errors.
- Run the existing test command and `git diff --check` before completion.
