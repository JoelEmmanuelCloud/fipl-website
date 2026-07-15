create table if not exists news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  date text not null,
  date_iso date not null,
  category text not null check (category in ('Operations', 'Community', 'Corporate', 'Partnerships', 'Updates')),
  read_time text not null,
  image_url text not null default '',
  created_at timestamptz default now()
);

create table if not exists media_kits (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Our Plants', 'People', 'Events', 'FIPL Foundation')),
  file_url text not null,
  thumbnail_url text,
  created_at timestamptz default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null default 'Port Harcourt, Rivers State',
  type text not null default 'Full Time',
  description text,
  requirements text,
  posted_date date not null default current_date,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now()
);

alter table news_articles enable row level security;
create policy "Public read news" on news_articles for select using (true);

alter table media_kits enable row level security;
create policy "Public read media" on media_kits for select using (true);

alter table jobs enable row level security;
create policy "Public read active jobs" on jobs for select using (is_active = true);

alter table contact_submissions enable row level security;

alter table newsletter_subscribers enable row level security;

create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete set null,
  job_title text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  cover_letter text,
  cv_url text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'shortlisted', 'rejected')),
  created_at timestamptz default now()
);

create index if not exists job_applications_status_idx on job_applications (status);
create index if not exists job_applications_created_at_idx on job_applications (created_at desc);

alter table job_applications enable row level security;

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  type text not null default 'info' check (type in ('info', 'warning', 'critical')),
  is_active boolean not null default true,
  created_at timestamptz default now()
);

alter table alerts enable row level security;
create policy "Public read active alerts" on alerts for select using (is_active = true);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

alter table testimonials enable row level security;
create policy "Public read active testimonials" on testimonials for select using (is_active = true);

create table if not exists page_content (
  page text primary key,
  content jsonb not null default '{}',
  updated_at timestamptz default now()
);

alter table page_content enable row level security;
create policy "Public read page content" on page_content for select using (true);

insert into storage.buckets (id, name, public) values ('news-images', 'news-images', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('media-kit-assets', 'media-kit-assets', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('job-applications', 'job-applications', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('page-content', 'page-content', true) on conflict do nothing;
create policy "Public read news images" on storage.objects for select using (bucket_id = 'news-images');
create policy "Public read media assets" on storage.objects for select using (bucket_id = 'media-kit-assets');
create policy "Public read job application files" on storage.objects for select using (bucket_id = 'job-applications');
create policy "Public read page content assets" on storage.objects for select using (bucket_id = 'page-content');
