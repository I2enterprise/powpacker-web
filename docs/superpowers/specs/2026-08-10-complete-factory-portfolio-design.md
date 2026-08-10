# Complete Factory Portfolio Design

## Goal

Complete the local Factory portfolio with all 30 real project photographs and project entries from the POWPACKER Factory source page while preserving the site's existing card system and the completed 15-project Data Center portfolio.

Authoritative source: `https://www.powpacker.com/factory`

## Selected Approach

Download all 30 source photographs as optimized local WebP files, render all 30 Factory projects on `projects-factory.html`, and include the same 30 Factory cards in `projects.html`. This is preferred over updating only the existing two cards or selecting a smaller featured subset because the user explicitly requested the complete source portfolio.

## Source-to-Project Mapping

The source page exposes `fac001.jpg` through `fac030.jpg` in the same order as these project records:

| Order | Source image | Project | Location | Work type |
| ---: | --- | --- | --- | --- |
| 1 | `fac001.jpg` | TGI BP5 New Factory (M&E System) | Samut Prakan | Mechanical & Electrical System |
| 2 | `fac002.jpg` | TGI BP3 Cold Repair | Samut Prakan | Mechanical & Electrical System |
| 3 | `fac003.jpg` | TGI BP2 Cold Repair | Samut Prakan | Mechanical & Electrical System |
| 4 | `fac004.jpg` | THAI MALAYA GLASS | Saraburi | Mechanical & Electrical System |
| 5 | `fac005.jpg` | Oishi - New UHT Plant | Navanakorn Industrial Estate, Pathum Thani | Mechanical & SCADA System |
| 6 | `fac006.jpg` | Oishi - Renovate Central Catering | Navanakorn Industrial Estate, Pathum Thani | Structure, Architecture, Mechanical & Electrical System |
| 7 | `fac007.jpg` | Nan Yang Garment (Tuang Nakorn) | Nakhon Pathom | Electrical System |
| 8 | `fac008.jpg` | TMG TM2 Power, Communication & Mechanical Systems | Saraburi | Mechanical & Electrical System |
| 9 | `fac009.jpg` | TMG TM3 Electrical & Mechanical Systems | Saraburi | Electrical & Mechanical System |
| 10 | `fac010.jpg` | TOA Production Building Electrical System | Samut Prakan | Electrical System |
| 11 | `fac011.jpg` | Nippon Paint M&E | Chonburi | Mechanical & Electrical System |
| 12 | `fac012.jpg` | Magotteaux Mechanical System | Saraburi | Mechanical System |
| 13 | `fac013.jpg` | Troy Siam Expansion Phase III — Electrical | Prachin Buri | Electrical System |
| 14 | `fac014.jpg` | Troy Siam Expansion Phase III — Mechanical | Prachin Buri | Mechanical System |
| 15 | `fac015.jpg` | TCP Fire Protection System for 8 Buildings | Prachin Buri | Mechanical System |
| 16 | `fac016.jpg` | APG Mechanical Utility Pipes | Chachoengsao | Mechanical System |
| 17 | `fac017.jpg` | APG Glass Furnace 2 Utility & Electrical Systems | Chachoengsao | M&E Work |
| 18 | `fac018.jpg` | New CPP Plant Project | Rayong | Mechanical & Electrical System |
| 19 | `fac019.jpg` | Nan Yang Textile OE & Boolroom | Nakhon Pathom | Electrical System |
| 20 | `fac020.jpg` | F&N New Factory | Ayutthaya | Mechanical & Piping System |
| 21 | `fac021.jpg` | Sukhothai Sugar Factory Lighting System | Sukhothai | Electrical System |
| 22 | `fac022.jpg` | Merry Electronics Electrical & Air-conditioning Systems | Rayong | Electrical & Mechanical System |
| 23 | `fac023.jpg` | Merry Electrical & Fire Protection Systems | Kanchanaburi | Mechanical & Electrical System |
| 24 | `fac024.jpg` | New Building of Utility for Pineapple | Rayong | Mechanical & Electrical System |
| 25 | `fac025.jpg` | GIR Furnace CTR Mechanical | Rayong | Mechanical System |
| 26 | `fac026.jpg` | SWAN Project | Sa Kaeo | Mechanical & Electrical System |
| 27 | `fac027.jpg` | Mitsubishi Elevator Asia | Chonburi | Electrical System |
| 28 | `fac028.jpg` | SGA Furnace #301 Electrical & Generator Systems | Ayutthaya | Electrical System |
| 29 | `fac029.jpg` | BJC Cellox Paper Factory M&E Systems | Prachin Buri | M&E Work |
| 30 | `fac030.jpg` | BJC Cellox PM5 Piping & Machinery Installation | Prachin Buri | Mechanical Work |

