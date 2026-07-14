-- MyPortfolio Phase 1 schema: profiles, site_settings, sections (about/skills/projects/contact),
-- about_stats, skill_groups, projects, project_images, RLS policies, storage buckets.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles (role-based access control)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- is_admin(): SECURITY DEFINER so it can check profiles regardless of the
-- caller's own RLS visibility into that table (avoids policy recursion).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  );
$$;

create policy "profiles: self or admin can read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
-- No insert/update/delete policies: only the service role (setup-admin script,
-- which bypasses RLS) may write to this table.

-- ---------------------------------------------------------------------------
-- site_settings (singleton row)
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  name text not null default '',
  role text not null default '',
  tagline text not null default '',
  hero_headline text not null default '',
  hero_primary_label text not null default 'View projects',
  hero_secondary_label text not null default 'Get in touch',
  email text not null default '',
  whatsapp text not null default '',
  location text not null default '',
  github_url text not null default '',
  github_handle text not null default '',
  linkedin_url text not null default '',
  linkedin_handle text not null default '',
  resume_url text,
  resume_filename text,
  profile_image_url text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "site_settings: public read" on public.site_settings
  for select using (true);
create policy "site_settings: admin write" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

insert into public.site_settings (id) values (1);

-- ---------------------------------------------------------------------------
-- sections (about | skills | projects | contact in Phase 1)
-- ---------------------------------------------------------------------------
create table public.sections (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('about', 'skills', 'projects', 'contact')),
  title text not null default '',
  description text not null default '',
  body_paragraphs text[] not null default '{}',
  order_index int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type)
);

alter table public.sections enable row level security;

create policy "sections: public read visible, admin read all" on public.sections
  for select using (visible or public.is_admin());
create policy "sections: admin write" on public.sections
  for all using (public.is_admin()) with check (public.is_admin());

create trigger sections_set_updated_at
  before update on public.sections
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- about_stats (children of the 'about' section)
-- ---------------------------------------------------------------------------
create table public.about_stats (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections (id) on delete cascade,
  label text not null,
  value text not null,
  order_index int not null default 0
);

alter table public.about_stats enable row level security;

create policy "about_stats: public read of visible section, admin read all" on public.about_stats
  for select using (
    public.is_admin()
    or exists (select 1 from public.sections s where s.id = about_stats.section_id and s.visible)
  );
create policy "about_stats: admin write" on public.about_stats
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- skill_groups (children of the 'skills' section)
-- ---------------------------------------------------------------------------
create table public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections (id) on delete cascade,
  category text not null,
  items text[] not null default '{}',
  order_index int not null default 0
);

alter table public.skill_groups enable row level security;

create policy "skill_groups: public read of visible section, admin read all" on public.skill_groups
  for select using (
    public.is_admin()
    or exists (select 1 from public.sections s where s.id = skill_groups.section_id and s.visible)
  );
create policy "skill_groups: admin write" on public.skill_groups
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text not null default '',
  technologies text[] not null default '{}',
  category text not null default '',
  status text not null default '',
  github_url text,
  live_url text,
  project_url text,
  featured boolean not null default false,
  order_index int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects: public read visible, admin read all" on public.projects
  for select using (visible or public.is_admin());
create policy "projects: admin write" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- project_images (children of projects)
-- ---------------------------------------------------------------------------
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  url text not null,
  alt_text text not null default '',
  order_index int not null default 0
);

alter table public.project_images enable row level security;

create policy "project_images: public read of visible project, admin read all" on public.project_images
  for select using (
    public.is_admin()
    or exists (select 1 from public.projects p where p.id = project_images.project_id and p.visible)
  );
create policy "project_images: admin write" on public.project_images
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- storage buckets: resume, profile, project-images (all public-read)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('resume', 'resume', true),
  ('profile', 'profile', true),
  ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "app buckets: public read" on storage.objects
  for select using (bucket_id in ('resume', 'profile', 'project-images'));
create policy "app buckets: admin insert" on storage.objects
  for insert with check (bucket_id in ('resume', 'profile', 'project-images') and public.is_admin());
create policy "app buckets: admin update" on storage.objects
  for update using (bucket_id in ('resume', 'profile', 'project-images') and public.is_admin());
create policy "app buckets: admin delete" on storage.objects
  for delete using (bucket_id in ('resume', 'profile', 'project-images') and public.is_admin());
