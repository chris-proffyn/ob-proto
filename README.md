# Outbehaving Proto

A mobile-first React + TypeScript + Vite app with Tailwind CSS, Supabase, Zustand, React Router, React Hook Form, and Zod.

## Quick start

```bash
npm install
cp .env.example .env  # add your Supabase URL and anon key
npm run dev
```

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Tech

- React 18, TypeScript, Vite 5
- Tailwind CSS 3
- Supabase (Auth, DB, Storage)
- Zustand state management
- React Router 6
- React Hook Form + Zod

## Path aliases

- `@components/*`, `@pages/*`, `@hooks/*`, `@services/*`, `@store/*`, `@utils/*`, `@types/*`, `@config/*`

## Environment

See `.env.example` and set:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_APP_NAME=Outbehaving
VITE_APP_ENV=development
VITE_LOG_LEVEL=debug
```

## Notes

- Storage bucket `avatars` is required for profile photos.
- Bottom navigation and hamburger menu are visible at all sizes.
