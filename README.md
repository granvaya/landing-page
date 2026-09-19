# Granvaya — early access landing page

A React + Vite implementation of the Granvaya early-access landing page,
rebuilt with real interactivity instead of a static mock:

- **Hero** — an animated "Today" feed card that auto-advances through
  live-looking updates, plus a count-up stat.
- **How it works** — a working Day-7 revision quiz (pick an answer, see
  streak/coins update, "try again").
- **Know what deserves your time** — a tabbed High/Medium/Low importance
  demo with an animated confidence bar.
- **Join the pilot** — a real multi-field form with validation, a loading
  state, and a success screen (saved to `localStorage` under
  `granvaya_pilot_signups` — swap the `submit` handler in
  `src/components/SignupForm.jsx` for your real API call).
- **FAQ** — an accordion.

All copy, features, FAQ entries, form options etc. live in one place,
`src/data/content.js`, so the page content can be edited without touching
any component markup.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`, no separate config file needed —
  theme tokens are defined in `src/index.css` under `@theme`)
- Framer Motion for animation
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  data/content.js       # all copy & content — edit this first
  components/
    Navbar.jsx
    Hero.jsx             # + TodayCard.jsx, CountUp.jsx
    Problem.jsx
    HowItWorks.jsx        # + RevisionQuiz.jsx
    Features.jsx
    ImportanceDemo.jsx
    About.jsx
    JoinPilot.jsx          # + SignupForm.jsx
    FAQ.jsx
    Footer.jsx
  App.jsx
  index.css               # Tailwind + design tokens (colors, fonts)
```

## Design notes

- Palette: warm cream paper background, deep navy ink, gold/terracotta/sage
  accents for status and importance tags — deliberately not another
  purple-gradient SaaS template.
- Type: Fraunces (display serif) for headings, Inter for body, JetBrains
  Mono flavour reserved for UI chrome (badges, timestamps).
- Every section that can plausibly be interactive is: hover states, live
  demos, and real component state instead of screenshots of a UI.
