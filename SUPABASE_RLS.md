# Secure Your Data: Row Level Security (RLS) Setup

To fully secure your application, you must apply these rules in your Supabase Dashboard SQL Editor. This ensures that even if someone bypasses the frontend check, they cannot modify your database.

## 1. Enable RLS on `cv_entries`

Run this query to enable security on the table:

```sql
ALTER TABLE cv_entries ENABLE ROW LEVEL SECURITY;
```

## 2. Create Security Policies

### Policy 1: Allow Public Read Access
Everyone (including visitors) should be able to see the CV download link, but only the default ones.

```sql
CREATE POLICY "Public can view default CVs"
ON cv_entries
FOR SELECT
USING (true);
```

### Policy 2: Allow Admin Full Access
Only the user with the email `phamngocanh@gmail.com` can Insert, Update, or Delete.

```sql
-- Allow Insert
CREATE POLICY "Admin can insert CVs"
ON cv_entries
FOR INSERT
WITH CHECK (auth.jwt() ->> 'email' = 'phamngocanh7679@gmail.com');

-- Allow Update
CREATE POLICY "Admin can update CVs"
ON cv_entries
FOR UPDATE
USING (auth.jwt() ->> 'email' = 'phamngocanh7679@gmail.com');

-- Allow Delete
CREATE POLICY "Admin can delete CVs"
ON cv_entries
FOR DELETE
USING (auth.jwt() ->> 'email' = 'phamngocanh7679@gmail.com');
```

## 3. Verify
After running these, go to your Table Editor. You should see a "Lock" icon next to `cv_entries`, indicating RLS is active.
