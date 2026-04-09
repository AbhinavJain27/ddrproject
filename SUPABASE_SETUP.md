# Supabase Setup For Achievers

Create a `.env` file in the project root using `.env.example` as the template.

Use this SQL in the Supabase SQL editor:

```sql
create table if not exists public.achievers (
  id bigint generated always as identity primary key,
  name text not null,
  role text,
  testimony text not null,
  image_url text,
  video_url text,
  created_at timestamptz not null default now()
);

alter table public.achievers enable row level security;

create policy "Allow public read access to achievers"
on public.achievers
for select
to anon
using (true);

create policy "Allow public insert access to achievers"
on public.achievers
for insert
to anon
with check (true);
```

Then create a public storage bucket named `achiever-photos`.

In the Supabase storage policies, allow:

1. Public read access to files in `achiever-photos`
2. Public insert access to files in `achiever-photos`

After that:

1. Copy `.env.example` to `.env`
2. Paste your Supabase project URL into `VITE_SUPABASE_URL`
3. Paste your Supabase anon key into `VITE_SUPABASE_ANON_KEY`
4. Restart the Vite dev server

Current behavior after setup:

1. The Achievers page fetches cards from Supabase on load
2. The form uploads the selected photo to the storage bucket
3. The form can also upload an optional video to the same storage bucket
4. The testimony row is inserted into the `achievers` table
5. The new card is added to the page immediately after submit

If you want moderation later, add an `approved boolean default false` column and change the read query to only show approved rows.

If you already created the table earlier, run this once:

```sql
alter table public.achievers
add column if not exists video_url text;
```

Create the campaigns table with this SQL:

```sql
create table if not exists public.campaigns (
  id bigint generated always as identity primary key,
  name text not null,
  organizer text not null,
  contact_email text not null,
  cities text[] not null default '{}',
  plastic_collected text not null,
  joined_people integer not null default 0,
  social_followers integer not null default 0,
  next_drive text not null,
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;

drop policy if exists "Allow public read access to campaigns" on public.campaigns;
drop policy if exists "Allow public insert access to campaigns" on public.campaigns;

create policy "Allow public read access to campaigns"
on public.campaigns
for select
to anon
using (true);

create policy "Allow public insert access to campaigns"
on public.campaigns
for insert
to anon
with check (true);
```

Create a public storage bucket named `plastic-report-photos`.

Add these policies for the report photo bucket:

```sql
drop policy if exists "Public can view report photos" on storage.objects;
drop policy if exists "Public can upload report photos" on storage.objects;

create policy "Public can view report photos"
on storage.objects
for select
to anon
using (bucket_id = 'plastic-report-photos');

create policy "Public can upload report photos"
on storage.objects
for insert
to anon
with check (bucket_id = 'plastic-report-photos');
```

Create the plastic reports table with this SQL:

```sql
create table if not exists public.plastic_reports (
  id bigint generated always as identity primary key,
  reporter_name text not null,
  area text not null,
  address text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.plastic_reports enable row level security;

drop policy if exists "Allow public read access to plastic reports" on public.plastic_reports;
drop policy if exists "Allow public insert access to plastic reports" on public.plastic_reports;

create policy "Allow public read access to plastic reports"
on public.plastic_reports
for select
to anon
using (true);

create policy "Allow public insert access to plastic reports"
on public.plastic_reports
for insert
to anon
with check (true);
```
