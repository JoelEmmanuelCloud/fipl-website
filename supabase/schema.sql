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

insert into storage.buckets (id, name, public) values ('news-images', 'news-images', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('media-kit-assets', 'media-kit-assets', true) on conflict do nothing;
create policy "Public read news images" on storage.objects for select using (bucket_id = 'news-images');
create policy "Public read media assets" on storage.objects for select using (bucket_id = 'media-kit-assets');
