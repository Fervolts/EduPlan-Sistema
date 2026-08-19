# Balance Sheet Autopsy — GoHighLevel embed

`balance-sheet-autopsy-ghl.html` is the quiz funnel rewritten so it can be pasted
straight into a GoHighLevel funnel/website page.

## Install

1. Funnel/Website Builder → open the page → add a **Row**.
2. Inside the row add the element **Custom JS/HTML** (the "Code" element).
3. Paste the **entire** contents of `balance-sheet-autopsy-ghl.html` into it.
4. Set the row/section padding to `0` so the hero runs edge to edge.
5. **Save → Preview.** The code element does not execute inside the builder
   canvas — it only runs in Preview and on the live page. A blank box in the
   editor is normal.
6. Page title, favicon and social preview go in GHL under
   **Settings → SEO Meta Data** (an embedded block can't set them).

Everything goes in **one** code element. Don't split the CSS, HTML and JS across
several elements — GHL can reorder them and the widget will render unstyled.

## Configuration

Top of the `<script>` block, four values:

| Value | What it does |
| --- | --- |
| `WEBHOOK_URL` | GHL Inbound Webhook (Automation → Workflows → Trigger "Inbound Webhook"). Receives the lead + full quiz results. |
| `BOOKING_URL` | Target of the "Book Your Free Consultation" button. |
| `SCROLL_OFFSET` | Pixels left above the widget when it scrolls. Raise it if the page has a sticky header covering content. |
| `REMEMBER_UNLOCK` | `true` = a returning visitor on the same browser skips the email wall. `false` = gate every visit. |
| `FILL_VIEWPORT` | `true` = the widget always stretches to at least the height left on screen, so the funnel page never shows through under the hero. |
| `PAINT_HOST` | `true` = the GHL row/section around the code element gets the widget's background (only where it has none of its own), so GHL's default padding doesn't show as a strip. |

Webhook payload (unchanged from the original): `name`, `firstName`, `lastName`,
`email`, `risk_level`, `risk_score`, `dead_bodies`, `dead_body_count`,
`all_responses` (ready-to-paste note text), `source`, `page_url`.

## What changed for GHL

- **No `<!DOCTYPE>` / `<html>` / `<head>` / `<body>`.** GHL strips those; the
  leftovers are what broke the original paste. This is a fragment:
  `<style>` + one `<div id="bsa-app">` + `<script>`.
- **All CSS scoped to `#bsa-app`,** every class/id prefixed `bsa-`. The original
  styled `*` and `body` globally, which reset margins and forced a background on
  the whole funnel page. Nothing leaks out now, and GHL's theme CSS can't leak in
  (the `#id` prefix outranks GHL's class rules).
- **No inline `onclick`.** All clicks are delegated from the root element, so the
  widget still works when GHL injects or re-renders the block after page load.
- **Script wrapped in an IIFE with a re-run guard.** A double render in preview
  used to throw `Identifier 'scores' has already been declared`, which killed
  every button on the page.
- **`min-height: 100vh` removed** and the quiz container is hidden on the landing
  screen. That's the large blank white area under the hero in the screenshot —
  it was the empty quiz wrapper plus a full-viewport body rule.
- **`@import` for Montserrat replaced** with an injected `<link>` plus a real
  fallback stack. GHL reorders `<style>` contents and a non-first `@import` is
  silently dropped.
- **html2pdf is loaded on demand** (first click of Download), not on every page
  load, and falls back to the browser's print-to-PDF if the CDN is blocked.
- **No `<form>` element.** GHL pages can already have a form wrapper, and a
  nested form submit reloads the page. Enter still submits the email wall.
- **Sticky progress bar `z-index` lowered** to 20 so it sits under GHL's nav,
  and the root has no `overflow: hidden` (an `overflow` ancestor silently
  cancels `position: sticky`).
- **The widget fills the screen.** The landing screen is shorter than the
  viewport, so the funnel page's own background showed through as a white bar
  under the hero. The widget now measures the space actually left below itself
  — accounting for a sticky GHL header — and stretches the hero into it, on
  load, on resize and on every screen change. GHL's wrapper row/section is
  painted to match, so its default padding can't show either.

## Bugs fixed along the way

- **Wrong answer highlighted after Back.** Selections were restored by matching
  button text ("Yes" / "No —" / "Not Sure"), so on Q5, Q11, Q12 and Q13 — where
  the options are in a different order — going back highlighted the wrong
  button. Selections are now keyed to the clicked option's index.
- **Good answers highlighted red.** The colour came from the `yes/no` wording,
  so "Yes — accounts are reconciled monthly in QBO" (a clean answer) turned red
  while "No — the equity looks wrong" turned teal. Colour now follows the risk
  score: red = flagged, yellow = not sure, teal = clear.
- **`event.currentTarget` read from the implicit global `event`,** which is
  undefined in strict mode and in Firefox. The handler now takes the element.
- **Visitor could get stuck on "Unlocking…"** if the webhook POST hung. There's
  now a 4-second hard stop that unlocks the report regardless.
- Findings are HTML-escaped before being written into the report.

## Verified

Rendered inside a simulated GHL page (aggressive serif/centered theme CSS, sticky
nav) at 1200x900, 1440x700 and 390x844 — no page background visible below the
hero at any of them — all 13 questions, Back/Next gating, results scoring,
email wall validation, unlock with the webhook blocked, Start Over, no horizontal
overflow, no console errors, and the funnel's own theme untouched.
