# Hands Over Health Care LLC — Website

A complete, responsive 5-page website for your traveling caregiver business.
Built with plain HTML, CSS, and JavaScript — no build step, no dependencies.
Just open the files in any browser or upload the whole folder to your host.

## Pages
- `index.html` — Home
- `services.html` — Services + How it works + FAQ
- `packages.html` — Pricing / packages
- `about.html` — Brand story, mission, values
- `contact.html` — Contact form + map

## How to view
Double-click `index.html`, or upload the entire folder to any web host
(Netlify, Hostinger, GoDaddy, Bluehost, etc.). Keep the folder structure intact —
the `assets/` folder must stay next to the HTML files.

## ✏️ Things to update before going live
1. **Email address** — currently a placeholder `info@handsoverhealthcare.com`.
   Replace it everywhere it appears:
   - In every HTML file's footer (the `mailto:` link)
   - In `contact.html`: the "Email Us" card AND the form tag
     `<form ... data-email="info@handsoverhealthcare.com">`
2. **Pricing** — the rates on `packages.html` are realistic samples.
   Update the amounts and feature lists to match your real pricing.
   (A yellow note on that page marks this.)
3. **Social links** — the Facebook/Instagram icons in the footer link to `#`.
   Add your real profile URLs.
4. **Testimonials** — the three reviews on the home page are sample copy.
   Swap in real client quotes when you have them.
5. **Map** — set to Wayne County, Michigan. If you have a physical office,
   change the address in the map `src` in `contact.html`.

## Brand colors (from your logo)
- Royal Navy `#1c2d7b` · Gold `#cda23a` · Warm Orange `#ea8a3c` · Pulse Red `#d62b2b`

To adjust colors site-wide, edit the variables at the top of `assets/style.css`
under `:root`.

## Phone number
All "Call" links use **313-833-3578**. To change it, search & replace
`3138333578` (and the displayed `313-833-3578`) across the HTML files.
The old number from your flyer (734-486-9214) was intentionally left out.

## Contact form
The form opens the visitor's email app pre-filled (no server needed).
For a form that sends straight to your inbox without that step, you can later
connect a free service like Formspree or Web3Forms — happy to help set that up.
