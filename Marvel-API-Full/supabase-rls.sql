-- ============================================================
-- supabase-rls.sql
-- Row Level Security policies for the Marvel API characters table
-- Run this in your Supabase SQL editor or via psql
-- ============================================================

-- 1. Enable RLS on the characters table
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. OPTION A — Authenticated users can read characters
--    (use this if you want to protect the data behind login)
-- ============================================================
CREATE POLICY "Authenticated users can read characters"
  ON characters
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================
-- 3. OPTION B — Anyone can read characters (public access)
--    Comment out Option A above and uncomment this instead
--    if you want the search to work without login
-- ============================================================
-- CREATE POLICY "Public read access for characters"
--   ON characters
--   FOR SELECT
--   TO anon, authenticated
--   USING (true);

-- ============================================================
-- 4. Only service_role can insert / update / delete
--    (your Express backend uses the service key, so it bypasses RLS)
-- ============================================================
CREATE POLICY "Service role can insert characters"
  ON characters
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update characters"
  ON characters
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete characters"
  ON characters
  FOR DELETE
  TO service_role
  USING (true);

-- ============================================================
-- 5. Verify policies are applied
-- ============================================================
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'characters';
