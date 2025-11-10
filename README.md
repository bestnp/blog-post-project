# Blog Post Project (Frontend)

A React + Vite frontend for the TechUp Blog Post platform. The application provides a public-facing site for reading content and an authenticated admin experience for managing posts, categories, notifications, and member profiles. It integrates with the companion backend (`blog-post-project-api`) which handles authentication, avatars, and content persistence via Supabase and PostgreSQL.

## Key Features
- **Responsive marketing site** with hero section, article listings, search, and detailed post views.
- **Authentication** powered by Supabase (login, logout, password reset, refresh tokens).
- **Admin dashboard** with sidebar navigation, protected routes, and UI components for managing articles and categories.
- **Profile management** including avatar upload to Supabase Storage, editable username/name fields, and notification center.
- **Modern component library** built with Tailwind CSS, Radix primitives, reusable buttons/inputs/modals, and icon set wrappers.

## Tech Stack
- **Frontend:** React 19, Vite 7, React Router v7, TypeScript, Tailwind CSS, class-variance-authority, lucide icons, Sonner notifications.
- **Data & API:** Axios client pointing to the Express backend (`https://blog-post-project-api-five.vercel.app`).
- **Authentication & Storage:** Supabase Auth and Supabase Storage (via backend).
- **Tooling:** ESLint 9, Vite plugin React, vite-plugin-svgr for SVG icons.

## Default Admin Credentials
These credentials are provisioned through the backend Supabase project (see `create-admin.ts` in `blog-post-project-api`). Update them if you regenerate the seed user.

```
Email: admin@blog.com
Password: Admin#2025
```

> ⚠️ If the credentials are rotated, update this section to match the Supabase Auth user.

## Getting Started

### Prerequisites
- Node.js 18 or newer (recommended LTS).
- The backend service (`blog-post-project-api`) running locally or deployed (default API points to the Vercel deployment).

### Installation
```bash
git clone https://github.com/bestnp/my-first-website.git
cd my-first-website
npm install
```

### Development
```bash
npm run dev
```
This starts Vite on `http://localhost:5173` with hot module reloading.

### Production Build
```bash
npm run build
npm run preview
```
`build` outputs to `dist/`, while `preview` serves the bundle locally for smoke testing.

### Linting
```bash
npm run lint
```
Executes ESLint across the project using the shared configuration.

## Project Structure
```
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ components/
│  │  ├─ auth/                # Route guards & loading states
│  │  └─ ui/                  # Reusable buttons, inputs, modals, dropdowns
│  ├─ context/                # Authentication context provider
│  ├─ hooks/                  # Custom hooks (notifications, etc.)
│  ├─ icon/                   # SVG icon wrappers
│  ├─ pages/                  # Routed screens (public + admin)
│  ├─ services/               # API client (Axios)
│  └─ utils/                  # Helpers (JWT interceptor)
├─ index.html
├─ package.json
└─ vite.config.js
```

## Working with the Backend
- Companion repository: `../blog-post-project-api`
- Start the backend locally with `npm install && npm run dev` after configuring Supabase/PostgreSQL environment variables (`.env`).
- Avatar uploads require `SUPABASE_STORAGE_SERVICE_ROLE_KEY` to be set on the backend.

## Environment Notes
- The frontend currently targets `https://blog-post-project-api-five.vercel.app` (see `src/services/api.ts`). Update `API_BASE_URL` if you self-host the backend.
- Authentication state is stored in `localStorage` under the key `token`; JWT interceptor automatically attaches it to requests.

## Deployment
- The project is optimized for Vercel deployment. Run `npm run build` during CI/CD and serve the `dist/` contents.

---
Feel free to extend the documentation with architecture decisions, component guidelines, or troubleshooting tips as the project evolves.
