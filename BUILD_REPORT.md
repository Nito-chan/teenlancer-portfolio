# BUILD_REPORT — portfolio-template

## 1. Deploy status

- **Deployed URL:** `https://teenlancer-portfolio-chi.vercel.app/` (live).
  Import: repo root, Framework "Other", no build command.
  Headers verified live: `X-Frame-Options: DENY` site-wide,
  `immutable` on css/js/png, revalidate on html.
- **Repo URL:** `https://github.com/Nito-chan/teenlancer-portfolio`.
  Footer "View source" now points at the repo.

## 2. File tree

```
portfolio-template/
├─ index.html
├─ css/
│  ├─ tokens.css        (1.1 KB — both themes)
│  ├─ base.css          (2.4 KB — reset, type, layout)
│  └─ components.css    (14.3 KB — nav, hero, cards, forms, footer)
├─ js/
│  ├─ config.js         (6.6 KB — all editable content)
│  ├─ render.js         (8.1 KB — builds sections from config)
│  └─ main.js           (8.3 KB — theme, menu, nav, typing, accordion, form)
├─ favicon.svg
├─ og-image.png         (1200×630, generated card, 8.8 KB)
├─ robots.txt
├─ sitemap.xml
├─ vercel.json        (headers + caching for Vercel)
├─ README.md
└─ BUILD_REPORT.md
```

## 3. Section checklist (part 5)

| Section | Status | Note |
|---|---|---|
| Header (sticky) | done | Monogram, nav, theme toggle, Hire me, hamburger + focus trap + Esc, safe-area |
| Hero | done | Availability pill, H1, sub, primary/secondary CTA, typing source panel once (~2s, static under reduced motion), 3 measured badges, caption |
| Proof strip | done | 3 honest sample items, stacks on mobile |
| Services | done | Divider-based list (not cards), outcome-first, tool chips |
| Projects | done | 4 case-study cards, CSS browser mocks per thumb type, accordion (`aria-expanded`, one open at a time), strongest spans 2 cols desktop, sample note |
| Skills | done | 3 groups, 13 items total (≤14), Daily/Comfortable/Learning, no bars |
| Process | done | True numbered sequence, 4 steps + client deliverable each |
| Testimonials | done | `sample: true` shows tag; empty array hides section (verified logic, ships with 2 samples) |
| About | done | 2 paragraphs, monogram fallback (`photo: null`), resume link |
| Contact | done | Formspree + `_gotcha` honeypot, AJAX with inline plain-language errors (`aria-live`), honest "not connected yet" state when endpoint is empty, email/WhatsApp/social beside it, no floating button |
| Footer | done | Name, JS year, social, back-to-top, "plain HTML/CSS/JS" line |

Vercel migration (after initial build):
- Deleted `netlify.toml`, added `vercel.json` (same headers + caching).
- Contact form moved Netlify Forms → Formspree (`form.endpoint` in config);
  fixed a latent false-success where POST `/` returned 200 with no delivery.

Deviations from spec (intentional):
- `--text-muted` (dark) is `#B9B8D9`, not the spec's `#A9A8CC`. Measured 9.56:1 vs 15.61:1 background — both pass, the lighter value reads better on the indigo.
- Font loading: tried `media="print" onload` async pattern; mobile perf dropped 91→83 with TBT 0→650ms. Reverted to render-blocking Google Fonts stylesheet per spec.

## 4. Lighthouse + Web Vitals (measured, `npx lighthouse`, Chrome)

Production (`https://teenlancer-portfolio-chi.vercel.app/`):

| Suite | Perf | A11y | Best prac. | SEO |
|---|---|---|---|---|
| Mobile (Moto G4 emulation) | **83** | **100** | **100** | **100** |
| Desktop | **93** | **100** | **100** | **100** |

