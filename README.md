# FIPL Website

**Live site:** [fipl-ng.com](https://fipl-ng.com/)

Production marketing and corporate site for **First Independent Power Limited (FIPL)** — an independent power producer operating four gas turbine plants (Trans-Amadi, Afam, Omoku, Eleme) in Rivers State, Nigeria, with a combined installed capacity of 541MW.

The site serves the public-facing corporate presence (about, plants, sustainability, news, careers, vendor registration, contact) plus a role-based admin console for managing that content, and a set of backend integrations (Supabase, Resend, Web Push, Gemini) that support it.

## Tech Stack

| Layer              | Technology                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Framework          | Next.js 14 (App Router), React 18, TypeScript                     |
| Styling            | Tailwind CSS, shadcn/ui, class-variance-authority                 |
| Database & Storage | Supabase (Postgres, Row Level Security, Storage buckets)          |
| Auth               | Custom cookie-session admin auth (role-based, no third-party IdP) |
| Email              | Resend                                                            |
| Push Notifications | Web Push (VAPID)                                                  |
| AI Chat Assistant  | Google Gemini (`gemini-2.5-flash`)                                |
| Charts             | Recharts                                                          |
| Rich Text          | Tiptap                                                            |
| Linting/Formatting | ESLint, Prettier                                                  |
| CI                 | GitHub Actions                                                    |

## Architecture

```
                                   ┌───────────────────────────┐
                                   │         Visitors          │
                                   │  (public site + chatbot)  │
                                   └─────────────┬─────────────┘
                                                 │ HTTPS
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Next.js App (App Router)                       │
│                                                                              │
│   middleware.ts ──── guards /admin/* by role (owner / content / hr)         │
│                                                                              │
│   ┌─────────────────────────────┐    ┌──────────────────────────────────┐  │
│   │        Public Routes        │    │            Admin Routes          │  │
│   │  /, /about, /power-plants,  │    │  /admin, /admin/news,             │  │
│   │  /sustainability, /news,    │    │  /admin/jobs, /admin/media,       │  │
│   │  /careers, /apply/[jobId],  │    │  /admin/alerts, /admin/pages,     │  │
│   │  /register, /contact,       │    │  /admin/testimonials,             │  │
│   │  /cookie-policy             │    │  /admin/submissions               │  │
│   └──────────────┬──────────────┘    └────────────────┬──────────────────┘  │
│                  │                                     │                    │
│                  ▼                                     ▼                    │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │                          API Routes (/api/*)                      │    │
│   │                                                                    │    │
│   │  /api/contact      /api/subscribe     /api/apply                 │    │
│   │  /api/chat          /api/push/subscribe, unsubscribe              │    │
│   │  /api/admin/{login,logout,news,jobs,media,alerts,                │    │
│   │              testimonials,applications,upload,notifications}      │    │
│   └───┬───────────────┬───────────────┬───────────────┬───────────────┘    │
└───────┼───────────────┼───────────────┼───────────────┼───────────────────┘
        │               │               │               │
        ▼               ▼               ▼               ▼
┌───────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────────┐
│    Supabase   │ │    Resend   │ │  Web Push   │ │  Google Gemini   │
│ ───────────── │ │ ─────────── │ │ ─────────── │ │ ──────────────── │
│ Postgres (RLS)│ │ Contact /   │ │ VAPID push  │ │ FIPL-scoped      │
│ news, jobs,   │ │ application │ │ to browser  │ │ chatbot with     │
│ applications, │ │ notification│ │ subscribers │ │ prompt-injection │
│ alerts,       │ │ emails      │ │ (service    │ │ & profanity      │
│ testimonials, │ │             │ │ worker)     │ │ filtering        │
│ page_content, │ │             │ │             │ │                  │
│ subscribers   │ │             │ │             │ │                  │
│               │ │             │ │             │ │                  │
│ Storage:      │ │             │ │             │ │                  │
│ news-images,  │ │             │ │             │ │                  │
│ media-kit-    │ │             │ │             │ │                  │
│ assets,       │ │             │ │             │ │                  │
│ job-           │ │             │ │             │ │                  │
│ applications, │ │             │ │             │ │                  │
│ page-content  │ │             │ │             │ │                  │
└───────────────┘ └─────────────┘ └─────────────┘ └──────────────────┘
```

### Request flow

1. **Public pages** are server-rendered by the App Router. Content that editors manage (home, about, careers, contact, power plants, register, sustainability, news) is pulled from the Supabase `page_content` table at request time via `createServerClient()` (`src/lib/supabase-server.ts`), with typed fallbacks in `src/lib/page-content-defaults.ts` if a row is missing.
2. **Admin routes** (`/admin/*`) are protected by `src/middleware.ts`, which reads the `admin_role` / `admin_token` cookies and validates them against per-role secrets in `src/lib/admin-auth.ts`. Three roles exist: `owner` (full access), `content` (news/media/pages/testimonials), `hr` (jobs/applications).
3. **Admin API routes** (`/api/admin/*`) perform authenticated writes to Supabase using the service-role client, bypassing RLS server-side only after re-checking the session role.
4. **Public API routes** (`/api/contact`, `/api/subscribe`, `/api/apply`) validate and insert into Supabase, then trigger a Resend notification email and/or a Web Push broadcast to admin subscribers via `src/lib/push-notify.ts`.
5. **The chat widget** posts to `/api/chat`, which enforces input-length limits, a profanity filter, and a prompt-injection pattern filter before forwarding a scoped system prompt and conversation history to the Gemini API.
6. **`src/lib/supabase-server.ts`** wraps every Supabase request in a resilient fetch that degrades to a structured `503 SUPABASE_UNREACHABLE` response instead of throwing, so a transient Supabase outage fails one component rather than the page.

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project
- (Optional) Resend, Web Push (VAPID), and Google Gemini API credentials for full functionality

### Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill in `.env.local`:

| Variable                                                             | Required                | Purpose                                                 |
| -------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                                           | Yes                     | Supabase project URL                                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`                                      | Yes                     | Supabase anon key (client reads)                        |
| `SUPABASE_SERVICE_ROLE_KEY`                                          | Yes                     | Supabase service-role key (server writes, bypasses RLS) |
| `ADMIN_PASSWORD_OWNER` / `ADMIN_TOKEN_OWNER`                         | Yes                     | Owner-role admin login and session secret               |
| `ADMIN_PASSWORD_CONTENT` / `ADMIN_TOKEN_CONTENT`                     | Yes                     | Content-role admin login and session secret             |
| `ADMIN_PASSWORD_HR` / `ADMIN_TOKEN_HR`                               | Yes                     | HR-role admin login and session secret                  |
| `NEXT_PUBLIC_SITE_URL`                                               | Yes                     | Canonical site URL (metadata, sitemap, OG tags)         |
| `GOOGLE_GEMINI_API_KEY`                                              | For chat widget         | Gemini API key powering `/api/chat`                     |
| `RESEND_API_KEY`                                                     | For email notifications | Resend API key for contact/application emails           |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_EMAIL` | For push notifications  | Web Push VAPID keypair and contact email                |

Provision the database schema:

```bash
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
# or apply supabase/schema.sql via the Supabase SQL editor
```

Seed sample content (optional, requires `.env.local` to be populated):

```bash
npm run seed:news
npm run seed:media
npm run seed:jobs
npm run seed:alerts
npm run seed:submissions
npm run seed:testimonials
npm run seed:pages
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`. Admin console is at `/admin/login`.

## Scripts

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the Next.js dev server         |
| `npm run build`        | Production build                     |
| `npm run start`        | Serve the production build           |
| `npm run lint`         | Run `next lint`                      |
| `npm run format`       | Format the codebase with Prettier    |
| `npm run format:check` | Check formatting without writing     |
| `npm run seed:*`       | Seed Supabase tables from `scripts/` |

## Project Structure

```
src/
  app/
    (public)/          page.tsx, about, power-plants, sustainability,
                        news, careers, apply/[jobId], register, contact,
                        cookie-policy
    admin/              role-gated console: news, jobs, media, alerts,
                        testimonials, submissions, page content editors
    api/                route handlers for contact, subscribe, apply,
                        chat, push, and admin CRUD
    layout.tsx          root layout, metadata, theme + site shell
    middleware.ts        role-based /admin guard
  components/           shared UI (SiteShell, ThemeProvider, ui/ primitives)
  lib/                  Supabase clients, admin-auth, email, push,
                        page-content defaults, plants data, utils
supabase/
  schema.sql            full Postgres schema, RLS policies, storage buckets
  seed.sql               baseline seed data
scripts/                 Node seed/setup scripts for Supabase content & storage
docs/                    reference SQL and project docs
```

## Deployment

The app is a standard Next.js App Router project and deploys to Vercel with zero additional configuration. Set the environment variables above in the Vercel project settings for each environment (Production/Preview/Development), then connect the GitHub repository for automatic deployments on push.

CI (`.github/workflows/lint.yml`) runs ESLint and Prettier checks on every push and pull request to `main`.
