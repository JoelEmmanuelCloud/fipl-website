create table if not exists news_articles (
  id char(36) primary key,
  slug varchar(255) not null unique,
  title varchar(500) not null,
  excerpt text not null,
  content longtext not null,
  date varchar(50) not null,
  date_iso date not null,
  category varchar(50) not null check (category in ('Operations', 'Community', 'Corporate', 'Partnerships', 'Updates')),
  read_time varchar(50) not null,
  image_url varchar(1000) not null default '',
  created_at timestamp not null default current_timestamp,
  index news_articles_date_iso_idx (date_iso desc)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists jobs (
  id char(36) primary key,
  title varchar(500) not null,
  department varchar(255) not null,
  location varchar(255) not null default 'Port Harcourt, Rivers State',
  type varchar(50) not null default 'Full Time',
  description longtext,
  requirements longtext,
  posted_date date not null default (curdate()),
  is_active tinyint(1) not null default 1,
  created_at timestamp not null default current_timestamp,
  index jobs_is_active_idx (is_active)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists job_applications (
  id char(36) primary key,
  job_id char(36) null,
  job_title varchar(500) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  phone varchar(50) not null,
  cover_letter longtext,
  cv_url varchar(1000) not null,
  status varchar(20) not null default 'pending' check (status in ('pending', 'reviewed', 'shortlisted', 'rejected')),
  created_at timestamp not null default current_timestamp,
  index job_applications_status_idx (status),
  index job_applications_job_id_idx (job_id),
  index job_applications_created_at_idx (created_at desc),
  constraint job_applications_job_id_fk foreign key (job_id) references jobs (id) on delete set null
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists media_kits (
  id char(36) primary key,
  title varchar(500) not null,
  category varchar(50) not null check (category in ('Our Plants', 'People', 'Events', 'FIPL Foundation')),
  file_url varchar(1000) not null,
  thumbnail_url varchar(1000),
  created_at timestamp not null default current_timestamp,
  index media_kits_category_idx (category)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists contact_submissions (
  id char(36) primary key,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  subject varchar(500),
  message longtext not null,
  created_at timestamp not null default current_timestamp
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists newsletter_subscribers (
  id char(36) primary key,
  email varchar(255) not null unique,
  subscribed_at timestamp not null default current_timestamp
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists testimonials (
  id char(36) primary key,
  quote text not null,
  name varchar(255) not null,
  role varchar(255) not null,
  is_active tinyint(1) not null default 1,
  created_at timestamp not null default current_timestamp,
  index testimonials_is_active_idx (is_active)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists alerts (
  id char(36) primary key,
  title varchar(500) not null,
  message text not null,
  type varchar(20) not null default 'info' check (type in ('info', 'warning', 'critical')),
  is_active tinyint(1) not null default 1,
  created_at timestamp not null default current_timestamp,
  index alerts_is_active_idx (is_active)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists page_content (
  page varchar(50) primary key,
  content longtext not null check (json_valid(content)),
  updated_at timestamp not null default current_timestamp on update current_timestamp
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists push_subscriptions (
  id char(36) primary key,
  endpoint varchar(512) not null unique,
  p256dh varchar(255) not null,
  auth varchar(255) not null,
  created_at timestamp not null default current_timestamp
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;