Mobile production details: FCP 3.5s, LCP 3.5s, TBT 0ms, CLS 0.003,
total 156 KiB (fonts included). Desktop: FCP/LCP 1.3s, TBT 0ms,
CLS 0.001, 157 KiB. One desktop run failed with transient `NO_FCP`;
re-run passed. INP has no lab value; field INP on this page (no heavy
JS) is expected ≤200ms but was **not measured** — honest gap, see §8.

Earlier local runs (`python http.server`): mobile 91 / 84 / 83,
desktop 98. Run-to-run variance (83–91 mobile) is the Google Fonts
chain on simulated slow-4G with a cold cache
(`render-blocking-insight` est. savings 1.4s) — the badges show the
production number (83), which is the strictest honest value.

Perf target (≥95 mobile) **missed**: the entire gap is fonts on
simulated slow-4G. Options within spec are exhausted (async-font
pattern scored worse, 83 with TBT 650ms — reverted); closing it
would need self-hosted/subset fonts, a deliberate spec deviation
listed in §9. Page weight target passed: **~55 KB excluding fonts**
(HTML+CSS+JS+SVG), ~157 KB including fonts — both under 300 KB.

## 5. Accessibility

- Lighthouse a11y: **100** mobile + desktop.
- Keyboard: skip link, all interactives reachable, visible `:focus-visible` ring,
  mobile menu focus-trapped with Esc close (verified in headless Chrome),
  accordion buttons `aria-expanded` + keyboard operable, form errors in
  `aria-live` regions, `aria-current` on active nav.
- `prefers-reduced-motion`: disables smooth scroll, typing shows final state,
  caret animation and transitions collapse to ~0ms.
- 200% zoom: fluid `clamp()` type, no fixed heights on text containers —
  verified by code inspection, **not** verified in a live zoom session (§8).

## 6. Responsive (headless Chrome, `puppeteer-core`, zero console errors/warnings)

| Width | Result |
|---|---|
| 320 | no h-overflow, 4 projects, 13 skills render |
| 360 | same, pass |
| 390 | same, pass + menu/accordion/theme/form interactions verified |
| 768 | same, pass |
| 1024 | same, pass (2-col projects, hero stacks until 960) |
| 1440 | same, pass |

Tap targets ≥44px enforced in CSS (buttons, nav links, icon buttons,
skill rows, footer links). Anchored sections use `scroll-margin-top`.
Menu open→Esc-close, accordion single-open, theme toggle, inline form
errors all verified programmatically.

## 7. Contrast (computed WCAG ratios)

| Pair | Ratio |
|---|---|
| Body `#ECEBFA` on bg `#10122A` (dark) | 15.61:1 |
| Muted `#B9B8D9` on bg `#10122A` (dark) | 9.56:1 |
| Ink `#1A1300` on accent `#FFB547` (dark CTA) | 10.51:1 |
| Body `#14152E` on bg `#F7F6FB` (light) | 16.60:1 |
| Muted `#4B4D77` on bg `#F7F6FB` (light) | 7.43:1 |
| Ink `#FFFFFF` on accent `#4338CA` (light CTA) | 7.90:1 |
| Code key/string on code bg (dark) | 10.40 / 12.35:1 |

All ≥ 4.5:1. No pair below threshold.

## 8. Could not verify

- Formspree live activation (endpoint is wired and code-verified;
  submit once on the live URL to activate the form).
- Field Core Web Vitals (LCP/INP/CLS on real devices + real network).
- Safari / Firefox rendering (only Chrome/Chromium tested).
- 200% browser zoom session and full screen-reader pass (NVDA/VoiceOver).
- `og-image.png` social-card rendering on X/LinkedIn crawlers.

## 9. What I would polish next

1. Stretch goals in order: "try it live" accent/name editor, print resume CSS, analytics hook.
2. Self-hosted/subset Google Fonts (latin-only) to close the mobile perf gap — deliberate spec deviation, needs re-audit.
3. Live zoom + screen-reader pass, then a Safari/Firefox screenshot sweep.
