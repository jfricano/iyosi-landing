# iYosi visual design handoff

The production landing page in `dist/` is the visual reference. The editable mockup remains in `design-preview/`. This is a direction for native clients, not a claim that the apps already match it.

## Visual idea

A practical city guide: warm paper surfaces, precise dark ink, restrained editorial illustration, and color used to explain evidence rather than decorate a map. The interface should feel calm and usable in a busy street. Do not portray a community report as permission to smoke.

## Core tokens

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#f6f1e8` | Main page / warm neutral surface |
| White | `#fffefa` | Cards and detail surfaces |
| Ink | `#192b35` | Primary text, dark sections |
| Teal | `#147d79` | Evidence-reviewed designation and primary accent |
| Teal pale | `#d9eeea` | Reviewed status background |
| Amber | `#ae651e` | Unverified community report |
| Amber pale | `#f7e8cf` | Unverified status background |
| Blue | `#3a7199` | Freshness / supporting information |
| Terracotta | `#aa483d` | Disputed, closed, or prohibited warning |
| Line | `#d8d6cd` | Dividers and neutral boundaries |

Status always pairs **text + shape + color**. Teal checkmark means evidence reviewed; amber diamond means community reported or unverified; terracotta exclamation mark means a warning. These are interface signals, not legal certification. Verify contrast in each native implementation.

## Type and layout

The site uses a system sans stack (`Inter`, `Avenir Next`, native sans fallback) for utility text and bold headings, with Georgia italic-style display accents. Native clients should use platform text styles and Dynamic Type rather than a fixed web font. Keep headings short, labels plain, and cards spacious. Use thin dividers and modest corners rather than dense shadows.

## App hierarchy

1. Search an area or landmark; browsing does not require GPS or sign-in.
2. Map/list pins remain distinguishable by type, status text, and symbol. The mock map in `dist/` is fictional and is not geographic data.
3. A place card shows name and **place type**, evidence/advisory **status**, **last confirmation**, and **access note** before a directions decision. Closure and prohibition warnings precede all actions.
4. Detail may then show ratings, written reviews, reports, and correction actions. Ratings and community confirmations do not confer verified designation.
5. Directions use the public entrance or usable access point only when the API permits them.

The landing demo deliberately switches between an evidence-reviewed designated area and an unverified community report to show the difference. The native app needs the full product status set from the API contract, including disputed, prohibited, and closed.

## Voice

Use direct, concrete language: “Find the place. Check the status.” “Evidence reviewed.” “Unverified report.” “Last confirmation.” “Access note.” Avoid language that promises a place is legally permitted, currently open, or safe from enforcement. Metro Manila is the launch geography; avoid implying that all NCR locations are within Manila City. The site’s fictional records and illustration are clearly marked as illustrative.

## Assets

- Hero art: `dist/assets/city-guide-illustration.jpg`. AI-generated editorial illustration of a fictional city block; it does not depict an actual location.
- Favicon: `dist/favicon.svg`. The site logo is a CSS pin in `dist/styles.css` and can be redrawn natively.

The visual source is the current landing site; avoid lifting the demo’s CSS map geometry into a real map client. Use the platform map SDK and accessible native controls.
