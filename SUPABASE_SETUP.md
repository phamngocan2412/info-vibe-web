# Supabase Storage Setup Guide

To fix the `Bucket not found` error and enable CV uploads, you need to run the following SQL commands in your Supabase Dashboard.

## Instructions
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Click on **SQL Editor** (the page icon in the left sidebar).
4. Click **New Query**.
5. Copy and paste the code below into the editor.
6. Click **Run** (Green button).

## SQL Code - Part 1: Storage (Already ran?)

```sql
-- 1. Create the Storage Bucket
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', true);

-- 2. Setup Storage Policies
create policy "Public Access" on storage.objects for select using ( bucket_id = 'cvs' );
create policy "Allow Uploads" on storage.objects for insert with check ( bucket_id = 'cvs' );
```

## SQL Code - Part 2: Database Table (NEW - RUN THIS!)

To enable the dynamic CV Manager (Set Default instantly), run this block:

```sql
----------------------------------------------------------------
-- 3. Create the Database Table for CV Metadata
----------------------------------------------------------------
create table public.cv_entries (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  file_name text not null,
  url text not null,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

----------------------------------------------------------------
-- 4. Enable Security (RLS) for Table
----------------------------------------------------------------
alter table public.cv_entries enable row level security;

-- Allow Public Read (So Home page can find the default CV)
create policy "Enable read access for all users"
on public.cv_entries for select
using (true);

-- Allow Full Control (Insert/Update/Delete) for Anon Users (Since this is a personal portfolio)
-- Note: In a real multi-user app, you would restrict this to authenticated users only.
create policy "Enable insert for all users" on public.cv_entries for insert with check (true);
create policy "Enable update for all users" on public.cv_entries for update using (true);
create policy "Enable delete for all users" on public.cv_entries for delete using (true);
```

## Verification
1. Run the SQL above.
2. Go to **Table Editor** in Supabase.
3. You should see a new table `cv_entries`.
4. Go back to your website Admin page (`/admin/cv-manager`), upload a CV, and click "Set Default".
5. Go to the Home page and refresh. The Download button should link to the new CV instantly.
