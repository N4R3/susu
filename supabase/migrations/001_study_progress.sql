-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function to extract Clerk user ID from JWT claims
-- This function extracts the user_id claim from the JWT token
-- Configure Supabase Clerk third-party auth and verify Clerk user id claim path
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.jwt() ->> 'sub'::text;
$$;

-- Study progress table
-- Note: user_id is TEXT to store Clerk user ID (e.g., user_xxx), not Supabase auth.users UUID
CREATE TABLE IF NOT EXISTS study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  scope TEXT NOT NULL,
  item_id TEXT NOT NULL,
  status TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, scope, item_id)
);

-- Practice exam attempts table
-- Note: user_id is TEXT to store Clerk user ID (e.g., user_xxx), not Supabase auth.users UUID
CREATE TABLE IF NOT EXISTS practice_exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  score_percent NUMERIC,
  achieved_points NUMERIC,
  total_points NUMERIC,
  answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Material notes table
-- Note: user_id is TEXT to store Clerk user ID (e.g., user_xxx), not Supabase auth.users UUID
CREATE TABLE IF NOT EXISTS material_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  subject_id TEXT,
  material_id TEXT,
  title TEXT,
  content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_notes ENABLE ROW LEVEL SECURITY;

-- RLS policies for study_progress
-- Uses requesting_user_id() which extracts Clerk user ID from JWT
CREATE POLICY "Users can view their own study progress"
  ON study_progress FOR SELECT
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can insert their own study progress"
  ON study_progress FOR INSERT
  WITH CHECK (user_id = requesting_user_id());

CREATE POLICY "Users can update their own study progress"
  ON study_progress FOR UPDATE
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can delete their own study progress"
  ON study_progress FOR DELETE
  USING (user_id = requesting_user_id());

-- RLS policies for practice_exam_attempts
-- Uses requesting_user_id() which extracts Clerk user ID from JWT
CREATE POLICY "Users can view their own practice exam attempts"
  ON practice_exam_attempts FOR SELECT
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can insert their own practice exam attempts"
  ON practice_exam_attempts FOR INSERT
  WITH CHECK (user_id = requesting_user_id());

CREATE POLICY "Users can delete their own practice exam attempts"
  ON practice_exam_attempts FOR DELETE
  USING (user_id = requesting_user_id());

-- RLS policies for material_notes
-- Uses requesting_user_id() which extracts Clerk user ID from JWT
CREATE POLICY "Users can view their own material notes"
  ON material_notes FOR SELECT
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can insert their own material notes"
  ON material_notes FOR INSERT
  WITH CHECK (user_id = requesting_user_id());

CREATE POLICY "Users can update their own material notes"
  ON material_notes FOR UPDATE
  USING (user_id = requesting_user_id());

CREATE POLICY "Users can delete their own material notes"
  ON material_notes FOR DELETE
  USING (user_id = requesting_user_id());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_study_progress_user_scope ON study_progress(user_id, scope);
CREATE INDEX IF NOT EXISTS idx_study_progress_user_scope_item ON study_progress(user_id, scope, item_id);
CREATE INDEX IF NOT EXISTS idx_practice_exam_attempts_user_exam ON practice_exam_attempts(user_id, exam_id);
CREATE INDEX IF NOT EXISTS idx_material_notes_user_subject ON material_notes(user_id, subject_id);
