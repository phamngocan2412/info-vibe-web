# Supabase Storage Setup Guide

To fix the `Bucket not found` error and enable CV uploads, you need to run the following SQL commands in your Supabase Dashboard.

## Instructions
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. Click on **SQL Editor** (the page icon in the left sidebar).
4. Click **New Query**.
5. Copy and paste the code below into the editor.
6. Click **Run** (Green button).

## SQL Code

```sql
----------------------------------------------------------------
-- 1. Create the Storage Bucket
----------------------------------------------------------------
-- Creates a public bucket named 'cvs' for storing PDF files
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', true);

----------------------------------------------------------------
-- 2. Setup Security Policies (RLS)
----------------------------------------------------------------

-- Policy 1: Allow Public Read Access
-- This allows anyone (recruiters, visitors) to download your CV via the public URL.
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'cvs' );

-- Policy 2: Allow Uploads
-- This allows the application (using the Anon Key) to upload files to this bucket.
create policy "Allow Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'cvs' );

-- Policy 3: Allow Deletes (Optional but recommended for managing CVs)
-- This allows the application to delete old CVs.
create policy "Allow Deletes"
  on storage.objects for delete
  using ( bucket_id = 'cvs' );
```

## Verification
After running this script:
1. Go to **Storage** in the sidebar.
2. You should see a new bucket named `cvs`.
3. Go back to your website Admin page and try uploading again. It should work immediately.
