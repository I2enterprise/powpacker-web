# Complete Building Portfolio Design

## Goal

Replace the placeholder Building portfolio with all 12 source-ordered projects and real project photographs from `https://www.powpacker.com/building`, then integrate those projects into the complete portfolio without duplicates.

## Source Manifest

The Building page contains these 12 projects in source order:

1. Cholasa Place
2. Revenue Department
3. BAAC Khok Samrong Branch
4. BAAC Pho Thale Branch
5. BAAC Nong Chang Branch
6. Product Design Learning and Practice Building — Nakhon Sawan Rajabhat University
7. Technology and Innovation Transfer Center — Nakhon Sawan Rajabhat University
8. New Canteen Building Project
9. National Sports Training Center
10. TCG Headquarters Renovation — Charn Issara Tower 2
11. State Audit Office and Residential Building — Buriram
12. State Audit Office and Residential Building — Bueng Kan

Thai project names, locations, and work types should follow the source where available. Monetary values must not be displayed.

## Page Behavior

### Building page

- Preserve the current page hero image, breadcrumb, heading, introduction, navigation, wrappers, scripts, and responsive card system.
- Replace the two placeholder cards with exactly 12 source-ordered cards.
- Each card uses a real source photograph downloaded locally as a descriptive WebP under `assets/projects/building/`.

### All Projects page

- The final card order is 15 Data Center, 30 Factory, 12 Building, then Solar.
- The final count is exactly 58 cards.
- Replace the existing generic National Sports Training Center entry with its real Building card; do not duplicate it.
- Preserve the existing 15 Data Center cards, 30 Factory cards, and Solar card byte-for-byte.

### Home page

- Preserve the existing three featured cards and their image mappings.

## Asset Requirements

- Download the 12 project images used by the source Building page.
- Convert each image to RGB WebP at 650 × 371 pixels.
- Each file must be larger than 1 KB and smaller than 1.5 MB.
- All 12 images must be valid and have unique SHA-256 hashes.
- Do not hotlink POWPACKER or its image host from production HTML or CSS.

## Verification

- Use test-driven development: asset tests first, then Building-page tests, then All-Projects integration tests.
- Verify exact counts, ordering, asset mappings, locations, descriptions, absence of monetary values and remote source links, and preservation of existing project payloads.
- Run the full Node test suite and `git diff --check` after every task.
- Inspect Building and All Projects at desktop, tablet, and mobile widths with no blank images or horizontal overflow.
