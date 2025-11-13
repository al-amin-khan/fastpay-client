# FastPay — Utility Bill Management Platform

FastPay is a single-page web app that lets Bangladeshi households discover, track, and pay recurring utility bills from one dashboard. Customers can browse promoted services, filter bills by category, inspect bill details, and manage personal payments with exportable PDFs. The project is powered by modern React tooling and hooks that integrate Firebase authentication with a REST API backend.

🔗 **Live**: https://fastpay-bd.web.app/

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Available Scripts](#available-scripts)
7. [Deployment Notes](#deployment-notes)
8. [Useful Resources](#useful-resources)

---

## Features

- **Hero marketing + category awareness** — Rich hero slider, animated category cards, and CTA components introduce top services and payment perks.
- **Bill catalog + filtering** — `AllBills` pulls live data from `/bills` with category filters, error states, loading skeletons, and responsive grid cards.
- **Bill detail & checkout** — `BillDetail` displays contextual icons, billing metadata, and a modal-based payment flow that persists transactions and sets bill status to `paid`.
- **Personal dashboard** — `MyBills` fetches authenticated user payments, supports edit/delete actions with optimistic loading, SweetAlert confirmations, and aggregated totals.
- **PDF reporting** — Users can export their payment history as a branded multi-column PDF via `jspdf` + `jspdf-autotable`.
- **Authentication + route protection** — Firebase email/password auth is wrapped by `AuthProvider`, `useAuth`, and `ProtectedRoute` to guard profile routes.
- **Performance-oriented UX** — React Helmet for metadata, reusable loading component, DaisyUI/Tailwind theming, Lucide icons, Swiper sliders, and toast notifications.

---

## Tech Stack

| Layer | Packages / Services |
| --- | --- |
| Framework & Build | `react 19`, `react-router 7`, `vite 7`, `@vitejs/plugin-react` |
| Styling & UI | `tailwindcss 4`, `@tailwindcss/vite`, `daisyui`, `@emotion/react`, `lucide-react`, `react-icons`, `swiper`, `react-awesome-reveal` |
| State, Hooks & Utilities | `react-hot-toast`, `date-fns`, custom hooks (`useAuth`, `useAxiosPublic`, `useTheme`, `useHelmet`) |
| Data & Networking | `axios`, REST API hosted at `VITE_BASE_URL` |
| Auth & Platform | `firebase` (Authentication + Hosting) |
| Productivity | `jspdf`, `jspdf-autotable`, `sweetalert2`, `react-simple-typewriter` |
| Tooling & Quality | `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` |

---

## Architecture

```
fastpay-client/
├── public/                 # Static assets injected at build time
├── src/
│   ├── components/         # Reusable UI atoms & organisms (HeroSlider, BillCard, Navbar, Footer, etc.)
│   ├── pages/              # Route-level screens (Home, AllBills, MyBills, BillDetail, Auth pages)
│   ├── hooks/              # Custom hooks (Axios wrapper, Auth, Helmet, Theme)
│   ├── auth/               # Context provider + protected route wrapper
│   ├── layouts/            # Root layout with Navbar/Footer composition
│   ├── routes/             # React Router configuration
│   ├── config/             # Firebase initialization
│   ├── assets/             # Images & icons (Hero backgrounds, category art)
│   └── main.jsx            # App bootstrap with providers
├── index.html              # Vite entry template
├── vite.config.js          # Build configuration (React SWC, Tailwind plugin)
└── package.json            # Scripts + dependencies
```

Key implementation notes:

- **Data fetching** centralizes Axios defaults via `useAxiosPublic`, so switching environments only requires updating `VITE_BASE_URL`.
- **Helmet integration** lives in `useHelmet`, providing unique titles/meta descriptions per page for better SEO even inside Firebase hosting.
- **Protected flows** rely on context to expose `user` and `loading` flags, enabling guards for `MyBills` and payment modals.
- **UI theming** uses Tailwind utility classes with DaisyUI components for form controls, modals, and cards, ensuring consistent theming without custom CSS overhead.

---

## Getting Started

1. **Clone**
   ```bash
   git clone <repo-url>
   cd fastpay-client
   ```
2. **Install**
   ```bash
   npm install
   ```
3. **Configure environment variables** (see the next section) and start a local dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to explore the app with Vite HMR.

---

## Environment Variables

Create a `.env` file in the project root (Vite automatically exposes keys prefixed with `VITE_`):

```ini
VITE_apiKey=<your_firebase_api_key>
VITE_authDomain=<your_project.firebaseapp.com>
VITE_projectId=<your_project_id>
VITE_storageBucket=<your_project.appspot.com>
VITE_messagingSenderId=<firebase_sender_id>
VITE_appId=<firebase_app_id>

VITE_BASE_URL=<https://your-fastpay-api.com>
```

Tips:
- The Firebase values come from **Project Settings → General** in the Firebase console.
- `VITE_BASE_URL` should point to the deployed FastPay REST API (the production build targets `https://fastpay-server-bay.vercel.app/`).
- Do **not** commit `.env` to git; create `.env.example` if you need to share templates with collaborators.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with Fast Refresh. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project (JS + JSX). |

---

## Deployment Notes

- Production builds are created via `npm run build` and can be hosted on Firebase Hosting, Vercel, Netlify, or any static host that serves the `dist/` folder.
- This repository is currently deployed to **Firebase Hosting** (`fastpay-bd.web.app`). Use `firebase.json` for rewrites if you introduce additional SPA routes.
- Ensure the backend (`fastpay-server`) supports HTTPS and includes CORS rules for your hosting domains.
- For CI/CD, run `npm ci && npm run build && firebase deploy` (or the equivalent workflow for your hosting provider).

---

## Useful Resources

- [Live App](https://fastpay-bd.web.app/)
- [Firebase Console](https://console.firebase.google.com/) — auth credentials & hosting
- [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) — styling references
- [React Router Docs](https://reactrouter.com/) — nested routes, loaders, and navigation patterns
- [Axios](https://axios-http.com/) — HTTP client used by `useAxiosPublic`
- [jsPDF](https://github.com/parallax/jsPDF) & [AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) — PDF export utilities

Have suggestions or find a bug? Please open an issue or create a pull request — contributions are welcome!
