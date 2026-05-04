-- Phase 2 Migration for QUENOXA Dashboard
-- Run this in your Supabase SQL Editor to apply Phase 2 database changes

-- ==========================================
-- 1. EXTEND STUDENTS TABLE
-- ==========================================
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS internship_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS domain TEXT CHECK (domain IN ('AI', 'Web Development', 'Data Science')),
  ADD COLUMN IF NOT EXISTS internship_type TEXT CHECK (internship_type IN ('online', 'offline')),
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS end_date DATE,
  ADD COLUMN IF NOT EXISTS duration TEXT,
  ADD COLUMN IF NOT EXISTS batch_number TEXT,
  -- status already exists, but we can alter or add specific checks if needed. We'll just update it or add a new one if it didn't exist.
  ADD COLUMN IF NOT EXISTS completion_date DATE,
  ADD COLUMN IF NOT EXISTS drop_reason TEXT,
  ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_profile_update TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS internal_remarks TEXT,
  ADD COLUMN IF NOT EXISTS follow_up_notes TEXT,
  ADD COLUMN IF NOT EXISTS status_comments TEXT,
  ADD COLUMN IF NOT EXISTS resume_url TEXT,
  ADD COLUMN IF NOT EXISTS id_proof_url TEXT,
  ADD COLUMN IF NOT EXISTS offer_letter_url TEXT,
  ADD COLUMN IF NOT EXISTS certificate_url TEXT;

-- ==========================================
-- 2. EXTEND CLIENTS TABLE
-- ==========================================
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id), -- To allow client login and RLS
  ADD COLUMN IF NOT EXISTS company_location TEXT,
  ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_activity TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS client_notes TEXT,
  ADD COLUMN IF NOT EXISTS internal_remarks TEXT,
  ADD COLUMN IF NOT EXISTS meeting_summary TEXT,
  ADD COLUMN IF NOT EXISTS follow_up_status TEXT,
  ADD COLUMN IF NOT EXISTS proposal_url TEXT,
  ADD COLUMN IF NOT EXISTS contract_url TEXT,
  ADD COLUMN IF NOT EXISTS requirements_url TEXT,
  ADD COLUMN IF NOT EXISTS delivery_url TEXT;

-- ==========================================
-- 3. EXTEND PROJECTS TABLE
-- ==========================================
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS project_description TEXT,
  ADD COLUMN IF NOT EXISTS domain TEXT,
  ADD COLUMN IF NOT EXISTS project_type TEXT CHECK (project_type IN ('internal', 'external')),
  ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  ADD COLUMN IF NOT EXISTS estimated_cost NUMERIC,
  ADD COLUMN IF NOT EXISTS final_cost NUMERIC,
  ADD COLUMN IF NOT EXISTS payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'partial')),
  ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- ==========================================
-- 4. CREATE NEW TABLES
-- ==========================================

-- Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('paid', 'pending', 'partial')),
  payment_method TEXT,
  invoice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Support Requests Table
CREATE TABLE IF NOT EXISTS public.support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. STORAGE BUCKETS (Pseudo-SQL / Needs Dashboard action)
-- Note: Buckets are typically created via the Supabase Dashboard. 
-- You will need to create 'student-documents' and 'client-documents' as private buckets manually.
-- ==========================================

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on new tables
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- STUDENTS
-- Student can only select/update their own row
CREATE POLICY "Students can view own record" ON public.students
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can update own record" ON public.students
  FOR UPDATE USING (user_id = auth.uid());

-- CLIENTS
-- Client can only select their own row
CREATE POLICY "Clients can view own record" ON public.clients
  FOR SELECT USING (user_id = auth.uid());

-- PROJECTS
-- Client can only select projects where client_id matches their record
CREATE POLICY "Clients can view own projects" ON public.projects
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- INVOICES
-- Client can only select invoices where client_id matches their record
CREATE POLICY "Clients can view own invoices" ON public.invoices
  FOR SELECT USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- SUPPORT REQUESTS
-- Client can insert support requests linked to their record
CREATE POLICY "Clients can create support requests" ON public.support_requests
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- ADMIN POLICIES (Bypass RLS for Admins using app_metadata)
-- Students
CREATE POLICY "Admins have full access to students" ON public.students
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' IS NULL);

-- Clients
CREATE POLICY "Admins have full access to clients" ON public.clients
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' IS NULL);

-- Projects
CREATE POLICY "Admins have full access to projects" ON public.projects
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' IS NULL);

-- Invoices
CREATE POLICY "Admins have full access to invoices" ON public.invoices
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' IS NULL);

-- Support Requests
CREATE POLICY "Admins have full access to support requests" ON public.support_requests
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' IS NULL);
