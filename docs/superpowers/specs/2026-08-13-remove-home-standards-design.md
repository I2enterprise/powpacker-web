# Remove Home Standards Design

## Goal

Remove the POWPACKER working-standards strip from the Home page only while preserving the complete four-item strip on the About page.

## Scope

- Remove the single `section.numbers.standards` from `index.html`.
- Preserve the surrounding Home sections and their order so Selected Projects follows the preceding section naturally.
- Preserve the About standards section, its four items, copy, accessibility label, and responsive behavior.
- Preserve the shared standards CSS because About still consumes it.
- Add a regression test that asserts Home has no standards section and About has exactly one standards section with four items.
