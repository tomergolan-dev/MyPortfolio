# MyPortfolio

Personal portfolio site built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Editing content

All placeholder content (name, bio, projects, skills, contact links) lives in one place: `src/data/content.ts`. Edit that file to make the site your own — the sections in `src/components/` read from it directly.

## Structure

- `src/app` — root layout and page
- `src/components` — page sections (Nav, Hero, About, Projects, Skills, Contact, Footer)
- `src/data/content.ts` — editable site content

## Deploy

Deploys cleanly to [Vercel](https://vercel.com/new) — connect this repo and it will build with `npm run build`.
