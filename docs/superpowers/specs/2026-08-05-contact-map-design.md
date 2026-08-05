# Contact Map Design

## Goal

Remove the Google Maps place card that identifies the location as “I2 Enterprise Public Company Limited” from the POWPACKER contact page while preserving an interactive, draggable, and zoomable map.

## Design

- Replace the address-search Google Maps embed URL in `contact.html` with a coordinate-and-zoom embed URL centered on the POWPACKER office.
- Do not query Google Maps by the street address or an organization name, because that lookup triggers the unwanted place card.
- Preserve the existing iframe behavior, accessibility title, lazy loading, and referrer policy.
- Preserve the existing POWPACKER overlay panel and its visual styling.
- Preserve the existing “เปิดใน Google Maps” link exactly as `https://maps.app.goo.gl/coeHAn5HRf2uYyT4A`.
- Do not add a Google Maps API key, billing dependency, or new JavaScript library.

## Verification

- Confirm the contact page loads successfully.
- Confirm the embedded map can still be dragged and zoomed.
- Confirm the I2 Enterprise place card is not visible on desktop and mobile layouts.
- Confirm the POWPACKER overlay remains readable and the Google Maps button still opens the existing destination link.
- Run the existing automated checks after the edit.
