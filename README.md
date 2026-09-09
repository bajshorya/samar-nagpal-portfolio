# Samar Nagpal — Portfolio

Personal portfolio for **Samar Nagpal**, a digital marketing & social media professional based in Jaipur, India.

A single-page editorial site — brand management, content strategy, creative direction, influencer outreach and campaign execution — built with a controlled campaign palette on a dark editorial foundation.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — motion & scroll-linked animation
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Three.js](https://threejs.org/) — the floating campaign moodboard
- [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + Geist (sans/mono)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — layout, global styles, page composition
- `components/site/` — section components (Hero, About, Experience, Work, Process, Expertise, Toolkit, Education, Contact, …)
- `lib/content.ts` — single source of truth for all content

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |
