# Aditya Pareek — Portfolio

A premium, animated developer portfolio built with React, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Notes

- **Resume**: drop your PDF at `public/Aditya_Pareek_Resume.pdf` — the "Download Resume" button already points there.
- **GitHub username**: update `USERNAME` in `src/components/GithubStats.tsx` to your real GitHub handle so the live stats, contribution graph and pinned repos resolve correctly.
- **Content**: all copy (projects, skills, timeline, achievements, socials) lives in `src/data.ts` — edit that one file to update the whole site.
- **Project links**: update the `github` / `live` fields per project in `src/data.ts`.
- **Contact form**: currently simulates a send client-side. Wire it to a service like Formspree, Resend, or your own API route to actually deliver messages.
- Reduced-motion and keyboard focus states are respected throughout.
