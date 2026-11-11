# MyPortfolio

Personal portfolio site, live at [tomergolan.dev](https://tomergolan.dev). Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) and [Supabase](https://supabase.com), deployed on Vercel.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in the Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

All content (name, bio, resume, projects, skills, contact links, browser-tab title and meta description) lives in Supabase and is edited from the admin dashboard at `/admin`, not in code.

- **Projects** (`/admin/projects`): title, description, category, status, technologies, links, and images.
- **Sections** (`/admin/sections`): About, Projects, Skills and Contact.
- **Settings** (`/admin/settings`): site-wide details, profile photo, resume, and page metadata.

### Project images

A project can have any number of images. In the admin, each image has left/right arrows to change its place in the order, and a trash icon to delete it.

- The **first** image is the thumbnail on the project's card on the home page.
- With more than one image, the project's window ("More") and its page (`/projects/[slug]`) show them as a carousel (`src/components/ImageCarousel.tsx`): swipe on touch screens, arrows and dots with a mouse, arrow keys from the keyboard. A single image shows on its own, with no controls.
- Landscape images at 16:10 (e.g. 1600×1000) fit best. Uploads accept JPEG, PNG and WebP.

### Project cards

Cards on the home page show up to four lines of the description, so cards line up at the same height; the full text is in the project's window.

## Setup (one time)

1. Run the SQL files in `supabase/migrations/` in order, in the Supabase SQL editor.
2. Create your account in Supabase → Authentication → Users, then make it an admin:
   `npx tsx scripts/setup-admin.ts you@example.com`
3. Optionally fill in starting content: `npm run seed-content` (safe to re-run).

## Structure

- `src/app` — the home page, project pages (`projects/[slug]`), and the admin dashboard (`admin/`)
- `src/components` — page sections (Nav, Hero, About, Projects, Skills, Contact), `ProjectModal`, `ImageCarousel`, and admin form pieces
- `src/lib/data` — reads content from Supabase
- `src/lib/supabase` — Supabase clients and the admin check
- `supabase/migrations` — database schema, row-level security, and storage buckets
- `scripts` — admin setup and content seeding

## Deploy

Pushing to `main` deploys to production on Vercel. The Supabase environment variables from `.env.local.example` must also be set in the Vercel project.
