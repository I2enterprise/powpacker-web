# Complete Data Center Portfolio Design

## Context and Root Cause

The approved real-image update mapped photographs only to the four Data Center projects already represented by the local site: Osprey, OTT, True IDC, and IRPC. The POWPACKER source page actually contains 15 Data Center image/project entries. The implementation was internally correct for its earlier four-project scope, but that scope did not satisfy the later requirement to reproduce the complete source portfolio.

Authoritative source: `https://www.powpacker.com/data-center-%E0%B9%83%E0%B8%95%E0%B9%89%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9`

## Considered Approaches

1. **Complete local portfolio (selected):** Download all 15 source images, show all 15 source entries on the Data Center page, and include them in All Projects while preserving the current card system. This directly addresses the missing-content report and avoids production hotlinks.
2. **Image carousel inside the existing three cards:** Keeps the card count small, but hides distinct project references and makes project names/descriptions ambiguous.
3. **Link to the legacy source page:** Avoids adding content locally, but leaves the local portfolio incomplete and depends on an external page.

The selected approach is the only one that makes the local portfolio complete while retaining the existing visual language.

## Scope

### Assets

Store optimized local WebP derivatives under `assets/projects/` for these exact source images:

| Order | Source image | Project |
| ---: | --- | --- |
| 1 | `d 001.jpg` | True IDC (Internet Data Center) |
| 2 | `d 003.jpg` | IRPC Data Center |
| 3 | `d 004.jpg` | Backup Computer Center Building, Samut Prakan |
| 4 | `d 005.jpg` | Backup Computer Center Building, Samut Prakan (second source entry/image) |
| 5 | `d 006.jpg` | Government Housing Bank Main Computer Center |
| 6 | `d 007.jpg` | U-Tapao Data Center Building |
| 7 | `d 008.jpg` | PEA Disaster Recovery Center (DRC) |
| 8 | `d 009.jpg` | Laem Chabang Disaster Prevention and Mitigation Center |
| 9 | `d 010.jpg` | Advanced Computing Resource Center Power Systems |
| 10 | `d 011.jpg` | PEA Rack, PDU, and Cold Containment Installation |
| 11 | `d 012.jpg` | 1,000 KVA Generator at Sriracha Telecommunication Center |
| 12 | `d 013.jpg` | Symphony Backup Network Operations Center |
| 13 | `ODC_1.jpg` | Osprey Data Center - MEP Infrastructure |
| 14 | `ODC_2.jpg` | Osprey Data Center - Data Hall Fit Out |
| 15 | `ODC_3.jpg` | OTT Data Center Package 2 |

The four existing local derivatives may be retained when byte-identical to their approved sources. Add the remaining 11 derivatives with descriptive filenames. No production page may hotlink the source images.

### Data Center Page

`projects-data-center.html` will contain 15 cards in source order. Each card uses the existing `.portfolio-card` structure and displays:

- location in `<small>`;
- concise project name in `<h3>`;
- work type in `<p>`;
- the matching local source photograph.

The two Samut Prakan backup-center source entries remain separate cards because the source supplies two distinct images. Their headings will be differentiated as “อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 1” and “อาคารศูนย์คอมพิวเตอร์สำรอง — ภาพที่ 2” so users do not mistake them for an accidental duplicate.

Project monetary values will not be displayed.

### All Projects Page

`projects.html` will include the same 15 Data Center cards, followed by the three existing non-Data Center cards:

- TGI BP5 New Factory;
- PTT Khao Tao Solar;
- National Sports Training Center.

The result is 18 cards. The existing heading, navigation, filters, hero, non-Data Center copy, and non-Data Center images remain unchanged.

### Home Page

The Home selected-project layout remains three cards. It continues to feature:

- Osprey MEP Infrastructure;
- OTT Data Center Package 2;
- PTT Khao Tao Solar.

No Home layout or card-count change is included.

## Responsive and Visual Behavior

The existing portfolio grid, card, background-cover, overlay, and responsive rules remain the presentation system. Adding cards extends the grid vertically without introducing a new component. Desktop, tablet, and mobile views must have no horizontal overflow, broken images, clipped project text, or mismatched photo/title pairs.

## Data Integrity and Error Handling

- Download only the 15 exact source URLs listed above with a normal user agent and bounded timeout.
- Reject empty or undecodable responses.
- Normalize orientation, convert to RGB, and create metadata-free WebP files without upscaling.
- Preserve source-to-project mapping with a deterministic manifest/check.
- If a source is unavailable, stop the asset task and report the exact failed URL; do not substitute a stock image.

## Testing and Acceptance

1. A RED check demonstrates that the local portfolio has fewer than 15 Data Center entries and 11 approved local assets are absent.
2. All 15 local images decode as unique valid WebP files and visually match their source project labels.
3. Data Center has exactly 15 cards in the approved source order.
4. All Projects has exactly 18 cards: the 15 Data Center entries followed by the three preserved non-Data Center entries.
5. Home remains at three featured project cards with its approved imagery.
6. No production reference uses `www.powpacker.com/images/editor/`.
7. Page and asset preview requests return HTTP 200.
8. Browser checks at approximately 1440 px, 768 px, and 390 px confirm correct mapping, readable content, and no horizontal overflow.
9. Existing repository tests and `git diff --check` pass.

## Out of Scope

- Displaying project monetary values.
- Redesigning cards, filters, navigation, or page layout.
- Changing Factory, Building, Energy, or Satellite imagery/content.
- Replacing the Home hero or unrelated Home imagery.
