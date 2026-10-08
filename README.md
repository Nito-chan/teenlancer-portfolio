# Sam Carter — Portfolio Template

A developer portfolio that doubles as a reusable template for freelancers.
Plain HTML + CSS + vanilla JS. No framework, no build step, no npm dependencies.
Deploy on Vercel as a static site.

Sample persona: **Sam Carter, Web Developer & Designer** (fictional).
All sample projects, quotes and contact values are placeholders —
search for `example.com` and `#` links to find everything to replace.

## Customize in 5 minutes

1. Open `js/config.js`. Change `person.name`, `role`, `location`, `email`, `whatsapp`.
2. Rewrite `hero.headline` (one sentence: who you help + the outcome) and `hero.subline` (max 2 lines).
3. Replace the 4 `projects` with your own work (title, problem, what you did, result, stack).
4. Edit `services` (3 outcomes), `skills` (max 14, honest levels), `process` (your 4 steps).
5. Replace `testimonials` — or set it to `[]` and the section hides itself.
6. Write 2 short `about` paragraphs. Leave `photo: null` for an initials monogram.
7. Update `social` links, `meta.url`, and `resumeUrl`.
8. In `index.html`, update the static hero/headings to match (SEO + no-JS fallback).
9. Connect the contact form (see "Contact form" below).
10. Push to GitHub and import the repo in Vercel (see "Deploy on Vercel"). Done.

## `config.js` field reference

| Field | What it does |
|---|---|
| `meta.title / description / url / ogImage / lang` | `<title>`, meta description, canonical + OG tags, `<html lang>` |
| `person.name / role / location` | Header brand, hero fallback, footer, JSON-LD `Person` |
| `person.email / whatsapp` | Contact section links (`mailto:`, `https://wa.me/`) |
| `person.resumeUrl` | "Download resume" link (`"#"` = placeholder) |
| `person.availability.text` | Green-dot pill above the H1 |
| `hero.headline / subline` | H1 + supporting line |
| `hero.primaryCta / secondaryCta` | `{ label, href }` buttons under the headline |
| `proof` | 3 items max, `{ value, label }` — keep honest and plausible |
| `services` | 3 items: `{ title, outcome, tools[] }` — outcome first, not tools |
| `projects` | 4 items: `{ title, summary, role, problem, result, stack[], liveUrl, codeUrl, thumb }`. `thumb` is `dashboard`, `store`, `booking` or `blog` and draws a pure-CSS browser mock |
| `skills` | Groups of `{ name, level }`. Level is `Daily`, `Comfortable` or `Learning`. Max 14 total |
| `process` | 4 steps `{ step, text }` — a true sequence, shown numbered |
| `testimonials` | `{ quote, name, role, sample }`. `sample: true` shows a "Sample" tag. Empty array hides the section |
| `about.paragraphs` | Max 2 paragraphs. `photo: null` = initials monogram |
| `social` | `{ label, href }[]` — GitHub, LinkedIn, Instagram |
| `theme.default` | `"dark"` or `"light"` initial theme (visitor choice is remembered) |
| `form.endpoint` | Formspree endpoint URL, e.g. `"https://formspree.io/f/abcdwxyz"`. Empty = form shows "not connected yet" with the email fallback |

## Contact form

Uses Formspree (free, ~50 submissions/month, no backend code):

1. Create a free form at formspree.io and verify your email.
2. Paste the endpoint into `form.endpoint` in `js/config.js`.
3. Done. Validation, honeypot (`_gotcha`) and inline success/error states
   are already wired; failures show a plain-language message with the
   email fallback. No floating WhatsApp button by design — one primary
   path only.

## Deploy on Vercel

1. Push this folder as the repo root (it already is `teenlancer-portfolio`).
2. Vercel dashboard → Add New → Project → import the repo.
3. Root Directory: `./` (default). Framework Preset: **Other**.
   Build Command: empty. Output Directory: default.
4. Deploy. `vercel.json` already sets security headers and long-cache
   headers for `/css/*`, `/js/*`, images.
5. Attach your domain, then replace all `samcarter.example.com` URLs
   (`index.html` canonical/OG/Twitter/JSON-LD, `js/config.js` meta,
   `robots.txt`, `sitemap.xml`) and redeploy.

## Performance notes

- Total HTML+CSS+JS+SVG: ~55 KB. CSS: ~18 KB. Only external request: Google Fonts.
- Thumbnails are CSS, icons are inline SVG, zero stock photos.
- `og-image.png` is a generated 1200×630 card (Pillow script, no photo).

## Stretch goals

Not implemented (stopped after block 8 per plan):
1. "Try it live" name/accent editor — would take 10 lines (CSS vars + 2 inputs).
2. Print stylesheet for a one-page resume view.
3. Privacy-friendly analytics hook (commented out).