The two Troy Siam records remain separate cards because the source lists separate Electrical and Mechanical contracts with distinct images.

## Local Assets

- Download only the exact 30 `https://www.pacdd.com/images/pulldown_1658723006/facNNN.jpg` source URLs.
- Store optimized derivatives under `assets/projects/factory/` using descriptive filenames prefixed with their order, for example `01-tgi-bp5-new-factory.webp` through `30-bjc-cellox-pm5.webp`.
- Normalize orientation, convert to RGB, preserve aspect ratio, omit metadata, and do not upscale beyond a 1600 x 1200 bounding box.
- Do not hotlink production images.
- If any source fails or cannot decode, stop and identify the exact URL; do not substitute a stock photograph.

## Factory Page

`projects-factory.html` will contain exactly 30 `.portfolio-card` entries in the approved source order. Each card displays the matching local photograph, location, project name, and work type. Monetary values are omitted.

The Factory hero will use the first real Factory asset (`fac001` / TGI BP5) with the existing overlay and hero structure. Filters, navigation, wrappers, scripts, and responsive rules remain unchanged.

## All Projects Page

`projects.html` will contain exactly 47 cards in this order:

1. the existing 15 Data Center cards, unchanged;
2. the 30 Factory cards, identical in payload and order to the Factory page;
3. the existing PTT Khao Tao Solar card;
4. the existing National Sports Training Center card.

The existing single TGI Factory card is replaced by the complete 30-card Factory set. Solar and Sports content/images remain byte-for-byte unchanged. The All Projects hero and filters remain unchanged.

## Home Page

The Home page remains unchanged with exactly three selected projects: Osprey, OTT, and PTT Khao Tao Solar. No Factory card is added to Home.

## Responsive Behavior

The existing portfolio grid and `.portfolio-card` component remain the presentation system. The additional cards extend pages vertically without adding a new layout. Desktop, tablet, and mobile views must show all cards without horizontal overflow, broken images, mismatched title/photo pairs, or clipped copy.

## Tests and Acceptance

1. RED proves the local site has only two Factory cards and the 30 approved local assets are absent.
2. All 30 local files decode as distinct valid RGB WebP images with positive dimensions no larger than 1600 x 1200.
3. Factory has exactly 30 cards in the mapping table order and uses `fac001` as its hero.
4. All Projects has exactly 47 cards: 15 Data Center, 30 Factory, Solar, then Sports.
5. The Factory card payloads on both pages match exactly.
6. Data Center, Solar, Sports, and Home content/mappings remain unchanged.
7. Neither portfolio page contains source-image hotlinks or monetary values.
8. All pages and 30 assets return HTTP 200 from preview.
9. Browser checks at approximately 1440 px, 768 px, and 390 px confirm correct counts/mappings, readable cards, and no horizontal overflow or console errors.
10. Repository tests and `git diff --check` pass.

## Out of Scope

- Displaying project monetary values.
- Redesigning the portfolio cards, filters, navigation, or responsive layout.
- Changing Data Center, Solar, Sports, Building, or Home imagery/content.
- Adding pagination, search, or lazy-loading controls.
