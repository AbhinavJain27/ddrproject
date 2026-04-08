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
3. The testimony row is inserted into the `achievers` table
4. The new card is added to the page immediately after submit

If you want moderation later, add an `approved boolean default false` column and change the read query to only show approved rows.
