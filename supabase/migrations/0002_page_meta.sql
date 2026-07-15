-- Adds editable browser-tab title and SEO meta description to site_settings.
alter table public.site_settings
  add column if not exists page_title text not null default '',
  add column if not exists meta_description text not null default '';
