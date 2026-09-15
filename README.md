# ahmedsazgari — Aerial Drone Portfolio

Next.js (App Router) site for ahmedsazgari, an aerial drone & media specialist
in Helsinki. Migrated from a static HTML/CSS/JS site, keeping the same design
system, Supabase-backed content, and Formspree contact form.

## Stack

- **Next.js** (App Router) + React
- **Supabase** — `project` and `blog` tables, fetched client-side (see `lib/supabaseClient.js`)
- **Tailwind CSS** — used alongside a large custom stylesheet (`app/globals.css`)
- **Formspree** — contact form submission, no backend needed
- **Decap CMS** — content editor at `/admin`, served as static files from `public/admin/`
- **Vercel** — hosting, auto-deploys on push to `main`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — pages (App Router: one folder per route) and shared components
- `app/layout.js` — root layout: header, footer, fonts, global CSS import
- `app/components/` — `SiteHeader`, `SiteFooter`, `ProjectCard`, `BlogCard`, etc.
- `lib/supabaseClient.js` — single shared Supabase client
- `public/admin/` — Decap CMS (unchanged from the static site)
- `public/Logo.jpg` — site logo

## Known issues (pre-existing, not introduced by this migration)

- The `blog` table's `created_at` column doesn't exist and `select *` currently
  returns zero rows — check the Supabase dashboard.
- `app/contact/page.js`'s service dropdown still shows old pricing (125€/175€/320€)
  that doesn't match the current `services.html` pricing (120€/170€/300€).

## Deployment

Push to `main` — Vercel is connected to this repo and auto-deploys.
