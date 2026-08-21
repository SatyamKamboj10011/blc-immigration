# Blossom Learning Centre — Website

React + TypeScript + Vite + Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Going live: things to configure

1. **Contact form (Google Sheets)** — free, no submission caps, no backend to maintain.
   Follow the steps at the top of `google-apps-script.gs` (create a Sheet, paste that script
   into Apps Script, deploy as a web app, copy the URL) then set `VITE_GSHEET_WEBHOOK_URL` in a
   `.env` file (see `.env.example`). Without it, the form still works but only logs submissions
   to the browser console. The Google Sheet itself doubles as your admin view — no separate
   dashboard needed; open it, sort/filter, add a "Status" column, share it with staff.
2. **Analytics (optional)** — set `VITE_GA_ID` to a GA4 Measurement ID to enable pageview tracking.
3. **Testimonials & success stories** — `src/data/site.ts` (`testimonials`, `successStories`)
   now link to real videos published on BLC's own YouTube channel (visa approvals and PTE
   results, with real student names). Add more as new videos are published, or replace with
   written quotes if BLC obtains permissioned text testimonials.
4. **Social links** — `src/data/site.ts` (`socialLinks`) links to BLC's verified Instagram
   (@blossom_learning_centre) and a confirmed YouTube video. If BLC has an official YouTube
   channel handle or a working Facebook page, swap those in.
5. **Images** — hero and destination images use royalty-free Unsplash stock photography.
   Swap in real photos of the centre, staff or (with permission) students for more authenticity.
6. **Contact details** — phone, email and address in `src/data/site.ts` (`siteInfo`) were
   pulled from the live BLC site at build time; double-check they're still current.

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/data/site.ts` — all site content (nav, services, destinations, testimonials, etc.)
- `src/components/` — reusable UI components
- `src/pages/` — route-level pages
- `src/lib/submitEnquiry.ts` — contact form submit handler (Google Sheets-backed)
- `google-apps-script.gs` — script to paste into Google Apps Script (see setup steps in the file)
- `src/lib/analytics.ts` — optional GA4 integration
