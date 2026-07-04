-- FIPL Website — Supabase database schema
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query).
-- Safe to re-run: every statement is idempotent.

create extension if not exists "pgcrypto";

-- ==========================================================================
-- news_articles
-- Read by: /news, /news/[slug], admin/news/*
-- Written by: /api/admin/news, /api/admin/news/[id]
-- ==========================================================================
create table if not exists news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  date text not null,
  date_iso date not null,
  category text not null check (category in ('Operations', 'Community', 'Corporate', 'Partnerships', 'Updates')),
  read_time text not null,
  image_url text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists news_articles_date_iso_idx on news_articles (date_iso desc);

-- ==========================================================================
-- jobs
-- Read by: /careers, /apply/[jobId], admin/jobs/*
-- Written by: /api/admin/jobs, /api/admin/jobs/[id]
-- ==========================================================================
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  type text not null,
  description text,
  requirements text,
  posted_date date not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists jobs_is_active_idx on jobs (is_active);

-- ==========================================================================
-- job_applications
-- Read by: admin/jobs/applications
-- Written by: /api/apply, /api/admin/applications/[id]
-- CVs are stored in the "job-applications" Storage bucket (see bottom of file).
-- ==========================================================================
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs (id) on delete set null,
  job_title text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  cover_letter text,
  cv_url text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'shortlisted', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists job_applications_job_id_idx on job_applications (job_id);
create index if not exists job_applications_status_idx on job_applications (status);

-- ==========================================================================
-- media_kits
-- Read by: /news (media tab), admin/media/*
-- Written by: /api/admin/media, /api/admin/media/[id]
-- ==========================================================================
create table if not exists media_kits (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  file_url text not null,
  thumbnail_url text,
  created_at timestamptz not null default now()
);

create index if not exists media_kits_category_idx on media_kits (category);

-- ==========================================================================
-- contact_submissions
-- Read by: admin/submissions
-- Written by: /api/contact
-- ==========================================================================
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- newsletter_subscribers
-- Written by: /api/subscribe
-- ==========================================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

-- ==========================================================================
-- testimonials
-- Read by: /about, admin/testimonials/*
-- Written by: /api/admin/testimonials, /api/admin/testimonials/[id]
-- ==========================================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_is_active_idx on testimonials (is_active);

-- ==========================================================================
-- alerts
-- Read by: root layout (site-wide banner), admin/alerts/*
-- Written by: /api/admin/alerts, /api/admin/alerts/[id]
-- ==========================================================================
create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  type text not null default 'info' check (type in ('info', 'warning', 'critical')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists alerts_is_active_idx on alerts (is_active);

-- ==========================================================================
-- push_subscriptions
-- Written by: /api/push/subscribe, /api/push/unsubscribe
-- Read by: /lib/push-notify.ts (news notifications)
-- ==========================================================================
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

-- ==========================================================================
-- Row Level Security
-- All application access goes through the server-side Supabase client using
-- SUPABASE_SERVICE_ROLE_KEY (see src/lib/supabase-server.ts), which bypasses
-- RLS entirely. No client ever talks to Supabase directly with the anon key,
-- so RLS is enabled with no policies to block any anon/public access.
-- ==========================================================================
alter table news_articles enable row level security;
alter table jobs enable row level security;
alter table job_applications enable row level security;
alter table media_kits enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;
alter table testimonials enable row level security;
alter table alerts enable row level security;
alter table push_subscriptions enable row level security;

-- ==========================================================================
-- Storage
-- job-applications: CV PDFs uploaded via /api/apply, referenced by
--   job_applications.cv_url.
-- news-images: article cover images uploaded via /api/admin/upload,
--   referenced by news_articles.image_url.
-- media-kit-assets: media/press assets uploaded via /api/admin/upload,
--   referenced by media_kits.file_url / thumbnail_url.
-- All three are served through getPublicUrl, so they must be public.
-- ==========================================================================
insert into storage.buckets (id, name, public)
values
  ('job-applications', 'job-applications', true),
  ('news-images', 'news-images', true),
  ('media-kit-assets', 'media-kit-assets', true)
on conflict (id) do nothing;
