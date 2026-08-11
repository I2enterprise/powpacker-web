# Restore Data Center Hero Design

## Goal

Restore only the Data Center page hero background to the original Unsplash image while preserving the completed 15-project portfolio and all other page behavior.

## Scope

- Change the `--page-image` value on the `.page-hero` section in `projects-data-center.html` from `assets/projects/osprey-data-center.webp` back to `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85`.
- Do not change any of the 15 `.portfolio-card` elements, their image mappings, text, ordering, navigation, scripts, or responsive layout.
- Add a focused regression assertion so future portfolio-image changes cannot silently replace this hero again.

## Verification

- Record a failing focused test against the current local Osprey hero.
- Restore the exact original URL and make the focused test pass.
- Run the full test suite and `git diff --check`.
- Compare the 15 portfolio card payloads before and after byte-for-byte.
- Inspect the Data Center page in the in-app browser to confirm the original hero is visible and all 15 cards remain intact.

